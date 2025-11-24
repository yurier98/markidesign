<script setup lang="ts">
interface ImageItem {
  src: string
  alt?: string
}

interface Props {
  images: ImageItem[]
  open: boolean
  startIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 0
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit('update:open', val)
})

const index = ref(props.startIndex)
watch(() => props.startIndex, (v) => { index.value = v ?? 0 })
watch(() => props.open, (v) => { if (v) index.value = props.startIndex })

const hasMultiple = computed(() => props.images?.length > 1)

const close = () => { isOpen.value = false }
const next = () => { if (!hasMultiple.value) return; index.value = (index.value + 1) % props.images.length }
const prev = () => { if (!hasMultiple.value) return; index.value = (index.value - 1 + props.images.length) % props.images.length }

// Keyboard support
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (!isOpen.value) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})

// Touch gestures (iOS friendly)
const touchStartX = ref(0)
const touchDeltaX = ref(0)
const touching = ref(false)
const THRESHOLD = 60

function onTouchStart(e: TouchEvent) {
  if (!isOpen.value) return
  touching.value = true
  touchStartX.value = e.touches[0].clientX
  touchDeltaX.value = 0
}
function onTouchMove(e: TouchEvent) {
  if (!touching.value) return
  touchDeltaX.value = e.touches[0].clientX - touchStartX.value
}
function onTouchEnd() {
  if (!touching.value) return
  if (touchDeltaX.value > THRESHOLD) prev()
  else if (touchDeltaX.value < -THRESHOLD) next()
  touching.value = false
  touchDeltaX.value = 0
}

const transformStyle = computed(() => touching.value ? `translateX(${touchDeltaX.value}px)` : 'translateX(0)')
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-200" leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend.passive="onTouchEnd"
        @click="close"
      >
        <!-- Close -->
        <UButton
          color="neutral"
          variant="soft"
          size="lg"
          icon="i-lucide-x"
          class="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Close"
          @click.stop="close"
        />

        <!-- Counter -->
        <UBadge
          color="neutral"
          variant="soft"
          class="absolute rounded-full top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-10 bg-white/10 text-white"
        >
          {{ index + 1 }} / {{ images.length }}
        </UBadge>

        <!-- Prev -->
        <UButton
          v-if="hasMultiple"
          color="neutral"
          variant="soft"
          size="lg"
          icon="i-lucide-chevron-left"
          class="absolute left-[max(0.5rem,env(safe-area-inset-left))] z-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Previous"
          @click.stop="prev"
        />

        <!-- Next -->
        <UButton
          v-if="hasMultiple"
          color="neutral"
          variant="soft"
          size="lg"
          icon="i-lucide-chevron-right"
          class="absolute right-[max(0.5rem,env(safe-area-inset-right))] z-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Next"
          @click.stop="next"
        />

        <!-- Image -->
        <div class="max-w-full max-h-full" @click.stop>
          <img
            :key="index"
            :src="images[index]?.src"
            :alt="images[index]?.alt || 'Image'"
            class="max-w-[100vw] max-h-[80vh] object-contain select-none"
            :style="{ transform: transformStyle }"
            draggable="false"
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/***** iOS-friendly scrolling/physics *****/
:host, .fixed {
  -webkit-overflow-scrolling: touch;
}
</style>
