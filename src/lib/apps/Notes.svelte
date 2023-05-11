<script>
    import { scale } from "svelte/transition"
    import NoteButton from "../NoteButton.svelte";
    import { notes } from "../appVisibility"
    import Search from "../icons/Search.svelte";
    import * as easing from "svelte/easing"
    import { onMount } from "svelte";
    import Trash from "../icons/Trash.svelte";
    import FileAdd from "../icons/FileAdd.svelte";
    import alert from "../alertStore"

    let visible;

    notes.subscribe(value => {
        visible = value
    })

    let notesData = []

    function loadNote(index)
    {
        selectedNoteIndex = index
        title = notesData[index].title
        content = notesData[index].content
    }

    let selectedNoteIndex = 0
    let title = ""
    let content = ""

    let loaded = false

    onMount(() => 
    {
        if(localStorage.getItem("notesData"))
        {
            notesData = JSON.parse(localStorage.getItem("notesData"))
        }
        else
        {
            notesData = [
                {
                    title: "About Me",
                    lastEdit: new Date(new Date() - 1000000000),
                    content: "Hi! I'm Hunter"
                }
            ]
        }

        loadNote(0)

        loaded = true
    })

    function updateNote()
    {
        if(loaded)
        {
            notesData[selectedNoteIndex].title = title
            notesData[selectedNoteIndex].content = content
            notesData[selectedNoteIndex].lastEdit = new Date()

            localStorage.setItem("notesData", JSON.stringify(notesData))
        }
    }

    function deleteNote(index)
    {
        if(!index)
        {
            alert.set("You cannot delete this note")
        }
        else
        {
            notesData.splice(index, 1)
            notesData = notesData

            if(index >= notesData.length)
            {
                loadNote(notesData.length - 1)
            }
            else
            {
                loadNote(index)
            }
            
            localStorage.setItem("notesData", JSON.stringify(notesData))
        }

    }

    let searchTerm = ""

    $: updateNote(title, content)
</script>

{#if visible}
    <div transition:scale={{duration: 400, easing: easing.quadInOut}} class="absolute top-0 left-0 w-full h-full bg-white flex flex-row">
        <!--Left Container-->
        <div class="w-96 flex-shrink-0 h-full flex flex-col gap-2 bg-stone-100 p-4">
            <p class="text-black font-bold text-3xl p-4">Notes</p>

            <div class="h-10 w-full flex flex-row items-center bg-stone-300 text-stone-500 rounded-xl">
                <div class="h-full aspect-square p-2">
                    <Search/>
                </div>

                <input bind:value={searchTerm} class="bg-transparent w-full h-full placeholder:text-lg text-lg" type="text" placeholder="Search">
            </div>
            
            <!--Note Container-->
            <div class=" flex flex-col w-full py-4">
                {#each notesData as note, index}
                    {#if note.title.toLowerCase().includes(searchTerm.toLowerCase())}
                        <NoteButton onclick={() => loadNote(index)} selected={selectedNoteIndex === index} title={note.title} lastEdit={note.lastEdit} content={note.content}/>
                    {/if}
                {/each}
            </div>
        </div>

        <!--Right Container-->
        <div class="w-full h-full flex flex-col p-6 gap-3">
            <div class="flex flex-row w-full h-11 gap-8 justify-end items-center">
                <button on:click={() => deleteNote(selectedNoteIndex)} class="h-full rounded-full p-2 aspect-square text-yellow-500 transition-all duration-200 hover:bg-yellow-100">
                    <Trash/>
                </button>
                <button on:click={() => {notesData = [...notesData, {title: "Untitled", lastEdit: new Date(), content: ""}]; loadNote(notesData.length-1);}} class="h-full rounded-full p-2 aspect-square text-yellow-500 transition-all duration-200 hover:bg-yellow-100">
                    <FileAdd/>
                </button>
            </div>

            <input class="text-black font-bold text-3xl w-full h-10" bind:value={title} type="text"/>

            <textarea class="text-black resize-none text-xl w-full h-full" bind:value={content}/>
        </div>
    </div>
{/if}