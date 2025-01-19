import React, { useEffect, useRef } from 'react';
import p5 from "p5";


export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        let x = 0;
        let y = 0;

        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;
        
            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 800).parent(renderRef.current);
              //p.rectMode(p.CENTER);   
              p.background(30, 30, 30);
            }

            p.draw = () => {
                p.frameRate(30);
                let s = p.millis() / 1000;
                let duration = s * 2.0;
//              
                const r = p.random(0, 255);
                const g = p.random(0, 255);
                const b = p.random(0, 255);
                const x2 = p.random(0, p.width);
                const y2 = p.random(0, p.height);
                p.strokeWeight(5);
                p.stroke(r, g, b);
                
                p.line(x, y, x2, y2);
                //p.rect(x, y, 10, 10);
                //p.noLoop();
                x = x2;
                y = y2;
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
