<script setup lang="ts">
interface PhotoItem {
  src: string
  alt?: string
  caption?: string
}

interface Props {
  photos: PhotoItem[]
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'select', index: number, photo: PhotoItem): void
}>()

const carouselRef = useTemplateRef('carouselRef')

const selectedIndex = computed({
  get: () => props.modelValue,
  set: (val: number) => emit('update:modelValue', val)
})

watch(() => props.modelValue, (newIndex) => {
  nextTick(() => {
    carouselRef.value?.emblaApi?.scrollTo(newIndex)
  })
})

function selectPhoto(index: number) {
  if (index < 0 || index >= props.photos.length) return
  selectedIndex.value = index
  const photo = props.photos[index]
  if (photo) {
    emit('select', index, photo)
  }
}
</script>

<template>
  <div class="w-full">
    <UCarousel
      ref="carouselRef"
      v-slot="{ item, index }"
      :items="photos"
      :ui="{
        item: 'basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/7',
        container: 'gap-3'
      }"
      arrows
    >
      <button
        class="w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200"
        :class="index === selectedIndex
          ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800 scale-105'
          : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600'"
        @click="selectPhoto(index)"
      >
        <img
          :src="item.src"
          :alt="item.alt || `Thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
          draggable="false"
        >
      </button>
    </UCarousel>
  </div>
</template>

<style scoped>
/* iOS-friendly scrolling */
:deep(.overflow-x-auto) {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:deep(.overflow-x-auto)::-webkit-scrollbar {
  display: none;
}
</style>
