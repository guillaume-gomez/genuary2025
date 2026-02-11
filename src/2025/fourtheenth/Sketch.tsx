import { useEffect, useRef } from 'react';
import p5 from "p5";

import { cubeRing, hexToPixel } from "./Hexagon";
import { createHueShiftPalette } from "../fifteenth/colors-generation.ts";


interface HexagonP5 {
  hexagons: Array<[number, number]>,
  color: string;
}

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    function randomColor(baseColor: [number, number, number], numberOfColor: number = 10) {
    const [l, c, h] = baseColor;
    const hslColors = createHueShiftPalette(
      {
        base: {
          l,
          c,
          h,
        },
        minLightness: 10,
        maxLightness: 90,
        hueStep: 12,
        numberOfColor,
      }
    );
    return hslColors;
  }

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        /*function polygon(centerX: number, centerY: number, radius: number, rotation: number, numberOfPoints: number) {
          p.push();
          p.translate(centerX, centerY);
          p.beginShape();
          p.rotate(rotation);
          for(let a = 0; a < p.TAU; a+=p.TAU/numberOfPoints){
                const x = 0 + radius * Math.cos(a); // center + radius * Math.cos(a). translation already move to center
                const y = 0 + radius * Math.sin(a);
                p.vertex(x, y);
            }
          p.endShape(p.CLOSE);
          p.pop();
        }*/   

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            let hexagonsByDepth: HexagonP5[] = [];
            const size = 10;


            function drawExtremum(y: number, height: number) {
              const offset = 5;
              p.fill("white");
              p.rect(0, y , p.width, height);

              p.push();
              p.strokeWeight(4);
              for(let x = 0; x < p.width + offset; x+=offset) {
                p.line(x, y, p.random(x-2,x+2), y+ height);
              }
              p.pop();
            }

            function drawHexagon(centerX : number, centerY: number, radius: number)
            {
              p.beginShape()
              for(let a = 0; a < p.TAU; a+=p.TAU/6) {
                p.vertex(centerX + radius * Math.cos(a), centerY + radius * Math.sin(a));
              }
              p.endShape(p.CLOSE);

              /*p.push();
              p.fill(250,0,20);
              p.strokeWeight(1);
              const height = radius * Math.sqrt(3)/2;
              p.circle(centerX, centerY, height/2);
              p.pop();*/
            }

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(500, 800).parent(renderRef.current);
              const depth = 28;
              const colors = randomColor([
                p.random(0, 100),
                p.random(0, 100),
                p.random(0, 100)
              ],
              depth)

              for(let index=0; index < depth; index++) {
                const hexagons = cubeRing({x: 0, y: 0, z: 0}, index+1);
                const hexagonsPositions : Array<[number, number]> = hexagons.map(hex => hexToPixel(hex, size));
                hexagonsByDepth.push(
                {
                  hexagons: hexagonsPositions,
                  color: colors[index]
                });
              }  
            }

            p.draw = () => {
                p.frameRate(30);
                p.background(40,40,40);
                const centerX = p.width/2;
                const centerY = p.height/2;
                
                p.strokeWeight(2);
                p.push()
                p.translate(centerX, centerY)
                p.fill("black");
                drawHexagon(0, 0, size);
                hexagonsByDepth.forEach(({hexagons, color}) => {
                  console.log(hexagons)
                  p.push()
                  // if loop p.rotate((index+1) * p.sin(s) * p.PI/12 * 0.5);
                  //if noLoop p.rotate(p.PI/12);
                  p.rotate(p.PI/12);
                  p.fill(color);
                  hexagons.forEach(([x, y] : [number, number]) => {
                    drawHexagon(x, y, size /* (s % 10)*/ );
                  });
                  p.pop();
                });
                p.pop();
                drawExtremum(0, 40);
                drawExtremum(p.height - 40, 40);
                
                p.noLoop();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
