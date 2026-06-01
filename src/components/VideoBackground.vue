<script setup>
// Hintergrundvideo. Läuft stumm und in Schleife  also keine Musik, kein Ton.
// Das Poster wird sofort angezeigt, bis das Video geladen ist.
// Pfade über BASE_URL, damit es auch unter GitHub-Pages-Unterordnern stimmt.
const base = import.meta.env.BASE_URL
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden bg-ink">
    <video
      class="h-full w-full object-cover opacity-70 blur-sm brightness-75"
      :poster="base + 'media/poster.jpg'"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    >
      <source :src="base + 'media/trailer.mp4'" type="video/mp4" />
    </video>

    <!-- Gradient-Overlay für bessere Lesbarkeit -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="w-full h-full bg-gradient-to-b from-ink/90 via-ink/60 to-ink/95"></div>
      <div class="w-full h-full bg-gradient-to-tr from-gold-300/10 via-transparent to-gold-400/10"></div>
      <div style="background: radial-gradient(120% 80% at 50% 0%, rgba(207,159,62,0.10), transparent 70%)" class="w-full h-full absolute inset-0"></div>
    </div>
  </div>
</template>
