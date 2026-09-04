<script setup lang="ts">
import { alertMessage } from '../apps'
</script>

<template>
  <Transition name="alert">
    <div
      v-if="alertMessage"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 px-8 backdrop-blur-[2px]"
      @click.self="alertMessage = ''"
    >
      <div
        class="alert-card w-[270px] overflow-hidden rounded-[14px] bg-white/82 text-center backdrop-blur-2xl backdrop-saturate-150"
      >
        <p class="px-5 pb-4 pt-5 text-[17px] font-bold text-black">{{ alertMessage }}</p>
        <div class="h-px w-full bg-black/12"></div>
        <button
          class="h-11 w-full text-[17px] font-bold text-[#007aff] transition-colors active:bg-black/5"
          @click="alertMessage = ''"
        >
          OK
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.alert-card {
  box-shadow: 0 24px 60px -12px rgb(0 0 0 / 0.35);
}
.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.2s ease;
}
.alert-enter-active .alert-card {
  transition: transform 0.3s var(--ease-spring);
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}
.alert-enter-from .alert-card {
  transform: scale(1.16);
}
</style>
