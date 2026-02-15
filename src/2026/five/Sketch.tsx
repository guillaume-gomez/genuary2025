import { useEffect, useRef } from 'react';
import p5 from "p5";

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    function drawLine(p: any, x1: number, y1: number, x2: number, y2: number, nbPoints: number): p5.Vector[] {
      let points : p5.Vector[] = [];

      for (let i = 0; i <= nbPoints; i++) {

        let t = i / nbPoints;
        let x = p.lerp(x1, x2, t);
        let y = p.lerp(y1, y2, t);

        points.push(p.createVector(x, y));
      }

      return points;
    }

    function drawG(p: any, x: number, y: number, scale: number = 1) {
      p.translate(x, y);

      p.scale(scale, scale);
      
      p.beginShape();
      p.vertex(0,0);
      p.vertex(100,0);
      p.vertex(100,20);
      p.vertex(20,20);
      p.vertex(20,80);
      p.vertex(80,80);
      p.vertex(80,60);
      p.vertex(50,60);
      p.vertex(50,40);
      p.vertex(100,40);
      p.vertex(100,100);
      p.vertex(0,100);
      p.vertex(0,0);
      p.endShape(p.CLOSE);

      p.translate(-x, -y);
    }


    function drawShape(p: any, morph: p5.Vector[], x:number, y: number, scale: number): void {
      // Draw a polygon that makes up all the vertices
      p.beginShape();
      p.scale(scale, scale);
      //p.noFill();

      morph.forEach(v => {
        p.vertex(v.x + x, v.y + y);
      });
      p.endShape(p.CLOSE);
    }

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        const duration = 2000;
        const numberOfShape = 4;

        let currentShapeIndex = 0;

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;

              p.strokeWeight(4);
              //p.noStroke();

              p.fill(255);
              p.clip(() => drawG(p, 100, 200, 2), { invert: true });

              p.fill(240, 12, 67);
              p.circle(width/2, height/2, 300);

            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
