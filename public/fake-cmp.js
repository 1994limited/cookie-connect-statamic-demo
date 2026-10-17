/*
 * A pretend consent platform for the sandbox, so Cookie Connect can be tried
 * without an account anywhere. Use it with the Custom platform:
 *
 *   Consent platform code:  <script src="/fake-cmp.js"></script>
 *   Tell Cookie Connect:    FakeCmp.onChange(function (c) { CookieConnect.set(c); });
 *   Open the preferences:   FakeCmp.open();
 */
(function () {
  var KEY = 'fake-cmp';
  var listeners = [];
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}

  function emit() { listeners.forEach(function (fn) { fn(saved || { preferences: false, analytics: false, marketing: false }); }); }

  function save(choice) {
    saved = choice;
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) {}
    close();
    emit();
  }

  var box;
  function close() { if (box) { box.remove(); box = null; } }
  function open() {
    close();
    box = document.createElement('div');
    box.setAttribute('style', 'position:fixed;inset:auto 16px 16px auto;max-width:340px;background:#fff;border:1px solid #ccc;border-radius:10px;padding:16px;font:14px system-ui;box-shadow:0 8px 30px rgba(0,0,0,.15);z-index:99');
    var c = saved || {};
    box.innerHTML = '<strong>Fake CMP</strong><p>Which cookies may we use?</p>'
      + ['preferences', 'analytics', 'marketing'].map(function (k) {
        return '<label style="display:block"><input type="checkbox" name="' + k + '"' + (c[k] ? ' checked' : '') + '> ' + k + '</label>';
      }).join('')
      + '<p><button data-a="all">Accept all</button> <button data-a="none">Reject all</button> <button data-a="save">Save</button></p>';
    box.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-a');
      if (!a) return;
      var pick = function (k) { return a === 'all' || (a === 'save' && box.querySelector('[name=' + k + ']').checked); };
      save({ preferences: pick('preferences'), analytics: pick('analytics'), marketing: pick('marketing') });
    });
    document.body.appendChild(box);
  }

  window.FakeCmp = {
    onChange: function (fn) { listeners.push(fn); if (saved) fn(saved); },
    open: open
  };

  document.addEventListener('DOMContentLoaded', function () { if (!saved) open(); });
})();
