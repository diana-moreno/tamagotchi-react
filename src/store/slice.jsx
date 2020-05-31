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
} from '../components/constants';

const initialState = {
  current: 'INIT',
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  poopTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToStopCelebrating: -1,
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
      console.log(state.clock);
      state.clock = state.clock + action.payload;
    },
    startGame(state) {
      console.log('start game');
      state.current = 'HATCHING';
      state.wakeTime = state.clock + 3;
      state.modFox = 'egg';
      state.showModal = false;
      state.showIcons = true;
    },
    wake(state) {
      console.log('awoken');
      state.current = 'IDLING';
      state.wakeTime = -1;
      state.modScene = SCENES[state.scene];
      state.sleepTime = state.clock + DAY_LENGTH;
      state.hungryTime = getNextHungerTime(state.clock);
    },
    sleep(state) {
      console.log('sleep');
      state.current = 'SLEEP';
      state.modFox = 'sleep';
      state.modScene = 'night';
      petSlice.actions.clearTimes();
      state.wakeTime = state.clock + NIGHT_LENGTH;
    },
    clearTimes(state) {
      console.log('clear times');
      state.wakeTime = -1;
      state.sleepTime = -1;
      state.hungryTime = -1;
      state.poopTime = -1;
      state.dieTime = -1;
      state.timeToStartCelebrating = -1;
      state.timeToStopCelebrating = -1;
    },
    getHungry(state) {
      console.log('hungry');
      state.current = 'HUNGRY';
      state.dieTime = getNextDieTime(state.clock);
      state.hungryTime = -1;
      state.modFox = 'hungry';
    },
    feed(state) {
      console.log('feed');
      state.current = 'FEEDING';
      state.dieTime = -1;
      state.poopTime = getNextPoopTime(state.clock);
      state.modFox = 'eating';
      state.timeToStartCelebrating = state.clock + 2;
    },
    poop(state) {
      console.log('poop');
      state.current = 'POOPING';
      state.poopTime = -1;
      state.dieTime = getNextDieTime(state.clock);
      state.modFox = 'pooping';
    },
    cleanUpPoop(state) {
      console.log('clean up poop');
      state.dieTime = -1;
      state.showPoopBag = true;
      state.hungryTime = getNextHungerTime(state.clock);
    },
    startCelebrating(state) {
      console.log('start celebrating');
      state.current = 'CELEBRATING';
      state.modFox = 'celebrate';
      state.timeToStartCelebrating = -1;
      state.timeToStopCelebrating = state.clock + 2;
    },
    stopCelebrating(state) {
      console.log('stop celebrating');
      state.timeToStopCelebrating = -1;
      state.current = 'IDLING';
      state.showPoopBag = false;
    },
    changeWeather(state) {
      console.log('change weather');
      state.scene = (state.scene + 1) % SCENES.length;
      state.modScene = SCENES[state.scene];
    },
    determineFoxState(state) {
      state.modFox =
        state.current === 'IDLING' && SCENES[state.scene] === 'rain'
          ? 'rain'
          : 'idling';
    },
    die(state) {
      console.log('dead');
      state.current = 'DEAD';
      state.modScene = 'dead';
      state.modFox = 'dead';
      state.modalText = MODAL_TEXT_DIE;
      state.showModal = true;
      state.showIcons = false;
      petSlice.actions.clearTimes();
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
