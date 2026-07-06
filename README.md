# Private — 어드민 웹페이지 디자인

회사 어드민 웹페이지의 디자인 작업 저장소입니다.

## 목적
- 집(서브 기기)과 회사(메인 기기) 양쪽에서 이어서 작업하기 위한 저장소
- Claude Code의 원격(클라우드) 작업 및 `git pull` 기반 동기화에 사용

## 작업 방식
- 집에서 작업 → `commit` → `push`
- 회사에서 `git pull` 로 이어서 작업 (또는 원격 작업으로 진행)

## 구조
- `docs/` — 디자인 문서 (layout-patterns.md가 핵심)
- `tokens/` — 컬러/타이포/스페이싱 등 디자인 토큰
- `images/` — 원본 Figma 링크·노드 ID
- `projects/class101/` — 클래스101 하위 프로젝트 산출물
- `plugins/` + `.claude-plugin/` — Claude Code 플러그인 마켓플레이스 (아래 참고)

## 플러그인으로 다른 리포에서 쓰기

이 저장소는 Claude Code 플러그인 마켓플레이스(`class101-design`)이며,
어드민 디자인 스킬이 담긴 `class101-admin` 플러그인을 배포한다.

**작업 리포에 팀 단위로 자동 적용** — 해당 리포의 `.claude/settings.json`에 추가:

```json
{
  "extraKnownMarketplaces": {
    "class101-design": {
      "source": { "source": "github", "repo": "siared/Private" }
    }
  },
  "enabledPlugins": {
    "class101-admin@class101-design": true
  }
}
```

폴더를 신뢰(trust)하는 시점에 플러그인 설치가 자동 제안되고, 이후 세션마다
스킬이 자동 로드된다. 명시 호출은 `/class101-admin:design`.

**개인 기기에 전역 설치** (로컬 CLI/데스크톱):

```
/plugin marketplace add siared/Private
/plugin install class101-admin@class101-design
```

※ 비공개 저장소이므로 설치하는 쪽에 이 리포에 대한 git 접근 권한이 필요하다.
※ `docs/`·`tokens/` 수정 시 `scripts/sync-plugin-refs.sh`를 실행해 플러그인에
번들된 사본을 동기화하고 함께 커밋한다.
