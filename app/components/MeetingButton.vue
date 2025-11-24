<script setup lang="ts">
const meetingLink = useAppConfig().global.meetingLink
defineProps({
  animate: {
    type: Boolean,
    default: true
  },
  transparent: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex gap-4 sm:gap-2">
    <SpotlightButton>
      <NuxtLink
        class="font-mona relative flex items-center justify-center gap-2 bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200"
        :to="meetingLink"
      >
        Available for new projects
        <UIcon
          name="heroicons:calendar-days"
          class="size-5 text-white/80"
        />
      </NuxtLink>
    </SpotlightButton>
    <UButton
      color="neutral"
      :to="meetingLink"
      trailing-icon="heroicons:calendar-days"
      label="Available for new projects"
    />
  </div>
</template>
