export interface Track {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  year: string;
  audio: string;
  cover: string;
  accent: string;
  note: string;
}

export const tracks: Track[] = [
  {
    id: 'donk-reactor',
    title: 'DONK REACTOR',
    genre: 'Hardbass',
    bpm: 150,
    duration: '0:14',
    year: '2026',
    audio: '/assets/audio/hardbass.mp3',
    cover: '/assets/img/genre-hardbass.png',
    accent: '#3aa655',
    note: 'Pumping donk bass built for warehouse floors.',
  },
  {
    id: 'wobble-machine',
    title: 'WOBBLE MACHINE',
    genre: 'Dubstep',
    bpm: 140,
    duration: '0:14',
    year: '2026',
    audio: '/assets/audio/dubstep.mp3',
    cover: '/assets/img/genre-dubstep.png',
    accent: '#6c4fd8',
    note: 'Metallic growls and robotic wobble artillery.',
  },
  {
    id: 'eight-o-weight',
    title: '808 WEIGHT',
    genre: 'Trap',
    bpm: 140,
    duration: '0:14',
    year: '2025',
    audio: '/assets/audio/trap.mp3',
    cover: '/assets/img/genre-trap.png',
    accent: '#ff6b35',
    note: 'Sub-heavy 808s with razor hi-hat rolls.',
  },
  {
    id: 'brass-knuckles',
    title: 'BRASS KNUCKLES',
    genre: 'Hard Trap',
    bpm: 150,
    duration: '0:14',
    year: '2025',
    audio: '/assets/audio/hardtrap.mp3',
    cover: '/assets/img/genre-hardtrap.png',
    accent: '#e0342f',
    note: 'Distorted brass stabs, festival-grade aggression.',
  },
  {
    id: 'midnight-drift',
    title: 'MIDNIGHT DRIFT',
    genre: 'Phonk',
    bpm: 132,
    duration: '0:14',
    year: '2025',
    audio: '/assets/audio/phonk.mp3',
    cover: '/assets/img/genre-phonk.png',
    accent: '#c64f9e',
    note: 'Cowbell melodies for night-drive sideways energy.',
  },
  {
    id: 'neon-orbit',
    title: 'NEON ORBIT',
    genre: 'Electronic',
    bpm: 128,
    duration: '0:14',
    year: '2024',
    audio: '/assets/audio/electronic.mp3',
    cover: '/assets/img/genre-electronic.png',
    accent: '#61cadf',
    note: 'Supersaw euphoria straight from the synth planet.',
  },
];

export interface Genre {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bpm: string;
  mood: string[];
  image: string;
  bg: string;
  ink: string;
}

