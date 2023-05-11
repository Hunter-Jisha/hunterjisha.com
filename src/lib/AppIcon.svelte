<script>
    export let iconPath = ""
    export let name = ""
    export let onclick = () => {}
</script>

<button on:click={onclick} class="flex flex-col gap-2 items-center h-min">
    <img class="w-20 h-20 rounded-[19px]" src={iconPath} alt={name}>

    {#if name}
        <p class="text-white drop-shadow-md">{name}</p>
    {/if}
</button>