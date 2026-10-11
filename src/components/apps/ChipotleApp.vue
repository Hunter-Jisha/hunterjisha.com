<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppWindow from '../AppWindow.vue'

const stores = ref<[number, number, string][]>([])
const position = ref<{ lat: number; lon: number } | null>(null)
const heading = ref<number | null>(null)
const status = ref<'idle' | 'locating' | 'ready' | 'error'>('idle')
const error = ref('')
let watchId: number | null = null

onMounted(async () => {
  stores.value = await (await fetch('/data/chipotles.json')).json()
})

const toRad = (deg: number) => (deg * Math.PI) / 180

const nearest = computed(() => {
  const here = position.value
  if (!here || !stores.value.length) return null
  let best = { miles: Infinity, bearing: 0, address: '' }
  for (const [lat, lon, address] of stores.value) {
    const dLat = toRad(lat - here.lat)
    const dLon = toRad(lon - here.lon)
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(here.lat)) * Math.cos(toRad(lat)) * Math.sin(dLon / 2) ** 2
    const miles = 7917.6 * Math.asin(Math.sqrt(a))
    if (miles >= best.miles) continue
    const y = Math.sin(dLon) * Math.cos(toRad(lat))
    const x =
      Math.cos(toRad(here.lat)) * Math.sin(toRad(lat)) -
      Math.sin(toRad(here.lat)) * Math.cos(toRad(lat)) * Math.cos(dLon)
    best = { miles, bearing: ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360, address }
  }
  return best
})

const distance = computed(() => {
  const miles = nearest.value?.miles ?? 0
  if (miles < 0.1) return { value: (Math.round((miles * 5280) / 10) * 10).toString(), unit: 'ft' }
  if (miles < 10) return { value: miles.toFixed(1), unit: 'mi' }
  return { value: Math.round(miles).toLocaleString(), unit: 'mi' }
})

const cardinal = computed(() => {
  const names = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return names[Math.round((nearest.value?.bearing ?? 0) / 45) % 8]
})

// Turn the shortest way so the arrow doesn't spin a full lap when the heading wraps past north.
const arrowAngle = ref(0)
const dialAngle = ref(0)
const turnTo = (current: number, target: number) => current + ((((target - current) % 360) + 540) % 360) - 180
watch([nearest, heading], () => {
  arrowAngle.value = turnTo(arrowAngle.value, (nearest.value?.bearing ?? 0) - (heading.value ?? 0))
  dialAngle.value = turnTo(dialAngle.value, -(heading.value ?? 0))
})

