import { useEffect, useRef } from 'react';
import p5 from "p5";


function droite1(x: number) {
    return 1.1 * x + 4;
}

function droite2(x : number) {
    return -2 * x + 2;
}

const paletteLake = [
    ['#FFFFFF', 0.0],
    ['#FF0000', 0.3],
    ['#00FF00', 0.70],
    ['#0000FF',0.80],
    ['#011322', 0.85],
];

const lengthAnimation = 4000;

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);
    const width = 640;
    const height = width;

    useEffect(() => {
        if(rendered.current) {
            return;
        }
        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            
        
            p.setup = () => {
                p.createCanvas(width, height).parent(renderRef.current);
                p.imageMode(p.CENTER);

            }

            p.draw = () => {
                p.frameRate(30);

                let tAnimation = p.millis() / (lengthAnimation) % 1;
                let t = p.millis() / 1000.0;
                p.background(224);
                p.translate(width/2, height/2);
                
                const x1 = (0);
                const y1 = (0);

                const variation = Math.max(0.1, p.sin(t)); 
                
                const x2 = (x1 - 125) * variation;
                const y2 = droite1(x2);
                
                const x3 = (x1 - 125) * variation;
                const y3 = droite2(x3) ;

                const x4 = (x1 + 125) * variation;
                const y4 = droite1(x4) ;

                const x5 = (x1 + 125) * variation;
                const y5 = droite2(x5) ;

                console.log(t);
                
                p.rotate(Math.PI * t * 0.5);                
                p.fill(p.paletteLerp(paletteLake, tAnimation % 1000));
                p.triangle(x1, y1, x2, y2, x3, y3);
                p.triangle(x1, y1, x4, y4, x5, y5);


            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
