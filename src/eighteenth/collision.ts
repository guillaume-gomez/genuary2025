
function distance(x1,x2, y1,y2) {
  return Math.hypot(x2-x1, y2-y1);
}

// POINT/CIRCLE
function pointCircle(px: number, py: number, cx: number, cy: number, r: number) :boolean {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  const distX = px - cx;
  const distY = py - cy;
  const distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}

// LINE/POINT
function linePoint(x1: number, y1: number, x2: number, y2: number, px: number, py: number) : boolean {

  // get distance from the point to the two ends of the line
  const d1 = distance(px, x1, py, y1);
  const d2 = distance(px, x2, py, y2);

  console.log(d1, "   ", d2);

  // get the length of the line
  const lineLen = Math.sqrt( (x1* y1) + (x2 * y2));

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  const buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}

// LINE/CIRCLE
export function lineCircle(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, radius: number, p: any): boolean {


  // is either end INSIDE the circle?
  // if so, return true immediately
  const inside1 = pointCircle(x1,y1, cx,cy,radius);
  const inside2 = pointCircle(x2,y2, cx,cy,radius);
  if (inside1 || inside2) return true;


  // get length of the line
  let distX = x1 - x2;
  let distY = y1 - y2;
  const len = Math.sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  const  dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

  // find the closest point on the line
  const closestX = x1 + (dot * (x2-x1));
  const closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  //const onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  //if (!onSegment) return false;

  // optionally, draw a circle at the closest
  // point on the line
  //console.log("  ", closestY)
 // console.log(y1, "= ", y2)
  if(closestX < x1 || closestX > x2) {
    return false;
  }
  /*if(closestY < y1 || closestY > y2) {
    return false;
  }*/
  /*p.push();
  p.fill(255,0,0);
  p.noStroke();
  p.circle(closestX, closestY, 20);
  p.pop();*/


  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  const distance = Math.sqrt( (distX*distX) + (distY*distY) );

  return (distance <= radius);
}