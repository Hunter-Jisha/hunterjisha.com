<script setup lang="ts">
import { useNow, formatTime, dayName, monthName } from '../../clock'

const now = useNow()
</script>

<template>
  <div class="text-shadow-ios flex flex-col text-white">
    <p class="font-display text-6xl leading-none tracking-[-0.03em] tabular-nums xl:text-7xl">
      {{ formatTime(now) }}
    </p>
    <p class="mt-2 text-xl font-normal opacity-95 xl:text-2xl">
      {{ dayName(now) }}, {{ monthName(now) }} {{ now.getDate() }}
    </p>
  </div>
</template>
