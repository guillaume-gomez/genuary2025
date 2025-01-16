import React, { useEffect, useRef } from 'react';
import p5 from "p5";

const HEXAGON_SIDE = 6;

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

            function drawHexagon(centerX, centerY, radius)
            {
              //const hx = centerX + centerY/2;
              //const hy = Math.sqrt(3)/2 * centerY;

              const hx = centerX;
              const hy = centerY;

              p.beginShape()
              for(let a = p.TAU/12; a < p.TAU + p.TAU/12; a+=p.TAU/6) {
                p.vertex(hx + radius * Math.cos(a), hy + radius * Math.sin(a));
              }
              p.endShape(p.CLOSE);

             /* p.push();
              p.noFill();
              p.stroke(160);
              p.circle(hx, hy, 2*radius);
              p.pop();*/
            }

            function makeSpiral(centerX, centerY, size, count){
              let x = 0;
              let y = 0;

              const s = size/1.75;

              p.push()
              p.translate(centerX, centerY);
              drawHexagon(centerX, centerY, s);
              for(let n = 0; n<count; n++ ) {
                for(let i=0; i<n; i++){
                  x++;
                  p.fill("orange");
                  drawHexagon(x*s,y*s,s/1.75);
                }  // move right
                
                for(let i=0; i<n-1; i++){
                  y++;
                  p.fill("brown");
                  drawHexagon(x*s,y*s,s/1.75);
                } // move down right. Note N-1
                
                for(let i=0; i<n; i++){
                  x--;
                  y++;
                  p.fill("red");
                  drawHexagon(x*s,y*s,s/1.75);
                } // move down left
                
                for(let i=0; i<n; i++){
                  x--;
                  p.fill("purple");
                  drawHexagon(x*s,y*s,s/1.75);
                } // move left
                
                for(let i=0; i<n; i++){
                  y--;
                  p.fill("blue");
                  drawHexagon(x*s,y*s,s/1.75);
                } // move up left
                
                for(let i=0; i<n; i++){
                  x++;
                  y--;
                  p.fill("white");
                  drawHexagon(x*s,y*s,s/1.75);
                  } // move up right
              }
              p.pop();
            }


            function makeGrid(centerX: number, centerY: number, gridWidth: number, gridHeight: number) {
              let count = 0;
              const hexagonSize = 30;
              for(let y = centerY; y < (gridHeight + centerY); y+=hexagonSize/2.3){
                for(let x = centerX; x < (gridWidth + centerX); x+=hexagonSize*1.5){
                  drawHexagon(x+hexagonSize*(count%2==0)*0.75, y, hexagonSize/2)
                }
                count++;
              }
            }

            p.setup = () => {
//                const width = document.body.offsetWidth - 15;
  //              const height = document.body.offsetHeight - 15;
                p.createCanvas(1000, 800).parent(renderRef.current);
            }

            p.draw = () => {
                p.frameRate(30);
                let s = p.millis() / 1000;

                p.background(255,0,255);

                p.fill("purple");

                p.stroke(0, 0, 0);
                //p.noStroke();

                const strokeWeight = 20;
                const size = 50
                const height = size * Math.sqrt(3)/2;
                const centerX = p.width/2;
                const centerY = p.height/2;
                p.strokeWeight(strokeWeight);
                p.fill(0,4,255);
                drawHexagon(centerX,centerY,size); // center
                p.fill(255,150,255);
                drawHexagon(centerX,centerY + 3*size,size); // down
                p.fill(0,255,255);
                drawHexagon(centerX,centerY - 3*size,size); // up
                p.fill(100,4,255);
                drawHexagon(centerX + height*2,centerY,size); // right
                p.fill(50,41,255);
                drawHexagon(centerX + height,centerY - 1.5*size,size); //up-right
                p.fill(50,41,12);
                drawHexagon(centerX - height,centerY - 1.5*size,size); //up-left
                p.fill(0,41,152);
                drawHexagon(centerX - height*2,centerY,size); //left
                p.fill(255,41,152);
                drawHexagon(centerX - height,centerY + 1.5*size,size); // down left
                p.fill(255,41,0);
                drawHexagon(centerX + height,centerY + 1.5*size,size); // down right
                //makeSpiral(400,400, 75, 2);
                p.noLoop();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
