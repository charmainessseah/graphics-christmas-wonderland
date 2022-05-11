/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

import { main } from "../examples/main.js";

import { Snowman } from "./snowman.js";
import { Tree, SmallTree } from "./tree.js";

import { CircularTrack, TrackCube, TrackCar } from "../examples/track.js";
import { GrCarousel } from "./carousel.js";
import { GrColoredRoundabout } from "./roundabout.js";
import { GrAdvancedSwing } from "./swing.js";
import { GrSeesaw } from "./seesaw.js";
import { Car } from "./car.js";
import { FakeSkyBox } from "./fake-skybox.js";
import { Fence } from "./fence.js";
import { Road } from "./road.js";
import { Arc } from "./arc.js";
import { Quadcopter } from "./quadcopter.js";
import { RockWall } from "./rockwall.js";
import { Claw } from "./claw.js";
import { PyramidHouse } from "./pyramidHouse.js";
import { GableHouse } from "./gableHouse.js";
import { Person } from "./person.js";
import { Gift } from "./gift-box.js";
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
  width: 800,
  height: 600,
  groundplanesize: 20, // make the ground plane big enough for a world of stuff
  groundplanecolor: "white",
  lookat: new T.Vector3(0, 3, 0),
});

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
// main(world);
// world.add(new SimpleCube());
let skybox = new FakeSkyBox();
world.add(skybox);

world.add(new Snowman({ scale: 0.8, x: -17, y: 0, z: -17, dir: "left" }));
world.add(new Snowman({ scale: 0.8, x: -12, y: 0, z: -17, dir: "right" }));
world.add(new Snowman({ scale: 0.8, x: -7, y: 0, z: -17, dir: "left" }));
world.add(new Snowman({ scale: 0.8, x: -2, y: 0, z: -17, dir: "right" }));
world.add(new Snowman({ scale: 0.8, x: 3, y: 0, z: -17, dir: "left" }));
world.add(new Snowman({ scale: 0.8, x: 8, y: 0, z: -17, dir: "right" }));
world.add(new Snowman({ scale: 0.8, x: 13, y: 0, z: -17, dir: "left" }));
world.add(new Snowman({ scale: 0.8, x: 18, y: 0, z: -17, dir: "right" }));

world.add(new Tree({ scale: 1, x: 0, y: 2.4, z: 0 }));
// world.add(new Tree({ scale: 0.5, x: -17, y: 1.1, z: -17 }));
// world.add(new Tree({ scale: 0.5, x: -17, y: 1.1, z: -12 }));
// world.add(new Tree({ scale: 0.5, x: -17, y: 1.1, z: -7 }));

let track = new CircularTrack({ x: 10, z: -8 });
let tc3 = new TrackCar(track);
tc3.setScale(2);
world.add(track);
world.add(tc3);

let carousel = new GrCarousel({ x: 10, z: -8 });
world.add(carousel);

let roundabout = new GrColoredRoundabout({ x: 15, z: 5 });
world.add(roundabout);

let swing = new GrAdvancedSwing({ x: 8, z: 5 });
world.add(swing);

let plant1 = new SmallTree({
  x: 10,
  y: 3,
  z: 1.3,
  color: "#4EAD00",
  scale: 3,
});

world.add(plant1);
let plant2 = new SmallTree({ x: 17, y: 3, z: 13, color: "#4EAD00", scale: 3 });
world.add(plant2);
let plant3 = new SmallTree({
  x: 16,
  y: 3,
  z: 0,
  color: "#4EAD00",
  scale: 3,
});
world.add(plant3);
let plant4 = new SmallTree({
  x: -17,
  y: 3,
  z: -13,
  color: "#4EAD00",
  scale: 3,
});
world.add(plant4);
let plant5 = new SmallTree({
  x: -16,
  y: 3,
  z: -4,
  color: "#4EAD00",
  scale: 3,
});
world.add(plant5);
let plant6 = new SmallTree({
  x: -3,
  y: 3,
  z: -13,
  color: "#4EAD00",
  scale: 3,
});
world.add(plant6);
let plant7 = new SmallTree({
  x: -4,
  y: 5,
  z: 13,
  color: "#4EAD00",
  scale: 5,
});
world.add(plant7);
let plant8 = new SmallTree({ x: 4, y: 5, z: 13, color: "#4EAD00", scale: 5 });
world.add(plant8);

