<script>
    import { fly, scale } from "svelte/transition"
    import { experience } from "../appVisibility"
    import * as easing from "svelte/easing"
    import Organization from "../icons/Organization.svelte";
    import Award from "../icons/Award.svelte";
    import Album from "../icons/Album.svelte";
    import W3 from "../icons/W3.svelte";

    let visible;

    experience.subscribe(value => {
        visible = value
    })

    let tabIndex = 0

</script>

{#if visible}
    <div transition:scale={{duration: 400, easing: easing.quadInOut}} class="overflow-hidden absolute top-0 left-0 w-full h-full bg-white flex flex-row">
        <div class="w-96 flex-shrink-0 flex flex-col h-full bg-stone-100 p-4 gap-4">
            <p class="text-4xl font-newyorkbold mb-4">Experience</p>

            <button on:click={() => tabIndex = 0} class="transition-all w-full h-12 flex flex-row gap-4 items-center p-3 rounded-xl {tabIndex == 0 ? "bg-black text-white" : " text-black"}">
                <div class="h-full aspect-square">
                    <Organization/>
                </div>

                <p class="text-xl">Experience</p>
            </button>

            <button on:click={() => tabIndex = 1} class="transition-all w-full h-12 flex flex-row gap-4 items-center p-3 rounded-xl {tabIndex == 1 ? "bg-black text-white" : " text-black"}">
                <div class="h-full aspect-square">
                    <Award/>
                </div>

                <p class="text-xl">Certifications</p>
            </button>

            <button on:click={() => tabIndex = 2} class="transition-all w-full h-12 flex flex-row gap-4 items-center p-3 rounded-xl {tabIndex == 2 ? "bg-black text-white" : " text-black"}">
                <div class="h-full aspect-square">
                    <Album/>
                </div>

                <p class="text-xl">Education</p>
            </button>
        </div>

        <div class="w-full h-full bg-white shadow-lg flex flex-row p-12 gap-24">
            {#if tabIndex == 0}
                <div in:fly={{duration: 500, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="invert p-8 w-64 h-96 bg-white object-contain shadow-2xl" src="icode.png" alt=""/>

                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">Curriculum Developer</p>
                        <p class="text text-stone-500">2018</p>
                    </div>
                </div>

                <div in:fly={{duration: 500, delay: 200, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="p-8 w-64 h-96 bg-sky-600 object-contain shadow-2xl" src="GFE.png" alt=""/>
                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">Software Engineer</p>
                        <p class="text text-stone-500">2019 - 2022</p>
                    </div>                
                </div>

                <div in:fly={{duration: 500, delay: 400, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="p-8 w-64 h-96 bg-[#008357] object-contain shadow-2xl" src="7Eleven.png" alt=""/>
                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">Software Engineer II</p>
                        <p class="text text-stone-500">2022 - Present</p>
                    </div>
                </div>
            {:else if tabIndex == 1}

                <div in:fly={{duration: 500, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="p-8 w-64 h-96 bg-white object-contain shadow-2xl" src="GoogleMarketing.png" alt=""/>
                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">Google Digital Marketing</p>
                        <p class="text text-stone-500">2021</p>
                    </div>
                </div>

                <div in:fly={{duration: 500, delay: 200, y: 100}} class="flex flex-col gap-6 items-center">
                    <div style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="flex p-8 w-64 h-96 bg-gray-700 object-contain shadow-2xl items-center justify-center">
                        <W3/>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">W3 HTML Certified</p>
                        <p class="text text-stone-500">2022</p>
                    </div>                
                </div>

                <div in:fly={{duration: 500, delay: 400, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="p-8 w-64 h-96 bg-[#FF9900] object-contain shadow-2xl" src="AWSCertifiedDev.png" alt=""/>

                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">AWS Certified Developer</p>
                        <p class="text text-stone-500">In Progress</p>
                    </div>
                </div>
            {:else if tabIndex == 2}
                <div in:fly={{duration: 500, y: 100}} class="flex flex-col gap-6 items-center">
                    <img style="box-shadow: 0px 10px 25px -2px rgba(0,0,0,0.4);" class="p-8 w-64 h-96 bg-[#074532] object-contain shadow-2xl" src="UTD.png" alt=""/>
                    <div class="flex flex-col items-center">
                        <p class="text-xl font-bold">University of Texas at Dallas</p>
                        <p class="text text-stone-500">Ongoing</p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}