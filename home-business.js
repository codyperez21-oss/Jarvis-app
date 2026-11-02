(function () {
  var root = document.getElementById('bizHome'); if (!root) return;
  var KEY = "cyl6IRJPD86l-1sK30UBZqOEElnBOWReItiGUk68Uck", BASE = "https://affable-chachalaca.pikapod.net/webhook/";
  var UPA = String.fromCharCode(9650), DNA = String.fromCharCode(9660), DASH = String.fromCharCode(8212), MID = String.fromCharCode(183);
  var SHORT = { rvltn: 'RVLTN', replete: 'Replete RX', youtube: 'YouTube', trading: 'Trading', nido: 'Nido' };
  var css = '.hb{margin:0 0 26px;font-family:"DM Sans",system-ui,sans-serif;color:var(--white,#f0ece4)}' +
    '.hb-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '@media (max-width:359px){.hb-grid{grid-template-columns:1fr}}' +
    '.hb-card{position:relative;display:block;min-width:0;text-decoration:none;color:inherit;background:var(--card,#181818);border:1px solid var(--border,#2a2a2a);border-radius:18px;padding:14px}' +
    '.hb-card:active{opacity:.7}' +
    '.hb-n{font:11px "DM Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--gray,#8a8a8a);padding-right:28px;overflow-wrap:anywhere}' +
    '.hb-sub{font-size:12px;color:var(--gray,#8a8a8a);margin-top:2px}' +
    '.hb-v{font-family:"Bebas Neue",sans-serif;font-size:42px;line-height:1.05;margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hb-v.hb-sm{font-size:32px}.hb-v.hb-xs{font-size:26px}' +
    '.hb-l{font-size:12px;color:var(--gray,#8a8a8a)}' +
    '.hb-d{font:11px "DM Mono",monospace;margin-top:4px;min-height:14px}' +
    '.hb-s{border-top:1px solid var(--border,#2a2a2a);margin-top:10px;padding-top:6px}' +
    '.hb-s div{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:13px;padding:3px 0}' +
    '.hb-s span{color:var(--gray,#8a8a8a);min-width:0;overflow-wrap:anywhere}.hb-s b{font-weight:600;white-space:nowrap}.hb-s em{font-style:normal;font-size:10px;margin-left:4px}' +
    '.hb-s small{display:block;font-size:11px;color:var(--gray,#8a8a8a);text-align:right}' +
    '.hb-badge{position:absolute;top:10px;right:10px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--gold,#c9a84c);color:#0a0a0a;font:600 12px "DM Mono",monospace;font-style:normal;display:flex;align-items:center;justify-content:center}' +
    '.hb-up{color:#6fcf8f}.hb-dn{color:#d27a7a}.hb-na{color:var(--gray,#8a8a8a)}' +
    '.hb-tl{background:var(--card,#181818);border:1px solid var(--border,#2a2a2a);border-radius:18px;padding:4px 16px}' +
    '.hb-row{display:flex;gap:10px;align-items:center;min-height:48px;border-top:1px solid var(--border,#2a2a2a);font-size:14px}.hb-row:first-child{border-top:0}' +
    '.hb-row time{font:12px "DM Mono",monospace;color:var(--gray,#8a8a8a);width:92px;flex:none}.hb-row .t{flex:1;min-width:0;overflow-wrap:anywhere}' +
    '.hb-chip{font:10px "DM Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--gold,#c9a84c);flex:none;max-width:84px;text-align:right}' +
    '.hb-empty{color:var(--gray,#8a8a8a);font-size:14px;padding:14px 0}.hb-err{color:#d27a7a;font-size:14px;padding:10px 0}.hb-err button{min-height:44px;margin-left:8px;background:none;border:1px solid var(--border,#2a2a2a);color:var(--white,#f0ece4);border-radius:10px;padding:0 14px;font:inherit}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function get(p) { var c = new AbortController(); setTimeout(function () { c.abort(); }, 12000); return fetch(BASE + p, { headers: { 'X-Api-Key': KEY }, signal: c.signal }).then(function (r) { if (!r.ok) throw new Error('Server returned ' + r.status); return r.json(); }); }
  function num(v) { if (typeof v === 'number') return isFinite(v) ? v : null; if (typeof v === 'string' && v.trim() !== '' && isFinite(Number(v))) return Number(v); return null; }
  function fmt(v, unit) {
    if (v == null || v === '') return DASH;
    var n = num(v); if (n == null) return String(v);
    return unit === 'usd' ? '$' + Math.round(n).toLocaleString('en-US') : (Math.round(n * 100) / 100).toLocaleString('en-US');
  }
  function delta(cur, prev, unit) {
    var c = num(cur), p = num(prev);
    if (c == null) return { cls: 'hb-na', txt: '', arrow: '' };
    if (p == null) return { cls: 'hb-na', txt: 'no prior week', arrow: '' };
    var d = c - p; if (d === 0) return { cls: 'hb-na', txt: 'no change', arrow: '' };
    var amt = unit === 'usd' ? '$' + Math.round(Math.abs(d)).toLocaleString('en-US') : +Math.abs(d).toFixed(2);
    return { cls: d > 0 ? 'hb-up' : 'hb-dn', txt: (d > 0 ? UPA + ' +' : DNA + ' -') + amt + ' vs last week', arrow: d > 0 ? UPA : DNA };
  }
  function card(b) {
    var p = b.primary || {}, d = delta(p.value, p.prev, p.unit);
    var sec = (b.secondary || []).map(function (s) {
      var x = delta(s.value, s.prev, s.unit);
      return '<div><span>' + esc(s.label) + '</span><b>' + esc(fmt(s.value, s.unit)) + (x.arrow ? '<em class="' + x.cls + '">' + x.arrow + '</em>' : '') + (s.note && s.value != null ? '<small>' + esc(s.note) + '</small>' : '') + '</b></div>';
    }).join('');
    return '<a class="hb-card" href="business.html?b=' + encodeURIComponent(b.id) + '">' + (b.open > 0 ? '<i class="hb-badge" title="Open items">' + esc(b.open) + '</i>' : '') +
      '<div class="hb-n">' + esc(b.name) + '</div>' + (b.sub ? '<div class="hb-sub">' + esc(b.sub) + '</div>' : '') +
      '<div class="hb-v' + (fmt(p.value, p.unit).length > 8 ? ' hb-xs' : fmt(p.value, p.unit).length > 5 ? ' hb-sm' : '') + '">' + esc(fmt(p.value, p.unit)) + '</div><div class="hb-l">' + esc(p.label || '') + '</div><div class="hb-d ' + d.cls + '">' + esc(d.txt) + '</div>' +
      (sec ? '<div class="hb-s">' + sec + '</div>' : '') + '</a>';
  }
  function when(at) { var t = new Date(at); return isNaN(t) ? '' : t.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' }); }
  function render(o) {
    var s = o.stats || {};
    window.__queue = s.needs || 0;
    window.updateNeedsStat = function () { var el = document.getElementById('statFocus'); if (el) el.textContent = (window.__oldNeeds || 0) + (window.__queue || 0); };
    window.updateNeedsStat();
    var rev = document.getElementById('statRev'); if (rev) rev.textContent = s.revenue_week == null ? DASH : fmt(s.revenue_week, 'usd');
    var h = '<div class="hb"><div class="section-label">Businesses</div><div class="hb-grid">' + (o.businesses || []).map(card).join('') + '</div>';
    var up = (o.upcoming || []).slice().sort(function (a, b) { return new Date(a.at) - new Date(b.at); });
    h += '<div class="section-label" style="margin-top:26px">Coming up ' + MID + ' 48h</div>';
    if (up.length) h += '<div class="hb-tl">' + up.map(function (e) { return '<div class="hb-row"><time>' + esc(when(e.at)) + '</time><span class="t">' + esc(e.label) + '</span><span class="hb-chip">' + esc(SHORT[e.business] || '') + '</span></div>'; }).join('') + '</div>';
    else h += '<div class="hb-empty">Nothing scheduled in the next 48 hours.' + (o.next_scheduled ? ' Next: ' + esc(o.next_scheduled.label) + ' ' + MID + ' ' + esc(when(o.next_scheduled.at)) : '') + '</div>';
    root.innerHTML = h + '</div>';
  }
  function load() {
    get('business-overview').then(render).catch(function (e) {
      root.innerHTML = '<div class="hb-err">Couldn' + String.fromCharCode(8217) + 't load businesses: ' + esc(e.message) + '<button type="button" id="hbRetry">Retry</button></div>';
      var r = document.getElementById('hbRetry'); if (r) r.addEventListener('click', load);
    });
  }
  var needsStat = document.getElementById('statFocus');
  if (needsStat && needsStat.parentElement) {
    var box = needsStat.parentElement; box.style.cursor = 'pointer'; box.setAttribute('role', 'link'); box.tabIndex = 0;
    var go = function () { if ((window.__queue || 0) > 0) location.href = 'needs.html'; else { var n = document.getElementById('needsYou'); if (n) n.scrollIntoView({ behavior: 'smooth' }); } };
    box.addEventListener('click', go); box.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  }
  load();
})();
