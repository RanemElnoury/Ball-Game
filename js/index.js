const game = document.querySelector(".game-container");
const char = document.querySelector(".character");
let interval;
let KeyDown;

const moveLeft=() =>{
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
    if(leftPos>0)
        char.style.left=leftPos - 2 + "px";
}
const moveRight=() =>{
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
    if(leftPos < 370)
        char.style.left=leftPos + 2 + "px";
}

document.addEventListener("keydown",(event)=>{
    if(!KeyDown){
        if(event.key == "ArrowLeft"){
            interval= setInterval(moveLeft,1)
        }
        else if(event.key == "ArrowRight"){
            interval= setInterval(moveRight,1)
        }
    }
    KeyDown=true;
})

document.addEventListener("keyup",()=>{
    clearInterval(interval);
    KeyDown=false;
})

document.addEventListener("mousemove", function (e) {
    const gameRect = game.getBoundingClientRect();
    let x = e.clientX - gameRect.left;

    if (x >= 0 && x <= gameRect.width - char.offsetWidth) {
        char.style.left = x + "px";
    }
});

document.addEventListener("touchmove", function (e) {
    const gameRect = game.getBoundingClientRect();
    let touch = e.touches[0];
    let x = touch.clientX - gameRect.left;

    if (x >= 0 && x <= gameRect.width - char.offsetWidth) {
        char.style.left = x + "px";
    }
});

const generateObstacle=()=>{
    let block = document.createElement("div");
    let hole = document.createElement("div");
    block.setAttribute("class","block");
    hole.setAttribute("class","hole");
    let randHolePos = Math.floor(Math.random()*320);
    hole.style.left= randHolePos + "px";
    game.appendChild(block);
    game.appendChild(hole);

    $('.block').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e){$(this).remove();})
    $('.hole').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e){$(this).remove();})
}

setInterval(generateObstacle,1500);

const checkCollisions =()=>{
    const allBlocks = document.querySelectorAll(".block");
    const allHoles = document.querySelectorAll(".hole");

    allBlocks.forEach(b =>{
        let hitObstacle = false
        if(Collision(b,char)){
            hitObstacle=true;
            allHoles.forEach(h =>{
                if(holeCollision(h,char)){
                    hitObstacle= false;
                }
            })
        }
        if (hitObstacle){
            alert("Game Over !!!!!!!");
            location.reload();
        }
    })

}
setInterval(checkCollisions,1);

function Collision(a,b) {
    let a_top = parseInt(window.getComputedStyle(a).getPropertyValue("top"));
    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));
    return(
        a_top +20 >b_top && a_top < b_top+20
    );
}

function holeCollision(h,b){
        let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left"));
        let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top"));

        let b_left = parseInt(window.getComputedStyle(b).getPropertyValue("left"));
        let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

        return(
            b_left > h_left && b_left < h_left +50 && 
            h_top + 20 > b_top && h_top < b_top + 20
        );
}
