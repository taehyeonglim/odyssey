export interface BattleZone {
  id: string;
  order: number;
  nameKo: string;
  nameGr: string;
  location: string;
  coords: { x: number; y: number }; // Percentage on SVG Battlefield
  summary: string;
  keyDuel: string;
  godIntervention: string;
  tideOfWar: 'greeks_advancing' | 'stalemate' | 'trojans_advancing';
  description: string;
}

export const BATTLEFIELD_ZONES: BattleZone[] = [
  {
    id: "greek_ships",
    order: 1,
    nameKo: "1. 헬레스폰토스 해변 & 그리스 함선 진지",
    nameGr: "Ναύσταθμος Ἀχαιῶν",
    location: "트로이 북서부 해안가",
    coords: { x: 180, y: 440 },
    summary: "1,000여 척의 그리스 전함이 정박하고 목책을 쌓은 최후 방어선.",
    keyDuel: "헥토르의 횃불 공격 vs 대(大)아이아스의 함선 결사 방어",
    godIntervention: "제우스가 트로이군에게 용기를 북돋워 그리스 방어벽 돌파를 허용함",
    tideOfWar: "trojans_advancing",
    description: "헥토르가 이끄는 트로이 전사들이 그리스군의 방벽을 부수고 프로테실라오스의 전함에 불을 질렀습니다. 함선이 전멸할 위기에 처하자 파트로클로스가 아킬레우스의 갑옷을 입고 출격하게 되는 일리아드 최고의 위기 구역입니다."
  },
  {
    id: "scamander_river",
    order: 2,
    nameKo: "2. 스카만드로스 (크산토스) 강변 격전지",
    nameGr: "Σκάμανδρος ποταμός",
    location: "트로이 평원을 가로지르는 신성한 강",
    coords: { x: 420, y: 320 },
    summary: "아킬레우스의 무차별 학살로 강물이 시체로 막히고 강신(河神)이 분노하여 범람한 전장.",
    keyDuel: "아킬레우스 vs 트로이 군단 & 강신 스카만드로스와의 신화적 대결",
    godIntervention: "헤파이토스가 거대한 불길을 일으켜 강물을 끓어오르게 만들어 아킬레우스를 구함",
    tideOfWar: "greeks_advancing",
    description: "파트로클로스의 죽음으로 광기에 찬 아킬레우스가 트로이 군사를 학살하여 강물이 핏빛으로 물들었습니다. 강신의 거대한 파도가 아킬레우스를 삼키려 하자 헤파이토스의 신성한 화염이 강을 제압했습니다."
  },
  {
    id: "troy_plain",
    order: 3,
    nameKo: "3. 트로이아 대평원 (결전의 땅)",
    nameGr: "Πεδίον Τρωϊκόν",
    location: "성벽과 해변 사이의 광활한 들판",
    coords: { x: 620, y: 260 },
    summary: "전차와 보병이 뒤엉켜 10년간 수만 명의 목숨을 앗아간 주 전장.",
    keyDuel: "파리스 vs 메넬라오스 / 디오메데스의 신격 상해 활약",
    godIntervention: "아폴론, 아레스, 아프로디테(트로이) vs 아테나, 헤라, 포세이돈(그리스)의 대리전",
    tideOfWar: "stalemate",
    description: "먼지구름 속에 수천 개의 청동 방패와 창이 부딪치며 올림포스 신들이 직접 창을 들고 뛰어든 고대 최대의 전장입니다."
  },
  {
    id: "scaean_gate",
    order: 4,
    nameKo: "4. 스카이아 성문 & 트로이아 아크로폴리스 성벽",
    nameGr: "Σκαιαὶ πύλαι",
    location: "포세이돈과 아폴론이 쌓은 난공불락의 트로이 성문",
    coords: { x: 820, y: 150 },
    summary: "헥토르와 아킬레우스의 최후 결투가 벌어지고, 훗날 목마가 진입한 역사의 현장.",
    keyDuel: "아킬레우스 vs 헥토르 (일리아드 제22권의 절정)",
    godIntervention: "아테나가 데이포보스의 모습으로 변신하여 헥토르를 속여 결투에 나서게 함",
    tideOfWar: "greeks_advancing",
    description: "성벽 위에서 노왕 프리아모스와 어머니 헤카베, 아내 안드로마케가 지켜보는 가운데, 홀로 남아 조국을 지키려던 헥토르가 아킬레우스의 창에 쓰러진 비극의 정점입니다."
  }
];
