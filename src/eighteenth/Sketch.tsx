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
            const r = 4;
            const frequency = 2 * p.TWO_PI;

            function isCollide(xCenterShape: number, yCenterShape: number, yCenterWave: number) {
                const radius = diameterCircle/2;
                const extremumLeftX = (xCenterShape -  radius);
                const extremumRightX = xCenterShape + radius;

                const xToFrequencyLeft = p.map(extremumLeftX, 0, p.width, 0, frequency);
                const yLeft = p.map(p.sin(xToFrequencyLeft), -1, 1, -50, 50);

                const xToFrequencyRight = p.map(extremumRightX, 0, p.width, 0, frequency);
                const yRight = p.map(p.sin(xToFrequencyRight), -1, 1, -50, 50);

                p.fill("purple");
                p.circle(extremumLeftX, yLeft, 20);
                p.fill("blue");
                p.circle(extremumLeftX, depth + yLeft, 20);
                p.fill("orange");
                p.circle(extremumRightX, yRight, 20);
                p.fill("green");
                p.circle(extremumRightX, depth + yRight, 20);
                p.fill("white");
                p.circle(xCenterShape, yCenterShape, 20);

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

              //
              const numberOfDivisionCurves = p.floor(p.width / (r * 2));
              for (let x = 0; x < numberOfDivisionCurves + 1; x++) {
                angles[x] = p.map(x, 0, numberOfDivisionCurves, 0, frequency);
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

                p.background(30);
                shapes.forEach(({x, y, color}) => {
                    renderShape(x, y, color, Math.PI);
                });

                let indexAngle = 50;
                const x = p.map(indexAngle, 0, angles.length, 0, p.width)
                const y = p.map(p.sin(angles[indexAngle]), -1, 1, -50, 50);

               // console.log(x, y);


                
                
               /* p.translate(0,p.height/6);
                wave(speed, depth);

                p.translate(0,p.height/6);
                wave(speed, depth);

                p.translate(0,p.height/6);
                wave(speed, depth);*/

                //p.push();
                p.translate(0,p.height/6);
                isCollide(x, y+depth/2, 0);
                wave(speed, depth);
                //p.pop();

                //p.drawingContext.filter = "blur(2px)";


            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
