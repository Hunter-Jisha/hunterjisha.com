<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { Component } from 'vue'
import { apps, dockApps, openApp, launchOrigin, goHome, syncFromHash } from './apps'
import type { App, ScreenId } from './apps'
import AppIcon from './components/AppIcon.vue'
import StatusBar from './components/StatusBar.vue'
import AlertDialog from './components/AlertDialog.vue'
import ClockWidget from './components/widgets/ClockWidget.vue'
import UpNextWidget from './components/widgets/UpNextWidget.vue'
import NewsWidget from './components/widgets/NewsWidget.vue'
import ProjectsApp from './components/apps/ProjectsApp.vue'
import NotesApp from './components/apps/NotesApp.vue'
import FindMeApp from './components/apps/FindMeApp.vue'
import ExperienceApp from './components/apps/ExperienceApp.vue'

const screens: Record<ScreenId, Component> = {
  projects: ProjectsApp,
  notes: NotesApp,
  findme: FindMeApp,
  experience: ExperienceApp,
}
const screenIds = Object.keys(screens) as ScreenId[]

// Every app sits on the home screen. The dock repeats a few of them, as iPadOS does.
const dock: App[] = dockApps.map((id) => apps.find((app) => app.id === id)!)

const originStyle = computed(() => ({
  '--origin-x': `${launchOrigin.value.x * 100}%`,
  '--origin-y': `${launchOrigin.value.y * 100}%`,
}))

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') goHome()
}
const onPop = () => syncFromHash(screenIds)

onMounted(() => {
  syncFromHash(screenIds)
  window.addEventListener('keydown', onKey)
  window.addEventListener('popstate', onPop)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('popstate', onPop)
})
</script>

<template>
  <main class="relative h-dvh w-screen overflow-hidden">
    <!-- Wallpaper -->
    <picture>
      <source media="(orientation: portrait)" srcset="/media/wallpaper-portrait.webp" type="image/webp" />
      <source srcset="/media/wallpaper.webp" type="image/webp" />
      <img
        src="/media/wallpaper.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />
    </picture>

    <!-- Home screen. It stays mounted and recedes behind an opening app. -->
    <div
      class="absolute inset-0 flex flex-col transition-all duration-500 ease-[var(--ease-ios)]"
      :class="openApp ? 'scale-[1.06] opacity-0' : 'scale-100 opacity-100'"
      :aria-hidden="!!openApp"
      :inert="!!openApp"
    >
      <StatusBar />

      <div
        class="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-4 pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:overflow-hidden lg:px-10 lg:pt-6 xl:gap-14 xl:px-14"
      >
        <!-- Widget column, iPad only -->
        <aside class="hidden shrink-0 flex-col gap-3 lg:flex lg:w-[21rem] xl:w-[23rem]">
          <ClockWidget />
          <UpNextWidget />
          <NewsWidget />
        </aside>

        <!-- App grid -->
        <div
          class="grid w-full grid-cols-4 justify-items-center gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:w-auto lg:max-w-[44rem] lg:flex-1 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-9"
        >
          <AppIcon v-for="app in apps" :key="app.id" :app="app" />
        </div>
      </div>

      <!-- Dock -->
      <div class="flex shrink-0 justify-center px-4 pb-3 sm:pb-5">
        <div class="glass rounded-[24px] p-2 sm:rounded-[26px] sm:p-2.5">
          <div class="relative z-10 flex items-center gap-2 sm:gap-2.5">
            <AppIcon
              v-for="app in dock"
              :key="app.id"
              :app="app"
              :show-label="false"
              size="dock"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Open app -->
    <Transition name="app">
      <div v-if="openApp" class="app-layer absolute inset-0 z-40" :style="originStyle">
        <component :is="screens[openApp]" />
      </div>
    </Transition>

    <AlertDialog />
  </main>
</template>

<style scoped>
/* Apps grow out of the icon that launched them and shrink back into it. */
.app-layer {
  transform-origin: var(--origin-x) var(--origin-y);
}

.app-enter-active,
.app-leave-active {
  transition:
    transform 0.45s var(--ease-ios),
    opacity 0.28s var(--ease-ios),
    border-radius 0.45s var(--ease-ios);
  overflow: hidden;
}

.app-enter-from,
.app-leave-to {
  transform: scale(0.14);
  opacity: 0;
  border-radius: 26%;
}

.app-enter-to,
.app-leave-from {
  border-radius: 0;
}
</style>
