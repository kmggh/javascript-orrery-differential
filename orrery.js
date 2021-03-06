// Planetary Orrery example using differential inheritance.
// Copyright (C) 2015 by Ken Guyton.  All Rights Reserved.


/**
 * Earth will be our prototypical planet.  Planets will have an orbital
 * radius in astronomical units and a position angle in degrees.
 */
var earth = {
  name: 'Earth',
  radius: 1.0,
  posAngle: 0.0,

  toStr: function () {
    'use strict';
    return (this.name + ' rad: ' + this.radius.toFixed(2) +
            ' per: ' + this.period().toFixed(2) +
            ' at: ' + this.posAngle.toFixed(2));
  },

  /**
   * Compute the period of the planet.
   *
   * This is where the astronomy happens since the period is from Kepler's
   * third law.  The returned value is in years.
   */
  period: function () {
    'use strict';
    return Math.pow(this.radius, 1.5);
  },

  /**
   * Advance the planet along its orbit for deltaTime years.
   *
   * The deltaTime can be a fraction of a year.  This changes the planet's
   * posAngle.
   */
  step: function (deltaTime) {
    'use strict';
    this.posAngle += (360.0 / this.period() * deltaTime);
    this.posAngle = this.posAngle % 360.0;
  }
};

/**
 * A container for several planets, like a solar system.
 */
var orrery = {
  planets: [],
  totalTime: 0.0,
  /**
   * Advance all planets along their orbits for deltaTime years.
   *
   * The deltaTime can be a fraction of a year.  This changes all of the
   * planets' posAngles.
   */
  step: function (deltaTime) {
    'use strict';
    var planetsLen = this.planets.length, i;

    for (i = 0; i < planetsLen; i += 1) {
      this.planets[i].step(deltaTime);
    }
    this.totalTime += deltaTime;
  },

  /**
   * Add a planet to the orrery.
   */
  addPlanet: function (planet) {
    'use strict';
    this.planets.push(planet);
  },

  /**
   * Convert the orrery to a string for output.
   *
   * Returns a string with <br> at the end of each line (for each planet).
   */
  toStr: function () {
    'use strict';
    var outStr = '', i, planetsLen = this.planets.length;

    for (i = 0; i < planetsLen; i += 1) {
      outStr += this.planets[i].toStr() + '\n';
    }

    return outStr;
  }
};

exports.earth = earth;
exports.orrery = orrery;
