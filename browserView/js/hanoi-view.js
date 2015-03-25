(function() {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = window.Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.tower = null;
    this.$error = null;
    this.render();
    this.bindEvents();
  };

  $.extend(View.prototype, {
    // setupTowers: function () {
    //   var towers = "";
    //   var discs = "";
    //   for (var j = 1; j < 4; j++) {
    //     discs += "<div class='disc size" + j + "' data-size='" + j +"'></div>";
    //   }
    //   towers += "<div class='tower clearfix' data-index='0'>" + discs + "</div>";
    //   for (var i = 1; i < 3; i++) {
    //     towers += "<div class='tower clearfix' data-index='" + i + "'></div>";
    //   }
    //   this.$el.html(towers);
    // },

    bindEvents: function() {
      var that = this;
      $('.hanoi-display').on('click', '.tower', function(event){
        var $currentTarget = $(event.currentTarget);
        that.clickTower($currentTarget);
      });
    },

    clickTower: function($tower) {
      if(this.$error) {
        this.$error.remove();
      }

      if (this.tower === null) {
        this.tower = $tower;
        $tower.toggleClass('clicked');
      } else if ($tower.data('index') === this.tower.data('index')) {
        this.tower = null;
        $tower.toggleClass('clicked');
      } else {
        this.tower.toggleClass('clicked');
        this.moveDisc($tower);
        this.isWonGame();
      }
    },

    moveDisc: function($endTower) {
      var startIndex = this.tower.data('index');
      var endIndex = $endTower.data('index');
      var moved = this.game.move(startIndex, endIndex);

      if(moved) {
        this.render();
      } else {
        this.$error = $('<h1 class="error">You cannot move there!</h1>');
        this.$el.after(this.$error);
      }
      this.tower = null;
    },

    isWonGame: function() {
      if(this.game.isWon()) {
        $('.hanoi-display').off('click');
        this.$el.after('<h1 class="win">You win!</h1>');
      }
    },

    render: function() {
      var towers = "";
      var discs = "";
      for (var i = 0; i < this.game.towers.length; i++) {
        var dup = this.game.towers[i].concat([]);
        dup.reverse().forEach(function(disc) {
          discs += "<div class='disc size" + disc + "' data-size='" + disc +"'></div>";
        });
        towers += "<div class='tower clearfix' data-index='" + i + "'>" + discs + "</div>";
        discs = "";
      }
      this.$el.html(towers);
    }
  });

})();
