<script>
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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

    let time = new Date()

    function updateTime()
    {
        time = new Date()
        setTimeout(updateTime, 60000)
    }

    function convertTo12HourFormat(hour) {
        if (hour === 0 || hour === 24) {
            return 12;
        } else if (hour > 12) {
            return hour - 12;
        } else {
            return hour;
        }
    }

    updateTime()
</script>

<div class="flex flex-col w-full text-white drop-shadow-md gap-2">
    <p class="text-8xl">{convertTo12HourFormat(time.getHours())}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}</p>
    <p class="text-3xl">{daysOfWeek[time.getDay()]}, {months[time.getMonth()]} {time.getDate()}</p>

</div>