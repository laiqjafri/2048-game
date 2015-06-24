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

Grid.prototype.set_random_cells = function(number_of_cells, two_or_four) {
  two_or_four = typeof(two_or_four) != "undefined";
  for(i=0; i<number_of_cells; i++) {
    var empty_cells = this.empty_cells(); //calling it inside the loop removes the chance of setting the same cell again
    if(empty_cells.length) {
      var random = Math.floor(Math.random() * empty_cells.length);
      var number = two_or_four ? ((Math.floor(Math.random() * 2) + 1) * 2) : 2; //Select a 2 or 4 if two_or_four otherwise 2
      empty_cells[random].value = number;
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
  var merged      = false;
  var horizontal  = direction == "left" || direction == "right";
  var step        = direction == "up"   || direction == "left" ? 1 : -1;
  var inner_start = direction == "left" || direction == "up"   ? 0 : (this.size - 1);
  var inner_end   = inner_start == 0 ? this.size : -1;
  for(outer = 0; outer < this.size; outer++) {
    var inner = inner_start;
    while(inner != inner_end) {
      var merge_action = horizontal ? this.merge(inner, outer, horizontal, step) : this.merge(outer, inner, horizontal, step);
      inner += (merge_action.increment * step);
      merged = merged || merge_action.merged;
    }
  }

  if(merged) { this.set_random_cells(1); }
  this.print();
}
