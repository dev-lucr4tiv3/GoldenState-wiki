<route lang="yaml">
meta:
  layout: home
</route>

<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo-no-text.png'
import {
  Rocket,
  Scale,
  Users,
  Briefcase,
  LifeBuoy,
  Lightbulb,
  ArrowRight,
  ChevronDown,
} from 'lucide-vue-next'

const categories = [
  {
    icon: Rocket,
    title: 'Erste Schritte',
    description: 'Neu auf GoldenState? Hier erfährst du alles über den Einstieg in die Welt von Los Santos.',
    path: '/getting-started',
    accent: 'group-hover:text-blue-400',
    border: 'hover:border-blue-400/30',
  },
  {
    icon: Scale,
    title: 'Regelwerk',
    description: 'Alle Server- und Verhaltensregeln kompakt und verständlich zusammengefasst.',
    path: '/rules',
    accent: 'group-hover:text-red-400',
    border: 'hover:border-red-400/30',
  },
  {
    icon: Users,
    title: 'Fraktionen',
    description: 'Entdecke Polizei, EMS, Kriminelle und alle anderen Fraktionen auf dem Server.',
    path: '/factions',
    accent: 'group-hover:text-emerald-400',
    border: 'hover:border-emerald-400/30',
  },
  {
    icon: Briefcase,
    title: 'Jobs & Berufe',
    description: 'Alle Jobs und Einkommensmöglichkeiten auf GoldenState im Überblick.',
    path: '/jobs',
    accent: 'group-hover:text-amber-400',
    border: 'hover:border-amber-400/30',
  },
  {
    icon: Lightbulb,
    title: 'Anleitungen',
    description: 'Handy, Führerschein, Wohnung, Auto: alle praktischen Schritt-für-Schritt-Guides.',
    path: '/howto',
    accent: 'group-hover:text-yellow-400',
    border: 'hover:border-yellow-400/30',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    description: 'Hast du ein Problem oder eine Frage? Unser Support-Team hilft dir weiter.',
    path: '/support',
    accent: 'group-hover:text-purple-400',
    border: 'hover:border-purple-400/30',
  },
]
</script>

<template>
  <!-- Hero Section -->
  <section class="relative flex min-h-screen flex-col items-center justify-center px-5 pb-20 pt-24 text-center">
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(55% 50% at 50% 18%, rgba(207,159,62,0.12) 0%, transparent 70%)"
    />

    <div class="relative z-10 mx-auto max-w-2xl">
      <img
        :src="logo"
        alt="GoldenState"
        class="mx-auto mb-10 h-16 w-16 object-contain animate-float drop-shadow-[0_0_24px_rgba(207,159,62,0.35)]"
      />

      <p class="eyebrow mb-5 animate-fade-in">DEUTSCHES FIVEM ROLEPLAY</p>

      <h1 class="animate-fade-up font-display leading-none tracking-tight">
        <span class="gold-text block text-5xl sm:text-6xl md:text-7xl">GoldenState</span>
        <span class="mt-3 block text-xl font-light tracking-[0.35em] text-zinc-600 sm:text-2xl">
          WIKI
        </span>
      </h1>

      <p
        class="mx-auto mt-8 max-w-md animate-fade-up text-sm leading-relaxed text-zinc-500 sm:text-base"
        style="animation-delay: 80ms"
      >
        Alles was du über GoldenState wissen musst  Regeln, Fraktionen,
        Jobs und mehr.
      </p>

      <div
        class="mt-10 animate-fade-up"
        style="animation-delay: 160ms"
      >
        <RouterLink to="/getting-started" class="btn-gold px-8 py-3 text-sm">
          Erste Schritte
          <ArrowRight class="h-4 w-4" />
        </RouterLink>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-700">
      <ChevronDown class="h-5 w-5" />
    </div>
  </section>

  <!-- Category Cards Section -->
  <section class="mx-auto max-w-screen-xl px-5 pb-28 sm:px-8">
    <div class="mb-12 text-center">
      <p class="eyebrow mb-3">KATEGORIEN</p>
      <h2 class="font-display text-2xl text-zinc-100 sm:text-3xl">Was suchst du?</h2>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="cat in categories"
        :key="cat.path"
        :to="cat.path"
        class="group relative flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/30"
        :class="cat.border"
      >
        <component
          :is="cat.icon"
          class="mb-4 h-5 w-5 text-zinc-600 transition-colors duration-200"
          :class="cat.accent"
          :stroke-width="1.5"
        />
        <h3 class="font-display text-sm font-medium text-zinc-200 transition-colors duration-200 group-hover:text-zinc-100">
          {{ cat.title }}
        </h3>
        <p class="mt-1.5 flex-1 text-xs leading-relaxed text-zinc-600">
          {{ cat.description }}
        </p>
        <div class="mt-4 flex items-center gap-1 text-xs text-zinc-700 transition-colors duration-200 group-hover:text-zinc-500">
          Mehr erfahren
          <ArrowRight class="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </RouterLink>
    </div>
  </section>
</template>
