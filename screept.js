const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1000
canvas.height = 600
let score  = 0;

const gravity = 0.3
const backgroundHouse = new Image();
const helthbar = new Image();
const roof = new Image();
const backgroundbacksec = new Image();
const enemySprite = new Image();
const enemySpriteAtack = new Image();
const playerSprite = new Image();
const playerRunSprite = new Image();
const playerAtackSprite = new Image();
const playerJumpSprite = new Image();
helthbar.src = 'Back/hp.png'
backgroundHouse.src = 'Back/5.png';
roof.src = 'Back/roof.png'
backgroundbacksec.src = 'Back/10.png';
playerRunSprite.src = 'Sprites/Run.png';
playerSprite.src = 'Sprites/Idle.png';
playerAtackSprite.src = 'Sprites/Attack1.png';
playerJumpSprite.src = 'Sprites/Jump.png';
enemySprite.src = 'Yurei/Idle.png';
enemySpriteAtack.src = 'Yurei/Hurt2.png';
playerSprite.onload = function()
{
    animate();
}
class Player
{
    constructor()
    {
        this.position = 
        {
            x: 100,
            y: 100
        }
        this.velocity = 
        {
            x:0,
            y:0
        }

        this.helthpoint = 100;
        this.currentFrameIndex = 0;
        this.frameTimer = 0;
        this.isDied = false;
        this.isRunning = false;
        this.isAtack = false;
        this.isJump = false;
    }
    draw()
    {

        if (this.isRunning) {
            let frameWidth = 200;
            let frameHeight = 400;
            let frameX = this.currentFrameIndex * frameWidth;
            let frameY = 0;

                c.drawImage(playerRunSprite, frameX, frameY, frameWidth, frameHeight, this.position.x, this.position.y, frameWidth, frameHeight);

  
        }else if(this.isAtack)
        {
            let frameWidth = 200;
            let frameHeight = 400;
            let frameX = this.currentFrameIndex * frameWidth;
            let frameY = 0;
            c.drawImage(playerAtackSprite, frameX, frameY, frameWidth, frameHeight, this.position.x, this.position.y, frameWidth, frameHeight);
        }
        else if(this.isJump )
        {
            let frameWidth = 200;
            let frameHeight = 400;
            let frameX = this.currentFrameIndex * frameWidth;
            let frameY = 0;
            c.drawImage(playerJumpSprite, frameX, frameY, frameWidth, frameHeight, this.position.x, this.position.y, frameWidth, frameHeight);
        }
         else {

            let frameWidth = 200;
            let frameHeight = 400;
            let frameX = this.currentFrameIndex * frameWidth;
            let frameY = 0;
            c.drawImage(playerSprite, frameX, frameY, frameWidth, frameHeight, this.position.x, this.position.y, frameWidth, frameHeight);
        }

        
    }
    update()
    {
        enemys.forEach((enemy) => {
        if(player.position.x + 130 >= enemy.position.x && 
            player.position.x  <= enemy.position.x && 
            player.position.y - 120 <= enemy.position.y &&
            player.position.y + 120 >= enemy.position.y )
        {
            // console.log(player.helthpoint)

            player.helthpoint -= 0.2
        }
    })

        const popup = document.getElementById('pop-up-lose');
        const popupwin = document.getElementById('pop-up-win');

if(player.position.y >= canvas.height)
{
    popup.style.display = 'block';
}
    if(player.helthpoint <= 0 )
    {
        popup.style.display = 'block';
    }
    if(scrollOffset >= 6000)
    {
        popupwin.style.display = 'block';
    }
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y += gravity;


        this.frameTimer += 1;
        if (this.frameTimer >= 18) {
            this.frameTimer = 0;
            this.currentFrameIndex += 1;
            if (this.currentFrameIndex >= playerSprite.width / 300) {
                this.currentFrameIndex = 0;
            }
        }
        if(player.isJump && this.frameTimer >= 15)
        {
            this.frameTimer = 0;
            this.currentFrameIndex += 1;
            if (this.currentFrameIndex >= playerSprite.width / 800) {
                this.currentFrameIndex = 0;
            }
        }
    }
}

