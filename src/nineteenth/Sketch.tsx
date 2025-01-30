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

            function createGrid(width: number, height: number, cellWidth: number, cellHeight: number) {
                let fillColor = 255;
                let itColor = 255;
                p.push();
                for(let x =0; x < width; x+= cellWidth) {
                    itColor = 255 - itColor;
                    fillColor = itColor
                    for(let y = 0; y < height; y += cellHeight) {
                        fillColor = 255 - fillColor
                        p.fill(fillColor);
                        p.rect(x, y, cellWidth, cellHeight);
                    }
                }
                p.pop();
            }

            p.setup = () => {
                p.createCanvas(800, 800).parent(renderRef.current);
                p.rectMode(p.CENTER);
            }

            p.draw = () => {
                p.frameRate(30);
                //p.noFill();
                //p.strokeWeight(5);
                const s = p.millis() / 1000;
                p.background(220);

                p.drawingContext.save();
                const widthCell = p.map(p.sin(s), -1, 1, 50, 100);
                createGrid(p.width, p.height, widthCell, widthCell);
                p.fill(0);
                const radius = 200;
                const xRect = p.map(p.cos(s*2), -1, 1, radius, 2*radius);
                const yRect = p.map(p.sin(s*2), -1, 1, radius, 2*radius);
                
                p.circle(200 + xRect, 200 + yRect, 200);
                p.drawingContext.clip();
                createGrid(p.width, p.height, 40, 40);
                p.drawingContext.restore();
                p.fill(12)
                //p.rect(150,150,200,200);
                //p.noLoop();              
   
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
