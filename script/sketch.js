// GPT 활용

let particles = [];
const oWidth = 800;
const oHeight = 650;
let rectWidth = (oWidth / 800) * 700; // 네모의 가로 길이
let rectHeight = (oWidth / 800) * 500; // 네모의 세로 길이

let aShapeX; // A 도형의 x 좌표
let aShapeY; // A 도형의 y 좌표

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // A 도형 초기 설정
  aShapeX = width / oWidth;
  aShapeY = oHeight * 0.9;
}

function draw() {
  background('#FFEE72');

  let activeParticles = 0;

  // 스케치북 네모 그리기
  fill('#FFEDDD');
  noStroke();

  rectMode(CENTER);
  let canvasR = min(width / oWidth, height / oHeight);
  let yOffset = 80 * (height / oHeight); // 높이에 비례한 값을 계산
  rect(
    width / 2,
    height / 2 - 0.5 * yOffset,
    rectWidth * canvasR,
    rectHeight * canvasR,
    20
  );

  // 생성된 particle들을 그림
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].color.levels[3] >= 100) {
      activeParticles++;
    }

    if (millis() - particles[i].startTime > 1000) {
      particles[i].color.levels[3] -= 2;
      particles[i].color.levels[3] = constrain(
        particles[i].color.levels[3],
        0,
        255
      );
    }

    if (particles[i].color.levels[3] === 0) {
      particles.splice(i, 1);
    }
  }

  // 마우스가 캔버스 내부에 있는 경우에만 새로운 파티클 생성
  if (isMouseInsideCanvas()) {
    if (random() > 0.5) {
      let particle = new CustomParticle(
        constrain(
          mouseX,
          width / 2 - rectWidth / 2 + 30 * canvasR,
          width / 2 + rectWidth / 2 - 30 * canvasR
        ),
        constrain(
          mouseY,
          height / 2 - rectHeight / 2,
          height / 2 + rectHeight / 2 - 90
        )
      );
      particles.push(particle);
    }
  }

  // 말풍선
  for (let i = 0; i < 10; i++) {
    let x = (182 + i * 61) * canvasR;
    let y = aShapeY * canvasR;
    drawCircle2((80 + i * 61) * canvasR, aShapeY * canvasR, 15 * canvasR);
  }

  fill('#B6DBEF');
  let cloud = [
    { x: 675, y: 710 },
    { x: 680, y: 685 },
    { x: 695, y: 702 },
    { x: 650, y: 710 },
    { x: 660, y: 690 },
    { x: 667, y: 785 },
  ];

  // 말풍선 꼬리
  for (let coord of cloud) {
    let x = coord.x * canvasR + 20;
    let y = coord.y * canvasR - 120 * canvasR; // 수정된 부분
    let diameter = 32 * canvasR;
    ellipse(x, y, diameter, diameter);
  }

  // shapeA 그리기
  noStroke();
  fill('#FFEE72');

  // 가려지는 면
  rect(
    (aShapeX - 340) * canvasR,
    aShapeY * canvasR,
    700 * canvasR,
    40 * canvasR
  );

  //kid
  fill('#4E1D00');
  ellipse((aShapeX + 30) * canvasR, (aShapeY - 20) * canvasR, 20 * canvasR);
  ellipse((aShapeX - 30) * canvasR, (aShapeY - 20) * canvasR, 20 * canvasR);
  ellipse((aShapeX - 40) * canvasR, (aShapeY - 10) * canvasR, 20 * canvasR);
  ellipse((aShapeX + 40) * canvasR, (aShapeY - 10) * canvasR, 20 * canvasR);
  ellipse((aShapeX - 50) * canvasR, (aShapeY + 1) * canvasR, 15 * canvasR);
  ellipse((aShapeX + 50) * canvasR, (aShapeY + 1) * canvasR, 15 * canvasR);

  fill('#FFCAAA');
  ellipse(
    aShapeX * canvasR,
    (aShapeY + 3) * canvasR,
    60 * canvasR,
    55 * canvasR
  );

  fill('#4E1D00');
  arc(
    aShapeX * canvasR,
    aShapeY * canvasR,
    65 * canvasR,
    62 * canvasR,
    160,
    0.3
  );
  ellipse(
    (aShapeX + 5) * canvasR,
    (aShapeY + 10) * canvasR,
    4 * canvasR,
    6 * canvasR
  );
  ellipse(
    (aShapeX - 5) * canvasR,
    (aShapeY + 10) * canvasR,
    4 * canvasR,
    6 * canvasR
  );

  fill('#FF4D4D');
  ellipse(
    (aShapeX + 18) * canvasR,
    (aShapeY + 15) * canvasR,
    10 * canvasR,
    8 * canvasR
  );
  ellipse(
    (aShapeX - 18) * canvasR,
    (aShapeY + 15) * canvasR,
    10 * canvasR,
    8 * canvasR
  );

  // shapeA 이동 로직
  let targetX = map(activeParticles, 0, 550, 160 * canvasR, 600 * canvasR);

  // 부드러운 이동을 위해 값의 변화를 작게 조절
  let easing = 0.1;
  let deltaX = (targetX - aShapeX) * easing;
  aShapeX += deltaX;

  aShapeX = constrain(aShapeX, 160 * canvasR, 520 * canvasR);

  //스케치북 용수철모양
  drawWavyLine(
    90 * canvasR,
    30 * canvasR,
    626 * canvasR,
    0.1 * canvasR,
    15 * canvasR
  );
}

