
// POINT/CIRCLE
function pointCircle(px: number, py: number, cx: number, cy: number, r: number) :boolean {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  float distX = px - cx;
  float distY = py - cy;
  float distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}

// LINE/CIRCLE
export function lineCircle(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, r: number): boolean {

  // is either end INSIDE the circle?
  // if so, return true immediately
  const inside1 = pointCircle(x1,y1, cx,cy,r);
  const inside2 = pointCircle(x2,y2, cx,cy,r);
  if (inside1 || inside2) return true;

  // get length of the line
  const distX = x1 - x2;
  const distY = y1 - y2;
  const len = Math.sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  const  dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

  // find the closest point on the line
  const closestX = x1 + (dot * (x2-x1));
  const closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  const onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) return false;

  // optionally, draw a circle at the closest
  // point on the line
  //fill(255,0,0);
  //noStroke();
  //ellipse(closestX, closestY, 20, 20);

  // get distance to closest point
  const distX = closestX - cx;
  const distY = closestY - cy;
  const distance = sqrt( (distX*distX) + (distY*distY) );

  if (distance <= r) {
    return true;
  }
  return false;
}