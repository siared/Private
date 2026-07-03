# 레퍼런스 시안

시각 스타일의 원본(source of truth)은 Figma 파일이다:

- 파일: `Admin` — https://www.figma.com/design/aPrJ7mLNIjsFQHXE6G3Wii/Admin?node-id=14919-97072
- 접근 계정: ever@101.inc (CLASS101 조직, Figma MCP 연결 필요)
- 주요 노드:
  - `14919:97074` 레이아웃 패턴 5종 (full-width / max-1312 / max-720 / 2열 8:4 / 2열 4:8)
  - `14919:112129` 활용 예시 — 테이블 목록 (크리에이터 소싱 관리)
  - `14919:112213` 활용 예시 — 입력 폼 (소싱 대상 추가)
  - `14919:112311` 활용 예시 — 상세 페이지

※ 원격 실행 환경의 네트워크 정책이 figma.com 직접 다운로드를 막아 PNG를 리포에
커밋하지 못했다. 수치·구조·토큰은 `docs/layout-patterns.md`와 `tokens/tokens.md`에
추출돼 있으므로 일반 작업에는 이미지 없이도 충분하다. 시각 대조가 필요하면
Figma MCP의 get_screenshot으로 위 노드를 조회한다. (로컬에서 PNG를 export해
이 폴더에 커밋해두면 네트워크 제약 없이 참고 가능)