class Enemy
{
    constructor({x, y}) {
        this.width = 500;
        this.height = 150;
        this.position = {x, y};
        this.velocity = {x:0, y:0};
        this.currentFrame = 0;
        this.currentFrameatack = 0;
        this.helthpoint = 100;
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % 5; // Обновление отображаемого фрагмента картинки каждые 500 миллисекунд
          }, 200);

        setInterval(() => {
        this.currentFrameatack = (this.currentFrameatack + 1) % 3; // Обновление отображаемого фрагмента картинки каждые 500 миллисекунд
        }, 200);
        
        }

    draw()
    {

            const frameWidth = enemySprite.width / 5;
            const frameHeight = enemySprite.height;
            c.drawImage(enemySprite, this.currentFrame * frameWidth, 0, frameWidth, frameHeight, this.position.x, this.position.y, this.width / 5, this.height);

            enemys.forEach((enemy) => {

                if(player.isAtack && 
                    player.position.x + 130 >= enemy.position.x && 
                    player.position.x  <= enemy.position.x && 
                    player.position.y - 120 <= enemy.position.y &&
                    player.position.y + 120 >= enemy.position.y 
                    )
                    {
                        enemy.helthpoint -= 3
                        console.log('enemy hp',enemy.helthpoint);
                    }
                    
            })
    }

    atack()
    {
        const frameWidth = enemySpriteAtack.width / 3;
        const frameHeight = enemySpriteAtack.height;
        c.drawImage(enemySpriteAtack, this.currentFrameatack * frameWidth, 0, frameWidth, frameHeight, this.position.x, this.position.y, this.width / 3, this.height);
    }
}
class PlayerHp
{
    constructor({x,y})
    {
        this.width = player.helthpoint * 2.5
        this.height = 30
        this.position =
        {
            x,
            y
        }
        

        this.velocity = 
        {
            x:0,
            y:0
        }
    }

    draw()
    {
        c.fillStyle ='red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(helthbar,this.position.x - 50,this.position.y - 20,380,this.height + 70)
    }
}

class Platform
{
    
    constructor({x,y,z})
    {
        this.position =
        {
            x,
            y
        }
        this.width = 350
        this.height = z
    }

    draw()
    {
        c.drawImage(roof,this.position.x,this.position.y,this.width,this.height)
    }
}




class Backgroundbacksec
{
    
    constructor({x,y})
    {
        this.position =
        {
            x,
            y
        }
        this.width = 1400
        this.height = 900
    }

    draw()
    {
        c.drawImage(backgroundbacksec,this.position.x,this.position.y,this.width,this.height)
    }

}


const backgroundbacksecs = [];

for (let i = 0; i < 10; i++) {
  backgroundbacksecs.push(new Backgroundbacksec({ x: i * 1400, y: -200 }));
}
backgroundbacksecs.push(new Backgroundbacksec({ x: -1400, y: -200 }));

const enemys = [new Enemy({x: 250,y: 270}),
    new Enemy({x: 800,y: 270}),
    new Enemy({x: 1500,y: 270}),
    new Enemy({x: 1800,y: 270}),
    new Enemy({x: 2100,y: 160}),
    new Enemy({x: 2600,y: 160}),
    new Enemy({x: 3200,y: 270}),
    new Enemy({x: 3500,y: 270}),
    new Enemy({x: 3900,y: 270}),
    new Enemy({x: 4200,y: 270}),
    new Enemy({x: 4700,y: 270}),
    new Enemy({x: 5200,y: 270}),
    new Enemy({x: 5800,y: 270}),
]


const player = new Player()

const platforms = []
for (let i = 0; i < 60; i++) {
    if(i != 3 & i != 6 & i!=7 & i!=8 )
    platforms.push(new Platform({ x: i * 340, y: 400 , z: 200}));
  }
platforms.push(new Platform({x: 7 * 300 , y: 300,z: 300}))
platforms.push(new Platform({x: 7 * 350 , y: 300,z: 300}))







const keys = 
{
    right:{
        pressed: false
    },
    left:{
        pressed: false
    },
    atack:
    {
        pressed: false
    }

}

let scrollOffset = 0



