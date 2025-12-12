import Hero from './components/Hero';
import ScrollSection2 from './components/ScrollSection2';
import StarryBackground from './components/ui/StarryBackground';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const LandingPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleEnterMission = () => {
        if (currentUser) {
            navigate('/missions');
        } else {
            navigate('/register'); // CTA goes to register for new users
        }
    };

    return (
        <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-neonBlue selection:text-black">
            <StarryBackground />
            {/* Pass handleEnterMission to Hero. Hero functionality needs to be compatible. */}
            <Hero user={currentUser} onEnterMission={handleEnterMission} />
            <ScrollSection2 />

            <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10 mt-10">
                © {new Date().getFullYear()} ISRO Mission Simulator. All systems go.
            </footer>
        </div>
    );
};



export default LandingPage;
