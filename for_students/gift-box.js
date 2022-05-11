import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let giftCount = 0;
export class Gift extends GrObject {
  constructor(params = {}) {
    let gift = new T.Group();
    let giftTexture = new T.TextureLoader().load("./images/gift.jpg");
    let giftMat = new T.MeshBasicMaterial({
      map: giftTexture,
      side: T.DoubleSide,
    });
    let boxGeom = new T.BoxGeometry(4.5, 4.5, 4.5);
    const giftbox = new T.Mesh(boxGeom, giftMat);
    giftbox.position.set(params.x, params.y, params.z);
    gift.add(giftbox);

    const geometry = new T.TorusKnotGeometry(1.5, 0.1, 100, 16, 1, 8);
    const material = new T.MeshBasicMaterial({ color: "red" });
    const ribbon = new T.Mesh(geometry, material);
    ribbon.translateY(2.7);
    giftbox.add(ribbon);
    giftbox.scale.set(0.8, 0.8, 0.8);
    super(`Gift-${giftCount++}`, gift);

    this.giftbox = gift;
    this.dirHor = "left";
    this.dirVert = "down";
    this.state = "hor";
  }

  stepWorld(step) {
    if (this.state === "hor") {
      if (this.dirHor === "left") {
        if (this.giftbox.position.x < -10) {
          this.dirHor = "right";
          this.state = "vert";
        } else {
          this.giftbox.translateX(step * -0.01);
        }
      }
      if (this.dirHor === "right") {
        if (this.giftbox.position.x > 38) {
          this.dirHor = "left";
          this.state = "vert";
        } else {
          this.giftbox.translateX(step * 0.01);
        }
      }
    }
    if (this.state === "vert") {
      if (this.dirVert === "down") {
        if (this.giftbox.position.y < -10) {
          this.dirVert = "up";
        } else {
          this.giftbox.translateY(step * -0.01);
        }
      }
      if (this.dirVert === "up") {
        if (this.giftbox.position.y > 0) {
          this.dirVert = "down";
          this.state = "hor";
        } else {
          this.giftbox.translateY(step * 0.01);
        }
      }
    }
  }
}
