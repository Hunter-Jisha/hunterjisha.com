import { ref } from 'vue'

export type AppId =
  | 'projects'
  | 'notes'
  | 'findme'
  | 'experience'
  | 'github'
  | 'linkedin'
  | 'cubify'
  | 'email'
  | 'call'
  | 'text'

// A screen app opens full screen; a link app has an href and opens in a new tab.
export type App = { id: AppId; name: string; icon: string; href?: string }

export type ScreenId = 'projects' | 'notes' | 'findme' | 'experience'

// Which full-screen app is open, and the icon it was launched from so the
// open animation can grow out of that icon the way iOS does.
export const openApp = ref<ScreenId | null>(null)
export const launchOrigin = ref({ x: 0.5, y: 0.5 })
export const alertMessage = ref('')

export function launch(id: ScreenId, event?: MouseEvent) {
  const el = event?.currentTarget as HTMLElement | null
  if (el) {
    const r = el.getBoundingClientRect()
    launchOrigin.value = {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    }
  }
  openApp.value = id
  history.pushState(null, '', `#${id}`)
}

export function goHome() {
  openApp.value = null
  if (location.hash) history.pushState(null, '', location.pathname)
}

// Keep the open app in sync with the URL so deep links and the back button work.
export function syncFromHash(valid: readonly ScreenId[]) {
  const id = location.hash.slice(1) as ScreenId
  openApp.value = valid.includes(id) ? id : null
}

export function showAlert(message: string) {
  alertMessage.value = message
}

export const apps: App[] = [
  { id: 'projects', name: 'Projects', icon: '/icons/appstore.webp' },
  { id: 'notes', name: 'About Me', icon: '/icons/notes.webp' },
  { id: 'findme', name: 'Find Me', icon: '/icons/findmy.webp' },
  { id: 'experience', name: 'Experience', icon: '/icons/books.webp' },
  { id: 'github', name: 'Github', icon: '/icons/github.webp', href: 'https://github.com/hunter-jisha' },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.webp',
    href: 'https://www.linkedin.com/in/ceo-of-software-engineering/',
  },
  { id: 'cubify', name: 'Cubify™', icon: '/icons/cubify.png', href: 'https://cubify.app' },
  { id: 'email', name: 'Email Me', icon: '/icons/mail.webp', href: 'mailto:hunterjisha@gmail.com' },
  { id: 'call', name: 'Call Me', icon: '/icons/phone.webp', href: 'tel:9033489781' },
  {
    id: 'text',
    name: 'Text Me',
    icon: '/icons/messages.webp',
    href: "sms:9033489781?&body=Hi%20Hunter%21%20I'm%20reaching%20out%20for...",
  },
]

export const dockApps: AppId[] = ['email', 'call', 'text', 'cubify']
