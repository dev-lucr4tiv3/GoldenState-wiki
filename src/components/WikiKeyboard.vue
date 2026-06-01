<script setup>
import { ref, computed } from 'vue'

// ─── Keybind data ─────────────────────────────────────────────────────────
// To add or change a keybind, edit this array only.
// type: 'gta'    = Standard GTA 5 Taste – funktioniert in jeder FiveM Stadt
//       'script' = GoldenState Script-Taste – nur hier
//       'fivem'  = FiveM System-Taste
// rebindable: true = Taste kann in den Einstellungen geändert werden
const keybinds = [
  { key: 'Esc',    label: 'Pausemenü',            short: 'Pause',    detail: 'Öffnet das Pausemenü.',                                              type: 'gta',    rebindable: false, section: 'kb-menus' },
  { key: 'F1',     label: 'Handy',                short: 'Handy',    detail: 'Öffnet dein Handy, sofern du eines besitzt.',                       type: 'script', rebindable: true,  section: 'kb-menus' },
  { key: 'F2',     label: 'Inventar',             short: 'Inventar', detail: 'Öffnet dein persönliches Inventar.',                               type: 'script', rebindable: true,  section: 'kb-menus' },
  { key: 'F3',     label: 'Emotes',               short: 'Emotes',   detail: 'Öffnet das Emote-Menü für Gesten und Animationen.',                type: 'script', rebindable: true,  section: 'kb-menus' },
  { key: 'F4',     label: 'Sanitätssystem',       short: 'Sani',     detail: 'Öffnet das Sanitätssystem (visn_are). Für Sanitäter und Verletzte.', type: 'script', rebindable: false, section: 'kb-menus' },
  { key: 'F5',     label: 'Ticket erstellen',     short: 'Ticket',   detail: 'Erstellt ein Admin-Ticket bei Problemen.',                          type: 'script', rebindable: false, section: 'kb-menus' },
  { key: 'F8',     label: 'FiveM Konsole',        short: 'Konsole',  detail: 'Öffnet die FiveM-Konsole. Für Entwickler und Debugging.',          type: 'fivem',  rebindable: false, section: 'kb-system' },
  { key: 'F9',     label: 'Kinomodus',            short: 'Kino',     detail: 'Cinematischer Kameramodus.',                            type: 'script', rebindable: true,  section: 'kb-menus' },
  { key: 'Tab',    label: 'Waffenrad',            short: 'Waffen',   detail: 'Öffnet das Waffenauswahlmenü.',                                    type: 'gta',    rebindable: false, section: 'kb-combat' },
  { key: 'Q',      label: 'Umsehen',              short: 'Umsehen',  detail: 'Links umsehen zu Fuß, Waffenwechsel.',                             type: 'gta',    rebindable: false, section: 'kb-combat' },
  { key: 'W',      label: 'Vorwärts',             short: 'Vor',      detail: 'Vorwärts laufen oder Gas geben.',                                  type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'A',      label: 'Links',                short: 'Links',    detail: 'Nach links laufen oder Lenkrad links.',                            type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'S',      label: 'Rückwärts',            short: 'Zurück',   detail: 'Rückwärts gehen oder Bremsen.',                                    type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'D',      label: 'Rechts',               short: 'Rechts',   detail: 'Nach rechts laufen oder Lenkrad rechts.',                          type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'E',      label: 'Interagieren',         short: 'Interakt', detail: 'Mit Objekten, NPCs und Spielern interagieren.',                   type: 'gta',    rebindable: false, section: 'kb-interaction' },
  { key: 'R',      label: 'Nachladen',            short: 'Nachladen',   detail: 'Waffe nachladen.',                                                  type: 'gta',    rebindable: false, section: 'kb-combat' },
  { key: 'F',      label: 'Fahrzeug (Fahrer)',    short: 'Einsteigen',   detail: 'Als Fahrer in ein Fahrzeug ein- oder aussteigen.',                 type: 'gta',    rebindable: false, section: 'kb-vehicle' },
  { key: 'G',      label: 'Fahrzeug (Beifahrer)', short: 'Zusteigen',detail: 'Als Beifahrer in ein Fahrzeug einsteigen.',                        type: 'gta',    rebindable: false, section: 'kb-vehicle' },
  { key: 'H',      label: 'Hupe',                 short: 'Hupe',     detail: 'Fahrzeughupe betätigen.',                                          type: 'gta',    rebindable: false, section: 'kb-vehicle' },
  { key: 'P',      label: 'Karte / GPS',          short: 'Karte',    detail: 'GPS-Karte öffnen und schließen.',                                  type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'X',      label: 'Hände hoch',           short: 'Hände',    detail: 'Hände hochheben als Zeichen der Aufgabe.',                        type: 'script', rebindable: false, section: 'kb-interaction' },
  { key: 'Z',      label: 'Radio / Funk',         short: 'Radio',    detail: 'Funkgerät aktivieren.',                                            type: 'script', rebindable: false, section: 'kb-interaction' },
  { key: 'LShift', label: 'Sprint',               short: 'Sprint',   detail: 'Schnell laufen oder Gas geben im Fahrzeug.',                      type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'LCtrl',  label: 'Schleichen',           short: 'Schleich', detail: 'Schleichmodus aktivieren.',                                        type: 'gta',    rebindable: false, section: 'kb-movement' },
  { key: 'LAlt',   label: 'Ziel-System',          short: 'Interaktion',   detail: 'ox_target: Interaktionsmenü aktivieren.',        type: 'script', rebindable: false, section: 'kb-interaction' },
  { key: 'Space',  label: 'Springen / Handbremse',short: 'Springen', detail: 'Springen zu Fuß. Im Fahrzeug: Handbremse.',                       type: 'gta',    rebindable: false, section: 'kb-movement' },
]

