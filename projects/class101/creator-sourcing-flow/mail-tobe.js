/** TO-BE deltas for proposal mails 1–7 (v1.0_beta). Paired with MAIL_PROMPTS AS-IS. */
window.MAIL_TOBE = {
  policy: {
    title: '전 차수 공통 변경',
    bullets: [
      '메일 본문 CTA는 예약 링크 1개만 (유형 선택은 캘린더에서)',
      'CTA 라벨 통일 제안: [📅 미팅 예약하기] → 단일 캘린더 URL ({{미팅링크}})',
      '본문에 설명회(1:다)·1:1 기획을 짧게 안내하되, 링크는 분리하지 않음',
      '3·6차 optional_info 1:1 Calendly 전용 URL 제거',
      '3차 Figma 장표 링크 → 미팅 전 랜딩(커리·영상)으로 대체 검토',
      '롤아웃: 신규는 즉시 · 이미 3차까지 간 리드는 4차부터 적용',
      'NocoDB: version=v1.0_beta · status=inactive 적재 후 스위치',
    ],
  },
  waves: {
    1: {
      summary: '오픈 미팅 단일 CTA → 단일 예약 링크로. 설명회/1:1 안내 문장 추가.',
      keep: ['개인화(최근 콘텐츠)', '가치 제안 3줄', '챕터 제안', 'HTML 태그 규칙', '구독자 조건부'],
      change: [
        'CTA: [🙏 제작 프로세스 오픈 미팅 신청하기] → [📅 미팅 예약하기] (링크 1개)',
        'CTA 문단: “편하신 방식을 예약 페이지에서 골라 주세요” + 설명회 / 1:1 한 줄씩',
        '미팅 타입 메타: 공용 캘린더 유지 (캘린더 UI가 슬롯 분리)',
      ],
      ctaAsis: '[🙏 제작 프로세스 오픈 미팅 신청하기]',
      ctaTobe: '[📅 미팅 예약하기]',
      meetingAsis: '공용 캘린더',
      meetingTobe: '단일 캘린더 (내부에서 1:1 / 설명회 슬롯)',
    },
    2: {
      summary: '2차도 동일 단일 CTA. 오픈 미팅 고정 문구만 교체.',
      keep: ['1차 리마인드 톤', '가치 3블록', '구독자 언급 금지', '챕터 제안 금지'],
      change: [
        'CTA: [🙏 제작 프로세스 오픈 미팅 신청하기] → [📅 미팅 예약하기]',
        '“오픈 미팅” 고정 표현 → “미팅(설명회 또는 1:1)” 안내로 완화',
      ],
      ctaAsis: '[🙏 제작 프로세스 오픈 미팅 신청하기]',
      ctaTobe: '[📅 미팅 예약하기]',
      meetingAsis: '공용 캘린더',
      meetingTobe: '단일 캘린더',
    },
    3: {
      summary: '핵심 변경 차수. 1:1 전용 CTA·Calendly optional_info·(검토) Figma 장표 제거.',
      keep: ['짧은 리마인드 톤', '간절하지만 부담 없는 마무리'],
      change: [
        'CTA: [🙏 1:1 미팅 신청하기] → [📅 미팅 예약하기] (단일)',
        'output optional_info Calendly 1:1 URL 삭제',
        '본문 “1:1도 가능” → “예약 페이지에서 1:1 또는 설명회 선택”',
        'Figma 장표 링크 → 미팅 전 자료 랜딩 URL로 교체 검토 (비번 101101 장표는 deprecate)',
        'meeting 메타: 1:1 예약 링크 → 단일 캘린더',
      ],
      ctaAsis: '[🙏 1:1 미팅 신청하기] + Figma 장표 + optional_info Calendly',
      ctaTobe: '[📅 미팅 예약하기] (+ 선택: 자료 랜딩)',
      meetingAsis: '1:1 예약 링크',
      meetingTobe: '단일 캘린더',
    },
    4: {
      summary: '걱정 해소 톤 유지. CTA만 단일화. (롤아웃 시작 차수)',
      keep: ['걱정 Q&A 구조', '낮은 허들', '메일 회신도 OK'],
      change: [
        'CTA: [🙏 1:1 미팅 신청하기] → [📅 미팅 예약하기]',
        'optional_info Calendly 삭제(프롬프트에 남아 있으면)',
        '이미 3차까지 간 리드도 이 차수부터 새 카피 적용',
      ],
      ctaAsis: '[🙏 1:1 미팅 신청하기]',
      ctaTobe: '[📅 미팅 예약하기]',
      meetingAsis: '공용 캘린더',
      meetingTobe: '단일 캘린더',
    },
    5: {
      summary: '오픈 미팅 재안내 → 단일 예약. “급하지 않다” 톤 유지.',
      keep: ['타이밍 체크', '장기 관계', '압박 금지'],
      change: [
        'CTA: [🙏 오픈 미팅 신청하기] → [📅 미팅 예약하기]',
        '“다른 크리에이터와 오픈 미팅” → “설명회(여러 명) 또는 1:1” 선택 안내',
      ],
      ctaAsis: '[🙏 오픈 미팅 신청하기]',
      ctaTobe: '[📅 미팅 예약하기]',
      meetingAsis: '공용 캘린더',
      meetingTobe: '단일 캘린더',
    },
    6: {
      summary: '새 주제 제안은 유지. 1:1 전용 CTA·Calendly 제거.',
      keep: ['1차와 다른 주제 2~3개', '오랜만/새 아이디어 톤'],
      change: [
        'CTA: [🙏 1:1 미팅 신청하기] → [📅 미팅 예약하기]',
        'optional_info Calendly 삭제',
        'meeting 메타: 1:1 예약 링크 → 단일 캘린더',
      ],
      ctaAsis: '[🙏 1:1 미팅 신청하기] + optional_info Calendly',
      ctaTobe: '[📅 미팅 예약하기]',
      meetingAsis: '1:1 예약 링크',
      meetingTobe: '단일 캘린더',
    },
    7: {
      summary: '클로징·문 열어두기 유지. CTA 있으면 단일 링크로 통일.',
      keep: ['짧은 인사', '언제든 연락', '마지막/더이상 안 보냄 금지'],
      change: [
        'CTA가 있으면 [📅 미팅 예약하기] 단일만',
        '유형 선택 문구는 최소화(클로징 톤 유지)',
      ],
      ctaAsis: '{{미팅링크}} (공용)',
      ctaTobe: '[📅 미팅 예약하기] 단일',
      meetingAsis: '공용 캘린더',
      meetingTobe: '단일 캘린더',
    },
  },
};

