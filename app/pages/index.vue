<script setup lang="ts">
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
