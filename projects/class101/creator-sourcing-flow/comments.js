/**
 * Figma-like feedback pins for Meeting Flow mocks.
 * Shared via n8n webhook; falls back to localStorage if remote fails.
 */
(function () {
  const API = 'https://mkt-n8n.class101.net/webhook/ops-flow-mock-comment';
  const LS_AUTHOR = 'mockFeedback.author.v1';
  const LS_CACHE = 'mockFeedback.cache.v1';

  function pageId() {
    // Works for Vercel (/mocks/mail) and local file (mail.html)
    const parts = location.pathname.split('/').filter(Boolean);
    let leaf = parts[parts.length - 1] || 'index';
    leaf = leaf.replace(/\.html$/i, '');
    if (!leaf || leaf === 'mocks') leaf = 'index';
    return 'mock:' + leaf;
  }

  function loadCache() {
    try {
      return JSON.parse(localStorage.getItem(LS_CACHE) || '{}');
    } catch {
      return {};
    }
  }

  function saveCache(all) {
    try {
      localStorage.setItem(LS_CACHE, JSON.stringify(all));
    } catch {}
  }

  function getAuthor() {
    try {
      const saved = localStorage.getItem(LS_AUTHOR);
      if (saved) return saved;
      if (window.MockAuth && MockAuth.getEmail) {
        const e = MockAuth.getEmail();
        if (e) return e.split('@')[0];
      }
      return '';
    } catch {
      return '';
    }
  }

  function setAuthor(name) {
    try {
      localStorage.setItem(LS_AUTHOR, name);
    } catch {}
  }

  async function api(payload) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  function ensureStyles() {
    if (document.getElementById('mf-comment-css')) return;
    const s = document.createElement('style');
    s.id = 'mf-comment-css';
    s.textContent = `
.mf-pin-wrap{position:relative}
.mf-pin{
  position:absolute; top:8px; right:8px; z-index:5;
  width:28px; height:28px; border-radius:99px; border:0; cursor:pointer;
  background:#ff5d00; color:#fff; font:700 13px/1 Pretendard,sans-serif;
  box-shadow:0 4px 12px rgba(255,93,0,.35);
}
.mf-pin.has{background:#376dfa; box-shadow:0 4px 12px rgba(55,109,250,.35)}
.mf-pin:hover{transform:scale(1.06)}
.mf-dock{
  position:fixed; right:16px; bottom:16px; z-index:90;
  width:min(360px,calc(100vw - 24px));
  background:#fff; border:1px solid #e5e5e5; border-radius:16px;
  box-shadow:0 16px 40px rgba(0,0,0,.18); overflow:hidden;
  font-family:'Pretendard JP',Pretendard,-apple-system,sans-serif;
  display:none; flex-direction:column; max-height:min(70vh,560px);
}
.mf-dock.open{display:flex}
.mf-dock-hd{
  display:flex; align-items:center; gap:8px; padding:12px 14px;
  border-bottom:1px solid #e5e5e5; background:#fcf5f1;
}
.mf-dock-hd b{font-size:13px; flex:1}
.mf-dock-hd button{
  border:0; background:#f3f3f3; border-radius:8px; padding:4px 8px;
  font:650 12px Pretendard,sans-serif; cursor:pointer;
}
.mf-dock-meta{padding:8px 14px 0; font-size:11.5px; color:#747474}
.mf-dock-list{overflow:auto; padding:10px 14px; flex:1; display:flex; flex-direction:column; gap:8px}
.mf-c{
  background:#fafafa; border:1px solid #eee; border-radius:12px; padding:10px 12px;
}
.mf-c .a{font-size:11.5px; font-weight:700; color:#ff5d00}
.mf-c .t{font-size:13px; line-height:1.45; margin-top:4px; white-space:pre-wrap}
.mf-c .d{font-size:11px; color:#999; margin-top:4px}
.mf-empty{font-size:12.5px; color:#747474; padding:8px 0}
.mf-form{border-top:1px solid #e5e5e5; padding:12px 14px; display:flex; flex-direction:column; gap:8px}
.mf-form input,.mf-form textarea{
  width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:8px 10px;
  font:inherit; font-size:13px; box-sizing:border-box;
}
.mf-form textarea{min-height:72px; resize:vertical}
.mf-form .row{display:flex; gap:8px}
.mf-form .row button{
  flex:1; border:0; background:#ff5d00; color:#fff; border-radius:10px;
  padding:10px; font:750 13px Pretendard,sans-serif; cursor:pointer;
}
.mf-form .row button.ghost{background:#f3f3f3; color:#171717}
.mf-fab{
  position:fixed; right:16px; bottom:16px; z-index:89;
  border:0; border-radius:99px; padding:12px 16px; cursor:pointer;
  background:#171717; color:#fff; font:700 13px Pretendard,sans-serif;
  box-shadow:0 8px 24px rgba(0,0,0,.25);
}
.mf-fab .n{
  display:inline-grid; place-items:center; min-width:18px; height:18px;
  margin-left:6px; padding:0 5px; border-radius:99px; background:#ff5d00; font-size:11px;
}
.mf-status{font-size:11px; color:#747474; min-height:14px}
.mf-status.ok{color:#078641}
.mf-status.err{color:#c62828}
.mf-design{
  display:inline-flex; align-items:center; gap:4px;
  font-size:11px; font-weight:750; padding:3px 8px; border-radius:6px;
  background:#f3f3fc; color:#376dfa; border:1px solid #c9d4ff;
}
`;
    document.head.appendChild(s);
  }

  let comments = [];
  let activeAnchor = 'general';
  let remoteOk = false;

  function forAnchor(anchor) {
    return comments.filter((c) => c.anchor === anchor);
  }

  function renderList() {
    const list = document.getElementById('mf-list');
    if (!list) return;
    const rows = forAnchor(activeAnchor);
    if (!rows.length) {
      list.innerHTML = '<div class="mf-empty">아직 의견 없음 · 아래에 남기면 팀 전체가 볼 수 있어요.</div>';
      return;
    }
    list.innerHTML = rows
      .map((c) => {
        const d = new Date(c.ts || Date.now());
        const ds = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        return `<div class="mf-c"><div class="a">${escapeHtml(c.author || '익명')}</div><div class="t">${escapeHtml(c.text)}</div><div class="d">${ds}</div></div>`;
      })
      .join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updatePins() {
    document.querySelectorAll('[data-comment-anchor]').forEach((el) => {
      const a = el.getAttribute('data-comment-anchor');
      const n = forAnchor(a).length;
      let btn = el.querySelector(':scope > .mf-pin');
      if (!btn) {
        if (getComputedStyle(el).position === 'static') el.classList.add('mf-pin-wrap');
        if (!el.style.position && getComputedStyle(el).position === 'static') {
          el.style.position = 'relative';
        }
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mf-pin';
        btn.title = '의견 달기';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openDock(a);
        });
        el.appendChild(btn);
      }
      btn.textContent = n ? String(n) : '+';
      btn.classList.toggle('has', n > 0);
    });
    const fabN = document.querySelector('#mf-fab .n');
    if (fabN) fabN.textContent = String(comments.length);
  }

  function openDock(anchor) {
    activeAnchor = anchor || 'general';
    const dock = document.getElementById('mf-dock');
    const meta = document.getElementById('mf-meta');
    dock.classList.add('open');
    meta.textContent = `영역 · ${activeAnchor} · ${remoteOk ? '팀 공유 중' : '이 브라우저에 저장 (공유 연결 대기)'}`;
    document.getElementById('mf-author').value = getAuthor();
    renderList();
    document.getElementById('mf-text').focus();
  }

  function closeDock() {
    document.getElementById('mf-dock').classList.remove('open');
  }

  async function refresh() {
    const page = pageId();
    const cache = loadCache();
    comments = Array.isArray(cache[page]) ? cache[page] : [];
    updatePins();
    renderList();
    try {
      const data = await api({ action: 'list', page });
      if (data && data.ok && Array.isArray(data.comments)) {
        comments = data.comments;
        remoteOk = true;
        cache[page] = comments;
        saveCache(cache);
        updatePins();
        renderList();
        setStatus('팀 의견 동기화됨', 'ok');
      }
    } catch (e) {
      remoteOk = false;
      setStatus('오프라인 · 로컬만 저장됩니다', 'err');
    }
  }

  function setStatus(msg, cls) {
    const el = document.getElementById('mf-status');
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'mf-status' + (cls ? ' ' + cls : '');
  }

  async function submit() {
    const author = (document.getElementById('mf-author').value || '').trim() || '익명';
    const text = (document.getElementById('mf-text').value || '').trim();
    if (!text) {
      setStatus('의견을 입력해 주세요', 'err');
      return;
    }
    setAuthor(author);
    const page = pageId();
    const local = {
      id: 'local-' + Date.now(),
      page,
      anchor: activeAnchor,
      author,
      text,
      ts: Date.now(),
    };
    comments = [local, ...comments];
    const cache = loadCache();
    cache[page] = comments;
    saveCache(cache);
    document.getElementById('mf-text').value = '';
    updatePins();
    renderList();

    try {
      const data = await api({
        action: 'add',
        page,
        anchor: activeAnchor,
        author,
        text,
      });
      if (data && data.ok && Array.isArray(data.comments)) {
        comments = data.comments;
        remoteOk = true;
        cache[page] = comments;
        saveCache(cache);
        updatePins();
        renderList();
        setStatus('공유됨 · 다른 사람도 볼 수 있어요', 'ok');
      } else {
        setStatus('로컬 저장됨 (서버 응답 없음)', 'err');
      }
    } catch {
      setStatus('로컬 저장됨 · 공유 서버 연결 실패', 'err');
    }
  }

  function mountUI() {
    ensureStyles();
    if (!document.getElementById('mf-fab')) {
      const fab = document.createElement('button');
      fab.id = 'mf-fab';
      fab.type = 'button';
      fab.className = 'mf-fab';
      fab.innerHTML = '의견 <span class="n">0</span>';
      fab.addEventListener('click', () => openDock('general'));
      document.body.appendChild(fab);
    }
    if (!document.getElementById('mf-dock')) {
      const dock = document.createElement('div');
      dock.id = 'mf-dock';
      dock.className = 'mf-dock';
      dock.innerHTML = `
        <div class="mf-dock-hd">
          <b>💬 의견 · 어떻게 바꾸면 좋을까</b>
          <button type="button" id="mf-close">닫기</button>
        </div>
        <div class="mf-dock-meta" id="mf-meta"></div>
        <div class="mf-dock-list" id="mf-list"></div>
        <div class="mf-form">
          <input id="mf-author" type="text" placeholder="이름 (예: 지원, SAL, 디자인)" maxlength="40"/>
          <textarea id="mf-text" placeholder="이 영역이 어떻게 바뀌면 좋을지 적어 주세요"></textarea>
          <div class="mf-status" id="mf-status"></div>
          <div class="row">
            <button type="button" class="ghost" id="mf-cancel">취소</button>
            <button type="button" id="mf-send">남기기</button>
          </div>
        </div>`;
      document.body.appendChild(dock);
      document.getElementById('mf-close').addEventListener('click', closeDock);
      document.getElementById('mf-cancel').addEventListener('click', closeDock);
      document.getElementById('mf-send').addEventListener('click', submit);
    }
  }

  function boot() {
    mountUI();
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.MockFeedback = { open: openDock, refresh };
})();
