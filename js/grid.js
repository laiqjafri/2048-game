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
  for(y=0; y<this.size; y++) {
    var row = "";
    for(x=0; x<this.size; x++) {
      row += this.cells[x][y].value;
      row += "\t";
    }
    console.log(row);
  }
}

Grid.prototype.set_random_cells = function(number_of_cells) {
  for(i=0; i<number_of_cells; i++) {
    var empty_cells = this.empty_cells(); //calling it inside the loop removes the chance of setting the same cell again
    if(empty_cells.length) {
      var random = Math.floor(Math.random() * empty_cells.length);
      empty_cells[random].value = 2;
    }
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

Grid.prototype.merge = function(direction) {
  var merge = false;
  if(direction == "left") {
    for(y=0; y<this.size; y++) {
      for(x=0; x<this.size; x++) {
        var found = false;
        var next  = x + 1;
        while(next < this.size && !found) {
          if(typeof(this.cells[next]) != "undefined" && this.cells[next][y].value) {
            found = true;
          } else {
            next++;
          }
        }
        if(this.cells[x][y].value) {
          if(found) {
            if(this.cells[x][y].value == this.cells[next][y].value) {
              this.cells[x][y].value    *= 2;
              this.cells[next][y].value  = 0;
              merge = true;
            } else {
              if(next != (x+1)) {
                this.cells[x+1][y].value  = this.cells[next][y].value;
                this.cells[next][y].value = 0;
                merge = true;
              }
            }
          }
        } else {
          if(found) {
            this.cells[x][y].value    = this.cells[next][y].value;
            this.cells[next][y].value = 0;
            x -= 1;
            merge = true;
          }
        }
      }
    }
  } else if(direction == "right") {
  } else if(direction == "up") {
  } else if(direction == "down") {
  }
  if(merge) {
    this.set_random_cells(1);
  }
  this.print();
}
