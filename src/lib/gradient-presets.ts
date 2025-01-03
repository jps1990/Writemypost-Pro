export interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  preview: string;
}

export const gradientPresets: GradientPreset[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#FF512F', '#DD2476'],
    preview: 'bg-gradient-to-tr from-[#FF512F] to-[#DD2476]'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#2193b0', '#6dd5ed'],
    preview: 'bg-gradient-to-tr from-[#2193b0] to-[#6dd5ed]'
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#134E5E', '#71B280'],
    preview: 'bg-gradient-to-tr from-[#134E5E] to-[#71B280]'
  },
  {
    id: 'royal',
    name: 'Royal',
    colors: ['#141E30', '#243B55'],
    preview: 'bg-gradient-to-tr from-[#141E30] to-[#243B55]'
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    colors: ['#3A1C71', '#D76D77', '#FFAF7B'],
    preview: 'bg-gradient-to-tr from-[#3A1C71] via-[#D76D77] to-[#FFAF7B]'
  }
];