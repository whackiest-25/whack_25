
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SciFiCard from './ui/SciFiCard';
import TechButton from './ui/TechButton';
import StarryBackground from './ui/StarryBackground';

const levels = [

    {
        id: 'mangalyaan',
        name: 'MARS ORBIT',
        x: 25, y: 50, // Left
        locked: false,
        type: 'orbiter',
        visual: 'bg-gradient-to-br from-red-500 to-orange-900',
        shadow: 'shadow-[0_0_50px_rgba(239,68,68,0.6)]',
        texture: 'https://www.transparenttextures.com/patterns/stardust.png'
    },
    {
        id: 'chandrayaan',
        name: 'LUNAR SURFACE',
        x: 42, y: 30, // Top Center
        locked: true,
        type: 'lander',
        visual: 'bg-gradient-to-br from-gray-200 to-gray-600',
        shadow: 'shadow-[0_0_50px_rgba(255,255,255,0.4)]',
        texture: 'https://www.transparenttextures.com/patterns/asfalt-dark.png'
    },
    {
        id: 'adityal1',
        name: 'SUN LAGRANGE',
        x: 58, y: 70, // Bottom Center
        locked: true,
        type: 'solar',
        visual: 'bg-gradient-to-br from-yellow-300 to-red-600',
        shadow: 'shadow-[0_0_60px_rgba(250,204,21,0.8)]',
        texture: 'https://www.transparenttextures.com/patterns/arches.png'
    },
    {
        id: 'gaganyaan',
        name: 'LOW EARTH ORBIT',
        x: 75, y: 50, // Right
        locked: true,
        type: 'human',
        visual: 'bg-gradient-to-br from-blue-400 to-indigo-900',
        shadow: 'shadow-[0_0_50px_rgba(59,130,246,0.6)]',
        texture: 'https://www.transparenttextures.com/patterns/broken-noise.png'
    },
];

