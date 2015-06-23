var Grid = function(size) {
  this.cells = [];

  for(x=0; x<size; x++) {
    this.cells.push([]);
    for(y=0; y<size; y++) {
      this.cells[x].push(new Cell());
    }
  }
};
