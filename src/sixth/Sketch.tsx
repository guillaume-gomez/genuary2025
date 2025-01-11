import React, { useEffect, useRef } from 'react';
import p5 from "p5";

let x = -100;
let speed = 2.5;

export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        function renderSun(p: any) {
            p.stroke(255, 204, 0);
            p.fill(255,255,12);
            p.strokeWeight(4);
            p.circle(50, 50, 75);
        }

        function renderMontain(
            p: any,
            position: [number, number],
            size:[number, number],
            color: [number, number, number]
        ) {
            const [x, y] = position;
            const [width, height] = size;
            const [r,g,b] =  color;
            p.fill(r, g, b);
            p.noStroke();
            p.triangle(x, y, x+width/2, height, x + width, y);
        }

        function renderBoat(p: any, position: [number, number]) {
            const [x, y] = position;

            //right
            p.triangle(x+40, y-5, x+40,y-30, x+65,y-5);
            //left
            p.triangle(x + 15, y-5, x+30, y-30, x+30,y-5);
            //
            p.rect(x, y,80,15);
        }

        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.setup = () => {
                p.createCanvas(800, 600).parent(renderRef.current);
            }

            p.draw = () => {
                p.frameRate(30);
                // If we're travelling towards the right or left

                if (speed > 0) {
                    // If the ball has reached the end of the container or not
                    if (x + 300 < p.width) {
                        x += speed
                    } else {
                        speed = -speed;
                    }
                } else {
                    if (x - 300 > 0) {
                        x += speed;
                    } else {
                        speed = -speed;
                    }
                }

                p.background(221, 152, 209);
                renderSun(p);

                // back layer of mountains
                renderMontain(p, [-100, 500], [600,100], [255,200,200]);
                renderMontain(p, [-200, 500], [600,150], [255,200,200]);
                renderMontain(p, [-300, 500], [600,150], [255,200,200]);

                renderMontain(p, [485, 500], [600,100], [255,200,200]); // green
                renderMontain(p, [385, 500], [600,120], [255,200,200]);
                renderMontain(p, [285, 500], [600,110], [255,200,200]);

                renderMontain(p, [100, 500], [600,100], [255,200,200]);
                renderMontain(p, [0, 500], [600,150], [255,200,200]);

                // front layers of moutains
                renderMontain(p, [420, 500], [500,195], [234, 11, 162]); // orange
                renderMontain(p, [125, 500], [600,175], [234, 150, 162]); // purple
                renderMontain(p, [-50, 500], [500,200], [234, 75, 162]); // red
                renderMontain(p, [-600, 500], [800,175], [340, 100, 162]); // black
                renderMontain(p, [650, 500], [400,175], [234, 11, 200]); // green


                p.fill(0, 66,144);
                p.ellipse(400, 560, 1200, 300);


                p.fill(5,32,77);
                p.ellipse(400, 550, 1000, 200);

                p.fill(255,255,255);
                renderBoat(p,[x,550]);

                // helpers for the composition of the image
                /*p.fill(255,0,0);
                p.noStroke();
                p.rect(0, 100, 800, 4);
                p.rect(0, 175, 800, 4);
                p.rect(0, 410, 800, 4);*/


            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}

/*
#05204D   5,32,77 -> lac (bleu foncé)
#004290   0, 66,144 -> bleu plus clair
#6458AE   100, 88, 174 -> violet
#DD98D1   221, 152, 209-> rose
#EAB0A2  234, 11, 162 -> rose petant
*/