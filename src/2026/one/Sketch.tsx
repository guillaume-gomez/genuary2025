import { useEffect, useRef } from 'react';
import p5 from "p5";

const size = 100;
const radius = size/2;
const duration = 2000;
const numberOfPoints = 40;

const palette = [
    ['#101551', 0.0],
    ['#ff00ff', 0.25],
    ['#ff7c3e', 0.50],
    ['#007c3e', 0.75],
];

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    function createCircle(p: any): p5.Vector[] {
      let circle : p5.Vector[] = [];
      const step = (360/numberOfPoints);
      // Create a circle using vectors pointing from center
      for (let angle = 0; angle < 360; angle += step)  { 
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

    function createTriangle(p: any): p5.Vector[] {
      let triangle : p5.Vector[] = [];
      // 14, 13, 13 = 40 pts
      triangle.push(...drawLine(p, -50, 50, 50, 50, 14));
      triangle.push(...drawLine(p, 50, 50, 0, -50, 13));
      triangle.push(...drawLine(p, 0, -50, -50, 50, 13));

      return triangle;
    }

    function createLosange(p: any): p5.Vector[] {
      let losange : p5.Vector[] = [];

      losange.push(...drawLine(p, -50, 0, 0, 50, 10));
      losange.push(...drawLine(p, 0, 50, 50, 0, 10));
      losange.push(...drawLine(p, 50, 0, 0, -50, 10));
      losange.push(...drawLine(p, 0, -50, -50, 0, 10));

      return losange;
    }

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

    function drawShapes(p: any, width: number, height: number, scale: number, morph: p5.Vector[]): void {
      for(let x = 0; x <= width; x+= size) {
        for(let y = 0; y <= height; y+= size) {
          drawShape(p, morph, x, y, scale);
        }
      }
    }

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        let circle : p5.Vector[] = [];
        let square : p5.Vector[] = [];
        let triangle : p5.Vector[] = [];
        let losange : p5.Vector[] = [];
        let morph : p5.Vector[] = [];

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        let length = 4;
        let currentShapeIndex = 0;
        let colorRatio = 0;

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);

              // Create a circle using vectors pointing from center
              circle = createCircle(p);

              // Let's fill out morph ArrayList with blank PVectors while we are at it
              for(let nbPoints = 0; nbPoints < numberOfPoints; nbPoints++){
                morph.push(p.createVector());
              };
              
              square = createSquare(p);
              triangle = createTriangle(p);
              losange = createLosange(p);
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;
              const time2 = p.millis() / (length * duration) % 1;

              // We will keep how far the vertices are from their target
              let totalDistance = 0;

              // Look at each vertex
              for (var i = 0; i < circle.length; i++) {
                var v1;
                // Are we lerping to the circle or square?
                if (currentShapeIndex === 0) {
                  v1 = circle[i];
                } else if(currentShapeIndex === 1) {
                  v1 = square[i];
                } else if(currentShapeIndex === 2) {
                  v1 = triangle[i];
                } else {
                  v1 = losange[i];
                }
                // Get the vertex we will draw
                var v2 = morph[i];
                // Lerp to the target
                v2.lerp(v1, 0.1);
                // Check how far we are from target
                totalDistance += p5.Vector.dist(v1, v2) * time;
              }

              // If all the vertices are close, switch shape
              if (totalDistance < 0.1) {
                currentShapeIndex = (currentShapeIndex + 1) % length;
              }

              //p.stroke(p.lerpColor(from, to, colorRatio/100));
              p.strokeWeight(4);
              //p.noStroke();

              const elapsed = (p.cos(time2 * p.PI * 2.) + 1) * 0.5;

              p.fill(p.paletteLerp(palette, elapsed));
              
              drawShapes(p, width, height, 1 , morph);
              //drawShape(p, morph, 0, 0);

              colorRatio = (colorRatio+ 1) % 100 ;
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
