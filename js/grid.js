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

Grid.prototype.next_mergeable_cell = function(x, y, horizontal, step) {
  var found    = false;
  var next     = horizontal ? (x + step) : (y + step);
  var boundary = step > 0 ? this.size : -1;

  //Find the next non-empty cell
  while(next != boundary && !found) {
    var point = horizontal ? {x:next, y:y} : {x:x, y:next};
    if(typeof(this.cells[point.x]) != "undefined" &&
        typeof(this.cells[point.x][point.y]) != "undefined" &&
        this.cells[point.x][point.y].value) {
      found = true;
    } else {
      next = horizontal ? (next + step) : (next + step);
    }
  }
  return next;
}

Grid.prototype.merge = function(x, y, horizontal, step) {
  var next           = this.next_mergeable_cell(x, y, horizontal, step);
  var point          = horizontal ? {x:next, y:y} : {x:x, y:next};
  var neighbor_point = horizontal ? {x:(x + step), y:y} : {x:x, y:(y + step)};
  if(this.cells[x][y].value) {
    if(next < this.size && next > -1) {//Found a cell to merge
      if(this.cells[x][y].value == this.cells[point.x][point.y].value) {
        //if values are same, merge them into one cell and double the value
        this.cells[x][y].value              *= 2;
        this.cells[point.x][point.y].value   = 0;
        return {merged: true, increment: 1};
      } else {
        //otherwise move them next to each other
        if(!(point.x == neighbor_point.x && point.y == neighbor_point.y)) {
          this.cells[neighbor_point.x][neighbor_point.y].value = this.cells[point.x][point.y].value;
          this.cells[point.x][point.y].value = 0;
          return {merged: true, increment: 1};
        }
      }
    }
  } else {
    //move the found cell farthest
    if(next < this.size && next > -1) {
      this.cells[x][y].value             = this.cells[point.x][point.y].value;
      this.cells[point.x][point.y].value = 0;
      return {merged: true, increment: 0};
    }
  }
  return {merged: false, increment: 1};
}

Grid.prototype.move = function(direction) {
  var merged = false;
  if(direction == "left") {
    var horizontal = true;
    var step = 1;
    for(y=0; y<this.size; y++) {
      var x = 0;
      while(x < this.size) {
        var merge_action = this.merge(x, y, horizontal, step);
        x += merge_action.increment;
        merged = merged || merge_action.merged;
      }
    }
  } else if(direction == "right") {
    var horizontal = true;
    var step = -1;
    for(y=0; y<this.size; y++) {
      var x = this.size - 1;
      while(x >= 0) {
        var merge_action = this.merge(x, y, horizontal, step);
        x -= merge_action.increment;
        merged = merged || merge_action.merged;
      }
    }
  } else if(direction == "up") {
    var horizontal = false;
    var step = 1;
    for(x=0; x<this.size; x++) {
      var y = 0;
      while(y < this.size) {
        var merge_action = this.merge(x, y, horizontal, step);
        y += merge_action.increment;
        merged = merged || merge_action.merged;
      }
    }
  } else if(direction == "down") {
    var horizontal = false;
    var step = -1;
    for(x=0; x<this.size; x++) {
      var y = this.size - 1;
      while(y >= 0) {
        var merge_action = this.merge(x, y, horizontal, step);
        y -= merge_action.increment;
        merged = merged || merge_action.merged;
      }
    }
  }

  if(merged) {
    this.set_random_cells(1);
  }
  this.print();
}
