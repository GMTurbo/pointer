var Pointer = function(options) {
  options = _.defaults(options, {
    center: {x: 0, y:0},
    target: undefined,
    length: 100,
    level: 1
  });
  this.level = options.level;
  this.angle = 0;
  this.length = options.length;
  this.maxLength = options.length*(4-this.level)/4;
  this.center = options.center;
  this.pnt1 = {x:0, y:0};
  this.pnt2 = {x:0, y:0};
  if(options.target){
    this.calculateAngle(options.target);
  }
};

Pointer.prototype.getColor = function() {
  var color= '#FFFF00';
  return color;
};

Pointer.prototype.getShadowColor = function() {
  return 'rgba(0,0,0,10)';
};


Pointer.prototype.draw = function(con) {

  var center = this.getCenter(),
  pnt1 = this.pnt1, pnt2 = this.pnt2;

  con.beginPath();
  con.arc(pnt2.x, pnt2.y, 2, 0, 2 * Math.PI, false);
  
  con.arc(pnt1.x, pnt1.y, 6, 0, 2 * Math.PI, false);
  con.fillStyle = '#FFFF00';
  con.fill();
  con.closePath();
};

Pointer.prototype.drawLine = function(con){
  con.beginPath();

  con.lineWidth = 1;
  con.strokeStyle = 'rgba(255,255,255,' + 255 + ')';
  //con.shadowColor   = 'rgba(226,225,142,1)';
// con.globalAlpha=opacity; // Half opacity
  con.moveTo(this.pnt1.x, this.pnt1.y);
  
  con.lineTo(this.pnt2.x, this.pnt2.y);
  
  con.stroke();
  con.closePath();
}

Pointer.prototype.getCenter = function() {
  return this.center;
};

Pointer.prototype.update = function(lookAtMe){
  this.calculateAngle(lookAtMe);
  var center = this.getCenter();
  
  var distance = helper.getDistance(this.pnt1, lookAtMe);
  
  this.length = (distance > this.maxLength) ? this.maxLength : distance;
  
  this.pnt1 = {
   x: center.x - (1*this.length/2) * Math.cos(this.angle),
   y: center.y - (1*this.length/2) * Math.sin(this.angle)
  };
  
  this.pnt2 = {
   x: center.x + (1*this.length/2) * Math.cos(this.angle),
   y: center.y + (1*this.length/2) * Math.sin(this.angle)
  };
};

Pointer.prototype.calculateAngle = function(lookAt){
  var center = this.getCenter();
  this.angle = Math.atan2((lookAt.y - center.y),(lookAt.x - center.x));
};

var helper = (function(){
  
  var getDistance = function(pnt1, pnt2){
    return Math.sqrt(Math.pow(pnt1.x-pnt2.x, 2) + Math.pow(pnt1.y-pnt2.y, 2));
  };
  
  return {
    getDistance: getDistance
  }
})();
