import { useRef } from "react";
import { LENGTH } from "./const";


function Lights() {
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  /*useHelper(ref1, PointLightHelper, 1)
  useHelper(ref2, PointLightHelper, 1)
  useHelper(ref3, PointLightHelper, 1)
  useHelper(ref4, PointLightHelper, 1)*/

  return (
    <>
    <pointLight ref={ref1} args={[`red`, 100, 0, 2]} position={[LENGTH - 1, LENGTH/2, LENGTH/2]} />
    <pointLight ref={ref2} args={[`red`, 100, 0, 2]} position={[0, LENGTH/2, LENGTH/2]} />
    <pointLight ref={ref3} args={[`purple`, 100, 0, 2]} position={[LENGTH/2, LENGTH-1, LENGTH/2]} />
    <pointLight ref={ref4} args={[`brown`, 100, 0, 2]} position={[LENGTH/2, 0, LENGTH/2]} />
    </>
  );
}

export default Lights;