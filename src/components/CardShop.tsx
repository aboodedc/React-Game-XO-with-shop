import React from "react";

export default function CardShop({char,onClick,select}:{char:any,onClick:()=>void,select:any}) {
  return (
    <button disabled={select} className={`w-full aspect-square border-2 hover:bg-gray-300 border-black rounded-lg flex justify-center items-center relative ${select?"bg-gray-300":""}`} onClick={()=>onClick()}>
      <span className={` block font-icons ${char} text-6xl`}></span>
      {select?<div className=" absolute aspect-square h-max p-1 text-sm top-0 right-0 bg-white rounded-full border">✔</div>:""}
    </button>
  );
}

CardShop.defaultProps = {
select: false //Any Type
};