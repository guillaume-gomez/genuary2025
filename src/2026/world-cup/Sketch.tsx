import { useEffect, useRef, useState } from 'react';
import p5 from "p5";

const { BASE_URL } = import.meta.env;

interface Version {
  size: number;
  color: string;
}

interface TextData {
  letters: LetterData[];
  numberOfRepetition: number;
}

interface LetterData {
  versions: Version[],
  symbol: string;
  x: number;
  y: number;
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

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);
    const [textString, setTextString] = useState<string>("France - Bresil");

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
        let textData: TextData = {};

        function writeSymbol(p: any, letter: LetterData, version : Version, duration: number) {
          p.push();
          p.textSize(version.size * duration);
          p.fill(version.color);
          p.text(letter.symbol, letter.x - version.size/2, letter.y);
          p.pop();
        }

        function centerText() {

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

              const letters : LetterData[] = textString.split("").map((letterString, indexText) => {
                const versions : Version[] = palette.map((color, index) => {
                  return {
                    color, 
                    size: (palette.length - index) * 5
                  };
                });

                return {
                  versions,
                  symbol: letterString,
                  x: indexText * 100 + 50,
                  y: height/2
                }

              });

              textData = { 
                numberOfRepetition: palette.length,
                letters 
              };
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              const time = p.millis() / (duration) % 1;

              for(let versionIndex = 0; versionIndex < textData.numberOfRepetition; versionIndex++) {
                for(let letterIndex = 0; letterIndex < textData.letters.length; letterIndex++) {
                  const letter = textData.letters[letterIndex];
                  const version = letter.versions[versionIndex];
                  writeSymbol(p, letter, version, time + 1.);
                }
              }
    
            }
        })
    }, []);

    return(
        <div>
          <div ref={renderRef}></div>
          <div className="py-6">
            <input 
              type="text"
              className="input input-primary text-black"
              value={textString}
              onChange={(e) => setTextString(e.target.value)}
            />
          </div>
        </div>
    )
}
