// 다국어 텍스트 데이터
const lang = {
  ko: {
    title: "여행스타일 테스트",
    start: "시작하기",
    analyzing: "당신의 여행 MBTI를 분석 중이에요...",
    resultTitle: "당신의 여행 MBTI는 <span id='result'></span>!",
    copy: "🔗 링크 복사",
    twitter: "🐦 트위터 공유",
    download: "📥 이미지 저장",
    restart: "🔁 테스트 다시하기",
    goodMatch: "우리 같이 여행갈까?:",
    linkCopied: "링크가 복사되었어요!"
  },
  en: {
    title: "Travel Style Test",
    start: "Start",
    analyzing: "Analyzing your travel MBTI...",
    resultTitle: "Your travel MBTI is <span id='result'></span>!",
    copy: "🔗 Copy Link",
    twitter: "🐦 Share on Twitter",
    download: "📥 Save Image",
    restart: "🔁 Restart Test",
    goodMatch: "Best Travel Buddy:",
    linkCopied: "Link copied!"
  },
  ja: {
    title: "旅行スタイル診断テスト",
    start: "スタート",
    analyzing: "あなたの旅行MBTIを分析中です...",
    resultTitle: "あなたの旅行MBTIは <span id='result'></span>！",
    copy: "🔗 リンクをコピー",
    twitter: "🐦 Twitterで共有",
    download: "📥 画像を保存",
    restart: "🔁 テストをやり直す",
    goodMatch: "一緒に旅行したいタイプ：",
    linkCopied: "リンクがコピーされました！"
  }
};

let currentLang = "ko";

