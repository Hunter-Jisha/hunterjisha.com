import { ref, onMounted, onUnmounted } from 'vue'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function useNow() {
  const now = ref(new Date())
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    timer = setInterval(() => (now.value = new Date()), 1000)
  })
  onUnmounted(() => clearInterval(timer))
  return now
}

export function formatTime(date: Date) {
  const hours = date.getHours() % 12 || 12
  return `${hours}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function dayName(date: Date, short = false) {
  return short ? DAYS[date.getDay()]!.slice(0, 3) : DAYS[date.getDay()]!
}

export function monthName(date: Date, short = false) {
  return short ? MONTHS[date.getMonth()]!.slice(0, 3) : MONTHS[date.getMonth()]!
}
