import Head from "next/head";
import Link from "next/link";
import Mermaid from "./mermaid";
import { api } from "~/utils/api";
import {useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";

export default function About() {
	const { data, isLoading } = api.course.getAll.useQuery();
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
			<div className="absolute top-0 left-0 m-4 flex flex-col items-start">
 
			<button className="bg-gray-200 p-2 mr-4 hover:animate-spin" onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/>
            </svg>
        </button>
        {isOpen && (
			
            <header className={`mt-4 bg-gray-300 rounded-md shadow-md shadow-white p-10 flex flex-col gap-6 fade-in  justify-around transition delay-500 ease-in-out duration-500 ${isOpen ? 'show' : ''}`}>
				
                <Link href="/" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">  Home
                {/* <Button  variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Home</Button> */}
				</Link>
				<Link href="/courses" className="text-slate-900 font-bold font-mono text-lg hover:scale-125"> Courses
				{/* <Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Courses</Button> */}
				</Link>
				<Link href="/about" className="text-slate-900 font-bold font-mono text-lg hover:scale-125"> About
				{/* <Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">About</Button> */}
				</Link>
            </header>
        )}
		</div>
			<main className="flex h-screen ">
       
            <div className="bg-gray-200 md:p-10 lg:p-20 rounded-lg shadow-lg w-full flex justify-center">

			<h1 className="courses-title align-top text-slate-900 font-bold text-3xl font-mono">About</h1>	
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
