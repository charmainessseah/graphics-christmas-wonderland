import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let carCount = 0;
export class Car extends GrObject {
  constructor(params = {}) {
    function drawWheel() {
      const wheelGeom = new T.SphereGeometry(0.2, 32, 16);
      const material = new T.MeshBasicMaterial({ color: "#353731" });
      const wheel = new T.Mesh(wheelGeom, material);
      return wheel;
    }
    let mat = new T.MeshStandardMaterial({ color: params.color });
    let baseGeom = new T.BoxGeometry(1.5, 0.1, 0.8);
    let baseMesh = new T.Mesh(baseGeom, mat);

    let bodyFrontGeom = new T.BoxGeometry(0.5, 0.4, 0.8);
    let bodyFront = new T.Mesh(bodyFrontGeom, mat);
    bodyFront.translateX(-0.5);
    bodyFront.translateY(0.2);
    baseMesh.add(bodyFront);

    let bodyBackGeom = new T.BoxGeometry(0.5, 0.4, 0.8);
    let bodyBack = new T.Mesh(bodyBackGeom, mat);
    bodyBack.translateX(0.5);
    bodyBack.translateY(0.2);
    baseMesh.add(bodyBack);

    let bodyLeftGeom = new T.BoxGeometry(0.5, 0.4, 0.05);
    let bodyLeft = new T.Mesh(bodyLeftGeom, mat);
    bodyLeft.translateY(0.2);
    bodyLeft.translateZ(0.375);
    baseMesh.add(bodyLeft);

    let bodyRightGeom = new T.BoxGeometry(0.5, 0.4, 0.05);
    let bodyRight = new T.Mesh(bodyRightGeom, mat);
    bodyRight.translateY(0.2);
    bodyRight.translateZ(-0.375);
    baseMesh.add(bodyRight);

    let screenGeom = new T.BoxGeometry(0.01, 0.3, 0.8);
    let screenMat = new T.MeshBasicMaterial({
      color: "grey",
      opacity: 0.5,
    });
    let screenMesh = new T.Mesh(screenGeom, screenMat);
    screenMesh.translateY(0.54);
    screenMesh.translateX(-0.2);
    screenMesh.rotateZ(-0.4);
    baseMesh.add(screenMesh);

    baseMesh.translateY(0.4);

    let wheel1 = drawWheel();
    wheel1.translateZ(0.3);
    wheel1.translateX(-0.5);
    baseMesh.add(wheel1);

    let wheel2 = drawWheel();
    wheel2.translateZ(0.3);
    wheel2.translateX(0.5);
    baseMesh.add(wheel2);

    let wheel3 = drawWheel();
    wheel3.translateZ(-0.3);
    wheel3.translateX(-0.5);
    baseMesh.add(wheel3);

    let wheel4 = drawWheel();
    wheel4.translateZ(-0.3);
    wheel4.translateX(0.5);
    baseMesh.add(wheel4);

    baseMesh.scale.set(2, 2, 2);
    baseMesh.position.set(params.x, params.y, params.z);
    super(`Car-${carCount++}`, baseMesh);
    this.xPos = params.x;
    this.car = baseMesh;
    this.mat = mat;
  }

  // goal: animate it such that it resets position to the right and moves left over and over
  stepWorld(delta, timeOfDay) {
    this.car.position.x -= delta * 0.01;
    if (this.car.position.x < -18) {
      this.car.position.x = 18;
      // let num1 = Math.random();
      // let num2 = Math.random();
      // let num3 = Math.random();
      // this.car.color = `rgb(${num1}, ${num2}, ${num3})`;
      // this.mat.color = "blue";
    }
  }
}
