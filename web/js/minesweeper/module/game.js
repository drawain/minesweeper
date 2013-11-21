define(
    ['marionette', '../view/maze', '../view/status', '../view/game', '../model/gametype'],
    function (Marionette, MazeView, StatusView, GameLayout, GameType)
{
    "use strict";
    return function(application) {
        application.module('Game', function(Game, Minesweeper) {
            Game.layoutView = new GameLayout({
                model: Minesweeper.request('maze:generate', new GameType({size: 9, bombs: 10}))
            });

            Game.on('start', function() {
                Minesweeper.gameRegion.show(Game.layoutView);
            });
        });
    };
});
