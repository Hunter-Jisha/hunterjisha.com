<script>
    import { fade } from "svelte/transition"
    import errorMessage from "./alertStore"

    let message = ""

    errorMessage.subscribe(value =>
    {
        message = value
        console.log(value)
    })

</script>

{#if message !== ""}
    <div transition:fade={{duration: 100}} class="fixed w-screen h-screen bg-black bg-opacity-30 flex items-cetner jsutify-center z-50">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white rounded-2xl items-center justify-center">
            <p class="text-black font-bold text-xl text-center p-6">{message}</p>
            <div class="w-full h-[0.5px] bg-stone-300"></div>
            <button on:click={() => errorMessage.set("")} class="text-blue-500 text-lg font-bold justify-center items-center w-full h-12">OK</button>
        </div>
    </div>
{/if}