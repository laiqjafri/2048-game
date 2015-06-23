var Game = function(size) {
  this.grid = new Grid(size);
  this.init();
}

Game.prototype.init = function() {
  console.log("Bind game keys");
}
