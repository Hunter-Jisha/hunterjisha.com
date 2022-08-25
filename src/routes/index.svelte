<script>
    import {fly} from "svelte/transition"
    var skillsMode = "frontend"

    import skills from "../lib/skills.json"
    import certs from "../lib/certs.json"
    import Form from "../lib/Form.svelte"

    async function message(data)
    {
        const response = await fetch("/notif", 
        {
            method: "POST",
            body: JSON.stringify(data)
        })

        if(response.ok)
        {
            console.log("submitted")
        }
    }
</script>

<nav class="hidden md:flex z-10 w-full h-20 bg-zinc-900 flex-row fixed top-0 left-0 justify-between items-center py-3 px-4">
    <p class="text-blue-500 font-bold text-3xl">Hunter Jisha</p>

    <div class="h-full flex flex-row gap-8 text-white font-bold text-xl items-center">
        <a on:click={() => document.getElementById("skills").scrollIntoView({behavior: "smooth", alignToTop: true})} class="hover:text-blue-500 transition-all" href="#skills">Skills</a>
        <a on:click={() => document.getElementById("certifications").scrollIntoView({behavior: "smooth", alignToTop: true})} class="hover:text-blue-500 transition-all" href="#certs">Certifications</a>
        <a on:click={() => document.getElementById("projects").scrollIntoView({behavior: "smooth", alignToTop: true})} class="hover:text-blue-500 transition-all" href="#projects">Projects</a>
        <a on:click={() => document.getElementById("experience").scrollIntoView({behavior: "smooth", alignToTop: true})} class="hover:text-blue-500 transition-all" href="#experience">Experience</a>
        <a class="hover:text-blue-500 transition-all" href="https://app.flowcv.com/resume-feedback/83KPiMB16qcw_a0cvIevZ" target="_blank">Resume</a>
        <button on:click={() => document.getElementById("contact").scrollIntoView({behavior: "smooth", alignToTop: true})} class="hover:bg-blue-600 transition-all h-full px-8 rounded-full bg-blue-500 text-white"href="#contact">Hire Me</button>
    </div>
</nav>

<div class="w-full md:h-screen flex-shrink-0 bg-zinc-700 flex flex-col md:flex-row md:p-32 md:py-48 md:justify-between">
    <div class="flex flex-col gap-6 p-12 md:p-16">
        <h1 class="text-white font-bold text-8xl md:text-9xl">Hunter<br>Jisha</h1>
        <div class="w-16 h-2 bg-blue-500"></div>

        <div class="flex flex-row gap-4 mt-auto">
            <a class="w-16 h-16 p-4 rounded-full bg-white transition-all bg-opacity-0 hover:bg-opacity-20" target="_blank" href="https://github.com/hunter-jisha"><img class="w-full h-full invert" alt="github" src="github.png"></a>
            <a class="w-16 h-16 p-4 rounded-full bg-white transition-all bg-opacity-0 hover:bg-opacity-20" target="_blank" href="https://www.linkedin.com/in/ceo-of-software-engineering/"><img class="w-full h-full invert" alt="linked" src="linkedin.png"></a>
        </div>
    </div>

    <div class="flex flex-col gap-6 p-12 pt-0 md:pt-16 md:p-16 w-full md:w-[40rem]">
        <p class="text-zinc-500 text-2xl whitespace-nowrap">Hi! 👋 I'm Hunter</p>
        <p class="text-zinc-300 text-4xl font-bold">A <span class="text-blue-500">full-stack</span> developer. Let me help you or your business meet your software development needs</p>
        <p class="text-zinc-500 text-2xl">I've been working in the industry for the past 4 years learning the latest and best technologies to excel in building fast, scalable applications</p>
        <a  on:click={() => document.getElementById("skills").scrollIntoView({behavior: "smooth", alignToTop: true})} href="#skills" class="hover:bg-blue-600 transition-all bg-blue-500 text-white w-min whitespace-nowrap text-2xl py-4 px-6 font-bold rounded-full hidden md:flex flex-row gap-4 items-center">
            <p>Learn More About Me</p>
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z" fill="currentColor" /></svg>
        </a>
        <a  target="_blank" href="https://app.flowcv.com/resume-feedback/83KPiMB16qcw_a0cvIevZ" class="hover:bg-blue-600 transition-all bg-blue-500 text-white w-min whitespace-nowrap text-lg py-4 px-6 font-bold rounded-full flex md:hidden flex-row gap-4 items-center">
            <p>See My Resume</p>
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5253 5.49475L10.5206 7.49475L15.0782 7.50541L5.47473 17.0896L6.88752 18.5052L16.5173 8.89479L16.5065 13.5088L18.5065 13.5134L18.5253 5.51345L10.5253 5.49475Z" fill="currentColor" /></svg>        </a>
    </div>
