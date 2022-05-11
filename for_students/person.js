import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { PlaneBufferGeometry } from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let personCount = 0;
export class Person extends GrObject {
  constructor(params = {}) {
    let person = new T.Group();
    let loader = new OBJLoader();
    let personMaterial = new T.MeshStandardMaterial({
      color: params.color,
    });

    loader.load("./objects/person.obj", function (object) {
      object.position.set(params.x, params.y, params.z);
      object.rotation.y = params.rotation;
      object.scale.set(0.8, 0.8, 0.8);
      person.add(object);

      object.traverse(function (child) {
        if (child instanceof T.Mesh) {
          child.material = personMaterial;
        }
      });
    });

    // person.position.set(2, 5, 2);
    // person.scale.set(2, 2, 2);

    super(`Person-${personCount++}`, person);
  }
}
