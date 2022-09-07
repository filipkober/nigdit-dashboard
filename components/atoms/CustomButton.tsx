import { useState } from "react";

interface CustomButtonProps{
    liczbaKlikniec: number,
    setLiczbaKlikniec: (arg0: number) => void
}

const CustomButton = ({liczbaKlikniec, setLiczbaKlikniec}: CustomButtonProps) => {

  return (
    <>
      <label className="text-red-600 border-dashed border-2">Numer kliknięć: {liczbaKlikniec}</label>
      <button onClick={() => {setLiczbaKlikniec(liczbaKlikniec + 1)}}>
          Kliknij mnie
      </button>
    </>
  );
};
export default CustomButton;
