export default function UnfinishedGridBackground() {
	return (
		<div className="grid-bg-wrap" aria-hidden="true">
			<div className="grid-bg-container">
				<img
					className="grid-bg"
					src={`${import.meta.env.BASE_URL}website-background-hires.png`}
					alt=""
					width="3534"
					height="2736"
					decoding="async"
				/>
			</div>
		</div>
	);
}
