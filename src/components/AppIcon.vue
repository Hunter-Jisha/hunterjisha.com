<script setup lang="ts">
import { launch } from '../apps'
import type { App, ScreenId } from '../apps'

const props = withDefaults(defineProps<{ app: App; showLabel?: boolean }>(), {
  showLabel: true,
})

function activate(event: MouseEvent) {
  const href = props.app.href
  if (href) {
    window.open(href, href.startsWith('http') ? '_blank' : '_self')
    return
  }
  launch(props.app.id as ScreenId, event)
}
</script>

<template>
  <button
    class="group flex w-full flex-col items-center gap-1.5 outline-none sm:gap-2"
    :aria-label="app.name"
    @click="activate"
  >
    <span
      class="icon-tile relative block aspect-square w-[3.75rem] sm:w-[4.25rem] lg:w-20"
    >
      <img
        :src="app.icon"
        :alt="app.name"
        class="squircle absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />
      <!-- glass sheen that iOS 26 lays over every icon -->
      <span class="squircle pointer-events-none absolute inset-0 icon-gloss"></span>
    </span>

    <span
      v-if="showLabel"
      class="text-shadow-ios whitespace-nowrap text-[11px] font-normal text-white sm:text-[12px] lg:text-[13px]"
    >
      {{ app.name }}
    </span>
  </button>
</template>

<style scoped>
.icon-tile {
  filter: drop-shadow(0 8px 16px rgb(0 0 0 / 0.28));
  transition: transform 0.28s var(--ease-spring);
}
.group:hover .icon-tile {
  transform: translateY(-3px) scale(1.05);
}
.group:active .icon-tile {
  transform: scale(0.9);
  transition-duration: 0.12s;
}

.icon-gloss {
  background:
    linear-gradient(
      160deg,
      rgb(255 255 255 / 0.32) 0%,
      rgb(255 255 255 / 0.08) 26%,
      rgb(255 255 255 / 0) 48%
    );
  box-shadow:
    inset 0 0 0 0.5px rgb(255 255 255 / 0.28),
    inset 0 1px 1px -0.5px rgb(255 255 255 / 0.55);
}
</style>
