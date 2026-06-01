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
        class="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
        style="animation-delay: 160ms"
      >
        <a
          href="https://discord.golden-state.tech"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-gold"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          Discord beitreten
        </a>
        <RouterLink to="/getting-started" class="btn-ghost">
          Erste Schritte
          <ArrowRight class="h-3.5 w-3.5" />
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
