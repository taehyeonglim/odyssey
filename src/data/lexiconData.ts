export interface HomericConcept {
  id: string;
  greek: string;
  transliteration: string;
  korean: string;
  category: 'heroism' | 'fate' | 'society' | 'divine';
  shortDef: string;
  fullExplanation: string;
  keyExample: string;
  greekCitation: string;
  koreanCitation: string;
  epicContext: 'iliad' | 'odyssey' | 'both';
}

export const HOMERIC_LEXICON: HomericConcept[] = [
  {
    id: "menis",
    greek: "Μῆνις",
    transliteration: "Mēnis",
    korean: "메니스 (신성한 분노)",
    category: "divine",
    shortDef: "신들이나 신적 영웅에게만 허용되는 파멸적이고 우주적인 분노",
    fullExplanation: "단순한 개인적 화(Thymos)나 격분(Cholos)이 아닌, 질서가 훼손되었을 때 신들이 내리는 절대적 분노를 의미합니다. 《일리아드》의 첫 단어로, 아킬레우스의 분노가 서사시의 원동력임을 선포합니다.",
    keyExample: "자신의 명예를 모욕당한 아킬레우스가 그리스 진영 전체를 파멸로 몰아넣은 분노",
    greekCitation: "Μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος οὐλομένην...",
    koreanCitation: "노래하소서 여신이여, 펠레우스의 아들 아킬레우스의 파멸적 분노를...",
    epicContext: "iliad"
  },
  {
    id: "kleos",
    greek: "Κλέος",
    transliteration: "Kleos",
    korean: "클레오스 (불멸의 영광/명성)",
    category: "heroism",
    shortDef: "시인들의 입을 통해 대대로 전해져 필멸의 죽음을 초월하는 영광",
    fullExplanation: "고대 그리스 영웅들의 궁극적 삶의 목표입니다. 육체는 흙으로 돌아가더라도 시가(詩歌)에 이름이 남아 영원히 노래되는 것만이 인간이 영생을 얻는 유일한 방법이었습니다.",
    keyExample: "아킬레우스가 장수하는 평범한 삶 대신 요절하지만 영원한 이름을 남기는 운명을 선택함",
    greekCitation: "ὤλετο μέν μοι νόστος, ἀτὰρ κλέος ἄφθιτον ἔσται.",
    koreanCitation: "내 귀향의 길은 사라졌으나, 나의 영광(클레오스)은 영원히 시들지 않으리라.",
    epicContext: "iliad"
  },
  {
    id: "nostos",
    greek: "Νόστος",
    transliteration: "Nostos",
    korean: "노스토스 (귀향 / 집으로의 여정)",
    category: "heroism",
    shortDef: "모든 고난과 유혹을 이겨내고 조국과 가정, 본래의 정체성을 되찾는 귀환",
    fullExplanation: "현대어 '노스탤지어(Nostalgia, 향수병 = nostos + algos)'의 어원입니다. 오디세우스가 칼립소의 영생불사 제안을 거절하고 늙어가는 인간 아내와 고향으로 돌아가려는 이유입니다.",
    keyExample: "오디세우스의 10년간의 파도와 유혹을 뚫고 이룩한 이타카 귀환",
    greekCitation: "ἱέμενος καὶ καπνὸν ἀποθρῴσκοντα νοῆσαι ἧς γαίης θανέειν ἱμείρεται...",
    koreanCitation: "고향 땅에서 피어오르는 연기라도 바라보다가 죽기를 갈망하도다...",
    epicContext: "odyssey"
  },
  {
    id: "xenia",
    greek: "Ξενία",
    transliteration: "Xenia",
    korean: "크세니아 (손님 환대의 신성한 규범)",
    category: "society",
    shortDef: "이방인을 신의 이름으로 맞이하고 숙식을 베풀며 선물을 교환하는 고대 최고의 도덕",
    fullExplanation: "환대의 수호신 제우스 크세니오스(Zeus Xenios)의 규율입니다. 주최자는 이방인의 정체를 묻기 전에 먼저 먹을 것을 주어야 했습니다. 이를 어긴 자(폴리페모스, 파리스, 구혼자들)는 신들의 징벌을 받습니다.",
    keyExample: "파이아케스인들이 헐벗은 이방인 오디세우스를 극진히 대접하고 귀환선과 보물을 선물함",
    greekCitation: "πρὸς γὰρ Διός εἰσιν ἅπαντες ξεῖνοί τε πτωχοί τε...",
    koreanCitation: "모든 이방인과 가난한 자들은 제우스께서 돌보시는 자들이니...",
    epicContext: "both"
  },
  {
    id: "polytropos",
    greek: "Πολύτροπος",
    transliteration: "Polytropos",
    korean: "폴뤼트로포스 (다재다능한 지략 / 임기응변)",
    category: "heroism",
    shortDef: "'수많은 길을 돌고 도는', '온갖 지략과 꾀로 난관을 헤쳐나가는' 지혜의 영웅상",
    fullExplanation: "《오디세이아》 제1권 1행에서 오디세우스를 수식하는 첫 단어입니다. 완력에 의존하는 전사형 영웅과 구별되는, 변화무쌍한 지성과 인내심을 가진 인간형 영웅을 상징합니다.",
    keyExample: "트로이 목마 고안, 키클롭스 앞 '우티스' 가명 사용, 거지로 위장한 궁정 잠입",
    greekCitation: "Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον...",
    koreanCitation: "들려주소서 무사 여신이여, 온갖 지략에 능한(폴뤼트로포스) 그 사람의 이야기를...",
    epicContext: "odyssey"
  },
  {
    id: "moira",
    greek: "Μοῖρα",
    transliteration: "Moira",
    korean: "모이라 (피할 수 없는 운명과 몫)",
    category: "fate",
    shortDef: "제우스를 포함한 올림포스 신들조차 거스를 수 없는 필멸의 숙명과 배당된 몫",
    fullExplanation: "인간에게 정해진 삶의 한계이자 죽음의 시간입니다. 영웅들은 자신의 비극적 모이라를 회피하려 하지 않고, 오히려 당당히 마주함으로써 숭고한 인간의 존엄을 완성합니다.",
    keyExample: "헥토르가 트로이의 함락과 자신의 전사를 예감하면서도 성 밖으로 나아가 싸움",
    greekCitation: "μοῖραν δ' οὔ τινά φημι πεφυγμένον ἔμμεναι ἀνδρῶν...",
    koreanCitation: "필멸의 인간 가운데 그 누구도 운명(모이라)을 피할 수 있는 자는 없소...",
    epicContext: "both"
  },
  {
    id: "hubris",
    greek: "Ὕβρις",
    transliteration: "Hubris",
    korean: "휘브리스 (오만과 신성 모독)",
    category: "society",
    shortDef: "인간의 한계를 잊고 신들을 경시하거나 타인의 권리를 침범하는 파멸적 교만",
    fullExplanation: "고대 비극의 가장 큰 원인입니다. 휘브리스는 신들의 복수(네메시스, Nemesis)와 파멸(아테, Ate)을 필연적으로 불러옵니다.",
    keyExample: "오디세우스가 키클롭스의 눈을 멀게 한 뒤 오만하게 자신의 진짜 이름을 외쳐 포세이돈의 저주를 자초함",
    greekCitation: "οὐ γὰρ ἀποπτύουσι θεοὶ κότον, ὅς κεν ὑπερβῇ...",
    koreanCitation: "도를 넘어 오만을 부리는 자에게 신들은 결코 노여움을 거두지 않으신다...",
    epicContext: "both"
  },
  {
    id: "arete",
    greek: "Ἀρετή",
    transliteration: "Aretē",
    korean: "아레테 (영웅적 탁월함과 덕성)",
    category: "heroism",
    shortDef: "말과 행동, 전투와 지혜에서 인간이 발휘할 수 있는 최고의 능력과 완성도",
    fullExplanation: "호메로스 시대의 덕(Virtue)이란 도덕적 순결함보다는 '전장에서 가장 용감하게 싸우고 회의에서 가장 훌륭하게 연설하는 탁월함'을 뜻했습니다.",
    keyExample: "포이닉스가 아킬레우스에게 가르친 영웅의 덕목: '말의 달인이자 행동의 영웅이 되라'",
    greekCitation: "μύθων τε ῥητῆρ' ἔμεναι πρηκτῆρά τε ἔργων.",
    koreanCitation: "말을 잘하는 웅변가이자 위대한 행동을 해내는 영웅이 되도록...",
    epicContext: "iliad"
  },
  {
    id: "time_honor",
    greek: "Τιμή",
    transliteration: "Timē",
    korean: "티메 (명예와 전리품)",
    category: "society",
    shortDef: "동료 전사들과 공동체로부터 인정받는 사회적 위상과 눈에 보이는 영예의 징표",
    fullExplanation: "고대 영웅들에게 전리품(Geras)은 단순한 물질적 탐욕이 아니라, 그의 전공과 목숨을 건 용기에 대한 공동체의 명예(티메) 인증이었습니다. 아가멤논이 브리세이스를 강탈했을 때 아킬레우스가 분노한 이유입니다.",
    keyExample: "아가멤논에게 전리품 브리세이스를 빼앗기자 전장 출전을 거부한 아킬레우스",
    greekCitation: "οὐδέ τί μ' οἴω ἐνθάδ' ἄτιμον ἐόντα ἄφενος καὶ πλοῦτον ἀφύξειν.",
    koreanCitation: "내가 여기서 모욕(불명예)을 당하면서 너를 위해 재물을 모아줄 생각은 추호도 없다.",
    epicContext: "iliad"
  },
  {
    id: "nekyia",
    greek: "Νέκυια",
    transliteration: "Nekyia",
    korean: "네퀴이아 (저승 하강과 망령 소환)",
    category: "divine",
    shortDef: "산 자가 죽음의 경계를 넘어 저승의 혼령들과 대화하고 지혜를 구하는 의식",
    fullExplanation: "《오디세이아》 제11권의 제목으로, 영웅이 영적 성숙을 이루고 미래의 길을 묻기 위해 죽은 자들의 세계를 대면하는 신화적 통과의례입니다.",
    keyExample: "오디세우스가 피의 제사를 드리고 예언자 테이레시아스와 어머니의 혼령을 만남",
    greekCitation: "ψυχαὶ ὑπὲξ Ἐρέβευς νεκύων κατατεθνηώτων...",
    koreanCitation: "에레보스의 어둠 속에서 죽은 자들의 망령들이 몰려들었으니...",
    epicContext: "odyssey"
  },
  {
    id: "ekphrasis",
    greek: "Ἔκφρασις",
    transliteration: "Ekphrasis",
    korean: "에크프라시스 (시각 예술품의 문학적 묘사)",
    category: "society",
    shortDef: "그림이나 조각 등 시각적 예술품을 생생하고 역동적인 언어로 묘사하는 수사학 기법",
    fullExplanation: "서양 문학사 최초이자 가장 위대한 에크프라시스는 바로 《일리아드》 제18권의 '아킬레우스의 방패' 묘사입니다. 시각적 조각이 시(Poetry)의 시간 속에서 살아 움직이듯 묘사됩니다.",
    keyExample: "헤파이토스가 조각한 방패 속 춤추는 아이들과 황소를 공격하는 사자들의 역동적 서술",
    greekCitation: "τὸ δὴ περὶ θαῦμα τέτυκτο...",
    koreanCitation: "그것은 정녕 바라보는 것만으로도 감탄을 자아내는 기적의 솜씨였다...",
    epicContext: "iliad"
  },
  {
    id: "anagnorisis",
    greek: "Ἀναγνώρισις",
    transliteration: "Anagnōrisis",
    korean: "아나그노리시스 (인지 / 극적 재회와 발견)",
    category: "heroism",
    shortDef: "무지와 오해의 어둠에서 벗어나 감추어졌던 진실과 상대방의 정체를 깨닫는 순간",
    fullExplanation: "아리스토텔레스가 《시학》에서 비극과 서사시의 핵심 요소로 꼽은 개념입니다. 《오디세이아》 후반부의 거지의 정체가 오디세우스임이 밝혀지는 감격적인 상봉 장면들의 핵심입니다.",
    keyExample: "유모 에우리클레이아가 흉터를 알아보고, 페넬로페가 올리브나무 침대의 비밀로 오디세우스를 확인함",
    greekCitation: "σῆμα δέ τοι ἐρέω μάλ' ἀριφραδές, ὅ με λάθοι...",
    koreanCitation: "오직 당신과 나만이 아는 침대의 분명한 비밀 표식을 말씀드리겠소...",
    epicContext: "odyssey"
  }
];
