import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import FlowersGarden from './components/FlowersGarden';
import './App.css';

const UNDER_CONSTRUCTION = false;

const UnderConstruction = () => (
  <div className="page under-construction">
    <h1>Website Under Construction</h1>
    <p>Thank you for visiting. This site is currently being updated. Please check back soon.</p>
  </div>
);

const Home = () => {
  return (
    <div className="home-container">
      {/* <FlowersGarden /> */}
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-content"
        >
          <h1>Hi I'm <span className="highlight">Nandika</span>!</h1>
          <section className="notice-box">
            <span className="notice-strong">Note:</span> This website is still being edited for style and readability. <span className="notice-em">Stay tuned for updates!</span>
          </section>
          <section className="blurb">
            <p>I'm an aspiring roboticist excited to create humanoids and surgical robots to improve medical treatment because I strongly believe that being healthy is a human right. I'm currently a computer engineering undergrad at Georgia Tech who's always looking to learn and gain more well rounded and nuanced perspectives. Here's where my head is at right now: I believe consistent sustained effort is crucial to gaining the technical and interpersonal skills that will enable me to contribute to the robotics solutions I want to see in the world. Respecting everything whether it be the people I find myself lucky enough to call friends and mentors or the butterflies that I'm delighted to see every time I walk through Tech Square is a non-negotiable for me. Currently I approach problems with the aim of building or adopting systems to enable a certain objective. As someone who enjoys discussions I find that I am able to deepen my own understanding by constantly questioning and thinking through the various modalities of a problem. Outside of robotics or reading research I'm an avowed boba and rose green tea addict, I love to watch movies and TV shows (I also love recommendations, keep scrolling to learn more!), I enjoy dancing, I love to hang out with friends, yap and watch sunsets.</p>
          </section>
        </motion.div>
        <div className="photo-container">
          <img
            src="profile-new.jpeg"
            alt="Profile"
            className="profile-photo"
            onError={(e) => {
              // fallback to backup profile if new one not present yet
              (e.currentTarget as HTMLImageElement).src = 'profile-backup.jpg';
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Active components - showing "under construction" message
const Robotics = () => (
  <div className="page">
    <h1>Robotics</h1>
    <p>This page is temporarily unavailable and under construction. Please check back later.</p>
  </div>
);

const InterestsOutsideRobotics = () => (
  <div className="page interests-page">
    <h1>Interests Outside of Robotics</h1>
    
    <section className="interests-section">
      <h2>Dancing & Music</h2>
      <p>This section is temporarily unavailable and under construction. Please check back later.</p>
    </section>

    <section className="interests-section">
      <h2>Movies & TV Shows</h2>
      <ul className="checklist">
        <li><label><input type="checkbox" /> Solo Leveling</label></li>
        <li><label><input type="checkbox" /> Beyond Journey's End</label></li>
        <li><label><input type="checkbox" /> It's a Wonderful Life</label></li>
        <li><label><input type="checkbox" /> Revolutionary Road (2008)</label></li>
        <li><label><input type="checkbox" /> The Butterfly Effect</label></li>
        <li><label><input type="checkbox" /> Fatal Attraction</label></li>
        <li><label><input type="checkbox" /> Mickey 17</label></li>
        <li><label><input type="checkbox" /> Pachinko</label></li>
        <li><label><input type="checkbox" /> The Alto Knights</label></li>
        <li><label><input type="checkbox" /> Novocaine</label></li>
        <li><label><input type="checkbox" /> Fly Me to the Moon (Apple)</label></li>
        <li><label><input type="checkbox" /> Amazon — Red One</label></li>
        <li><label><input type="checkbox" /> Horizon: An American Saga — Chapter 1</label></li>
        <li><label><input type="checkbox" /> Megalopolis</label></li>
        <li><label><input type="checkbox" /> Doctor Who (David Tennant)</label></li>
        <li><label><input type="checkbox" /> Severance</label></li>
        <li><label><input type="checkbox" /> Life is Beautiful</label></li>
        <li><label><input type="checkbox" /> Sense and Sensibility</label></li>
        <li><label><input type="checkbox" /> Brooklyn Nine-Nine</label></li>
        <li><label><input type="checkbox" /> When Life Gives You Tangerines</label></li>
        <li><label><input type="checkbox" /> The Lonely and Great God</label></li>
        <li><label><input type="checkbox" /> New Girl</label></li>
        <li className="checked"><label><input type="checkbox" defaultChecked /> Apothecary Diaries <span className="rating">★★★★★</span></label></li>
        <li><label><input type="checkbox" /> Murderbot — on Apple TV</label></li>
        <li><label><input type="checkbox" /> Alien Earth</label></li>
        <li><label><input type="checkbox" /> Samspeed</label></li>
        <li><label><input type="checkbox" /> The Devil Wears Prada</label></li>
        <li><label><input type="checkbox" /> Death Note — with Hannah and Olivia</label></li>
        <li><label><input type="checkbox" /> Bon Appétit</label></li>
        <li><label><input type="checkbox" /> Love on the Brain</label></li>
        <li><label><input type="checkbox" /> Manacled</label></li>
        <li><label><input type="checkbox" /> Top Boy</label></li>
        <li><label><input type="checkbox" /> Ocean's 8</label></li>
        <li><label><input type="checkbox" /> Ocean's 11</label></li>
        <li><label><input type="checkbox" /> Bodies Bodies Bodies</label></li>
        <li><label><input type="checkbox" /> Train to Busan</label></li>
        <li><label><input type="checkbox" /> My Fault</label></li>
        <li><label><input type="checkbox" /> Maxton Hall</label></li>
      </ul>
    </section>
  </div>
);

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
        <h2>SIMR Bioengineering Institute (2023–2024 Summer)</h2>
        <div className="project-card no-media">
          <div className="project-body">
            <ul>
              <li>Built a heat sensor with Arduino in a microcontrollers workshop.</li>
              <li>Wrote an abstract on combining insulin and GLP-1 RA delivery; filed a provisional IP patent.</li>
              <li>Deepened interest in medicine via guest lectures and emerging research.</li>
            </ul>
          </div>
        </div>
        <div className="project-card simr-poster-fullwidth">
          <div className="project-media">
            <iframe title="Primary Care Poster" src="Primary%20Care%20-%20Poster.pdf#view=FitH&toolbar=0" loading="lazy"></iframe>
            <img
              src="WhatsApp Image 2024-12-09 at 12.43.08_65a96428.jpg"
              alt="Primary care demo setup"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>Lectures that I've been to this past semester</h2>
        <div className="project-card no-media">
          <div className="project-body">
            <p>This section is for lectures attended this past semester.</p>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2024–2025</h2>
        <div className="project-card no-media">
          <div className="project-body">
            <h3>FRC Systems Lead</h3>
            <ul>
              <li>Created a new org structure incl. R&D and systems; mentored junior leads.</li>
              <li>Named Raspberry Pis after minions; built "Minion Bot" to teach and dance; iterating V2 with LEDs.</li>
              <li>Benchmarked Pi 5 vs Pi 4; integrated WPILib on Pi 5; confirmed performance gains.</li>
              <li>Introduced Gantt-based planning and daily Slack updates; established TED template for CV integration.</li>
              <li>Led offseason project selection with mentors; ranked top-8 at Sunset Showdown; preparing for CCC.</li>
            </ul>
          </div>
        </div>
        <div className="project-card no-media">
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
        <div className="project-card no-media">
          <div className="project-body">
            <h3>Current/Ongoing Projects</h3>
            <ul>
              <li>Recreating a Mini Baymax to accompany me on my desk</li>
              <li><strong>Current progress:</strong> motors running successfully in different directions using an L248N driver board with arduino. Running a simple ROS project to be deployed on hardware.</li>
              <li><strong>Status:</strong> currently taking a course in ROS2 Jazzy to write software for the robot and creating a pcb for the robot controller.</li>
            </ul>
          </div>
        </div>
        <div className="project-card">
          <div className="project-media">
            <iframe
              title="Project Demo Video"
              src="https://drive.google.com/file/d/1JsCp0ueAmrl4o8AKtZpQTNvjouUOIKE2/preview"
              loading="lazy"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
          <div className="project-body">
            <h3>Discovery Project – Demo Video</h3>
            <ul>
              <li>
                <a href="https://drive.google.com/file/d/1JsCp0ueAmrl4o8AKtZpQTNvjouUOIKE2/view?usp=sharing" target="_blank" rel="noreferrer">
                  Open video in a new tab
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2023–2024</h2>
        <div className="project-card no-media">
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
        <h2>2022–2023</h2>
        <div className="project-card no-media">
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
        <div className="project-card no-media">
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
        <h2>2021–2022</h2>
        <div className="project-card no-media">
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
    </div>
  </div>
);

const CareerGoals = () => (
  <div className="page goals-page">
    <h1>Career Goals</h1>
    <div className="career-timeline">
      <div className="timeline-line"></div>
      
      <div className="timeline-item">
        <div className="timeline-node">
          <div className="node-pulse"></div>
          <div className="node-core"></div>
        </div>
        <div className="timeline-content">
          <div className="timeline-header">
            <span className="timeline-year">NOW</span>
            <span className="timeline-label">What I'm still working on</span>
          </div>
          <div className="timeline-body">
            <ul>
              <li>Conducting and contributing to Robotics research as part of a lab setting.</li>
              <li>Exploring surgical robotics and humanoid robotics in industry through reading and conversing with roboticists to gain a more nuanced perspective of research and industry.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-node">
          <div className="node-pulse"></div>
          <div className="node-core"></div>
        </div>
        <div className="timeline-content">
          <div className="timeline-header">
            <span className="timeline-year">2029</span>
            <span className="timeline-label">In 5 years</span>
          </div>
          <div className="timeline-body">
            <ul>
              <li>Contributing to robotics research that has moved the needle on increasing the standard of care in surgery while increasing access in rural areas.</li>
              <li>Applying and helping further Human Robot Interaction research by creating humanoids meant to work alongside and to help people in hospital or home settings.</li>
              <li>Continuing to critically analyze the impact of the technology I'm creating/contributing to and evaluating the ethical concerns of robotics enabling its deployment in the world.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CitationsAndCredit = () => (
  <div className="page">
    <h1>Credits, Thanks, and Acknowledgments</h1>
    <div className="citations-content">
      <p>This page is for credits, thanks, and acknowledgments.</p>
    </div>
  </div>
);

/* ============================================================================
   BACKUP CODE - COMMENTED OUT FOR EASY RESTORATION
   To restore a page, uncomment its component below and replace the active 
   component above with the restored version.
   ============================================================================ */

// Original Movies component - uncomment to restore
/*
const Movies = () => (
  <div className="page movies-page">
    <h1>Movies & TV Shows</h1>
    <ul className="checklist">
      <li><label><input type="checkbox" /> Solo Leveling</label></li>
      <li><label><input type="checkbox" /> Beyond Journey's End</label></li>
      <li><label><input type="checkbox" /> It's a Wonderful Life</label></li>
      <li><label><input type="checkbox" /> Revolutionary Road (2008)</label></li>
      <li><label><input type="checkbox" /> The Butterfly Effect</label></li>
      <li><label><input type="checkbox" /> Fatal Attraction</label></li>
      <li><label><input type="checkbox" /> Mickey 17</label></li>
      <li><label><input type="checkbox" /> Pachinko</label></li>
      <li><label><input type="checkbox" /> The Alto Knights</label></li>
      <li><label><input type="checkbox" /> Novocaine</label></li>
      <li><label><input type="checkbox" /> Fly Me to the Moon (Apple)</label></li>
      <li><label><input type="checkbox" /> Amazon — Red One</label></li>
      <li><label><input type="checkbox" /> Horizon: An American Saga — Chapter 1</label></li>
      <li><label><input type="checkbox" /> Megalopolis</label></li>
      <li><label><input type="checkbox" /> Doctor Who (David Tennant)</label></li>
      <li><label><input type="checkbox" /> Severance</label></li>
      <li><label><input type="checkbox" /> Life is Beautiful</label></li>
      <li><label><input type="checkbox" /> Sense and Sensibility</label></li>
      <li><label><input type="checkbox" /> Brooklyn Nine-Nine</label></li>
      <li><label><input type="checkbox" /> When Life Gives You Tangerines</label></li>
      <li><label><input type="checkbox" /> The Lonely and Great God</label></li>
      <li><label><input type="checkbox" /> New Girl</label></li>
      <li className="checked"><label><input type="checkbox" defaultChecked /> Apothecary Diaries <span className="rating">★★★★★</span></label></li>
      <li><label><input type="checkbox" /> Murderbot — on Apple TV</label></li>
      <li><label><input type="checkbox" /> Alien Earth</label></li>
      <li><label><input type="checkbox" /> Samspeed</label></li>
      <li><label><input type="checkbox" /> The Devil Wears Prada</label></li>
      <li><label><input type="checkbox" /> Death Note — with Hannah and Olivia</label></li>
      <li><label><input type="checkbox" /> Bon Appétit</label></li>
      <li><label><input type="checkbox" /> Love on the Brain</label></li>
      <li><label><input type="checkbox" /> Manacled</label></li>
      <li><label><input type="checkbox" /> Top Boy</label></li>
      <li><label><input type="checkbox" /> Ocean's 8</label></li>
      <li><label><input type="checkbox" /> Ocean's 11</label></li>
      <li><label><input type="checkbox" /> Bodies Bodies Bodies</label></li>
      <li><label><input type="checkbox" /> Train to Busan</label></li>
      <li><label><input type="checkbox" /> My Fault</label></li>
      <li><label><input type="checkbox" /> Maxton Hall</label></li>
    </ul>
  </div>
);
*/

// Original CV component - uncomment to restore
/*
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
*/

// Original Projects component - uncomment to restore
/*
const Projects = () => (
  <div className="page projects-page">
    <h1>Personal Projects</h1>
    <div className="timeline">
      <section className="year-group">
        <h2>2021–2022</h2>
        <div className="project-card no-media">
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
            <img
              src="WhatsApp Image 2024-12-09 at 12.43.08_65a96428.jpg"
              alt="Primary care demo setup"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'vite.svg'; }}
            />
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
        <div className="project-card no-media">
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
        <div className="project-card no-media">
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
        <div className="project-card no-media">
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
        <div className="project-card no-media">
          <div className="project-body">
            <h3>FRC Systems Lead</h3>
            <ul>
              <li>Created a new org structure incl. R&D and systems; mentored junior leads.</li>
              <li>Named Raspberry Pis after minions; built "Minion Bot" to teach and dance; iterating V2 with LEDs.</li>
              <li>Benchmarked Pi 5 vs Pi 4; integrated WPILib on Pi 5; confirmed performance gains.</li>
              <li>Introduced Gantt-based planning and daily Slack updates; established TED template for CV integration.</li>
              <li>Led offseason project selection with mentors; ranked top-8 at Sunset Showdown; preparing for CCC.</li>
            </ul>
          </div>
        </div>
        <div className="project-card no-media">
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
        <div className="project-card no-media">
          <div className="project-body">
            <h3>Discovery Project</h3>
            <ul>
              <li><strong>Discovery Project Idea —</strong> I wanted to create a robot (ideally based off Baymax) that is capable of moving its wheels using an Arduino. I wanted to be able to do this so I am able to learn how to use the Jazzy robot operating system (ROS) which is an ECE skill.</li>
              <li><strong>Project Progress —</strong> I was able to get 2 motors running and then was able to press the button in order to get the motors to run in different directions. I was also able to get it working with the L248N driver board and with the arduino. I was able to begin learning how to use ROS with a simple project but still need to learn how to create more complicated projects using ROS.</li>
              <li><strong>Project Successes and Failures —</strong> I ran into many roadblocks including being unable to understand how to get the arduino and the raspberry pi to connect to each other which caused many issues. I also wanted to learn how to be able to design a PCB</li>
              <li><strong>ECE Skills Gained —</strong> I earned how to use and arduino, was able to learn how to code in C++, was able to begin learning PCB design, and was able to learn how to integrate these components together</li>
              <li><strong>Final thoughts —</strong> This has confirmed my interest in being a Computer Engineering major and in Robotics. However, I have realized that I need to work on my time management in order to be able to complete the project and achieve the results I want in college.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="year-group">
        <h2>2023–2024 Summer</h2>
        <div className="project-card no-media">
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
      <section className="year-group">
        <h2>Project Video</h2>
        <div className="project-card">
          <div className="project-media">
            <iframe
              title="Project Demo Video"
              src="https://drive.google.com/file/d/1JsCp0ueAmrl4o8AKtZpQTNvjouUOIKE2/preview"
              loading="lazy"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
          <div className="project-body">
            <h3>Discovery Project – Demo Video</h3>
            <ul>
              <li>
                <a href="https://drive.google.com/file/d/1JsCp0ueAmrl4o8AKtZpQTNvjouUOIKE2/view?usp=sharing" target="_blank" rel="noreferrer">
                  Open video in a new tab
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
);
*/

// Original CareerGoals component - uncomment to restore
/*
const CareerGoals = () => (
  <div className="page goals-page">
    <h1>Career Goals</h1>
    <div className="goals-grid">
      <section className="goal-card">
        <h2>In 5 years</h2>
        <p>
          Being a part of robotics research that has moved the needle on improving surgery while making it significantly more accessible to people in rural areas. Working on the software and electrical systems of robots to further Human Robot Interaction research while continuing to critically analyze the impact of the technology I'm creating/contributing to and evaluating the ethical concerns of robotics.
        </p>
      </section>
      <section className="goal-card">
        <h2>In 10 years</h2>
        <p>
          Leading the advancement of robotic technologies being integrated into the daily lives of people to help enable young women to be able to work while having families, and for surgery to be accessible while being less invasive. Working in tandem with a robot in the home or the lab, being able to dance with people and robots, seeing a world that completely transformed the world I see around me today, something like my favorite sci-fi movies I have grown up watching. Continuing to evaluate the ethical impact of robots and ensuring this technology aligns with my goal of contributing to technology that improves the quality of life for people.
        </p>
      </section>
      <section className="goal-card">
        <h2>What I'm still working on</h2>
        <p>
          I need to spend more time conducting and contributing to Robotics research as part of a lab setting. In addition to that, having conversations with Roboticists or those in the robotics industry who may be in positions relating to Human Robot interaction or surgical robotics to better understand their perspectives while getting advice. Time management is one of the biggest skills I need to master and learn in order to be able to reach this goal because lacking mastery of this skill is preventing me from being able to dedicate time to the commitments that are important to me.
        </p>
      </section>
    </div>
  </div>
);
*/

function App() {
  if (UNDER_CONSTRUCTION) {
    return (
      <main>
        <UnderConstruction />
      </main>
    );
  }

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
            <Link to="/cv">CV</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/career-goals">Career Goals</Link>
            <Link to="/interests">Interests Outside of Robotics</Link>
            <Link to="/citations">Credits, Thanks, and Acknowledgments</Link>
          </div>
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/interests" element={<InterestsOutsideRobotics />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/career-goals" element={<CareerGoals />} />
          <Route path="/citations" element={<CitationsAndCredit />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

