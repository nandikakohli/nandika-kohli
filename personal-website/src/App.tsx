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
          <h1>Hi! I'm <span className="highlight">Nandika</span></h1>
          <section className="blurb">
            <p>I’m an aspiring roboticist excited to create humanoids and surgical robots to improve medical treatment because I strongly believe that being healthy is a human right. I’m always looking to learn and gain more well rounded and nuanced perspectives.</p>
            <p>Here's where my head is at right now: I believe consistent sustained effort is crucial to gaining the technical and interpersonal skills that will enable me to contribute to the robotics solutions I want to see in the world. Respecting everything — whether it be the people I find myself lucky enough to call friends and mentors or the butterflies that I’m delighted to see every time I walk through Tech Square — is a non-negotiable for me.</p>
            <p>Currently I approach problems with the aim of building or adopting systems to enable a certain objective. As someone who enjoys discussions, I find that I am able to deepen my own understanding by constantly questioning and thinking through the various modalities of a problem.</p>
            <p>Outside of robotics or reading research I’m an avowed boba and rose green tea addict. I love to watch movies and TV shows (I also love recommendations, keep scrolling to learn more!), I enjoy dancing, I love to hang out with friends, yap and watch sunsets.</p>
          </section>
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
const CV = () => (
  <div className="page cv-container">
    <h1>My CV</h1>
    <div className="cv-actions">
      <a className="download-btn" href="Master%20Resume.docx.pdf" download>
        Download PDF
      </a>
      <a className="view-btn" href="Master%20Resume.docx.pdf" target="_blank" rel="noreferrer">
        Open in new tab
      </a>
    </div>
    <div className="cv-embed">
      <iframe title="CV" src="Master%20Resume.docx.pdf#toolbar=0" loading="lazy"></iframe>
    </div>
  </div>
);
const Projects = () => (
  <div className="page projects-page">
    <h1>Personal Projects</h1>
    <div className="timeline">
      <section className="year-group">
        <h2>2021–2022</h2>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/ftc-6038.jpg"
              alt="FTC Team 6038 hardware subteam"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>FTC Team 6038 — Hardware Subteam Member</h3>
            <ul>
              <li>Designed a rolling intake using surgical tubing to intake a cube and place it on a tiered game piece.</li>
              <li>Learned western drivetrain design and iterated on an open chassis through the engineering process.</li>
              <li>Contributed by asking questions, recording meeting notes, and fostering a collaborative environment.</li>
              <li>Created a team jokes journal for competition morale and a full engineering notebook.</li>
              <li>Learned SolidWorks and spent extra hours in the lab learning from second-years.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>Posters</h2>
        <div className="project-card">
          <div className="project-media">
            <iframe title="Primary Care Poster" src="Primary%20Care%20-%20Poster.pdf#view=FitH&toolbar=0" loading="lazy"></iframe>
          </div>
          <div className="project-body">
            <h3>Primary Care — Research Poster</h3>
            <ul>
              <li>View in-page preview on the left.</li>
              <li>
                <a href="Primary%20Care%20-%20Poster.pdf" target="_blank" rel="noreferrer">Open full poster in new tab</a>
              </li>
              <li>
                <a href="Primary%20Care%20-%20Poster.pdf" download>Download PDF</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2022–2023</h2>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/ftc-7128-trifold.jpg"
              alt="FTC 7128 trifold at competition"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>FTC Team 7128 — Team Lead</h3>
            <ul>
              <li>Co-designed a gripping mechanism and linear slide with the hardware team.</li>
              <li>Diagnosed chassis strafing issues; resolved by rebalancing with added front weights.</li>
              <li>Facilitated strategy, ensured pivots when deadlines slipped, and ran after-hours syncs.</li>
              <li>Owned documentation and engineering notebook; reanalyzed trifold format for clarity.</li>
              <li>Rewrote content to be concise, gathered more images, and added lights to attract visitors.</li>
              <li>Trifold later reused as a club asset for events and recruiting; designed team shirts.</li>
              <li>Competition driver; Finalist Alliance at qualifier; won Connect Award and Impact Award.</li>
            </ul>
          </div>
        </div>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/ftc-robot-7128.jpg"
              alt="FTC robot with streamers and googly eyes"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>Outreach Lead for Events</h3>
            <ul>
              <li>Mentored six FLL students from a local middle school.</li>
              <li>Partnered with The Tech Museum to demo the robot; presented to Girl Scouts and museum visitors.</li>
              <li>Collaborated with LEAP to run international calls teaching robotics to underfunded schools.</li>
              <li>Helped organize Fall Fest and led Kennedy Middle School night market robot demos.</li>
              <li>Expanded skit program (minion-themed) to present robotics in an approachable way.</li>
              <li>Led a 30-member outreach team with docs, templates, and weekly support meetings.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2023–2024</h2>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/frc-vision.jpg"
              alt="FRC computer vision and AprilTag detection"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>FRC Software — Computer Vision Subteam Member and Technical Project Lead</h3>
            <ul>
              <li>Implemented AprilTag detection used in future seasons; wrote note detection logic.</li>
              <li>Learned camera intrinsics/extrinsics; integrated pipelines on Raspberry Pi.</li>
              <li>Trained members as technical projects lead; coordinated camera mounting with other leads.</li>
              <li>Designed a new camera mount; ranked top-8 alliances at CalGames and Monterey Bay Regional.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2024–2025</h2>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/frc-systems.jpg"
              alt="FRC systems leadership and Minion bot"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>FRC Systems Lead</h3>
            <ul>
              <li>Created a new org structure incl. R&D and systems; mentored junior leads.</li>
              <li>Named Raspberry Pis after minions; built “Minion Bot” to teach and dance; iterating V2 with LEDs.</li>
              <li>Benchmarked Pi 5 vs Pi 4; integrated WPILib on Pi 5; confirmed performance gains.</li>
              <li>Introduced Gantt-based planning and daily Slack updates; established TED template for CV integration.</li>
              <li>Led offseason project selection with mentors; ranked top-8 at Sunset Showdown; preparing for CCC.</li>
            </ul>
          </div>
        </div>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/club-president.jpg"
              alt="Club leadership and presentations"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>Club President</h3>
            <ul>
              <li>Launched a biweekly newsletter for parents and sponsors; clarified outreach under 7 programs.</li>
              <li>Built schedules to meet deadlines; added current-events discussions to meetings.</li>
              <li>Presented to the FUHSD board advocating for a new robotics building.</li>
              <li>Fostered a collaborative officer team with weekly in-person meetings and bonding.</li>
              <li>Kept the team organized with reminders, notes, and calendar accountability.</li>
              <li>Coordinated training sessions during lunch to maximize lab time.</li>
              <li>Supported event prep (e.g., clubs faire trifold timeline) and mentored outreach leads.</li>
              <li>Initiated district-wide FRC social to connect teams with a meet-and-greet.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2023–2024 Summer</h2>
        <div className="project-card">
          <div className="project-media">
            <img
              src="projects/simr-bioeng.jpg"
              alt="SIMR bioengineering institute"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
          <div className="project-body">
            <h3>SIMR Bioengineering Institute</h3>
            <ul>
              <li>Built a heat sensor with Arduino in a microcontrollers workshop.</li>
              <li>Wrote an abstract on combining insulin and GLP-1 RA delivery; filed a provisional IP patent.</li>
              <li>Deepened interest in medicine via guest lectures and emerging research.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const CareerGoals = () => (
  <div className="page goals-page">
    <h1>Career Goals</h1>
    <div className="goals-grid">
      <section className="goal-card">
        <h2>In 5 years</h2>
        <p>
          Being a part of robotics research that has moved the needle on improving surgery while making it significantly more accessible to people in rural areas. Working on the software and electrical systems of robots to further Human Robot Interaction research while continuing to critically analyze the impact of the technology I’m creating/contributing to and evaluating the ethical concerns of robotics.
        </p>
      </section>
      <section className="goal-card">
        <h2>In 10 years</h2>
        <p>
          Leading the advancement of robotic technologies being integrated into the daily lives of people to help enable young women to be able to work while having families, and for surgery to be accessible while being less invasive. Working in tandem with a robot in the home or the lab, being able to dance with people and robots, seeing a world that completely transformed the world I see around me today, something like my favorite sci-fi movies I have grown up watching. Continuing to evaluate the ethical impact of robots and ensuring this technology aligns with my goal of contributing to technology that improves the quality of life for people.
        </p>
      </section>
      <section className="goal-card">
        <h2>What I’m still working on</h2>
        <p>
          I need to spend more time conducting and contributing to Robotics research as part of a lab setting. In addition to that, having conversations with Roboticists or those in the robotics industry who may be in positions relating to Human Robot interaction or surgical robotics to better understand their perspectives while getting advice. Time management is one of the biggest skills I need to master and learn in order to be able to reach this goal because lacking mastery of this skill is preventing me from being able to dedicate time to the commitments that are important to me.
        </p>
      </section>
    </div>
  </div>
);

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
            <Link to="/career-goals">Career Goals</Link>
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
          <Route path="/career-goals" element={<CareerGoals />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
