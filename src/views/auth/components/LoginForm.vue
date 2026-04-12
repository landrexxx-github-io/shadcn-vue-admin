<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GalleryVerticalEnd, Lock, User2 } from 'lucide-vue-next'
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const handleSubmitLogin = (e: SubmitEvent) => {
  e.preventDefault()
  console.log('submitted')
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <form @submit="handleSubmitLogin">
      <FieldGroup class="gap-3">
        <div class="flex flex-col items-center gap-2 text-center">
          <a href="#" class="flex flex-col items-center gap-2">
            <div class="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd class="size-6" />
            </div>
            <span class="sr-only">Source NET.</span>
          </a>
          <h1 class="text-xl font-bold">Welcome to SourceNET</h1>
          <FieldDescription> Please enter your credentials to login. </FieldDescription>
        </div>
        <Field>
          <FieldLabel for="username"> Username </FieldLabel>
          <InputGroup class="h-12 px-1 gap-1">
            <InputGroupInput
              type="text"
              id="username"
              placeholder="Enter your username"
              class="h-full font-base placeholder:text-muted-foreground/60"
            />
            <InputGroupAddon>
              <User2 class="size-4 text-muted-foreground/60" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="password"> Password </FieldLabel>
          <InputGroup class="h-12 gap-1 px-1">
            <InputGroupInput
              type="password"
              id="password"
              placeholder="Enter your password"
              class="h-full font-base placeholder:text-muted-foreground/60"
            />
            <InputGroupAddon>
              <Lock class="size-4 text-muted-foreground/60" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field class="my-3">
          <Button type="submit" class="h-12"> Login </Button>
        </Field>
      </FieldGroup>
    </form>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and
      <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
