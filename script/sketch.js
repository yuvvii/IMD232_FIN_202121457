let particles = [];
const oWidth = 800;
const oHeight = 700;
let rectWidth = (oWidth / 800) * 700; // 네모의 가로 길이
let rectHeight = (oWidth / 800) * 550; // 네모의 세로 길이

let aShapeX; // A 도형의 x 좌표
let aShapeY; // A 도형의 y 좌표

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // A 도형 초기 설정
  aShapeX = width / oWidth + 40 * (width / oWidth);
  aShapeY = (540 * height) / oHeight;
}

function draw() {
  background('#FFEE72');

  let activeParticles = 0;

  // 네모 그리기
  fill('#FFEDDD');
  noStroke();

  // 캔버스 비율 적용
  rectMode(CENTER);
  let canvasRatio = min(width / oWidth, height / oHeight);
  let yOffset = 75 * (height / oHeight); // 높이에 비례한 값을 계산
  rect(
    width / 2,
    height / 2 - 0.5 * yOffset,
    rectWidth * canvasRatio,
    rectHeight * canvasRatio,
    20
  );

  // 생성된 particle들을 그림
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].color.levels[3] >= 80) {
      activeParticles++;
    }

    if (millis() - particles[i].startTime > 2000) {
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
          width / 2 - rectWidth / 2 + 30 * canvasRatio,
          width / 2 + rectWidth / 2 - 30 * canvasRatio
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
    let x = (182 + i * 61) * canvasRatio;
    let y = aShapeY * canvasRatio;
    drawCircle2(
      (182 + i * 61) * canvasRatio,
      (aShapeY + 160) * canvasRatio,
      18 * canvasRatio
    );
  }

  fill('#B6DBEF');
  let ellipseCoords = [
    { x: 670, y: 730 + 10 - 30 },
    { x: 650, y: 730 - 15 - 30 },
    { x: 685, y: 730 + 2 - 30 },
    { x: 650, y: 730 + 10 - 30 },
    { x: 640, y: 730 + 5 - 30 },
    { x: 667, y: 730 - 15 - 30 },
  ];

  for (let coord of ellipseCoords) {
    let x = coord.x * canvasRatio + 40;
    let y = coord.y * canvasRatio - 70 * canvasRatio; // 수정된 부분
    let diameter = 32 * canvasRatio;
    ellipse(x, y, diameter, diameter);
  }

  // A 도형 그리기
  noStroke();
  fill('#FFEE72');
  rect(
    (aShapeX - 300) * canvasRatio,
    aShapeY * canvasRatio,
    600 * canvasRatio,
    40 * canvasRatio
  );

  fill('#4E1D00');
  ellipse(
    (aShapeX + 30) * canvasRatio,
    (aShapeY - 20) * canvasRatio,
    20 * canvasRatio
  );
  ellipse(
    (aShapeX - 30) * canvasRatio,
    (aShapeY - 20) * canvasRatio,
    20 * canvasRatio
  );
  ellipse(
    (aShapeX - 40) * canvasRatio,
    (aShapeY - 10) * canvasRatio,
    20 * canvasRatio
  );
  ellipse(
    (aShapeX + 40) * canvasRatio,
    (aShapeY - 10) * canvasRatio,
    20 * canvasRatio
  );
  ellipse(
    (aShapeX - 50) * canvasRatio,
    (aShapeY + 1) * canvasRatio,
    15 * canvasRatio
  );
  ellipse(
    (aShapeX + 50) * canvasRatio,
    (aShapeY + 1) * canvasRatio,
    15 * canvasRatio
  );

  fill('#FFCAAA');
  ellipse(
    aShapeX * canvasRatio,
    (aShapeY + 3) * canvasRatio,
    60 * canvasRatio,
    55 * canvasRatio
  );

  fill('#4E1D00');
  arc(
    aShapeX * canvasRatio,
    aShapeY * canvasRatio,
    65 * canvasRatio,
    62 * canvasRatio,
    160,
    0.3
  );
  ellipse(
    (aShapeX + 5) * canvasRatio,
    (aShapeY + 10) * canvasRatio,
    4 * canvasRatio,
    6 * canvasRatio
  );
  ellipse(
    (aShapeX - 5) * canvasRatio,
    (aShapeY + 10) * canvasRatio,
    4 * canvasRatio,
    6 * canvasRatio
  );

  fill('#FF4D4D');
  ellipse(
    (aShapeX + 18) * canvasRatio,
    (aShapeY + 15) * canvasRatio,
    10 * canvasRatio,
    8 * canvasRatio
  );
  ellipse(
    (aShapeX - 18) * canvasRatio,
    (aShapeY + 15) * canvasRatio,
    10 * canvasRatio,
    8 * canvasRatio
  );

  // A 도형 이동 로직
  let targetX = map(
    activeParticles,
    0,
    300,
    160 * canvasRatio,
    800 * canvasRatio
  );
  aShapeX += (targetX - aShapeX) * 0.05;

  aShapeX = constrain(aShapeX, 160 * canvasRatio, 800 * canvasRatio);

  // // 스케치북 구멍
  // for (let i = 0; i < 11; i++) {
  //   drawCircle(80 + i * 60 * canvasRatio, 80 * canvasRatio, 30 * canvasRatio);
  // }

  //가로로 길게 용수철처럼 구불거리는 선 그리기
  drawWavyLine(
    90 * canvasRatio,
    30 * canvasRatio,
    626 * canvasRatio,
    0.1 * canvasRatio,
    15 * canvasRatio
  );
}

function drawCircle(x, y, diameter) {
  fill('#FFC272');
  noStroke(0);
  ellipse(x, y, diameter, diameter);
}

function drawCircle2(x, y, diameter) {
  fill('#B6DBEF');
  noStroke(0);
  ellipse(x, y, diameter, diameter);
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
    this.baseSize = 11; // 기본 크기
  }

  update() {
    // 움직임 로직 추가 (예: 마우스 위치로 이동)
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
    rotate(radians(90));

    // 캔버스 크기에 따라 비율 계산
    let sizeRatio = (width / oWidth) * 0.8;
    let shapeGap = 0.000001 * sizeRatio; // 도형 간격

    for (let i = 0; i < this.numShapes; i++) {
      rotate(radians(60));
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

function isInsideRect(x, y, rectX, rectY, rectWidth, rectHeight) {
  return (
    x > rectX - rectWidth / 2 &&
    x < rectX + rectWidth / 2 &&
    y > rectY - rectHeight / 2 &&
    y < rectY + rectHeight / 2 - 20
  );
}
function mouseMoved() {
  // 마우스가 캔버스 내부에 있는 경우에만 새로운 파티클 생성
  if (isMouseInsideCanvas() && random() > 0.5) {
    let constrainedY = constrain(
      mouseY,
      height / 2 - rectHeight / 2 + 50,
      height / 2 + rectHeight / 2 - 230
    );

    if (constrainedY !== mouseY) {
      return; // y 좌표가 제한되었다면 함수를 빠져나감
    }

    let particle = new CustomParticle(
      constrain(
        mouseX,
        width / 2 - rectWidth / 2 + 30,
        width / 2 + rectWidth / 2 - 30
      ),
      constrainedY
    );
    particles.push(particle);
    mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  }
}
