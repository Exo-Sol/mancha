/////////////////

// finger swipe events
var container = document.body;

  container.addEventListener("touchstart", startTouch, false);
  container.addEventListener("touchmove", moveTouch, false);

  // Swipe Up / Down / Left / Right
  var initialX = null;
  var initialY = null;

  function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };

  function moveTouch(e) {
    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      console.log(diffX);
      if (diffX >= 9) {
        // swiped left
        console.log("swiped left");
        
        rightArrow ();
      } else if (diffX <= -9) {
        // swiped right
        console.log("swiped right");
        leftArrow ();
      }  
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        console.log("swiped up");
      } else {
        // swiped down
        console.log("swiped down");
      }  
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
  };


  function  rightArrow (){
    if (secondPage === 1) {
      window.open("curDay.html","_self");
      
    }
    else if(secondPage === 2){
      window.open("global.html","_self");

    }
    

  }

  function leftArrow (){
    if(secondPage === 2) {
      window.open("index.html","_self");
    }
    else if (secondPage === 3){
      window.open("curDay.html","_self");
    }
  }