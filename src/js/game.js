const spaceShip = document.querySelector("#spaceship");
spaceShip.style.marginLeft = centerSpaceShip();
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var game_running = false;
var time = 2000;
let point = 0;

if(isMobile){
    let game = document.querySelector(".game");
    let btnUpMove = document.querySelector(".btn-up-move")
    btnUpMove.classList.add('flex');
    btnUpMove.classList.remove('hidden');

    game.classList.remove('flex');
    game.classList.add('hidden');

    function checkOrientation(){
        if(this.screen.orientation.angle > 0 || this.screen.orientation.angle < 0){
            let warning = document.querySelector('.mobile-warning');
            warning.classList.remove('flex');
            warning.classList.add('hidden');
            game.classList.remove('hidden');
            game.classList.add('flex');
            
        }
        else{
            let warning = document.querySelector('.mobile-warning');
            game.classList.remove('flex');
            game.classList.add('hidden');
            warning.classList.remove('hidden');
            warning.classList.add('flex');
        }
    }
    
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);    

    let start = document.querySelector('.start');
    let btnMove = document.querySelector('.btn-move');
    let btnAttack = document.querySelector('.attack');
    start.innerHTML = "PRESS TO START";
    let moveX = 0;
    document.querySelector('#projects').addEventListener('touchend', function(){
        if(!game_running){
            game_running = true;
             document.querySelector(".start").classList.add('hidden')
             Enemys();
             Timer(); 
         }
    });
    btnMove.addEventListener("touchmove",function(event){
        if(event.touches[0].clientX < moveX){
            btnMove.style.left = "-24%";
            MoveSpaceShip('left');
        }
        else{
            btnMove.style.left = "76%";
            MoveSpaceShip('right');
        }
        
        moveX = event.touches[0].clientX;
    });
    btnAttack.addEventListener("touchstart", function(){
        const shootBase = document.querySelector("#shoot");
        const shoot = shootBase.cloneNode(true);
        shoot.classList.remove('hidden');
        shoot.classList.add('shoot');
        shoot.style.top = "98%";
        shoot.style.left = position();
        document.querySelector('.shoots').appendChild(shoot);
        Shoot(shoot);
    });
}


function MoveSpaceShip(size){
    if(spaceShip.style.marginLeft == ""){
        spaceShip.style.marginLeft = "1px";
    }
    if(size == "right"){
        spaceShip.style.marginLeft = `${parseInt(spaceShip.style.marginLeft) + 2}%`;
        if(parseInt(spaceShip.style.marginLeft) > 95){
            spaceShip.style.marginLeft = "96%"
        }
    }
    else{
        spaceShip.style.marginLeft = `${parseInt(spaceShip.style.marginLeft) - 2}%`;
        if(parseInt(spaceShip.style.marginLeft) < 2){
            spaceShip.style.marginLeft = "1%"
        }
    }

}

document.addEventListener("keydown", function(event){
    if(event.key == "ArrowRight"){
        MoveSpaceShip('right');
    }
    if(event.key == "ArrowLeft"){
        MoveSpaceShip('left');
    }

    if(event.code == "KeyX"){
        game_running = false;
        document.querySelector('.start').classList.remove('hidden');
        second = 0;
        minute = 0;
        point = 0;
        document.querySelector("#points").innerHTML = "0";
        seconds.innerHTML = "00";
        minutes.innerHTML = "00";
    }

    if(event.code == "KeyS"){
        if(!game_running){
           game_running = true;
            document.querySelector(".start").classList.add('hidden')
            Enemys();
            Timer(); 
        }
        
    }

    // ======================================

  

    

});

document.addEventListener('keypress', function(event){
    if(event.code == "Space"){
        const shootBase = document.querySelector("#shoot");
        const shoot = shootBase.cloneNode(true);
        shoot.classList.remove('hidden');
        shoot.classList.add('shoot');
        shoot.style.top = "98%";
        shoot.style.left = position();
        document.querySelector('.shoots').appendChild(shoot);
        Shoot(shoot);
    }
});

function Shoot(e){
    colide(e);
    setTimeout(function(){
        var position_now = parseInt(e.style.top);
        var speed = 4;
        var position_new = `${position_now - speed}%`;
        if(!(parseInt(position_new) < -10)){
            e.style.top = position_new;
            Shoot(e);
        }
        else{
            e.remove();
        }
    }, 200)   
}

function position(){
    const screenSize = screen.width;
    var spaceShipMargin = spaceShip.style.marginLeft;
    var center = (20 * 100) / screenSize;
    return `${parseFloat(spaceShipMargin) + parseFloat(center)}%`
}

function centerSpaceShip(){
    var center = (screen.width / 2) - 20;
    return `${(center * 100) / screen.width}%`
}

function Enemys(){
    const enemyBase = document.querySelector("#enemy");
    setTimeout(function(){
        const enemy = enemyBase.cloneNode(true);
        enemy.classList.remove('hidden');
        enemy.classList.add('enemy');
        enemy.style.top = "1%";
        enemy.style.left = positionEnemy();
        document.querySelector('.shoots').appendChild(enemy);
        time = 4000;
        walkEnemy(enemy);
        if(game_running){
            Enemys();
        }
    }, time)
        
        
}

function walkEnemy(e){
    setTimeout(function(){
        var position_now = parseInt(e.style.top);
        var speed = 1;
        var position_new = `${position_now + speed}%`;
        if(!(parseInt(position_new) > 99) && game_running){
            e.style.top = position_new;
            walkEnemy(e);
        }
        else{
            e.remove();
        }
    }, 200)
}

function positionEnemy(){
    var position = Math.floor(Math.random() * 96);
    var size = Math.floor(Math.random * 3);
    if(size < 2){
        position  = position * (-1);
    }
    return `${position}%`
}

function colide(e){
    let enemies = document.querySelectorAll('.enemy');
    let rect_shoot = e.getBoundingClientRect();
    enemies.forEach(touch);
    function touch(enemy){
        let rect_enemy = enemy.getBoundingClientRect();
        console.log(rect_shoot.x, rect_enemy.width, rect_enemy.x)
        if(rect_shoot.x >= rect_enemy.x && rect_shoot.x <= rect_enemy.right){
            if(rect_shoot.y < rect_enemy.bottom){
                setTimeout(function(){
                  e.remove();
                  enemy.remove();
                  point++;
                  document.getElementById("points").innerHTML = point;
                }, 200)
                
            }
        }
    }
    }

/* =================== TIME ===================  */
let seconds = document.querySelector("#seconds");
let second = 0;
let minutes = document.querySelector("#minutes");
let minute = 0;
function Timer(){
    setTimeout(function(){
        if(game_running){ 
        second++;
        if(second == 60){
            second = 0;
            minute += 1;
        }
        if(minute > 0){
            if(minute < 10){
                minutes.innerHTML = `0${minute}`;
            }
            else{
                minutes.innerHTML = minute;
            }
        }
        if(second < 10){
            seconds.innerHTML = `0${second}`;
        }
        else{
            seconds.innerHTML = second;
        }
        Timer();
        }
        
    }, 1000)
}


