import React, { FC } from 'react';
import styles from './button.module.scss';
import { ButtonStyle } from 'types/pet';

interface ButtonFCProps {
  value: ButtonStyle;
  selectIcon: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonFC: FC<ButtonFCProps> = ({ value, selectIcon }) => {
  return (
    <button
      onClick={selectIcon}
      value={value}
      className={`${styles.btn} ${styles[`${value}Btn`]}`}
    ></button>
  );
};

export default ButtonFC;
