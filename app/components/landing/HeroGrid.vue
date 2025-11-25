<script setup lang="ts">
import type { Image } from '~/types'
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  image1: {
    type: Object as PropType<Image>,
    required: false
  },
  image2: {
    type: Object as PropType<Image>,
    required: false
  },
  image3: {
    type: Object as PropType<Image>,
    required: false
  },
  image4: {
    type: Object as PropType<Image>,
    required: false
  },
  image5: {
    type: Object as PropType<Image>,
    required: false
  },
  image6: {
    type: Object as PropType<Image>,
    required: false
  },
  image7: {
    type: Object as PropType<Image>,
    required: false
  }
})

const defaultImage = 'img/placeholder.jpg'
const gridRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const directions = [1, -1, 1, 1, -1, 1, -1]

// Detectar scroll para animaciones
const handleScroll = () => {
  if (!gridRef.value) return

  const rect = gridRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const elementTop = rect.top
  const elementHeight = rect.height

  // Calcular progreso del scroll (0 a 1)
  const start = windowHeight
  const end = -elementHeight
  const progress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)))

  scrollProgress.value = progress

  // Aplicar transformaciones basadas en el scroll con más intensidad
  const containers = gridRef.value.querySelectorAll('.image-container')
  containers.forEach((container, index) => {
    const element = container as HTMLElement
    const direction = directions[index] || 1
    // Aumentar el movimiento de 20px a 30px para hacerlo más visible
    const offset = Math.sin(progress * Math.PI) * 30 * direction
    // Agregar rotación sutil para más dinamismo
    const rotation = Math.sin(progress * Math.PI * 2) * 3 * direction
    // Agregar escala para efecto de profundidad
    const scale = 1 + Math.sin(progress * Math.PI) * 0.05

    element.style.transform = `translateY(${offset}px) rotate(${rotation}deg) scale(${scale})`
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Ejecutar una vez al montar
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    ref="gridRef"
    class="not-prose mt-16 sm:mt-24 content-visibility-visible contain-intrinsic-size-[auto_600px]"
  >
    <div class="flex items-center justify-center gap-5 py-4 sm:gap-6 relative z-20">
      <!-- col1 -->
      <div
        class="hidden lg:flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
        data-rellax-speed="3"
        style="animation-delay: 0.1s"
      >
        <div class="image-container relative aspect-[2/3] w-36 lg:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image1?.src ? image1.src : defaultImage"
            :alt="image1?.alt ? image1.alt : 'No alt text'"
            :width="image1?.width ? image1.width : 1"
            :height="image1?.height ? image1.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <!-- col2 -->
      <div
        class="flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
        data-rellax-speed="1"
        style="animation-delay: 0.1s"
      >
        <div class="image-container relative aspect-[4/3] w-44 md:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image2?.src ? image2.src : defaultImage"
            :alt="image2?.alt ? image2.alt : 'No alt text'"
            :width="image2?.width ? image2.width : 1"
            :height="image2?.height ? image2.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
        <div class="image-container relative aspect-[3/4] w-44 md:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image3?.src ? image3.src : defaultImage"
            :alt="image3?.alt ? image3.alt : 'No alt text'"
            :width="image3?.width ? image3.width : 1"
            :height="image3?.height ? image3.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <!-- col3 -->
      <div
        class="flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
        data-rellax-speed="0"
        style="animation-delay: 0.2s"
      >
        <div class="image-container relative aspect-[2/3] w-72 md:w-80 lg:w-96 flex-none overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:380px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image4?.src ? image4.src : defaultImage"
            :alt="image4?.alt ? image4.alt : 'No alt text'"
            :width="image4?.width ? image4.width : 1"
            :height="image4?.height ? image4.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <!-- col4 -->
      <div
        class="hidden md:flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
        data-rellax-speed="1"
        style="animation-delay: 0.3s"
      >
        <div class="image-container relative aspect-[3/4] w-44 md:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image5?.src ? image5.src : defaultImage"
            :alt="image5?.alt ? image5.alt : 'No alt text'"
            :width="image5?.width ? image5.width : 1"
            :height="image5?.height ? image5.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
        <div class="image-container relative aspect-[4/3] w-44 md:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image6?.src ? image6.src : defaultImage"
            :alt="image6?.alt ? image6.alt : 'No alt text'"
            :width="image6?.width ? image6.width : 1"
            :height="image6?.height ? image6.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <!-- col5 -->
      <div
        class="hidden lg:flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
        data-rellax-speed="3"
        style="animation-delay: 0.5s"
      >
        <div class="image-container relative aspect-[2/3] w-44 lg:w-52 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <NuxtImg
            placeholder
            sizes="sm:100vw md:50vw lg:220px"
            class="image-hover absolute inset-0 h-full w-full object-cover"
            :src="image7?.src ? image7.src : defaultImage"
            :alt="image7?.alt ? image7.alt : 'No alt text'"
            :width="image7?.width ? image7.width : 1"
            :height="image7?.height ? image7.height : 1"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de entrada con fade y movimiento hacia arriba */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* Contenedor de imagen con transición suave */
.image-container {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.3s ease;
  cursor: pointer;
  will-change: transform;
}

/* Efecto hover en el contenedor - más pronunciado */
.image-container:hover {
  transform: translateY(-15px) scale(1.05) rotate(0deg) !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  filter: brightness(1.08) contrast(1.05);
  z-index: 10;
}

/* Animación de flotación más visible en scroll */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-25px) rotate(2deg) scale(1.03);
  }
}

/* Efecto hover en la imagen */
.image-hover {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-container:hover .image-hover {
  transform: scale(1.1);
}

/* Animación sutil de respiración para las imágenes */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Efecto de brillo al pasar el mouse */
.image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.image-container:hover::after {
  left: 100%;
}

/* Transición suave para el modo oscuro */
.dark .image-container {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .image-container:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
</style>
