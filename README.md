# 🏛️ 호메로스 대서사시: 일리아드 & 오디세이아 (Homer's Epics)

서양 고전문학의 불멸의 원천인 맹인 시인 호메로스(Homer)의 양대 서사시 **《일리아드(Iliad)》**와 **《오디세이아(Odyssey)》**의 서사를 시각적·상호작용적으로 탐험하는 인터랙티브 웹 애플리케이션입니다.

모든 시각 삽화는 **Gemini AI 이미지 생성 모델**을 통해 고전 유화풍으로 제작되었습니다.

---

## ✨ 주요 기능 (Key Features)

### 1. ⚔️ 일리아드 (Iliad) — 전쟁과 분노의 서사시
- **24권 연대기 타임라인**: 아킬레우스의 분노부터 헥토르의 장례까지 주요 사건 및 권별 그리스어/한국어 명대사 수록.
- **트로이아 전쟁 대치도**: 아카이아 연합군 vs 트로이아 방어군 vs 올림포스 신들의 진영 및 개입 구조 시각화.
- **아킬레우스의 분노 & 헥토르와의 결투**: Gemini AI로 재현된 고화질 에픽 일러스트.

### 2. 🧭 오디세이아 (Odyssey) — 10년간의 지중해 항해 지도
- **인터랙티브 항해 지도 (Interactive Mediterranean Map)**:
  - 트로이 출항부터 키코네스, 로토파고스, 키클롭스 폴리페모스, 마녀 키르케, 저승 하데스, 세이렌의 유혹, 스킬라와 카리브디스, 요정 칼립소, 이타카 귀환까지 **14개 기착지 웨이포인트**.
  - 애니메이션 궤적 추적, 1클릭 순차 항해 자동 재생 기능.
  - 각 기착지별 지략 분석, 마주한 시련, 피해/결과 통계, 호메로스 원전 인용구.

### 3. 🛡️ 호메로스 영웅 도감 (Character Codex)
- 아킬레우스, 오디세우스, 아테나, 헥토르, 페넬로페, 키르케 등 주요 영웅과 신들의 프로필.
- 호메로스식 고대 그리스어 별칭(Epithet), 용맹/지혜/운명/신의 가호 4대 스탯 바 제공.

### 4. 🏆 영웅의 선택 (Interactive Hero Trial)
- 오디세우스의 입장이 되어 절체절명의 위기 상황(키클롭스 동굴, 세이렌의 바다, 스킬라의 절벽)에서 선택을 내리는 인터랙티브 미니 어드벤처.
- 원전과의 일치 여부 판정, 지혜/용맹 스코어 및 최종 호메로스 칭호 수여.

### 5. 🌊 고대 그리스풍 앰비언트 사운드스케이프 (Web Audio API)
- 외부 오디오 파일 없이 순수 Web Audio API 신디사이저로 구현된 지중해 파도 소리와 고대 도리아 선법(Dorian mode) 리라 하프 선율 (토글 가능).

---

## 🎨 Gemini AI 에픽 갤러리
- `hero_banner.jpg`: 에게해를 가로지르는 그리스 전함과 황금빛 트로이 성채
- `iliad_achilles_rage.jpg`: 막사에서 분노와 슬픔에 찬 아킬레우스
- `iliad_hector_duel.jpg`: 트로이 성벽 앞 아킬레우스와 헥토르의 결투
- `iliad_trojan_horse.jpg`: 트로이 성문 앞의 거대한 목마
- `odyssey_cyclops.jpg`: 키클롭스 폴리페모스와 와인을 건네는 오디세우스
- `odyssey_circe.jpg`: 마법의 궁전에서 맹수들을 거느린 마녀 키르케
- `odyssey_sirens.jpg`: 돛대에 몸을 묶고 노래를 듣는 오디세우스
- `odyssey_ithaca_return.jpg`: 12자루 도끼 구멍에 활을 겨누는 오디세우스
- `portrait_achilles.jpg`, `portrait_odysseus.jpg`, `portrait_athena.jpg`: 영웅 및 여신 초상화

---

## 🚀 로컬 실행 및 빌드 방법

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 배포용 정적 사이트 빌드
npm run build

# 4. 빌드 결과물 미리보기
npm run preview
```

---

## 🌐 GitHub Pages 배포 가이드

본 저장소에는 `.github/workflows/deploy.yml` 워크플로가 포함되어 있어, GitHub에 푸시하면 자동으로 배포됩니다.

1. **GitHub 원격 저장소 연결 및 푸시**:
   ```bash
   git add .
   git commit -m "feat: Homer's Iliad & Odyssey interactive web application"
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

2. **GitHub 저장소 설정 (Settings)**:
   - 저장소의 `Settings` -> `Pages` 이동
   - **Build and deployment** 항목의 **Source**를 `GitHub Actions`로 선택
   - 잠시 후 Actions 빌드가 완료되면 `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/` 주소로 즉시 서비스됩니다.
