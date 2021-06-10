var assert = require("assert");
const { astar, Graph } = require("./astar.js");
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

var rafturi = [
  { id: "1", name: "Alimente", pozX: 1, pozY: 1 },
  { id: "2", name: "Paine", pozX: 1, pozY: 4 },
  { id: "3", name: "Mezeluri", pozX: 1, pozY: 7 },
  { id: "4", name: "Mezeluri", pozX: 6, pozY: 1 },
  { id: "5", name: "Dulciuri", pozX: 6, pozY: 4 },
  { id: "6", name: "Cafea", pozX: 6, pozY: 7 },
  { id: "7", name: "Lactate", pozX: 11, pozY: 1 },
  { id: "8", name: "Fructe", pozX: 11, pozY: 4 },
  { id: "9", name: "Legume", pozX: 11, pozY: 7 },
];

var config = {
  dimXRaft: 2,
  dimYRaft: 4,
  n: 15,
  m: 10,
};

function generateMatrix() {
  var mat = new Array(config.n).fill(1).map(() => new Array(config.m).fill(1));
  rafturi.forEach((raft) => {
    for (var i = raft.pozX; i < raft.pozX + config.dimYRaft; i++) {
      for (var j = raft.pozY; j < raft.pozY + config.dimXRaft; j++) {
        mat[i][j] = 0;
        console.log(i, " ", j);
      }
    }
    mat[raft.pozX][raft.pozY] = 1;
  });
  return mat;
}

var graph = new Graph([
  [1, 1, 1, 1],
  [0, 1, 1, 0],
  [0, 0, 1, 1],
]);
var start = graph.grid[0][0];
var end = graph.grid[1][2];
var result = astar.search(graph, start, end);

// console.log(result);

// for (let test of tests) {
//   var points = test.q.map(([x, y]) => new Point(x, y));
//   var res = solve(points);
//   console.log(res);
// }
// console.log("Matricea generata aici:");
const mtr = generateMatrix();
// console.log(mtr);
// console.log("after mtr");

var graph2 = new Graph(mtr);
var start2 = graph2.grid[0][0];
var end2 = graph2.grid[10][9];

var result2 = astar.search(graph2, start2, end2);
//console.log(result2);
