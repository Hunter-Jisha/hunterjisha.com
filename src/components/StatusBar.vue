<script setup lang="ts">
import { useNow, formatTime, dayName, monthName } from '../clock'

const now = useNow()
</script>

<template>
  <div
    class="text-shadow-ios flex h-8 w-full shrink-0 items-center justify-between px-3 text-[13px] font-bold text-white sm:h-9 sm:px-5 sm:text-[14px]"
  >
    <span class="tabular-nums">
      {{ dayName(now, true) }} {{ monthName(now, true) }} {{ now.getDate() }}
      <span class="ml-2">{{ formatTime(now) }}</span>
    </span>

    <span class="flex items-center gap-1.5 sm:gap-2">
      <!-- Wi-Fi -->
      <svg viewBox="0 0 16 12" class="h-3 w-4 fill-white sm:h-[13px] sm:w-[17px]">
        <path
          d="M8 11.2a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm0-4.05c.93 0 1.79.35 2.43.94.2.18.5.17.68-.03l.72-.79a.47.47 0 0 0-.03-.68A5.7 5.7 0 0 0 8 5.05c-1.44 0-2.77.53-3.8 1.54a.47.47 0 0 0-.03.68l.72.79c.18.2.48.21.68.03A3.55 3.55 0 0 1 8 7.15Zm0-4.1c1.98 0 3.79.74 5.16 1.95.2.17.5.16.68-.03l.71-.78a.47.47 0 0 0-.03-.69A9.83 9.83 0 0 0 8 .95 9.83 9.83 0 0 0 1.48 3.5a.47.47 0 0 0-.03.69l.71.78c.18.19.48.2.68.03A7.78 7.78 0 0 1 8 3.05Z"
        />
      </svg>

      <!-- Battery -->
      <svg viewBox="0 0 28 13" class="h-3 w-[26px] sm:h-[13px] sm:w-[28px]">
        <rect
          x="0.6"
          y="0.6"
          width="23"
          height="11.8"
          rx="3.6"
          fill="none"
          stroke="white"
          stroke-opacity="0.4"
          stroke-width="1.1"
        />
        <rect x="2.4" y="2.4" width="15.5" height="8.2" rx="2.1" fill="white" />
        <path
          d="M25.4 4.4c1.1.4 1.8 1.2 1.8 2.1s-.7 1.7-1.8 2.1V4.4Z"
          fill="white"
          fill-opacity="0.4"
        />
      </svg>
    </span>
  </div>
</template>