function animate()
{
    
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    const playerhp = new PlayerHp({x: 10,y: 50})

    backgroundbacksecs.forEach((backgroundbacksec) => {
        backgroundbacksec.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    enemys.forEach((enemy) => {
        if(player.position.x + 130 >= enemy.position.x && 
            player.position.x  <= enemy.position.x && 
            player.position.y - 120 <= enemy.position.y &&
            player.position.y + 120 >= enemy.position.y )
        {
            enemy.atack()
        }
        else
        {
            enemy.draw()
        }
    })
    

    playerhp.draw()

    if(player.velocity.y >= 0)
    {
        player.isJump = false
    }

    if(keys.right.pressed && player.position.x < 500)
    {
        player.isRunning = true;
        player.velocity.x = 5
        
    }else if(keys.left.pressed && player.position.x > 100)
    {
        player.isRunning = true;
        player.velocity.x = -5
    }else 
    {
        player.isRunning = false;
        player.velocity.x = 0 

        if(keys.right.pressed)
        {
            player.isRunning = true;
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
            enemys.forEach((enemy) => {
                enemy.position.x -= 5
            })
            backgroundbacksecs.forEach((backgroundbacksecs) => {
                backgroundbacksecs.position.x -= 5
            })
            
          
        }else if(keys.left.pressed)
        {
            player.isRunning = true;
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            enemys.forEach((enemy) => {
                enemy.position.x += 5
            })
            backgroundbacksecs.forEach((backgroundbacksec) => {
                backgroundbacksec.position.x += 5
            })

            

        }
    }
    platforms.forEach((platform) => {
        if(player.position.y + 110 <= platform.position.y  && 
            player.position.y + 110 + player.velocity.y >= platform.position.y &&
            player.position.x + 100 >= platform.position.x &&
            player.position.x + 100 <= platform.position.x + platform.width)
        {
            player.velocity.y = 0
         }

         if(player.position.x + 100 > platform.position.x -10 &&
            player.position.x + 100 < platform.position.x + platform.width + 10  && 
            player.position.y + 90 >= platform.position.y)
            {
                player.velocity.x = 0
            }

    })
    enemys.forEach((enemy) => {

        if(player.isAtack && 
            player.position.x + 130 >= enemy.position.x && 
            player.position.x  <= enemy.position.x && 
            player.position.y - 120 <= enemy.position.y &&
            player.position.y + 120 >= enemy.position.y 
            )
            {

                score += 10;
                const scoreElement = document.getElementById('score');
                scoreElement.innerHTML = `you score: ${score}`;
                console.log("score", score);

                enemy.helthpoint -= 3
                console.log('enemy hp',enemy.helthpoint);
            }
        if(enemy.helthpoint <= 0)
        {
            enemy.position.y += 500;


        }

    })

    // if(player.helthpoint <= 0 | scrollOffset >= 3000)
    // {
    //     popup.style.display = 'block';
    // }
    
    // if(scrollOffset >= 3000)
    // {
    //     console.log("you win");
       
    // }
}
animate()
player.draw()






addEventListener('keydown',({ keyCode}) =>
{
    // console.log(keyCode)
    switch(keyCode)
    {
        case 65:
            console.log('left')
                if(scrollOffset >= 0)
                {
                    keys.left.pressed = true
                    break
                }else
                {
                    keys.left.pressed = false
                    break
                }
        case 68:
            console.log('right')
                    keys.right.pressed = true
                    break
            
        case 69:
            console.log('atack')
            player.isAtack = true;
            break
        case 83:
            console.log('down')
            break
        
    }
})
addEventListener('keyup',({ keyCode}) =>
{
    console.log(keyCode)
    switch(keyCode)
    {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            player.isJump = true
            if(player.velocity.y === 0)
            {
                player.velocity.y -= 12
            }

            break
        case 69:
            console.log('atack')
            player.isAtack = false;
            keys.atack.pressed = false
            break
    }
})


const parent = document.getElementById('pop-up-lose');
const parentwin = document.getElementById('pop-up-win');

parent.innerHTML =  `<div class="pop-up-text">
<p>game ower</p>
<p id="score">you score:${score}</p>
</div>
<div class="pop-up-btn">
<button id="restart">restart</button>
</div>`;

parentwin.innerHTML =  `<div class="pop-up-text">
<p>You win</p>
<p id="score">you score:${score}</p>
</div>
<div class="pop-up-btn">
<button id="win-restart">restart</button>
</div>`;

document.querySelector('#restart').onclick = function(){
    location.reload(); 
}
document.querySelector('#win-restart').onclick = function(){
    location.reload(); 
}