export const genres: Genre[] = [
  {
    id: 'hardbass',
    name: 'HARDBASS',
    tagline: 'The Donk Gymnasium',
    description:
      'Where it all kicks off. Pumping donk bass, tracksuit energy and kicks that hit like a PE class you actually want to attend.',
    bpm: '150 BPM',
    mood: ['donk', 'rave', 'adidas-core'],
    image: '/assets/img/genre-hardbass.png',
    bg: '#3aa655',
    ink: '#fefbfa',
  },
  {
    id: 'dubstep',
    name: 'DUBSTEP',
    tagline: 'The Wobble Factory',
    description:
      'A robot-run plant manufacturing wobble bass by the ton. Glitchy lasers, metallic growls and drops that bend the floor.',
    bpm: '140 BPM',
    mood: ['wobble', 'growl', 'glitch'],
    image: '/assets/img/genre-dubstep.png',
    bg: '#6c4fd8',
    ink: '#fefbfa',
  },
  {
    id: 'trap',
    name: 'TRAP',
    tagline: 'The 808 Corner Store',
    description:
      'Open late. Shelves stocked with booming 808 subs, crisp hi-hat rolls and dark bell melodies — sold by the pound.',
    bpm: '140 BPM',
    mood: ['808', 'hi-hats', 'night'],
    image: '/assets/img/genre-trap.png',
    bg: '#ff6b35',
    ink: '#282b29',
  },
  {
    id: 'hard-trap',
    name: 'HARD TRAP',
    tagline: 'The Distortion Dojo',
    description:
      'The demon sensei of the universe. Distorted 808s, aggressive brass and enough festival energy to power a small city.',
    bpm: '150 BPM',
    mood: ['aggressive', 'brass', 'festival'],
    image: '/assets/img/genre-hardtrap.png',
    bg: '#e0342f',
    ink: '#fefbfa',
  },
  {
    id: 'phonk',
    name: 'PHONK',
    tagline: 'The Midnight Drift Club',
    description:
      'Members only after midnight. Cowbell loops, Memphis ghosts and retro coupes sliding sideways through neon fog.',
    bpm: '132 BPM',
    mood: ['cowbell', 'drift', 'memphis'],
    image: '/assets/img/genre-phonk.png',
    bg: '#c64f9e',
    ink: '#fefbfa',
  },
  {
    id: 'electronic',
    name: 'ELECTRONIC',
    tagline: 'The Synth Planet',
    description:
      'A whole planet wired as one modular synthesizer. Supersaw skies, sidechained oceans and four-on-the-floor gravity.',
    bpm: '128 BPM',
    mood: ['supersaw', 'melodic', 'cosmic'],
    image: '/assets/img/genre-electronic.png',
    bg: '#61cadf',
    ink: '#282b29',
  },
];

export interface Chapter {
  year: string;
  title: string;
  text: string;
  image: string;
  rotate: string;
}

export const chapters: Chapter[] = [
  {
    year: '2019',
    title: 'Bedroom Frequencies',
    text: 'A laptop, a borrowed MIDI keyboard and a pair of monitors that rattled the whole apartment. THRED starts stitching basslines at 3AM, bouncing the first donks through a wall of posters and vinyl.',
    image: '/assets/img/story-1.png',
    rotate: '-2deg',
  },
  {
    year: '2021',
    title: 'The Sound Lab',
    text: 'The bedroom becomes a laboratory. Sound waves get bottled, bent and re-wired — every experiment a new genre hybrid. Hardbass meets trap, dubstep shakes hands with phonk.',
    image: '/assets/img/story-2.png',
    rotate: '2deg',
  },
  {
    year: '2023',
    title: 'Stage Invasion',
    text: 'The lab results escape. Festival stages, wall-sized speaker stacks and crowds moving like one giant waveform. The illustrated universe goes loud in real life.',
    image: '/assets/img/story-3.png',
    rotate: '-2deg',
  },
  {
    year: 'NOW',
    title: 'The Illustrated Universe',
    text: 'Today THRED is a whole universe — every genre a planet, every release a character, every show a new chapter. The drawing board and the dancefloor are the same place.',
    image: '/assets/img/mascot.png',
    rotate: '2deg',
  },
];

export interface Release {
  title: string;
  year: string;
  kind: string;
  cover: string;
  tracks: number;
  rotate: string;
}

export const releases: Release[] = [
  {
    title: 'ORBITAL CAT',
    year: '2026',
    kind: 'EP — 5 tracks',
    cover: '/assets/img/album-1.png',
    tracks: 5,
    rotate: '-5deg',
  },
  {
    title: 'SPEAKER SKULL',
    year: '2025',
    kind: 'Album — 11 tracks',
    cover: '/assets/img/album-2.png',
    tracks: 11,
    rotate: '3deg',
  },
  {
    title: 'WAVE RIDER',
    year: '2024',
    kind: 'EP — 6 tracks',
    cover: '/assets/img/album-3.png',
    tracks: 6,
    rotate: '-3deg',
  },
];

export const socials = [
  { label: 'Spotify', href: '#' },
  { label: 'SoundCloud', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Bandcamp', href: '#' },
  { label: 'Beatport', href: '#' },
];
