export interface EpicCharacter {
  id: string;
  nameKo: string;
  nameGr: string;
  epic: 'iliad' | 'odyssey' | 'both';
  side: 'greek' | 'trojan' | 'olympian' | 'mythical';
  role: string;
  title: string;
  epithet: string;
  description: string;
  significance: string;
  image: string; // Every character now has an explicit portrait image
  stats: {
    bravery: number;
    wisdom: number;
    destiny: number;
    divineFavor: number;
  };
}

export const CHARACTERS_DATA: EpicCharacter[] = [
  {
    id: "achilles",
    nameKo: "아킬레우스",
    nameGr: "Ἀχιλλεύς",
    epic: "iliad",
    side: "greek",
    role: "그리스 최고의 전사",
    title: "뮈르미돈의 군주",
    epithet: "발 빠른 아킬레우스 (πόδας ὠκὺς Ἀχιλλεύς)",
    description: "바다의 여신 테티스와 인간 펠레우스의 아들. 불사의 신체(발뒤꿈치 제외)와 비교할 수 없는 무용을 지녔으나, 파멸적인 분노와 짧지만 영광스러운 운명을 타고났습니다.",
    significance: "일리아드의 진정한 주인공. 그의 분노에서 비극이 시작되고 그의 연민에서 일리아드가 완결됩니다.",
    image: "./assets/images/portrait_achilles.jpg",
    stats: { bravery: 100, wisdom: 60, destiny: 95, divineFavor: 90 }
  },
  {
    id: "odysseus",
    nameKo: "오디세우스",
    nameGr: "Ὀδυσσεύς",
    epic: "both",
    side: "greek",
    role: "이타카의 왕 & 지략의 화신",
    title: "트로이 목마의 설계자",
    epithet: "지략이 뛰어난 다재다능한 자 (πολύτροπος Ὀδυσσεύς)",
    description: "헤라클레스 같은 압도적 무력보다 탁월한 임기응변, 냉철한 판단력, 불굴의 인내심으로 고난을 극복하는 서양 문학 최초의 지성형 인간 영웅입니다.",
    significance: "오디세이아의 주인공. 10년간의 전쟁과 10년간의 방랑을 거쳐 가정과 국가의 질서를 회복합니다.",
    image: "./assets/images/portrait_odysseus.jpg",
    stats: { bravery: 90, wisdom: 100, destiny: 98, divineFavor: 92 }
  },
  {
    id: "athena",
    nameKo: "아테나",
    nameGr: "Ἀθηνᾶ",
    epic: "both",
    side: "olympian",
    role: "지혜와 전략의 여신",
    title: "제우스의 딸 & 아이기스의 수호자",
    epithet: "부엉이 눈의 아테나 (γλαυκῶπις Ἀθηνᾶ)",
    description: "제우스의 머리에서 완전 무장한 채 태어난 여신. 맹목적인 살육의 아레스와 달리 정의롭고 전략적인 전쟁을 주관하며, 아킬레우스와 오디세우스의 영원한 수호신입니다.",
    significance: "오디세우스 부자의 귀환을 전폭적으로 기획하고 원조하여 서사시의 해피엔딩을 완성합니다.",
    image: "./assets/images/portrait_athena.jpg",
    stats: { bravery: 98, wisdom: 100, destiny: 100, divineFavor: 100 }
  },
  {
    id: "hector",
    nameKo: "헥토르",
    nameGr: "Ἕκτωρ",
    epic: "iliad",
    side: "trojan",
    role: "트로이의 왕자이자 총사령관",
    title: "트로이의 성채를 지키는 기둥",
    epithet: "반짝이는 투구의 헥토르 (κορυθαίολος Ἕκτωρ)",
    description: "트로이아에서 가장 고결하고 용감한 영웅. 국가, 노부모, 아내와 자식을 지키기 위해 죽음을 알면서도 당당히 전선으로 향하는 인간적인 성자형 영웅입니다.",
    significance: "트로이의 운명과 직결된 인물. 그의 전사는 트로이의 함락을 상징합니다.",
    image: "./assets/images/portrait_hector.jpg",
    stats: { bravery: 96, wisdom: 85, destiny: 90, divineFavor: 80 }
  },
  {
    id: "penelope",
    nameKo: "페넬로페",
    nameGr: "Πηνελόπεια",
    epic: "odyssey",
    side: "greek",
    role: "이타카의 왕비",
    title: "정절과 지혜의 여왕",
    epithet: "사려 깊은 페넬로페 (περίφρων Πηνελόπεια)",
    description: "남편이 없는 20년 동안 수의를 짰다 풀며 108명의 무례한 구혼자들을 지혜롭게 속여낸 정숙하고 강인한 여성 지도자입니다.",
    significance: "오디세우스와 영혼의 짝을 이루는 지혜의 대등한 동반자.",
    image: "./assets/images/portrait_penelope.jpg",
    stats: { bravery: 85, wisdom: 95, destiny: 88, divineFavor: 85 }
  },
  {
    id: "circe",
    nameKo: "키르케",
    nameGr: "Κίρκη",
    epic: "odyssey",
    side: "mythical",
    role: "아이아이에 섬의 마녀 여신",
    title: "태양신 헬리오스의 딸",
    epithet: "아름답게 머리를 땋은 여신 (ἐϋπλόκαμος δεινὴ θεὸς)",
    description: "약초와 마법으로 남성을 짐승으로 변신시키는 치명적인 마녀였으나, 오디세우스의 결기에 감복하여 가장 든든한 조력자이자 하데스의 안내자가 됩니다.",
    significance: "오디세우스에게 치명적인 시험이자 저승의 비밀을 여는 열쇠.",
    image: "./assets/images/portrait_circe.jpg",
    stats: { bravery: 80, wisdom: 92, destiny: 85, divineFavor: 88 }
  },
  {
    id: "polyphemus",
    nameKo: "폴리페모스",
    nameGr: "Πολύφημος",
    epic: "odyssey",
    side: "mythical",
    role: "바다의 신 포세이돈의 아들",
    title: "외눈박이 거인 키클롭스",
    epithet: "괴력을 지닌 거인 (κρατερὸς Πολύφημος)",
    description: "법도와 신들을 무시하고 동굴에 살며 양을 치는 잔혹한 식인 거인. 오디세우스에게 눈을 잃고 아버지 포세이돈에게 저주를 간청합니다.",
    significance: "오디세우스에게 10년간의 가혹한 바다 방랑을 안겨준 저주의 발원점.",
    image: "./assets/images/portrait_polyphemus.jpg",
    stats: { bravery: 85, wisdom: 25, destiny: 75, divineFavor: 70 }
  },
  {
    id: "agamemnon",
    nameKo: "아가멤논",
    nameGr: "Ἀγαμέμνων",
    epic: "both",
    side: "greek",
    role: "미케네의 국왕 & 그리스 연합군 총사령관",
    title: "인간들의 지배자",
    epithet: "군왕들의 왕 (ἄναξ ἀνδρῶν Ἀγαμέμνων)",
    description: "황금의 도시 미케네를 다스리는 최고 권력자. 오만과 독선으로 아킬레우스와 반목하여 대참사를 불렀으며, 귀향 후 아내 클리타임네스트라에게 비극적으로 살해당합니다.",
    significance: "권력의 부질없음과 분노의 대가를 보여주는 비극적 군주.",
    image: "./assets/images/portrait_agamemnon.jpg",
    stats: { bravery: 88, wisdom: 65, destiny: 85, divineFavor: 75 }
  }
];

export const charactersData = CHARACTERS_DATA;
