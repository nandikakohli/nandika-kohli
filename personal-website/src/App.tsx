import { Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Character from './components/3DCharacter/Character';
import './App.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-content"
        >
          <h1>Hello, I'm <span className="highlight">Nandika</span></h1>
          <p className="subtitle">Robotics Enthusiast • Dancer • Movie Lover</p>
          <div className="cta-buttons">
            <Link to="/cv" className="cta-button primary">View My CV</Link>
            <Link to="/projects" className="cta-button secondary">See Projects</Link>
          </div>
        </motion.div>
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Suspense fallback={null}>
              <Character scale={[0.8, 0.8, 0.8]} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};
const Robotics = () => <div className="page"><h1>Robotics</h1></div>;
const Dancing = () => <div className="page"><h1>Dancing & Music</h1></div>;
const Movies = () => <div className="page"><h1>Movies & TV Shows</h1></div>;
const CV = () => <div className="page"><h1>My CV</h1></div>;
const Projects = () => <div className="page"><h1>Personal Projects</h1></div>;

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="home-button" title="Back to Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/" className="logo"></Link>
          <div className="nav-links">
            <Link to="/robotics">Robotics</Link>
            <Link to="/dancing">Dancing & Music</Link>
            <Link to="/movies">Movies & TV</Link>
            <Link to="/cv">CV</Link>
            <Link to="/projects">Projects</Link>
          </div>
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/dancing" element={<Dancing />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
