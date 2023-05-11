<script>
    import { scale } from "svelte/transition"
    import { maps } from "../appVisibility"
    import * as easing from "svelte/easing"

    let visible;

    maps.subscribe(value => {
        visible = value
    })

</script>

{#if visible}
    <div transition:scale={{duration: 400, easing: easing.quadInOut}} class="absolute top-0 left-0 w-full h-full bg-white flex">
        <iframe class="w-full h-full border-none"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDXjz7jSaANInJVXd9HWym0_4Igwk7EGSg
                &q=Dallas, TX">
        </iframe>
    </div>
{/if}