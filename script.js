// 셔플 함수
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// MBTI 결과 정의
const mbtiResults = {
  INFP: { img: "results/INFP.png", desc: "조용하지만 깊은 감성의 소유자. 혼자 떠나는 여행도 즐겨요.", goodMatch: "ENFJ, ENFP", badMatch: "ESTJ, ESTP" },
  ENFP: { img: "results/ENFP.png", desc: "에너지 넘치고 즉흥적인 모험가! 계획보다는 즐거움이 먼저!", goodMatch: "INFJ, INTJ", badMatch: "ISTJ, ISFJ" },
  INFJ: { img: "results/INFJ.png", desc: "섬세한 통찰력으로 여행지에서도 조용한 의미를 찾는 타입.", goodMatch: "ENFP, ENTP", badMatch: "ESTP, ESFP" },
  ENFJ: { img: "results/ENFJ.png", desc: "사람들을 이끄는 따뜻한 리더! 모두가 함께하는 여행을 선호.", goodMatch: "INFP, ISFP", badMatch: "ISTP, INTP" },
  ISFP: { img: "results/ISFP.png", desc: "감각적인 취향으로 감성 가득한 장소를 잘 찾는 감성러.", goodMatch: "ENFJ, ESFP", badMatch: "ENTJ, INTJ" },
  ESFP: { img: "results/ESFP.png", desc: "흥 넘치는 인싸 여행자! 사진 찍고 노는 걸 제일 잘해요!", goodMatch: "ISFP, ESFJ", badMatch: "INTP, INFJ" },
  ISFJ: { img: "results/ISFJ.png", desc: "모두의 안전과 편의를 먼저 챙기는 든든한 여행 메이트.", goodMatch: "ESFP, ESTP", badMatch: "ENTP, ENFP" },
  ESFJ: { img: "results/ESFJ.png", desc: "친화력 갑! 모두가 행복한 여행을 만들어주는 사교 천재.", goodMatch: "ISFP, INFP", badMatch: "INTP, ISTP" },
  INTJ: { img: "results/INTJ.png", desc: "치밀한 계획과 분석력으로 완벽한 여행 루트를 짜는 전략가.", goodMatch: "ENFP, ENTP", badMatch: "ESFP, ESFJ" },
  ENTJ: { img: "results/ENTJ.png", desc: "리더십 폭발! 여행도 프로젝트처럼 완벽하게 진행하는 스타일.", goodMatch: "INFP, INTP", badMatch: "ISFP, ESFP" },
  INTP: { img: "results/INTP.png", desc: "호기심 많은 탐험가. 새로운 문화와 지식에 끌려요.", goodMatch: "ENTP, INFJ", badMatch: "ESFJ, ESTJ" },
  ENTP: { img: "results/ENTP.png", desc: "유쾌하고 아이디어 넘치는 탐험가! 어디서든 친구를 만들어요.", goodMatch: "INFJ, INTJ", badMatch: "ISFJ, ISTJ" },
  ISTP: { img: "results/ISTP.png", desc: "자유로운 혼행러. 문제 상황도 침착하게 해결하는 현실주의자.", goodMatch: "ESFP, ESTP", badMatch: "ENFJ, ESFJ" },
  ESTP: { img: "results/ESTP.png", desc: "직접 경험하고 느끼는 게 최고! 현장감 넘치는 여행을 좋아해요.", goodMatch: "ISFJ, ISTP", badMatch: "INFJ, INFP" },
  ISTJ: { img: "results/ISTJ.png", desc: "계획 철저! 여행에서도 안정과 규칙을 중시하는 신중파.", goodMatch: "ESFJ, ISFJ", badMatch: "ENFP, ENTP" },
  ESTJ: { img: "results/ESTJ.png", desc: "든든한 책임감으로 여행도 척척! 리더형 여행자.", goodMatch: "ISFJ, ISTJ", badMatch: "INFP, INTP" }
};

