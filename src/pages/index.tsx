import Head from "next/head";
import Link from "next/link";
import Mermaid from "./mermaid";
import { api } from "~/utils/api";
import {useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
	const { data, isLoading } = api.jobs.getAll.useQuery();
	const [mermaidGraph, setMermaidGraph] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState<IJob[]>([]);
	const [currentJob, setCurrentJob] = useState<IJob>();
	const [isResultsVisible, setIsResultsVisible] = useState(true);
	const [idSelected, setIdSelected] = useState<string>("");
	
	interface IJob{
		Title: string;
		Education: string;
		Category: number;
		id: string;
	 }
	//Function to handle the change of job and set the mermaid graph accordingly
	
	const router = useRouter(); 
	// const { id } = router.query;
	// console.log(router);
	

	function ChangeJob(job: IJob) { 
		setCurrentJob(job);
		setSearchTerm("");
		const searchBar = document.getElementById("search-bar") as HTMLInputElement;
		if (searchBar !== null){
			searchBar.value = "";
		}
		const title = job.Title.slice(0, 15) + "...";
		switch(job.Category){	
			case 1: setMermaidGraph(`
			flowchart LR
			A((Less than HS diploma)) --> B((${title}))
			`)
			break;
			case 2: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((${title}))
			C((GED or equivalent)) --> B
			
			`);
			break;
			case 3: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((Post-Secondary Certificate))
			C((GED or equivalent)) --> B
			B --> D((${title}))
			`);
			break;
			case 4: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((Some College))
			C((GED or equivalent)) --> B
			B --> D((${title}))
			`);
			break;
			case 5: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((Associate's Degree))
			C((GED or equivalent)) --> B
			B --> D((${title}))
			`);
			break;
			case 6: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((${title}))
			`);
			break;
			case 7: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((Post-Bachelor's Degree))
			E --> F((${title}))
			`);
			break;
			case 8: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((Master's Degree))
			E --> F((${title}))
			`);
			break;
			case 9: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((Master's Degree))
			E --> F((Post Master's Degree))
			F --> G((${title}))
			`);
			break;
			case 10: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((First Professional Degree))
			D --> E((${title}))
			`);
			break;
			case 11: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((Master's Degree))
			E --> F((Doctoral Degree))
			F --> G((${title}))
			`);
			break;
			case 12: setMermaidGraph(`
			flowchart LR
			A((HS diploma)) --> B((College Degree))
			C((GED or equivalent)) --> B
			B --> D((Bachelor's Degree))
			D --> E((Master's Degree))
			E --> F((Doctoral Degree))
			F --> G((Post Doctoral Degree))
			G --> H((${title.slice(0, 15)}...))
			`);
			break;
		}



	};


	useEffect(() => {
		setMermaidGraph(`
		flowchart LR
		`); 
		const handleClick = (event: MouseEvent) => {
        if ((event.target as Element).closest('ul') === null) {
            setSearchTerm('');
            setIsResultsVisible(false);
        }
		//check query from router and set the job accordingly
		
    };
	
	

    // Add the click event listener
    document.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener
    return () => {
        document.removeEventListener('click', handleClick);
    };
			

	}, []); 
	useEffect(() => {
	if (router && router.query.id){
		console.log("Router in Use State: ", router)
		const job = data?.find(job => job.id == router.query.id);
			if (job){
				ChangeJob(job);
				console.log("test")
			// setIdSelected(job.id);
			}
		}
	}, []);
	useEffect(() => {
		if (searchTerm && data) {
		  setResults(data.filter(course => course.Title.toLowerCase().includes(searchTerm.toLowerCase())));
		} else {
		  setResults([]);
		}
	  }, [searchTerm, data]);



	if (isLoading) return <div> Loading... </div>
	if (!data) return <div> No data for this course </div>
	return (
		<>
			<Head>
				<title>Orientation Site</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="fixed z-10 top-0 left-0 m-4 flex flex-col items-start ">
 
			<button className="bg-inherit p-2 mr-4 hover:animate-spin "  onClick={() => setIsOpen(!isOpen || false)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/>
            </svg>
        </button>
        {isOpen && (
			<header className={`mt-4 bg-gray-300 rounded-md shadow-md shadow-white p-10 flex flex-col gap-6 fade-in justify-around transition delay-500 ease-in-out duration-500 ${isOpen ? 'show' : ''}`}>
				
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
       
				<div className="bg-gray-200 md:p-10 lg:p-20 w-full flex flex-col  justify-center items-center h-screen   gap-10 ">
					<div className="relative flex justify-between w-5/6 items-center">

					<h1 className="text-nowrap text-3xl text-slate-900 font-extrabold font-mono">Jobs Requirements</h1>
        			<div className="relative">
    <input id="search-bar" type="text" className="text-slate-900 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-500" placeholder="Search jobs..." onChange={e => setSearchTerm(e.target.value)}/>
    <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
        <svg className="hover:animate-bounce text-gray-600 h-4 w-4 fill-current mt-1 items-center flex align-center content-center" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837  C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"/>
        </svg>
    </button>
    {results.length > 0 && (
        <div className="absolute bg-white rounded-lg w-full border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
            <ul className="rounded-lg grid grid-cols-1 border-solid">
                {results.map((result, index) => (
                    <button className="text-slate-800 hover:bg-blue-100 mt-1 border-solid rounded-md font-semibold font-mono" onClick={ () => ChangeJob(result)} key={index}>{result.Title}</button>
                ))}
            </ul>
        </div>
    )}
</div>
    				</div>

					
					<div className="bg-gray-400 md:p-10 lg:p-20 rounded-3xl shadow-lg w-full h-5/6 flex flex-col relative justify-center ">
						<div className="absolute top-0 left-0 mt-2 ml-2 flex flex-col w-fill group ">

							<FontAwesomeIcon icon={faCircleQuestion} className="absolute group mt-2 ml-1 group-hover:invisible text-gray-100 hover:text-blue-200  h-9 w-9" />
							<h1 className="relative mt-2 ml-2 invisible group-hover:visible fade-in text-gray-100 text-sm font-sans">Search a job to get started</h1>
					 		<h2 className="relative mt-2 ml-2 invisible group-hover:visible text-gray-100 text-xs font-sans">Scroll to zoom in/out</h2>
							<h1 className="group-hover:invisible text-sm text-semibold text-white relative ml-1">Help </h1>
					 	</div>
						<h1 className="justify-middle justify-top align-middle absolute top-0 right-2 text-2xl text-slate-800 font-extrabold font-mono">{currentJob?.Title}</h1>
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
