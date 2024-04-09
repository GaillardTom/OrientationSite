import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import {useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Course() {
	const { data, isLoading } = api.jobs.getAll.useQuery();
	const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
	console.log(data)
	

	return (
		<>
			<Head>
				<title>Orientation Site</title>
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

			<main className="flex justify-center align-middle content-center bg-gray-200 h-auto">

    <div className="bg-gray-200 md:p-10 lg:p-20 rounded-lg shadow-lg w-full flex flex-col justify-center">

        <h1 className="courses-title align-top text-slate-900 font-bold text-3xl font-mono p-10">Available Jobs</h1>
        <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs..."
        className="font-semibold right mb-4 p-2 border w-64 border-gray-300 rounded-lg focus:outline-none text-slate-900 font-mono focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      <div className="grid grid-cols-3 gap-10 h-auto mb-auto">
        {data?.filter(course => course.Title.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
          <Link key={course.id} href={{pathname: "/", query:  {id: `${course.id}`}}}>
          <div key={course.id} className="group relative hover:scale-105 bg-white p-4 rounded-lg shadow h-32 hover:outline-none hover:outline-ring hover:outline-blue-200" >
            <h2 className="font-bold text-xl text-slate-900 font-mono">{course.Title}</h2>
            <p className="text-sm text-slate-500 font-mono">{course.Education}</p>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="invisible group-hover:visible hover:scale-110 w-4 h-4 absolute top-0 right-0 mr-2 mt-2 text-gray-500 " />

            
          </div>
          </Link>
        ))}
      </div>

        <div className="bg-gray-200 h-screen"></div>
    {/* <div className="grid grid-cols-3 gap-10 ">
      {data?.map((course) => (
        <div key={course.id} className="hover:scale-105 bg-white p-4 rounded-lg shadow h-32">
          <h2 className="font-bold text-xl text-slate-900">{course.Title}</h2>
          <p className="text-sm text-slate-500">{course.Education}</p>
        </div>
      ))}

    </div> */}

    </div>
            		 
				
			</main>
		</>
	);
}
