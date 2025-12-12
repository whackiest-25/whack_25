
import React, { useState } from 'react';
import Level1 from '../levels/Level1';

const MissionControl = ({ mission, onBack }) => {
    // If mission object is passed, use its ID. If string (legacy), assume Level 1 for demo.
    const missionId = mission?.id || 1;

    const handleNextLevel = () => {
        console.log("Next Level Requested");
        // Logic to unlock next level or go back to map
        onBack();
    };

    if (missionId === 1 || missionId === 'mangalyaan' || mission === "MANGALYAAN") {
        return <Level1 onNextLevel={handleNextLevel} onBack={onBack} />;
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">MISSION LOCKED</h2>
                <p className="mb-6">This mission is currently in development.</p>
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded"
                >
                    RETURN TO MAP
                </button>
            </div>
        </div>
    );
};

export default MissionControl;
