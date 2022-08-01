import { useRouter } from "next/router";
import React from "react";

import styles from "./style.module.scss";

const Units = [`year`, `month`, `week`, `day`, `hour`, `minute`, `second`];

export default function Countdown() {
	const router = useRouter();
	const [time, setTime] = React.useState<[number[], number]>([[], 0]);
	const [started, setStarted] = React.useState(false);

	const update = React.useCallback(() => {
		if (typeof router.query.date !== `string`) return;

		const date = new Date(router.query.date).getTime();
		const difference = date - new Date().getTime();
		let delta = Math.abs(difference) / 1000;

		const list: number[] = [];

		const years = Math.floor(delta / (365 * 24 * 60 * 60));
		delta -= years * 365 * 24 * 60 * 60;

		const months = Math.floor(delta / (30 * 24 * 60 * 60));
		delta -= months * 30 * 24 * 60 * 60;

		const weeks = Math.floor(delta / (7 * 24 * 60 * 60));
		delta -= weeks * 7 * 24 * 60 * 60;

		const days = Math.floor(delta / (24 * 60 * 60));
		delta -= days * 24 * 60 * 60;

		const hours = Math.floor(delta / (60 * 60));
		delta -= hours * 60 * 60;

		const minutes = Math.floor(delta / 60);
		delta -= minutes * 60;

		const seconds = Math.floor(delta);

		list.push(years, months, weeks, days, hours, minutes, seconds);

		setTime([list, difference < 0 ? -1 : 1]);

		requestAnimationFrame(() => setTimeout(update, 1000.1 - new Date().getMilliseconds()));
	}, [router.query.date]);

	React.useEffect(() => {
		if (router.query.date) {
			if (started) return;
			setStarted(true);

			update();
		}
	}, [router.query.date, started, update]);

	return (
		started && (
			<div>
				<div className={styles[`units`]}>
					{time[0].map((value, index) =>
						value || index === Units.length - 1 ? (
							<div className={styles[`unit`]} key={index}>
								<div className={styles[`num`]}>{value}</div> {Units[index]}
								{index !== Units.length - 1 ? (
									<>
										{value !== 1 && `s`}
										{`,`}
									</>
								) : (
									<span style={{ opacity: value !== 1 ? 1 : 0 }}>{`s`}</span>
								)}
							</div>
						) : (
							[]
						),
					)}
					<div className={styles[`unit`]}>{time[1] > 0 ? `left` : `ago`}</div>
				</div>
				{typeof router.query.event === `string` && (
					<p style={{ textAlign: `center` }}>
						{time[1] > 0 ? `until` : `was`} <strong>{router.query.event}</strong>
					</p>
				)}
			</div>
		)
	);
}
