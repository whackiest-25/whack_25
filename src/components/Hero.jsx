import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';

function RotatingEarth() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.08; // Slower rotation
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={groupRef} scale={3.2}>
            {/* Core - Darker, Matte, Less Shiny */}
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#0B1026" // Very Dark Blue/Black
                    emissive="#000" // No self-emission
                    roughness={0.9} // Matte finish
                    metalness={0.1} // Low reflection
                />
            </mesh>

            {/* Wireframe - Subtle Tech Overlay */}
            <mesh scale={1.01}>
                <sphereGeometry args={[1, 32, 24]} />
                <meshBasicMaterial
                    color="#3b82f6" // Muted Blue (Tailwind blue-500)
                    wireframe
                    transparent
                    opacity={0.15} // Very subtle
                />
            </mesh>

            {/* Removed extra "atmosphere" mesh to reduce bloom/cringe factor */}
        </group>
    );
}

const Hero = ({ user, onEnterMission }) => {
    return (
        <section className="relative min-h-[70vh] w-full overflow-hidden flex flex-col items-center justify-center text-center py-20">

            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <ambientLight intensity={0.4} /> {/* Softer overall light */}
                    <directionalLight position={[5, 3, 5]} intensity={1} color="#ffffff" />
                    <RotatingEarth />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-5 mt-[-50px]">
                <motion.h1
                    className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    MISSION CONTROL X
                </motion.h1>

                <motion.p
                    className="mt-6 text-xl md:text-2xl text-gray-300 tracking-wide font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Launch. Learn. Explore ISRO Missions.
                </motion.p>

                <motion.button
                    className="mt-10 px-8 py-4 bg-transparent border-2 border-neonBlue text-neonBlue text-lg font-bold uppercase tracking-wider hover:bg-neonBlue hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (user) {
                            onEnterMission();
                        } else {
                            onEnterMission(); // Now handles redirection to register/login
                        }
                    }}
                >
                    {user ? `Enter Mission Control (${user.displayName || 'Commander'})` : "Join Mission Control"}
                </motion.button>
            </div>

            {/* Gradient Overlay for bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-spaceDark to-transparent z-1 pointer-events-none" />
        </section>
    );
};

export default Hero;
