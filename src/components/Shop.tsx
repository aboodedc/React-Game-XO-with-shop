import React, { useState } from "react";
import CardShop from "./cardShop";

export default function Shop({ icons,NamePlayer1,NamePlayer2,selectShop }: { icons: string[],NamePlayer1:string,NamePlayer2:string,selectShop:(indexCard,playerSelect)=>void }) {
  const [Open, setOpen] = useState(false);
  const [Player, setPlayer] = useState(false)

  const handleCard = (indexCard,playerSelect)=>{
    selectShop(indexCard,playerSelect)
  }

  return (
    <div className="fixed h-full top-0 flex w-3/12 items-center left-0">
      <div
        className={`bg-white h-full flex-grow overflow-clip transform duration-300 ${
          Open ? "" : "max-w-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-y-4">
          <h2 className=" text-2xl mt-2 col-span-2">Shop</h2>
          <button onClick={()=>setPlayer(true)} className={`text-xl border border-black rounded-l-lg py-4 hover:bg-gray-300 ml-2 ${Player?"bg-gray-300":""}`}>
          <span className={`font-icons ${NamePlayer1}`}></span>
          </button>
          <button onClick={()=>setPlayer(false)} className={`text-xl border border-black rounded-r-lg py-4 hover:bg-gray-300 mr-2 ${!Player?"bg-gray-300":""}`}>
            <span className={`font-icons ${NamePlayer2}`}></span>
          </button>
          <div className="col-span-2 grid grid-cols-3 gap-2 mx-2">
            {icons.map((val,index) => (
              <CardShop key={index} char={val} onClick={()=>handleCard(index,Player)} select={val===NamePlayer1 || val === NamePlayer2} />
            ))}
          </div>
        </div>
      </div>
      <div className=" bg-white border rounded-r-lg w-max p-2 text-2xl h-1/5 text-center flex justify-center">
        <button className=" h-full w-full" onClick={() => setOpen(!Open)}>
          <span
            className={`font-icons arrow block my-auto ${
              Open ? " rotate-180" : ""
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