const MapNode = ({ level, onClick, delay }) => {
    return (
        <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group"
            style={{ left: `${level.x}%`, top: `${level.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay, type: "spring", stiffness: 200 }}
        >
            <button
                onClick={() => onClick(level)}
                disabled={level.locked}
                className="relative flex flex-col items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 animate-float"
            >
                {/* Lock Overlay - Now more subtle */}
                {level.locked && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                        <div className="bg-black/40 p-2 rounded-full border border-white/20 backdrop-blur-md shadow-2xl">
                            <span className="text-xl opacity-80">🔒</span>
                        </div>
                    </div>
                )}

                {/* Planet Body */}
                <div
                    className={`w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-hidden transition-all duration-500 border-4 
                    ${level.locked
                            ? 'grayscale brightness-50 opacity-80 blur-[1px] border-gray-700/50'
                            : `border-white/20 ${level.shadow}`
                        } ${level.visual}`}
                >
                    {/* Inner Shadow for 3D sphere look */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),inset_5px_5px_10px_rgba(255,255,255,0.2)]"></div>

                    {/* Texture Overlay */}
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{ backgroundImage: `url(${level.texture})` }}
                    ></div>

                    {/* Atmosphere Glow for non-locked */}
                    {!level.locked && (
                        <div className="absolute -inset-2 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-md"></div>
                    )}
                </div>

                {/* Level Tag (Angry Birds Style Stars/Score placeholder) */}
                <div className="absolute -bottom-6 flex flex-col items-center space-y-1">
                    <div className={`px-4 py-1.5 bg-spaceDark/90 border border-white/20 rounded-full backdrop-blur-md shadow-lg transform transition-all group-hover:-translate-y-1 ${level.locked ? 'border-gray-700 text-gray-500' : 'border-neonBlue text-neonBlue box-glow'}`}>
                        <span className="text-xs font-black tracking-widest whitespace-nowrap">{level.name}</span>
                    </div>
                    {/* Stars placeholder */}
                    {!level.locked && (
                        <div className="flex space-x-1 text-[10px] text-yellow-500 filter drop-shadow">
                            <span>⭐</span><span>⭐</span><span>☆</span>
                        </div>
                    )}
                </div>
            </button>
        </motion.div>
    );
};

const ConnectingLine = ({ start, end, locked }) => {
    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10">
            <defs>
                <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <motion.path
                d={`M ${start.x}% ${start.y}% Q ${(start.x + end.x) / 2}% ${(start.y + end.y) / 2 + 10}% ${end.x}% ${end.y}%`}
                fill="none"
                stroke={locked ? "#333" : "#00F0FF"}
                strokeWidth={locked ? "1" : "2"}
                strokeDasharray={locked ? "5,5" : "5,5"} // Always dashed for tech look
                strokeOpacity={locked ? 0.3 : 0.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: -20 }}
                transition={{
                    pathLength: { duration: 1.5, delay: 0.5 },
                    strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
                }}
                filter={!locked ? "url(#glow-line)" : ""}
            />
        </svg>
    );
};

const MissionBriefing = ({ mission, onClose, onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
            <SciFiCard className="w-full max-w-2xl border-white/20" glowing title={`MISSION: ${mission.name}`}>
                <div className="space-y-6">
                    <div className="flex space-x-6">
                        <div className="w-32 h-32 bg-black/50 rounded-lg border border-white/10 flex items-center justify-center shrink-0">
                            <span className="text-4xl">🚀</span>
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                                <span className="text-xs text-gray-500 font-mono">OBJECTIVE TYPE</span>
                                <span className="text-sm font-bold text-white uppercase">{mission.type} CLASS</span>
                            </div>
                            <p className="text-gray-300 font-mono text-sm leading-relaxed">
                                COMMANDER, we must send an orbiter to Mars. Our budget is tight, so the LVM3 is unavailable. The PSLV-G is too weak.
                                <br /><br />
                                <span className="text-techGreen font-bold">YOUR GOAL:</span> Configure the PSLV-XL. You must balance the <span className="text-techOrange">FUEL LOAD</span> carefully to reach the Transfer Orbit.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-white/5">
                        <TechButton variant="neutral" onClick={onClose}>Abort</TechButton>
                        <TechButton variant="primary" onClick={onStart}>INITIATE MISSION</TechButton>
                    </div>
                </div>
            </SciFiCard>
        </motion.div>
    );
};

const ProfileModal = ({ user, profile, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <motion.div
                className="w-full max-w-sm bg-[#0a0a16] border border-white/20 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.3)]"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                {/* Header Banner */}
                <div className="h-24 bg-gradient-to-r from-neonBlue to-purple-600 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Avatar */}
                <div className="relative -mt-10 mb-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-black border-4 border-[#0a0a16] flex items-center justify-center relative z-10">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-techGreen to-emerald-600 flex items-center justify-center text-3xl font-black text-black">
                            {profile?.nickname ? profile.nickname[0].toUpperCase() : user?.displayName ? user.displayName[0].toUpperCase() : '?'}
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 text-center">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase mb-1">{profile?.nickname || user?.displayName}</h2>
                    <p className="text-neonBlue text-xs font-mono tracking-[0.2em] uppercase mb-4">LEVEL 01 ACCESS</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 rounded p-3 border border-white/10">
                            <p className="text-gray-500 text-[10px] uppercase font-bold text-left mb-1">Expertise</p>
                            <p className="text-white text-sm font-mono text-left uppercase">{profile?.expertise || 'UNKNOWN'}</p>
                        </div>
                        <div className="bg-white/5 rounded p-3 border border-white/10">
                            <p className="text-gray-500 text-[10px] uppercase font-bold text-left mb-1">Age</p>
                            <p className="text-white text-sm font-mono text-left">{profile?.age || 'N/A'} YRS</p>
                        </div>
                    </div>

                    <div className="text-left text-xs text-gray-400 font-mono space-y-2 mb-6">
                        <p className="flex justify-between">
                            <span>MEMBERSHIP ID:</span>
                            <span className="text-white font-bold">#{user?.uid.slice(0, 8).toUpperCase()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>STATUS:</span>
                            <span className="text-techGreen font-bold">ACTIVE</span>
                        </p>
                        <p className="flex justify-between">
                            <span>JOINED:</span>
                            <span className="text-white">{profile?.joinedAt ? new Date(profile.joinedAt).toLocaleDateString() : 'Today'}</span>
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded font-bold uppercase text-xs tracking-widest transition-colors"
                    >
                        Close Profile
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

const MissionSelection = ({ onBack, onMissionStart }) => {
    const { currentUser, userProfile, logout } = useAuth();
    const [selectedMission, setSelectedMission] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Check for auto-show profile from navigation state
    React.useEffect(() => {
        if (location.state?.showProfile) {
            setShowProfile(true);
            // Clear state so it doesn't reopen on refresh (optional, but good practice)
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const handleMissionStart = () => {
        if (onMissionStart) {
            onMissionStart(selectedMission);
        }
    };

    const handleLogout = async () => {
        try {
            // Navigate to home immediately to avoid ProtectedRoute redirecting to /register
            navigate('/', { replace: true });
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="relative min-h-screen text-white overflow-hidden flex flex-col font-sans">
            <StarryBackground />

            {/* Header - Made fully transparent without borders */}
            <div className="relative z-30 px-8 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowProfile(true)}
                        className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neonBlue to-purple-600 flex items-center justify-center text-xs font-bold border border-white/20">
                            {userProfile?.nickname ? userProfile.nickname[0].toUpperCase() : currentUser?.displayName ? currentUser.displayName[0] : 'C'}
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-white leading-none tracking-wider uppercase">{userProfile?.nickname || currentUser?.displayName || 'COMMANDER'}</p>
                            <p className="text-[10px] text-neonBlue leading-none mt-1 font-mono">LEVEL 01 ACCESS</p>
                        </div>
                    </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-neonBlue to-white text-glow opacity-80">
                        MISSION TRAJECTORY MAP
                    </h1>
                </div>

                <TechButton variant="danger" onClick={handleLogout} className="ml-4 text-xs py-2 px-4">
                    LOGOUT
                </TechButton>
            </div>

            {/* Map Area - Centered & Clean */}
            <div className="flex-1 relative w-full h-full max-w-7xl mx-auto z-10 flex items-center justify-center">
                <div className="relative w-full h-[60vh]">
                    {/* Connections */}
                    {levels.map((level, index) => {
                        if (index < levels.length - 1) {
                            const next = levels[index + 1];
                            return <ConnectingLine key={`line-${index}`} start={level} end={next} locked={next.locked} />;
                        }
                        return null;
                    })}

                    {/* Nodes */}
                    {levels.map((level, index) => (
                        <MapNode
                            key={level.id}
                            level={level}
                            onClick={setSelectedMission}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>

            {/* Mission Briefing Modal */}
            <AnimatePresence>
                {selectedMission && (
                    <MissionBriefing
                        mission={selectedMission}
                        onClose={() => setSelectedMission(null)}
                        onStart={handleMissionStart}
                    />
                )}
                {showProfile && (
                    <ProfileModal
                        user={currentUser}
                        profile={userProfile}
                        onClose={() => setShowProfile(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MissionSelection;
