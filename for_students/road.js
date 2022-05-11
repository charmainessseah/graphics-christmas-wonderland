import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { PlaneBufferGeometry } from "../libs/CS559-Three/build/three.module.js";

export class Road extends GrObject {
  constructor() {
    let roadTexture = new T.TextureLoader().load("./road.jpg");
    const geometry = new T.PlaneGeometry(40, 5);
    let mat = new T.MeshBasicMaterial({ map: roadTexture, side: T.DoubleSide });
    let plane = new T.Mesh(geometry, mat);
    plane.translateZ(17.5);
    plane.translateY(0.1);
    plane.rotateX(Math.PI / 2);

    super("road", plane);
  }
}
