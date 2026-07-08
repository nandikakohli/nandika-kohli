export default function UnfinishedGridBackground() {
	return (
		<div className="grid-bg-wrap" aria-hidden="true">
			<div className="grid-bg-container">
				<img
					className="grid-bg"
					src={`${import.meta.env.BASE_URL}updated%20background.jpeg`}
					alt=""
					width="1600"
					height="1237"
					decoding="async"
				/>
			</div>
		</div>
	);
}
