<script setup lang="ts">
import AppWindow from '../AppWindow.vue'

const contact: { label: string; value: string; href: string }[] = [
  { label: 'Email', value: 'hunterjisha@gmail.com', href: 'mailto:hunterjisha@gmail.com' },
  { label: 'Phone', value: '(903) 348-9781', href: 'tel:9033489781' },
  { label: 'GitHub', value: 'hunter-jisha', href: 'https://github.com/hunter-jisha' },
  {
    label: 'LinkedIn',
    value: 'ceo-of-software-engineering',
    href: 'https://www.linkedin.com/in/ceo-of-software-engineering/',
  },
]
</script>

<template>
  <AppWindow>
    <div class="relative h-full w-full bg-[#e8e4dd]">
      <iframe
        class="absolute inset-0 h-full w-full border-none"
        title="Dallas, Texas"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDXjz7jSaANInJVXd9HWym0_4Igwk7EGSg&q=Dallas,+TX"
      ></iframe>

      <!-- Location card, the way Maps floats a sheet over the map -->
      <div
        class="glass absolute bottom-14 left-1/2 z-10 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 rounded-[26px] p-5 lg:bottom-auto lg:left-6 lg:top-6 lg:translate-x-0"
      >
        <div class="relative z-10">
          <div class="flex items-center gap-3">
            <img src="/icons/findmy.webp" alt="" class="squircle h-11 w-11 shadow-md" />
            <div>
              <p class="text-[20px] font-semibold leading-tight text-black">Hunter Jisha</p>
              <p class="text-[14px] text-black/55">Dallas, Texas</p>
            </div>
          </div>

          <div class="my-4 h-px w-full bg-black/12"></div>

          <ul class="flex flex-col gap-2">
            <li v-for="item in contact" :key="item.label">
              <a
                :href="item.href"
                :target="item.href.startsWith('http') ? '_blank' : '_self'"
                class="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-black/6"
              >
                <span class="text-[14px] font-medium text-black/45">{{ item.label }}</span>
                <span class="truncate text-[15px] text-black">{{ item.value }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </AppWindow>
</template>
