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



        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;


            function polygon(x: number, y: number, radius: number, numberOfPoints: number, inGrid: boolean = true) {
              const hx = inGrid ?  x + y/2 : x;
              const hy = inGrid ? Math.sqrt(3)/2 * y : y;
              console.log(hx, " ", hy);
              p.beginShape();
              for(let a = p.TAU/12; a < p.TAU + p.TAU/12; a+=p.TAU/numberOfPoints){
                    const centerX = hx + radius * Math.cos(a);
                    const centerY = hy + radius * Math.sin(a);
                    p.vertex(centerX, centerY);
                }
              p.endShape(p.CLOSE);
            }

            function drawHexagon(x: number, y: number, radius: number, inGrid: boolean = false) {
                polygon(x, y, radius, HEXAGON_SIDE, inGrid );
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

            function makeSpiral(centerX, centerY, size, count){
              let x = 0;
              let y = 0;

              const s = size/1.75;

              p.push()
              p.translate(centerX, centerY)
              drawHexagon(centerX, centerY, s/1.75)
              for(let n = 0; n<count; n++ ) {
                for(let i=0; i<n; i++){x++;drawHexagon(x*s,y*s,s/1.75)}  // move right
                for(let i=0; i<n-1; i++){y++;drawHexagon(x*s,y*s,s/1.75)} // move down right. Note N-1
/*                for(let i=0; i<n; i++){x--;y++;drawHexagon(x*s,y*s,s/1.75)} // move down left
                for(let i=0; i<n; i++){x--;drawHexagon(x*s,y*s,s/1.75)} // move left
                for(let i=0; i<n; i++){y--;drawHexagon(x*s,y*s,s/1.75)} // move up left
                for(let i=0; i<n; i++){x++;y--;drawHexagon(x*s,y*s,s/1.75)} // move up right
*/              }
              p.pop()
            }

            p.setup = () => {
//                const width = document.body.offsetWidth - 15;
  //              const height = document.body.offsetHeight - 15;
                p.createCanvas(800, 800).parent(renderRef.current);
            }

            p.draw = () => {
                p.frameRate(30);
                p.angleMode(p.DEGREES);

                p.background(255,0,255);
                p.stroke(255, 204, 0);
                p.fill(255,255,12);
                p.strokeWeight(4);
                //drawHexagon(p.width/2,p.height/2,75);
                //makeGrid(200,200, 200,200);
                makeSpiral(400,400, 40, 10);
                  p.noLoop();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
