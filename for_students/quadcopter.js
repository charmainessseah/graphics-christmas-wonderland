import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {
  MeshBasicMaterial,
  Object3D,
} from "../libs/CS559-Three/build/three.module.js";
let quadcopterCount = 0;

export class Quadcopter extends GrObject {
  constructor(params = {}) {
    function drawAircraft(
      group,
      frontConeColor,
      bodyColor,
      backConeColor,
      armColor,
      ringColor,
      propellerColor
    ) {
      // cylinder body
      let material = new T.MeshStandardMaterial({ color: bodyColor });
      let cylinderGeom = new T.CylinderGeometry(0.5, 1, 2, 8);
      let cylinderMesh = new T.Mesh(cylinderGeom, material);
      cylinderMesh.translateY(2);
      cylinderMesh.rotateX(Math.PI / 2);

      // cone front
      let materialFront = new T.MeshStandardMaterial({ color: frontConeColor });
      let coneGeomFront = new T.ConeGeometry(0.5, 0.7, 8, 1);
      let coneFrontMesh = new T.Mesh(coneGeomFront, materialFront);
      coneFrontMesh.translateY(1.35);
      cylinderMesh.add(coneFrontMesh);

      // cone back
      let material2 = new T.MeshStandardMaterial({ color: backConeColor });
      let coneGeomBack = new T.ConeGeometry(1, 0.5, 8, 1);
      let coneBackMesh = new T.Mesh(coneGeomBack, material2);
      coneBackMesh.translateY(-1.25);
      coneBackMesh.rotateX(Math.PI);
      cylinderMesh.add(coneBackMesh);

      // arm
      let armMaterial = new T.MeshStandardMaterial({ color: armColor });
      let arm1Geom = new T.BoxGeometry(0.1, 0.1, 1.5);
      let arm1 = new T.Mesh(arm1Geom, armMaterial);
      arm1.translateZ(-1);
      cylinderMesh.add(arm1);

      // ring 1
      let ringMaterial = new T.MeshStandardMaterial({ color: ringColor });
      let ringGeom1 = new T.RingGeometry(1, 0.8, 30);
      let ringMesh1 = new T.Mesh(ringGeom1, ringMaterial);
      ringMesh1.translateZ(-1.7);
      ringMesh1.translateX(-0.9);
      cylinderMesh.add(ringMesh1);

      // ring 2
      let ringGeom2 = new T.RingGeometry(1, 0.8, 30);
      let ringMesh2 = new T.Mesh(ringGeom2, ringMaterial);
      ringMesh2.translateZ(-1.7);
      ringMesh2.translateX(0.9);
      cylinderMesh.add(ringMesh2);

      // propeller 1
      let propMaterial = new T.MeshStandardMaterial({ color: propellerColor });
      let prop1Geom1 = new T.BoxGeometry(0.05, 0.05, 1.3);
      let prop1First = new T.Mesh(prop1Geom1, propMaterial);
      prop1First.translateZ(-1.7);
      prop1First.translateX(-0.9);
      prop1First.rotateX(Math.PI / 2);
      cylinderMesh.add(prop1First);

      let prop1Geom2 = new T.BoxGeometry(0.05, 0.05, 1.3);
      let prop1Second = new T.Mesh(prop1Geom2, propMaterial);
      prop1Second.translateZ(-1.7);
      prop1Second.translateX(-0.9);
      prop1Second.rotateX(Math.PI / 2);
      prop1Second.rotateY(Math.PI / 2);
      cylinderMesh.add(prop1Second);

      // propeller 2
      let prop2Geom1 = new T.BoxGeometry(0.05, 0.05, 1.3);
      let prop2First = new T.Mesh(prop2Geom1, propMaterial);
      prop2First.translateZ(-1.7);
      prop2First.translateX(0.9);
      prop2First.rotateX(Math.PI / 2);
      cylinderMesh.add(prop2First);

      let prop2Geom2 = new T.BoxGeometry(0.05, 0.05, 1.3);
      let prop2Second = new T.Mesh(prop2Geom2, propMaterial);
      prop2Second.translateZ(-1.7);
      prop2Second.translateX(0.9);
      prop2Second.rotateX(Math.PI / 2);
      prop2Second.rotateY(Math.PI / 2);
      cylinderMesh.add(prop2Second);

      group.add(cylinderMesh);
      return [prop1First, prop1Second, prop2First, prop2Second, cylinderMesh];
    }

    let copter = new T.Group();

    let [prop1First, prop1Second, prop2First, prop2Second, mesh] = drawAircraft(
      copter,
      "violet",
      "yellow",
      "gray",
      "green",
      "blue",
      "cyan"
    );
    copter.translateY(12);
    copter.scale.set(1.5, 1.5, 1.5);
    // THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);
    super(`Quadcopter-${quadcopterCount++}`, copter);
    this.time = 0;
    this.prop1First = prop1First;
    this.prop1Second = prop1Second;
    this.prop2First = prop2First;
    this.prop2Second = prop2Second;
    this.mesh = mesh;
    this.rideable = this.mesh;
  }

  stepWorld(step, timeOfDay) {
    this.time += step; // time in seconds
    let theta = this.time / 1000;
    let x = 3 * Math.cos(theta);
    let z = 3 * Math.sin(theta);

    // prop animation aircraft 1
    this.prop1First.rotateY(step * 0.1);
    this.prop1Second.rotateY(step * 0.1);
    this.prop2First.rotateY(step * 0.1);
    this.prop2Second.rotateY(step * 0.1);

    this.mesh.position.x = x;
    this.mesh.position.z = z;
    this.mesh.lookAt(new T.Vector3(0, -20, 0));
    this.mesh.rotateZ(-2);
    // this.mesh.up.set(new T.Vector3(0, 1, 0));
  }
}
