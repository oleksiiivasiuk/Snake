var BodyElementModel = Backbone.Model.extend({
    defaults: function() {
        return{
            x: 0,
            y: 0,
            direction: 1
        }
    },
    remove: function() {
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
    setDirection: function(value) {
        this.set('direction', value);
    },
    getDirection: function() {
        return this.get('direction');
    },
    setXY: function(valueX, valueY) {
        this.set('x', valueX);
        this.set('y', valueY);
    }
});