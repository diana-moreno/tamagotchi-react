import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './app.module.scss';
import { RootState, AppDispatch } from '../../store/store';
import { ICONS, TICK_RATE } from '../../constants/constants';
import {
  startGame,
  wake,
  setClock,
  sleep,
  getHungry,
  feed,
  startCelebrating,
  stopCelebrating,
  poop,
  cleanUpPoop,
  changeWeather,
  die,
} from '../../store/slice';
import Modal from '../Modal/Modal';
import { AppProps, Icon } from 'types/pet';

const App: FC<AppProps> = ({
  clock,
  modFox,
  modScene,
  showModal,
  showIcons,
  wakeTime,
  sleepTime,
  hungryTime,
  current,
  timeToStartCelebrating,
  timeToStopCelebrating,
  showPoopBag,
  poopTime,
  dieTime,
  modalText,
  startGame,
  setClock,
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
}) => {
  useEffect(() => {
    if (clock === wakeTime) {
      wake();
    } else if (clock === sleepTime) {
      sleep();
    } else if (clock === hungryTime) {
      getHungry();
    } else if (clock === timeToStartCelebrating) {
      startCelebrating();
    } else if (clock === timeToStopCelebrating) {
      stopCelebrating();
    } else if (clock === poopTime) {
      poop();
    } else if (clock === dieTime) {
      die();
    }
  }, [clock]);

  const initTime = () => {
    let newtTimeToTick = Date.now();

    function nextAnimationFrame() {
      const now = Date.now();

      if (newtTimeToTick <= now) {
        setClock(1);
        newtTimeToTick = now + TICK_RATE;
      }
      requestAnimationFrame(nextAnimationFrame);
    }
    nextAnimationFrame(); // first call of the closure
  };

  const handleUserAction = (icon: Icon) => {
    if (['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(current)) {
      return;
    }
    if (current === 'INIT' || current === 'DEAD') {
      startGame();
      initTime();
      return;
    }

    switch (icon) {
      case 'weather':
        changeWeather();
        break;
      case 'poop':
        if (current !== 'POOPING') {
          break;
        }
        cleanUpPoop();
        break;
      case 'fish':
        if (current !== 'HUNGRY') {
          break;
        }
        feed();
        break;
    }
  };

  const [selectedIcon, setSelectedIcon] = useState(0);

  const isHighlighted = (index: 0 | 1 | 2) =>
    selectedIcon === index ? styles.highlighted : null;

  const selectIcon = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = event.currentTarget;
    if (value === 'left') {
      setSelectedIcon((2 + selectedIcon) % ICONS.length);
    } else if (value === 'right') {
      setSelectedIcon((1 + selectedIcon) % ICONS.length);
    } else {
      handleUserAction(ICONS[selectedIcon]);
    }
  };

  const setModFox = (modFox: string | null) =>
    styles[`fox${modFox?.charAt(0).toUpperCase()}${modFox?.slice(1)}`];

  const setModScene = (modScene: string) => styles[modScene];

  return (
    <main className={styles.container}>
      <section className={styles.inner}>
        <div className={`${styles.game} ${setModScene(modScene)}`}></div>
        <div className={`${styles.fox} ${setModFox(modFox)}`}></div>
        {showPoopBag && <div className={`${styles.poopBag}`}></div>}
        <div className={styles.foregroundRain}></div>
        {showModal && <Modal modalText={modalText} />}
        <div className={styles.frame}></div>
        <ul className={styles.buttons}>
          <li>
            <button
              onClick={selectIcon}
              value='left'
              className={`${styles.btn} ${styles.leftBtn}`}
            ></button>
          </li>
          <li>
            <button
              onClick={selectIcon}
              value='middle'
              className={`${styles.btn} ${styles.middleBtn}`}
            ></button>
          </li>
          <li>
            <button
              onClick={selectIcon}
              value='right'
              className={`${styles.btn} ${styles.rightBtn}`}
            ></button>
          </li>
        </ul>
        {showIcons && (
          <ul className={`${styles.icons}`}>
            <li>
              <div className={`${styles.icon} ${isHighlighted(0)}`}></div>
            </li>
            <li>
              <div
                className={`
                ${styles.icon} 
                ${styles.poopIcon}
                ${isHighlighted(1)}
              `}
              ></div>
            </li>
            <li>
              <div
                className={`
                ${styles.icon} 
                ${styles.weatherIcon} 
                ${isHighlighted(2)}
              `}
              ></div>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
};

export default connect(
  (state: RootState) => ({
    clock: state.pet.clock,
    modFox: state.pet.modFox,
    modScene: state.pet.modScene,
    showModal: state.pet.showModal,
    showIcons: state.pet.showIcons,
    wakeTime: state.pet.wakeTime,
    sleepTime: state.pet.sleepTime,
    hungryTime: state.pet.hungryTime,
    current: state.pet.current,
    timeToStartCelebrating: state.pet.timeToStartCelebrating,
    timeToStopCelebrating: state.pet.timeToStopCelebrating,
    showPoopBag: state.pet.showPoopBag,
    poopTime: state.pet.poopTime,
    dieTime: state.pet.dieTime,
    modalText: state.pet.modalText,
  }),
  (dispatch: AppDispatch) => ({
    startGame: () => {
      dispatch(startGame());
    },
    setClock: (payload: number) => {
      dispatch(setClock(payload));
    },
    wake: () => {
      dispatch(wake());
    },
    sleep: () => {
      dispatch(sleep());
    },
    getHungry: () => {
      dispatch(getHungry());
    },
    feed: () => {
      dispatch(feed());
    },
    startCelebrating: () => {
      dispatch(startCelebrating());
    },
    stopCelebrating: () => {
      dispatch(stopCelebrating());
    },
    poop: () => {
      dispatch(poop());
    },
    cleanUpPoop: () => {
      dispatch(cleanUpPoop());
    },
    changeWeather: () => {
      dispatch(changeWeather());
    },
    die: () => {
      dispatch(die());
    },
  })
)(App);
