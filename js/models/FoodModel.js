    /**
     * Created by Oleksiy on 12/28/2014.
     */
var FoodModel = Backbone.Model.extend({
    defaults: function() {
        return{
            x: 0,
            y: 0,
            count: 0
        }
    },
        deleteElement: function() {
            this.destroy();
        },
        setX: function(value) {
            this.set('x', value);
        },
        getX: function() {
            return this.get('x');
        },
        setY: function(value) {
            this.set('y', value);
        },
        getY: function() {
            return this.get('y');
        },
        setXY: function(valueX, valueY) {
            this.set('x', valueX);
            this.set('y', valueY);
        },
        setCount: function(value) {
            this.set('count', value);
        },
        getCount: function() {
            return this.get('count');
        },
    newFood: function(minWidth, minHeight, maxWidth, maxHeight) {
        var x = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        var y = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        this.setXY(x,y);
    }
});
