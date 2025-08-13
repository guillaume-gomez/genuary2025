import { useEffect, useRef } from 'react';
import p5 from "p5";

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

                let s = p.millis() / 1000;
                p.background(224);
                const x1 = width/2;
                const y1 = height/2;
                const x2 = x1 - 100;
                const y2 = y1 + 200;
                const x3 = x1 + 100;
                const y3 = y1 + 200;

                p.triangle(x1, y1, x2, y2, x3, y3);

            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
