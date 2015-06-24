var Game = function(size) {
  this.grid = new Grid(size);
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
}
