import Head from "next/head";
import Link from "next/link";
import Mermaid from "./mermaid";
import { api } from "~/utils/api";
import {useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";


export default function Home() {
	const { data, isLoading } = api.course.getAll.useQuery();
	const [mermaidGraph, setMermaidGraph] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	console.log(data)
	useEffect(() => {
		setMermaidGraph(`
			flowchart LR 
			A((Start)) --> B((Orientation))  
			B --> C((CourseA))
			B --> D((CourseB))
		`); 
			

	}, []); 
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
				
				<Link href="/">
                <Button  variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Home</Button>
				</Link>
				<Link href="/courses">
				<Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">Courses</Button>
				</Link>
				<Link href="/about">
				<Button variant="outlined" className="text-slate-900 font-bold font-mono text-lg hover:scale-125">About</Button>
				</Link>
            </header>
        )}
		</div>
			<main className="flex h-screen ">
       
				<div className="bg-gray-200 md:p-10 lg:p-20 w-full flex flex-col  justify-center items-center h-screen   gap-10 ">
					<h1 className="text-nowrap text-3xl text-slate-900 font-extrabold font-mono ">Available Courses</h1>
					<div className="relative">
        			<input type="text" className="flex text-slate-900 relative border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" placeholder="Search jobs/courses..." />
        				<button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
            		<svg className="hover:animate-bounce text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                	<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837  C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"/>
            		</svg>
        </button>
    				</div>
					<div className="bg-gray-400 md:p-10 lg:p-20 rounded-lg shadow-lg w-full flex justify-center">

						<Mermaid   code={mermaidGraph}/>
					</div>
				</div>
					{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check!</button> */}
					
					
            		 
				
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
