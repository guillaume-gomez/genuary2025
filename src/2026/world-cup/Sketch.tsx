import { useEffect, useRef } from 'react';
import p5 from "p5";

const { BASE_URL } = import.meta.env;

interface LetterData {
  symbol: string;
  size: number;
  color: string;
}

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

const text = "guillaume"

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        const duration = 25000;
        const numberOfShape = palette.length;

        let currentShapeIndex = 0;
        let font = null;
        let letters: LetterData[] = [];

        function writeSymbol(p: any, letter: LetterData, x: number, y: number, duration: number) {
          p.push();
          p.textSize(letter.size * duration);
          p.fill(letter.color);
          p.text(letter.symbol, x - letter.size/2, y);
          p.pop();
        }


        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.preload = () => {
              font = p.loadFont(`${BASE_URL}/fifa-26/fifa-26.otf`);
            }

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);
              p.textFont(font);
              p.textSize(32);
              p.textAlign(p.CENTER, p.CENTER);
              p.strokeWeight(4);

              letters = palette.map((color, index) => {
                return {
                  color, 
                  symbol: "A", //text.toString()[index], 
                  size: (palette.length - index) * 50
                };
              })
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;
              // Look at each vertex
              letters.forEach((letter, index) => {
                writeSymbol(p, letter, width/2, height/2, time + 1.);
              });
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
