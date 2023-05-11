import { writable } from "svelte/store";

let errorMessage = writable("")

errorMessage.subscribe(value => 
    {
        if(value !== "")
        {
            setTimeout(() => errorMessage.set(""), 5000)
        }
    }
)

export default errorMessage