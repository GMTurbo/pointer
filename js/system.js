var System = function(options) {

  options = _.defaults(options, {
    width: 100,
    height: 100,
    isMobile: false
  });

  if (!options.canvas) {
    console.error("canvas element required for cops and robbas :/");
    return;
  }

  if (!options.reqAnimationFrame) {
    console.error("window.requestAnimationFrame required :/");
    return;
  }

  var canvas = options.canvas,
    width = options.width,
    height = options.height,
    density = options.density,
    reqFrame = options.reqAnimationFrame,
    context = canvas.getContext('2d'),
    initialSetup = true,
    isMobile = options.isMobile,
    initial = true;

  var target = {x:0, y:0, r: 10},
    pointers = [];

  var setup = function() {
  
    _createPointers();
  
    if(initial){
      initial = false;
      updateSystem();
    }
  };
  
  var _makeCircularLayout = function(){
    var center = {x: ~~(width/2), y: ~~(height/2)};
    var radius = 300, i = 0;
    //outer ring1
    for ( i = 0; i < 2*Math.PI; i+=Math.PI/36.0){
      pointers.push(new Pointer({
        center: {
          x: center.x + radius*Math.cos(i),
          y: center.y + radius*Math.sin(i)
        },
        target: target,
        length: 100,
        level: 3
      }));
    }
    
    radius = 200;

    //middle ring
    for ( i = 0; i < 2*Math.PI; i+=Math.PI/24.0){
      pointers.push(new Pointer({
        center: {
          x: center.x + radius*Math.cos(i),
          y: center.y + radius*Math.sin(i)
        },
        target: target,
        length: 100,
        level: 2
      }));
    }
    
    //inner ring
    radius = 100;
    for ( i = 0; i < 2*Math.PI; i+=Math.PI/16.0){
      pointers.push(new Pointer({
        center: {
          x: center.x + radius*Math.cos(i),
          y: center.y + radius*Math.sin(i)
        },
        target: target,
        length: 100,
        level: 1
      }));
    }
  };
  
  var _makeGridLayout = function(){
    
    var xDim=10, yDim=10;
    
    for (var i = 0; i < xDim; i++){
      for (var j = 0; j < yDim; j++){
        pointers.push(new Pointer({
          center: {
            x: 30 + i * width/xDim,
            y: 30 + j * height/yDim
          },
          target: target,
          length: 60,
          level: 1
        }));
      }
    }
  };
  
  var _createPointers = function(){
    
    var circles = (~~(Math.random() * 100) % 2 === 0);
    
    pointers = [];
    
    if(circles){
      _makeCircularLayout()
    }else{
      _makeGridLayout();
    }

  };

  function drawSystem() {
    //draw the system here
    context.clearRect(0, 0, width, height);

    drawTarget();
    
    //connectPointers(context);
    
    pointers.forEach(function(pointer){
      pointer.drawLine(context);
      pointer.draw(context);
    });
  }

  function updateSystem() {

    //update the system here
    pointers.forEach(function(pointer){
      pointer.update(target);
    });

    drawSystem();
    reqFrame(updateSystem);
  }

  function drawTarget(){
    context.beginPath();
    context.arc(target.x, target.y, target.r, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
    context.closePath();
  }
  
  //this method is shit
  function connectPointers(con){
    
    var level1 = pointers.reduce(function(obj, curr){
      if(curr.level == 1){
        obj.pnt1s.push(curr.pnt1);
        obj.pnt2s.push(curr.pnt2);
      }
      return obj;
    },{pnt1s:[], pnt2s: []});
    
    var level2 = pointers.reduce(function(obj, curr){
      if(curr.level == 2){
        obj.pnt1s.push(curr.pnt1);
        obj.pnt2s.push(curr.pnt2);
      }
      return obj;
    },{pnt1s:[], pnt2s: []});
    
    var level3 = pointers.reduce(function(obj, curr){
      if(curr.level == 3){
        obj.pnt1s.push(curr.pnt1);
        obj.pnt2s.push(curr.pnt2);
      }
      return obj;
    },{pnt1s:[], pnt2s: []});
    
    con.beginPath();
    con.lineWidth = 1;
    con.strokeStyle = 'white';
    var i = 0;
    var pnts = level1;
    
    for(i = 0 ; i < pnts.pnt1s.length-1; i++){
      con.moveTo(pnts.pnt1s[i].x, pnts.pnt1s[i].y);
      con.lineTo(pnts.pnt1s[i+1].x, pnts.pnt1s[i+1].y);
      con.moveTo(pnts.pnt2s[i].x, pnts.pnt2s[i].y);
      con.lineTo(pnts.pnt2s[i+1].x, pnts.pnt2s[i+1].y);
    }
    
    con.moveTo(pnts.pnt1s[0].x,
    pnts.pnt1s[0].y);
    
    con.lineTo(pnts.pnt1s[pnts.pnt1s.length-1].x,
    pnts.pnt1s[pnts.pnt1s.length-1].y);
    
    con.moveTo(pnts.pnt2s[0].x,
    pnts.pnt2s[0].y);
    
    con.lineTo(pnts.pnt2s[pnts.pnt2s.length-1].x,
    pnts.pnt2s[pnts.pnt2s.length-1].y);

    pnts = level2;
    for(i = 0 ; i < pnts.pnt1s.length-1; i++){
      con.moveTo(pnts.pnt1s[i].x, pnts.pnt1s[i].y);
      con.lineTo(pnts.pnt1s[i+1].x, pnts.pnt1s[i+1].y);
      con.moveTo(pnts.pnt2s[i].x, pnts.pnt2s[i].y);
      con.lineTo(pnts.pnt2s[i+1].x, pnts.pnt2s[i+1].y);
    }
    con.moveTo(pnts.pnt1s[0].x,
    pnts.pnt1s[0].y);
    
    con.lineTo(pnts.pnt1s[pnts.pnt1s.length-1].x,
    pnts.pnt1s[pnts.pnt1s.length-1].y);
    
    con.moveTo(pnts.pnt2s[0].x,
    pnts.pnt2s[0].y);
    
    con.lineTo(pnts.pnt2s[pnts.pnt2s.length-1].x,
    pnts.pnt2s[pnts.pnt2s.length-1].y);
    
    pnts = level3;
    for(i = 0 ; i < pnts.pnt1s.length-1; i++){
      con.moveTo(pnts.pnt1s[i].x, pnts.pnt1s[i].y);
      con.lineTo(pnts.pnt1s[i+1].x, pnts.pnt1s[i+1].y);
      con.moveTo(pnts.pnt2s[i].x, pnts.pnt2s[i].y);
      con.lineTo(pnts.pnt2s[i+1].x, pnts.pnt2s[i+1].y);
    }
    
    con.moveTo(pnts.pnt1s[0].x,
    pnts.pnt1s[0].y);
    
    con.lineTo(pnts.pnt1s[pnts.pnt1s.length-1].x,
    pnts.pnt1s[pnts.pnt1s.length-1].y);
    
    con.moveTo(pnts.pnt2s[0].x,
    pnts.pnt2s[0].y);
    
    con.lineTo(pnts.pnt2s[pnts.pnt2s.length-1].x,
    pnts.pnt2s[pnts.pnt2s.length-1].y);
    
    con.stroke();
    con.closePath();
  }

  function onMouseMove(mouse) {
      target.x = mouse.x;
      target.y = mouse.y;
  }

  function onKeyPress(e) {

  }

  function resize(size) {
    width = size.width;
    height = size.height;
    setup();
  }

  return {
    begin: setup,
    resize: resize,
    onMouseMove: onMouseMove,
    onKeyPress: onKeyPress
  }
};