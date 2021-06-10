var assert = require("assert");
const Point = require("./Point.js");
const solve = require("./salesman.js");

var tests = [
  { q: [[0, 0]], r: [0] },
  {
    q: [
      [0, 0],
      [1, 1],
    ],
    r: [0, 1],
  },
  {
    q: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
    q: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
      [10, 10],
      [11, 11],
      [12, 12],
      [13, 13],
    ],
  },
];

for (let test of tests) {
  var points = test.q.map(([x, y]) => new Point(x, y));
  var res = solve(points);
  console.log(res);
}
