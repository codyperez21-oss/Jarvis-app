(function () {
  var LS = 'talos_key', HOST = 'affable-chachalaca.pikapod.net';
  var onLogin = /login\.html$/.test(location.pathname);
  function get() { try { return localStorage.getItem(LS) || ''; } catch (e) { return ''; } }
  function set(k) { try { localStorage.setItem(LS, k); return true; } catch (e) { return false; } }
  function clear() { try { localStorage.removeItem(LS); } catch (e) {} }
  function toLogin() {
    if (onLogin) return;
    var n = (location.pathname.split('/').pop() || 'index.html') + location.search;
    location.replace('login.html?next=' + encodeURIComponent(n));
  }
  window.TalosAuth = {
    key: get, set: set, clear: clear,
    lock: function () { clear(); location.replace('login.html'); }
  };
  if (!onLogin && !get()) toLogin();
  var orig = window.fetch;
  window.fetch = function (input) {
    return orig.apply(this, arguments).then(function (r) {
      try {
        var u = typeof input === 'string' ? input : (input && input.url) || '';
        if ((r.status === 401 || r.status === 403) && u.indexOf(HOST) > -1 && u.indexOf('auth-login') < 0) { var now = Date.now(), last = 0; try { last = +sessionStorage.getItem('talos_bounce') || 0; sessionStorage.setItem('talos_bounce', String(now)); } catch (e2) {} if (now - last > 20000) { clear(); toLogin(); } }
      } catch (e) {}
      return r;
    });
  };
})();