// 질문/옵션 다국어 데이터
const originalQuestions = [
  {
    q: {
      ko: "짐을 쌀 때, 가장 먼저 챙기는 건?",
      en: "What's the first thing you pack when preparing for a trip?",
      ja: "荷造りをする時、一番最初に入れるものは？"
    },
    options: [
      { text: { ko: "보조배터리랑 충전기", en: "Power bank & charger", ja: "モバイルバッテリーと充電器" }, value: ["T", "J"] },
      { text: { ko: "카메라와 필름", en: "Camera and film", ja: "カメラとフィルム" }, value: ["N", "F"] },
      { text: { ko: "옷이랑 액세서리 먼저", en: "Clothes & accessories first", ja: "服とアクセサリーから入れる" }, value: ["E", "F"] },
      { text: { ko: "일단 아무거나 넣기 시작", en: "Just put anything in!", ja: "とりあえず何でも入れる" }, value: ["P", "S"] }
    ]
  },
  {
    q: {
      ko: "공항에 도착한 너의 모습은?",
      en: "What do you do when you arrive at the airport?",
      ja: "空港に着いたらあなたはどんな感じ？"
    },
    options: [
      { text: { ko: "조용한 공간 찾아 음악 듣기", en: "Find a quiet place to listen to music", ja: "静かな場所で音楽を聴く" }, value: ["I"] },
      { text: { ko: "공항 투어하며 돌아다님", en: "Wander around, exploring the airport", ja: "空港内をぶらぶら散策する" }, value: ["E"] },
      { text: { ko: "스케줄표 확인하며 정리", en: "Review and organize your itinerary", ja: "スケジュールを確認して整理する" }, value: ["J"] },
      { text: { ko: "아무 생각 없이 유튜브 봄", en: "Mindlessly watch YouTube", ja: "何も考えずYouTubeを見る" }, value: ["P", "S"] }
    ]
  },
  {
    q: {
      ko: "여행 동행이 갑자기 취소됐다면?",
      en: "If your travel companion suddenly cancels, what would you do?",
      ja: "旅行の同行者が急にキャンセルしたら？"
    },
    options: [
      { text: { ko: "걍 혼자도 괜찮음, 떠남", en: "No problem, I'd just go alone", ja: "全然平気、一人で行く" }, value: ["I", "N"] },
      { text: { ko: "일정 조정하고 다시 물어봄", en: "Reschedule and ask again", ja: "日程を調整して再度確認する" }, value: ["E", "J"] },
      { text: { ko: "마음 상하지만 참고 감", en: "Disappointed, but I'll still go", ja: "がっかりするけど、我慢して行く" }, value: ["F"] },
      { text: { ko: "안 가기로 함, 즉흥 결정", en: "Decide spontaneously not to go", ja: "即興で行かないことにする" }, value: ["P"] }
    ]
  },
  {
    q: {
      ko: "숙소에 도착한 후 너의 루틴은?",
      en: "What's your routine after arriving at your accommodation?",
      ja: "宿に着いた後のあなたの行動は？"
    },
    options: [
      { text: { ko: "짐 정리부터 하고 자리 잡기", en: "Unpack and settle in first", ja: "荷物を整理してくつろぐ" }, value: ["J"] },
      { text: { ko: "침대에 던져지고 폰 확인", en: "Collapse on the bed and check my phone", ja: "ベッドに倒れてスマホを確認する" }, value: ["P"] },
      { text: { ko: "창밖 구경하며 멍 때리기", en: "Stare out the window, zoning out", ja: "窓の外を眺めながらぼーっとする" }, value: ["I", "F"] },
      { text: { ko: "룸투어 찍고 올리기", en: "Film a room tour and upload it", ja: "ルームツアーを撮ってSNSにアップする" }, value: ["E", "T"] }
    ]
  },
  {
    q: {
      ko: "여행 중 길을 잃었을 때 대처는?",
      en: "How do you react when you get lost during a trip?",
      ja: "旅行中に道に迷ったらどうする？"
    },
    options: [
      { text: { ko: "주변 사람에게 바로 물어봄", en: "Immediately ask someone nearby", ja: "周りの人にすぐに聞く" }, value: ["E"] },
      { text: { ko: "지도 앱으로 차근차근 탐색", en: "Carefully navigate using a map app", ja: "地図アプリで慎重に確認する" }, value: ["T", "J"] },
      { text: { ko: "무섭지만 일단 움직여 봄", en: "Feel nervous but start moving anyway", ja: "怖いけどとりあえず動いてみる" }, value: ["F", "P"] },
      { text: { ko: "그냥 걷다 보면 뭐 나오겠지~", en: "Keep walking, thinking I'll find something eventually", ja: "歩いていれば何かあるでしょ〜" }, value: ["N", "P"] }
    ]
  },
  {
    q: {
      ko: "사진 찍을 때 너의 스타일은?",
      en: "What's your photography style while traveling?",
      ja: "旅行中の写真スタイルは？"
    },
    options: [
      { text: { ko: "풍경 위주로 감성샷", en: "Moody landscape shots", ja: "風景メインのエモい写真" }, value: ["N", "F"] },
      { text: { ko: "인물 중심에 스타일 강조", en: "Portraits emphasizing style", ja: "人物中心でスタイル重視" }, value: ["E", "S"] },
      { text: { ko: "계획된 컷만 딱딱 찍음", en: "Strictly planned shots only", ja: "計画通りのカットだけを撮影する" }, value: ["J"] },
      { text: { ko: "즉흥적으로 아무 데서나 찰칵", en: "Spontaneously snap photos anywhere", ja: "思いつきでどこでもパシャリ" }, value: ["P"] }
    ]
  },
  {
    q: {
      ko: "여행지에서 가장 기대되는 순간은?",
      en: "What moment do you look forward to most during travel?",
      ja: "旅行中に一番楽しみにしている瞬間は？"
    },
    options: [
      { text: { ko: "맛집 찾아가는 순간", en: "Going to famous restaurants", ja: "美味しいお店に行く瞬間" }, value: ["S", "J"] },
      { text: { ko: "혼자서 산책하는 시간", en: "Walking alone and exploring", ja: "一人で散歩する時間" }, value: ["I", "N"] },
      { text: { ko: "친구들과 사진 찍는 시간", en: "Taking photos with friends", ja: "友達と写真を撮る時間" }, value: ["E", "F"] },
      { text: { ko: "예상치 못한 일 생길 때", en: "When unexpected events happen", ja: "予想外のことが起きる時" }, value: ["P"] }
    ]
  },
  {
    q: {
      ko: "마지막 날 밤, 너는 어떤 마음?",
      en: "How do you feel on your last night of travel?",
      ja: "最終日の夜、あなたの気持ちは？"
    },
    options: [
      { text: { ko: "이번 여행, 의미 있었어 (기록 남김)", en: "This trip was meaningful (recording memories)", ja: "今回の旅、意味があったな（記録を残す）" }, value: ["N", "F"] },
      { text: { ko: "사진 정리하고 정산까지 완료", en: "Finish sorting photos and expenses", ja: "写真整理と精算まで完了する" }, value: ["T", "J"] },
      { text: { ko: "별생각 없이 누워 있음", en: "Lie down without any particular thoughts", ja: "特に何も考えずに横になる" }, value: ["S", "P"] },
      { text: { ko: "다음 여행 또 가고 싶어짐", en: "Already wanting to plan the next trip", ja: "また次の旅行に行きたくなる" }, value: ["E", "N"] }
    ]
  }
];

