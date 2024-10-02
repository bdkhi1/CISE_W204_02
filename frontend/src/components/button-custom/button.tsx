import React, {FC, Component} from 'react';
import styles from "./button-custom.module.scss";

interface ButtonCustomProps {
  label: string;
  onClick: () => void;
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, onClick}) => {
  return (
    <button className= {styles.buttoncustom} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonCustom;