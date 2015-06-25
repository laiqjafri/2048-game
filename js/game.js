var Game = {
  over  : false,
  won   : false,
  score : 0,
  size  : 4,
  grid  : null,

  init  : function(size, bind_events) {
    bind_events = typeof(bind_events) == "undefined" ? true : false;
    Game.size  = size;
    Game.grid  = new Grid(Game.size);
    Game.won   = false;
    Game.over  = false;
    Game.score = 0;
    if(bind_events) {
      Game.bind_keys();
      Game.bind_actions();
    }
    Game.grid.set_random_cells(2, true);
    Game.grid.render_html();
  },

  bind_keys : function() {
    $(document).keyup(function(e) {
      e.preventDefault();
      var key = e.which;
      if([37, 38, 39, 40].indexOf(key) == -1) {
        $('#instructions-link').click();
        return true;
      }

      if(Game.won || Game.over) {
        Game.check_status(false);
        return true;
      }

      switch(key) {
        case 37:
          Game.grid.move("left");
          break;
        case 38:
          Game.grid.move("up");
          break;
        case 39:
          Game.grid.move("right");
          break;
        case 40:
          Game.grid.move("down");
          break;
        default:
          console.log("Please use arrow keys to play");
      }
      return true;
    });
  },

  bind_actions : function() {
    $('#new-game').click(function(e) {
      e.preventDefault();
      Game.init(Game.size, false);
      return false;
    });
  },

  check_status : function(last_merged_status) {
    var cells = Game.grid.all_cells();
    for(i=0; i<cells.length; i++) {
      if(cells[i].value == 2048) {
        Game.won = true;
        alert("YAY!!! Victory");
        return;
      }
    }
    var empty_cells = Game.grid.empty_cells();
    if(empty_cells.length == 0 && !last_merged_status) {
      Game.over = true;
      alert("Game Over!!!");
      return;
    }
  },
};
