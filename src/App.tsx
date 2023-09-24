import { useState, useEffect, useRef, ButtonHTMLAttributes } from "react";
import "./App.css";
import "animate.css";
import Item from "./components/item";
import Shop from "./components/shop";

const icons: string[] = [
  "star",
  "coffee",
  "notion",
  "printer",
  "reddit",
  "X",
  "circl",
];

function checkXOLine(array: number[][]) {
  let isWin = 0;
  let line = 0;

  for (let index = 0; index < array.length; index++) {
    if (
      array[index][0] === 1 &&
      array[index][1] === 1 &&
      array[index][2] === 1
    ) {
      isWin = 1;
      line = index;
      console.log("X is Win");
      break;
    } else if (
      array[index][0] === 2 &&
      array[index][1] === 2 &&
      array[index][2] === 2
    ) {
      isWin = 2;
      line = index;
      console.log("O is Win");
      break;
    }
  }
  return { isWin, line };
}

function App() {
  const [GameTemplate, setGameTemplate] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [Role, setRole] = useState(true);
  const [Win, setWin] = useState(0);
  const [Line, setLine] = useState(0);

  const [NamePlayer1, setNamePlayer1] = useState("Player 1");
  const [NamePlayer2, setNamePlayer2] = useState("Player 2");
  const [IconPlayer1, setIconPlayer1] = useState("X");
  const [IconPlayer2, setIconPlayer2] = useState("circl");
  const [EditName, setEditName] = useState(false);

  const refReset = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(IconPlayer1, IconPlayer2);
  }, [IconPlayer1, IconPlayer2]);

  // Player 1 = true, player 2 = false, in X
  const [RolePlayers, setRolePlayers] = useState(true);
  const [PointPlayer1, setPointPlayer1] = useState(0);
  const [PointPlayer2, setPointPlayer2] = useState(0);

  const restGame = () => {
    if (Win !== 0 || confirm("Are you Sure Restart the Game?"))
      setGameTemplate([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    setRole(true);
    setWin(0);
    setLine(0);
  };

  const restPointsPlayers = () => {
    if (confirm("Are you sure Restart all Points Players?")) {
      setPointPlayer2(0);
      setPointPlayer1(0);
    }
  };

  // Click Button Game
  const handlClick = (indexRow: number, indexCol: number) => {
    const arr: number[][] = GameTemplate;
    arr[indexRow][indexCol] = Role ? 1 : 2;
    setGameTemplate([...arr]);
    setRole(!Role);
  };

  // Cheak
  useEffect(() => {
    // Check is Horizontal
    const checkHorArr: { isWin: number; line: number } =
      checkXOLine(GameTemplate);
    if (checkHorArr.isWin === 1 || checkHorArr.isWin === 2) {
      setWin(checkHorArr.isWin);
      setLine(checkHorArr.line);
      return;
    }

    // Convert from array Horizontal to Verticol
    const verArr: number[][] = [[], [], []];

    GameTemplate.forEach((val, indexRow) => {
      val.forEach((val, indexCol) => {
        verArr[indexCol][indexRow] = val;
      });
    });

    // Check is Horizontal
    const checkVerArr: { isWin: number; line: number } = checkXOLine(verArr);
    if (checkVerArr.isWin === 1 || checkVerArr.isWin === 2) {
      setWin(checkVerArr.isWin);
      setLine(checkVerArr.line + 3);
      return;
    }

    // from top left to bottom right
    if (
      GameTemplate[0][0] === 1 &&
      GameTemplate[1][1] === 1 &&
      GameTemplate[2][2] === 1
    ) {
      setWin(1);
      setLine(6);
      return;
    }
    if (
      GameTemplate[0][0] === 2 &&
      GameTemplate[1][1] === 2 &&
      GameTemplate[2][2] === 2
    ) {
      setWin(2);
      setLine(6);
      return;
    }

    // from top right to bottom left
    if (
      GameTemplate[0][2] === 1 &&
      GameTemplate[1][1] === 1 &&
      GameTemplate[2][0] === 1
    ) {
      setWin(1);
      setLine(7);
      return;
    }
    if (
      GameTemplate[0][2] === 2 &&
      GameTemplate[1][1] === 2 &&
      GameTemplate[2][0] === 2
    ) {
      setWin(2);
      setLine(7);
      return;
    }

    // Check is Draw or not
    if (
      !GameTemplate[0].includes(0) &&
      !GameTemplate[1].includes(0) &&
      !GameTemplate[2].includes(0)
    ) {
      setWin(3);
    }
  }, [GameTemplate]);

  // Win Game
  useEffect(() => {
    if (Win > 0) {
      console.log(Win === 1 ? "x is Win" : "O is Win");
      console.log(
        `Line is: ${Line}, Role is:${Role}, Win is:${Win}, Game is: ${GameTemplate}`
      );

      if (RolePlayers) {
        if (Win === 1) {
          setPointPlayer1((prev) => prev + 1);
        } else if (Win === 2) {
          setPointPlayer2((prev) => prev + 1);
        }
      } else {
        if (Win === 2) {
          setPointPlayer1((prev) => prev + 1);
        } else if (Win === 1) {
          setPointPlayer2((prev) => prev + 1);
        }
      }
      setRolePlayers(!RolePlayers);
    }
  }, [Win]);

  return (
    <div className="flex flex-col">
      <div className="fixed top-2 right-1 flex flex-col justify-center scale-75 xl:scale-100 xl:top-10 xl:right-10">
        <button
          className={`p-2 border border-solid block w-max bg-white hover:bg-slate-200 self-end`}
          onClick={() => setEditName(!EditName)}
        >
          {!EditName ? "Open Edit Name" : "Close Edit Name"}
        </button>
        <pre className="bg-white rounded-full rounded-tr-none text-3xl p-3">
          {EditName ? (
            <>
              <input
                value={NamePlayer1}
                onChange={(event) => setNamePlayer1(event.target.value)}
                className="w-min min-w-[20px] border"
                size={10}
                type="text"
              />{" "}
              : {PointPlayer1} |
              <input
                value={NamePlayer2}
                onChange={(event) => setNamePlayer2(event.target.value)}
                className="w-min min-w-[20px] border"
                size={10}
                type="text"
              />{" "}
              : {PointPlayer2}
            </>
          ) : (
            `${NamePlayer1}: ${PointPlayer1} | ${NamePlayer2}: ${PointPlayer2}`
          )}
        </pre>
        <button
          onClick={restPointsPlayers}
          className={`p-2 border border-solid block w-max bg-white hover:bg-red-200 mx-auto`}
        >
          Reset points Players
        </button>
      </div>
      <h1 className=" text-3xl">
        {Win === 0 ? (
          "Hello in my Game"
        ) : Win === 1 ? (
          <span className={`font-icons ${IconPlayer1}`} />
        ) : Win === 2 ? (
          <span className={`font-icons ${IconPlayer2}`} />
        ) : (
          "Draw *_*"
        )}
        {Win === 1 || Win === 2 ? " is Win @_@" : ""}
      </h1>
      <h2 className=" text-3xl mt-10 mb-5">
        <span className={`px-2 p-1 ${Role ? "bg-green-500" : ""}`}>
          {RolePlayers ? NamePlayer1 : NamePlayer2} /{" "}
          <span className={`font-icons ${IconPlayer1}`}></span>
        </span>{" "}
        |{" "}
        <span className={`px-2 p-1 ${!Role ? "bg-green-500" : ""}`}>
          {!RolePlayers ? NamePlayer1 : NamePlayer2} /{" "}
          <span className={`font-icons ${IconPlayer2}`}></span>
        </span>
      </h2>
      <div className=" w-1/4 aspect-square text-3xl self-center grid grid-cols-3 xo relative">
        {/* X = 1 | true, O = 2 | false*/}
        {GameTemplate.map((items, indexRow) => {
          return (
            <>
              {items.map((item, indexCol) => {
                return (
                  <Item
                    title={item}
                    key={indexCol}
                    indexRow={indexRow}
                    indexCol={indexCol}
                    iconO={IconPlayer1}
                    iconX={IconPlayer2}
                    onClick={handlClick}
                    disabled={
                      GameTemplate[indexRow][indexCol] !== 0 || Win !== 0
                    }
                  />
                );
              })}
            </>
          );
        })}
        {/* Line */}
        <div
          className={`absolute bg-red-700 w-1/2 h-2 rounded-full pointer-events-none ${
            Win < 1 || Win > 2 ? "hidden" : ""
          } ${Line >= 3 && Line <= 5 ? "rotate-90" : ""} ${
            Line === 6 ? " rotate-45" : Line === 7 ? "-rotate-45" : ""
          }`}
          style={{
            // for Line in Horizontal
            top:
              Line === 0
                ? "16%"
                : Line === 1
                ? "50%"
                : Line === 2
                ? "82.5%"
                : "50%",
            left:
              Line === 3
                ? "-33.33333%"
                : Line === 4
                ? "0%"
                : Line === 5
                ? "33.33333%"
                : "0%",
          }}
        />
        {/* Resteart Game After End Game */}
        <button
          className={`absolute w-full h-full ${
            Win === 0 ? " pointer-events-none" : ""
          }`}
          onClick={restGame}
        />
      </div>
      <div className="self-center mt-5 flex justify-between gap-5">
        <button
          onClick={restGame}
          className={`p-5 border border-solid block w-max hover:bg-slate-200`}
          ref={refReset}
        >
          Reset Game
        </button>
      </div>
      {/* Meme */}
      {Win !== 0 && Win !== 3 ? (
        <iframe
          src="https://giphy.com/embed/3oz9ZE2Oo9zRC"
          width="480"
          height="216"
          className="pointer-events-none self-center"
          allowFullScreen
        ></iframe>
      ) : (
        ""
      )}
      <Shop
        icons={icons}
        NamePlayer1={IconPlayer1}
        NamePlayer2={IconPlayer2}
        selectShop={(indexCard, playerSelect) => {
          console.log(indexCard, playerSelect);
          if (playerSelect) {
            if (icons[indexCard] !== IconPlayer2) {
              setIconPlayer1(icons[indexCard]);
            }
            return;
          }
          if (icons[indexCard] !== IconPlayer1) {
            setIconPlayer2(icons[indexCard]);
          }
        }}
      />
    </div>
  );
}

export default App;
