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
