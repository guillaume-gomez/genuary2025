import React, { useEffect, useRef } from 'react';
import p5 from "p5";

import { cubeRing, hexToPixel } from "./Hexagon";


export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);

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

        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            let hexagonsByDepth = [];
            const size = 20;

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

            function drawHexagon(centerX, centerY, radius)
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

              for(let depth=1; depth <= 14; depth++) {
                const hexagons = cubeRing({x: 0, y: 0, z: 0}, depth);
                const hexagonsPositions= hexagons.map(hex => hexToPixel(hex, size));
                hexagonsByDepth.push(
                {
                  hexagons: hexagonsPositions,
                  color: { r: p.random(0, 255), g: p.random(0, 255), b: p.random(0, 255) }
                });
              }  
            }

            p.draw = () => {
                p.frameRate(30);
                let s = p.millis() / 1000;

                p.background(255,0,255);
                const centerX = p.width/2;
                const centerY = p.height/2;
                
                p.strokeWeight(6);
                p.push()
                p.translate(centerX, centerY)
                drawHexagon(0, 0, size);
                hexagonsByDepth.forEach(({hexagons, color}, index) => {
                  p.push()
                  p.rotate(s * p.PI/12);
                  p.fill(color.r, color.g, color.b);
                  hexagons.forEach(([x, y]) => {
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
