
//The files is relevant only for this sketch. Don't try to use it elsewhere wihtout adjustments

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
/*function linePoint(x1: number, y1: number, x2: number, y2: number, px: number, py: number) : boolean {

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
}*/

// LINE/CIRCLE
export function lineCircle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  radius: number,
  //p: any
  ): boolean {


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

//QUAD/Circle
export function quadCircle(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  x4: number, y4: number,
  cx: number, cy: number,
  radius: number,
  //p: any
): boolean {
    let distX = (cx-x1);
    let distY = (cy-y1);
    //p.strokeWeight(5);
   // p.line(cx, cy, x1, y1)
    const distanceLeftTopCenterCircle = Math.sqrt( (distX*distX) + (distY*distY) );
    distX = (cx-x2);
    distY = (cy-y2);
    //p.line(cx, cy, x2, y2)
    const distanceRightTopCenterCircle = Math.sqrt( (distX*distX) + (distY*distY) );
    distX = (cx-x3);
    distY = (cy-y3);
   // p.line(cx, cy, x3, y3)
    const distanceLeftBottomCenterCircle = Math.sqrt( (distX*distX) + (distY*distY) );
    distX = (cx-x4);
    distY = (cy-y4);
   // p.line(cx, cy, x4, y4)
    const distanceRightBottomCenterCircle = Math.sqrt( (distX*distX) + (distY*distY) );

    //x1 = x3 and x2 = y4
    if(cx < x1 || cx > x2) {
      return false;
    }

    const yTop = Math.min(y1, y2);
    const yBottom = Math.max(y3, y4);

    if(cy < yTop || cy > yBottom) {
      return false;
    }

    return (
      distanceLeftTopCenterCircle > radius &&
      distanceRightTopCenterCircle > radius &&
      distanceLeftBottomCenterCircle > radius &&
      distanceRightBottomCenterCircle > radius 
    );

}