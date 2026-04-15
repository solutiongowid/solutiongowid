"use client";

import { useState } from "react";

type Email = {
  id: string;
  sentDate: string;
  subject: string;
  openRate: number;
  clickRate: number;
  leads: number | string;
  sequence: string;
  sequenceType: string;
  target: string;
  cta: string;
  body: string;
  isBest?: boolean;
};

const emails: Email[] = [
  {
    id: "2602-1",
    sentDate: "2026-02",
    subject: "내일 보내드릴 메일",
    openRate: 42.8,
    clickRate: 3.8,
    leads: "시퀀스 3건",
    sequence: "2602 메타 커머스 리포트",
    sequenceType: "인바운드 유입자 자동 시퀀스",
    target: "메타 광고 커머스 리포트 리드폼 제출자",
    cta: "도입신청서",
    body: `안녕하세요, $%corpname%$ 담당자님
고위드에서 고객 전략팀을 리드하는 문미성이라고 합니다.

지난 3년간 고위드에서
더파운더즈(아누아), 일레븐코퍼레이션, 베이직스, 포터리, 앳홈, 이그니스, 데이지크 성장을 함께하며 배웠습니다.
아이템과 시장 전략, 투자와 문화를 뛰어 넘는 "커머스 성공의 공식"이 있다는 것을요.

일반적으로 법인카드를 광고비, 복리후생비 정도로 사용하실 수 있다고 생각하시는데요.
커머스 기업이 고위드를 선택하는 가장 큰 이유는 "고액 한도로 매입/광고비를 카드로 결제한다" 였습니다.

[고위드 카드로]
1. 광고비와 매입비를 카드로 결제합니다.
2. 집행한 비용이 실제로는 다음 달에 나가니 당월 현금 흐름이 +가 됩니다.
3. 현금 압박 없이, 성장에 집중할 수 있습니다.

ㅡ 아래에서 고위드에 대해 더 알아보시거나, 바로 시작해보세요.
지금 바로 도입 신청하기

드려야 하는 이야기는 여기까지이지만, 저는 내일도 메일을 보내려고 합니다.
특별히 $%corpname%$께 드리고 싶은 이야기가 남아 있어서요.

내일은 392개의 커머스의 재무를 분석하여 리포트를 보내드립니다.
메일의 제목은 [벤치마크 리포트]로 시작합니다.

내일 뵙겠습니다.

감사합니다.
고위드 문미성 드림`,
  },
  {
    id: "2602-2",
    sentDate: "2026-02",
    subject: "[벤치마크 리포트] 387개의 커머스 재무 분석",
    openRate: 34.0,
    clickRate: 4.4,
    leads: "시퀀스 3건",
    sequence: "2602 메타 커머스 리포트",
    sequenceType: "인바운드 유입자 자동 시퀀스",
    target: "메타 광고 커머스 리포트 리드폼 제출자",
    cta: "도입신청서",
    body: `안녕하세요 $%corpname%$ 담당자님. 고위드 문미성입니다.
고위드 대표 김항기님이 말 그대로 '매일' 하는 이야기가 있습니다.

"고객의 삶을 실질적으로 풍요롭게 함으로써 사랑 받자"

우리는 알고 있습니다.
강력한 팀, 성장의 효율을 갖춘 커머스 기업이
돈의 타이밍까지 맞추기 시작하면
그의 성공은 불보듯 뻔하다는 것을요.

$%corpname%$ 사가 성공을 설계하고 실현하는데 기여하고자 만든,
커머스 벤치마크 리포트를 공유드립니다.

394개 커머스 기업을 분석했고, 성공한 기업과 쇠퇴 기업의 공통점을 발견했습니다.
무엇보다 턴어라운드에 성공한 기업들이 행동 패턴을 찾았습니다.

V 매출 00억부터 생존률 급상승
V 성공 기업의 공헌이익 마지노선은 00%
V 회복 기업은 비용 절감이 아니라 매출 성장으로 회복
V 쇠퇴 기업의 패턴은 결국 ㅇㅇ 부족부터 시작

우리 기업의 지금을 진단하고
앞으로를 설계해보세요.

👉 [387개 커머스 벤치마크 리포트 링크]

그리고 고위드와의 성장이 기대되신다면 아래에서 바로 시작해보세요.
지금 바로 도입 신청하기

월요일에도 한 번 연락 드릴게요.
감사합니다 담당자님.
문미성 드림`,
  },
  {
    id: "2603-platform-1",
    sentDate: "2026-03-03",
    subject: "패션 커머스의 이상한 공통점을 발견했습니다",
    openRate: 21.5,
    clickRate: 1.3,
    leads: "시퀀스 8건",
    sequence: "2603 플랫폼 커머스 아웃바운드",
    sequenceType: "아웃바운드 시퀀스 (2원고)",
    target: "무신사·올리브영·오늘의집 입점 브랜드",
    cta: "도입신청서",
    body: `안녕하세요, $%corpname%$ $%name%$ 대표님
고위드에서 고객 전략팀을 리드하는 문미성이라고 합니다.

지난 3년간 디에프코퍼레이션, 포터리, 해브해드, 딥다이브, 아모멘토 등
패션 카테고리에서 빠르게 성장하는 기업들과 함께하며 이상한 공통점 하나를 발견했습니다.

잘 되는 브랜드일수록 "시즌이 시작되기 두 달 전"부터 현금이 부족해졌습니다.

시즌 선기획 원단·부자재 선매입.
임가공·봉제공임 선결제.
메타·네이버 광고비 선집행.
무신사·지그재그·W컨셉 정산은 15~45일 뒤.
ㅡ 매출이 올라갈수록 돈이 먼저 나가는 구간이 길어지는 구조.

이것이 성장하는 패션 브랜드의 공통된 현금흐름 패턴이었습니다.

$%corpname%$ 사께 도움이 되고자 만들었습니다.
: 387개 커머스 기업의 재무를 분석한 벤치마크 리포트

내일의 메일에서 보내드리겠습니다.
제목은 [벤치마크 리포트]로 시작합니다.

ㅡ 혹 "레포트도 좋은데 우린 지금 바로 유동성이 필요해!" 하신다면, 도입 문의를 남겨주세요.
바로 연락드리겠습니다.

👉도입 신청서 작성하기

감사합니다
고위드 문미성 드림`,
  },
  {
    id: "2603-platform-2",
    sentDate: "2026-03-04",
    subject: "약속드린 387개 커머스 벤치마크 리포트 보내드립니다",
    openRate: 25.6,
    clickRate: 2.5,
    leads: "시퀀스 8건",
    sequence: "2603 플랫폼 커머스 아웃바운드",
    sequenceType: "아웃바운드 시퀀스 (2원고)",
    target: "무신사·올리브영·오늘의집 입점 브랜드",
    cta: "도입신청서",
    body: `안녕하세요 $%corpname%$ $%name%$ 대표님. 고위드 문미성입니다.
말씀드린 리포트를 보내드립니다.

387개 커머스 기업의 재무 데이터를 분석했습니다.
성공한 기업과 쇠퇴한 기업 사이에 명확한 갈림길이 있었고,
특히 턴어라운드에 성공한 기업들의 행동 패턴을 발견했습니다.

✔ 매출 00억부터 생존률 급상승
✔ 성공 기업의 공헌이익 마지노선은 00%
✔ 회복 기업은 비용 절감이 아니라 매출 성장으로 회복
✔ 쇠퇴 기업의 패턴은 결국 ㅇㅇ 부족부터 시작

흥미로운 점은, 성장기에 접어든 기업의 현금 구조가
카테고리와 무관하게 거의 동일한 형태를 보인다는 것이었습니다.

패션 브랜드라면 더욱이 시즌 선기획 원부자재 매입과 임가공비가 동시에 나가는 구조인 만큼,
성장기의 현금 구조를 미리 이해해두는 것이 중요합니다.

$%corpname%$에서 지금 어디쯤 서 있는지 진단하고, 앞으로를 설계해보세요.

[387개 커머스 벤치마크 리포트 무료 다운]

다음 주에 한 번 더 연락드리겠습니다.
이 리포트의 숫자가 실제로 의미하는 것에 대해 말씀드리고 싶어서요.

고위드가 어떤 회사인지 궁금하시다면, 링크를 참고해주세요.

감사합니다.
문미성 드림`,
  },
  {
    id: "2603-direct",
    sentDate: "2026-03-10",
    subject: "$%corpname%$의 매입비, 다음 달에 내도 됩니다",
    openRate: 23.2,
    clickRate: 1.0,
    leads: 2,
    sequence: "2603 도입신청 직행",
    sequenceType: "아웃바운드 단건",
    target: "커머스 타겟 리스트",
    cta: "도입신청서 (한도 산출)",
    body: `안녕하세요 $%corpname%$ 대표님.
고위드 문미성입니다.

누군가 $%corpname%$의 생산비용을 거래처에 미리 내주고 돈은 다음 달에 받겠다고 하면 어떠세요?

300여개의 커머스 기업이 선택한 고위드에서는 그것이 가능합니다.
같은 연 매출 50억 패션 커머스 두 곳.

하나는 매달 자금 압박에 시달리고,
하나는 시즌 대량 발주를 거뜬히 소화합니다.

차이는 단 하나. 매입비가 나가는 타이밍이었습니다.

A사: 원자재·완성품 매입을 현금으로 즉시 결제 → 발주 시점에 현금 유출 → 정산까지 4~8주 자금 묶임
B사: 동일한 매입을 법인카드로 결제, 45일 뒤 출금 → 무신사 정산이 먼저 도착 → 운전자본에 여유 확보

B사가 사용한 것이 고위드 법인카드입니다.

[월 카드 사용액별 절감 비용]
1. 월 카드 5억원 사용: 관리시간 절약 96만원 + 카드 페이백 250만원 + 조달 비용 절약 167만원 = 월 합산 513만원 절감
2. 월 카드 10억원 사용: 월 합산 929만원 절감
3. 월 카드 20억원 사용: 월 합산 1,763만원 절감

핵심은 페이바이카드로 해외/국내 제조비 결제를 카드 전환하여
환율 리스크 해소 + 송금 수수료 절감을 하면서도 매입비를 50일 이상 이연한다는 것입니다.

요약해보면, 빠르게 성장하는 패션 커머스 기업이 고위드를 선택하는 가장 큰 이유는
"고액 한도로 OEM 제조비/광고비를 카드로 결제한다" 였습니다.

그럼 이제 우리 기업이 쓸 수 있는 적정 한도가 얼마인지 한 번 확인해볼까요?
클릭 몇 번으로 바로 확인할 수 있어요. 물론 무료이고요.

[지금 바로 한도 산출해보기]

감사합니다.
문미성 드림`,
  },
  {
    id: "2603-meeting",
    sentDate: "2026-03-20",
    subject: "대표님 문미성입니다",
    openRate: 26.6,
    clickRate: 1.7,
    leads: 5,
    sequence: "2603 미팅 요청",
    sequenceType: "아웃바운드 단건",
    target: "대표 타겟 리스트",
    cta: "도입신청서 + 30분 미팅 회신",
    body: `$%name%$ 대표님, 안녕하세요.
고위드 고객전략팀 문미성입니다.
$%corpname%$를 꼭 만나뵙고자 이렇게 메일을 보냅니다.

저는 고위드에서 주로 큰 기업들을 많이 뵈었습니다.
성장이 빠른 기업일수록 모순적이게도 유동성에 대한 고민이 있음을 계속 발견해왔고,
3,500여 개사의 지출 최적화를 도운 노하우로 성장 기업의 현금흐름을 최적화하는 일을 해왔습니다.

쉽게 말씀드리면—
초고액·고액 한도를 만들고, 대금 결제 기일을 최대한 뒤로 미룹니다.
OEM 제조비·광고비·물류비 등 현금 기반 거래를 하던 영역까지 카드 솔루션을 사용하실 수 있는 인프라를 만들었습니다.
쉽게 말해, $%corpname%$은 그 어떤 비용이든 50일 이상 뒤로 미룰 수 있습니다.

$%corpname%$ 3개월 실익 시뮬레이션 (월 법인카드 사용액 1,000만원 기준)
| 구분 | 계산 기준 | 3개월 효과 |
| 페이백 | 사용액 × 0.3% | +9만원 |
| 자금 조달 비용 절약 | 단기 차입 연 5% 회피 기준 | +21만원 |
| 월 평균 잔고 상승 | 50일 후불 적용 시 | +1,000만원 유지 |

5분만 투자하시면 온라인으로 바로 $%corpname%$의 한도를 확인하실 수 있습니다.
[$%corpname%$ 한도 확인하기]

메일만으로는 드리고 싶은 이야기를 모두 담을 수 없네요.
$%corpname%$에서 계획하고 계신 26년은 어떤지 너무 궁금하기도 하고요.
대표님, 혹시 다음 주 중에 온라인으로라도 30분 뵐까요?
회신을 기다리겠습니다.

감사합니다.
문미성 드림
Lead | 고객전략 / moon@gowid.com | +82.10.2125.9069`,
  },
  {
    id: "2604-tips-1",
    sentDate: "2026-04-09",
    subject: "대표님, 고위드 문미성입니다",
    openRate: 67.2,
    clickRate: 7.9,
    leads: 34,
    sequence: "2604 팁스/혁신의숲",
    sequenceType: "아웃바운드 시퀀스 (2원고)",
    target: "팁스·혁신의숲 등록 법인 대표 이메일",
    cta: "도입신청서 (한도 산출)",
    isBest: true,
    body: `안녕하세요, $%name%$ 대표님
고위드 문미성입니다.

최근 뵈었던 벤처캐피탈리스트로부터 $%corpname%$사가 큰 성장을 앞두고 계시다는 이야기를 듣고, 버선발로 마중나와보았습니다.

법인세 신고에 주총에 감사 대응까지, 3월을 보내느라 고생 많으셨을 겁니다.
끝났나 싶으면 25일 부가세 예정신고가 또 있고요.

한 가지만 더 챙기시면 좋겠습니다.

작년 재무제표가 확정된 지금이, 법인카드 한도가 다시 산출되는 시점입니다. 다만 솔직히 말씀드리면, 기존 카드사의 심사 구조에서는 $%corpname%$사와 같은 기업의 성장성이 제대로 반영되기 어렵습니다. 투자금이 있어도, 매출이 올라도, 한도는 크게 달라지지 않는 경우가 많습니다.

뤼튼, 채널톡, 플렉스, 리벨리온 같은 테크 기업들이 고위드를 써온 이유가 여기에 있습니다. 3년에서 5년 전부터, 기존 카드사 대비 압도적으로 높은 한도를 받아 운영해오고 있습니다.
이 기업들이 고위드에서 해결하는 것은 크게 세 가지입니다.

— 한도. 성장 단계에 맞는 충분한 한도.
— 관리. 임직원별 법인카드 발급, 지출 정책 설정, SaaS·복후비 통합 관리.
— 후불화. GPU·클라우드·광고비처럼 선투입이 필요한 비용을 카드로 전환.

자신 있게 제안드립니다. 고위드에서 한도를 한번 산출해보시고, 지금 받고 계신 한도와 비교해보십시오. 기존 카드사 한도에 영향 없고, 신용조회도 들어가지 않습니다.

[한도 산출해보기]

궁금한 점 있으시면 이 메일에 바로 답장 주세요.

---
문미성 Lead | 고객전략
(주)고위드 | 서울시 강남구 도산대로 317, 14층

*본 메일이 대표님이 아닌 분께 도착했다면, 대표님께 전달 부탁드립니다.`,
  },
  {
    id: "2604-tips-2",
    sentDate: "2026-04-10",
    subject: "리마인드",
    openRate: 7.9,
    clickRate: 4.3,
    leads: 1,
    sequence: "2604 팁스/혁신의숲",
    sequenceType: "아웃바운드 시퀀스 (2원고)",
    target: "팁스·혁신의숲 등록 법인 대표 이메일 (1번 미회신)",
    cta: "도입신청서 (한도 산출)",
    body: `안녕하세요, $%name%$ 대표님
고위드 문미성입니다.

어제 보내드린 메일에 회신을 받지 못하여 한 번 찾아왔습니다.

이거, 비용이 있는 거 아니야? 불안이 있으실수도
지금은 좀 바쁜데, 또는 우린 문제가 없는데 ㅡ 하실 수도 있겠습니다.

작년 재무제표가 확정된 지금, 법인카드 한도가 다시 산출되는 시점입니다.
솔직히 말씀드리면, 기존 카드사의 심사 구조에서는 $%corpname%$사와 같은 기업의 성장성이 제대로 반영되기 어렵습니다.

기존 카드사는 분기마다 나오는 재무제표 한 장으로 기업을 판단하기 때문에
투자금이 있어도, 매출이 올라도, 한도는 크게 달라지지 않는 경우가 많습니다.

고위드는 다릅니다. 한도 산출 시점에, 최근 30일 정도의 현금흐름,
입출금 항목 하나하나를 61개 카테고리로 분류해요.

물론 기업 정보는 비식별로 시스템이 분석하여서 산출 전 내용은 그 누구도 모르지만,
이렇게 계산된 기업의 체력을 잘 읽어내어 한도를 계산하는데 사용합니다.

이 데이터 25주치가 쌓여서 고위드는 우리 기업의 3개월 뒤를 예측합니다.
은행이 과거의 숫자를 보는 동안, 고위드는 $%corpname%$의 미래를 보고 있는 거예요.

뤼튼, 채널톡, 플렉스, 리벨리온 같은 테크 기업들이 고위드를 써온 이유가 여기에 있습니다.

— 한도. 성장 단계에 맞는 충분한 한도. 현금이 출렁일 때는 유동적인 상향.
— 관리. 임직원별 법인카드 발급, 지출 정책 설정, SaaS·복후비 통합 관리.
— 후불화. GPU·클라우드·광고비처럼 선투입이 필요한 비용을 카드로 전환.

[한도 산출해보기]

감사합니다
문미성 드림`,
  },
  {
    id: "2604-signup",
    sentDate: "2026-04-14",
    subject: "지난 메일에 이어 연락드립니다",
    openRate: 53.0,
    clickRate: 2.2,
    leads: "가입 12 / 승인 4",
    sequence: "2604 후속 회원가입 직행",
    sequenceType: "아웃바운드 단건",
    target: "팁스/혁신의숲 시퀀스 미전환자",
    cta: "회원가입 링크 (직행)",
    body: `안녕하세요, $%name%$ 대표님
고위드 문미성입니다.

얼마 전 보내드린 메일을 기억하실지 모르겠습니다.
기존 법인카드 한도가 스타트업의 성장성을 제대로 반영하지 못한다는 이야기였는데요.
이번엔 한 가지만 더 말씀드리려고 다시 연락드렸습니다.

"좋은 건 알겠는데, 바빠서 지금 당장 안필요해요"
결론부터 말씀드리면, 신청부터 실물 카드 수령까지 8일입니다.

[도입 절차]
1. 회원 가입 — 5분 이내
2. 계좌 등록 — 법인 계좌 연결 (현금흐름 기반 한도 산출, 자동)
3. 한도 심사 — 최근 60일 현금흐름 기반 자동 심사 (10분 이내)
4. 카드 발급 — 신한 · 롯데 · BC 중 선택 (심사 완료 후 즉시)
5. 카드 수령 — 실물 카드 배송 (발급 후 3~5영업일)

첫 달은 산출 가능 최대 한도의 60%가 부여되며, 사용 실적에 따라 증액됩니다.
기존 카드사 한도에 영향 없이 고위드 한도가 추가로 나옵니다.
카드 한도 조회는 신용 등급에 영향이 전혀 없습니다.

[카드사별 혜택 비교]
| 구분 | 신한 | 롯데 | BC |
| 연회비 | 면제 | 면제 | 5,000원 (최초 1회) |
| 결제대금일 | 매월 15일 | 매월 15일 | 매월 23일 |
| 한도 복원 | D+1일 | 즉시 | 매월 1일 |
| 국내 적립 | 0.45% | 0.45% | 0.50% |
| 해외 수수료 | 1.18% | 1.2% | 1.4% |
| 라운지 혜택 | — | 공항 라운지, 발레파킹 | — |

서버비, 광고비가 크다면 BC카드(23일 결제, 공여일 최대)를,
해외 출장이 잦다면 롯데카드(라운지, 하이패스)를,
일반 결제 위주라면 신한카드(SOL페이)를 추천드립니다.

[페이바이카드 (Pay By Card)]
거래처 현금 결제를 카드로 결제하면, 고위드가 거래처에 직접 송금합니다.
PG 수수료 2.1%, 페이백 0.5% — 실질 수수료 1.7%
BC카드 기준 최소 50일, 최대 53일 공여.
페이바이카드 플러스를 이용하시면 최대 87일까지 연장됩니다.

[지출관리 + ERP 연동]
— 카드사 직연동 (스크래핑 아님)
— AI 계정과목 자동 맵핑
— 임직원별 카드 발급, 지출 정책 설정
— 아마란스10 ERP 연동 / 오픈 API 제공

[성장엔진 (CAPEX 금융)]
설비, 금형 등 대규모 투자가 필요하실 때 활용하실 수 있습니다.
금융리스 또는 할부 구조, 12개월 기준 수수료 7.5%.
현재까지 23개 법인, 88건 계약, 483억 — 대손 0건입니다.

회원가입~한도 조회까지 10분 내로 완료됩니다.
[10분 이내 한도 조회하기]

문미성 Lead | 고객전략
(주)고위드 | www.gowid.com`,
  },
];

