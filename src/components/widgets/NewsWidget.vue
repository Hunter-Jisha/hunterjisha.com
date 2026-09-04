<script setup lang="ts">
const stories: { headline: string; image: string }[] = [
  {
    headline: 'Tech Person Shocked by Amazing Portfolio Site',
    image: '/media/shocked-man.webp',
  },
  {
    headline: 'Hunter Jisha Crowned "World\'s Best Software Engineer"',
    image: '/media/crown.webp',
  },
  {
    headline: 'Should you build your site to look like an iPhone? The answer is no.',
    image: '/media/iphone.webp',
  },
]
</script>

<template>
  <div class="glass rounded-[26px] p-4">
    <div class="relative z-10 flex items-center gap-2.5">
      <img src="/icons/news.webp" alt="" class="squircle h-6 w-6" />
      <p class="text-[13px] font-bold uppercase tracking-wide text-black/45">News</p>
    </div>

    <div class="relative z-10 mt-3">
      <p class="font-serif text-[22px] font-bold text-black">Top Stories</p>
      <div class="mt-1.5 h-px w-full bg-black/12"></div>

      <ul class="mt-3 flex max-h-52 flex-col gap-3 overflow-y-auto pr-1">
        <li v-for="story in stories" :key="story.headline" class="flex items-start gap-3">
          <p class="flex-1 text-[15px] font-bold leading-snug text-black">
            {{ story.headline }}
          </p>
          <img
            :src="story.image"
            alt=""
            class="h-16 w-16 shrink-0 rounded-xl object-cover shadow-md"
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
