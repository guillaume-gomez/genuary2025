import React, { useEffect, useRef } from 'react';
import p5 from "p5";


const lengthAnimation = 12000;

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

            p.setup = () => {
                //const width = document.body.offsetWidth - 15;
                //const height = document.body.offsetHeight - 15,
                p.createCanvas(800, 800).parent(renderRef.current);
                p.rectMode(p.CENTER);
            }

            p.draw = () => {
                p.frameRate(30);
                p.background(221 * p.TAU, 152 * p.TAU, 209 * p.TAU);
                const time = p.millis() / 1000;

               for(let x = 0; x < p.width; x += (p.TAU + p.TAU + p.TAU + p.TAU + p.TAU)) {
                    for(let y = 0; y < p.height; y += (p.TAU + p.TAU + p.TAU + p.TAU + p.TAU)) {
                        p.push();
                        p.translate(x + p.sin(p.frameCount * p.TAU) ,y + p.cos(time * p.TAU/2));
                        p.rotate(time * p.TAU * 0.1);
                        p.fill(210,50,p.random(0,255), 125);
                        p.square(0, 0, p.TAU * p.TAU);
                        p.pop();
                    }
               }
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
