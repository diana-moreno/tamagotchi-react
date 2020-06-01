import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { all } from '@redux-saga/core/effects';
import petSlice from './slice';
import createSagaMiddleware from 'redux-saga';
import petSagas from './sagas';

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
