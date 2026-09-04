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

const homeApps = apps.filter((app) => !dockApps.includes(app.id))
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
        class="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-4 pt-4 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:overflow-hidden lg:px-12 lg:pt-0 xl:gap-24"
      >
        <!-- Widget column. Beside the icons on iPad, stacked below them on phones. -->
        <aside
          class="order-2 flex w-full shrink-0 flex-col gap-4 lg:order-1 lg:w-[24rem] xl:w-[26rem]"
        >
          <div class="hidden lg:block">
            <ClockWidget />
          </div>
          <div class="hidden h-2 lg:block"></div>
          <UpNextWidget />
          <NewsWidget />
        </aside>

        <!-- App grid -->
        <div
          class="order-1 grid w-full grid-cols-4 justify-items-center gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-9 lg:order-2 lg:w-auto lg:max-w-[34rem] lg:gap-x-8 lg:gap-y-11 lg:self-center"
        >
          <AppIcon v-for="app in homeApps" :key="app.id" :app="app" />
        </div>
      </div>

      <!-- Dock -->
      <div class="flex shrink-0 justify-center px-4 pb-4 sm:pb-6">
        <div class="glass flex items-center gap-3 rounded-[28px] p-3 sm:gap-4 sm:rounded-[32px]">
          <div class="relative z-10 flex items-center gap-3 sm:gap-4">
            <AppIcon v-for="app in dock" :key="app.id" :app="app" :show-label="false" />
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
