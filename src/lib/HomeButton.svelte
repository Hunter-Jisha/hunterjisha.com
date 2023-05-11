<script>
    import { fly } from "svelte/transition"
    import { appStore, notes } from "./appVisibility"

    export let visible

    notes.subscribe(value => 
    {
        visible = value
    })

    appStore.subscribe(value => 
    {
        visible = value
    })

    function goHome()
    {
        notes.set(false)
        appStore.set(false)
    }
</script>

{#if visible}
    <button on:click={goHome} in:fly={{duration: 200, delay: 500, y: 100}} style="box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.5);" class="w-20 h-20 bg-white rounded-full fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
        <div class="w-7 h-7 border-2 border-stone-400 rounded-lg"></div>
    </button>
{/if}