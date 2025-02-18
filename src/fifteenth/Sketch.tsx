import { useEffect, useRef } from 'react';
import p5 from "p5";
import { createHueShiftPalette } from "./colors-generation.ts";


export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        function randomColor(baseColor: [number, number, number], numberOfColor: number = 10) {
            const [l, c, h] = baseColor;
            const hslColors = createHueShiftPalette(
              {
                base: {
                  l,
                  c,
                  h,
                },
                minLightness: 10,
                maxLightness: 90,
                hueStep: 12,
                numberOfColor,
              }
            );
            //console.log(hslColors);
            return hslColors;
        }

        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            let lines = [];

            function generateRandomViewport(depth: number, viewport: [number, number, number, number], baseColor: [number, number, number]) {
                const [x, y, width, height] = viewport;
                const colors = randomColor(baseColor, p.random(5, 20));
                if(depth === 0) {
                    const widthStripe = width / colors.length;
                    const lines = colors.map((color, index) => {
                        return {
                            x:x + (index * widthStripe),
                            y,
                            width: widthStripe,
                            height,
                            color 
                        }; 
                    });
                    return [lines];
                }
                //const newBaseColorHex = colors[Math.floor(Math.random() * colors.length)];
                //const { l, c, h } = fromHexToLCH(newBaseColorHex);
                //const newBaseColor = [l,c,h];
                return [
                    ...generateRandomViewport(depth - 1, [x, y, width, height/2], baseColor),
                    ...generateRandomViewport(depth - 1, [x, y + height/2,width, height/2], baseColor),
                ]
            }

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 800).parent(renderRef.current);
              p.rectMode(p.CENTER);
              const [l, c, h ] = [p.random(0, 100), p.random(0, 40), p.random(0, 270)];
                    
              lines = generateRandomViewport(5,
                    [0, 0, p.width, p.height],
                    [l, c, h]
               );   
            }

            p.draw = () => {
                p.frameRate(30);
                let s = p.millis() / 1000;
                let duration = s * 2.0;

                p.background(30, 30, 30);
                lines.forEach(line => {
                    line.forEach((rect, index: number) => {
                        const {x,y, width, height, color} = rect;
                        /*const widthTime = Math.max(
                            Math.sin((index+1) * duration) * width * (Math.sin(duration) + 1),
                            width
                        );*/

                        const widthTime =
                            width + (width * 0.5 * (Math.sin((index+1) * duration) + 1))
                        ;
                        const heightTime = Math.max(
                            height * (Math.sin(duration) + 1 ),
                            height
                        );
                        p.fill(color);
                        p.rect(x + width/2, y + height/2, widthTime, heightTime);
                    })
                })

//                p.noLoop();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
