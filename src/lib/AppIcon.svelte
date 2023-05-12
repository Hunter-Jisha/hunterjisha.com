<script>
    export let iconPath = ""
    export let name = ""
    export let onclick = () => {}
</script>

<div class="row-span-1 col-span-1 flex items-center justify-center">
    <button on:click={onclick} class="w-16 md:w-20 flex flex-col gap-2 items-center h-min">
        <img class="w-full aspect-square rounded-xl md:rounded-[19px]" src={iconPath} alt={name}>
    
        {#if name}
            <p class="text-sm md:text-md text-white drop-shadow-md whitespace-nowrap">{name}</p>
        {/if}
    </button>
</div>
