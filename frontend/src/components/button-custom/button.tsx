import React, {FC} from 'react';
import "./button-custom.module.scss";

interface ButtonCustomProps {
  label: string;
  onClick: () => void;
  style?: "./button-custom.module.scss";
}

const ButtonCustom: FC<ButtonCustomProps> = ({ label, onClick, style }) => {
  return (
    <button className="button-custom" onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default ButtonCustom;