/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: adapted from the original C++ Graphics Town
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {
  MeshBasicMaterial,
  Object3D,
} from "../libs/CS559-Three/build/three.module.js";
let treeCount = 0;

export class Tree extends GrObject {
  constructor(params = {}) {
    let tree = new T.Group();

    let trunkGeom = new T.BoxGeometry(0.7, 5, 1);
    let trunkMesh = new T.Mesh(
      trunkGeom,
      new T.MeshBasicMaterial({ color: "brown" })
    );
    tree.add(trunkMesh);

    let t1 = new T.TextureLoader().load("./christmas-tree.jpg");
    let m1 = new T.MeshBasicMaterial({ map: t1 });
    // @@Snippet:end
    let topGeom = new T.ConeGeometry(2, 5, 64, 64);
    let topMesh = new T.Mesh(topGeom, m1);
    let bottomGeom = new T.ConeGeometry(3, 7, 64, 64);
    let bottomMesh = new T.Mesh(bottomGeom, m1);
    bottomMesh.translateY(4);
    tree.add(bottomMesh);
    topMesh.translateY(3);
    bottomMesh.add(topMesh);

    if (params.scale) {
      tree.scale.set(params.scale, params.scale, params.scale);
    }
    tree.position.set(params.x, params.y, params.z);
    tree.rotateY(Math.PI);
    super(`Tree-${treeCount++}`, tree);

    this.time = 0;
    this.tree = tree;
  }

  stepWorld(step, timeOfDay) {
    this.time += step / 1000; // time in seconds
  }
}

let numPlants = 0;
export class SmallTree extends GrObject {
  constructor(params = {}) {
    const geometry = new T.ConeGeometry(0.4, 0.9, 32);
    const material = new T.MeshBasicMaterial({ color: params.color });
    const plant = new T.Mesh(geometry, material);
    plant.position.x = params.x;
    plant.position.y = params.y;
    plant.position.z = params.z;

    let trunkGeom = new T.BoxGeometry(0.1, 0.6, 0.1);
    let mat = new T.MeshBasicMaterial({ color: "#AD6200" });
    let treeTrunk = new T.Mesh(trunkGeom, mat);
    treeTrunk.translateY(-0.7);
    plant.add(treeTrunk);
    plant.scale.set(params.scale, params.scale, params.scale);
    super(`Plant-${numPlants++}`, plant);
  }
}
