import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { all } from '@redux-saga/core/effects';
import petSlice from './slice.jsx';
import createSagaMiddleware from 'redux-saga';
import petSagas from './sagas.jsx';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([...petSagas]);
}

const rootReducer = combineReducers({
  pet: petSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
