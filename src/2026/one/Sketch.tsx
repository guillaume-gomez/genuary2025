import { useEffect, useRef } from 'react';
import p5 from "p5";

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    function createCircleVector(p: any): p5.Vector[] {
      let circle : p5.Vector[] = [];
      // Create a circle using vectors pointing from center
      for (let angle = 0; angle < 360; angle += 9) {
        // Note we are not starting from 0 in order to match the
        // path of a circle.
        let v = p5.Vector.fromAngle(p.radians(angle - 135));
        v.mult(100);
        circle.push(v);
      }
      return circle;
    }

    function createSquare(p: any): p5.Vector[] {
      let square : p5.Vector[] = [];
      // A square is a bunch of vertices along straight lines
      // Top of square
      for (var x = -50; x < 50; x += 10) {
        square.push(p.createVector(x, -50));
      }
      // Right side
      for (var y = -50; y < 50; y += 10) {
        square.push(p.createVector(50, y));
      }
      // Bottom
      for (var x = 50; x > -50; x -= 10) {
        square.push(p.createVector(x, 50));
      }
      // Left side
      for (var y = 50; y > -50; y -= 10) {
        square.push(p.createVector(-50, y));
      }
      return square;
    }

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        let circle : p5.Vector[] = [];
        let square : p5.Vector[] = [];
        let morph : p5.Vector[] = [];
        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        let state = false;

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);

              // Create a circle using vectors pointing from center
              circle = createCircleVector(p);


              // Let's fill out morph ArrayList with blank PVectors while we are at it
              circle.forEach(() => {
                morph.push(p.createVector());
              });
              
              square = createSquare(p);
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              // We will keep how far the vertices are from their target
              let totalDistance = 0;

              // Look at each vertex
              for (var i = 0; i < circle.length; i++) {
                var v1;
                // Are we lerping to the circle or square?
                if (state) {
                  v1 = circle[i];
                } else {
                  v1 = square[i];
                }
                // Get the vertex we will draw
                var v2 = morph[i];
                // Lerp to the target
                v2.lerp(v1, 0.1);
                // Check how far we are from target
                totalDistance += p5.Vector.dist(v1, v2);
              }

              // If all the vertices are close, switch shape
              if (totalDistance < 0.1) {
                state = !state;
              }

              // Draw relative to center
              p.translate(width / 2, height / 2);

              p.strokeWeight(4);
              // Draw a polygon that makes up all the vertices
              p.beginShape();
              p.noFill();
              p.stroke(250, 200, 50);

              morph.forEach(v => {
                p.vertex(v.x, v.y);
              });
              p.endShape(p.CLOSE);
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
