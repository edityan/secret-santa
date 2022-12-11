import React, { useState } from "react";

type Data = {
	[key: string]: number;
};

export default function Home() {
	const [counter, setCounter] = useState(1);
	const [data, setData] = useState<Data>({});

	const handleAddData = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const { value } = e.currentTarget;
			if (!value) return;

			const hasDuplicate = Object.keys(data).includes(value);
			if (hasDuplicate) return;

			setCounter((prev) => prev + 1);

			setData((prevData) => ({
				...prevData,
				[value]: counter,
			}));
		}
	};

	const handleDeleteData = (index: number) => {
		const newData = Object.keys(data).reduce((acc: Data, item) => {
			if (data[item] !== index) {
				acc[item] = data[item];
			}
			return acc;
		}, {});
		setData((prevData) => newData);
	};

	return (
		<div className="text-4xl">
			<div className="flex items-center justify-center gap-4">
				<div className="max-w-7xl">
					<input
						type="text"
						placeholder="Masukkan nama"
						onKeyDown={handleAddData}
						className="border-2"
					/>
				</div>
				<div>{counter}</div>
			</div>
			<div className="h-screen flex items-center justify-center gap-4">
				<div className="max-w-7xl">
					{Object.keys(data).map((item) => (
						<div key={item} className="text-black text-4xl flex flex-row gap-4">
							<div>{item}</div>
							<div> - </div>
							<div>{data[item]}</div>
							<div onClick={() => handleDeleteData(data[item])}> X </div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
