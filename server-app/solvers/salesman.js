function Path(points) {
  this.points = points;
  this.order = new Array(points.length);
  for (var i = 0; i < points.length; i++) this.order[i] = i;
  this.distances = new Array(points.length * points.length);
  for (var i = 0; i < points.length; i++)
    for (var j = 0; j < points.length; j++)
      this.distances[j + i * points.length] = distance(points[i], points[j]);
}

Path.prototype.change = function (temp) {
  var i = this.randomPos(),
    j = this.randomPos();
  var delta = this.delta_distance(i, j);
  if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
    this.swap(i, j);
  }
};
Path.prototype.size = function () {
  var s = 0;
  for (var i = 0; i < this.points.length; i++) {
    s += this.distance(i, (i + 1) % this.points.length);
  }
  return s;
};
Path.prototype.swap = function (i, j) {
  var tmp = this.order[i];
  this.order[i] = this.order[j];
  this.order[j] = tmp;
};
Path.prototype.delta_distance = function (i, j) {
  var jm1 = this.index(j - 1),
    jp1 = this.index(j + 1),
    im1 = this.index(i - 1),
    ip1 = this.index(i + 1);
  var s =
    this.distance(jm1, i) +
    this.distance(i, jp1) +
    this.distance(im1, j) +
    this.distance(j, ip1) -
    this.distance(im1, i) -
    this.distance(i, ip1) -
    this.distance(jm1, j) -
    this.distance(j, jp1);
  if (jm1 === i || jp1 === i) s += 2 * this.distance(i, j);
  return s;
};
Path.prototype.index = function (i) {
  return (i + this.points.length) % this.points.length;
};
Path.prototype.access = function (i) {
  return this.points[this.order[this.index(i)]];
};
Path.prototype.distance = function (i, j) {
  return this.distances[this.order[i] * this.points.length + this.order[j]];
};
// Random index between 1 and the last position in the array of points
Path.prototype.randomPos = function () {
  return 1 + Math.floor(Math.random() * (this.points.length - 1));
};

function solve(points, temp_coeff, callback) {
  var path = new Path(points);
  if (points.length < 2) return path.order; // There is nothing to optimize
  if (!temp_coeff)
    temp_coeff = 1 - Math.exp(-10 - Math.min(points.length, 1e6) / 1e5);
  var has_callback = typeof callback === "function";

  for (
    var temperature = 100 * distance(path.access(0), path.access(1));
    temperature > 1e-6;
    temperature *= temp_coeff
  ) {
    path.change(temperature);
    if (has_callback) callback(path.order);
  }
  return path.order;
}

function distance(p, q) {
  var dx = p.x - q.x,
    dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
}

module.exports = solve;
