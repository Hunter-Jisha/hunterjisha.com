<script setup lang="ts">
import { ref } from 'vue'
import AppWindow from '../AppWindow.vue'

type TabId = 'work' | 'certs' | 'education'
type Entry = { title: string; org: string; years: string; image: string | null; bg: string; invert?: boolean }

const tab = ref<TabId>('work')
const menuOpen = ref(false)

const tabs: { id: TabId; label: string; path: string }[] = [
  {
    id: 'work',
    label: 'Experience',
    path: 'M17 15h2v2h-2v-2ZM19 11h-2v2h2v-2ZM13 7h10v14H1V3h12v4ZM8 5h3v2H8V5Zm3 14v-2H8v2h3Zm0-4v-2H8v2h3Zm0-4V9H8v2h3Zm10 8V9h-8v2h2v2h-2v2h2v2h-2v2h8ZM3 19v-2h3v2H3Zm0-4h3v-2H3v2Zm3-4V9H3v2h3ZM3 7h3V5H3v2Z',
  },
  {
    id: 'certs',
    label: 'Certifications',
    path: 'M19 9a7 7 0 0 1-3 5.75V22h-2.59L12 20.59 10.59 22H8v-7.25A7 7 0 1 1 19 9Zm-2 0A5 5 0 1 0 7 9a5 5 0 0 0 10 0Zm-7 10.76 2-2 2 2v-4.05a7 7 0 0 1-4 0v4.05Z',
  },
  {
    id: 'education',
    label: 'Education',
    path: 'M2 19a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v14Zm18 0a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v8h2.4L14 9.86 15.6 12H18V4h1a1 1 0 0 1 1 1v14ZM16 4h-4v5.34L14 6.66 16 9.34V4Z',
  },
]

const entries: Record<TabId, Entry[]> = {
  work: [
    { title: 'Curriculum Developer', org: 'iCode', years: '2018', image: '/media/icode.png', bg: '#111111', invert: true },
    { title: 'Software Engineer', org: 'GFE', years: '2019 – 2022', image: '/media/GFE.png', bg: '#0369a1' },
    { title: 'SE II | Tech Lead', org: '7-Eleven', years: '2022 – 2025', image: '/media/7Eleven.png', bg: '#008357' },
    { title: 'Full Stack Developer', org: 'Bell', years: '2025 – 2026', image: '/media/bell.png', bg: '#ad2227' },
    { title: 'Senior Software Engineer', org: '7-Eleven', years: '2026 – Present', image: '/media/7Eleven.png', bg: '#008357' },
  ],
  certs: [
    { title: 'Google Digital Marketing', org: 'Google', years: '2021', image: '/media/GoogleMarketing.png', bg: '#ffffff' },
    { title: 'W3 HTML Certified', org: 'W3Schools', years: '2022', image: null, bg: '#374151' },
    { title: 'AWS Certified Developer', org: 'Amazon Web Services', years: 'In Progress', image: '/media/AWSCertifiedDev.png', bg: '#ff9900' },
  ],
  education: [
    { title: 'University of Texas at Dallas', org: 'Computer Science', years: 'Ongoing', image: '/media/UTD.png', bg: '#074532' },
  ],
}

function select(id: TabId) {
  tab.value = id
  menuOpen.value = false
}
</script>

<template>
  <AppWindow>
    <div class="relative flex h-full bg-white">
      <!-- Sidebar -->
      <aside
        class="absolute inset-y-0 left-0 z-30 flex w-full max-w-sm shrink-0 flex-col gap-1.5 bg-[#f5f5f7] p-4 transition-transform duration-400 ease-[var(--ease-ios)] lg:static lg:w-[21rem] lg:max-w-none lg:translate-x-0"
        :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <h1 class="mb-4 px-2 pt-2 font-serif text-[34px] font-bold tracking-tight text-black">
          Experience
        </h1>

        <button
          v-for="item in tabs"
          :key="item.id"
          class="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors"
          :class="tab === item.id ? 'bg-black text-white' : 'text-black hover:bg-black/6'"
          @click="select(item.id)"
        >
          <svg viewBox="0 0 24 24" class="h-[22px] w-[22px] shrink-0 fill-current">
            <path fill-rule="evenodd" :d="item.path" />
          </svg>
          <span class="text-[17px]">{{ item.label }}</span>
        </button>
      </aside>

      <div
        v-if="menuOpen"
        class="absolute inset-0 z-20 bg-black/20 lg:hidden"
        @click="menuOpen = false"
      ></div>

      <!-- Content -->
      <div class="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div class="flex h-14 shrink-0 items-center px-4 lg:hidden">
          <button class="flex items-center gap-0.5 text-[17px] text-black" @click="menuOpen = true">
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path d="M14.7 5.7 13.3 4.3 5.6 12l7.7 7.7 1.4-1.4L8.4 12l6.3-6.3Z" />
            </svg>
            Categories
          </button>
        </div>

        <TransitionGroup
          tag="div"
          name="card"
          class="mx-auto my-auto grid w-full max-w-[68rem] grid-cols-2 gap-x-6 gap-y-9 px-6 py-10 sm:grid-cols-3 sm:gap-x-9 lg:grid-cols-4 lg:px-12 lg:pt-12 xl:grid-cols-5"
        >
          <figure
            v-for="(entry, index) in entries[tab]"
            :key="tab + entry.title + entry.years"
            class="flex flex-col items-center gap-3 text-center"
            :style="{ '--delay': `${index * 70}ms` }"
          >
            <div
              class="flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-[18px] p-6 shadow-[0_16px_34px_-10px_rgba(0,0,0,0.45)]"
              :style="{ background: entry.bg }"
            >
              <img
                v-if="entry.image"
                :src="entry.image"
                :alt="entry.org"
                class="h-full w-full object-contain"
                :class="entry.invert ? 'invert' : ''"
                loading="lazy"
              />
              <span v-else class="font-display text-[44px] leading-none text-[#04aa6b]">W3</span>
            </div>

            <figcaption class="flex flex-col">
              <span class="text-[16px] font-bold leading-tight text-black">{{ entry.title }}</span>
              <span class="text-[14px] text-neutral-500">{{ entry.org }}</span>
              <span class="text-[13px] text-neutral-400">{{ entry.years }}</span>
            </figcaption>
          </figure>
        </TransitionGroup>
      </div>
    </div>
  </AppWindow>
</template>

<style scoped>
.card-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s var(--ease-ios);
  transition-delay: var(--delay);
}
.card-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.card-leave-active {
  transition: opacity 0.15s ease;
  position: absolute;
}
.card-leave-to {
  opacity: 0;
}
</style>
