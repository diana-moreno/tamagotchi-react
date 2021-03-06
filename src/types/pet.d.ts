export type Icon = 'weather' | 'poop' | 'fish';
export type IconStyle = 'weatherIcon' | 'poopIcon' | 'fishIcon';
export type ButtonStyle = 'left' | 'middle' | 'right';
export type ControllableScenes = 'day' | 'rain';
export type Scenes = ControllableScenes | 'night' | 'dead';
export type SceneIndex = 0 | 1;
export type ModFox =
  | 'egg'
  | 'sleep'
  | 'hungry'
  | 'eating'
  | 'pooping'
  | 'celebrate'
  | 'rain'
  | 'idling'
  | 'dead';

export type Current =
  | 'INIT'
  | 'HATCHING'
  | 'IDLING'
  | 'SLEEP'
  | 'HUNGRY'
  | 'FEEDING'
  | 'POOPING'
  | 'CELEBRATING'
  | 'DEAD';

export interface PetState {
  clock: number;
  modFox: null | ModFox;
  modScene: Scenes;
  showModal: boolean;
  showIcons: boolean;
  wakeTime: number;
  sleepTime: number;
  hungryTime: number;
  current: Current;
  timeToStartCelebrating: number;
  timeToStopCelebrating: number;
  showPoopBag: boolean;
  poopTime: number;
  dieTime: number;
  modalText: string;
}
