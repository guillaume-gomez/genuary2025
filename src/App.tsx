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

function App() {
  const [selectedScene, setSelectedScene] = useState<number>(0);
  return (
    <div className="flex flex-col gap-2 bg-neutral-900">
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
    <EighteenthProject />
    </div>
  )
}

export default App
