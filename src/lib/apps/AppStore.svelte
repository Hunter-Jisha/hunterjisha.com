<script>
    import { scale } from "svelte/transition"
    import { appStore } from "../appVisibility"
    import * as easing from "svelte/easing"
    import Chevron from "../icons/Chevron.svelte";

    let visible;

    appStore.subscribe(value => {
        visible = value
    })

    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ]
</script>

{#if visible}
    <div transition:scale={{duration: 400, easing: easing.quadInOut}} class="absolute top-0 left-0 w-full h-full bg-white flex flex-col p-4 md:p-8 gap-0 md:gap-4">
        <p class="text-sm md:text-xl text-stone-500">{daysOfWeek[(new Date()).getDay()]}, {months[(new Date()).getMonth()].toUpperCase()} {new Date().getDate()}</p>
        <div class="w-full h-12 flex flex-row justify-between items-end md:items-center">
            <p class="font-bold text-4xl md:text-5xl">TODAY</p>
            <img class="h-full aspect-square rounded-full" src="blankProfile.png" alt="profile">
        </div>
        
        <div class="w-full h-0 md:h-[0.5px] bg-stone-300 mb-4"></div>

        <!--Home Container-->
        <div class="w-full flex flex-col md:h-[60rem] md:grid grid-cols-1 md:grid-cols-4 grid-rows-9 md:grid-rows-6 gap-4 md:gap-12 overflow-y-scroll md:overflow-hidden">
            <div class="h-72 md:h-auto col-span-1 flex-shrink-0 md:col-span-2 row-span-3 flex flex-col bg-blue-500 relative rounded-3xl p-6 shadow-lg">
                <p class="text-stone-300 front-thin text-md">MEET THE DEVELOPER</p>
                <p class="text-white font-bold text-4xl">Hunter Jisha</p>
                <img class="absolute bottom-0 md:left-1/2 right-0 -translate-x-1/2 h-3/5 " src="memoji.png" alt="memoji"/>
            </div>

            <div class="relative h-72 md:h-auto flex-shrink-0 col-span-2 row-span-3 flex flex-col rounded-3xl justify-end gap-4 overflow-hidden shadow-lg">
                <!--Background- Image-->
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="syntextWallpaper.png" alt="syntext"/>

                <div class="w-full flex p-4 flex-row backdrop-blur-md gap-4 items-center">
                    <div class="h-16 aspect-square bg-stone-900 rounded-2xl flex items-center justify-center p-3">
                        <img src="syntextLogo.png" alt="syntext"/>
                    </div>

                    <div class="flex flex-col h-full">
                        <p class="text-white font-bold text-lg">Syntext</p>
                        <p class="text-white font-light">Read Easier</p>
                    </div>

                    <div class="ml-auto h-10 aspect-square text-white -rotate-90">
                        <Chevron/>
                    </div>
                </div>  
            </div>

            <div class="relative h-72 md:h-auto flex-shrink-0 col-span-2 row-span-3 flex flex-col rounded-3xl justify-end gap-4 overflow-hidden shadow-lg">
                <!--Background- Image-->
                <img class="absolute top-0 left-0 w-full h-full object-cover" src="websiteScreenshot.png" alt="syntext"/>

                <div class="w-full flex p-4 flex-row backdrop-blur-md bg-black bg-opacity-10 gap-4 items-center">
                    <div class="h-16 aspect-square bg-white rounded-2xl flex items-center justify-center p-3">
                        <img src="HJ.png" alt="syntext"/>
                    </div>

                    <div class="flex flex-col h-full">
                        <p class="text-white font-bold text-lg">HunterJisha.com</p>
                        <p class="text-white font-light">Website</p>
                    </div>

                    <div class="ml-auto h-10 aspect-square text-white -rotate-90">
                        <Chevron/>
                    </div>
                </div>  
            </div>

            <div class="h-32 flex-shrink-0 md:h-0 md:hidden"></div>
        </div>
    </div>
{/if}