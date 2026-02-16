import { useEffect, useRef, useState } from 'react';
import p5 from "p5";

import { drawG, drawE, drawN, drawU, drawR, drawA, drawY } from "./letters";

const colors = [
  "#392759",
  "#6874E8",
  "#E8F0FF",
  "#F7ACCF",
  "#7A5C61"
]

export default function P5Sketch() {
  const renderRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const [invert, setInvert] = useState<boolean>(false);

  useEffect(() => {
    if(rendered.current) {
        return;
    }

    const width = 500 //document.body.offsetWidth - 15;
    const height = 900 //document.body.offsetHeight - 15;
    const durationGrow = 3500;
    const letterSize = 50;

    const p5Instance = new p5((p: any) => {
        // flag to avoid to many instances of p5
        rendered.current = true;
        let shapes : any = [];
        let direction = 1;
        const numberOfShapes = 150;
        
        p5.disableFriendlyErrors = true;

        p.setup = () => {
          p.createCanvas(width, height).parent(renderRef.current);

          for(let i = 0; i < numberOfShapes; i++) {
            shapes.push(
                {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.max(25, Math.random() * width/3),
                    color: colors[parseInt(Math.random() * colors.length)]
                }
            );
          };

          p.strokeWeight(0);
        }

        p.draw = () => {
          p.frameRate(20);
          p.background(25, 25, 25);
          //p.noLoop();

          const timeAnimation = p.millis() / (durationGrow);

          p.clip(() => {
            drawG(p, width/2 - letterSize, height/2 - 300 - 30 - letterSize, 1);
            drawE(p, width/2 - letterSize, height/2 - 200 - 20 - letterSize, 1);
            drawN(p, width/2 - letterSize, height/2 - 100 - 10 - letterSize, 1);
            drawU(p, width/2 - letterSize, height/2 - letterSize, 1);
            drawA(p, width/2 - letterSize, height/2 + 100 + 10 - letterSize, 1);
            drawR(p, width/2 - letterSize, height/2 + 200 + 20 - letterSize, 1);
            drawY(p, width/2 - letterSize, height/2 + 300 + 30 - letterSize, 1);
          }, { invert: invert });
          
          shapes.forEach(({x, y, size, color}) => {
            p.fill(color);
            p.circle(x, y, size * (Math.cos(timeAnimation + Math.PI) +1));
          });

        }
    });
    return () => { 
      p5Instance.remove();
      rendered.current = false;
    };
  }, [invert]);

  return(
    <div>
      <div ref={renderRef}></div>
      <div className="d-flex flex-row gap-2 align-center justify-content-center">
        <fieldset className="fieldset border-base-300 rounded-box w-64 border p-4">
          <legend className="fieldset-legend text-white">Options</legend>
          <label className="label">
            <input type="checkbox" checked={invert} onChange={()=> setInvert(!invert)} className="toggle" />
            Invert
          </label>
        </fieldset>
      </div>
    </div>
  )
}
