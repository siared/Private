/**
 * Soft gate + visit log for Meeting Flow mocks/share.
 * Same token as Ops Flow / proposal: localStorage `opsFlowUser.v1`
 * Any /mocks or /share page reuses it — login once, stay logged in.
 */
(function () {
  const CONFIG = {
    allowedDomain: '101.inc',
    storageKey: 'opsFlowUser.v1',
    api: 'https://mkt-n8n.class101.net/webhook/ops-flow-visit',
  };

  function normalizeEmail(v) {
    return String(v || '').trim().toLowerCase();
  }
  function isAllowedEmail(email) {
    return /^[^\s@]+@101\.inc$/.test(email);
  }
  function getSavedEmail() {
    try {
      return normalizeEmail(localStorage.getItem(CONFIG.storageKey) || '');
    } catch {
      return '';
    }
  }
  function saveEmail(email) {
    try {
      localStorage.setItem(CONFIG.storageKey, email);
    } catch {}
  }
  function clearEmail() {
    try {
      localStorage.removeItem(CONFIG.storageKey);
    } catch {}
  }

  function pageStage() {
    const parts = location.pathname.split('/').filter(Boolean);
    let leaf = parts[parts.length - 1] || 'index';
    leaf = leaf.replace(/\.html$/i, '');
    if (!leaf || leaf === 'mocks' || leaf === 'share') leaf = 'hub';
    const area = parts.includes('share') ? 'share' : 'mocks';
    return area + ':' + leaf;
  }

  async function logVisit(email, event) {
    const payload = {
      email,
      event,
      ts: new Date().toISOString(),
      stage: pageStage(),
      href: location.href,
      userAgent: navigator.userAgent,
      path: location.pathname,
    };
    try {
      await fetch(CONFIG.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
        keepalive: true,
      });
    } catch (e) {
      console.warn('visit log failed', e);
    }
  }

  function ensureStyles() {
    if (document.getElementById('mfAuthCss')) return;
    const s = document.createElement('style');
    s.id = 'mfAuthCss';
    s.textContent = `
body.mf-locked{overflow:hidden}
body.mf-locked > *:not(#mfAuthGate){visibility:hidden !important;pointer-events:none !important}
#mfAuthGate{
  position:fixed;inset:0;z-index:99999;display:none;
  align-items:center;justify-content:center;padding:20px;
  background:rgba(12,12,12,.62);
  font-family:'Pretendard JP',Pretendard,-apple-system,sans-serif;
}
body.mf-locked #mfAuthGate{display:flex}
#mfAuthGate .card{
  width:min(400px,100%);background:#fff;border-radius:20px;padding:22px 20px 18px;
  box-shadow:0 20px 40px rgba(0,0,0,.28);
}
#mfAuthGate .eyebrow{font-size:11px;font-weight:800;color:#ff5d00;letter-spacing:.06em;margin-bottom:6px}
#mfAuthGate h2{margin:0 0 8px;font-size:20px;letter-spacing:-.3px;line-height:1.3}
#mfAuthGate p{margin:0 0 14px;font-size:13.5px;color:#747474;line-height:1.5}
#mfAuthGate input{
  width:100%;box-sizing:border-box;border:1px solid #e5e5e5;border-radius:12px;
  padding:12px 14px;font:inherit;font-size:14px;margin-bottom:8px;
}
#mfAuthGate button[type=submit]{
  width:100%;border:0;background:#ff5d00;color:#fff;border-radius:12px;
  padding:12px;font:750 14px Pretendard,sans-serif;cursor:pointer;
}
#mfAuthGate .err{display:none;font-size:12.5px;color:#c62828;margin:0 0 8px}
#mfAuthGate .err.show{display:block}
#mfAuthChip{
  position:fixed;left:12px;bottom:12px;z-index:95;
  display:none;align-items:center;gap:8px;
  background:#171717;color:#fff;border-radius:99px;padding:6px 8px 6px 12px;
  font:650 11.5px Pretendard,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25);
}
#mfAuthChip.on{display:flex}
#mfAuthChip button{
  border:0;background:#333;color:#fff;border-radius:99px;padding:4px 8px;
  font:650 11px Pretendard,sans-serif;cursor:pointer;
}
`;
    document.head.appendChild(s);
  }

  function mountGate() {
    ensureStyles();
    if (!document.getElementById('mfAuthGate')) {
      const gate = document.createElement('div');
      gate.id = 'mfAuthGate';
      gate.innerHTML = `
        <form class="card" id="mfAuthForm">
          <div class="eyebrow">CLASS101 · Meeting Flow</div>
          <h2>@101.inc 이메일로<br/>들어와 주세요</h2>
          <p>Ops Flow / 제안 페이지와 같은 로그인입니다. 한 번 입력하면 다른 mock 화면에서도 유지됩니다.</p>
          <div class="err" id="mfAuthErr">@101.inc 주소만 사용할 수 있어요.</div>
          <input id="mfAuthEmail" type="email" placeholder="name@101.inc" autocomplete="username" required/>
          <button type="submit">들어가기</button>
        </form>`;
      document.body.appendChild(gate);
      document.getElementById('mfAuthForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = normalizeEmail(document.getElementById('mfAuthEmail').value);
        const err = document.getElementById('mfAuthErr');
        if (!isAllowedEmail(email)) {
          err.classList.add('show');
          return;
        }
        err.classList.remove('show');
        unlock(email, { event: 'login' });
      });
    }
    if (!document.getElementById('mfAuthChip')) {
      const chip = document.createElement('div');
      chip.id = 'mfAuthChip';
      chip.innerHTML = `<span id="mfAuthUser"></span><button type="button" id="mfAuthLogout">나가기</button>`;
      document.body.appendChild(chip);
      document.getElementById('mfAuthLogout').addEventListener('click', () => {
        const email = getSavedEmail();
        if (email) logVisit(email, 'logout');
        lock();
      });
    }
  }

  function unlock(email, { event }) {
    document.body.classList.remove('mf-locked');
    saveEmail(email);
    const chip = document.getElementById('mfAuthChip');
    const user = document.getElementById('mfAuthUser');
    if (chip && user) {
      user.textContent = email;
      chip.classList.add('on');
    }
    try {
      if (!localStorage.getItem('mockFeedback.author.v1')) {
        localStorage.setItem('mockFeedback.author.v1', email.split('@')[0]);
      }
    } catch {}
    logVisit(email, event);
    document.dispatchEvent(new CustomEvent('mf-auth', { detail: { email, event } }));
  }

  function lock() {
    clearEmail();
    document.body.classList.add('mf-locked');
    const chip = document.getElementById('mfAuthChip');
    if (chip) chip.classList.remove('on');
    const input = document.getElementById('mfAuthEmail');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }
  }

  function boot() {
    mountGate();
    const saved = getSavedEmail();
    if (saved && isAllowedEmail(saved)) {
      unlock(saved, { event: 'return' });
    } else {
      document.body.classList.add('mf-locked');
      const input = document.getElementById('mfAuthEmail');
      if (input) setTimeout(() => input.focus(), 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.MockAuth = {
    getEmail: getSavedEmail,
    unlock,
    lock,
    logVisit,
  };
})();
