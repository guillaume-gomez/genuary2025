import { useRef, useEffect } from "react";
const colours = ["#3D348B", "#7678ED", "#F7B801", "#F18701", "#F35B04", "#FFFFFF", "#000000"];
const shadowColors = ["#0C0F0A", "#544B3D"]
const FORTY_TWO = 42;
const ANIMATION_DURATION = 15000;
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launch = useRef<boolean>(false);
  useEffect(() => {
    if(!canvasRef.current || launch.current === true) {
      return;
    }
    launch.current = true;

    canvasRef.current.width = document.body.offsetWidth - 15;
    canvasRef.current.height = document.body.offsetHeight - 15;
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
    context.shadowColor = shadowColors[ Math.floor(Math.random() * shadowColors.length )];
    const shadow = 8;
    context.shadowOffsetX = shadow;
    context.shadowOffsetY = shadow;
    context.shadowBlur = 10;
    const numberOfCircles =  FORTY_TWO  * 15;

    for(let it = 0; it < numberOfCircles; it++) {
      setTimeout(() => {
        const x = Math.random() * canvasRef.current.width;
        const y = Math.random() * canvasRef.current.height;
        const radius = ((Math.random() * FORTY_TWO * 1.618033989) + 10);
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = colours[Math.floor(colours.length * Math.random())];
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#333333';
        context.stroke();
      }, [ ANIMATION_DURATION * (it / (numberOfCircles)) ]);
    }
  }, [canvasRef.current]);
  return (<canvas ref={canvasRef} />)
}









