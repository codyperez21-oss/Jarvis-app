(function () {
  var KEY = "cyl6IRJPD86l-1sK30UBZqOEElnBOWReItiGUk68Uck", BASE = "https://affable-chachalaca.pikapod.net/webhook/";
  var css = '#talosNav{position:fixed;left:0;right:0;bottom:0;z-index:9000}' +
    '#talosNav .tn-bar{display:flex;border-top:1px solid #2a2a2a;background:#0e0e0e;padding:6px 4px calc(10px + env(safe-area-inset-bottom,0px))}' +
    '#talosNav .tn-it{flex:1;min-height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-decoration:none;background:none;border:0;cursor:pointer;position:relative;font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}' +
    '#talosNav .tn-dot{width:12px;height:12px;border-radius:50%;background:#9a968e;display:block}' +
    '#talosNav .tn-on .tn-dot{background:#9b6bd6}' +
    '#talosNav .tn-lb{font-family:"DM Mono",monospace;font-size:11px;color:#9a968e}' +
    '#talosNav .tn-on .tn-lb{color:#9b6bd6}' +
    '#talosNav .tn-bd{position:absolute;top:0;left:calc(50% + 6px);min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#9b6bd6;color:#fff;font:600 11px "DM Mono",monospace;display:none;align-items:center;justify-content:center}' +
    '#talosNav .tn-bd.show{display:flex}' +
    '#talosNav .tn-bg{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;z-index:-1}' +
    '#talosNav .tn-bg.show{display:block}' +
    '#talosNav .tn-sh{position:absolute;left:0;right:0;bottom:100%;background:#121212;border-top:1px solid #2a2a2a;border-radius:18px 18px 0 0;padding:8px 16px;display:none}' +
    '#talosNav .tn-sh.show{display:block}' +
    '#talosNav .tn-sh a{display:flex;align-items:center;min-height:52px;color:#f0ece4;text-decoration:none;font:17px "DM Sans",system-ui,sans-serif;border-bottom:1px solid #2a2a2a}' +
    '#talosNav .tn-sh a:last-child{border-bottom:0}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var more = ['clients.html', 'clinics.html', 'trading.html', 'nido.html', 'recovery-watch.html'];
  var items = [['index.html', 'Home'], ['needs.html', 'Needs you'], ['numbers.html', 'Numbers'], ['weekly.html', 'Review']];
  var on = more.indexOf(p) >= 0 ? 'more' : (p === '' ? 'index.html' : p);
  var h = '<div class="tn-bg" id="tnBg"></div><div class="tn-sh" id="tnSh"><a href="clients.html">Clients</a><a href="clinics.html">Clinics</a><a href="trading.html">Trading</a><a href="nido.html">Nido</a></div><nav class="tn-bar">';
  items.forEach(function (x) { h += '<a class="tn-it' + (on === x[0] ? ' tn-on' : '') + '" href="' + x[0] + '"><i class="tn-dot"></i><span class="tn-lb">' + x[1] + '</span>' + (x[0] === 'needs.html' ? '<b class="tn-bd" id="tnBd"></b>' : '') + '</a>'; });
  h += '<button type="button" class="tn-it' + (on === 'more' ? ' tn-on' : '') + '" id="tnMore"><i class="tn-dot"></i><span class="tn-lb">More</span></button></nav>';
  var mount = document.getElementById('talosNav'); if (!mount) { mount = document.createElement('div'); mount.id = 'talosNav'; document.body.appendChild(mount); }
  mount.innerHTML = h;
  var sh = document.getElementById('tnSh'), bg = document.getElementById('tnBg');
  function tog(v) { sh.classList.toggle('show', v); bg.classList.toggle('show', v); }
  document.getElementById('tnMore').addEventListener('click', function () { tog(!sh.classList.contains('show')); });
  bg.addEventListener('click', function () { tog(false); });
  window.setNavBadge = function (n) { var b = document.getElementById('tnBd'); if (!b) return; b.textContent = n; b.classList.toggle('show', n > 0); };
  if (p !== 'needs.html') {
    var c = new AbortController(); setTimeout(function () { c.abort(); }, 8000);
    fetch(BASE + 'needs-overview', { headers: { 'X-Api-Key': KEY }, signal: c.signal }).then(function (r) { return r.json(); }).then(function (d) {
      var n = (d.items || []).length + (d.batches || []).length; window.__needsCount = n; window.setNavBadge(n);
    }).catch(function () {});
  }
})();
