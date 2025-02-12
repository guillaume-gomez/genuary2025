import { useState } from "react";
import FirstProject from "./first/App";
import ThirdProject from "./third/App";
import FourthProject from "./fourth/App";
import FifthProject from "./fifth/App";
import SixthProject from "./sixth/App";
import NinthProject from "./ninth/App";
import TenthProject from "./tenth/App";
import ThirteenthProject from "./thirteenth/App";
import FourteenthProject from "./fourtheenth/App";
import FiftheenthProject from "./fifteenth/App";
import SeventeenthProject from "./seventeenth/App";
import EighteenthProject from "./eighteenth/App";
import NineteenthProject from "./nineteenth/App";
import TwentiethProject from "./twentieth/App";

const options = [
  {name: "first", value: 1},
  {name: "third", value: 3},
  {name: "fourth", value: 4},
  {name: "fifth", value: 5},
  {name: "sixth", value: 6},
  {name: "ninth", value: 9},
  {name: "tenth", value: 10},
  {name: "thirteenth", value: 13},
  {name: "fourtheenth", value: 14},
  {name: "fifteenth", value: 15},
  {name: "seventeenth", value: 17},
  {name: "eighteenth", value: 18},
  {name: "nineteenth", value: 19},
  {name: "twentieth", value: 20},
]

function App() {
  const [selectedScene, setSelectedScene] = useState<number>(20);

  return (
    <div className="flex flex-col gap-2 bg-neutral-900">
      <select
        value={selectedScene}
        onChange={(event) => setSelectedScene(parseInt(event.target.value))}
      >
        {options.map(({name, value}) => {
          return <option key={value} value={value}> {name}</option>
        })}
      </select>
      <div className="w-full h-screen">
        { selectedScene === 1 && <FirstProject /> }
        { selectedScene === 3 && <ThirdProject /> }
        { selectedScene === 4 && <FourthProject /> }
        { selectedScene === 5 && <FifthProject /> }
        { selectedScene === 6 && <SixthProject /> }
        { selectedScene === 9 && <NinthProject /> }
        { selectedScene === 10 && <TenthProject /> }
        { selectedScene === 13 && <ThirteenthProject /> }
        { selectedScene === 14 && <FourteenthProject /> }
        { selectedScene === 15 && <FiftheenthProject /> }
        { selectedScene === 17 && <SeventeenthProject /> }
        { selectedScene === 18 && <EighteenthProject /> }
        { selectedScene === 19 && <NineteenthProject /> }
        { selectedScene === 20 && <TwentiethProject /> }
      </div>
    </div>
  )
}

export default App
