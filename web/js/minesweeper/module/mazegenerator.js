define(
    ['../collection/field', '../model/field', '../model/maze', 'socketio'],
    function (FieldCollection, FieldModel, MazeModel, SocketIO)
{
    "use strict";
    return function(application) {
        application.module('MazeGenerator', function(MazeGenerator, Minesweeper) {
            MazeGenerator.maze = new MazeModel();

            Minesweeper.reqres.setHandler("maze:generate", function(gameType) {
                MazeGenerator.maze.set({size: gameType.get('size'), bombs: gameType.get('bombs')});
                MazeGenerator.maze.generate();
                return MazeGenerator.maze;
            });

            MazeGenerator.on('start', function() {
                SocketIO.connect();
            });
        });
    };
});
