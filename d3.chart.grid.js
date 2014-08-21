/*!
 * @copyright Copyright (c) 2014 Sentient Energy, Inc.
 * @license   Licensed under MIT license
 */

(function (d3) {
    /**
     * __Grid component for ```d3.chart``` v0.2 and ```d3.chart.base``` v0.4__
     *
     * Plots gridlines on a d3.chart.
     *
     * @namespace d3.chart
     * @class Grid
     * @extends d3.chart.Axis
     * @author Pete Baker
     * @version 0.1.0
     */
    d3.chart("Axis").extend("Grid", {

        /**
         * Initializes the chart.
         *
         * @constructor
         * @param {String} [options.grid] Either 'x' or 'y' to denote rendering
         *                                an x or y grid. Defaults to 'x'.
         * @param {d3.scale} [options.scale] A d3 scale instance. Defaults to
         *                                   ```d3.scale.linear```.
         */
        initialize: function(options) {
            var chart = this;

            //grid configurations for x and y axes
            chart.configs = {
                x: {
                    orient: "bottom",
                    length: chart.height
                },
                y: {
                    orient: "right",
                    length: chart.width
                }
            };

            //set chart options or use defaults
            chart.scale = (options && options.scale) ? options.scale : d3.scale.linear();
            chart.config = chart.configs[(options && options.grid) ? options.grid : "x"];

            //use an axis object to render grid lines and no ticks
            chart.axis(d3.svg.axis().scale(chart.scale)
                                    .orient(chart.config.orient));

            //its not an axis - its a grid!
            this.layer("axis").on("merge:transition", function() {
                chart.layer("axis").select("g.axis").classed("axis", false)
                                                    .classed("grid", true);
            });

            console.log("[d3.chart.grid] initialize");
        },

        /**
         * Sets the grid length. This should be called once on
         * setup and each time the grid dimensions change.
         *
         * @method gridLength
         * @param {Number} [length] The new grid length.
         * @return {Number|this} the grid length if no parameter is given,
         * otherwise the chart instance.
         */
        gridLength: function(length) {
            if (!length) return this.axis().innerTickSize();

            console.log("[d3.chart.grid] gridLength %d", length);

            this.axis().innerTickSize(length);

            return this;
        }
    });
}(d3));