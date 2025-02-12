import { useEffect, useState } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial } from "three"

function useBlackMaterials() {
    const [materials, setMaterials] = useState<MeshStandardMaterial[]>([]);
    const [normalMapLeather, roughnessMapLeather, aoMapLeather, mapLeather] = useLoader(TextureLoader, [
      '/black-leather-bl/black-leather_normal-ogl.png',
      '/black-leather-bl/black-leather_roughness.png',
      '/black-leather-bl/black-leather_ao.png',
      '/black-leather-bl/black-leather_albedo.png'
    ]);

    const [normalMapBlanket, aoMapBlanket, mapBlanket] = useLoader(TextureLoader, [
      '/soft-blanket-unity/soft-blanket_normal-ogl.png',
      '/soft-blanket-unity/soft-blanket_ao.png',
      '/soft-blanket-unity/soft-blanket_albedo.png',
    ]);

    const [normalMapMetal, aoMapMetal, mapMetal] = useLoader(TextureLoader, [
      '/warped-sheet-metal-unity/warped-sheet-metal_normal-ogl.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_ao.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_albedo.png'
    ]);

    useEffect(() => {
      const leather = new MeshStandardMaterial({
        color:"#222",
        normalMap:normalMapLeather,
        roughnessMap:roughnessMapLeather,
        aoMap:aoMapLeather,
        map: mapLeather
      });

      const blanket = new MeshStandardMaterial({
        color:"#111",
        normalMap:normalMapBlanket,
        aoMap:aoMapBlanket,
        map: mapBlanket
      });

      const metal = new MeshStandardMaterial({
        color:"#333",
        normalMap:normalMapMetal,
        aoMap:aoMapMetal,
        map: mapMetal
      });

      const other = new MeshStandardMaterial({
        color: "#111",
        roughness: Math.random(),
        metalness: Math.random()
      });

      setMaterials([leather, blanket, metal, other]);
    }, [
      normalMapLeather, roughnessMapLeather, aoMapLeather,
      normalMapBlanket, aoMapBlanket,
      normalMapMetal, aoMapMetal
    ]);

    return materials;
}

export default useBlackMaterials;