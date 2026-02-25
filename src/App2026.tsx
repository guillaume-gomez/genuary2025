import LayoutContainer from "./LayoutContainer";

//import Sketch from "./2026/one/Sketch";
//import Sketch from "./2026/three/Sketch";
//import Sketch from "./2026/five/Sketch";
//import Sketch from "./2026/eight/ThreeJsRenderer";
import Sketch from "./2026/seven/Sketch";


function App2026() {
  return (
    <div className="flex flex-col h-full gap-2 bg-neutral-900 text-white p-4">
      <LayoutContainer>
        <Sketch/>
      </LayoutContainer>
    </div>
  )
}

export default App2026;
