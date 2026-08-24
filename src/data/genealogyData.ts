export interface FamilyMember {
  id: string;
  nameKo: string;
  nameGr: string;
  generation: number; // 1: 조상/신, 2: 부모 세대, 3: 영웅 세대, 4: 자녀 세대
  role: string;
  fate: string;
  avatar?: string;
  relationships: {
    parentOf?: string[];
    marriedTo?: string;
    childOf?: string[];
    rivalOf?: string;
  };
}

export interface RoyalHouse {
  id: string;
  nameKo: string;
  nameGr: string;
  region: string;
  sigil: string;
  description: string;
  curseOrDestiny: string;
  members: FamilyMember[];
}

export const ROYAL_HOUSES: RoyalHouse[] = [
  {
    id: "atreus",
    nameKo: "아트레우스 가문 (미케네 & 스파르타)",
    nameGr: "Οἶκος Ἀτρέως",
    region: "펠로폰네소스 반도 (미케네, 스파르타)",
    sigil: "Crown",
    description: "탄탈로스의 저주로부터 시작되어 피와 복수로 얼룩진 비극의 왕가. 트로이 원정군을 총지휘한 아가멤논과 메넬라오스 형제의 가문입니다.",
    curseOrDestiny: "가족 간의 살육과 피의 복수가 대를 이어 반복되는 탄탈로스의 멍에",
    members: [
      {
        id: "atreus_king",
        nameKo: "아트레우스",
        nameGr: "Ἀτρεύς",
        generation: 2,
        role: "미케네의 국왕",
        fate: "동생 튀에스테스와의 잔혹한 권력투쟁 끝에 살해당함",
        relationships: { parentOf: ["agamemnon", "menelaus"] }
      },
      {
        id: "agamemnon",
        nameKo: "아가멤논",
        nameGr: "Ἀγαμέμνων",
        generation: 3,
        role: "미케네의 국왕 & 그리스 연합군 총사령관",
        fate: "트로이 정복 후 귀환했으나 아내 클리타임네스트라에게 암살당함",
        relationships: { childOf: ["atreus_king"], marriedTo: "clytemnestra", parentOf: ["orestes", "iphigenia"] }
      },
      {
        id: "menelaus",
        nameKo: "메넬라오스",
        nameGr: "Μενέλαος",
        generation: 3,
        role: "스파르타의 국왕 & 헬레네의 남편",
        fate: "트로이 함락 후 헬레네를 되찾아 8년의 방랑 끝에 스파르타로 무사 귀환",
        relationships: { childOf: ["atreus_king"], marriedTo: "helena" }
      },
      {
        id: "helena",
        nameKo: "헬레네",
        nameGr: "Ἑλένη",
        generation: 3,
        role: "세상에서 가장 아름다운 여인 (제우스의 딸)",
        fate: "파리스의 유혹에 트로이로 건너가 10년 전쟁의 도화선이 됨",
        relationships: { marriedTo: "menelaus" }
      },
      {
        id: "clytemnestra",
        nameKo: "클리타임네스트라",
        nameGr: "Κλυταιμνήστρα",
        generation: 3,
        role: "아가멤논의 왕비 (헬레네의 쌍둥이 자매)",
        fate: "남편을 살해한 후 아들 오레스테스의 손에 복수당함",
        relationships: { marriedTo: "agamemnon", parentOf: ["orestes", "iphigenia"] }
      },
      {
        id: "orestes",
        nameKo: "오레스테스",
        nameGr: "Ὀρέστης",
        generation: 4,
        role: "아가멤논의 아들",
        fate: "어머니를 죽여 복수의 여신들에게 쫓기다 아테나의 아레오파고스 법정에서 무죄 판결을 받음",
        relationships: { childOf: ["agamemnon", "clytemnestra"] }
      }
    ]
  },
  {
    id: "priam",
    nameKo: "프리아모스 왕가 (트로이아)",
    nameGr: "Οἶκος Πριάμου",
    region: "소아시아 트로이아",
    sigil: "Shield",
    description: "제우스의 혈통 다르다노스에서 비롯된 아시아 최고의 부국 트로이의 왕가. 50명의 왕자와 성벽을 지키려다 비극적 최후를 맞이합니다.",
    curseOrDestiny: "파리스의 탄생 시 트로이를 불태울 횃불이 되리라는 불길한 신탁의 실현",
    members: [
      {
        id: "priam_king",
        nameKo: "프리아모스",
        nameGr: "Πρίαμος",
        generation: 2,
        role: "트로이의 노왕",
        fate: "트로이 함락의 날 제우스 제단 앞에서 네오프톨레모스(아킬레우스의 아들)에게 살해당함",
        relationships: { marriedTo: "hecuba", parentOf: ["hector", "paris", "cassandra"] }
      },
      {
        id: "hecuba",
        nameKo: "헤카베",
        nameGr: "Ἑκάβη",
        generation: 2,
        role: "트로이의 왕비",
        fate: "모든 자식들의 죽음과 조국의 멸망을 지켜본 비극의 어머니",
        relationships: { marriedTo: "priam_king", parentOf: ["hector", "paris", "cassandra"] }
      },
      {
        id: "hector",
        nameKo: "헥토르",
        nameGr: "Ἕκτωρ",
        generation: 3,
        role: "트로이 총사령관 & 조국의 수호신",
        fate: "아킬레우스와의 결투에서 장렬히 전사",
        avatar: "./assets/images/iliad_hector_duel.jpg",
        relationships: { childOf: ["priam_king", "hecuba"], marriedTo: "andromache", parentOf: ["astyanax"] }
      },
      {
        id: "paris",
        nameKo: "파리스 (알렉산드로스)",
        nameGr: "Πάρις",
        generation: 3,
        role: "트로이의 왕자 & 헬레네를 납치한 자",
        fate: "아킬레우스의 발뒤꿈치를 쏘아 죽였으나 독화살에 맞아 사망",
        relationships: { childOf: ["priam_king", "hecuba"] }
      },
      {
        id: "andromache",
        nameKo: "안드로마케",
        nameGr: "Ἀνδρομάχη",
        generation: 3,
        role: "헥토르의 정숙한 아내",
        fate: "트로이 멸망 후 그리스군의 노예로 끌려감",
        relationships: { marriedTo: "hector", parentOf: ["astyanax"] }
      },
      {
        id: "cassandra",
        nameKo: "카산드라",
        nameGr: "Κασσάνδρα",
        generation: 3,
        role: "트로이의 공주 & 비운의 예언자",
        fate: "아무도 믿지 않는 진실한 멸망 예언을 외치다 아가멤논과 함께 살해당함",
        relationships: { childOf: ["priam_king", "hecuba"] }
      },
      {
        id: "astyanax",
        nameKo: "아스티아낙스",
        nameGr: "Ἀστυάναξ",
        generation: 4,
        role: "헥토르의 젖먹이 아들 (성채의 군주)",
        fate: "트로이의 부활을 두려워한 그리스군에 의해 성벽 아래로 던져져 사망",
        relationships: { childOf: ["hector", "andromache"] }
      }
    ]
  },
  {
    id: "peleus",
    nameKo: "아이아코스 / 펠레우스 가문 (프티아)",
    nameGr: "Οἶκος Πηλέως",
    region: "테살리아 프티아 (뮈르미돈)",
    sigil: "Flame",
    description: "제우스의 아들 아이아코스로부터 이어진 신의 혈통. 인간 펠레우스와 불멸의 바다 여신 테티스의 혼인으로 당대 최고의 영웅 아킬레우스가 탄생합니다.",
    curseOrDestiny: "길고 평범한 삶 대신 짧지만 영원히 불멸할 영광(Kleos)을 선택한 숙명",
    members: [
      {
        id: "peleus_king",
        nameKo: "펠레우스",
        nameGr: "Πηλεύς",
        generation: 2,
        role: "프티아의 국왕 & 아르고호의 영웅",
        fate: "아들의 영광과 요절을 멀리서 지켜보며 홀로 늙어감",
        relationships: { marriedTo: "thetis", parentOf: ["achilles"] }
      },
      {
        id: "thetis",
        nameKo: "테티스",
        nameGr: "Θέτις",
        generation: 2,
        role: "바다의 님프 여신",
        fate: "아들의 죽음을 예견하고 슬퍼하며 헤파이토스의 방패를 가져다줌",
        relationships: { marriedTo: "peleus_king", parentOf: ["achilles"] }
      },
      {
        id: "achilles",
        nameKo: "아킬레우스",
        nameGr: "Ἀχιλλεύς",
        generation: 3,
        role: "그리스군 최강의 전사",
        fate: "트로이 성문 앞에서 파리스의 화살에 발뒤꿈치를 맞고 전사",
        avatar: "./assets/images/portrait_achilles.jpg",
        relationships: { childOf: ["peleus_king", "thetis"], parentOf: ["neoptolemus"] }
      },
      {
        id: "patroclus",
        nameKo: "파트로클로스",
        nameGr: "Πάτροκλος",
        generation: 3,
        role: "아킬레우스의 가장 소중한 전우이자 영혼의 동반자",
        fate: "아킬레우스의 갑옷을 입고 출진했다 헥토르의 창에 전사",
        relationships: { rivalOf: "hector" }
      },
      {
        id: "neoptolemus",
        nameKo: "네오프톨레모스 (피로스)",
        nameGr: "Νεοπτόλεμος",
        generation: 4,
        role: "아킬레우스의 아들",
        fate: "트로이 목마에 탑승하여 프리아모스를 살해하고 전후 델포이에서 사망",
        relationships: { childOf: ["achilles"] }
      }
    ]
  },
  {
    id: "arcesius",
    nameKo: "아르케이시오스 가문 (이타카 왕가)",
    nameGr: "Οἶκος Ὀδυσσέως",
    region: "이오니아해 이타카 섬",
    sigil: "Compass",
    description: "지략의 영웅 오디세우스와 사려 깊은 페넬로페가 지켜낸 지혜의 가문. 20년의 이별과 수많은 유혹을 견뎌내고 재결합한 승리의 혈통입니다.",
    curseOrDestiny: "포세이돈의 저주로 인한 10년의 방랑과 108명 구혼자들과의 최후 대결",
    members: [
      {
        id: "laertes",
        nameKo: "라에르테스",
        nameGr: "Λαέρτης",
        generation: 2,
        role: "이타카의 선왕 (아르고호 원정대원)",
        fate: "아들을 기다리며 포도밭에서 은둔하다 아들의 귀환으로 회춘하여 함께 싸움",
        relationships: { parentOf: ["odysseus"] }
      },
      {
        id: "odysseus",
        nameKo: "오디세우스",
        nameGr: "Ὀδυσσεύς",
        generation: 3,
        role: "이타카의 국왕 & 지략의 화신",
        fate: "20년 만에 이타카로 귀환하여 구혼자들을 처단하고 왕권을 회복함",
        avatar: "./assets/images/portrait_odysseus.jpg",
        relationships: { childOf: ["laertes"], marriedTo: "penelope", parentOf: ["telemachus"] }
      },
      {
        id: "penelope",
        nameKo: "페넬로페",
        nameGr: "Πηνελόπεια",
        generation: 3,
        role: "이타카의 왕비 & 정절의 표상",
        fate: "베틀의 지혜로 20년간 구혼자들을 따돌리고 남편과 감격의 재회",
        relationships: { marriedTo: "odysseus", parentOf: ["telemachus"] }
      },
      {
        id: "telemachus",
        nameKo: "텔레마코스",
        nameGr: "Τηλέμαχος",
        generation: 4,
        role: "오디세우스와 페넬로페의 아들",
        fate: "아테나의 인도로 성인이 되어 아버지를 도와 구혼자들을 소탕함",
        relationships: { childOf: ["odysseus", "penelope"] }
      }
    ]
  }
];
