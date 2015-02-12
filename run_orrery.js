// Run a planetary orrery with differential inheritance.
// Copyright (C) 2015 by Ken Guyton.  All Rights Reserved.

var orrery = require('./orrery.js');


/**
 * Create a planet with a name and a radius.
 *
 */
function createPlanet(name, radius) {
  'use strict';
  var aPlanet = Object.create(orrery.earth);
  aPlanet.name = name;
  aPlanet.radius = radius;

  return aPlanet;
}

/**
 * Create a list of planets.
 *
 * Right now we just use the small set:  Mercury, Earth and Jupiter.
 */
function createPlanets() {
  'use strict';
  var mercury, jupiter, earth;

  earth = orrery.earth;
  mercury = createPlanet('Mercury', 0.39);
  jupiter = createPlanet('Jupiter', 5.0);

  return [mercury, earth, jupiter];
}

/**
 * Create the orrery from a list of planet objects.
 */
function createOrrery(planets) {
  'use strict';
  var theOrrery, i;

  theOrrery = Object.create(orrery.orrery);

  for (i = 0; i < planets.length; i += 1) {
    theOrrery.addPlanet(planets[i]);
  }

  return theOrrery;
}

/**
 * Initialize a solar system model and step some.
 * 
 * This is a small model with just three representative planets.
 */
function main() {
  'use strict';
  var myOrrery, step, steps, planets, i;

  step = 2.0 / 52.0;
  steps = 5;

  planets = createPlanets();
  myOrrery = createOrrery(planets);

  console.log('Total time: ' + myOrrery.totalTime.toFixed(2));
  console.log(myOrrery.toStr());
  for (i = 1; i <= steps; i += 1) {
    myOrrery.step(step);
    console.log('Total time: ' + myOrrery.totalTime.toFixed(2));
    console.log(myOrrery.toStr());
  }
}

main();
