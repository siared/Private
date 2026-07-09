# class101-admin-v2

CLASS101 어드민 디자인 패턴 스킬의 독립 재작성 버전. Figma 패턴 원본
(`Admin` 파일 node `14919-97072`: "레이아웃 패턴" + "화면 타입별 활용 예시")에서
2026-07 실측 추출했다.

기존 `class101-admin`(v1)과의 차이:

- **자체 완결**: 레퍼런스 3종을 플러그인 안에 직접 소유한다.
  저장소의 `docs/`·`tokens/`나 `sync-plugin-refs.sh` 동기화에 의존하지 않는다.
- **화면 타입 골격 명세**: 목록(Stats Bar + Table)/폼/상세의 완성 골격을
  실측 수치와 함께 별도 파일(`screen-types.md`)로 분리.
- **예외 승인 프로토콜 내장**: 패턴을 벗어나야 하는 경우(특히 상세 페이지)
  어길 규칙·이유·대안을 보고하고 승인받는 절차가 SKILL.md에 포함된다.

구성:

```
skills/design/
  SKILL.md                     # 워크플로 + 핵심 수치 요약 + 예외 프로토콜
  references/layout.md         # 셸(헤더72/사이드바240/패딩40), 폭 패턴 5종, 페이지 헤더, 카드
  references/screen-types.md   # 목록/폼/상세 완성 골격
  references/tokens.md         # 컬러/타이포/radius/레이아웃 토큰, 컴포넌트 치수
```

설치 (마켓플레이스 `class101-design` 등록됨):

```
/plugin install class101-admin-v2@class101-design
```

명시 호출: `/class101-admin-v2:design`
