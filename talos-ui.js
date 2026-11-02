const API_KEY = "cyl6IRJPD86l-1sK30UBZqOEElnBOWReItiGUk68Uck";
const BASE = "https://affable-chachalaca.pikapod.net/webhook/";
const BOT = { pheme:'Pheme', endeavour:'Endeavour', apollo:'Apollo', hermes:'Hermes' };
const botName = s => BOT[s] || s;
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
async function api(path, opts) {
  const o = Object.assign({ headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' } }, opts || {});
  const r = await fetch(BASE + path, o);
  const t = await r.text(); let d = {}; try { d = t ? JSON.parse(t) : {}; } catch (e) {}
  if (!r.ok || d.ok === false) throw new Error(d.error || d.message || ('Server returned ' + r.status));
  return d;
}
function chip(s) { return '<span class="chip"><i>' + esc(botName(s).charAt(0)) + '</i>' + esc(botName(s)) + '</span>'; }
function fmtDelta(cur, prev) {
  if (typeof cur !== 'number' || typeof prev !== 'number') return '';
  const d = cur - prev; if (d === 0) return 'no change vs last week';
  const pct = prev !== 0 ? ' (' + (d > 0 ? '+' : '') + Math.round(d / Math.abs(prev) * 100) + '%)' : '';
  return (d > 0 ? '▲ +' : '▼ ') + +d.toFixed(2) + pct + ' vs last week';
}
function spark(points, w, h) {
  const p = (points || []).slice().sort((a, b) => a.date < b.date ? -1 : 1), v = p.map(x => Number(x.value)).filter(x => isFinite(x));
  if (!v.length) return '';
  const mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), rg = (mx - mn) || 1;
  const pts = v.map((y, i) => ((v.length === 1 ? w / 2 : 2 + (i / (v.length - 1)) * (w - 4))).toFixed(1) + ',' + ((h - 4) - ((y - mn) / rg) * (h - 8)).toFixed(1)).join(' ');
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" class="spark"><polyline points="' + pts + '" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
}
function inline(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>'); }
function md(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n'); let out = '', list = false, para = [];
  const flush = () => { if (para.length) { out += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; } };
  const closeList = () => { if (list) { out += '</ul>'; list = false; } };
  for (const raw of lines) {
    const l = raw.trimEnd();
    if (!l.trim()) { flush(); closeList(); continue; }
    const h = l.match(/^#{1,4}\s+(.*)$/); if (h) { flush(); closeList(); out += '<h4>' + inline(h[1]) + '</h4>'; continue; }
    const b = l.match(/^\s*[-*•]\s+(.*)$/); if (b) { flush(); if (!list) { out += '<ul>'; list = true; } out += '<li>' + inline(b[1]) + '</li>'; continue; }
    closeList(); para.push(l);
  }
  flush(); closeList(); return out;
}
function fmtWeek(iso) { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); }
function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? esc(u) : ''; }
function headlineOf(b) { const k = Object.keys(b.metrics || {}); const h = b.headline && (b.metrics || {})[b.headline] != null ? b.headline : k[0]; return h; }
function tileHtml(label, val, prev) { const d = fmtDelta(val, prev); return '<div class="tile"><div class="tile-v">' + esc(val) + '</div><div class="tile-l">' + esc(label) + '</div>' + (d ? '<div class="tile-d">' + esc(d) + '</div>' : '') + '</div>'; }
function seriesHtml(ss) { return (ss || []).map(s => { const p = (s.points || []); if (!p.length) return ''; const last = p[p.length - 1]; return '<div class="srs"><div class="srs-h"><span>' + esc(s.label) + '</span><b>' + esc(last.value) + '</b></div>' + spark(p, 200, 44) + '<div class="srs-f"><span>' + esc(p[0].date) + '</span><span>' + esc(last.date) + '</span></div></div>'; }).join(''); }