// MBTI 결과 다국어 데이터
const mbtiResults = {
  INFP: {
    img: "results/INFP.png",
    desc: {
      ko: "조용하지만 깊은 감성의 소유자. 혼자 떠나는 여행도 즐겨요.",
      en: "Quiet yet deeply emotional; enjoys solo travel.",
      ja: "静かだけど深い感性の持ち主。一人旅も楽しめるタイプ。"
    },
    goodMatch: { ko: "ENFJ, ENFP", en: "ENFJ, ENFP", ja: "ENFJ, ENFP" },
    badMatch: { ko: "ESTJ, ESTP", en: "ESTJ, ESTP", ja: "ESTJ, ESTP" }
  },
  ENFP: {
    img: "results/ENFP.png",
    desc: {
      ko: "에너지 넘치고 즉흥적인 모험가! 계획보다는 즐거움이 먼저!",
      en: "Energetic and spontaneous adventurer! Fun before plans!",
      ja: "エネルギッシュで即興的な冒険家！計画より楽しさ優先！"
    },
    goodMatch: { ko: "INFJ, INTJ", en: "INFJ, INTJ", ja: "INFJ, INTJ" },
    badMatch: { ko: "ISTJ, ISFJ", en: "ISTJ, ISFJ", ja: "ISTJ, ISFJ" }
  },
  INFJ: {
    img: "results/INFJ.png",
    desc: {
      ko: "섬세한 통찰력으로 여행지에서도 조용한 의미를 찾는 타입.",
      en: "Sensitive insight, finding quiet meaning everywhere.",
      ja: "繊細な洞察力で旅先でも静かな意味を見つけるタイプ。"
    },
    goodMatch: { ko: "ENFP, ENTP", en: "ENFP, ENTP", ja: "ENFP, ENTP" },
    badMatch: { ko: "ESTP, ESFP", en: "ESTP, ESFP", ja: "ESTP, ESFP" }
  },
  ENFJ: {
    img: "results/ENFJ.png",
    desc: {
      ko: "사람들을 이끄는 따뜻한 리더! 모두가 함께하는 여행을 선호.",
      en: "Warm leader who brings people together; prefers group trips.",
      ja: "人を引っ張る温かいリーダー！みんな一緒の旅が好き。"
    },
    goodMatch: { ko: "INFP, ISFP", en: "INFP, ISFP", ja: "INFP, ISFP" },
    badMatch: { ko: "ISTP, INTP", en: "ISTP, INTP", ja: "ISTP, INTP" }
  },
  ISFP: {
    img: "results/ISFP.png",
    desc: {
      ko: "감각적인 취향으로 감성 가득한 장소를 잘 찾는 감성러.",
      en: "An aesthetic lover who finds beautifully emotional places easily.",
      ja: "感覚的なセンスでエモいスポットを見つけるのが得意なタイプ。"
    },
    goodMatch: { ko: "ENFJ, ESFP", en: "ENFJ, ESFP", ja: "ENFJ, ESFP" },
    badMatch: { ko: "ENTJ, INTJ", en: "ENTJ, INTJ", ja: "ENTJ, INTJ" }
  },
  ESFP: {
    img: "results/ESFP.png",
    desc: {
      ko: "흥 넘치는 인싸 여행자! 사진 찍고 노는 걸 제일 잘해요!",
      en: "Super-social traveler! Great at having fun and taking photos!",
      ja: "テンション高めな人気者タイプ！遊んだり写真を撮るのが大得意！"
    },
    goodMatch: { ko: "ISFP, ESFJ", en: "ISFP, ESFJ", ja: "ISFP, ESFJ" },
    badMatch: { ko: "INTP, INFJ", en: "INTP, INFJ", ja: "INTP, INFJ" }
  },
  ISFJ: {
    img: "results/ISFJ.png",
    desc: {
      ko: "모두의 안전과 편의를 먼저 챙기는 든든한 여행 메이트.",
      en: "Reliable travel companion prioritizing everyone's comfort and safety.",
      ja: "みんなの安全と快適さを一番に考える、頼もしい旅の仲間。"
    },
    goodMatch: { ko: "ESFP, ESTP", en: "ESFP, ESTP", ja: "ESFP, ESTP" },
    badMatch: { ko: "ENTP, ENFP", en: "ENTP, ENFP", ja: "ENTP, ENFP" }
  },
  ESFJ: {
    img: "results/ESFJ.png",
    desc: {
      ko: "친화력 갑! 모두가 행복한 여행을 만들어주는 사교 천재.",
      en: "Super-friendly social genius making every trip happier for everyone.",
      ja: "抜群の親和力でみんなが幸せになる旅を作る社交上手タイプ。"
    },
    goodMatch: { ko: "ISFP, INFP", en: "ISFP, INFP", ja: "ISFP, INFP" },
    badMatch: { ko: "INTP, ISTP", en: "INTP, ISTP", ja: "INTP, ISTP" }
  },
  INTJ: {
    img: "results/INTJ.png",
    desc: {
      ko: "치밀한 계획과 분석력으로 완벽한 여행 루트를 짜는 전략가.",
      en: "Strategist who meticulously plans and analyzes the perfect itinerary.",
      ja: "綿密な計画と分析力で完璧な旅程を組み立てる戦略家タイプ。"
    },
    goodMatch: { ko: "ENFP, ENTP", en: "ENFP, ENTP", ja: "ENFP, ENTP" },
    badMatch: { ko: "ESFP, ESFJ", en: "ESFP, ESFJ", ja: "ESFP, ESFJ" }
  },
  ENTJ: {
    img: "results/ENTJ.png",
    desc: {
      ko: "리더십 폭발! 여행도 프로젝트처럼 완벽하게 진행하는 스타일.",
      en: "Natural-born leader treating travel like a perfectly executed project.",
      ja: "リーダーシップ全開！旅行もプロジェクトのように完璧にこなすタイプ。"
    },
    goodMatch: { ko: "INFP, INTP", en: "INFP, INTP", ja: "INFP, INTP" },
    badMatch: { ko: "ISFP, ESFP", en: "ISFP, ESFP", ja: "ISFP, ESFP" }
  },
  INTP: {
    img: "results/INTP.png",
    desc: {
      ko: "호기심 많은 탐험가. 새로운 문화와 지식에 끌려요.",
      en: "Curious explorer drawn to new cultures and knowledge.",
      ja: "好奇心旺盛な探検家タイプ。新しい文化や知識に惹かれる。"
    },
    goodMatch: { ko: "ENTP, INFJ", en: "ENTP, INFJ", ja: "ENTP, INFJ" },
    badMatch: { ko: "ESFJ, ESTJ", en: "ESFJ, ESTJ", ja: "ESFJ, ESTJ" }
  },
  ENTP: {
    img: "results/ENTP.png",
    desc: {
      ko: "유쾌하고 아이디어 넘치는 탐험가! 어디서든 친구를 만들어요.",
      en: "Cheerful, idea-rich adventurer who makes friends everywhere.",
      ja: "明るくてアイデア満載の冒険家タイプ！どこでも友達を作れる。"
    },
    goodMatch: { ko: "INFJ, INTJ", en: "INFJ, INTJ", ja: "INFJ, INTJ" },
    badMatch: { ko: "ISFJ, ISTJ", en: "ISFJ, ISTJ", ja: "ISFJ, ISTJ" }
  },
  ISTP: {
    img: "results/ISTP.png",
    desc: {
      ko: "자유로운 혼행러. 문제 상황도 침착하게 해결하는 현실주의자.",
      en: "Free-spirited solo traveler; calmly solves problems practically.",
      ja: "自由な一人旅派。問題も冷静に解決する現実派。"
    },
    goodMatch: { ko: "ESFP, ESTP", en: "ESFP, ESTP", ja: "ESFP, ESTP" },
    badMatch: { ko: "ENFJ, ESFJ", en: "ENFJ, ESFJ", ja: "ENFJ, ESFJ" }
  },
  ESTP: {
    img: "results/ESTP.png",
    desc: {
      ko: "직접 경험하고 느끼는 게 최고! 현장감 넘치는 여행을 좋아해요.",
      en: "Loves hands-on experiences, appreciating vivid, real-time travel.",
      ja: "自分で体験するのが一番！臨場感ある旅が大好き。"
    },
    goodMatch: { ko: "ISFJ, ISTP", en: "ISFJ, ISTP", ja: "ISFJ, ISTP" },
    badMatch: { ko: "INFJ, INFP", en: "INFJ, INFP", ja: "INFJ, INFP" }
  },
  ISTJ: {
    img: "results/ISTJ.png",
    desc: {
      ko: "계획 철저! 여행에서도 안정과 규칙을 중시하는 신중파.",
      en: "Thorough planner valuing stability and rules even while traveling.",
      ja: "計画をしっかり立てる派。旅先でも安定とルールを重視する慎重タイプ。"
    },
    goodMatch: { ko: "ESFJ, ISFJ", en: "ESFJ, ISFJ", ja: "ESFJ, ISFJ" },
    badMatch: { ko: "ENFP, ENTP", en: "ENFP, ENTP", ja: "ENFP, ENTP" }
  },
  ESTJ: {
    img: "results/ESTJ.png",
    desc: {
      ko: "든든한 책임감으로 여행도 척척! 리더형 여행자.",
      en: "Responsible and reliable; a natural leader in travel situations.",
      ja: "頼れる責任感で旅行をテキパキ仕切るリーダータイプ。"
    },
    goodMatch: { ko: "ISFJ, ISTJ", en: "ISFJ, ISTJ", ja: "ISFJ, ISTJ" },
    badMatch: { ko: "INFP, INTP", en: "INFP, INTP", ja: "INFP, INTP" }
  }
};