function onOrientation(event: DeviceOrientationEvent) {
  const iosHeading = (event as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading
  let degrees: number
  if (iosHeading != null) degrees = iosHeading
  else if (event.absolute && event.alpha != null) degrees = 360 - event.alpha
  else return
  heading.value = (degrees + (screen.orientation?.angle ?? 0)) % 360
}

function start() {
  status.value = 'locating'
  // iOS only hands out compass data after this prompt, and it must run inside the tap.
  ;(DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
    .requestPermission?.()
    .catch(() => {})
  window.addEventListener('deviceorientationabsolute', onOrientation as EventListener)
  window.addEventListener('deviceorientation', onOrientation)

  if (watchId != null) navigator.geolocation.clearWatch(watchId)
  watchId = navigator.geolocation.watchPosition(
    (p) => {
      position.value = { lat: p.coords.latitude, lon: p.coords.longitude }
      status.value = 'ready'
    },
    (e) => {
      status.value = 'error'
      error.value =
        e.code === e.PERMISSION_DENIED
          ? 'Location access is off. Allow it in your browser settings, then try again.'
          : "Couldn't find your location. Try again in a moment."
    },
    { enableHighAccuracy: true },
  )
}

onUnmounted(() => {
  if (watchId != null) navigator.geolocation.clearWatch(watchId)
  window.removeEventListener('deviceorientationabsolute', onOrientation as EventListener)
  window.removeEventListener('deviceorientation', onOrientation)
})
</script>

<template>
  <AppWindow light-indicator>
    <div
      class="flex h-full w-full flex-col items-center justify-center gap-10 bg-[radial-gradient(ellipse_at_top,#5a1d0c_0%,#2b0d05_55%,#1a0703_100%)] px-6 pb-16 pt-12 text-[#f6ece0]"
    >
      <div class="flex items-center gap-3">
        <img src="/icons/chipotle.webp" alt="" class="squircle h-10 w-10 shadow-lg" />
        <p class="font-display text-[22px] font-semibold tracking-tight">Nearest Chipotle</p>
      </div>

      <!-- Compass -->
      <div class="relative aspect-square w-[min(72vw,20rem)]">
        <svg
          viewBox="0 0 200 200"
          class="absolute inset-0 h-full w-full transition-transform duration-300 ease-out"
          :style="{ transform: `rotate(${dialAngle}deg)` }"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-opacity="0.14" stroke-width="2" />
          <line
            v-for="i in 72"
            :key="i"
            x1="100"
            :y1="i % 18 === 0 ? 8 : 10"
            x2="100"
            :y2="i % 18 === 0 ? 20 : 15"
            stroke="currentColor"
            :stroke-opacity="i % 18 === 0 ? 0.7 : 0.25"
            :stroke-width="i % 18 === 0 ? 2.5 : 1.25"
            stroke-linecap="round"
            :transform="`rotate(${i * 5} 100 100)`"
          />
          <text x="100" y="38" text-anchor="middle" fill="#e2412b" font-size="15" font-weight="700">N</text>
        </svg>

        <svg
          v-if="status === 'ready' && nearest"
          viewBox="0 0 200 200"
          class="absolute inset-0 h-full w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out"
          :style="{ transform: `rotate(${arrowAngle}deg)` }"
          role="img"
          :aria-label="`Arrow pointing ${cardinal}`"
        >
          <path d="M100 46 L136 146 L100 128 L64 146 Z" fill="#f6ece0" stroke="#f6ece0" stroke-width="6" stroke-linejoin="round" />
          <path d="M100 46 L100 128 L64 146 Z" fill="#000" fill-opacity="0.12" />
        </svg>

        <div v-else class="absolute inset-0 flex items-center justify-center">
          <button
            v-if="status === 'idle'"
            class="rounded-full bg-[#a81612] px-7 py-3.5 text-[17px] font-semibold shadow-[0_8px_24px_rgba(168,22,18,0.45)] transition-transform active:scale-95"
            @click="start"
          >
            Find a burrito
          </button>
          <p v-else-if="status === 'locating'" class="animate-pulse text-[15px] text-[#f6ece0]/60">Locating…</p>
          <p v-else class="max-w-[14rem] text-center text-[15px] leading-snug text-[#f6ece0]/75">{{ error }}</p>
        </div>
      </div>

      <!-- Distance -->
      <div class="flex min-h-[7.5rem] flex-col items-center text-center">
        <template v-if="status === 'ready' && nearest">
          <p class="font-display text-[64px] font-bold leading-none tracking-tight tabular-nums">
            {{ distance.value }}<span class="ml-1.5 text-[28px] font-semibold text-[#f6ece0]/55">{{ distance.unit }}</span>
          </p>
          <p class="mt-3 max-w-[20rem] text-[15px] text-[#f6ece0]/70">{{ nearest.address }}</p>
          <p v-if="heading === null" class="mt-2 text-[13px] text-[#f6ece0]/45">
            No compass on this device. Head {{ cardinal }}, north is up.
          </p>
        </template>
        <button
          v-else-if="status === 'error'"
          class="rounded-full bg-white/12 px-5 py-2.5 text-[15px] font-semibold transition-colors hover:bg-white/20"
          @click="start"
        >
          Try again
        </button>
      </div>
    </div>
  </AppWindow>
</template>
