import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './app.module.scss';
import { RootState, AppDispatch } from '../../store/store';
import {
  ICONS,
  TICK_RATE,
  ICONS_LIST,
  BUTTONS_LIST,
} from '../../constants/constants';
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
import { PetState, Icon, ButtonStyle, IconStyle } from 'types/pet';
import IconFC from '../Icon/Icon';
import ButtonFC from '../Button/Button';

interface AppProps extends PetState {
  startGame: () => void;
  setClock: (x: number) => void;
  wake: () => void;
  sleep: () => void;
  getHungry: () => void;
  feed: () => void;
  startCelebrating: () => void;
  stopCelebrating: () => void;
  poop: () => void;
  cleanUpPoop: () => void;
  changeWeather: () => void;
  die: () => void;
}

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

  useEffect(() => {
    (function initTime() {
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
    })();
  }, []);

  const handleUserAction = (icon: Icon) => {
    if (['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(current)) {
      return;
    }
    if (current === 'INIT' || current === 'DEAD') {
      startGame();
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
          {BUTTONS_LIST.map((elem: { value: ButtonStyle }, index: number) => (
            <li key={index}>
              <ButtonFC value={elem.value} selectIcon={selectIcon} />
            </li>
          ))}
        </ul>
        {showIcons && (
          <ul className={`${styles.icons}`}>
            {ICONS_LIST.map((elem: { value: IconStyle }, index: number) => (
              <li key={index}>
                <IconFC
                  value={elem.value}
                  index={index}
                  selectedIcon={selectedIcon}
                />
              </li>
            ))}
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
