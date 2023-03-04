import './dino.css'
import GoHome from '../../components/GoHome'

export default function Dino () {
//* ***** GAME LOOP ********//

  let time = new Date()
  let deltaTime = 0

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 1)
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }

  function init () {
    time = new Date()
    Start()
    Loop()
  }

  function Loop () {
    deltaTime = (new Date() - time) / 1000
    time = new Date()
    Update()
    requestAnimationFrame(Loop)
  }

  //* ***** GAME LOGIC ********//

  let floorY = 22
  let velY = 0
  let impulse = 900
  let gravity = 2500

  let dinoPosX = 42
  let dinoPosY = floorY

  let floorX = 0
  let scenarioSpeed = 1280 / 3
  let gameVel = 1
  let score = 0

  let stopped = false
  let jumping = false

  let timeToObstacle = 2
  let timeObstacleMin = 0.7
  let timeObstacleMax = 1.8
  let obstaclePosY = 16
  let obstacles = []

  let timeToCloud = 0.5
  let timeCloudMin = 0.7
  let timeCloudMax = 2.7
  let maxCloudY = 270
  let minCloudY = 100
  let clouds = []
  let velCloud = 0.5

  let content
  let dino
  let textScore
  let floor
  let gameOver

  function Start () {
    gameOver = document.querySelector('.game-over')
    floor = document.querySelector('.floor')
    content = document.querySelector('.content')
    textScore = document.querySelector('.score')
    dino = document.querySelector('.dino')
    document.addEventListener('keydown', HandleKeyDown)
    document.addEventListener('click', HandleKeyDown)
  }

  function Update () {
    if (stopped) return

    moveDinosaur()
    moveFloor()
    decideCreateObstacles()
    decideCreateClouds()
    moveObstacles()
    moveClouds()
    detectCollision()

    velY -= gravity * deltaTime
  }

  function HandleKeyDown (ev) {
    if (ev.keyCode === 32) {
      if (stopped) {
        reset()
      } else {
        jump()
      }
    } else if (!ev.keyCode) {
      if (stopped) {
        reset()
      } else {
        jump()
      }
    }
  }

  function reset () {
    dino.classList.add('dino-running')
    dino.classList.remove('dino-crashed')
    gameOver.style.display = 'none'
    floorY = 22
    velY = 0
    impulse = 900
    gravity = 2500
    dinoPosX = 42
    dinoPosY = floorY
    floorX = 0
    scenarioSpeed = 1280 / 3
    gameVel = 1
    score = 0
    stopped = false
    jumping = false
    timeToObstacle = 2
    timeObstacleMin = 0.7
    timeObstacleMax = 1.8
    obstaclePosY = 16
    obstacles = []
    timeToCloud = 0.5
    timeCloudMin = 0.7
    timeCloudMax = 2.7
    maxCloudY = 270
    minCloudY = 100
    clouds = []
    velCloud = 0.5
    textScore.innerText = 0
    content.classList.remove('noon')
    content.classList.remove('evening')
    content.classList.remove('night')
    const cactus = document.querySelectorAll('.cactus')
    const cloud = document.querySelectorAll('.cloud')
    for (let i = 0; i < cactus.length; i++) {
      cactus[i].remove()
    }
    for (let i = 0; i < cloud.length; i++) {
      cloud[i].remove()
    }
    init()
  }

  function jump () {
    if (dinoPosY === floorY) {
      jumping = true
      velY = impulse
      dino.classList.remove('dino-running')
    }
  }

  function moveDinosaur () {
    dinoPosY += velY * deltaTime
    if (dinoPosY < floorY) {
      touchFloor()
    }
    dino.style.bottom = dinoPosY + 'px'
  }

  function touchFloor () {
    dinoPosY = floorY
    velY = 0
    if (jumping) {
      dino.classList.add('dino-running')
    }
    jumping = false
  }

  function moveFloor () {
    floorX += calculateDisplacement()
    floor.style.left = -(floorX % content.clientWidth) + 'px'
  }

  function calculateDisplacement () {
    return scenarioSpeed * deltaTime * gameVel
  }

  function crash () {
    dino.classList.remove('dino-running')
    dino.classList.add('dino-crashed')
    stopped = true
  }

  function decideCreateObstacles () {
    timeToObstacle -= deltaTime
    if (timeToObstacle <= 0) {
      createObstacle()
    }
  }

  function decideCreateClouds () {
    timeToCloud -= deltaTime
    if (timeToCloud <= 0) {
      createCloud()
    }
  }

  function createObstacle () {
    const obstacle = document.createElement('div')
    content.appendChild(obstacle)
    obstacle.classList.add('cactus')
    if (Math.random() > 0.5) obstacle.classList.add('cactus2')
    obstacle.posX = content.clientWidth
    obstacle.style.left = content.clientWidth + 'px'

    obstacles.push(obstacle)
    timeToObstacle = timeObstacleMin + Math.random() * (timeObstacleMax - timeObstacleMin) / gameVel
  }

  function createCloud () {
    const cloud = document.createElement('div')
    content.appendChild(cloud)
    cloud.classList.add('cloud')
    cloud.posX = content.clientWidth
    cloud.style.left = content.clientWidth + 'px'
    cloud.style.bottom = minCloudY + Math.random() * (maxCloudY - minCloudY) + 'px'

    clouds.push(cloud)
    timeToCloud = timeCloudMin + Math.random() * (timeCloudMax - timeCloudMin) / gameVel
  }

  function moveObstacles () {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      if (obstacles[i].posX < -obstacles[i].clientWidth) {
        obstacles[i].parentNode.removeChild(obstacles[i])
        obstacles.splice(i, 1)
        winPoints()
      } else {
        obstacles[i].posX -= calculateDisplacement()
        obstacles[i].style.left = obstacles[i].posX + 'px'
      }
    }
  }

  function moveClouds () {
    for (let i = clouds.length - 1; i >= 0; i--) {
      if (clouds[i].posX < -clouds[i].clientWidth) {
        clouds[i].parentNode.removeChild(clouds[i])
        clouds.splice(i, 1)
      } else {
        clouds[i].posX -= calculateDisplacement() * velCloud
        clouds[i].style.left = clouds[i].posX + 'px'
      }
    }
  }

  function winPoints () {
    score++
    textScore.innerText = score
    if (score === 5) {
      gameVel = 1.5
      content.classList.add('noon')
    } else if (score === 10) {
      gameVel = 2
      content.classList.add('evening')
    } else if (score === 20) {
      gameVel = 3
      content.classList.add('night')
    }
    floor.style.animationDuration = (3 / gameVel) + 's'
  }

  function GameOver () {
    crash()
    gameOver.style.display = 'block'
  }

  function detectCollision () {
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].posX > dinoPosX + dino.clientWidth) {
        // EVADE
        break // Being in order, you can't collide with more
      } else {
        if (IsCollision(dino, obstacles[i], 10, 30, 15, 20)) {
          GameOver()
        }
      }
    }
  }

  function IsCollision (a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    const aRect = a.getBoundingClientRect()
    const bRect = b.getBoundingClientRect()

    return !(
      ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    )
  }

  return (
    <div>
      <GoHome />
      <div className='content'>

        <div className='floor' />

        <div className='dino dino-running' />

        <div className='score'>0</div>

      </div>

      <div className='game-over'>GAME OVER</div>
    </div>
  )
}
