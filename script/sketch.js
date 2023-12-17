let particles = [];
const oWidth = 800;
const oHeight = 700;
let rectWidth = 700; // 네모의 가로 길이
let rectHeight = 600; // 네모의 세로 길이

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);
}

function draw() {
  background('#FFEE72');

  let activeParticles = 0; // 투명도가 0이 아닌 파티클 개수

  // 네모 그리기
  fill('beige'); // 네모의 채우기 색 설정
  stroke('#FFC272');
  noStroke();

  rectMode(CENTER);
  rect(width / 2, height / 2 - 50, rectWidth, rectHeight, 20);

  // 생성된 particle들을 그림
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // 일정 시간이 지나면 투명도를 줄여서 사라지게 함
    if (millis() - particles[i].startTime > 3000) {
      particles[i].color.levels[3] -= 2;
      particles[i].color.levels[3] = constrain(
        particles[i].color.levels[3],
        0,
        255
      );
    }

    // 투명도가 0이 되면 배열에서 제거
    if (particles[i].color.levels[3] === 0) {
      particles.splice(i, 1);
    }
  }
}

console.log('파티클 개수:', particles.length);

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

    // noStroke();

    for (let i = 0; i < this.numShapes; i++) {
      rotate(radians(60));
      ellipse(8, 0, 12, 10);
    }
    pop();
  }
}

function isInsideRect(x, y, rectX, rectY, rectWidth, rectHeight) {
  return (
    x > rectX - rectWidth / 2 &&
    x < rectX + rectWidth / 2 &&
    y > rectY - rectHeight / 2 &&
    y < rectY + rectHeight / 2
  );
}

function mouseMoved() {
  // 마우스 움직일 때마다 새로운 파티클 생성
  if (random() > 0.5) {
    let particle = new CustomParticle(
      constrain(
        mouseX,
        width / 2 - rectWidth / 2 + 30,
        width / 2 + rectWidth / 2 - 30
      ),
      constrain(
        mouseY,
        height / 2 - rectHeight / 2 - 20,
        height / 2 + rectHeight / 2 - 90
      )
    );
    particles.push(particle);
    mouse.pixelRatio = (pixelDensity() * width) / canvasWidth;
  }
}
