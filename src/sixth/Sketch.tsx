import React, { useEffect, useRef } from 'react';
import p5 from "p5";

let x = -100;
let speed = 2.5;
let sunSpeed = 0;

const paletteSky = [
    ['#311f62', 0.3],
    ['#5a336e',0.35],
    ['#8d5273', 0.40],
    ['#c3727c', 0.45],

    ['#e8817f', 0.50],

    ['#c3727c', 0.60],
    ['#8d5273', 0.65],
    ['#5a336e',0.70],
    ['#311f62', 1.0],
];

const paletteLake = [
    ['#0B3D91', 0.3],
    ['#1E5B9A',0.35],
    ['#A4C8E1', 0.40],

    ['#D0E7F4', 0.60],

    ['#A4C8E1', 0.65],
    ['#1E5B9A',0.70],
    ['#0B3D91', 1.0],

];

const paletteMountain = [
    ['#5e7d61', 0.3],
    ['#6f9973',0.35],
    ['#86aa89', 0.40],

    ['#92c496', 0.60],

    ['#86aa89', 0.65],
    ['#6f9973',0.70],
    ['#5e7d61', 1.0],
];

const lengthAnimation = 12000;

export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        //==> 0.05 ~ 12 SECONDS
        function renderSun(p: any) {
            sunSpeed -= p.deltaTime/100 * 0.05;// 0.0125;
            const x = p.map(Math.sin(sunSpeed), -1, 1, -100, 1000);
            const y = p.map(Math.cos(sunSpeed), -1, 1, 50, 500);
            p.stroke(255, 204, 0);
            p.fill(255,255,12);
            p.strokeWeight(4);
            p.circle(x, y, 75);
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
                    if (x > -300) {
                        x += speed;
                    } else {
                        speed = -speed;
                    }
                }

                //p.background(221, 152, 209);
                const time = p.millis() / (lengthAnimation) % 1;
                p.background(p.paletteLerp(paletteSky, time));
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
                renderMontain(p, [420, 500], [500,195], [111,153,115]); // orange
                renderMontain(p, [125, 500], [600,175], [100, 100, 100]); // purple
                renderMontain(p, [-50, 500], [500,200], [94,125,97]); // red
                renderMontain(p, [-600, 500], [800,175], [200, 200, 200]); // black
                renderMontain(p, [650, 500], [400,175], [240, 240, 200]); // green


                p.fill(p.brightness(p.paletteLerp(paletteLake, time), 50));
                p.ellipse(400, 560, 1200, 300);


                p.fill(p.paletteLerp(paletteLake, time));
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
