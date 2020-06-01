import { ControllableScenes, ButtonStyle, IconStyle } from 'types/pet';

export const ICONS = ['fish', 'poop', 'weather'] as const;
export const SCENES: ControllableScenes[] = ['day', 'rain'];
export const TICK_RATE = 3000;
export const RAIN_CHANGE = 0.2;
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 5;

export const getNextHungerTime = (clock: number) =>
  Math.floor(Math.random() * 3) + 8 + clock; // 5 - 6 - 7 + clock

export const getNextDieTime = (clock: number) =>
  Math.floor(Math.random() * 3) + 3 + clock;

export const getNextPoopTime = (clock: number) =>
  Math.floor(Math.random() * 3) + 8 + clock;

export const MODAL_TEXT_START = 'Press the middle button to start';
export const MODAL_TEXT_DIE =
  'The fox died!\n Press the middle button to play again.';

export const ICONS_LIST: { value: IconStyle }[] = [
  {
    value: 'fishIcon',
  },
  {
    value: 'poopIcon',
  },
  {
    value: 'weatherIcon',
  },
];

export const BUTTONS_LIST: { value: ButtonStyle }[] = [
  {
    value: 'left',
  },
  {
    value: 'middle',
  },
  {
    value: 'right',
  },
];
