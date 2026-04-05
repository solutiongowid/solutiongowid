export type Option = {
  id: string;
  label: string;
};

export type ChatResponse = {
  text: string;
  options: Option[];
  isFinal?: boolean;
  finalType?: 'apply' | 'soft_close';
  link?: string;
};

export const INTRO_MESSAGES = [
  "안 바꾸는 이유, 다 맞는 말이에요.\n\n근데 —",
  "납부일을 다다음달 1일로",
  "한도를 충분하게",
  "페이백은 0.45%부터, 조건 없이",
  "영수증 앱, 결산 SaaS도 무료로",
  "쓸 수 있다는 것부터 말씀드리고 싶었어요.",
  "무엇을 더 구체적으로 알아보시겠어요?",
];

export const INTRO_OPTIONS: Option[] = [
  { id: "compare", label: "지금 쓰는 카드와 비교해보고 싶어요" },
  { id: "case_start", label: "우리 업종 사례가 궁금해요" },
  { id: "limit_check", label: "한도가 얼마나 나올지 확인해보고 싶어요" },
  { id: "howto", label: "발급하려면 뭘 해야 하나요" },
];

const END_OPTIONS: Option[] = [
  { id: "cta_apply", label: "연락처 남기기 >" },
  { id: "more", label: "좀 더 알아볼래요" },
];

export const MORE_OPTIONS: Option[] = [
  { id: "compare", label: "카드 비교해보기" },
  { id: "case_start", label: "업종 사례 보기" },
  { id: "limit_check", label: "예상 한도 확인" },
  { id: "howto", label: "발급 절차" },
  { id: "back", label: "← 처음으로" },
];