function drawWavyLine(x, y, length, frequency, amplitude) {
  stroke('#90D9E8');
  noFill();
  strokeWeight(15);

  beginShape();
  for (let i = 0; i < length; i += 1) {
    let xpos = x + i;
    let ypos = y + cos(i * frequency) * amplitude;
    vertex(xpos, ypos);
  }
  endShape();
}

function drawCircle2(x, y, diameter) {
  fill('#B6DBEF');
  noStroke(0);
  ellipse(x, y, diameter, diameter);
}

// 마우스가 캔버스 내부에 있는지 확인하는 함수
function isMouseInsideCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

// CustomParticle 클래스 정의
class CustomParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(
      random(180, 360),
      random(120, 360),
      random(100, 360),
      random(170, 360)
    );
    this.numShapes = 6; // 도형의 개수
    this.startTime = millis(); // 생성 시간 저장
    this.baseSize = 12; // 기본 크기
  }

  update() {
    // 파티클 흔들리게
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.color.levels[3]
    );

    // 주어진 도형의 파티클 그리기
    push();
    translate(this.x, this.y);
    rotate(radians(190));

    // 캔버스 크기에 따라 비율 계산
    let sizeRatio = (width / oWidth) * 0.8;
    let shapeGap = 0.000001 * sizeRatio; // 도형 간격

    for (let i = 0; i < this.numShapes; i++) {
      rotate(radians(0));
      ellipse(
        (this.baseSize + shapeGap * i) * sizeRatio,
        0,
        this.baseSize * sizeRatio,
        10 * sizeRatio
      );
    }
    pop();
  }
}
function mouseMoved() {
  // 전체 캔버스의 크기 비율
  let canvasR = min(width / oWidth, height / oHeight);

  // 최소 캔버스 크기를 전체 캔버스 크기에 대한 비율로 설정
  let minCanvasWidth = oWidth * 0.75; // 예시로 전체 캔버스의 75%
  let minCanvasHeight = oHeight * 0.75; // 예시로 전체 캔버스의 75%

  let canvasWidth = min(width, minCanvasWidth);
  let canvasHeight = (canvasWidth / 6) * 4; // 6:4 비율로 조절

  // 최소 캔버스 크기에 대한 비율로 파티클 생성 범위 조절
  let minX = width / 2 - rectWidth / 2 + 30 * canvasR;
  let maxX = width / 2 + rectWidth / 2 - 30 * canvasR;
  let minY = height / 2 - rectHeight / 2;
  let maxY = height / 2 + rectHeight / 2 - 90 * canvasR;

  // 마우스 위치에 따라 파티클 생성
  let particleX = constrain(mouseX, minX, maxX);
  let particleY = constrain(mouseY, minY, maxY);

  // aShapeX의 초기값을 기준으로 파티클 생성
  let particle = new CustomParticle(particleX, particleY);
  particles.push(particle);
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
}
