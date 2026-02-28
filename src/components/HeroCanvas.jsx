import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import LoadingScreen from './LoadingScreen';

// Procedural Particle System
const ParticleField = () => {
    const pointsRef = useRef();
    const { mouse, viewport } = useThree();

    const [positions, colors] = useMemo(() => {
        const particleCount = 3000;
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const radius = 5;

        // Gold / White palette
        const mixColor1 = new THREE.Color("#C9A84C");
        const mixColor2 = new THREE.Color("#FFFFFF");

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = radius * Math.cbrt(Math.random());

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            // Color intermingling
            const mixedColor = Math.random() > 0.6 ? mixColor1 : mixColor2;
            col[i * 3] = mixedColor.r;
            col[i * 3 + 1] = mixedColor.g;
            col[i * 3 + 2] = mixedColor.b;
        }

        return [pos, col];
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        // Slow passive rotation
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += delta * 0.02;

        // Mouse parallax effect via mouse position map to rotation destination
        const targetRotationX = mouse.y * 0.2;
        const targetRotationY = mouse.x * 0.2;

        pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
};

// Procedural Camera Lens Model
const CameraLensModel = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    // Real glass material definition
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.95, // high transmission
        opacity: 1,
        metalness: 0,
        roughness: 0.02,
        ior: 1.5,
        thickness: 0.5,
        specularIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: '#111111',
        metalness: 0.8,
        roughness: 0.2,
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
        color: '#C9A84C', // Gold ring
        metalness: 1,
        roughness: 0.3,
    });

    return (
        <group ref={groupRef} scale={[1.2, 1.2, 1.2]} rotation={[0.4, 0, 0]}>
            {/* Main lens barrel (Cylinder) */}
            <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1, 1, 1, 64]} />
                <primitive object={bodyMaterial} attach="material" />
            </mesh>

            {/* Front rim (Torus) */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[1, 0.1, 32, 64]} />
                <primitive object={bodyMaterial} attach="material" />
            </mesh>

            {/* Gold aesthetic ring (Torus) */}
            <mesh position={[0, 0, -0.3]} rotation={[0, 0, 0]}>
                <torusGeometry args={[1.01, 0.05, 32, 64]} />
                <primitive object={ringMaterial} attach="material" />
            </mesh>

            {/* Primary Glass Element (Circle/Spherecap approximation) */}
            <mesh position={[0, 0, -0.1]}>
                <circleGeometry args={[0.95, 64]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>

            {/* Internal Glass Element */}
            <mesh position={[0, 0, -0.3]} scale={[0.8, 0.8, 0.8]}>
                <circleGeometry args={[0.95, 64]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>

            {/* Sensor/Back element (Darker mirror) */}
            <mesh position={[0, 0, -0.9]}>
                <circleGeometry args={[0.8, 64]} />
                <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
};

const HeroCanvas = () => {
    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-obsidian pointer-events-auto">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

                {/* Environment and Lights */}
                <ambientLight intensity={0.2} />
                <pointLight position={[2, 2, 2]} color="#C9A84C" intensity={4} distance={20} />
                <pointLight position={[-2, -2, 2]} color="#D4A5A5" intensity={2} distance={20} />

                <Suspense fallback={<LoadingScreen />}>
                    <Environment preset="studio" />
                    <ParticleField />
                    <CameraLensModel />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HeroCanvas;
