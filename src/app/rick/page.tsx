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
				pageNumber: 1
			}
		).then((data) => {
			setData(data);
		});
	}, []);

	console.log(data);

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mb-12">
			<div className="mt-12 text-center text-4xl font-bold">Rick and Morty API</div>
			<div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-0">
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
		</div>
	);
}
