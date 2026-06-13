<script setup>
import logo from '@/assets/logo-no-text.png'
import { site } from '@/site.config'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/10 bg-ink/60 backdrop-">
    <div class="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div class="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div class="flex items-center gap-3">
            <img :src="logo" alt="GoldenState" class="h-10 w-10 object-contain" />
            <span class="font-display text-lg text-gold-100">GoldenState</span>
          </div>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            Ein deutsches GTA-V Roleplay-Projekt. Wir bauen die beste Version der
            goldenen Ära von Los Santos  mit Fokus auf Qualität und Spielspaß.
          </p>
        </div>

        <div>
          <h4 class="eyebrow">Community</h4>
          <ul class="mt-4 space-y-2 text-sm">
            <li><a :href="site.links.discord" target="_blank" rel="noopener" class="text-zinc-400 hover:text-gold-100">Discord</a></li>
            <li><a :href="site.links.wiki" target="_blank" rel="noopener" class="text-zinc-400 hover:text-gold-100">Wiki</a></li>
            <li><a href="https://golden-state.tech" class="text-zinc-400 hover:text-gold-100">Website</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
        <p>© {{ year }} GoldenState. Kein offizielles Rockstar-Games-Produkt. <a href="https://gstate.tech/impressum" class="underline hover:text-gold-100 ml-2">Impressum</a></p>
        <p>Made with <span style="color:gold;font-size:1.1em">💛</span> for the community by <span class="text-gold-300 font-semibold">goldenstate</span>.</p>
      </div>
    </div>
  </footer>
</template>
