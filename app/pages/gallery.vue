<script setup lang="ts">
const { data: page } = await useAsyncData('gallery', () => {
  return queryCollection('gallery').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

// Extract unique categories for filtering
const categories = computed(() => {
  const cats = new Set<string>()
  page.value?.photos?.forEach((photo: any) => {
    if (photo.category) cats.add(photo.category)
  })
  return ['All', ...Array.from(cats)]
})

const selectedCategory = ref('All')

const filteredPhotos = computed(() => {
  if (!page.value?.photos) return []
  if (selectedCategory.value === 'All') return page.value.photos
  return page.value.photos.filter((photo: any) => photo.category === selectedCategory.value)
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(i: number) {
  lightboxIndex.value = i
  lightboxOpen.value = true
}
</script>

<template>
  <UPage v-if="page">
    <UPageSection
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }"
    >
      <!-- Category Filter -->
      <div
        v-if="categories.length > 1"
        class="flex flex-wrap gap-2 justify-center"
      >
        <UButton
          v-for="category in categories"
          :key="category"
          :label="category"
          :variant="selectedCategory === category ? 'solid' : 'soft'"
          :color="selectedCategory === category ? 'primary' : 'neutral'"
          size="sm"
          @click="selectedCategory = category"
        />
      </div>
      <!-- Gallery Grid -->
      <TransitionGroup
        name="gallery"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <Motion
          v-for="(photo, index) in filteredPhotos"
          :key="photo.src"
          :initial="{ opacity: 0, scale: 0.9 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ delay: 0.05 * index, duration: 0.3 }"
          :in-view-options="{ once: true }"
          class="gallery-item"
        >
          <div
            class="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
            @click="openLightbox(index)"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div class="text-white">
                <p
                  v-if="photo.category"
                  class="text-xs font-semibold uppercase tracking-wider"
                >
                  {{ photo.category }}
                </p>
                <p
                  v-if="photo.alt"
                  class="text-sm"
                >
                  {{ photo.alt }}
                </p>
              </div>
            </div>
          </div>
        </Motion>
      </TransitionGroup>

      <!-- Empty state -->
      <div
        v-if="filteredPhotos.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500 dark:text-gray-400">
          No photos found in this category
        </p>
      </div>
    </UPageSection>

    <!-- Lightbox Viewer -->
    <LightboxViewer
      v-model:open="lightboxOpen"
      :images="filteredPhotos"
      :start-index="lightboxIndex"
    />
  </UPage>
</template>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.3s ease;
}

.gallery-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.gallery-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.gallery-move {
  transition: transform 0.3s ease;
}
</style>
