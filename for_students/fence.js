import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let fenceCount = 0;

export class Fence extends GrObject {
  constructor(params = {}) {
    const geometry = new T.PlaneGeometry(params.height, params.width);
    let t1 = new T.TextureLoader().load("./images/fence.jpg");
    let m1 = new T.MeshBasicMaterial({ map: t1, side: T.DoubleSide });
    const plane = new T.Mesh(geometry, m1);
    plane.position.set(params.x, params.y, params.z);
    if (params.pos === "left" || params.pos === "right") {
      plane.rotateY(Math.PI / 2);
    }

    super(`Fence-${fenceCount++}`, plane);
  }
}