const kbMap = new Map(keybinds.map(k => [k.key, k]))

// Display labels for special/wide keys shown on the key cap
const capLabels = {
  Backspace: '⌫', Enter: '↵', LShift: 'Shift ⇧', RShift: '⇧ Shift',
  LCtrl: 'Ctrl', RCtrl: 'Ctrl', LAlt: 'Alt', RAlt: 'Alt',
  Space: '', Caps: 'Caps', Tab: 'Tab', '\\': '\\',
}

// ─── Keyboard layout ──────────────────────────────────────────────────────
// null entries create visual spacers between key groups.
// f = flex-grow factor (1 = standard key width)
const rawLayout = [
  [
    { k: 'Esc', f: 1.5 }, { spacer: true, f: 1 },
    'F1', 'F2', 'F3', 'F4', { spacer: true, f: 0.5 },
    'F5', 'F6', 'F7', 'F8', { spacer: true, f: 0.5 },
    'F9', 'F10', 'F11', 'F12',
  ],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', { k: 'Backspace', f: 2 }],
  [{ k: 'Tab', f: 1.5 }, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', { k: '\\', f: 1.5 }],
  [{ k: 'Caps', f: 1.75 }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", { k: 'Enter', f: 2.25 }],
  [{ k: 'LShift', f: 2.25 }, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', { k: 'RShift', f: 2.75 }],
  [{ k: 'LCtrl', f: 1.25 }, { k: 'Win', f: 1.25 }, { k: 'LAlt', f: 1.25 }, { k: 'Space', f: 6.25 }, { k: 'RAlt', f: 1.25 }, { k: 'Fn', f: 1 }, { k: 'RCtrl', f: 1.25 }],
]

// Pre-normalize all rows – each cell becomes a plain object, no function calls in template
const rows = rawLayout.map((row, ri) =>
  row.map(cell => {
    if (cell === null || cell?.spacer) {
      return { spacer: true, f: cell?.f ?? 0.5 }
    }
    const k = typeof cell === 'string' ? cell : cell.k
    const f = typeof cell === 'string' ? 1 : (cell.f ?? 1)
    const kb = kbMap.get(k)
    return {
      k,
      f,
      kb,
      cap: capLabels[k] ?? k,
      short: kb?.short ?? null,
      type: kb?.type ?? null,
      rebindable: kb?.rebindable ?? false,
      isFnRow: ri === 0,
    }
  })
)

// ─── Interaction ─────────────────────────────────────────────────────────
const hovered = ref(null)
const active = computed(() => hovered.value ? kbMap.get(hovered.value) : null)

function scrollToSection(section) {
  if (!section) return
  const el = document.getElementById(section)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Tailwind class maps  full strings required for JIT scanner
const keyColors = {
  gta:    'text-cyan-300 border-cyan-400/30 bg-cyan-400/10 cursor-pointer',
  script: 'text-amber-300 border-amber-400/30 bg-amber-400/10 cursor-pointer',
  fivem:  'text-violet-300 border-violet-400/30 bg-violet-400/10 cursor-pointer',
  off:    'text-white/30 border-white/5 bg-white/[0.015]',
}
const infoKeyColors = {
  gta:    'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
  script: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
  fivem:  'text-violet-300 border-violet-400/40 bg-violet-400/10',
}
const tagColors = {
  gta:    'text-cyan-300 border-cyan-400/30 bg-cyan-400/10',
  script: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  fivem:  'text-violet-300 border-violet-400/30 bg-violet-400/10',
  rebind: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
}
const legendItems = [
  { key: 'gta',    cls: 'text-cyan-300 border-cyan-400/25 bg-cyan-400/[0.06]',       label: 'GTA 5 Standard',       sub: 'funktioniert überall' },
  { key: 'script', cls: 'text-amber-300 border-amber-400/25 bg-amber-400/[0.06]',    label: 'GoldenState Exklusiv', sub: null },
  { key: 'fivem',  cls: 'text-violet-300 border-violet-400/25 bg-violet-400/[0.06]', label: 'FiveM System',         sub: null },
  { key: 'rebind', cls: 'text-emerald-300 border-emerald-400/25 bg-emerald-400/[0.06]', label: 'Neuzuweisung möglich', sub: null },
]

function typeLabel(t) {
  if (t === 'gta') return 'GTA 5 Standard'
  if (t === 'script') return 'GoldenState Exklusiv'
  return 'FiveM System'
}
</script>

<template>
  <div class="my-6">
    <!-- Legend -->
    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="item in legendItems" :key="item.key"
        class="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border"
        :class="item.cls"
      >
        <span class="w-[7px] h-[7px] rounded-full shrink-0 bg-current opacity-80" />
        {{ item.label }}
        <span v-if="item.sub" class="opacity-60 font-normal ml-0.5">{{ item.sub }}</span>
      </span>
    </div>

    <!-- Keyboard -->
    <div class="overflow-x-auto rounded-2xl">
      <div
        class="min-w-[700px] bg-zinc-950/90 border border-white/[0.08] rounded-2xl p-3.5 pb-3 flex flex-col gap-[5px] select-none"
        style="box-shadow:0 4px 32px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.04)"
      >
        <div v-for="(row, ri) in rows" :key="ri" class="flex gap-[5px]">
          <template v-for="(cell, ci) in row" :key="ci">
            <!-- Spacer between fn-key groups -->
            <div v-if="cell.spacer" class="basis-0 shrink-0" :style="{ flexGrow: cell.f }" />

            <!-- Key -->
            <div
              v-else
              class="relative flex flex-col items-center justify-center basis-0 shrink-0 border rounded-[7px] text-[10px] font-semibold text-center overflow-hidden transition-[transform,filter] duration-75"
              :class="[
                cell.fnRow ? 'h-9' : 'h-11',
                cell.kb ? keyColors[cell.type] : keyColors.off,
                hovered === cell.k ? '-translate-y-px brightness-125' : '',
              ]"
              :style="{ flexGrow: cell.f }"
              @mouseenter="hovered = cell.k"
              @mouseleave="hovered = null"
              @click="cell.kb && scrollToSection(cell.kb.section)"
            >
              <span v-if="cell.rebindable" class="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full bg-emerald-400" />
              <span class="leading-none">{{ cell.cap }}</span>
              <span v-if="cell.short" class="text-[7px] mt-[2px] leading-none opacity-70 whitespace-nowrap overflow-hidden max-w-full px-[2px]">{{ cell.short }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Info panel -->
      <div class="mt-1.5 min-h-[68px] bg-zinc-950/70 border border-white/[0.07] rounded-xl px-4 py-3 flex items-center gap-4">
        <template v-if="active">
          <div class="text-base font-bold shrink-0 min-w-[52px] text-center font-mono px-2.5 py-2 rounded-lg border" :class="infoKeyColors[active.type]">
            {{ active.key }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-zinc-100 mb-0.5">{{ active.label }}</div>
            <div class="text-xs text-zinc-500 leading-relaxed">{{ active.detail }}</div>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <span class="text-[10px] font-semibold px-2 py-[2px] rounded-full border" :class="tagColors[active.type]">{{ typeLabel(active.type) }}</span>
              <span v-if="active.rebindable" class="text-[10px] font-semibold px-2 py-[2px] rounded-full border" :class="tagColors.rebind">Neuzuweisung möglich</span>
            </div>
          </div>
        </template>
        <div v-else class="w-full text-center text-xs text-zinc-700 italic">
          Zeiger über eine markierte Taste für Details &nbsp;&nbsp; Klick springt zur Erklärung
        </div>
      </div>
    </div>
  </div>
</template>
