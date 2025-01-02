import { BackSide, DoubleSide } from "three";
import { GradientTexture } from '@react-three/drei';

interface SkyBoxProps {
  size: number;
}

function SkyBox({size}: SkyBoxProps) {
    return(
    <mesh position={[0,0,0]}>
      <sphereGeometry args={[size, 128,32]} />
      <meshBasicMaterial side={BackSide}>
        <GradientTexture
          stops={[1.0, 0.6, 0.4, 0.2, 0.1, 0]} // As many stops as you want
          colors={['#2D1D7A', '#573170', '#804565', '#AA585B', '#D36C50', '#FD8046']} // Colors need to match the number of stops
          size={1024} // Size is optional, default = 1024
        />
      </meshBasicMaterial>
    </mesh>);
}
export default SkyBox;