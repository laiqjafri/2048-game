var Grid = function(size) {
  this.size  = size;
  this.cells = [];

  for(x=0; x<size; x++) {
    this.cells.push([]);
    for(y=0; y<size; y++) {
      this.cells[x].push(new Cell());
    }
  }
};

Grid.prototype.print = function() {
  for(x=0; x<this.size; x++) {
    var values = this.cells[x].map(function(cell) {return cell.value});
    console.log(values.join("\t"));
  }
}

Grid.prototype.set_random_cells = function(number_of_cells) {
  for(i=0; i<number_of_cells; i++) {
    var empty_cells = this.empty_cells(); //calling it inside the loop removes the chance of setting the same cell again
    var random = Math.floor(Math.random() * (empty_cells.length + 1));
    empty_cells[random].value = 2;
  }
}

Grid.prototype.empty_cells = function() {
  var empty_cells = [];
  for(x=0; x<this.size; x++) {
    for(y=0; y<this.size; y++) {
      if(this.cells[x][y].value == 0) {
        empty_cells.push(this.cells[x][y]);
      }
    }
  }
  return empty_cells;
}
