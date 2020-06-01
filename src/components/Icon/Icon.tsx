import React, { FC } from 'react';
import styles from './icon.module.scss';
import { IconStyle } from 'types/pet';

interface IconProps {
  value: IconStyle;
  index: number;
  selectedIcon: any;
}

const Icon: FC<IconProps> = ({ value, index, selectedIcon }) => {
  const isHighlighted = (index: number) =>
    selectedIcon === index ? styles.highlighted : null;

  return (
    <div
      className={`
        ${styles.icon} 
        ${styles[`${value}`]}
        ${isHighlighted(index)}
      `}
    ></div>
  );
};

export default Icon;
