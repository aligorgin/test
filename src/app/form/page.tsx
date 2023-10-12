'use client';

import clsx from 'clsx';
import { useState } from 'react';

export default function Page() {
	const [values, setValues] = useState({
		username: '',
		password: ''
	});
	const [res, setRes] = useState<any>(null);

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ uname: values.username, pass: values.password })
	};

	const handleSumbit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(
				'http://shserver.top:8080/test/users/login',
				requestOptions
			);
			const data = await response.json();
			setRes(data);
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};
	if (res !== null) {
		console.log(res);
	}

	const handleChangeUname = (e: any) => {
		setValues((prevState) => ({
			...prevState,
			username: e.target.value
		}));
	};

	const handleChangePass = (e: any) => {
		setValues((prevState) => ({
			...prevState,
			password: e.target.value
		}));
	};

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			{res?.status === 400 && (
				<div className="mb-4 w-[300px] rounded bg-red-500 p-2">{res?.message}</div>
			)}
			<form onSubmit={handleSumbit} className="flex flex-col items-start">
				<div className="flex w-[300px] flex-col pb-4">
					<label className="pb-1" htmlFor="uname">
						Username
					</label>
					<input
						onChange={handleChangeUname}
						placeholder="Username"
						className={clsx(
							'w-full rounded p-2 text-black ring focus:outline-none focus:ring-sky-500',
							res?.status === 400 ? 'ring-red-500 focus:ring-red-500' : 'ring-sky-500'
						)}
						type="text"
						id="uname"
					/>
				</div>
				<div className="flex w-[300px] flex-col pb-8">
					<label className="pb-1" htmlFor="password">
						Password
					</label>
					<input
						onChange={handleChangePass}
						placeholder="password"
						className={clsx(
							'w-full rounded p-2 text-black ring focus:outline-none focus:ring-sky-500 ',
							res?.status === 400 ? 'ring-red-500 focus:ring-red-500' : 'ring-sky-500'
						)}
						type="password"
						id="password"
					/>
				</div>
				<button className="flex items-start rounded bg-white px-4 py-2 text-black">
					Sumbit
				</button>
			</form>
		</div>
	);
}