// let seesaw = new GrSeesaw({ x: 10 });
// world.add(seesaw);

let fenceLeft = new Fence({
  height: 35,
  width: 3,
  x: -20,
  y: 1.5,
  z: -2.5,
  pos: "left",
});
world.add(fenceLeft);
let fenceRight = new Fence({
  height: 35,
  width: 3,
  x: 20,
  y: 1.5,
  z: -2.5,
  pos: "right",
});
world.add(fenceRight);
let fenceBack = new Fence({
  height: 40,
  width: 3,
  x: 0,
  y: 1.5,
  z: -20,
  pos: "back",
});
world.add(fenceBack);
let fenceFrontLeft = new Fence({
  height: 15.5,
  width: 3,
  x: -12.3,
  y: 1.5,
  z: 15,
  pos: "front",
});
world.add(fenceFrontLeft);
let fenceFrontRight = new Fence({
  height: 15.5,
  width: 3,
  x: 12.3,
  y: 1.5,
  z: 15,
  pos: "front",
});
world.add(fenceFrontRight);

let road = new Road();
world.add(road);

let shaderMat = shaderMaterial("./arc.vs", "./arc.fs", {
  side: T.DoubleSide,
  uniforms: {
    checks: { value: 4.0 },
    light: { value: new T.Vector3(0, 1, 0) },
    dark: { value: new T.Vector3(1, 0, 0) },
  },
});
let arc = new Arc({ material: shaderMat });
world.add(arc);

let car1 = new Car({ x: -10, y: 0.5, z: 17.5, color: "cyan" });
world.add(car1);
let car2 = new Car({ x: 10, y: 0.5, z: 17.5, color: "orange" });
world.add(car2);

let copter = new Quadcopter();
world.add(copter);

let claw = new Claw();
world.add(claw);

let pyramidHouse = new PyramidHouse({ x: -13, y: 0, z: 2 });
world.add(pyramidHouse);

let gableHouse = new GableHouse({ x: -13, y: 0, z: 10, scale: 3 });
world.add(gableHouse);

// let wall = new RockWall();
// world.add(wall);
// TODO: Add buildings and people; add 2 new objects

let person1 = new Person({
  x: -6.5,
  y: 0,
  z: -1,
  rotation: Math.PI / -2,
  color: "gray",
});
let person2 = new Person({
  x: -4,
  y: 0,
  z: 6,
  rotation: Math.PI / 2,
  color: "pink",
});
let person3 = new Person({
  x: -5,
  y: 0,
  z: 10,
  rotation: Math.PI,
  color: "green",
});
let person4 = new Person({
  x: 2,
  y: 0,
  z: 7,
  rotation: Math.PI / 3,
  color: "blue",
});
let person5 = new Person({
  x: 8,
  y: 0,
  z: 12,
  rotation: Math.PI / 1.5,
  color: "orange",
});
let person6 = new Person({
  x: 15,
  y: 0,
  z: 9,
  rotation: Math.PI / -1,
  color: "red",
});
let person7 = new Person({
  x: 17.5,
  y: 0,
  z: -12,
  rotation: Math.PI / -2,
  color: "navy",
});
let person8 = new Person({
  x: 19,
  y: 0,
  z: -5,
  rotation: Math.PI,
  color: "purple",
});
let person9 = new Person({
  x: 1,
  y: 0,
  z: -11,
  rotation: Math.PI / -0.5,
  color: "maroon",
});
world.add(person1);
world.add(person2);
world.add(person3);
world.add(person4);
world.add(person5);
world.add(person6);
world.add(person7);
world.add(person8);
world.add(person9);

let gift = new Gift({ x: -14, y: 15, z: -12 });
world.add(gift);
// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
  const toHighlight = world.objects.find((ob) => ob.name === obName);
  if (toHighlight) {
    toHighlight.highlighted = true;
  } else {
    throw `no object named ${obName} for highlighting!`;
  }
}
// of course, the student should highlight their own objects, not these
highlight("Gift-0");
highlight("Person-1");
highlight("Car-0");
highlight("Quadcopter-0");
highlight("Snowman-0");
highlight("PyramidHouse-0");
highlight("GableHouse-0");
highlight("Tree-0");
highlight("Plant-0");
highlight("GyroSwing-0");
highlight("Arc-0");

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
