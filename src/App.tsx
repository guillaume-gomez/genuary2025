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

const options = [
  {name: "first", value: 1},
  {name: "second", value: 2},
  {name: "third", value: 3},
]

function App() {
  const [selectedScene, setSelectedScene] = useState<number>(0);
  return (
    <div className="flex flex-col gap-2 bg-neutral-900">
      <select
        value={selectedScene}
        onSelect={(event) => setSelectedScene(parseInt(event.target.value))}
      >
        {options.map(({name, value}) => {
          return <option key={value} value={value}> {name}</option>
        })}
      </select>
      <div className="w-full h-screen">

  {/*      <FirstProject />
        <ThirdProject />
        <FourthProject />
        <FifthProject />
        <SixthProject />
        <NinthProject />*/}
        {/*<TenthProject />*/}
        {/*<ThirteenthProject />*/}
       {/*<FourteenthProject />*/}
      {/*<FiftheenthProject />*/}
      {/*<SeventeenthProject />*/}
{/*      <EighteenthProject />*/}
      <NineteenthProject />
      </div>
    </div>
  )
}

export default App
