<script setup lang="ts">
import { launch } from '../apps'
import type { App, ScreenId } from '../apps'

const props = withDefaults(
  defineProps<{ app: App; showLabel?: boolean; size?: 'home' | 'dock' }>(),
  { showLabel: true, size: 'home' },
)

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
      class="icon-tile relative block aspect-square"
      :class="
        size === 'dock'
          ? 'w-[3.25rem] sm:w-14 lg:w-[3.75rem]'
          : 'w-[3.75rem] sm:w-[4.25rem] lg:w-[4.5rem]'
      "
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
/*
  iPadOS does not lift an icon on hover. The pointer settles onto it and the icon
  dips when pressed, so that is all this does.
*/
.icon-tile {
  filter: drop-shadow(0 6px 14px rgb(0 0 0 / 0.22));
  transition: transform 0.22s var(--ease-ios);
}
.group:active .icon-tile {
  transform: scale(0.92);
  transition-duration: 0.1s;
}

.icon-gloss {
  background: linear-gradient(
    160deg,
    rgb(255 255 255 / 0.3) 0%,
    rgb(255 255 255 / 0.07) 26%,
    rgb(255 255 255 / 0) 48%
  );
  box-shadow:
    inset 0 0 0 0.5px rgb(255 255 255 / 0.26),
    inset 0 1px 1px -0.5px rgb(255 255 255 / 0.5);
}
</style>
