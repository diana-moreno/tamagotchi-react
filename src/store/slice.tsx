import { createSlice } from '@reduxjs/toolkit';
import {
  SCENES,
  DAY_LENGTH,
  RAIN_CHANGE,
  getNextHungerTime,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextPoopTime,
  MODAL_TEXT_DIE,
  MODAL_TEXT_START,
} from '../constants/constants';
import { PetState } from 'types/pet';
import { consoleMessage } from '../utils/utils';

interface PetStateSlice extends PetState {
  scene: number;
}

const initialState: PetStateSlice = {
  current: 'INIT',
  clock: 1,
  wakeTime: NaN,
  sleepTime: NaN,
  hungryTime: NaN,
  poopTime: NaN,
  dieTime: NaN,
  timeToStartCelebrating: NaN,
  timeToStopCelebrating: NaN,
  modFox: null,
  modScene: 'day',
  showModal: true,
  showIcons: false,
  scene: Math.random() > RAIN_CHANGE ? 0 : 1,
  showPoopBag: false,
  modalText: MODAL_TEXT_START,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setClock(state, action) {
      consoleMessage(state.clock);
      state.clock = state.clock + action.payload;
    },
    startGame(state) {
      consoleMessage('start game');
      state.current = 'HATCHING';
      state.wakeTime = state.clock + 3;
      state.modFox = 'egg';
      state.modScene = 'day';
      state.showModal = false;
      state.showIcons = true;
    },
    wake(state) {
      consoleMessage('awoken');
      state.current = 'IDLING';
      state.wakeTime = 0;
      state.modScene = SCENES[state.scene];
      state.sleepTime = state.clock + DAY_LENGTH;
      state.hungryTime = getNextHungerTime(state.clock);
    },
    sleep(state) {
      consoleMessage('sleep');
      state.current = 'SLEEP';
      state.modFox = 'sleep';
      state.modScene = 'night';
      state.sleepTime = NaN;
      state.hungryTime = NaN;
      state.poopTime = NaN;
      state.dieTime = NaN;
      state.timeToStartCelebrating = NaN;
      state.timeToStopCelebrating = NaN;
      state.wakeTime = state.clock + NIGHT_LENGTH;
    },
    getHungry(state) {
      consoleMessage('hungry');
      state.current = 'HUNGRY';
      state.dieTime = getNextDieTime(state.clock);
      state.hungryTime = NaN;
      state.modFox = 'hungry';
    },
    feed(state) {
      consoleMessage('feed');
      state.current = 'FEEDING';
      state.dieTime = NaN;
      state.poopTime = getNextPoopTime(state.clock);
      state.modFox = 'eating';
      state.timeToStartCelebrating = state.clock + 2;
    },
    poop(state) {
      consoleMessage('poop');
      state.current = 'POOPING';
      state.poopTime = NaN;
      state.dieTime = getNextDieTime(state.clock);
      state.modFox = 'pooping';
    },
    cleanUpPoop(state) {
      consoleMessage('clean up poop');
      state.dieTime = NaN;
      state.showPoopBag = true;
      state.hungryTime = getNextHungerTime(state.clock);
    },
    startCelebrating(state) {
      consoleMessage('start celebrating');
      state.current = 'CELEBRATING';
      state.modFox = 'celebrate';
      state.timeToStartCelebrating = NaN;
      state.timeToStopCelebrating = state.clock + 2;
    },
    stopCelebrating(state) {
      consoleMessage('stop celebrating');
      state.timeToStopCelebrating = NaN;
      state.current = 'IDLING';
      state.showPoopBag = false;
    },
    changeWeather(state) {
      consoleMessage('change weather');
      state.scene = (state.scene + 1) % SCENES.length;
      state.modScene = SCENES[state.scene];
      console.log(state.current);
    },
    determineFoxState(state) {
      state.modFox =
        state.current === 'IDLING'
          ? SCENES[state.scene] === 'rain'
            ? 'rain'
            : 'idling'
          : state.modFox;
    },
    die(state) {
      consoleMessage('dead');
      state.current = 'DEAD';
      state.modScene = 'dead';
      state.modFox = 'dead';
      state.modalText = MODAL_TEXT_DIE;
      state.showModal = true;
      state.showIcons = false;
      state.wakeTime = NaN;
      state.sleepTime = NaN;
      state.hungryTime = NaN;
      state.poopTime = NaN;
      state.dieTime = NaN;
      state.timeToStartCelebrating = NaN;
      state.timeToStopCelebrating = NaN;
    },
  },
});

export const {
  setClock,
  startGame,
  wake,
  sleep,
  getHungry,
  feed,
  startCelebrating,
  stopCelebrating,
  poop,
  cleanUpPoop,
  changeWeather,
  die,
} = petSlice.actions;

export default petSlice;
