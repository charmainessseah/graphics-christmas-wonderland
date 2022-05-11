import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let count = 0;
export class Arc extends GrObject {
  constructor(params = {}) {
    const geometry = new T.TorusGeometry(5, 0.3, 30, 200, 3.1);
    const arc = new T.Mesh(geometry, params.material);
    arc.translateZ(15);

    super(`Arc-${count++}`, arc);
  }
}