// 원본 질문
const originalQuestions = [
  { q: "짐을 쌀 때, 가장 먼저 챙기는 건?", options: [ { text: "보조배터리랑 충전기", value: ["T", "J"] }, { text: "카메라와 필름", value: ["N", "F"] }, { text: "옷이랑 액세서리 먼저", value: ["E", "F"] }, { text: "일단 아무거나 넣기 시작", value: ["P", "S"] } ] },
  { q: "공항에 도착한 너의 모습은?", options: [ { text: "조용한 공간 찾아 음악 듣기", value: ["I"] }, { text: "공항 투어하며 돌아다님", value: ["E"] }, { text: "스케줄표 확인하며 정리", value: ["J"] }, { text: "아무 생각 없이 유튜브 봄", value: ["P", "S"] } ] },
  { q: "여행 동행이 갑자기 취소됐다면?", options: [ { text: "걍 혼자도 괜찮음, 떠남", value: ["I", "N"] }, { text: "일정 조정하고 다시 물어봄", value: ["E", "J"] }, { text: "마음 상하지만 참고 감", value: ["F"] }, { text: "안 가기로 함, 즉흥 결정", value: ["P"] } ] },
  { q: "숙소에 도착한 후 너의 루틴은?", options: [ { text: "짐 정리부터 하고 자리 잡기", value: ["J"] }, { text: "침대에 던져지고 폰 확인", value: ["P"] }, { text: "창밖 구경하며 멍 때리기", value: ["I", "F"] }, { text: "룸투어 찍고 올리기", value: ["E", "T"] } ] },
  { q: "여행 중 길을 잃었을 때 대처는?", options: [ { text: "주변 사람에게 바로 물어봄", value: ["E"] }, { text: "지도 앱으로 차근차근 탐색", value: ["T", "J"] }, { text: "무섭지만 일단 움직여 봄", value: ["F", "P"] }, { text: "그냥 걷다 보면 뭐 나오겠지~", value: ["N", "P"] } ] },
  { q: "사진 찍을 때 너의 스타일은?", options: [ { text: "풍경 위주로 감성샷", value: ["N", "F"] }, { text: "인물 중심에 스타일 강조", value: ["E", "S"] }, { text: "계획된 컷만 딱딱 찍음", value: ["J"] }, { text: "즉흥적으로 아무 데서나 찰칵", value: ["P"] } ] },
  { q: "여행지에서 가장 기대되는 순간은?", options: [ { text: "맛집 찾아가는 순간", value: ["S", "J"] }, { text: "혼자서 산책하는 시간", value: ["I", "N"] }, { text: "친구들과 사진 찍는 시간", value: ["E", "F"] }, { text: "예상치 못한 일 생길 때", value: ["P"] } ] },
  { q: "마지막 날 밤, 너는 어떤 마음?", options: [ { text: "이번 여행, 의미 있었어 (기록 남김)", value: ["N", "F"] }, { text: "사진 정리하고 정산까지 완료", value: ["T", "J"] }, { text: "별생각 없이 누워 있음", value: ["S", "P"] }, { text: "다음 여행 또 가고 싶어짐", value: ["E", "N"] } ] }
];

let questions = [];
let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  questions = shuffle(originalQuestions.map(q => ({ q: q.q, options: shuffle([...q.options]) })));
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `<h2>${q.q}</h2><div class="options">${q.options.map((opt, i) => `<div class="option" onclick="selectOption(${i})">${opt.text}</div>`).join("")}</div>`;
  quizContainer.style.display = "block";
}

function selectOption(index) {
  const selected = questions[currentQuestion].options[index];
  selected.value.forEach(letter => scores[letter]++);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function calculateMBTI() {
  return [scores.E >= scores.I ? "E" : "I", scores.S >= scores.N ? "S" : "N", scores.T >= scores.F ? "T" : "F", scores.J >= scores.P ? "J" : "P"].join("");
}

function finishQuiz() {
  quizContainer.style.display = "none";
  document.getElementById("loading-screen").style.display = "block";

  setTimeout(() => {
    const result = calculateMBTI();
    const { img, desc, goodMatch, badMatch } = mbtiResults[result];

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    document.getElementById("mbti-result-image").innerHTML = `<img src="${img}" alt="${result} 이미지" style="width: 100%; max-width: 300px; margin-bottom: 1rem;" />`;

    document.getElementById("mbti-result-description").innerHTML = `
      <p class="result-desc">${desc}</p>
      <div class="result-match">
        <p><span class="good">우리 같이 여행갈까?:</span> <span class="good-match">${goodMatch}</span></p>
      </div>
      <div class="share-buttons">
        <button onclick="copyLink()">🔗 링크 복사</button>
        <button onclick="shareOnTwitter()">🐦 트위터 공유</button>
        <button onclick="downloadImage('${img}')">📥 이미지 저장</button>
        <button id="restart-btn">🔁 테스트 다시하기</button>
      </div>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
      currentQuestion = 0;
      scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      document.getElementById("result-container").style.display = "none";
      document.getElementById("start-screen").style.display = "block";
    });
  }, 2500);
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("링크가 복사되었어요!");
  });
}

function shareOnTwitter() {
  const result = calculateMBTI();
  const tweetText = encodeURIComponent(`내 여행 MBTI는 ${result}! 🌍✈️ 지금 확인해보세요!`);
  const pageUrl = encodeURIComponent(window.location.href);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${pageUrl}`;
  window.open(twitterUrl, "_blank");
}

function downloadImage(imgUrl) {
  const link = document.createElement("a");
  link.href = imgUrl;
  link.download = "mbti_result.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
