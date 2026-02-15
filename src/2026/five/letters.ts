export function drawG(p: any, x: number, y: number, scale: number = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,20);
  p.vertex(20, 0);
  p.vertex(100,0);
  p.vertex(100,20);
  p.vertex(30,20);
  p.vertex(20,30);
  p.vertex(20,70);
  p.vertex(30,80);
  p.vertex(70,80);
  p.vertex(80,70);
  p.vertex(80,60);
  p.vertex(50,60);
  p.vertex(50,40);
  p.vertex(100,40);
  p.vertex(100,80);
  p.vertex(80,100);
  p.vertex(20,100);
  p.vertex(0,80);
  p.vertex(0,20);
  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawE(p: any, x: number, y: number, scale: number = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,20);
  p.vertex(20, 0);
  p.vertex(100,0);
  p.vertex(100,20);
  p.vertex(30,20);
  p.vertex(20,30);
  p.vertex(20, 40);
  p.vertex(60, 40);
  p.vertex(60, 60);
  p.vertex(20, 60);
  p.vertex(20, 70);
  p.vertex(30, 80);
  p.vertex(100, 80);
  p.vertex(100, 100);
  p.vertex(20, 100);
  p.vertex(0, 80);
  p.vertex(0, 20);

  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawN(p: any, x: number, y: number, scale = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,0);
  p.vertex(20,0);
  p.vertex(80,60);
  p.vertex(80,0);
  p.vertex(100, 0);
  p.vertex(100, 100);
  p.vertex(80, 100);
  p.vertex(20, 40);
  p.vertex(20, 100);
  p.vertex(0, 100);
  p.vertex(0, 0);

  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawU(p: any, x: number, y: number, scale = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,0);
  p.vertex(20,0);
  p.vertex(20,70);
  p.vertex(30,80);
  p.vertex(70, 80);
  p.vertex(80, 70);
  p.vertex(80, 0);
  p.vertex(100, 0);
  p.vertex(100, 80);
  p.vertex(80, 100);
  p.vertex(20, 100);
  p.vertex(0, 80);
  p.vertex(0, 0);

  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawR(p: any, x: number, y: number, scale = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,0);
  p.vertex(80,0);
  p.vertex(100,20);
  p.vertex(100,40);
  p.vertex(80, 60);
  p.vertex(60, 60);
  p.vertex(100, 100);
  p.vertex(70, 100);
  p.vertex(30, 60);
  p.vertex(30, 40);
  p.vertex(70, 40);
  p.vertex(80, 30);
  p.vertex(70, 20);
  p.vertex(20, 20);
  p.vertex(20, 100);
  p.vertex(0, 100);
  p.vertex(0, 0);
  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawA(p: any, x: number, y: number, scale = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,20);
  p.vertex(20,0);
  p.vertex(80,0);
  p.vertex(100,20);
  p.vertex(100, 100);
  p.vertex(80, 100);
  p.vertex(80, 70);
  p.vertex(30, 70);
  p.vertex(30, 50);
  p.vertex(80, 50);
  p.vertex(80, 30);
  p.vertex(70, 20);
  p.vertex(30, 20);
  p.vertex(20, 30);
  p.vertex(20, 100);
  p.vertex(0, 100);
  p.vertex(0, 20);
  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}

export function drawY(p: any, x: number, y: number, scale = 1) {
  p.translate(x, y);

  p.scale(scale, scale);
  
  p.beginShape();
  p.vertex(0,0);
  p.vertex(20,0);
  p.vertex(20,30);
  p.vertex(30,40);
  p.vertex(70, 40);
  p.vertex(80, 30);
  p.vertex(80, 0);
  p.vertex(100, 0);
  p.vertex(100, 40);
  p.vertex(80, 60);
  p.vertex(60, 60);
  p.vertex(60, 100);
  p.vertex(40, 100);
  p.vertex(40, 60);
  p.vertex(20, 60);
  p.vertex(0, 40);
  p.vertex(0, 0);
  p.endShape(p.CLOSE);

  p.translate(-x, -y);
}