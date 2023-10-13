'use client';

import { useEffect, useState } from 'react';
import Card from './Card';

const queryData = async (query: string, variables: any) => {
	try {
		const response = await fetch('https://rickandmortyapi.com/graphql', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				query: query,
				variables: variables
			})
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};
export default function Page() {
	const [data, setData] = useState<any>(null);
	const [page, setPage] = useState(1);
	useEffect(() => {
		queryData(
			`query getDatafromPageNumber($pageNumber: Int) {
				characters(page: $pageNumber) {
				  info {
					count
					pages
					next
					prev
				  }
				  results {
					name
					image
					id
					status
					location{
					  name
					}
				  }
				}
			  }`,
			{
				pageNumber: page
			}
		).then((data) => {
			setData(data);
		});
	}, [page]);

	console.log(data);

	if (!data) {
		return (
			<div className="mb-12">
				<div className="mt-12 text-center text-4xl font-bold">
					Rick and Morty Characters
				</div>
				<div className="mt-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-0	">
					{Array.from({ length: 10 }, (_, i) => (
						<div key={i} className="shimmer h-[300px] w-[350px]" />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="mb-12">
			<div className="mt-12 px-4 text-center text-4xl font-bold">
				Rick and Morty Characters
			</div>
			<div className="mt-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-0">
				{data &&
					data.data.characters.results.map((result: any, index: number) => {
						return (
							<Card
								key={index}
								alt={data.data.characters.results[index].name}
								imageUrl={data.data.characters.results[index].image}
								location={data.data.characters.results[index].location.name}
								name={data.data.characters.results[index].name}
								status={data.data.characters.results[index].status}
							/>
						);
					})}
			</div>
			<div className="mt-12 flex items-center justify-center">
				<div className="cursor-pointer rounded-md border border-zinc-600 px-4 py-2 text-xl transition hover:-translate-y-1 active:scale-95">
					Load More
				</div>
			</div>
		</div>
	);
}
