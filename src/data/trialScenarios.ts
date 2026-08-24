export interface TrialChoice {
  id: string;
  text: string;
  historicalAccuracy: boolean;
  scoreBonus: { wisdom: number; bravery: number; crewLoss: number };
  narrativeOutcome: string;
  historicalNote: string;
}

export interface TrialScenario {
  id: string;
  title: string;
  subtitle: string;
  situation: string;
  iconName: string;
  image?: string;
  choices: TrialChoice[];
}

export const TRIAL_SCENARIOS: TrialScenario[] = [
  {
    id: "cyclops_cave",
    title: "1장: 키클롭스의 동굴에서의 선택",
    subtitle: "시칠리아 바위 동굴에 갇힌 오디세우스와 부하들",
    situation: "거인 폴리페모스가 거대한 바위로 동굴 입구를 막고 부하 둘을 잡아먹었습니다. 당신의 허리춤에는 청동검이 있고, 짐 속에는 이스마로스에서 얻은 독한 명품 와인이 있습니다. 거인이 잠들었을 때 어떻게 하시겠습니까?",
    iconName: "ShieldAlert",
    image: "./assets/images/odyssey_cyclops.jpg",
    choices: [
      {
        id: "opt_attack_immediately",
        text: "거인이 잠든 틈을 타 심장을 향해 단숨에 청동검을 찔러 넣는다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 10, bravery: 90, crewLoss: 12 },
        narrativeOutcome: "거인은 죽였으나, 동굴 입구를 막은 거대한 바위를 당신들의 힘으로는 절대 밀어낼 수 없습니다. 당신과 부하들은 어둠 속에서 굶어 죽고 맙니다.",
        historicalNote: "호메로스 원전에서 오디세우스는 검으로 찌르려다 바위를 밀 수 없음을 깨닫고 이성을 되찾았습니다."
      },
      {
        id: "opt_wine_trick",
        text: "독한 와인을 바쳐 거인을 만취시키고 가명 '우티스(아무도 아니다)'를 댄 뒤 올리브 통나무로 눈을 태운다.",
        historicalAccuracy: true,
        scoreBonus: { wisdom: 100, bravery: 85, crewLoss: 2 },
        narrativeOutcome: "거인이 고통에 울부짖으며 '아무도 나를 해치지 않는다!'라고 외쳐 다른 거인들의 도움을 차단합니다. 아침에 양들의 배 밑에 매달려 무사히 동굴을 탈출합니다!",
        historicalNote: "지혜(Polymetis)의 완벽한 승리! '우티스' 트릭은 서양 문학사 최고의 언어유희 탈출극입니다."
      },
      {
        id: "opt_beg_mercy",
        text: "제우스의 이름으로 손님을 대접하는 환대의 법(크세니아)을 지켜달라며 간청한다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 20, bravery: 30, crewLoss: 8 },
        narrativeOutcome: "폴리페모스는 '키클롭스는 제우스 따위는 두려워하지 않는다'며 비웃고는 부하 둘을 추가로 머리부터 씹어먹습니다.",
        historicalNote: "키클롭스족은 인간 사회의 규범과 신들의 법도를 전혀 따르지 않는 야만족으로 묘사됩니다."
      }
    ]
  },
  {
    id: "sirens_straits",
    title: "2장: 세이렌의 치명적인 노랫소리",
    subtitle: "인간의 모든 지식과 쾌락을 속삭이는 유혹의 해협",
    situation: "배가 세이렌의 암초에 다가갑니다. 세이렌의 노래는 세상의 모든 과거와 미래의 진실을 알고 있다고 유혹하며 선원들을 미치게 만듭니다. 당신은 어떻게 이 난관을 헤쳐나가시겠습니까?",
    iconName: "Music",
    image: "./assets/images/odyssey_sirens.jpg",
    choices: [
      {
        id: "opt_all_wax",
        text: "나 자신을 포함한 모든 선원의 귀를 밀랍으로 단단히 틀어막고 빠르게 노를 젓는다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 80, bravery: 50, crewLoss: 0 },
        narrativeOutcome: "완벽하게 안전하게 통과했습니다! 그러나 당신은 인류 역사상 그 누구도 듣지 못한 불멸의 천상 지식을 들을 기회를 영원히 놓치고 말았습니다.",
        historicalNote: "원전의 오디세우스는 생존뿐 아니라 인간적 탐구열(지식) 또한 포기하지 않는 영웅이었습니다."
      },
      {
        id: "opt_tie_mast",
        text: "선원들의 귀는 밀랍으로 막고, 나 자신은 돛대에 결박하여 노래를 온전히 들으며 통과한다.",
        historicalAccuracy: true,
        scoreBonus: { wisdom: 100, bravery: 95, crewLoss: 0 },
        narrativeOutcome: "당신은 세이렌의 황홀하고 비장한 예언을 듣고 미칠 듯이 줄을 풀라고 비명을 질렀으나, 귀가 먼 충직한 선원들이 배를 더 세게 저어 안전하게 통과했습니다!",
        historicalNote: "호메로스 원전의 영웅적인 묘사! 안전과 지적 갈망을 모두 성취한 불멸의 명장면입니다."
      },
      {
        id: "opt_sing_back",
        text: "하프를 켜며 세이렌보다 더 아름다운 찬가를 불러 노래를 상쇄한다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 40, bravery: 70, crewLoss: 10 },
        narrativeOutcome: "당신은 오르페우스가 아닙니다! 세이렌의 치명적인 주파수에 홀린 선원들이 노를 놓고 바다로 뛰어들고 맙니다.",
        historicalNote: "이 방법은 아르고호의 원정에서 음유시인 '오르페우스'가 썼던 방식입니다. 오디세우스의 방식은 돛대 결박이었습니다."
      }
    ]
  },
  {
    id: "scylla_dilemma",
    title: "3장: 스킬라와 카리브디스의 비극적 딜레마",
    subtitle: "여섯 머리 괴물인가, 모든 것을 삼키는 대소용돌이인가",
    situation: "좌측은 머리 여섯 달린 괴물 스킬라가 웅크린 암벽, 우측은 바닷물을 세 번 삼키고 세 번 토해내며 배를 산산조각 내는 카리브디스의 소용돌이입니다. 배의 키를 어느 쪽으로 꺾겠습니까?",
    iconName: "Compass",
    choices: [
      {
        id: "opt_choose_scylla",
        text: "카리브디스를 멀리하고 스킬라의 바위 절벽 쪽에 바짝 붙어 전속력으로 노를 젓는다.",
        historicalAccuracy: true,
        scoreBonus: { wisdom: 95, bravery: 90, crewLoss: 6 },
        narrativeOutcome: "스킬라가 뱀 같은 목을 뻗어 가장 용감한 선원 6명을 낚아챘지만, 남은 선원들과 기함 전체는 카리브디스의 무저갱에 빠지지 않고 탈출에 성공합니다.",
        historicalNote: "호메로스 서사시가 제시하는 가장 현실적이고 고통스러운 '최소 악(Lesser Evil)'의 리더십 결단입니다."
      },
      {
        id: "opt_fight_scylla",
        text: "완전 무장 갑옷을 입고 칼과 창을 양손에 든 채 스킬라와 정면 백병전을 벌인다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 30, bravery: 90, crewLoss: 25 },
        narrativeOutcome: "스킬라는 불사의 괴물입니다! 당신이 허공에 칼을 휘두르는 사이 배가 지체되어 스킬라가 12명의 선원을 잡아먹고 배가 카리브디스 방향으로 휩쓸립니다.",
        historicalNote: "키르케는 '스킬라에게는 무력이 통하지 않으니 오직 전속력으로 도망치는 것만이 상책'이라고 조언했습니다."
      },
      {
        id: "opt_middle_path",
        text: "양쪽 모두를 피하기 위해 정확히 해협의 정중앙으로 조심스럽게 항해한다.",
        historicalAccuracy: false,
        scoreBonus: { wisdom: 40, bravery: 60, crewLoss: 45 },
        narrativeOutcome: "중앙은 카리브디스의 조류가 끌어당기는 구역입니다! 소용돌이에 휘말려 배 전체가 산산조각 나고 전원이 수장당합니다.",
        historicalNote: "절체절명의 위기에서 어설픈 중립은 최악의 파멸을 낳는다는 교훈을 줍니다."
      }
    ]
  }
];
