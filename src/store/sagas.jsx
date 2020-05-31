import { put, takeLatest } from '@redux-saga/core/effects';
import petSlice from './slice.jsx';

function* startCelebrating() {
  yield put(petSlice.actions.startCelebrating());
}

function* determineFoxState() {
  yield put(petSlice.actions.determineFoxState());
}

export default [
  takeLatest(petSlice.actions.cleanUpPoop.type, startCelebrating),
  takeLatest(petSlice.actions.changeWeather.type, determineFoxState),
  takeLatest(petSlice.actions.wake.type, determineFoxState),
  takeLatest(petSlice.actions.stopCelebrating.type, determineFoxState),
];
