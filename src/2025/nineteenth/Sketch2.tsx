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

            function createGrid(cellWidth: number, timer: number) {
                p.push();
                p.fill(0);
                for(let x = -p.width/2; x <= (p.width + p.width/2); x+= 2*cellWidth) {
                    const xMove = p.map(p.cos(timer) * p.sin(timer * 0.25), -1,1, -p.width/2, p.width/2 );
                    p.rect(xMove + x, 0, cellWidth, p.height)
                }
                p.pop();
            }

            function drawBackground() {
                p.push();
                // Use the HSB color mode.
                p.colorMode(p.HSB, 360, 100, 100);
                for (let x = 0; x < p.width; x += 1) {

                    // Map the x-coordinate to the hue value.
                    let h = p.map(x, 0, p.width, 0, 360);

                    // Set the saturation value to 100.
                    let s = 100;

                    // Set the brightness value to 100.
                    let b = 100;

                    // Set the stroke color.
                    p.stroke(h, s, b);

                    // Draw a vertical line.
                    p.line(x, 0, x, p.height);
                }
                p.pop();
            }

            function renderRect(radius: number, angle: number, color: string) {
                p.fill(color);
                p.rect(p.cos(angle) * radius, p.sin(angle) * radius , 200,140);
                p.fill("white")
                p.circle(p.cos(angle) * radius + 100, p.sin(angle) * radius + 70, 125)
                p.circle(p.cos(angle) * radius + 100, p.sin(angle) * radius + 70, 100)
                p.circle(p.cos(angle) * radius + 100, p.sin(angle) * radius + 70, 75)
                p.circle(p.cos(angle) * radius + 100, p.sin(angle) * radius + 70, 50)
                p.fill("black");
                p.circle(p.cos(angle) * radius + 100, p.sin(angle) * radius + 70, 25)
            }




            p.setup = () => {
                p.createCanvas(1000, 1000).parent(renderRef.current);
               //p.rectMode(p.CENTER);
            }

            p.draw = () => {
                p.frameRate(30);
                //p.noFill();
                p.strokeWeight(5);
                const s = p.millis() / 1000;
                drawBackground();

                p.stroke(255)  
                p.line(0,0,p.width, p.height);

                p.line(0,0,p.width, p.height - 200);
                p.line(0,0,p.width- 200, p.height);

                p.line(0,0,p.width, p.height - 400);
                p.line(0,0,p.width- 400, p.height);

                p.line(0,0,p.width, p.height - 600);
                p.line(0,0,p.width- 600, p.height);

                p.line(0,0,p.width, p.height - 800);
                p.line(0,0,p.width- 800, p.height);

                p.stroke(0)

                const noise = 0; //100 * p.noise(0.05 * p.frameCount)
                renderRect(300 + noise, p.PI /2.5, "orange");
                renderRect(750 + noise, p.PI /2.4, "green");
                renderRect(700 + noise, p.PI /3.8, "blue");
                renderRect(30 + noise, p.PI /4, "red");
                renderRect(1100 + noise, p.PI /4, "red");
                renderRect(800 + noise, p.PI /8, "purple");
                renderRect(450 + noise, p.PI /12, "teal");

                createGrid(10, s);
                            
                /*p.fill("red")
                p.rect(50,60, 200,140);
                p.fill("blue")
                p.circle(125, 125, 20)*/
                //p.noLoop();              
   
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
