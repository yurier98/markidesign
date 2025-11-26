<script setup lang="ts">
const colorMode = useColorMode()

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <!-- background -->
    <div
      v-if="colorMode.value === 'dark'"
      class="absolute inset-0 w-full h-full"
    >
      <img
        src="/hero/img1.webp"
        alt="Image background"
        class="object-cover w-full h-full blur-[70px] brightness-[.2] will-change-[filter]"
      >
    </div>
    <LandingHero :page />
    <LandingHeroGrid
      v-if="page.HeroGrid"
      :image1="page.HeroGrid.images1"
      :image2="page.HeroGrid.images2"
      :image3="page.HeroGrid.images3"
      :image4="page.HeroGrid.images4"
      :image5="page.HeroGrid.images5"
      :image6="page.HeroGrid.images6"
      :image7="page.HeroGrid.images7"
    />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <!-- <LandingAbout :page /> -->
    </UPageSection>
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
