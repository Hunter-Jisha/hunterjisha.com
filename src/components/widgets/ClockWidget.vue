<script setup lang="ts">
import { useNow, formatTime, dayName, monthName } from '../../clock'

const now = useNow()
</script>

<template>
  <div class="text-shadow-ios mb-2 flex flex-col pl-1 text-white">
    <p class="font-display text-[68px] font-normal leading-[1.04] tabular-nums xl:text-[78px]">
      {{ formatTime(now) }}
    </p>
    <p class="text-[19px] font-normal leading-snug xl:text-[21px]">
      {{ dayName(now) }}, {{ monthName(now) }} {{ now.getDate() }}
    </p>
  </div>
</template>
