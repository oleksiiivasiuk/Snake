/**
 * Created by Oleksiy on 12/26/2014.
 */

var mainView = new MainView({
    el: $("#board"),
    model: new FoodModel,
    collection: new BodyElementsCollection
});

for(var index=0; index<4;index++){
    var bodyElement = new BodyElementModel();
    bodyElement.setXY(10+index*15,10);
    mainView.collection.push(bodyElement);
}

mainView.render();

var movementTimer = setInterval(function() {mainView.move()}, mainView.const.SPEED_OF_REDRAW);