export const CHATBOT_RESPONSES: Record<string, ChatResponse> = {
  compare: { text: "지금 쓰시는 카드, 페이백 받고 계세요?", options: [{ id: "cmp_pb_no", label: "아뇨" }, { id: "cmp_pb_yes", label: "받고 있어요" }] },
  cmp_pb_no: { text: "그러면 한도는요?\n\n부족해서 쪼개 쓰거나, 매입 타이밍 놓치신 적 있으세요?", options: [{ id: "cmp_nopb_nolimit", label: "한도도 부족했어요" }, { id: "cmp_nopb_oklimit", label: "한도는 괜찮아요" }] },
  cmp_pb_yes: { text: "그러면 한도는요?\n\n부족해서 쪼개 쓰거나, 매입 타이밍 놓치신 적 있으세요?", options: [{ id: "cmp_okpb_nolimit", label: "한도가 부족했어요" }, { id: "cmp_okpb_oklimit", label: "한도도 괜찮아요" }] },
  cmp_nopb_nolimit: { text: "페이백도 안 받고, 한도도 부족한 상태시군요.\n\n고위드는 페이백 0.45~0.5%. 2.3%대 체크카드도 있어요.\n한도는 담보 없이 데이터로 산출해요.\n\n우리 기업에 맞는 비교 자료를 정리해서 설명드려보고 싶은데요.", options: END_OPTIONS },
  cmp_nopb_oklimit: { text: "한도는 괜찮은데 페이백을 안 받고 계신 거네요.\n\n고위드는 0.45~0.5% 페이백이 기본이에요. 2.3%대 체크카드도 있고요.\n\n우리 기업 기준으로 예상 페이백을 정리해서 설명드려보고 싶은데요.", options: END_OPTIONS },
  cmp_okpb_nolimit: { text: "페이백은 받고 계시는데, 한도가 부족한 상태시군요.\n\n담보 없이 데이터로 한도를 산출해요.\n\n우리 기업 기준으로 한도가 어떻게 달라지는지 설명드려보고 싶은데요.", options: END_OPTIONS },
  cmp_okpb_oklimit: { text: "둘 다 괜찮으시군요.\n\n혹시 페이백이 얼마인지 아세요? 고위드는 0.45~0.5%가 기본이고, 2.3%대 체크카드도 있거든요.\n\n우리 기업 기준으로 비교해서 설명드려보고 싶은데요.", options: END_OPTIONS },

  case_start: { text: "어떤 업종이세요?", options: [{ id: "case_beauty", label: "뷰티/화장품" }, { id: "case_fashion", label: "패션/라이프" }, { id: "case_food", label: "식품/푸드" }, { id: "case_other", label: "다른 업종이에요" }] },
  case_beauty: { text: "뷰티 커머스는 OEM 제조사 선지급이랑 올리브영 정산 사이에서 현금흐름이 막히는 경우가 많아요.\n\n바람인터내셔날, 일레븐코퍼레이션 같은 뷰티 기업이 고위드를 쓰고 있어요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_fashion: { text: "패션은 해외 발주 선금이랑 시즌별 대량 매입 때문에 자금이 몰리죠.\n\n블링크프로젝트, 디에프코퍼레이션 같은 패션 기업이 고위드를 쓰고 있어요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_food: { text: "이그니스라는 푸드 커머스가 있어요.\n\n매입 대금을 카드로 바로 정산하니까, 공급사 입장에서 빨리 돈 받는 셈이 된 거죠. 그래서 단가 협상력이 생겨서 원가를 3% 낮췄어요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_other: { text: "조금 더 좁혀볼게요. 어디에 가까우세요?", options: [{ id: "case_ad", label: "광고대행사" }, { id: "case_edu", label: "교육/에듀테크" }, { id: "case_saas", label: "IT/SaaS" }, { id: "case_etc", label: "여기에도 없어요" }] },
  case_ad: { text: "광고대행사는 취급고는 큰데 카드 한도가 안 따라가는 게 문제죠.\n\n비에이티, 매드코퍼레이션 같은 대행사가 고위드를 쓰고 있어요. 한도가 충분하니까 랩사를 안 끼워도 되고, 그만큼 수수료를 아끼는 거예요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_edu: { text: "교육업은 광고비 선투입이랑 부트캠프 시설비가 한꺼번에 나가는 게 부담이죠.\n\n데이원컴퍼니, 팀스파르타, 코드잇 같은 기업이 고위드를 쓰고 있어요. 광고비를 카드로 후불화하고, 시설비도 분산하는 거예요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_saas: { text: "SaaS/IT는 클라우드 비용이랑 광고비가 매출보다 먼저 나가는 게 문제죠.\n\n채널코퍼레이션, 플렉스, 베스핀글로벌 같은 기업이 고위드를 쓰고 있어요. 클라우드 비용이랑 광고비를 카드로 후불화해서, 매출 회수 시점에 맞추는 거예요.\n\n우리 기업에 맞는 사례와 솔루션을 설명드려보고 싶은데요.", options: END_OPTIONS },
  case_etc: { text: "4,000개 넘는 기업이 쓰고 있어서, 같은 업종 사례가 있을 거예요.\n\n우리 기업에 맞는 사례를 찾아서 설명드려보고 싶은데요.", options: END_OPTIONS },

  limit_check: { text: "담보 없이, 데이터만으로 한도를 산출해요.\n\n온라인으로 간편하게 신청할 수 있고요.\n\n우리 기업 기준으로 예상 한도를 설명드려보고 싶은데요.", options: END_OPTIONS },

  howto: { text: "혹시 — 기존 카드를 해지해야 한다고 생각하고 계세요?", options: [{ id: "howto_yes", label: "네, 그게 부담이에요" }, { id: "howto_other", label: "그건 아닌데, 다른 게 궁금해요" }] },
  howto_yes: { text: "해지 안 하셔도 됩니다.\n\n추가로 발급받아서 먼저 써보시고, 괜찮으면 그때 옮기시면 돼요.\n\n신청은 3분이면 끝나요. 카드 수령까지 약 일주일이고요.", options: END_OPTIONS },
  howto_other: { text: "신청은 3분이면 끝나요. 카드 수령까지 약 일주일.\n\n기존 카드 해지 안 해도 되고, 추가로 발급받는 거라 리스크도 없어요.", options: END_OPTIONS },
  howto_internal: { text: "내부 공유용 비교 자료를 정리해서 설명드릴 수 있어요.\n설득에 필요한 숫자를 맞춰드릴게요.", options: END_OPTIONS },

  cta_apply: { text: "담당자가 직접 연락드려요.\n\n예상 한도, 페이백, 같은 업종 사례까지 정리해서 가져갈게요.", options: [], isFinal: true, finalType: "apply", link: "https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-display&utm_campaign=commerce-apply-lead-04" },
  cta_later: { text: "네, 편하실 때 다시 찾아주세요.\n궁금한 게 생기면 언제든 돌아오시면 돼요.", options: [], isFinal: true, finalType: "soft_close" },
};
