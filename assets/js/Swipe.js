import Plyr_C from './Players/Plyr.js'

var container = document.querySelector("#DirectLinkArea");

container.addEventListener("touchstart", startTouch, false);
container.addEventListener("touchend", endTouch, false);
container.addEventListener("touchmove", moveTouch, false);

const seek_time = 5

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

let touch_start_x = 0
let touch_end_x = 0

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;

    touch_start_x = initialX
};

function endTouch(e) {
    initialX = e.changedTouches[0].clientX;

    touch_end_x = initialX

    // Swipe right to seek
    if (touch_end_x - touch_start_x > 350) {
        console.log('seek forward')
        Plyr_C._player.forward(seek_time)
    }

    // Swipe left to seek
    if (touch_start_x - touch_end_x > 350) {
        Plyr_C._player.rewind(seek_time)
    }

    console.log('touchstart', touch_start_x)
    console.log('touchend', touch_end_x)
}

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
        if (diffX > 0) {
            // swiped left
            console.log("swiped left");
        } else {
            // swiped right
            console.log("swiped right");
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
