import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let simplecount = 0;
export class GrSeesaw extends GrObject {
  constructor(params = {}) {
    let boardState = "inc";
    let geom = new T.CylinderGeometry(0.5, 0.5, 0.5, 3);
    let mesh = new T.Mesh(geom, new T.MeshStandardMaterial({ color: "gray" }));
    mesh.position.x = params.x;
    mesh.position.z = params.z;
    mesh.position.y = 0.4;
    mesh.rotateX(-Math.PI / 2);

    let boardGeom = new T.BoxGeometry(1, 5, 0.1);
    let boardMesh = new T.Mesh(
      boardGeom,
      new T.MeshStandardMaterial({ color: "#E639EE" })
    );
    boardMesh.position.x = params.x - 2;
    boardMesh.position.z = 0.5;
    boardMesh.position.y = 0;
    boardMesh.rotateZ(Math.PI / 2);

    mesh.add(boardMesh);
    super(`seesaw-${simplecount++}`, mesh);
    this.mesh = mesh;
    this.boardMesh = boardMesh;
    this.boardState = "dec";

    let handle_geom = buildHandle();
    let handle_mat = new T.MeshStandardMaterial({
      color: "#999999",
      metalness: 0.8,
      roughness: 0.2,
    });
    let handle = new T.Mesh(handle_geom, handle_mat);
    boardMesh.add(handle);
    handle.rotateX(Math.PI / 2);
    handle.scale.set(0.8, 0.8, 0.8);
    handle.translateZ(-1.3);

    let handle2 = new T.Mesh(handle_geom, handle_mat);
    boardMesh.add(handle2);
    handle2.rotateX(Math.PI / 2);
    handle2.scale.set(0.8, 0.8, 0.8);
    handle2.translateZ(1.3);

    function buildHandle() {
      /**@type THREE.CurvePath */
      let handle_curve = new T.CurvePath();
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0))
      );
      handle_curve.add(
        new T.CubicBezierCurve3(
          new T.Vector3(-0.5, 0.8, 0),
          new T.Vector3(-0.5, 1, 0),
          new T.Vector3(0.5, 1, 0),
          new T.Vector3(0.5, 0.8, 0)
        )
      );
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0))
      );
      return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
    }
  }

  stepWorld(step, timeOfDay) {
    if (this.boardState == "inc") {
      if (this.boardMesh.rotation.y >= 0.3) {
        this.boardState = "dec";
      } else {
        this.boardMesh.rotation.y += step * 0.001;
      }
    }
    if (this.boardState == "dec") {
      if (this.boardMesh.rotation.y <= -0.3) {
        this.boardState = "inc";
      } else {
        this.boardMesh.rotation.y -= step * 0.001;
      }
    }
  }
}
