import { useEffect, useRef } from 'react';
import p5 from "p5";

const paletteSky = [
    ['#2c4e55', 0.0],
    ['#2c4e55', 0.3],
    ['#ffcb73', 0.40],
    ['#ffffe9', 0.45],
    ['#ffcb73',0.55],
    ['#2c4e55', 0.80],
    ['#2c4e55', 0.85],
];

const paletteMountainBack = [
    ['#355565', 0.0],
    ['#355565', 0.3],
    ['#ffb866', 0.40],
  //  ['#b2b28b', 0.45],
    ['#ffb866',0.55],
    ['#355565', 0.80],
    ['#355565', 0.85],
]

const paletteLake = [
    ['#011322', 0.0],
    ['#011322', 0.3],
    ['#256685', 0.40],
  //  ['#b2b28b', 0.45],
    ['#6497b1',0.55],
    ['#011322', 0.80],
    ['#011322', 0.85],
];

const paletteMountain = [
    ['#0b0e36', 0.0],
    ['#0b0e36', 0.3],
    ['#e77038', 0.40],
    //['#ffc8af', 0.45],
    ['#e77038',0.55],
    ['#0b0e36', 0.80],
    ['#0b0e36', 0.85],
];

const paletteMountainLight = [
    ['#101551', 0.0],
    ['#101551', 0.3],
    ['#ff7c3e', 0.40],
    //['#ffc8af', 0.45],
    ['#ff7c3e',0.55],
    ['#101551', 0.80],
    ['#101551', 0.85],
];

const lengthAnimation = 12000;

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        let x = -100;
        let speed = 3;
        let sunSpeed = 0;

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
            color: p5.Color
        ) {
            const [x, y] = position;
            const [width, height] = size;
            p.fill(color);
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

        new p5((p: any) => {
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
                    if (x < p.width + 80) {
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
                const colorBackMountain = p.paletteLerp(paletteMountainBack, time);
                renderMontain(p, [-100, 500], [600,100], colorBackMountain);
                renderMontain(p, [-200, 500], [600,150], colorBackMountain);
                renderMontain(p, [-300, 500], [600,150], colorBackMountain);

                renderMontain(p, [485, 500], [600,100], colorBackMountain);
                renderMontain(p, [385, 500], [600,120], colorBackMountain);
                renderMontain(p, [285, 500], [600,110], colorBackMountain);

                renderMontain(p, [100, 500], [600,100], colorBackMountain);
                renderMontain(p, [0, 500], [600,150], colorBackMountain);

                // front layers of moutains
                const colorMountain = p.paletteLerp(paletteMountain, time);
                const colorMountainLight = p.paletteLerp(paletteMountainLight, time);
                renderMontain(p, [420, 500], [500,195], colorMountainLight);
                renderMontain(p, [125, 500], [600,175], colorMountain); // purple
                renderMontain(p, [-50, 500], [500,200], colorMountainLight); // red
                renderMontain(p, [-600, 500], [800,175], colorMountain); // black
                renderMontain(p, [650, 500], [400,175], colorMountain); // green


                p.fill(p.brightness(p.paletteLerp(paletteLake, time), 50));
                p.ellipse(400, 560, 1200, 300);


                p.fill(p.paletteLerp(paletteLake, time));
                p.ellipse(400, 550, 1000, 200);

                p.fill(255,255,255);
                renderBoat(p,[x,550]);
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
