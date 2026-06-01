<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div class="text-8xl font-bold text-gold-300/20 mb-4">404</div>
    <h1 class="text-3xl font-display text-gold-100 mb-4">Seite nicht gefunden</h1>
    <p class="text-zinc-400 mb-8 max-w-md">
      Die Seite, die du suchst, existiert nicht oder wurde verschoben.
    </p>
    <button 
      @click="goHome"
      class="px-6 py-3 bg-gold-300/20 hover:bg-gold-300/30 text-gold-200 rounded-lg transition-colors"
    >
      Zurück zur Startseite
    </button>
  </div>
</template>