const sequenceSummaries = [
  { name: "2602 메타 커머스 리포트", type: "인바운드 자동 시퀀스", sentAt: "2026-02", openRate: 38.4, clickRate: 4.1, leads: 3 },
  { name: "2603 플랫폼 아웃바운드", type: "아웃바운드 시퀀스 (2원고)", sentAt: "03-03 ~ 03-04", openRate: 23.6, clickRate: 1.9, leads: 8 },
  { name: "2603 도입신청 직행", type: "아웃바운드 단건", sentAt: "2026-03-10", openRate: 23.2, clickRate: 1.0, leads: 2 },
  { name: "2603 미팅 요청", type: "아웃바운드 단건", sentAt: "2026-03-20", openRate: 26.6, clickRate: 1.7, leads: 5 },
  { name: "2604 팁스/혁신의숲", type: "아웃바운드 시퀀스 (2원고)", sentAt: "04-09 ~ 04-10", openRate: 37.6, clickRate: 6.1, leads: 35, isBest: true },
  { name: "2604 후속 회원가입 직행", type: "아웃바운드 단건", sentAt: "2026-04-14", openRate: 53.0, clickRate: 2.2, leads: "가입 12 / 승인 4" },
];

export default function MonthlyReportPage() {
  const [openEmail, setOpenEmail] = useState<Email | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header style={{ marginBottom: "3rem" }}>
          <div style={{ color: "#5BC500", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            MONTHLY REPORT
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#111827", margin: "0 0 0.75rem" }}>
            2026년 2~4월 아웃바운드 캠페인 성과
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>
            도입신청서 · 회원가입 리드를 만드는 이메일 캠페인 6건의 원고·성과·인사이트 종합
          </p>
        </header>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>Top-line</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { label: "총 캠페인", value: "6개" },
              { label: "총 원고", value: "9편" },
              { label: "도입신청 리드", value: "53건" },
              { label: "회원가입 / 승인", value: "12 / 4" },
            ].map((m) => (
              <div key={m.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }}>{m.label}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{m.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>시퀀스별 요약</h2>
          <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "0.75rem", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead style={{ background: "#f9fafb" }}>
                  <tr>
                    {["시퀀스", "유형", "발송", "오픈율", "클릭율", "리드"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", color: "#6b7280", fontWeight: 600, borderBottom: "1px solid #e5e7eb" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sequenceSummaries.map((s) => (
                    <tr key={s.name} style={{ background: s.isBest ? "#f0fdf0" : "white" }}>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#111827", fontWeight: 600 }}>
                        {s.name}
                        {s.isBest && <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "#5BC500", fontWeight: 700 }}>BEST</span>}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{s.type}</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{s.sentAt}</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#111827" }}>{s.openRate}%</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#111827" }}>{s.clickRate}%</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", color: "#111827", fontWeight: 600 }}>{s.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>원고별 상세</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
            원고 카드를 클릭하면 전체 본문을 확인할 수 있습니다.
          </p>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {emails.map((e) => (
              <button
                key={e.id}
                onClick={() => setOpenEmail(e)}
                style={{
                  background: e.isBest ? "linear-gradient(135deg, #f0fdf0 0%, white 100%)" : "white",
                  border: e.isBest ? "2px solid #5BC500" : "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  width: "100%",
                }}
                onMouseEnter={(ev) => {
                  ev.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                  ev.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.boxShadow = "none";
                  ev.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 60%", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{e.sentDate}</span>
                      <span style={{ fontSize: "0.75rem", color: "#5BC500", fontWeight: 600 }}>· {e.sequence}</span>
                      {e.isBest && (
                        <span style={{ background: "#5BC500", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                          BEST
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: "0 0 0.35rem" }}>{e.subject}</h3>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 0.1rem" }}>
                      대상: {e.target}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>
                      CTA: {e.cta}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>오픈</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>{e.openRate}%</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>클릭</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>{e.clickRate}%</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>리드</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#5BC500" }}>{e.leads}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>핵심 인사이트</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              {
                title: "대상 세그먼트 품질이 오픈율의 대부분을 결정한다",
                body: "대표 직통 이메일 발송(4/9 팁스·혁신의숲) 67.2% > 리드폼 제출자(2602 메타 #1) 42.8% > 플랫폼 입점 브랜드 리스트(3월) 21~26%. 같은 문미성 Lead 명의, 유사한 톤의 원고라도 '누구에게 도달하는가'가 오픈율 차이의 대부분을 만든다.",
              },
              {
                title: "'한도 산출' CTA가 전환 구조의 킬러",
                body: "4/9 원고는 같은 한도 산출 CTA를 쓰면서도 단일 원고로 34건을 만들어냄. 같은 CTA라도 3/10 장문·수치 중심(513/929/1,763만원 표) 버전은 2건. 대상 품질 + 간결한 본문 + 명확한 CTA가 결합되어야 한다.",
              },
              {
                title: "리마인드는 볼륨 작아도 고관심자를 회수한다",
                body: "4/10 리마인드 오픈율 7.9%이나 오픈자의 54%가 클릭(클릭율 4.3%). 재오픈자는 결정 임박 상태 — 리마인드는 '전체 확산'이 아니라 '결정 임박자 회수' 용도로 계속 활용할 가치.",
              },
              {
                title: "미팅 요청보다 한도 산출이 진입 장벽 낮음",
                body: "3/20 미팅 요청(5건) vs 4/9 한도 산출(34건). 시간 약속이 필요한 CTA는 자체 필터가 되어 볼륨을 줄임. 초기 리드 생성 단계에서는 무신용조회·5분 한도 산출이 최적 경로.",
              },
              {
                title: "회원가입 직행은 마찰 적지만 전환 품질 검증 필요",
                body: "4/14 회원가입 직행은 도입신청 폼을 거치지 않아 12건 가입을 확보했지만 승인은 4건(33.3%). 폼 경유 리드 대비 의사결정 단계가 얕을 수 있음 — 후속 승인·활성화율 추적 필요.",
              },
              {
                title: "플랫폼 아웃바운드는 양으로 보완",
                body: "3월 플랫폼 시퀀스 오픈율 23.6%는 낮지만 3개 플랫폼 합산으로 8건 확보. 세그먼트 품질이 낮을 때는 발송 수 × 원고 품질로 볼륨을 만든다는 공식.",
              },
            ].map((ins) => (
              <div key={ins.title} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem" }}>{ins.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", margin: 0, lineHeight: 1.6 }}>{ins.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>개선 방향</h2>
          <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <ol style={{ margin: 0, paddingLeft: "1.25rem", color: "#374151", fontSize: "0.9rem", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>대상 확보에 리소스 집중.</strong> 팁스/혁신의숲처럼 대표 직통 이메일이 확보되는 소스(VC 포트폴리오, 액셀러레이터, 기사 DB)를 계속 발굴. 리스트 품질이 오픈율의 70%를 결정.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>3/10 직행 원고 개편.</strong> 장문·수치 중심에서 4/9처럼 "타이밍 + 사회적 증거(뤼튼·채널톡) + 3가지 가치 요약 + 한도 산출 CTA" 구조로 리라이트. A/B 테스트 권장.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>리마인드 2차·3차 실험.</strong> 오픈자 54% 클릭 패턴을 보면 리마인드 1회로 끝내지 말고 D+3, D+7 리마인드 추가 시 전환 곡선 추적해볼 여지.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>세그먼트별 원고 분기.</strong> 패션(무신사), 뷰티(올리브영), 리빙(오늘의집) 각각 레퍼런스 고객·현금흐름 사례를 다르게 써서 오픈율 5%p 이상 리프트 목표.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>회원가입 퍼널 추적.</strong> 4/14 회원가입 12건의 승인율 33% → 사용 전환율 → 실사용액까지 추적. 도입신청 경유 리드와 6개월 LTV 비교해 이 경로를 확대할지 판단.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>제목 실험.</strong> "대표님, 고위드 문미성입니다"(67.2%)와 "대표님 문미성입니다"(26.6%)의 차이는 대상 차이지만, 제목 어휘도 기여했을 가능성. 같은 대상 내에서 "대표님+실명" vs "요약형" 제목 A/B 테스트.
              </li>
              <li>
                <strong>UTM 설계 정비.</strong> 현재 `utm_content`가 플랫폼+시점 혼재(`ohouse-commerce-outbound`가 3/3과 3/18 둘 다 쓰임). 원고별 고유 식별자 체계로 정리하면 원고 단위 전환 귀속이 가능해짐.
              </li>
            </ol>
          </div>
        </section>

        <footer style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.75rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
          © 고위드 · 내부 리포트 · 2026-04-16 작성
        </footer>
      </div>

      {openEmail && (
        <div
          onClick={() => setOpenEmail(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "1rem",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "2rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.75rem", color: "#5BC500", fontWeight: 600, marginBottom: "0.35rem" }}>
                  {openEmail.sentDate} · {openEmail.sequence}
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem" }}>
                  {openEmail.subject}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  대상: {openEmail.target} · CTA: {openEmail.cta}
                </div>
              </div>
              <button
                onClick={() => setOpenEmail(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "0 0.5rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "flex", gap: "2rem", padding: "0.75rem 1rem", background: "#f9fafb", borderRadius: "0.5rem", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>오픈율</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{openEmail.openRate}%</div>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>클릭율</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{openEmail.clickRate}%</div>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>리드</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#5BC500" }}>{openEmail.leads}</div>
              </div>
            </div>
            <pre
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {openEmail.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
