<script setup lang="ts">
import AppWindow from '../AppWindow.vue'
import { useNow, dayName, monthName } from '../../clock'

const now = useNow()

type Project = {
  name: string
  tagline: string
  href: string | null
  cover: string | null
  logo: string
  logoBg: string
  logoPad: string
}

const projects: Project[] = [
  {
    name: 'Cubify™',
    tagline: 'Solve the cube, faster',
    href: 'https://cubify.app',
    cover: null,
    logo: '/icons/cubify.png',
    logoBg: 'bg-white',
    logoPad: 'p-0',
  },
  {
    name: 'Syntext',
    tagline: 'Read Easier',
    href: null,
    cover: '/media/syntextWallpaper.png',
    logo: '/media/syntextLogo.png',
    logoBg: 'bg-neutral-900',
    logoPad: 'p-3',
  },
  {
    name: 'HunterJisha.com',
    tagline: 'Website',
    href: 'https://hunterjisha.com',
    cover: '/media/websiteScreenshot.webp',
    logo: '/media/HJ.png',
    logoBg: 'bg-white',
    logoPad: 'p-3',
  },
]

function open(project: Project) {
  if (project.href) window.open(project.href, '_blank')
}
</script>

<template>
  <AppWindow>
    <div class="flex h-full flex-col overflow-y-auto bg-[#f2f2f7]">
      <header class="sticky top-0 z-20 glass-panel px-5 pb-3 pt-5 sm:px-9 sm:pt-7">
        <div class="mx-auto w-full max-w-[72rem]">
        <p class="text-[13px] font-bold uppercase tracking-wide text-neutral-500">
          {{ dayName(now) }}, {{ monthName(now) }} {{ now.getDate() }}
        </p>
        <div class="flex items-end justify-between">
          <h1 class="font-display text-[34px] leading-tight tracking-[-0.02em] text-black sm:text-[42px]">
            Today
          </h1>
          <img
            src="/media/blankProfile.png"
            alt="Profile"
            class="h-9 w-9 rounded-full ring-1 ring-black/10 sm:h-11 sm:w-11"
          />
        </div>
        </div>
      </header>

      <div class="mx-auto flex w-full max-w-[72rem] flex-col gap-5 px-5 pb-24 pt-5 sm:px-9 sm:pb-28 lg:grid lg:grid-cols-2 lg:gap-7">
        <!-- Meet the developer -->
        <article
          class="relative flex h-72 flex-col overflow-hidden rounded-[28px] p-6 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.4)] sm:h-80 lg:col-span-2 lg:h-[19rem]"
          style="background: linear-gradient(135deg, #0a84ff 0%, #0060df 55%, #4b2ecc 100%)"
        >
          <p class="relative z-10 text-[13px] font-bold uppercase tracking-wide text-white/70">
            Meet the developer
          </p>
          <p class="relative z-10 font-display text-[34px] leading-tight text-white sm:text-[44px]">
            Hunter Jisha
          </p>
          <p class="relative z-10 mt-1 max-w-sm text-[15px] text-white/85">
            Full stack engineer in Dallas, Texas. Seven years of shipping web and mobile software.
          </p>
          <img
            src="/media/memoji.png"
            alt=""
            class="absolute bottom-0 right-4 h-3/5 drop-shadow-2xl sm:right-12 lg:left-1/2 lg:right-auto lg:h-4/5 lg:-translate-x-1/2"
          />
        </article>

        <!-- Project cards -->
        <article
          v-for="project in projects"
          :key="project.name"
          class="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[28px] shadow-[0_14px_40px_-14px_rgba(0,0,0,0.4)] sm:h-80 lg:h-[21rem]"
          :class="project.href ? 'cursor-pointer' : ''"
          @click="open(project)"
        >
          <img
            v-if="project.cover"
            :src="project.cover"
            alt=""
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-else
            class="absolute inset-0"
            style="background: linear-gradient(140deg, #ff9f0a 0%, #ff375f 50%, #bf5af2 100%)"
          ></div>

          <div class="glass-dark relative z-10 m-3 flex items-center gap-3.5 rounded-[22px] p-3">
            <div
              class="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] shadow-md"
              :class="[project.logoBg, project.logoPad]"
            >
              <img :src="project.logo" alt="" class="h-full w-full object-contain" />
            </div>

            <div class="relative z-10 min-w-0 flex-1">
              <p class="truncate text-[17px] font-bold text-white">{{ project.name }}</p>
              <p class="truncate text-[14px] text-white/70">{{ project.tagline }}</p>
            </div>

            <span
              v-if="project.href"
              class="relative z-10 rounded-full bg-[#007aff] px-4 py-1.5 text-[14px] font-bold text-white"
            >
              Open
            </span>
          </div>
        </article>
      </div>
    </div>
  </AppWindow>
</template>