// 점수, 상태 변수
let questions = [];
let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// DOM 엘리먼트 캐싱
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

// ---------- 언어 전환 기능 ----------
// ... (상단 데이터 부분 생략 없이 기존 코드 동일)

let currentLang = "ko";

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

// 첫 화면 전용 함수 (언어 선택 표시)
function showStartScreen() {
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("lang-selector").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("result-container").style.display = "none";
}

// ---------- 언어 전환 기능 ----------
function setLang(l) {
  currentLang = l;
  updateTexts();
}

function updateTexts() {
  document.title = lang[currentLang].title;
  document.getElementById("main-title").textContent = lang[currentLang].title;
  document.getElementById("start-btn").textContent = lang[currentLang].start;
  document.getElementById("loading-text").textContent = lang[currentLang].analyzing;
  document.getElementById("result-title").innerHTML = lang[currentLang].resultTitle;

  if (document.getElementById("mbti-result-description")) updateResultButtonsLang();
  if (quizContainer.style.display !== "none") showQuestion();
}

function updateResultButtonsLang() {
  const matchElem = document.querySelector(".result-match .good");
  if (matchElem) matchElem.textContent = lang[currentLang].goodMatch;
  const shareBtns = document.querySelectorAll(".share-buttons button");
  if (shareBtns.length >= 4) {
    shareBtns[0].textContent = lang[currentLang].copy;
    shareBtns[1].textContent = lang[currentLang].twitter;
    shareBtns[2].textContent = lang[currentLang].download;
    shareBtns[3].textContent = lang[currentLang].restart;
  }
}

