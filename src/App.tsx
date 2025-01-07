import FirstProject from "./first/App";
import ThirdProject from "./third/App";
import FourthProject from "./fourth/App";
import FifthProject from "./fifth/App";

function App() {
  return (
    <div className="flex flex-col gap-2 bg-neutral-900">
      {/*<FirstProject />
      <ThirdProject />*/}
      <FourthProject />
      {/*<FifthProject />*/}
    </div>
  )
}

export default App
