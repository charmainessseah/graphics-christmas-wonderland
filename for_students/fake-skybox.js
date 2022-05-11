import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class FakeSkyBox extends GrObject {
  constructor() {
    let backgroundImage = new T.TextureLoader().load("./wallpaper.jpg");
    const material = new T.MeshBasicMaterial({
      color: "white",
      map: backgroundImage,
      side: T.DoubleSide,
    });
    let skyboxGeo = new T.BoxGeometry(1000, 1000, 1000);
    let mesh = new T.Mesh(skyboxGeo, material);

    super("skybox1", mesh);
  }
}
