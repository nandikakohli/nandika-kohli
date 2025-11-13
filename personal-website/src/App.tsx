import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import FlowersGarden from './components/FlowersGarden';
import './App.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* <FlowersGarden /> */}
      <figure className="hero-figure"></figure>
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-content"
        >
          <h1>Hello, I'm <span className="highlight">Nandika</span></h1>
          <p className="subtitle">Robotics Enthusiast • Dancer • Movie Lover</p>
          <section className="blurb">
            <p>Hi I’m Nandika!</p>
            <p>I’m an aspiring roboticist excited to create humanoids and surgical robots to improve medical treatment because I strongly believe that being healthy is a human right. I’m always looking to learn and gain more well rounded and nuanced perspectives.</p>
            <p>Here's where my head is at right now: I believe consistent sustained effort is crucial to gaining the technical and interpersonal skills that will enable me to contribute to the robotics solutions I want to see in the world. Respecting everything — whether it be the people I find myself lucky enough to call friends and mentors or the butterflies that I’m delighted to see every time I walk through Tech Square — is a non-negotiable for me.</p>
            <p>Currently I approach problems with the aim of building or adopting systems to enable a certain objective. As someone who enjoys discussions, I find that I am able to deepen my own understanding by constantly questioning and thinking through the various modalities of a problem.</p>
            <p>Outside of robotics or reading research I’m an avowed boba and rose green tea addict. I love to watch movies and TV shows (I also love recommendations, keep scrolling to learn more!), I enjoy dancing, I love to hang out with friends, yap and watch sunsets.</p>
          </section>
          <div className="cta-buttons">
            <Link to="/cv" className="cta-button primary">View My CV</Link>
            <Link to="/projects" className="cta-button secondary">See Projects</Link>
          </div>
        </motion.div>
        <div className="photo-container">
          <img
            src="profile.jpg"
            alt="Profile"
            className="profile-photo"
            onError={(e) => {
              // fallback to a bundled svg if profile not present yet
              (e.currentTarget as HTMLImageElement).src = 'vite.svg';
            }}
          />
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
