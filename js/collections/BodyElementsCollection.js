var BodyElementsCollection = Backbone.Collection.extend({
   model: BodyElementModel,
   move: function(moveValue) {
      this.addNew(moveValue);
      this.shift();
   },
   addNew: function(moveValue){
      var lastElement = this.last();
      var newElement = new BodyElementModel;
      newElement.setXY(lastElement.getX(), lastElement.getY());
      newElement.setDirection(lastElement.getDirection());
      if(lastElement !== undefined) {
         switch (Number(lastElement.get('direction'))) {
            case 0:
               newElement.setY(lastElement.getY() - moveValue);
               break;
            case 1:
               newElement.setX(lastElement.getX() + moveValue);
               break;
            case 2:
               newElement.setY(lastElement.getY() + moveValue);
               break;
            case 3:
               newElement.setX(lastElement.getX() - moveValue);
               break;
         }
         this.push(newElement);
      }
   },
   checkBorder: function(minWidth, minHeight, maxWidth, maxHeight) {
      if(this.last() === undefined){ this.dead()}else
      {
         var lastElement = this.last();
         if ((lastElement.getX() < minWidth) || (lastElement.getX() > maxWidth)) {
            return false
         }
         if ((lastElement.getY() < minHeight) || (lastElement.getY() > maxHeight)) {
            return false
         }
         return true;
      }
   },
   checkBody: function(distance) {
      var x = this.last().getX();
      var y = this.last().getY();
      for(var index = 0;index < this.length - 1; index++){
         if((Math.abs(x - this.models[index].getX()) < distance)&&(Math.abs(y - this.models[index].getY()) < distance)){
            return false;
         }
      }
      return true;
   },
   checkFood: function(x, y, distance) {
      var lastElement = this.last();
      if(this.last() === undefined){ this.dead()}
      else {
         if ((Math.abs(x - lastElement.getX()) < distance) && (Math.abs(y - lastElement.getY()) < distance)) {
            return true
         }
         return false;
      }
   },
   dead: function() {
      //console.log('You dead!');
   }
});