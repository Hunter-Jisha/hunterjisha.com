<script>
    import Alert from "../lib/Alert.svelte";
    import AppIcon from "../lib/AppIcon.svelte";
    import HomeButton from "../lib/HomeButton.svelte";
    import IPadNewsWidget from "../lib/IPadNewsWidget.svelte";
    import IPadTimeAndDateWidget from "../lib/IPadTimeAndDateWidget.svelte";
    import IPadUpNextWidget from "../lib/IPadUpNextWidget.svelte";
    import { notes, appStore } from "../lib/appVisibility"
    import AppStore from "../lib/apps/AppStore.svelte";
    import Notes from "../lib/apps/Notes.svelte";
</script>

<svelte:head>
    <link rel="preload" as="image" href="background.jpg"/>
</svelte:head>
<div class="w-screen h-screen">
    <!--Background-->
    <div class="absolute w-full h-full top-0 left-0">
        <img src="/background.jpg" alt="background" class="w-full h-full object-cover">
    </div>

    <!--Main Container-->
    <div class="absolute w-full h-full top-0 left-0 flex flex-col py-2 px-4 items-center">
        <!--Top Bar-->
        <div class="w-full h-10 flex flex-row justify-end items-center gap-4">
            <img class="filter invert h-[60%] aspect-square" src="wifi.png" alt="wifi"/>
            <img class="filter invert h-full aspect-square" src="battery.png" alt="battery"/>
        </div>

        <!--Split for Ipad Style-->
        <div class="h-full w-full flex flex-row p-16 pb-0 gap-24">
            <!--Left Widget Section-->
            <div class="w-[40rem] flex flex-col gap-3">
                <IPadTimeAndDateWidget/>

                <!--Spacer-->
                <div class="h-4"></div>

                <IPadUpNextWidget/>

                <IPadNewsWidget/>
            </div>

            <div class="w-full flex flex-row gap-24 flex-wrap content-start" >
                <AppIcon onclick={() => appStore.set(true)} iconPath="/appIcons/store.png" name="Projects"/>
                <AppIcon onclick={() => notes.set(true)} iconPath="/appIcons/notes.png" name="About Me"/>
                <AppIcon iconPath="/appIcons/findmy.png" name="Find Me"/>
                <AppIcon iconPath="/appIcons/github.png" name="Github"/>
                <AppIcon iconPath="/appIcons/linkedin.png" name="LinkedIn"/>
                <AppIcon iconPath="/appIcons/books.png" name="Education"/>
                <AppIcon iconPath="appIcons/email.png" name="Email Me"/>
                <AppIcon iconPath="appIcons/phone.png" name="Call Me"/>
                <AppIcon iconPath="appIcons/messages.png" name="Text Me"/>
            </div>
        </div>

        <!--Bottom Bar-->
        <div class="flex-shrink-0 flex flex-row p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl gap-4 mb-6">
            <AppIcon iconPath="appIcons/email.png"/>
            <AppIcon iconPath="appIcons/phone.png"/>
            <AppIcon iconPath="appIcons/messages.png"/>
        </div>
    </div>

    <HomeButton/>
    <Alert/>

    <!--Apps-->
    <Notes/>
    <AppStore/>
</div>

