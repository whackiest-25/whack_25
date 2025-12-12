import { motion } from 'framer-motion';

const FeatureCard = ({ title, icon, delay }) => {
    return (
        <motion.div
            className="bg-spaceBlue/20 backdrop-blur-md border border-white/10 hover:border-neonBlue p-8 rounded-xl text-center group transition-all duration-300 transform hover:-translate-y-2 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            viewport={{ once: true }}
        >
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-neonBlue transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-neonBlue transition-colors"></div>

            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-neonBlue transition-colors tracking-wide">{title}</h3>
        </motion.div>
    );
};

const ScrollSection2 = () => {
    return (
        <section className="relative py-12 bg-transparent flex flex-col items-center justify-center">
            {/* Subtle gradient overlay to help readability if needed */}
            {/* <div className="absolute inset-0 bg-spaceDark/30 -z-10 pointer-events-none"></div> */}

            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-10 text-white tracking-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Mission Capabilities
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Build Rockets"
                        icon="🚀"
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Launch Missions"
                        icon="🌌"
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Orbital Maneuvers"
                        icon="🪐"
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
};

export default ScrollSection2;
