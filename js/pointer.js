var Pointer = function(options) {
  options = _.defaults(options, {
    center: {x: 0, y:0},
    target: undefined,
    length: 100,
    level: 0
  });
  this.level = options.level;
  this.angle = 0;
  this.length = options.length;
  this.center = options.center;
  this.pnt1 = {x:0, y:0};
  this.pnt2 = {x:0, y:0};
  if(options.target){
    this.calculateAngle(options.target);
  }
};

Pointer.prototype.getColor = function() {
  var color= 'rgba(255,200,0,' + 200 + ')';
  return color;
};

Pointer.prototype.getShadowColor = function() {
  return 'rgba(0,0,0,10)';
};


Pointer.prototype.draw = function(con) {

  var center = this.getCenter(),
  pnt1 = this.pnt1, pnt2 = this.pnt2;

  con.beginPath();

  con.lineWidth = 1;
  con.strokeStyle = 'rgba(255,255,255,' + 255 + ')';
  //con.shadowColor   = 'rgba(226,225,142,1)';
// con.globalAlpha=opacity; // Half opacity
  //con.moveTo(pnt1.x, pnt1.y);
  
  //con.lineTo(pnt2.x, pnt2.y);
  
  //con.stroke();
   
  con.arc(pnt2.x, pnt2.y, 5, 0, 2 * Math.PI, false);
  
  con.arc(pnt1.x, pnt1.y, 10, 0, 2 * Math.PI, false);
  con.fillStyle = 'blue';
  con.fill();
  con.closePath();
};

Pointer.prototype.getCenter = function() {
  return this.center;
};

Pointer.prototype.update = function(lookAtMe){
  this.calculateAngle(lookAtMe);
  var center = this.getCenter();
  this.pnt1 = {
   x: center.x - (this.length/3) * Math.cos(this.angle),
   y: center.y - (this.length/3) * Math.sin(this.angle)
  };
  
  this.pnt2 = {
   x: center.x + (2*this.length/3) * Math.cos(this.angle),
   y: center.y + (2*this.length/3) * Math.sin(this.angle)
  };
};

Pointer.prototype.calculateAngle = function(lookAt){
  var center = this.getCenter();
  this.angle = Math.atan2((lookAt.y - center.y),(lookAt.x - center.x));
};