// ---------- 퀴즈 기능 ----------

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("lang-selector").style.display = "none"; // 언어 선택 숨김
  questions = shuffle(originalQuestions.map(q => ({
    q: q.q,
    options: shuffle([...q.options])
  })));
  currentQuestion = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${q.q[currentLang]}</h2>
    <div class="options">
      ${q.options.map((opt, i) =>
        `<div class="option" onclick="selectOption(${i})">${opt.text[currentLang]}</div>`
      ).join("")}
    </div>
  `;
  quizContainer.style.display = "block";
  document.getElementById("lang-selector").style.display = "none"; // 언어 선택 숨김
}

window.selectOption = function(index) {
  const selected = questions[currentQuestion].options[index];
  selected.value.forEach(letter => scores[letter]++);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
};

function calculateMBTI() {
  return [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P"
  ].join("");
}

function finishQuiz() {
  quizContainer.style.display = "none";
  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("lang-selector").style.display = "none"; // 언어 선택 숨김
  setTimeout(() => {
    const result = calculateMBTI();
    const { img, desc, goodMatch } = mbtiResults[result];

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("result").textContent = result;

    document.getElementById("mbti-result-image").innerHTML =
      `<img src="${img}" alt="${result} 이미지" style="width: 100%; max-width: 300px; margin-bottom: 1rem;" />`;

    document.getElementById("mbti-result-description").innerHTML = `
      <p class="result-desc">${desc[currentLang]}</p>
      <div class="result-match">
        <p><span class="good">${lang[currentLang].goodMatch}</span> <span class="good-match">${goodMatch[currentLang]}</span></p>
      </div>
      <div class="share-buttons">
        <button onclick="copyLink()">${lang[currentLang].copy}</button>
        <button onclick="shareOnTwitter()">${lang[currentLang].twitter}</button>
        <button onclick="downloadImage('${img}')">${lang[currentLang].download}</button>
        <button id="restart-btn">${lang[currentLang].restart}</button>
      </div>
    `;
    updateResultButtonsLang();

    document.getElementById("restart-btn").addEventListener("click", () => {
      document.getElementById("result-container").style.display = "none";
      showStartScreen();
      updateTexts();
    });
  }, 2500);
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert(lang[currentLang].linkCopied);
  });
}

function shareOnTwitter() {
  const result = calculateMBTI();
  const tweetTexts = {
    ko: `내 여행 MBTI는 ${result}! 🌍✈️ 지금 확인해보세요!`,
    en: `My travel MBTI is ${result}! 🌍✈️ Try yours now!`,
    ja: `私の旅行MBTIは${result}！🌍✈️ あなたも診断しよう！`
  };
  const tweetText = encodeURIComponent(tweetTexts[currentLang]);
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

// ----------- 페이지 로드시 초기화 -----------
window.addEventListener("DOMContentLoaded", () => {
  showStartScreen();
  updateTexts();
});
