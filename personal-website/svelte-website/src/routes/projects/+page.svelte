<script lang="ts">
	import { base } from '$app/paths';
	
	function handleImageError(e: Event) {
		const target = e.target as HTMLImageElement;
		target.src = `${base}/vite.svg`;
	}
</script>

<div class="page projects-page">
	<div class="timeline">
		<section class="year-group">
			<h2>SIMR Bioengineering Institute (2023–2024 Summer)</h2>
			<div class="project-card simr-poster-fullwidth">
				<div class="project-media">
					<iframe title="Primary Care Poster" src="{base}/Primary%20Care%20-%20Poster.pdf#view=FitH&toolbar=0" loading="lazy"></iframe>
				</div>
			</div>
			
			<!-- Side-by-side display for image and video -->
			<div class="simr-media-grid">
				<div class="simr-media-item">
					<img
						src="{base}/WhatsApp Image 2024-12-09 at 12.43.08_65a96428.jpg"
						alt="Primary care demo setup"
						on:error={handleImageError}
					/>
				</div>
				<div class="simr-media-item">
					<img
						src="{base}/conversing_w_person_image.jpg"
						alt="SIMR poster presentation"
						on:error={handleImageError}
					/>
				</div>
				<div class="simr-media-item">
					<iframe
						title="SIMR Video"
						src="https://drive.google.com/file/d/1ATA71U0gWiLhvPfmSWCdXNcjbt9iUKg8/preview"
						loading="lazy"
						allow="autoplay; fullscreen"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</section>

		<section class="year-group">
			<h2>FRC & Robots I've helped build</h2>
			<div class="robots-grid">
				<div class="robots-grid-header">
					<div class="robots-grid-cell header">Year</div>
					<div class="robots-grid-cell header">Team</div>
					<div class="robots-grid-cell header">Robot</div>
					<div class="robots-grid-cell header">Role</div>
				</div>
				
				<div class="robots-grid-row">
					<div class="robots-grid-cell" data-label="Year">2024–2025</div>
					<div class="robots-grid-cell" data-label="Team">FRC Team 2473</div>
					<div class="robots-grid-cell" data-label="Robot">
						<img src="{base}/2025 season robot.png" alt="FRC Team 2473 Robot 2024-2025" on:error={handleImageError} />
					</div>
					<div class="robots-grid-cell" data-label="Role">
						<div class="role-container">
							<div class="role-list">FRC CV Systems Lead</div>
							<div class="role-list">Club President</div>
						</div>
					</div>
				</div>
				
				<div class="robots-grid-row">
					<div class="robots-grid-cell" data-label="Year">2023–2024</div>
					<div class="robots-grid-cell" data-label="Team">FRC Team 2473</div>
					<div class="robots-grid-cell" data-label="Robot">
						<img src="{base}/2473 2024 bot.png" alt="FRC Team 2473 Robot 2023-2024" on:error={handleImageError} />
					</div>
					<div class="robots-grid-cell" data-label="Role">
						<div class="role-container">
							<div class="role-list">FRC CV Subteam Member</div>
							<div class="role-list">Technical Project Lead</div>
						</div>
					</div>
				</div>
				
				<div class="robots-grid-row">
					<div class="robots-grid-cell" data-label="Year">2022–2023</div>
					<div class="robots-grid-cell" data-label="Team">FTC Team 7128</div>
					<div class="robots-grid-cell" data-label="Robot">
						<img src="{base}/7128.png" alt="FTC Team 7128 Robot 2022-2023" on:error={handleImageError} />
					</div>
					<div class="robots-grid-cell" data-label="Role">
						<div class="role-container">
							<div class="role-list">Team Lead</div>
							<div class="role-list">Outreach Lead</div>
						</div>
					</div>
				</div>
				
				<div class="robots-grid-row">
					<div class="robots-grid-cell" data-label="Year">2021–2022</div>
					<div class="robots-grid-cell" data-label="Team">FTC Team 6038</div>
					<div class="robots-grid-cell" data-label="Robot">
						<img src="{base}/6038.png" alt="FTC Team 6038 Robot 2021-2022" on:error={handleImageError} />
					</div>
					<div class="robots-grid-cell" data-label="Role">
						<div class="role-container">
							<div class="role-list">Hardware Team Member</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="year-group">
			<!-- COMMENTED OUT: FRC Systems Lead
			<div class="project-card no-media">
				<div class="project-body">
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
			-->
			<!-- COMMENTED OUT: Club President
			<div class="project-card no-media">
				<div class="project-body">
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
			-->
			<div class="project-card no-media">
				<div class="project-body">
					<h3>Current/Ongoing Projects</h3>
					<ul>
						<li>Recreating a Mini Baymax to accompany me on my desk</li>
						<li><strong>Current progress:</strong> motors running successfully in different directions using an L248N driver board with arduino. Running a simple ROS project to be deployed on hardware.</li>
						<li><strong>Status:</strong> currently taking a course in ROS2 Jazzy to write software for the robot and creating a pcb for the robot controller.</li>
					</ul>
				</div>
			</div>
			<div class="project-card">
				<div class="project-media">
					<iframe
						title="Project Demo Video"
						src="https://drive.google.com/file/d/1JsCp0ueAmrl4o8AKtZpQTNvjouUOIKE2/preview"
						loading="lazy"
						allow="autoplay; fullscreen"
						allowfullscreen
					></iframe>
				</div>
				<div class="project-body">
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

		<section class="year-group">
			<h2>Lectures that I've been to this past semester</h2>
			<div class="project-card no-media">
				<div class="project-body">
					<p>This section is for lectures attended this past semester.</p>
				</div>
			</div>
		</section>

		<!-- COMMENTED OUT: 2023–2024 section
		<section class="year-group">
			<h2>2023–2024</h2>
			<div class="project-card no-media">
				<div class="project-body">
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
		-->

		<!-- COMMENTED OUT: 2022–2023 section
		<section class="year-group">
			<h2>2022–2023</h2>
			<div class="project-card no-media">
				<div class="project-body">
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
			<div class="project-card no-media">
				<div class="project-body">
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
		-->

		<!-- COMMENTED OUT: 2021–2022 section
		<section class="year-group">
			<h2>2021–2022</h2>
			<div class="project-card no-media">
				<div class="project-body">
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
		-->
	</div>
</div>

