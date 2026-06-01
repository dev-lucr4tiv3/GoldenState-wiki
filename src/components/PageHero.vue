<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="mx-auto max-w-3xl px-5 pb-12 pt-36 text-center sm:px-8 sm:pt-40">
    <p v-if="eyebrow" class="eyebrow animate-fade-in">{{ eyebrow }}</p>
    <h1 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">
      <span class="gold-text">{{ title }}</span>
    </h1>
    <p v-if="subtitle" class="mx-auto mt-5 max-w-xl text-zinc-400">{{ subtitle }}</p>
    <div class="mx-auto mt-8 h-px w-24 gold-line"></div>
  </header>
</template>
