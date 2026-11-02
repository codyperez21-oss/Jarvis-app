(function () {
  var root = document.getElementById('botStrip'); if (!root) return;
  var KEY = "cyl6IRJPD86l-1sK30UBZqOEElnBOWReItiGUk68Uck", BASE = "https://affable-chachalaca.pikapod.net/webhook/";
  var NAMES = { pheme: 'Pheme', endeavour: 'Endeavour', apollo: 'Apollo', hermes: 'Hermes' };
  var css = '.bs{margin:0 0 22px;font-family:"DM Sans",system-ui,sans-serif;color:#f0ece4}' +
    '.bs h2{font:11px "DM Mono",monospace;letter-spacing:.15em;text-transform:uppercase;color:#9a968e;font-weight:400;margin:0 0 10px}' +
    '.bs-card{background:#161616;border:1px solid #2a2a2a;border-radius:18px;padding:14px 16px;margin-bottom:12px}' +
    '.bs-top{display:flex;align-items:center;gap:10px}.bs-top b{flex:1;font-size:17px}' +
    '.bs-go{min-height:44px;display:inline-flex;align-items:center;padding:0 16px;background:#9b6bd6;color:#fff;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px}' +
    '.bs-row{display:flex;align-items:center;gap:10px;min-height:52px;border-top:1px solid #2a2a2a;text-decoration:none;color:#f0ece4;font-size:15px}' +
    '.bs-row:first-of-type{margin-top:10px}.bs-row span.t{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.bs-c{width:24px;height:24px;border-radius:50%;background:#1e1e1e;border:1px solid #2a2a2a;font:600 11px "DM Mono",monospace;display:inline-flex;align-items:center;justify-content:center;flex:none;color:#f0ece4}' +
    '.bs-ok{color:#9a968e;font-size:15px;padding:6px 0}' +
    '.bs-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
    '.bs-n{background:#1e1e1e;border:1px solid #2a2a2a;border-radius:12px;padding:12px;min-width:0}' +
    '.bs-n b{display:block;font-size:24px;line-height:1.1;overflow-wrap:anywhere}.bs-n small{display:block;font-size:12px;color:#9a968e;margin-top:3px;overflow-wrap:anywhere}.bs-n em{display:block;font:normal 11px "DM Mono",monospace;color:#9a968e;margin-top:5px}' +
    '.bs-up{display:flex;gap:10px;align-items:center;min-height:44px;font-size:14px;border-top:1px solid #2a2a2a}.bs-up:first-of-type{border-top:0}.bs-up time{font:12px "DM Mono",monospace;color:#9a968e;width:84px;flex:none}.bs-up span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function get(p) { var c = new AbortController(); setTimeout(function () { c.abort(); }, 10000); return fetch(BASE + p, { headers: { 'X-Api-Key': KEY }, signal: c.signal }).then(function (r) { return r.json(); }); }
  function delta(c, p) { if (typeof c !== 'number' || typeof p !== 'number') return ''; var d = c - p; return d === 0 ? 'no change' : (d > 0 ? '▲ +' : '▼ ') + (+d.toFixed(2)) + ' vs last wk'; }
  function render(n, u) {
    var items = (n.items || []).slice().map(function (i) { return { src: i.source, t: i.text }; });
    (n.batches || []).forEach(function (b) { items.push({ src: 'apollo', t: 'Approve ' + b.count + ' outreach emails' }); });
    var total = items.length, h = '<div class="bs"><h2>Bots</h2><div class="bs-card"><div class="bs-top"><b>' + (total ? total + (total === 1 ? ' thing needs you' : ' things need you') : 'You’re all caught up') + '</b>' + (total ? '<a class="bs-go" href="needs.html">Open</a>' : '') + '</div>';
    if (!total) h += '<div class="bs-ok">' + (n.next_scheduled ? 'Next: ' + esc(n.next_scheduled.label) + ' · ' + esc(NAMES[n.next_scheduled.source] || '') : 'Nothing is scheduled yet.') + '</div>';
    items.slice(0, 3).forEach(function (i) { h += '<a class="bs-row" href="needs.html"><i class="bs-c" style="font-style:normal">' + esc((NAMES[i.src] || '?').charAt(0)) + '</i><span class="t">' + esc(i.t) + '</span></a>'; });
    h += '</div>';
    var bots = (u.bots || []).filter(function (b) { return b.metrics && Object.keys(b.metrics).length; });
    if (bots.length) {
      h += '<div class="bs-card"><h2 style="margin-bottom:10px">Numbers</h2><div class="bs-grid">' + bots.slice(0, 4).map(function (b) {
        var k = b.headline && b.metrics[b.headline] != null ? b.headline : Object.keys(b.metrics)[0], d = delta(b.metrics[k], (b.prev_metrics || {})[k]);
        return '<a class="bs-n" href="numbers.html" style="text-decoration:none;color:inherit"><b>' + esc(b.metrics[k]) + '</b><small>' + esc(NAMES[b.source] || b.source) + ' · ' + esc(k) + '</small>' + (d ? '<em>' + esc(d) + '</em>' : '') + '</a>';
      }).join('') + '</div></div>';
    }
    var up = (n.upcoming || []).slice(0, 5);
    if (up.length) h += '<div class="bs-card"><h2 style="margin-bottom:6px">Coming up · 48h</h2>' + up.map(function (e) { return '<div class="bs-up"><time>' + esc(new Date(e.at).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })) + '</time><span>' + esc(e.label) + ' · ' + esc(NAMES[e.source] || '') + '</span></div>'; }).join('') + '</div>';
    root.innerHTML = h + '</div>';
  }
  Promise.all([get('needs-overview'), get('numbers-overview').catch(function () { return { bots: [] }; })]).then(function (r) { render(r[0], r[1]); }).catch(function () { root.innerHTML = ''; });
})();
