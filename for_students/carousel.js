import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let carouselObCtr = 0;
// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    let width = 3;
    let carousel = new T.Group();

    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8,
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8,
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5,
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5,
    });
    let opole;
    let num_poles = 10;
    let poles = [];

    let horse_geom = new T.BoxGeometry(0.5, 0.5, 0.5);
    let horse_mat = new T.MeshStandardMaterial({
      color: "red",
    });
    let horse;
    let num_horses = 10;
    let horses = [];
    let states = [];

    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      horse = new T.Mesh(horse_geom, horse_mat);
      platform_group.add(opole);
      platform_group.add(horse);
      opole.translateY(1.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      poles.push(opole);
      horse.translateY(1.5);
      horse.rotateY((2 * i * Math.PI) / num_horses);
      horse.translateX(0.8 * width);
      horses.push(horse);
      if (i % 2 == 0) {
        states.push("dec");
      } else {
        states.push("inc");
      }
    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(4.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel-${carouselObCtr++}`, carousel);
    this.whole_ob = carousel;
    this.platform = platform_group;
    this.poles = poles;
    this.horses = horses;
    this.states = states;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);
  }

  /**
   * StepWorld Method
   * @param {*} delta
   * @param {*} timeOfDay
   */
  stepWorld(delta, timeOfDay) {
    let minY = 0.5;
    let maxY = 2;
    for (let i = 0; i < this.horses.length; i++) {
      let currState = this.states[i];
      let currY = this.horses[i].position.y;
      if (currState == "dec") {
        if (currY < minY) {
          this.states[i] = "inc";
        } else {
          this.horses[i].translateY(-0.01);
        }
      }

      if (currState == "inc") {
        if (currY > maxY) {
          this.states[i] = "dec";
        } else {
          this.horses[i].translateY(0.01);
        }
      }
    }

    this.platform.rotateY(0.003 * delta);
  }
}
