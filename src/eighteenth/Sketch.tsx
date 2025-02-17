import { useEffect, useRef } from 'react';
import p5 from "p5";
import { lineCircle, quadCircle } from "./collision";

interface Wave {
    angles: number[];
    offsetY: number;
}

interface Shape {
    x: number;
    y: number;
    angle: number;
}

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);


    useEffect(() => {
        if(rendered.current) {
            return;
        }
        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            let waves : Wave[] = [];
            let angles : number[] = []; 
            let shapes : Shape[] = [];
            const depth = 150;
            const perimeterCircle = 350;
            const diameterCircle = perimeterCircle/p.PI;
            const r = 4;
            const frequency = 2 * p.TWO_PI;

            function isCollide(xCenterShape: number, yCenterShape: number, yCenterWave: number) {
                const radius = diameterCircle/2;
                const extremumLeftX = (xCenterShape -  radius);
                const extremumRightX = xCenterShape + radius;

                const indexLeft = p.floor(p.map(extremumLeftX, 0, p.width, 0, angles.length));
                const indexRight = p.floor(p.map(extremumRightX, 0, p.width, 0, angles.length));
        
                const yLeft = p.map(p.sin(angles[indexLeft]), -1, 1, -50, 50);
                const yRight = p.map(p.sin(angles[indexRight]), -1, 1, -50, 50);

                const x1 = extremumLeftX;
                const x2 = extremumRightX;
                const y1 = yLeft + yCenterWave;
                const y2 = depth + yLeft + yCenterWave;
                const y1Prime = yRight + yCenterWave;
                const y2Prime = depth + yRight + yCenterWave;

                const collisionTop = lineCircle(x1, y1, x2, y1Prime, xCenterShape, yCenterShape, radius);
                const collisionBottom = lineCircle(x1, y2, x2, y2Prime, xCenterShape, yCenterShape, radius);
                return collisionTop || collisionBottom;
            }

            function isInner(xCenterShape: number, yCenterShape: number, yCenterWave: number) {

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

                return quadCircle(x1,y1, x2, y1Prime, x1, y2, x2, y2Prime, xCenterShape, yCenterShape, radius);
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

            function updateWave(waveIndex: number, speed: number) {
                const { angles } = waves[waveIndex];
                for (let i = 0; i < angles.length; i++) {
                    angles[i] += speed;
                }
            }

            function renderWave(waveIndex: number, depth: number) {
                const { angles, offsetY } = waves[waveIndex];
                p.push();
                p.translate(0, offsetY);
                p.strokeWeight(0);
                p.fill(169, 216, 224, 40);
                
                p.beginShape();
                for (let i = 0; i < angles.length; i++) {
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50);
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  //const noise = 0;// p.map(p.noise(Math.random()), 0,1, -10, 10)
                  p.vertex(x,y);
                }
                for (let i = angles.length; i >= 0; i--) {
                  const y = p.map(p.sin(angles[i]), -1, 1, -50, 50);
                  const x = p.map(i, 0, angles.length, 0, p.width);
                  //const noise = 0; //p.map(p.noise(Math.random()), 0,1, -10, 10)
                  p.vertex(x,y + depth);
                }
                p.endShape();
                p.pop();
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
                for(let y=0; y < iteration; y++) {
                    shapes.push({
                        x: (x * widthIteration) + widthIteration/2 ,
                        y: (y * heightIteration) + heightIteration/2,
                        angle: 0
                    });
                }
              }
            }

            p.draw = () => {
                p.frameRate(30);
                const speed = 0.01; //0.05;

                p.background(30);
                shapes.forEach(({x, y, angle}, index) => {
                    let force = 0;
                    let color = "#a9d8e0";
                    const collide = waves.filter(({ offsetY }) => isCollide(x, y, offsetY) );
                    if(collide.length > 0) {
                        force = 0.02;
                        color = "#70b8d7";
                    }
                    else {
                        const inner = waves.filter(({ offsetY }) => isInner(x, y, offsetY) );
                        if(inner.length > 0) {
                            force = 0.08;
                            color= "#0c789d";
                        }

                    }
                    const newAngle = Math.max( (angle + force), Math.PI/2);
                    shapes[index] = { x, y, angle: newAngle };
                    const noise = p.map(p.noise(Math.random()), 0,1, -0.05, 0.05)
                    renderShape(x, y, color, newAngle - noise);
                });
                
                waves.forEach((_wave, index) => {
                    updateWave(index, speed);
                    renderWave(index, depth);
                });

                //p.noLoop();

            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
