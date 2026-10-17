# Dog-ear Books: a Cookie Connect demo for Statamic

A made-up independent bookshop for trying [Cookie Connect for Statamic](https://github.com/1994limited/cookie-connect-statamic): twelve books and a journal, with

- a video held back until marketing cookies are allowed, with a placeholder (`resources/views/home.antlers.html`);
- an analytics script that runs once analytics is allowed, and a box showing what `window.CookieConnect` knows;
- a cookie policy page whose content uses `{cookie_declaration}` and `{cookie_settings}`, as an editor would type them;
- a Cookie settings link in the footer: just a link to `#cookie-settings`;
- a pretend consent platform, `public/fake-cmp.js`, already chosen under **Tools → Cookie Connect** (the Custom platform), so you can try it all without an account anywhere.

The layout has nothing in its `<head>` for Cookie Connect: it adds itself.

## Running it

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan demo:users
php artisan demo:content
php artisan serve
```

Sign in at `/cp` as `admin@example.com` with the password `password`. `demo:users` refuses to run unless `APP_ENV=local`, since its password is known.

## Trying it

Open the site and accept or reject in the pretend banner: watch the video, the analytics count and the box change. The footer link reopens it. Then, under **Tools → Cookie Connect**, choose your real platform and paste its ID.

The pretend platform is set up like this, as you would for any platform Cookie Connect doesn't list:

| Field | Value |
|---|---|
| Consent platform code | `<script src="/fake-cmp.js"></script>` |
| Tell Cookie Connect about consent | `FakeCmp.onChange(function (choice) { CookieConnect.set(choice); });` |
| Open the preferences | `FakeCmp.open();` |

Cookie Connect only loads in the environments under **Tools → Addons → Cookie Connect → Settings**; the demo lists `production, local`.
