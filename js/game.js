var Game = function(size) {
  this.ended = false;
  this.won   = false;
  this.grid  = new Grid(size, this);
  this.init();
}

Game.prototype.init = function() {
  var grid = this.grid;
  grid.set_random_cells(2, true);
  grid.render_html();
  $(document).keyup(function(e) {
    e.preventDefault();
    var key = e.which;
    switch(key) {
      case 37:
        grid.move("left");
        break;
      case 38:
        grid.move("up");
        break;
      case 39:
        grid.move("right");
        break;
      case 40:
        grid.move("down");
        break;
      default:
        console.log("Please use arrow keys to play");
    }
  });
  $('#new-game').click(function(e) {
    e.preventDefault();
    location.reload();
    return false;
  });
}

Game.prototype.check_status = function(last_merged_status) {
  var cells = this.grid.all_cells();
  for(i=0; i<cells.length; i++) {
    if(cells[i].value == 2048) {
      this.won = true;
      alert("YAY!!! Victory");
      return;
    }
  }
  var empty_cells = this.grid.empty_cells();
  if(empty_cells.length == 0 && !last_merged_status) {
    alert("Game Over!!!");
    return;
  }
}
