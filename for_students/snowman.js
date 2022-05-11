/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: adapted from the original C++ Graphics Town
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {
  MeshBasicMaterial,
  Object3D,
} from "../libs/CS559-Three/build/three.module.js";

let snowmanCount = 0;
export class Snowman extends GrObject {
  constructor(params = {}) {
    function drawSphere(
      radius,
      width,
      height,
      translateX,
      translateY,
      translateZ,
      color,
      emissive
    ) {
      let geometry = new T.SphereBufferGeometry(radius, width, height);
      let material = new T.MeshStandardMaterial({
        color: color,
        emissive: emissive,
      });
      let object = new T.Mesh(geometry, material);
      object.translateY(translateY);
      object.translateZ(translateZ);
      object.translateX(translateX);
      return object;
    }
    let snowman = new T.Group();
    let bodyBottom = drawSphere(1.5, 20, 20, 0, 1.5, 0, "white", "cyan");
    snowman.add(bodyBottom);
    let bodyMiddle = drawSphere(1, 20, 20, 0, 3.6, 0, "white", "cyan");
    snowman.add(bodyMiddle);
    let bodyTop = drawSphere(0.8, 20, 20, 0, 5, 0, "white", "cyan");
    snowman.add(bodyTop);
    bodyMiddle.add(drawSphere(0.1, 20, 20, 0, 0.3, 1, "green", ""));
    bodyMiddle.add(drawSphere(0.1, 20, 20, 0, -0.1, 1, "red", ""));

    // arms
    let arm1 = new T.BoxGeometry(0.1, 1.5, 0.1);
    let leftArm = new T.Mesh(arm1, new MeshBasicMaterial({ color: "#AD6C40" }));
    leftArm.translateX(1);
    leftArm.rotateZ((Math.PI * 3) / 4);
    bodyMiddle.add(leftArm);

    let arm2 = new T.BoxGeometry(0.1, 1.5, 0.1);
    let rightArm = new T.Mesh(
      arm2,
      new MeshBasicMaterial({ color: "#AD6C40" })
    );
    rightArm.translateX(-1);
    rightArm.rotateZ((5 * Math.PI) / 4);
    bodyMiddle.add(rightArm);

    // snowman face
    bodyTop.add(drawSphere(0.1, 20, 20, -0.2, 0.3, 0.8, "#28252D", "")); // left eye
    bodyTop.add(drawSphere(0.1, 20, 20, 0.2, 0.3, 0.8, "#28252D", "")); // right eye

    // nose
    const geometry4 = new T.ConeGeometry(0.2, 1, 5);
    const material4 = new T.MeshBasicMaterial({ color: "orange" });
    const mouth = new T.Mesh(geometry4, material4);
    bodyTop.add(mouth);
    mouth.translateZ(0.8);
    mouth.rotateX(Math.PI / 2);

    // mouth
    bodyTop.add(drawSphere(0.05, 20, 20, -0.4, -0.2, 0.8, "gray", ""));
    bodyTop.add(drawSphere(0.05, 20, 20, -0.15, -0.3, 0.8, "gray", ""));
    bodyTop.add(drawSphere(0.05, 20, 20, 0.1, -0.3, 0.8, "gray", ""));
    bodyTop.add(drawSphere(0.05, 20, 20, 0.35, -0.2, 0.8, "gray", ""));

    // hat ring
    const geometry5 = new T.RingGeometry(0, 1, 32);
    const material5 = new T.MeshBasicMaterial({
      color: "red",
      side: T.DoubleSide,
    });
    const mesh = new T.Mesh(geometry5, material5);
    mesh.rotateX(Math.PI / 2);
    mesh.translateZ(-0.65);
    bodyTop.add(mesh);

    // hat top
    const geometry6 = new T.CylinderGeometry(0.5, 0.5, 1, 32);
    const material6 = new T.MeshBasicMaterial({ color: "green" });
    const cylinder = new T.Mesh(geometry6, material6);
    cylinder.translateY(1);
    bodyTop.add(cylinder);

    snowman.scale.set(params.scale, params.scale, params.scale);
    snowman.position.set(params.x, params.y, params.z);
    super(`Snowman-${snowmanCount++}`, snowman);

    this.time = 0;
    this.snowman = snowman;
    this.leftArm = leftArm;
    this.rightArm = rightArm;
    this.leftArmState = "up";
    this.rightArmState = "up";
    this.dir = params.dir;
  }

  stepWorld(step, timeOfDay) {
    this.time += step / 1000; // time in seconds

    // now we just need to draw the scene with the camera
    if (this.leftArmState === "up") {
      if (this.leftArm.rotation.z > (Math.PI * 3) / 4) {
        this.leftArmState = "down";
      } else {
        this.leftArm.rotateZ(0.005);
      }
    }
    if (this.leftArmState === "down") {
      if (this.leftArm.rotation.z < Math.PI / 4) {
        this.leftArmState = "up";
      } else {
        this.leftArm.rotateZ(-0.005);
      }
    }

    if (this.rightArmState === "up") {
      if (this.rightArm.rotation.z > -Math.PI / 4) {
        this.rightArmState = "down";
      } else {
        this.rightArm.rotateZ(0.005);
      }
    }
    if (this.rightArmState === "down") {
      if (this.rightArm.rotation.z < (-Math.PI * 3) / 4) {
        this.rightArmState = "up";
      } else {
        this.rightArm.rotateZ(-0.005);
      }
    }

    if (this.dir === "left") {
      this.snowman.rotateY(step * -0.005);
    } else {
      this.snowman.rotateY(step * 0.005);
    }
  }
}
