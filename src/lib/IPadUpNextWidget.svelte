<script>
    import Chevron from "./icons/Chevron.svelte";

</script>
<button onclick={() => window.open("mailto:hunterjisha@gmail.com", '_blank')} class="w-full flex flex-col p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-2xl gap-4 pb-8">
    <div class="flex flex-row h-6 gap-4 items-center">
        <img class="h-full aspect-square" src="appIcons/calendar.png" alt="calendar">
        <p class="font-light text-lg text-stone-600">UP NEXT</p>

        <div class="h-full aspect-square -rotate-90 ml-auto text-stone-600">
            <Chevron/>
        </div>
    </div>

    <div class="w-full items-start flex flex-col relative pl-4 text-stone-800">
        <!--Color decorator-->
        <div class="h-3/4 top-1/2 -translate-y-1/2 w-1 rounded-full bg-red-500 absolute left-0"></div>

        <p class="font-bold text-lg">Reach Out to Hunter</p>
        <p class="text-sm">hunterjisha@gmail.com</p>
        <p class="text-sm">(903) 348-9781</p>
    </div>
</button>