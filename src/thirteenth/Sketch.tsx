import React, { useEffect, useRef } from 'react';
import p5 from "p5";


export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

         function renderTriangle(p: any, centerX: number, centerY: number, segment: number, {red, green, blue} ) {
            const height = segment * Math.sqrt(3)/2;
            const radius = height / 3;
            const x1 = centerX - segment/2;
            const y1 = centerY + radius

            const x2 =  centerX
            const y2 =  y1 - height;

            const x3 = centerX + segment/2;
            const y3 = y1

            p.stroke(0, 0, 0);
            p.fill(red, green, blue, 127/2);
            p.strokeWeight(4);
            p.triangle(x1, y1, x2, y2, x3, y3);
        }

        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            // variables for the animation
            const colors = [
                {red: 54, blue: 53, green: 55},
                {red: 239, blue: 45, green: 86},
                {red: 237, blue: 125, green: 58},
                {red: 140, blue: 216, green: 103},
                {red: 47, blue: 191, green: 113},
            ];


            let triangles =  Array.from({length: 100}, (_i, index) => (
                {
                    segment: -index*50,
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            );

            const rotationAngle = p.random(-10, 10);
            console.log(rotationAngle)
            console.log(triangles)

            p.setup = () => {
                const width = document.body.offsetWidth - 15;
                const height = document.body.offsetHeight - 15;
                p.createCanvas(width, height).parent(renderRef.current);
            }

            p.draw = () => {
                p.frameRate(30);
                p.angleMode(p.DEGREES);

                p.background(255,255,255);
                for(let index = 0; index < triangles.length; index++) {
                    let { segment, color } = triangles[index];
                    segment = segment + (100*p.deltaTime)/100;

                    if(segment >  3 * p.width) {
                        triangles[index].segment = 0;
                    } else {
                        triangles[index].segment = segment;
                    }
                    p.translate(10,10);
                    p.rotate(rotationAngle);
                    renderTriangle(p,p.width/2,p.height/2, Math.max(0, segment), color);
                }
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
