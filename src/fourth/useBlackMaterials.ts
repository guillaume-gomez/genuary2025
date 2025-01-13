import { useEffect, useState } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial } from "three"

function useBlackMaterials() {
    const [materials, setMaterials] = useState<MeshStandardMaterial[]>([]);
    const [heightMapLeather, normalMapLeather, roughnessMapLeather, aoMapLeather, mapLeather] = useLoader(TextureLoader, [
      '/black-leather-bl/black-leather_height.png',
      '/black-leather-bl/black-leather_normal-ogl.png',
      '/black-leather-bl/black-leather_roughness.png',
      '/black-leather-bl/black-leather_ao.png',
      '/black-leather-bl/black-leather_albedo.png'
    ]);

    const [heightMapBlanket, normalMapBlanket, aoMapBlanket, mapBlanket] = useLoader(TextureLoader, [
      '/soft-blanket-unity/soft-blanket_height.png',
      '/soft-blanket-unity/soft-blanket_normal-ogl.png',
      '/soft-blanket-unity/soft-blanket_ao.png',
      '/soft-blanket-unity/soft-blanket_albedo.png',
    ]);

    const [heightMapMetal, normalMapMetal, aoMapMetal, mapMetal] = useLoader(TextureLoader, [
      '/warped-sheet-metal-unity/warped-sheet-metal_height.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_normal-ogl.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_ao.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_albedo.png'
    ]);

    useEffect(() => {
      const leather = new MeshStandardMaterial({
        color:"#222",
        normalMap:normalMapLeather,
        heightMap:heightMapLeather,
        roughnessMap:roughnessMapLeather,
        aoMap:aoMapLeather,
        map: mapLeather
      });

      const blanket = new MeshStandardMaterial({
        color:"#111",
        normalMap:normalMapBlanket,
        heightMap:heightMapBlanket,
        aoMap:aoMapBlanket,
        map: mapBlanket
      });

      const metal = new MeshStandardMaterial({
        color:"#333",
        normalMap:normalMapMetal,
        heightMap:heightMapMetal,
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
      heightMapLeather, normalMapLeather, roughnessMapLeather, aoMapLeather,
      heightMapBlanket, normalMapBlanket, aoMapBlanket,
      heightMapMetal, normalMapMetal, aoMapMetal
    ]);

    return materials;
}

export default useBlackMaterials;