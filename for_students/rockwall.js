import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class RockWall extends GrObject {
  constructor() {
    let wallTexture = new T.TextureLoader().load("./images/rock-wall.jpg");
    const geometry = new T.PlaneGeometry(10, 5);
    let mat = new T.MeshBasicMaterial({ map: wallTexture });
    let wall = new T.Mesh(geometry, mat);
    // plane.translateZ(17.5);
    // plane.translateY(0.1);
    // plane.rotateX(Math.PI / 2);

    super("wall", wall);
  }
}
