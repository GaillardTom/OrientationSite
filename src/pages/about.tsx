import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import {useState, useEffect } from 'react';
import Image from 'next/image';

export default function About() {
	const { data, isLoading } = api.jobs.getAll.useQuery();
	const [isOpen, setIsOpen] = useState(false);
 



	if (isLoading) return <div> Loading... </div>
	if (!data) return <div> No data for this course </div>
	return (
		<>
			<Head>
				<title>Orientation Site</title>
				<h1>Orientation Site</h1>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="fixed z-10 top-0 left-0 m-4 flex flex-col items-start">
 
			<button className="bg-inherit p-2 mr-4 hover:animate-spin" onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/>
            </svg>
        </button>
        {isOpen && (
			
            <header className={`mt-4 bg-gray-300 rounded-md shadow-md shadow-white p-10 flex flex-col gap-6 fade-in  justify-around transition delay-500 ease-in-out duration-500 ${isOpen ? 'show' : ''}`}>
				
                <Link href="/" className="text-slate-900 font-bold font-mono text-lg hover:scale-110">  Home
                {/* <Button  variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Home</Button> */}
				</Link>
				<Link href="/courses" className="text-slate-900 font-bold font-mono text-lg hover:scale-110"> Jobs
				{/* <Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Courses</Button> */}
				</Link>
				<Link href="/about" className="text-slate-900 font-bold font-mono text-lg hover:scale-110"> About
				{/* <Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">About</Button> */}
				</Link>
            </header>
        )}
		</div>
			<main className="flex h-screen ">
       
            <div className="bg-gray-200 flex flex-col items-center justify-center min-h-screen py-2 w-full">

					
					<h1 className="text-6xl font-bold text-slate-900 mb-3">
                        Welcome to our Orientation-Helper Website!
                    </h1>

                    <p className="mt-5 text-2xl text-slate-800">
                        Discover the educational requirements for your dream job.
                    </p>

                    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full text-slate-800">
                        <Link
                            href="/"
                            className="p-6 mt-6 text-left border border-solid border-slate-500 hover:border-blue-600 w-96 h-96 rounded-xl hover:text-blue-600 focus:text-blue-600 hover:animate-pulse"
                        >
                            <h3 className="text-2xl font-bold">Search for a Job &rarr;</h3>
                            <p className="mt-4 text-xl">Use our search bar to find jobs that match your skills and interests. As you type, you will see a dropdown menu with suggestions. Click on a suggestion to see more details. Scroll to Zoom-in on the graph.</p>
                        </Link>

                        <Link
                            href="/courses"
                            className="p-6 mt-6 text-left border border-solid border-slate-500 hover:border-blue-600 w-96 h-96 rounded-lg hover:text-blue-600 focus:text-blue-600 hover:animate-pulse"
                        >
                            <h3 className="text-2xl font-bold">View our Jobs List &rarr;</h3>
                            <p className="mt-4 text-xl">Check any jobs from our database which contains data from 2021 with data coming from the O*NET database. Use the search bar to pinpoint your dream job.</p>
							<p className="text-xl"> Live count: {data.length} jobs</p>
                        </Link>
						<a
                        className="flex hover:animate-bounce hover:text-blue-600 items-center align-middle justify-center fixed bottom-0 right-0 mb-4 mr-4"
                        href="https://github.com/GaillardTom"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Powered by{' GaillardTom '}
						<Image src="/GitHubDark.svg" width={32} height={32} alt="Logo" className=" ml-2 mb-2" />
                    	</a>
                    </div>
				
			</div>
			</main>
			{/* <body>
				<h1 className="Test">Available Courses</h1>
				<ul>
					{data?.map((post) => (
						<li key={post.id}>{post.name} | {post.grade}</li>))
					}
				</ul>
			</body> */}
		</>
	);
}
