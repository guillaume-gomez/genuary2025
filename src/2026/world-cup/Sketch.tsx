import { useEffect, useRef } from 'react';
import p5 from "p5";

const { BASE_URL } = import.meta.env;

interface LetterData {
  symbol: string;
  size: number;
  color: string;
}

interface TextData {
  letters: LetterData[],
  x: number;
  y: number;
  numberOfRepetition: number;
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

const textString = "France - Bresil"

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        const width = document.body.offsetWidth - 50;
        const height = document.body.offsetHeight - 50;

        const duration = 3000;
        const numberOfShape = palette.length;

        let currentShapeIndex = 0;
        let font = null;
        let textData: TextData[] = [];

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

              textData = textString.split("").map((letterString, indexText) => {
                const letters : LetterData[] = palette.map((color, index) => {
                  return {
                    color, 
                    symbol: letterString,
                    size: (palette.length - index) * 5
                  };
                });

                return {
                  letters,
                  numberOfRepetition: palette.length,
                  x: indexText * 100 + 50,
                  y: height/2
                }

              });
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;
              textData.forEach(textData => {
                textData.letters.forEach((letter, index) => {
                  writeSymbol(p, letter, textData.x, textData.y, time + 1.);
                });  
              })      
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
