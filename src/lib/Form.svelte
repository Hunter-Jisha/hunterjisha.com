<script>
    let classVariable = ""
    export {classVariable as class}

    export let handle

    function formSubmit(event)
    {
        const formData = new FormData(event.target);

        const data = {};
        for (let field of formData) {
        const [key, value] = field;
        data[key] = value;
        }
        
        handle(data)
    }
</script>

<form class="{classVariable}" on:submit|preventDefault={formSubmit}>
    <slot/>
</form>