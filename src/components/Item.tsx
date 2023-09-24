import React from "react";

export default function Item({
  title,
  iconX,
  iconO,
  indexCol,
  indexRow,
  disabled,
  onClick,
}: {
  title: number;
  indexCol: number;
  iconX:string;
  iconO:string;
  indexRow: number;
  disabled: boolean;
  onClick: (indexRow: number, indexCol: number) => void;
}) {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={() => {
          onClick(indexRow, indexCol);
        }}
        className={`w-full h-full hover:bg-slate-200 text-6xl ${
          title === 0 ? "text-transparent" : ""
        }`}
      >
        {title === 1 ? <span className={`font-icons animate__animated animate__rubberBand pulses ${iconO}`}></span> : title === 2 ? <span className={`font-icons ${iconX}`}></span> : `.`}
      </button>
    </div>
  );
}
