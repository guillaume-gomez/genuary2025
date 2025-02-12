import { useRef } from "react";
import { useHelper } from '@react-three/drei';
import { PointLightHelper, PointLight } from "three";
import { LENGTH } from "./const";


function Lights() {
  const ref1 = useRef<PointLight>(null)
  const ref2 = useRef<PointLight>(null)
  const ref3 = useRef<PointLight>(null)
  const ref4 = useRef<PointLight>(null)
  
  if(import.meta.env.MODE === "development") {
    if(ref1.current && ref2.current && ref3.current && ref4.current) {
      useHelper(ref1.current, PointLightHelper, 1)
      useHelper(ref2.current, PointLightHelper, 1)
      useHelper(ref3.current, PointLightHelper, 1)
      useHelper(ref4.current, PointLightHelper, 1)
    }
  }

  return (
    <>
    <pointLight ref={ref1} args={[`#FC4100`, 100, 0, 2]} position={[LENGTH - 1, LENGTH/2, 2]} />
    <pointLight ref={ref2} args={[`#F6EACB`, 100, 0, 2]} position={[0, LENGTH/2, 2]} />
    <pointLight ref={ref3} args={[`#F1D3CE`, 100, 0, 2]} position={[LENGTH/2, LENGTH-1, 2]} />
    <pointLight ref={ref4} args={[`#94FFD8`, 100, 0, 2]} position={[LENGTH/2, 0, 2]} />
    </>
  );
}

export default Lights;