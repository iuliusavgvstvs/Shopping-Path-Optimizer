function generateMatrix(dimX, dimY, shelves) {
  var mat = new Array(parseInt(dimX))
    .fill(1)
    .map(() => new Array(parseInt(dimY)).fill(1));
  shelves.forEach((shelf) => {
    for (
      var i = parseInt(shelf.coordX);
      i < parseInt(shelf.coordX) + parseInt(shelf.dimY);
      i++
    ) {
      for (
        var j = parseInt(shelf.coordY);
        j < parseInt(shelf.coordY) + parseInt(shelf.dimX);
        j++
      ) {
        mat[i][j] = 0;
      }
    }
  });
  return mat;
}

module.exports = generateMatrix;
