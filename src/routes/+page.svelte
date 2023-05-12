<script>
    import Alert from "../lib/Alert.svelte";
    import AppIcon from "../lib/AppIcon.svelte";
    import HomeButton from "../lib/HomeButton.svelte";
    import IPadNewsWidget from "../lib/IPadNewsWidget.svelte";
    import IPadTimeAndDateWidget from "../lib/IPadTimeAndDateWidget.svelte";
    import IPadUpNextWidget from "../lib/IPadUpNextWidget.svelte";
    import { notes, appStore, maps, experience } from "../lib/appVisibility"
    import AppStore from "../lib/apps/AppStore.svelte";
    import Experience from "../lib/apps/Experience.svelte";
    import Maps from "../lib/apps/Maps.svelte";
    import Notes from "../lib/apps/Notes.svelte";
</script>

<svelte:head>
    <meta name="theme-color" content="#d30"/>
</svelte:head>
<div class="fixed w-screen h-[calc(100dvh)] overflow-hidden bg-blue-500">
    <!--Background-->
    <div class="absolute w-full h-full top-0 left-0">
        <img src="/background.webp" alt="background" class="w-full h-full object-cover">
    </div>

    <!--Main Container-->
    <div class="absolute w-full h-full top-0 left-0 flex flex-col py-2 px-4 items-center">
        <!--Top Bar-->
        <div class="w-full h-6 md:h-10 flex flex-row justify-end items-center gap-2 md:gap-4">
            <img class="filter invert h-[60%] aspect-square" src="wifi.png" alt="wifi"/>
            <img class="filter invert h-full aspect-square" src="battery.png" alt="battery"/>
        </div>

        <!--Split for Ipad Style-->
        <div class="h-full w-full flex flex-row md:p-16 pb-0 gap-24 ">
            <!--Left Widget Section-->
            <div class="w-[40rem] hidden lg:flex flex-col gap-3 ">
                <IPadTimeAndDateWidget/>

                <!--Spacer-->
                <div class="h-4"></div>

                <IPadUpNextWidget/>

                <IPadNewsWidget/>
            </div>

            <div class="w-full h-min gap-y-8 lg:gap-y-24 grid grid-cols-4 lg:grid-cols-6 grid-rows-3 mt-4" >
                <AppIcon onclick={() => appStore.set(true)} iconPath="/appIcons/store.webp" name="Projects"/>
                <AppIcon onclick={() => notes.set(true)} iconPath="/appIcons/notes.webp" name="About Me"/>
                <AppIcon onclick={() => maps.set(true)} iconPath="/appIcons/findmy.webp" name="Find Me"/>
                <AppIcon onclick={() => window.open("https://github.com/hunter-jisha", '_blank')} iconPath="/appIcons/github.webp" name="Github"/>
                <AppIcon onclick={() => window.open("https://www.linkedin.com/in/ceo-of-software-engineering/", '_blank')} iconPath="/appIcons/linkedin.webp" name="LinkedIn"/>
                <AppIcon onclick={() => experience.set(true)} iconPath="/appIcons/books.webp" name="Experience"/>
                <AppIcon onclick={() => window.open("mailto:hunterjisha@gmail.com", '_blank')} iconPath="appIcons/email.webp" name="Email Me"/>
                <AppIcon onclick={() => window.open("tel:9033489781", '_blank')} iconPath="appIcons/phone.webp" name="Call Me"/>
                <AppIcon onclick={() => window.open("sms:9033489781?&body=Hi%20Hunter%21%20I%27m%20reaching%20out%20for...", '_blank')} iconPath="appIcons/messages.webp" name="Text Me"/>
            </div>
        </div>

        <!--Bottom Bar-->
        <div class="flex-shrink-0 flex flex-row p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl gap-4 mb-6">
            <AppIcon onclick={() => window.open("mailto:hunterjisha@gmail.com", '_blank')} iconPath="appIcons/email.webp"/>
            <AppIcon onclick={() => window.open("tel:9033489781", '_blank')} iconPath="appIcons/phone.webp"/>
            <AppIcon onclick={() => window.open("sms:9033489781?&body=Hi%20Hunter%21%20I%27m%20reaching%20out%20for...", '_blank')} iconPath="appIcons/messages.webp"/>
        </div>
    </div>

    <HomeButton/>
    <Alert/>
    <Maps/>

    <!--Apps-->
    <Notes/>
    <AppStore/>
    <Experience/>
</div>

