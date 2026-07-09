# 디자인 토큰 — CLASS101 Admin (vibrant-ui)

출처: Figma `Admin` 파일의 변수 정의 (get_variable_defs, 2026-07-03 추출)
+ "화면 타입별 활용 예시" 빈 샘플 실측 (2026-07-07)

## 컬러

| 토큰 | 용도 | 값 |
|---|---|---|
| primary | 핵심 CTA 버튼, 브랜드 포인트 | #FF5D00 |
| onPrimary | primary 위 텍스트 | #FFFFFF |
| background | 페이지 배경 | #FFFFFF |
| surface1 | 옅은 회색 면 (호버/구분 면) | rgba(0,0,0,0.03) |
| surface2 | 카드 배경 | #FFFFFF |
| outline1 | 헤어라인 — 카드 **내부** 구분선, 행 구분, 통계 바 테두리 | rgba(0,0,0,0.05) |
| outline2 | 카드 **테두리** (폼 섹션 카드, 정보 카드) | rgba(0,0,0,0.1) |
| adaptive/neutralMuted | 활성 메뉴 하이라이트, 태그 칩 배경 | #F3F3F3 |
| onView1 | 본문 텍스트 (진한 검정) | #0C0C0C |
| onView2 | 보조 텍스트 | rgba(55,55,55,0.8) |
| onView3 | 비활성/플레이스홀더/라벨 | #949494 |
| text-secondary | 페이지 헤더 서브타이틀 | #616161 |
| onViewSuccess / successContainer | 성공·완료 | #078641 / #DBFCE1 |
| onViewWarning | 주의·준비 상태 | #CB8409 |
| onViewInformative | 정보·진행 중 상태 | #376DFA |
| onErrorContainer / errorContainer | 경고 뱃지 | #FB1239 / #FCF1F0 |

## 타이포그래피

폰트 패밀리: **Pretendard JP** (Regular 400 / Medium 500 / Bold 700), 자간은 음수(타이트).

| 토큰 | size/line-height | 용도 (실측 기준) |
|---|---|---|
| Title.level3 | 24/32 Bold | 통계 수치 등 큰 숫자 (자간 −2%) |
| Title.level4 | 20/26 Bold | 페이지 타이틀 (자간 −1.8%) |
| Title.level5 | 18/22 Bold | 상세 페이지 메인 섹션 타이틀 |
| Title.level7 | 14/18 Bold | 카드 타이틀 (List Header) |
| Body.level2 | 14/18 | 기본 본문, 테이블 셀, 인풋, 메뉴, 서브타이틀 |
| Body.level3 | 13/18 | 테이블 헤더, 필터 칩, 스탯 라벨(Medium), 텍스트 버튼 |
| Body.level4 | 12/16 | 캡션, 사이드바 섹션 라벨, 기간 선택 라벨 |
| Body.level6 | 10/12 | 초소형 라벨 |

## radius

| 토큰 | 값 | 용도 |
|---|---|---|
| sm | 4 | 소형 요소 |
| md | 8 | 인풋, 버튼, **컴팩트 정보 카드·통계 바** |
| xl | 16 | **콘텐츠 섹션 카드** (폼 등) |
| xxl | 20 | 대형 컨테이너 |
| full | 10000 | 필/칩, 아바타, 상태 점 |

## 스페이싱 & 실측 치수

| 항목 | 값 |
|---|---|
| 콘텐츠 영역 좌우 패딩 | 40 (`Layout/Content Area/Padding X`) |
| 페이지 헤더 상하 패딩 | 20 (`between-card-lg`) — 템플릿 프레임 전고 실측 86 |
| 카드 간 세로 간격 | 폼 섹션 카드 28 / 상세 요약 카드 20 |
| 2열 레이아웃 거터 | 40 |
| 테이블 블록 내부 간격 | 12 |
| 카드 내부 패딩 | 20 (헤더·본문 각각), 정보 카드 본문은 좌우·하단 12 |
| 폼 필드 간격 | 행 간 세로 16 / 행 내 가로 12 |
| 통계 바 셀 | 패딩 16, 내부 세로 gap 8 |
| 헤더 높이 | 72 |
| 사이드바 폭 | 240 |
| 사이드바 메뉴 아이템 높이 | 44 (섹션 라벨 40) |
| 인풋/버튼/필터 칩/푸터 행 높이 | 38 (검색 TextField 폭 400) |
| 테이블 행 높이 | 44 (헤더·데이터 동일, 더보기 컬럼 폭 52) |
| 뒤로가기 IconButton 박스 | 30×30 (sm) |
