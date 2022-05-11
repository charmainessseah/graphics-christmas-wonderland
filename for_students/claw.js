import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let count = 0;
export class Claw extends GrObject {
  constructor() {
    function drawBaseLeg(claw, rotation, x, y, z) {
      let legGeom = new T.BoxGeometry(0.4, 11, 0.4);
      let mat = new T.MeshBasicMaterial({ color: "orange" });
      let leg = new T.Mesh(legGeom, mat);
      leg.position.set(x, y, z);
      leg.rotateZ(rotation);
      claw.add(leg);
    }

    function drawSeat(circle, x, y, z) {
      let seatGeom = new T.BoxGeometry(0.7, 0.3, 0.7);
      let seatMat = new T.MeshBasicMaterial({ color: "red" });
      let seat = new T.Mesh(seatGeom, seatMat);
      seat.translateX(x);
      seat.translateY(y);
      seat.translateZ(z);
      circle.add(seat);
    }

    function drawStripes(circle, rotation, x, y, z) {
      let stripeGeom = new T.BoxGeometry(0.1, 0.3, 1.7);
      let stripeMat = new T.MeshBasicMaterial({ color: "red" });
      let stripe = new T.Mesh(stripeGeom, stripeMat);
      stripe.translateZ(z);
      stripe.translateY(y);
      stripe.translateX(x);
      stripe.rotateY(rotation);
      circle.add(stripe);
    }

    let claw = new T.Group();

    // center sphere
    let centerGeom = new T.SphereGeometry(1, 32, 16);
    let mat = new T.MeshBasicMaterial({ color: "blue" });
    let center = new T.Mesh(centerGeom, mat);
    center.position.set(-10, 10, -10);
    claw.add(center);

    drawBaseLeg(claw, Math.PI / 8, -7.5, 5, -10);
    drawBaseLeg(claw, -Math.PI / 8, -12.5, 5, -10);
    claw.rotateY(Math.PI / 2);
    claw.translateX(18);

    // middle arm
    let armGeom = new T.BoxGeometry(0.3, 7.8, 0.4);
    let arm = new T.Mesh(armGeom, mat);
    arm.translateY(-4);
    center.add(arm);

    let circleGeom = new T.ConeGeometry(3, 1, 8);
    let circleMat = new T.MeshBasicMaterial({ color: "cyan" });
    let circle = new T.Mesh(circleGeom, circleMat);
    circle.rotateX(Math.PI);
    circle.translateY(4.5);
    arm.add(circle);

    // drawSeat(circle, 0, -0.5, 1.9);
    drawStripes(circle, 0, 0, -0.5, 1.5);
    drawStripes(circle, Math.PI / 2, 1.5, -0.5, 0);
    drawStripes(circle, Math.PI / 2, -1.5, -0.5, 0);
    drawStripes(circle, 0, 0, -0.5, -1.5);

    super(`GyroSwing-${count++}`, claw);
    this.center = center;
    this.swing_angle = 0;
    this.swing_max_rotation = Math.PI / 3;
    this.swing_direction = 1;
    this.circle = circle;
  }

  stepWorld(step, timeofday) {
    if (this.center.rotation.x >= this.swing_max_rotation)
      this.swing_direction = -1;
    else if (this.center.rotation.x <= -this.swing_max_rotation)
      this.swing_direction = 1;
    this.center.rotation.x += this.swing_direction * 0.001 * step;
    this.circle.rotateY(step * 0.01);
  }
}
