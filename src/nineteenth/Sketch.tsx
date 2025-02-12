import { useEffect, useRef } from 'react';
import p5 from "p5";

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            function createGrid(width: number, height: number, cellWidth: number, cellHeight: number, centered: boolean) {
                let fillColor = 255;
                let itColor = 255;
                p.push();
                const startX = centered ? - p.width/2 : 0;
                const startY = centered ? - p.height/2 : 0;
                for(let x = startX; x < width; x+= cellWidth) {
                    itColor = 255 - itColor;
                    fillColor = itColor
                    for(let y = startY; y < height; y += cellHeight) {
                        fillColor = 255 - fillColor
                        p.fill(fillColor);
                        p.rect(x, y, cellWidth, cellHeight);
                    }
                }
                p.pop();
            }

            function drawCircle(s: number, centerX: number, centerY: number, circleRadius: number, radiusMove: number, direction: number) {
                const xRect = p.map(p.cos(s*2 * direction), -1, 1, -radiusMove, radiusMove);
                const yRect = p.map(p.sin(s*2 * direction), -1, 1, -radiusMove, radiusMove);
                p.circle(centerX + xRect, centerY + yRect , circleRadius);


            }

            function drawBackCircles(s: number) {
                drawCircle(s, 400, 400, 200, 300, 1);
                drawCircle(s, 150, 150, 100, 100, 1);
                drawCircle(s, p.width - 150, 150, 100, 100, 1);
                drawCircle(s, 150, p.height - 150, 100, 100, -1);
                drawCircle(s, p.width - 150, p.height - 150, 100, 100, 1);
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
                const widthCell = p.map(p.sin(s*0.5), -1, 1, 40, 180);
                createGrid(1.5 * p.width, 1.5 * p.height, widthCell, widthCell, true);
                p.fill(0);

                p.push();
                // Create a mask.
                p.clip(() => drawBackCircles(s));
                // Draw a backing shape.
                createGrid(p.width, p.height, 40, 40, false);
                p.pop();
                            
                //p.noLoop();              
   
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
