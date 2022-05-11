import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
let count = 0;
export class PyramidHouse extends GrObject {
  constructor(params = {}) {
    let geometry = new T.BufferGeometry();
    const vertices = [
      // front, left triangle
      { pos: [-1, 0, 1], norm: [0, 0, 1], uv: [0, 0] }, // bottom left
      { pos: [1, 0, 1], norm: [0, 0, 1], uv: [1, 0] }, // bottom right
      { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] }, // top left
      // front, right triangle
      { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] }, // top left
      { pos: [1, 0, 1], norm: [0, 0, 1], uv: [1, 0] }, // bottom right
      { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1] }, // top right
      // right, left triangle
      { pos: [1, 0, 1], norm: [1, 0, 0], uv: [0, 0] }, // bottom left
      { pos: [1, 0, -1], norm: [1, 0, 0], uv: [0, 0] }, // bottom right
      { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 0] }, // top left
      // right, right triangle
      { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 0] }, // top left
      { pos: [1, 0, -1], norm: [1, 0, 0], uv: [0, 0] }, // bottom right
      { pos: [1, 1, -1], norm: [1, 0, 0], uv: [0, 0] }, // top right
      // back
      { pos: [1, 0, -1], norm: [0, 0, -1], uv: [0, 0] }, // bottom left
      { pos: [-1, 0, -1], norm: [0, 0, -1], uv: [0, 0] }, // bottom right
      { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 0] }, // top left

      { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 0] }, // top left
      { pos: [-1, 0, -1], norm: [0, 0, -1], uv: [0, 0] }, // bottom right
      { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [0, 0] }, // top right
      // left, left triangle
      { pos: [-1, 0, -1], norm: [-1, 0, 0], uv: [0, 0] }, // bottom left
      { pos: [-1, 0, 1], norm: [-1, 0, 0], uv: [0, 0] }, // bottom right
      { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 0] }, // top left
      // left, right triangle
      { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 0] }, // top left
      { pos: [-1, 0, 1], norm: [-1, 0, 0], uv: [0, 0] }, // bottom right
      { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [0, 0] }, // top right
      // top face, left triangle
      { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0] }, // bottom left
      { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [0, 0] }, // bottom right
      { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 0] }, // top left
      // top face, right triangle
      { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 0] }, // top left
      { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [0, 0] }, //bottom right
      { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [0, 0] }, // top right
      // bottom face, left triangle
      { pos: [1, 0, 1], norm: [0, -1, 0], uv: [0, 0] }, // bottom left
      { pos: [-1, 0, 1], norm: [0, -1, 0], uv: [0, 0] }, // bottom right
      { pos: [1, 0, -1], norm: [0, -1, 0], uv: [0, 0] }, // top left

      { pos: [1, 0, -1], norm: [0, -1, 0], uv: [0, 0] }, // top left
      { pos: [-1, 0, 1], norm: [0, -1, 0], uv: [0, 0] }, // bottom right
      { pos: [-1, 0, -1], norm: [0, -1, 0], uv: [0, 0] }, // top right
    ];
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
      positions.push(...vertex.pos);
      normals.push(...vertex.norm);
      uvs.push(...vertex.uv);
    }
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
      "position",
      new T.BufferAttribute(new Float32Array(positions), positionNumComponents)
    );
    geometry.setAttribute(
      "normal",
      new T.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    geometry.setAttribute(
      "uv",
      new T.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );

    let details = new T.TextureLoader().load("./shop-front.jpg");
    let material = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.75,
      map: details,
    });
    const mesh = new T.Mesh(geometry, material);

    const roofGeom = new T.CylinderGeometry(1.45, 0, 1, 4);
    const roofMaterial = new T.MeshBasicMaterial({ color: "#AD2323" });
    const roof = new T.Mesh(roofGeom, roofMaterial);
    roof.rotateX(Math.PI);
    roof.rotateY(Math.PI / 4);
    roof.translateY(-1.5);
    mesh.add(roof);

    mesh.translateX(params.x);
    mesh.translateY(params.y);
    mesh.translateZ(params.z);
    mesh.rotateY(Math.PI / 2);
    mesh.scale.set(3, 3, 3);
    super(`PyramidHouse-${count++}`, mesh);
  }
}
