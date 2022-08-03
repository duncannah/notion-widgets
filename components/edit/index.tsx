import Link from "next/link";
import React from "react";

import styles from "./style.module.scss";

const isNotInAnIFrame = () => window === window.parent;

export default function Edit({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			{isNotInAnIFrame() && (
				<div className={styles[`container`]}>
					<button className={styles[`btn`]} onClick={() => setIsOpen((isOpen) => !isOpen)}>
						{`Edit`}
					</button>
					{isOpen && (
						<form action={``} method={`get`} className={styles[`box`]}>
							{children}
							<input type={`submit`} />
							<i style={{ opacity: 0.5 }}>
								{`Refer to the `}
								<Link href={`/`}>{`home page`}</Link>
								{` for documentation.`}
							</i>
						</form>
					)}
				</div>
			)}
		</>
	);
}
