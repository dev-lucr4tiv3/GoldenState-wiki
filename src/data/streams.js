// Streamer, die GoldenState spielen.

export const streams = [
  // {
  //   name: 'GoldenTV',
  //   platform: 'twitch',
  //   channel: 'goldenstate',
  //   live: false,
  //   title: 'GoldenState  Beta Showcase',
  // },
]

export function streamUrl(s) {
  if (s.platform === 'twitch') return `https://twitch.tv/${s.channel}`
  return '#'
}