</div>

<div class="w-full bg-zinc-800 flex-shrink-0 flex flex-col p-6 gap-8 md:p-48 pb-12 justify-between relative items-center md:gap-12">
    <div id="skills" class="w-full md:w-auto flex flex-row md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:-translate-y-1/2 gap-4 md:gap-16">
        <button on:click={() => skillsMode = "frontend"} class="items-center md:items-start transition-all w-full md:w-72 md:h-72 flex flex-col {skillsMode === "frontend" ? "bg-blue-500" : "bg-zinc-600 hover:bg-zinc-500"} p-2 md:p-8 gap-4 text-white">
            <div class="h-16 w-16 bg-white bg-opacity-20 rounded-full p-4">
                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8Z" fill="currentColor" />
                    <path d="M8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z" fill="currentColor" />
                    <path d="M10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6C9.44771 6 9 6.44772 9 7C9 7.55228 9.44771 8 10 8Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V9H22V6C22 5.44772 21.5523 5 21 5ZM2 18V11H22V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z" fill="currentColor" />
                </svg>
            </div>

            <div class="w-full flex flex-col gap-2 items-center md:items-start md:pl-4">
                <p class="text-xl md:text-4xl font-bold">Frontend</p>
                <p class="text-sm md:text-xl">{skills.frontend.length} Skills</p>
            </div>
        </button>

        <button on:click={() => skillsMode = "backend"} class="items-center md:items-start transition-all w-full md:w-72 md:h-72 flex flex-col {skillsMode === "backend" ? "bg-blue-500 hover:bg-blue-500" : "bg-zinc-600 hover:bg-zinc-500"} p-2 md:p-8 gap-4 text-white">
            <div class="h-16 w-16 bg-white bg-opacity-20 rounded-full p-4">
                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21C8.55228 21 9 21.4477 9 22ZM13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22ZM16 23C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2ZM13 2C13 2.55228 12.5523 3 12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2ZM16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3ZM9 22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21C8.55228 21 9 21.4477 9 22ZM13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22ZM16 23C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23ZM23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17C22.5523 17 23 16.5523 23 16ZM23 12C23 11.4477 22.5523 11 22 11C21.4477 11 21 11.4477 21 12C21 12.5523 21.4477 13 22 13C22.5523 13 23 12.5523 23 12ZM22 7C22.5523 7 23 7.44771 23 8C23 8.55229 22.5523 9 22 9C21.4477 9 21 8.55229 21 8C21 7.44771 21.4477 7 22 7ZM2 15C2.55228 15 3 15.4477 3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15ZM2 11C2.55228 11 3 11.4477 3 12C3 12.5523 2.55228 13 2 13C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11ZM3 8C3 7.44771 2.55228 7 2 7C1.44772 7 1 7.44771 1 8C1 8.55229 1.44772 9 2 9C2.55228 9 3 8.55229 3 8ZM17 6H7C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7ZM14 10H10V14H14V10ZM8 8V16H16V8H8Z" fill="currentColor" />
                </svg>
            </div>

            <div class="flex flex-col gap-2 items-center md:items-start md:pl-4">
                <p class="text-xl md:text-4xl font-bold">Backend</p>
                <p class="text-sm md:text-xl">{skills.backend.length} Skills</p>
            </div>
        </button>

        <button on:click={() => skillsMode = "other"} class="items-center md:items-start transition-all w-full md:w-72 md:h-72 flex flex-col {skillsMode === "other" ? "bg-blue-500" : "bg-zinc-600 hover:bg-zinc-500"} p-2 md:p-8 gap-4 text-white">
            <div class="h-16 w-16 bg-white bg-opacity-20 rounded-full p-4">
                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 11H10V13H14V11Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" fill="currentColor" />
                </svg>
            </div>

            <div class="flex flex-col gap-2 items-center md:items-start md:pl-4">
                <p class="text-xl md:text-4xl font-bold">Other</p>
                <p class="text-sm md:text-xl">{skills.other.length} Skills</p>
            </div>
        </button>
    </div>

    {#if skillsMode === "frontend"}
        <div class="w-full flex flex-row gap-4 flex-wrap h-min justify-center">
            {#each skills.frontend as skill, index}
                <div in:fly={{delay: index * 50, x: -50}} class="h-16 md:h-24 w-40 md:w-72 flex items-center flex-shrink-0 flex-row p-1 md:p-4 rounded-2xl bg-white bg-opacity-20 md:gap-6">
                    <img class="h-3/4 md:h-full md:w-auto w-min aspect-square object-scale-down p-2" alt={skill.name} src={skill.icon}>
                    <div class="h-full w-full flex flex-col justify-around md:justify-between text-white">
                        <p class="text-xl md:text-2xl font-bold">{skill.name}</p>
                        <p class="text-md md:text-lg text-zinc-400 whitespace-nowrap">{skill.experience}</p>
                    </div>
                </div>
            {/each}
        </div>
    {:else if skillsMode === "backend"}
        <div class="w-full flex flex-row gap-4 flex-wrap h-min justify-center">
            {#each skills.backend as skill, index}
                <div in:fly={{delay: index * 50, x: -50}} class="h-16 md:h-24 w-40 md:w-72 flex items-center flex-shrink-0 flex-row p-1 md:p-4 rounded-2xl bg-white bg-opacity-20 md:gap-6">
                    <img class="h-3/4 md:h-full md:w-auto w-min aspect-square object-scale-down p-2" alt={skill.name} src={skill.icon}>
                    <div class="h-full w-full flex flex-col justify-around md:justify-between text-white">
                        <p class="text-xl md:text-2xl font-bold">{skill.name}</p>
                        <p class="text-md md:text-lg text-zinc-400 whitespace-nowrap">{skill.experience}</p>
                    </div>
                </div>
            {/each}
        </div>
    {:else if skillsMode === "other"}
        <div class="w-full flex flex-row gap-4 flex-wrap h-min justify-center">
            {#each skills.other as skill, index}
                <div in:fly={{delay: index * 50, x: -50}} class="h-16 md:h-24 w-40 md:w-72 flex items-center flex-shrink-0 flex-row p-1 md:p-4 rounded-2xl bg-white bg-opacity-20 md:gap-6">
                    <img class="h-3/4 md:h-full md:w-auto w-min aspect-square object-scale-down p-2" alt={skill.name} src={skill.icon}>
                    <div class="h-full w-full flex flex-col justify-around md:justify-between text-white">
                        <p class="text-xl md:text-2xl font-bold">{skill.name}</p>
                        <p class="text-md md:text-lg text-zinc-400 whitespace-nowrap">{skill.experience}</p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <div class="flex flex-col w-min gap-4 items-center">
        <p class="text-2xl text-zinc-500 whitespace-nowrap">Wondering if I have a skill?</p>
        <button on:click={() => document.getElementById("contact").scrollIntoView({behavior: "smooth", alignToTop: true})} class="text-white font-bold py-3 px-12 rounded-full bg-blue-500 text-xl md:text-2xl w-min whitespace-nowrap">Ask Me</button>
    </div>
</div>

<div id="certifications" class="w-full md:h-[50rem] bg-zinc-700 flex-shrink-0 flex flex-col items-center md:items-start p-12 md:p-24 gap-16 relative">
    <h2 class="text-5xl font-bold text-zinc-800">Certifications</h2>

    <div class="w-full flex flex-col gap-4 flex-wrap h-full md:w-min">
        {#each certs as cert}
            <div class="md:h-32 w-full md:w-[30rem] flex flex-shrink-0 flex-row p-4 rounded-2xl bg-white bg-opacity-20 gap-6">
                <img class="h-24 md:h-full aspect-square object-scale-down p-2" alt={cert.name} src={cert.icon}>
                <div class="h-full w-full flex flex-col justify-between text-white">
                    <p class="text-2xl font-bold">{cert.name}</p>
                    {#if cert.gotten}
                        <p class="text-lg text-zinc-400 whitespace-nowrap">{cert.gotten}</p>
                    {:else}
                        <p class="text-lg text-white  px-4 bg-blue-500 w-min rounded-full font-bold whitespace-nowrap">In Progress</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<div id="projects" class="w-full bg-zinc-800 flex-shrink-0 flex flex-col p-6 md:p-24 gap-16 relative">
    <h2 class="text-5xl font-bold text-zinc-400">Personal Projects</h2>

    <div class="w-full md:h-[40rem] flex flex-col md:flex-row gap-12 overflow-x-scroll">
        <div class="h-min md:h-full w-full md:w-[70rem] bg-opacity-30 border-4 border-white bg-white rounded-3xl flex-shrink-0 flex flex-col p-6 md:p-12 gap-4 items-start">
            <h3 class="text-zinc-800 font-bold text-5xl">Tikkit</h3>
            <p class="text-zinc-300 text-2xl">An open source IT service desk ticketing system. I noticed a need for this type of software after
                working in the IT industry and noticing a lack of good ticket management systems which is why
                I started this project. This application was built using Sveltekit & Tailwind for the frontend and 
                GraphQL on Express.js for the backend. Real time chat functionality is also included through the use
                of native websockets. I am currently still developing this project but updates are pushed regularly to
                the project's git page which you can view below.
            </p>

            <button class="py-2 px-8 rounded-full bg-blue-500 text-white font-bold text-2xl mt-auto">Github</button>
        </div>

        <div class="h-min md:h-full w-full md:w-[70rem] bg-opacity-30 border-4 border-white bg-white rounded-3xl flex-shrink-0 flex flex-col p-6 md:p-12 gap-4 items-start">
            <h3 class="text-zinc-800 font-bold text-5xl">This Website</h3>
            <p class="text-zinc-300 text-2xl">
                The page you're on was made by yours truly, using some of my favorite technologies.
                The core of the website is made using Sveltekit, which admitidly, is a little overpowered for a 
                simple portfolio site, styling is handled with Tailwind CSS, and the whole project is deployed 
                via Docker to my Digital Ocean cloud server.
            </p>

            <button class="py-2 px-8 rounded-full bg-blue-500 text-white font-bold text-2xl mt-auto">Github</button>
        </div>

        <div class="h-min md:h-full w-full md:w-[70rem] bg-opacity-30 border-4 border-white bg-white rounded-3xl flex-shrink-0 flex flex-col p-6 md:p-12 gap-4 items-start">
            <h3 class="text-zinc-800 font-bold text-5xl">Electric Datsun 240z</h3>
            <p class="text-zinc-300 text-2xl">
                I've always had a passion for electric vehichles but unfortunately they have always been out of my price range.
                Instead of trapping myself in emense amounts of credit card debt, I decided to do the next best thing: build my own!
                Two years ago I purchased a non-running 1972 Datsun 240z to convert to electric. Although this project is not quite ready 
                for the world to see, I'd love to talk about it.
            </p>
        </div>
    </div>
</div>

<div id="experience" class="w-full bg-zinc-700 flex-shrink-0 flex flex-col p-6 md:p-24 gap-16 relative">
    <h2 class="text-5xl font-bold text-zinc-400">Experience</h2>

    <div class="w-full md:h-[15rem] flex flex-col md:flex-row gap-4 p-8">
        <div class="flex-shrink-0 w-full md:w-[3px] h-[3px] md:h-full bg-zinc-800 relative rounded-full">
            <p class="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full text-3xl font-bold text-zinc-800">2018</p>
        </div>
        <div class="h-full w-full flex flex-row gap-8 bg-white bg-opacity-20 rounded-3xl p-8 items-center">
            <img class="object-scale-down w-16 h-16" src="icode.png" alt="icon">

            <div class="w-full h-full flex flex-col justify-center">
                <p class="text-3xl font-bold text-zinc-300">Curriculum Developer</p>
                <p class="text-lg text-zinc-700">iCode</p>
                <p class="text-2xl text-zinc-300">2018-2019</p>
            </div>
        </div>
        <div class="mt-12 md:mt-0 flex-shrink-0 w-full md:w-[3px] h-[3px] md:h-full bg-zinc-800 relative rounded-full">
            <p class="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full text-3xl font-bold text-zinc-800">2019</p>
        </div>
        <div class="h-full w-full flex flex-row gap-8 bg-white bg-opacity-20 rounded-3xl p-8 items-center">
            <img class="object-scale-down w-16 h-16" src="gfe.png" alt="gfe">

            <div class="w-full h-full flex flex-col justify-center">
                <p class="text-3xl font-bold text-zinc-300">Internship</p>
                <p class="text-lg text-zinc-700">Good Faith Energy</p>
                <p class="text-2xl text-zinc-300">2019-2020</p>
            </div>
        </div>
        <div class="mt-12 md:mt-0 flex-shrink-0 w-full md:w-[3px] h-[3px] md:h-full bg-zinc-800 relative rounded-full">
            <p class="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full text-3xl font-bold text-zinc-800">2020</p>
        </div>
        <div class="h-full md:w-[200%] flex flex-row gap-8 bg-white bg-opacity-20 rounded-3xl p-8 items-center">
            <img class="object-scale-down w-16 h-16" src="gfe.png" alt="gfe">

            <div class="w-full h-full flex flex-col justify-center">
                <p class="text-3xl font-bold text-zinc-300">Software Engineer</p>
                <p class="text-lg text-zinc-700">Good Faith Energy</p>
                <p class="text-2xl text-zinc-300">2020-Present</p>
            </div>
        </div>
        <div class="mt-12 md:mt-0 flex-shrink-0 w-full md:w-[3px] h-[3px] md:h-full bg-zinc-800 relative rounded-full">
            <p class="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full text-3xl font-bold text-zinc-800">Present</p>
        </div>
    </div>
</div>

<div id="contact" class="w-full bg-zinc-800 flex-shrink-0 flex flex-col p-12 md:p-24 pb-24 md:pb-24 gap-8 md:gap-16 relative ">
    <h2 class="text-5xl font-bold text-zinc-400">Contact Me</h2>

    <div class="w-full flex flex-col gap-2 md:gap-4 items-center">
        <Form handle={message} class="flex flex-col gap-8 w-full md:w-[60rem]">
            <div class="w-full h-full gap-2 md:gap-8 flex flex-col md:flex-row">
                <div class="w-full h-96 md:h-auto flex flex-col gap-2">
                    <label class="text-2xl text-white font-bold" for="message">Message</label>
                    <textarea class="hover:bg-opacity-30 transition-all focus:bg-opacity-30 focus:border-opacity-100 border-white border-2 border-opacity-0 p-4 resize-none text-white bg-white bg-opacity-20 w-full h-full rounded-2xl" name="message"></textarea>
                </div>
                <div class="h-full w-full flex flex-col justify-between gap-2 md:gap-4">
                    <div class="flex flex-col w-full gap-2">
                        <label class="text-2xl text-white font-bold" for="name">Your Name</label>
                        <input class="hover:bg-opacity-30 transition-all focus:bg-opacity-30 focus:border-opacity-100 border-white border-2 border-opacity-0 px-4 text-white w-full h-14 bg-white rounded-xl bg-opacity-20" type="text" name="name">
                    </div>
                    
                    <div class="flex flex-col w-full gap-2">
                        <label class="text-2xl text-white font-bold" for="email">Email</label>
                        <input class="hover:bg-opacity-30 transition-all focus:bg-opacity-30 focus:border-opacity-100 border-white border-2 border-opacity-0 px-4 text-white w-full h-14 bg-white rounded-xl bg-opacity-20" type="email" name="email">
                    </div>
        
                    <div class="flex flex-col w-full gap-2">
                        <label class="text-2xl text-white font-bold" for="name">Phone</label>
                        <input class="hover:bg-opacity-30 transition-all focus:bg-opacity-30 focus:border-opacity-100 border-white border-2 border-opacity-0 px-4 text-white w-full h-14 bg-white rounded-xl bg-opacity-20" type="tel" name="phone">
                    </div>
                </div>
            </div>

            <input class="w-full h-16 rounded-2xl text-xl text-white font-bold bg-blue-500 hover:bg-blue-600 transition-all" type="submit" value="Send Message">
        </Form>
    </div>
</div>