window.REMIND_TOBE = {
  policy: {
    title: '미팅 전 안내 · 공통 TO-BE',
    bullets: [
      'from: review@101.inc → 미팅 담당자 (예외: chaeyoon 등 → creatorcenter@101.inc)',
      '핵심 CTA: 미팅 전 랜딩 1개 (커리·영상·로그인·메모·Join)',
      '로그인·영상 때문에 −1h / −15m(또는 −5m) 비중 강화',
      '커리큘럼 생성: 예약 확정 직후 또는 D-3 배치 · D-1에서 미생성 시 강제/알람',
      'Figma/제안서 비번(101101) 단독 링크는 랜딩으로 흡수 검토',
    ],
  },
  byId: {
    booked: {
      summary: '예약 완료 안내. 그룹 고정 문구 → 유형(설명회/1:1)에 맞게 분기.',
      change: [
        '본문 미팅 형태를 슬롯 타입에 맞게 (설명회 vs 1:1 15분)',
        'from=담당자',
        '자료/랜딩 URL 예고 가능',
      ],
    },
    d3: {
      summary: '−3일. 자료 Figma → 랜딩. 커리 생성 트리거와 맞춤.',
      change: [
        '미팅 자료: mkt proposal/Figma → 미팅 전 랜딩(tracking)',
        '커리 미생성이면 이 시점 배치에서 생성',
        'from=담당자',
      ],
    },
    d1: {
      summary: '−24h. 로그인·영상 미리보기 유도 추가.',
      change: [
        '랜딩 CTA + “미리 로그인·영상” 1~2문장',
        '커리 없으면 강제 생성/알람',
        'from=담당자',
      ],
    },
    day: {
      summary: '당일 오전(≈8시). 커리 CTA를 랜딩으로. from 변경.',
      change: [
        '맞춤 커리큘럼 CTA → 랜딩(로그인 포함)',
        '제안서 비번 단독 링크 deprecate 검토',
        'from=담당자 · 메일+문자 유지 여부 의견',
      ],
    },
    h1: {
      summary: '−1시간. 로그인·영상 여유 안내 강화 (핵심).',
      change: [
        '랜딩 CTA 강조 + 1~2분 여유',
        '메모 남기기 한 줄 유도',
        'from=담당자',
      ],
    },
    m5: {
      summary: '−5분. 입장 유도. 채널(메일/문자) 유지 여부 논의.',
      change: [
        'Meet Join 또는 랜딩 Join',
        '긴 자료 링크는 최소화',
        '−15m으로 바꿀지 / −5m 유지할지 의견',
      ],
    },
  },
};
