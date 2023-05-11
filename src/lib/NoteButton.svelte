<script>
    export let title="Untitled"
    export let lastEdit = new Date()
    export let content = ""

    function formatDate(date) 
    {
        date = new Date(date)
        let now = new Date();
        
        // Format the date to AM/PM
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;

        // Check if the date is from today
        if (date.toDateString() === now.toDateString()) {
            return strTime;
        }
        
        // Check if the date is from yesterday
        let yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        
        // If the date is not from today or yesterday, return the month and day
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[date.getMonth()] + ' ' + date.getDate();
    }

    export let selected = false

    export let onclick = () => {}
</script>

<button on:click={() => {onclick(); selected = !selected}} class="w-full flex flex-col p-2 rounded-xl pl-8 {selected ? "bg-yellow-500 text-white" : "text-black"}">
    <p class="font-bold">{title}</p>

    <p>{formatDate(lastEdit)} {content.substring(0, 25)}</p>
</button>