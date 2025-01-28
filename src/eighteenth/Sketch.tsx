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
            let waves = [];
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

                const x1 = extremumLeftX;
                const x2 = extremumRightX;
                const y1 = yLeft + yCenterWave;
                const y2 = depth + yLeft + yCenterWave;
                const y1Prime = yRight + yCenterWave;
                const y2Prime = depth + yRight + yCenterWave;

                p.push()
                //p.stroke("white");
                //p.strokeWeight(3);
                //p.line(x1, y1, x2, y1Prime);
                //p.line(x1, y2, x2, y2Prime);

                p.fill("purple");
                p.circle(x1, y1, 20);
                p.circle(x2, y1Prime, 20);
                p.fill("blue");
                p.circle(x1, y2, 20);
                p.circle(x2, y2Prime, 20);
                p.fill("white");
                //p.circle(xCenterShape, yCenterShape, radius * 2);
                p.pop()

                const collisionTop = lineCircle(x1, y1, x2, y1Prime, xCenterShape, yCenterShape, radius, p);
                const collisionBottom = lineCircle(x1, y2, x2, y2Prime, xCenterShape, yCenterShape, radius, p);
                return collisionTop || collisionBottom;
            }


            function renderShape(xCenter: number, yCenter: number, color: number, angle: number) {
                const radius = diameterCircle / 2 - 10;
                
                p.push();
                
                p.fill(color);       
                p.translate(xCenter,yCenter);
                p.rotate(angle);
                p.strokeWeight(4);
                p.circle(0,0, diameterCircle);
                p.strokeWeight(6);
                p.line(-radius, 0, radius, 0);

                p.pop();
            }

            function wave(waveIndex: number, speed: number, depth: number) {
                const { angles, offsetY } = waves[waveIndex];
                p.push();
                p.translate(0, offsetY);
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
                p.pop();

                /*for (let i = 0; i < angles.length; i++) {
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50); 
                  p.circle(x, y + depth/2, 10);
                  p.fill("white");
                  p.line(x,y, x, y + depth/2);
                  p.line(x,y + depth/2, x, y + depth);
                }*/
            }

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 1000).parent(renderRef.current);
              p.background(30);

              // create a wave
              const numberOfDivisionCurves = p.floor(p.width / (r * 2));
              for (let x = 0; x < numberOfDivisionCurves + 1; x++) {
                angles[x] = p.map(x, 0, numberOfDivisionCurves, 0, frequency);
              }

              // create the waves
              for(let times = 0; times < 3; times++) {
                waves.push({ angles, offsetY: 200 + (150 * 2 * times) } )
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
                    const collide = waves.filter(({ offsetY }) => isCollide(x, y, offsetY) );
                    const angle = collide.length !== 0 ? Math.PI / 4 : Math.PI;
                    //if(collide.length === 0){
                        renderShape(x, y, color, angle);
                    //}
                });


                /*const {x, y, color} = shapes[2];
                const collide = waves.filter(({ offsetY }) => isCollide(x, y, offsetY) );
                console.log(collide)
                const angle = collide.length !== 0 ? Math.PI / 4 : Math.PI;
                renderShape(x, y, color, angle);*/
                
                waves.forEach((_wave, index) => {
                    wave(index, speed, depth);

                });
                //p.drawingContext.filter = "blur(2px)";

                p.noLoop();

            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
