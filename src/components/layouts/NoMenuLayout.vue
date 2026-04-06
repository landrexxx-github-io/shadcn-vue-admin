<template>
  <div class="min-h-screen bg-slate-50 flex items-top justify-center px-4 mt-10">
    <div class="w-full max-w-md">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
