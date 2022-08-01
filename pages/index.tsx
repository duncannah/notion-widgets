import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<div>
			<h1>{`Notion widgets for personal use`}</h1>
			<ul>
				<li>
					<Link href={`./countdown?date=2000-01-01&event=the start of 2000`}>{`Countdown`}</Link>
					<ul>
						<li>
							<code>{`date`}</code>
							{`: date to count down from/towards`}
						</li>
						<li>
							<code>{`event`}</code>
							{` (optional): name of event, to be displayed`}
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}
