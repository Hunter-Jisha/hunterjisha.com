<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import AppWindow from '../AppWindow.vue'
import { showAlert } from '../../apps'

const ABOUT_ME = `Hi! I'm Hunter, a highly skilled and versatile Full Stack Developer with a passion for crafting efficient and innovative solutions. With 7 years of experience in the field, I have a strong foundation in both front-end and back-end development, enabling me to seamlessly bridge the gap between design and functionality. I thrive in collaborative environments, adept at working with cross-functional teams to deliver high-quality, scalable software applications. Equipped with a deep understanding of various programming languages and frameworks, I consistently stay abreast of the latest industry trends to ensure cutting-edge solutions that exceed client expectations.`

type Note = { title: string; lastEdit: string | Date; content: string }

const notes = ref<Note[]>([])
const selected = ref(0)
const search = ref('')
const sidebarOpen = ref(false)
const loaded = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('notesData')
  notes.value = saved
    ? JSON.parse(saved)
    : [{ title: 'About Me', lastEdit: new Date(Date.now() - 1000000000), content: ABOUT_ME }]
  loaded.value = true
})

const current = computed(() => notes.value[selected.value])

const visible = computed(() =>
  notes.value
    .map((note, index) => ({ ...note, index }))
    .filter((note) => note.title.toLowerCase().includes(search.value.toLowerCase())),
)

watch(
  () => [current.value?.title, current.value?.content],
  () => {
    if (!loaded.value || !current.value) return
    current.value.lastEdit = new Date()
    localStorage.setItem('notesData', JSON.stringify(notes.value))
  },
)

function selectNote(index: number) {
  selected.value = index
  sidebarOpen.value = false
}

function addNote() {
  notes.value.push({ title: 'Untitled', lastEdit: new Date(), content: '' })
  selectNote(notes.value.length - 1)
}

function deleteNote(index: number) {
  if (index === 0) {
    showAlert('You cannot delete this note')
    return
  }
  notes.value.splice(index, 1)
  selectNote(Math.min(index, notes.value.length - 1))
  localStorage.setItem('notesData', JSON.stringify(notes.value))
}

function formatDate(value: string | Date) {
  const date = new Date(value)
  const now = new Date()
  if (date.toDateString() === now.toDateString()) {
    const hours = date.getHours() % 12 || 12
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`
  }
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function preview(note: Note) {
  const text = note.content.trim().replace(/\s+/g, ' ')
  return text ? text.slice(0, 40) : 'No additional text'
}
</script>

<template>
  <AppWindow>
    <div class="relative flex h-full bg-white">
      <!-- Sidebar -->
      <aside
        class="absolute inset-y-0 left-0 z-30 flex w-full max-w-sm shrink-0 flex-col bg-[#f7f7f2] transition-transform duration-400 ease-[var(--ease-ios)] lg:static lg:w-[21rem] lg:max-w-none lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="px-4 pb-2 pt-5">
          <h1 class="px-2 font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-black">
            Notes
          </h1>

          <div class="mt-4 flex h-9 items-center gap-1.5 rounded-[10px] bg-black/7 px-2.5">
            <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 fill-black/40">
              <path
                fill-rule="evenodd"
                d="M18.3 14.4a8 8 0 1 0-1.4 1.4l4.3 4.3a1 1 0 0 0 1.4-1.4l-4.3-4.3ZM16.2 5.3a6 6 0 1 1-8.5 8.5 6 6 0 0 1 8.5-8.5Z"
              />
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search"
              class="h-full w-full bg-transparent text-[16px] text-black placeholder:text-black/40"
            />
          </div>
        </div>

        <div class="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-6">
          <button
            v-for="note in visible"
            :key="note.index"
            class="flex flex-col rounded-[10px] px-3 py-2 text-left transition-colors"
            :class="
              selected === note.index ? 'bg-[#e8b833] text-white' : 'text-black hover:bg-black/5'
            "
            @click="selectNote(note.index)"
          >
            <span class="truncate text-[15px] font-semibold">{{ note.title || 'New Note' }}</span>
            <span
              class="truncate text-[13px]"
              :class="selected === note.index ? 'text-white/85' : 'text-black/45'"
            >
              {{ formatDate(note.lastEdit) }}&nbsp;&nbsp;{{ preview(note) }}
            </span>
          </button>
        </div>
      </aside>

      <div
        v-if="sidebarOpen"
        class="absolute inset-0 z-20 bg-black/20 lg:hidden"
        @click="sidebarOpen = false"
      ></div>

      <!-- Editor -->
      <div v-if="current" class="flex min-w-0 flex-1 flex-col">
        <div class="flex h-14 shrink-0 items-center justify-end gap-2 px-4 sm:px-6">
          <button
            class="mr-auto flex items-center gap-0.5 text-[17px] text-[#e8b833] lg:hidden"
            @click="sidebarOpen = true"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path d="M14.7 5.7 13.3 4.3 5.6 12l7.7 7.7 1.4-1.4L8.4 12l6.3-6.3Z" />
            </svg>
            Notes
          </button>

          <button
            class="flex h-9 w-9 items-center justify-center rounded-full text-[#e8b833] transition-colors hover:bg-[#e8b833]/12"
            aria-label="Delete note"
            @click="deleteNote(selected)"
          >
            <svg viewBox="0 0 24 24" class="h-[22px] w-[22px] fill-current">
              <path
                fill-rule="evenodd"
                d="M17 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2h-3ZM15 4H9v1h6V4Zm2 3H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7Z"
              />
              <path d="M9 9h2v8H9V9ZM13 9h2v8h-2V9Z" />
            </svg>
          </button>

          <button
            class="flex h-9 w-9 items-center justify-center rounded-full text-[#e8b833] transition-colors hover:bg-[#e8b833]/12"
            aria-label="New note"
            @click="addNote"
          >
            <svg viewBox="0 0 24 24" class="h-[22px] w-[22px] fill-current">
              <path d="M10 18v-2H8v-2h2v-2h2v2h2v2h-2v2h-2Z" />
              <path
                fill-rule="evenodd"
                d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7H6Zm0 2h7v5h6v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm9 .1A5 5 0 0 1 18.6 7H15V4.1Z"
              />
            </svg>
          </button>
        </div>

        <div class="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5 pb-24 sm:px-10">
          <p class="pb-3 text-center text-[12px] text-black/35">
            {{ formatDate(current.lastEdit) }}
          </p>
          <input
            v-model="current.title"
            type="text"
            class="w-full shrink-0 bg-transparent font-display text-[28px] font-bold leading-tight tracking-[-0.02em] text-black"
          />
          <textarea
            v-model="current.content"
            class="mt-3 w-full flex-1 resize-none bg-transparent text-[17px] leading-relaxed text-black"
            placeholder="Start writing…"
          ></textarea>
        </div>
      </div>
    </div>
  </AppWindow>
</template>
