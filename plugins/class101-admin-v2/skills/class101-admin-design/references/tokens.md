# 디자인 토큰 (vibrant-ui)

출처: Figma 변수 정의 (node `14919:102422` 기준 추출). 코드에서는 `@vibrant-ui/components`의
토큰/컴포넌트를 우선 사용하고, 목업(HTML 등)에서는 아래 원시값을 쓴다.

## 컬러

| 토큰 | 값 | 용도 |
|---|---|---|
| `primary` | `#FF5D00` | 브랜드 오렌지, 주 CTA 버튼 |
| `onPrimary` | `#FFFFFF` | primary 위 텍스트 |
| `background` | `#FFFFFF` | 페이지·카드 배경 |
| `surface1` | `rgba(0,0,0,0.03)` | 옅은 면 (테이블 헤더 행 등) |
| `surface2` | `#FFFFFF` | 면 |
| `surface4` | `#C7C7C7` | 진한 면 |
| `onView1` | `#0C0C0C` | 본문·제목 텍스트 |
| `onView2` | `rgba(55,55,55,0.8)` | 준본문 텍스트 |
| `onView3` | `#949494` | 보조·캡션 텍스트 |
| `outline1` | `rgba(0,0,0,0.05)` | 옅은 보더 (헤더 하단 등) |
| `outline2` | `rgba(0,0,0,0.10)` | 카드·필드 보더 |
| `neutralMuted` | `#F3F3F3` | 활성 메뉴 하이라이트, 중립 배경 |
| `successContainer` / `onViewSuccess` | `#DBFCE1` / `#078641` | 성공 배지 |
| `informativeContainer` | `#F3F3FC` | 정보성 배경 |
| `blueVibrant` / `blueContrast` | `#376DFA` / `#1454D1` | 정보성 강조·링크 |
| `inverseSurface` / `onInverseSurface` | `#202020` / `#F3F3F3` | 반전 면(툴팁 등) |
| text-secondary | `#616161` | 보조 텍스트 (Polaris 호환 변수) |

## 타이포그래피

폰트 패밀리: **Pretendard JP**. letter-spacing은 폰트 크기 대비 %.

| 스타일 | 크기/행간 | 굵기 | 자간 | 용도 |
|---|---|---|---|---|
| Display3 | 48/60 | ExtraBold 800 | −3% | (마케팅성 대형 수치) |
| Title.level3 | 24/32 | Bold 700 | −2% | 대시보드 지표 수치 |
| Title.level4 | 20/26 | Bold 700 | −1.8% | 페이지 제목 |
| Title.level5 | 18/22 | Bold 700 | −1.6% | 상세 우측 섹션 제목 |
| Title.level7 | 14/18 | Bold 700 | −1.2% | 카드(List Header) 제목 |
| Body.level1 | 16/20 | Regular 400 | −1.5% | 큰 본문 |
| Body.level2 | 14/18 | Regular/Medium/Bold | −1.2% | 기본 본문, 메뉴, 버튼, 테이블 |
| Body.level3 | 13/18 | Medium 500 | −1% | 폼 라벨, 지표 라벨 |
| Body.level4 | 12/16 | Regular/Medium | −1% | 캡션, 서브타이틀 |

OpenType 피처: `"case" 1, "ss02" 1`.

## Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| `sm` | 4 | 작은 요소 |
| `md` | 8 | 카드, 버튼, 필드 (기본) |
| `xl` | 16 | 큰 컨테이너 |
| `xxl` | 20 | 특대 |
| `full` | 10000 | 필/배지 |

## 레이아웃 토큰

| 토큰 | 값 |
|---|---|
| Viewport Standard Width | 1920 |
| Content Area Padding X | 40 |
| Responsive Gap / between-card-lg | 24 |

## 자주 쓰는 컴포넌트 치수 (실측)

- 버튼: ContainedButton/OutlinedButton md 높이 38 · GhostButton sm (카드 헤더용)
- TextField: size lg 높이 50 (폼) · 검색용 38
- 테이블 행/헤더 44 · List.Item 36 · 사이드바 메뉴 아이템 44
- 버튼 그룹 gap 8 (페이지 헤더) / 16 (카드 헤더 GhostButton)

## 주 사용 vibrant-ui 컴포넌트

`ContainedButton`(kind: primary/tertiary) · `OutlinedButton` · `GhostButton` · `IconButton` ·
`TextField` · `Label`(alignment="top") · `List` / `List.Item` · List Header · `Table` ·
`StatusBadge` · `Avatar` · `Divider` · `Pressable`
문서: https://www.vibrant-design.com/docs
