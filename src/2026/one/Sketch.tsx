import { useEffect, useRef } from 'react';
import p5 from "p5";

const size = 100;
const radius = size/2;
const duration = 2000;

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
        v.mult(radius);
        circle.push(v);
      }
      return circle;
    }

    function createSquare(p: any): p5.Vector[] {
      let square : p5.Vector[] = [];
      const middleSize = size/2;
      // A square is a bunch of vertices along straight lines
      // Top of square
      for (var x = -middleSize; x < middleSize; x += 10) {
        square.push(p.createVector(x, -middleSize));
      }
      // Right side
      for (var y = -middleSize; y < middleSize; y += 10) {
        square.push(p.createVector(middleSize, y));
      }
      // Bottom
      for (var x = middleSize; x > -middleSize; x -= 10) {
        square.push(p.createVector(x, middleSize));
      }
      // Left side
      for (var y = middleSize; y > -middleSize; y -= 10) {
        square.push(p.createVector(-middleSize, y));
      }
      return square;
    }

    function drawShape(p: any, morph: p5.Vector[], x:number, y: number): void {
      // Draw a polygon that makes up all the vertices
      p.beginShape();
      //p.noFill();
      
      morph.forEach(v => {
        p.vertex(v.x + x, v.y + y);
      });
      p.endShape(p.CLOSE);
    }

    function drawShapes(p: any, width: number, height: number, morph: p5.Vector[]): void {
      for(let x = 0; x <= width; x+= size) {
        for(let y = 0; y <= height; y+= size) {
          drawShape(p, morph, x, y);
        }
      }
    }

    // function createTriangle(p: any): p5.Vector[] {
    //   let triangle : p5.Vector[] = [];

    //   triangle.push(p.createVector(-50, -50));
    //   triangle.push(p.createVector(50, -50));
    //   triangle.push(p.createVector(0, 0));

    //   return triangle;
    // }

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        let circle : p5.Vector[] = [];
        let square : p5.Vector[] = [];
        let morph : p5.Vector[] = [];

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        let length = 2;
        let currentShapeIndex = 0;
        let colorRatio = 0;

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            let from = p.color(218, 165, 32);
            let to = p.color(72, 61, 139);
        

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

              let delta = duration * deltaTime;
              //p.noLoop();

              // We will keep how far the vertices are from their target
              let totalDistance = 0;

              // Look at each vertex
              for (var i = 0; i < circle.length; i++) {
                var v1;
                // Are we lerping to the circle or square?
                if (currentShapeIndex === 0) {
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
                currentShapeIndex = (currentShapeIndex + 1) % length;
              }

              //p.stroke(p.lerpColor(from, to, colorRatio/100));
              p.strokeWeight(4);
              //p.noStroke();

              p.fill(p.lerpColor(from, to, totalDistance/300));
              
              drawShapes(p, width, height, morph);
              //drawShape(p, morph, 0, 0);

              colorRatio = (colorRatio+ 1) % 100 ;
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
