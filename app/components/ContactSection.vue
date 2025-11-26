<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { profile } = useAppConfig()

const isResendEnabled = computed(() => Boolean(useRuntimeConfig().public.resend))

const state = ref({
  email: '',
  message: '',
  phone: '',
  fullname: '',
  subject: ''
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message is too short'),
  subject: z.string().min(5, 'Subject is too short'),
  fullname: z.string().min(3, 'Name is too short')
})
type Schema = z.output<typeof schema>

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/emails/send', {
      method: 'POST',
      body: event.data
    })
    state.value = {
      email: '',
      message: '',
      phone: '',
      fullname: '',
      subject: ''
    }
    useToast().add({
      title: 'Message sent successfully',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
  } catch {
    useToast().add({
      title: 'Error sending message',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
  loading.value = false
}
</script>

<template>
  <UPageSection>
    <AppDivider class="mb-8 mt-2" />
    <div class="flex flex-col sm:items-center sm:justify-between">
      <UForm
        :state
        :schema
        class="flex w-full max-w-[40rem] flex-col gap-3"
        @submit="onSubmit"
      >
        <UFormField
          label="Fullname"
          name="fullname"
          required
        >
          <UInput
            v-model="state.fullname"
            type="text"
            autocomplete="name"
            class="w-full"
            placeholder="John Doe"
          />
        </UFormField>

        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            autocomplete="email"
            class="w-full"
            placeholder="john.doe@gmail.com"
          />
        </UFormField>

        <UFormField
          label="Phone"
          name="phone"
        >
          <UInput
            v-model="state.phone"
            autocomplete="tel"
            class="w-full"
            placeholder="123-456-7890"
          />
        </UFormField>

        <UFormField
          label="Subject"
          name="subject"
          required
        >
          <UInput
            v-model="state.subject"
            class="w-full"
            placeholder="Subject"
          />
        </UFormField>

        <UFormField
          label="Message"
          name="message"
          required
        >
          <UTextarea
            v-model="state.message"
            autoresize
            class="w-full"
            :rows="4"
            placeholder="Lets work together!"
          />
        </UFormField>
        <div class="flex justify-center">
          <UTooltip
            :disabled="isResendEnabled"
            text="Disabled"
          >
            <UButton
              :loading
              :disabled="!isResendEnabled"
              type="submit"
              block
            >
              Submit
            </UButton>
          </UTooltip>
        </div>
      </UForm>
      <AppDivider class="my-10" />
      <div class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex flex-col gap-3">
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon
              name="heroicons-phone"
              class="size-6"
              aria-hidden="true"
            />
            <span>
              {{ profile.phone }}
            </span>
          </dd>
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon
              name="heroicons-envelope"
              class="size-6"
              aria-hidden="true"
            />
            <UTooltip
              text="Email"
              :shortcuts="['⌘', 'O']"
            >
              <NuxtLink
                :to="`mailto:${profile.email}`"
                class="cursor-pointer transition-colors duration-300"
              >
                {{ profile.email }}
              </NuxtLink>
            </UTooltip>
          </dd>
        </div>
        <div>
          <MeetingButton />
        </div>
      </div>
    </div>
  </UPageSection>
</template>
