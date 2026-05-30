import { useEffect, useRef } from 'react';
import p5 from "p5";

const palette = [
  "#751312",
  "#6200eb",
  "#1a247d",
  "#004c40",
  "#d60001",
  "#b387ff",
  "#304fff",
  "#03c753",
  "#ff3d00",
  "#ba69c6",
  "#2196f3",
  "#b1ec02",
  "#ff9e81",
  "#e82064",
  "#64ffd8",
  "#ecff43",
  "#000000",
  "#FFFFFF"
];

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        const duration = 2000;
        const numberOfShape = 4;

        let currentShapeIndex = 0;
        let font = null;

        function writeSymbol(symbol: string | number, x: number, y: number, size: number) {
          p.push();
          p.textSize(size);
          p.text(symbol, x, y)
          p.pop();
        }


        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.preload = () => {
              //font = p.loadFont("fifa-26/fifa-26.otf");
            }

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);
              //p.textFont(font);
              p.textSize(32);
              p.textAlign(p.CENTER, p.CENTER);
              p.strokeWeight(4);
              
            }

            p.draw = () => {
              const letters = "Alice d'amour";
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;
              // Look at each vertex
              letters.forEach((letter, index) => {
                writeSymbol(letter, index * 50, 200, time * 32 );
              });
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
