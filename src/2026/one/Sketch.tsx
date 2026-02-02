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

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(500, 800).parent(renderRef.current);
            }

            p.draw = () => {
                p.frameRate(30);
                p.background(255,40,40);
                p.noLoop();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
