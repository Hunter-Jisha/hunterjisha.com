<script setup lang="ts">
import { goHome } from '../apps'
</script>

<template>
  <section class="absolute inset-0 flex flex-col overflow-hidden bg-white">
    <slot />

    <!-- Home indicator. Tap it, or press Escape, to go back to the home screen. -->
    <button
      class="absolute bottom-0 left-1/2 z-50 flex h-8 w-40 -translate-x-1/2 items-end justify-center pb-[7px]"
      aria-label="Close app"
      @click="goHome"
    >
      <span
        class="h-[5px] w-32 rounded-full bg-black/35 transition-colors duration-200 hover:bg-black/60"
      ></span>
    </button>
  </section>
</template>
