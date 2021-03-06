define(['backbone', './maze'], function (Backbone, Maze) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            status: 'in_progress',
            type: 'local'
        },

        initialize: function()
        {
            this.maze = new Maze();

            this.listenTo(this.maze.get('fields'), 'change', this.calculateStatus);
        },

        generate: function(gameType)
        {
            this.maze.set({size: gameType.get('size'), bombs: gameType.get('bombs')});
            this.set('type', gameType.get('isRemote') ? 'remote' : 'local');
            this.maze.generate();
        },

        calculateStatus: function()
        {
            var status = 'in_progress';
            if (this.maze.anyBombDisplayed()) {
                status = 'defeat';
            }

            if (this.maze.allBombsFlagged() && this.maze.allFieldsDisplayed()) {
                status = 'victory';
            }

            this.set('status', status);
        },

        display: function(field)
        {
            if (this.get('status') === 'defeat') {
                return;
            }

            this.maze.display(field);
        },

        flag: function(field)
        {
            if (this.get('status') === 'defeat') {
                return;
            }

            this.maze.flag(field);
        }
    });
});