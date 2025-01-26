import React, { useEffect, useRef } from 'react';
import p5 from "p5";
import { lineCircle } from "./collision";


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
            const colors = [
                "#f4a0b6",
                "#c60b27",
                "#0baee8",
                "#04aa34",
                "#ebcf06",
                "#f0a500",
                "#e23721",
                "#0069b3"
            ];
            let angles = []; 
            let shapes = [];
            const depth = 150;
            const perimeterCircle = 350;
            const diameterCircle = perimeterCircle/p.PI;

            function isCollide(xCenterShape: number, yCenterShape: number, yCenterWave, index: number) {
                const radius = diameterCircle/2;
                const extremumLeftX = (xCenterShape -  radius);
                const extremumRightX = xCenterShape + radius;

                const xBefore = p.map(extremumLeftX, 0, 125, 0, 2 * p.TWO_PI);
                const yLeft = p.map(p.sin(angles[index-10]), -1, 1, -50, 50);
                const yLeft2 = p.map(p.sin(xBefore), -1, 1, -50, 50);
                const yRight = p.map(p.sin(angles[index+10]), -1, 1, -50, 50);
                const yyyy = p.map(p.sin(angles[index+10]), -1, 1, -50, 50);
                console.log(yLeft,"or ", yLeft2);
                //console.log(yRight,"or ", yRight2);
                
                p.fill("purple");
                p.circle(extremumLeftX, yLeft, 20);
                p.circle(extremumLeftX, yLeft + depth, 20);
                p.fill("red");
                p.circle(extremumRightX, yRight, 20);
                p.circle(extremumRightX, yRight + depth, 20);
                p.fill("white");
                p.circle(xCenterShape, yCenterShape + depth/2, 20);

            }


            function renderShape(xCenter: number, yCenter: number, color: number) {
                const radius = diameterCircle / 2 - 10;
                const rotate = Math.PI/2;

                p.push();

                p.fill(color);       
                p.translate(xCenter,yCenter);
                p.rotate(rotate);
                p.strokeWeight(4);
                p.circle(0,0, diameterCircle);
                p.strokeWeight(6);
                p.line(-radius, 0, radius, 0);

                p.pop();
            }

            function fromPositionToIndex(x: number) : number {
                p.width = 
                125
            }

            function wave(speed: number, depth: number) {
                p.strokeWeight(4);
                p.fill(255,0,0, 75);
                p.beginShape();
                for (let i = 0; i < angles.length; i++) {
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50);
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  const noise = 0;// p.map(p.noise(Math.random()), 0,1, -10, 10)
                  p.vertex(x,y + noise);
                  angles[i] += speed;
                }
                for (let i = angles.length; i >= 0; i--) {
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50);
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  const noise = p.map(p.noise(Math.random()), 0,1, -10, 10)
                  p.vertex(x,y + depth + noise);
                }
                p.endShape();

                for (let i = 0; i < angles.length; i++) {
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50); 
                  p.circle(x, y + depth/2, 10);
                  p.fill("white");
                  p.line(x,y, x, y + depth/2);
                  p.line(x,y + depth/2, x, y + depth);
                }
            }

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 1000).parent(renderRef.current);
              p.background(30);

              const r = 4
              let total = p.floor(p.width / (r * 2));
              for (let i = 0; i < total + 1; i++) {
                angles[i] = p.map(i, 0, total, 0, 2 * p.TWO_PI);
              }


              const iteration = 8;
              const widthIteration = p.width/iteration;
              const heightIteration = p.height/iteration;
              for(let x=0; x < iteration; x++) {
                const color = colors[ Math.floor(Math.random() * colors.length) ];
                for(let y=0; y < iteration; y++) {
                    shapes.push({
                        x: (x * widthIteration) + widthIteration/2 ,
                        y: (y * heightIteration) + heightIteration/2,
                        color
                    });
                }
              }
            }

            p.draw = () => {
                p.frameRate(30);
                let s = p.millis() / 1000;
                let duration = s * 2.0;

                const speed = 0;//0.05;

                const depth = 150;
                p.background(30);
                shapes.forEach(({x, y, color}) => {
                    renderShape(x, y, color, Math.PI);
                });

                
               /* p.translate(0,p.height/6);
                wave(speed, depth);

                p.translate(0,p.height/6);
                wave(speed, depth);

                p.translate(0,p.height/6);
                wave(speed, depth);*/

                //p.push();
                p.translate(0,p.height/6);
                wave(speed, depth);
                //p.pop();
                const index = 50;

                const x = p.map(index, 0, angles.length, 0, p.width);
                const y = p.map(p.sin(angles[index]), -1, 1, -50, 50);
                const yMinus = p.map(p.sin(angles[index+10]), -1, 1, -50, 50);
                const yMax = p.map(p.sin(angles[index-10]), -1, 1, -50, 50);
                isCollide(x, y, 0, index);






                //p.drawingContext.filter = "blur(2px)";


            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
