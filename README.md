# EgressIntent
> OuiBounc originally created by [Carl Sednaoui](http://carlsednaoui.com/about) from [MailCharts](http://www.mailcharts.com/). Ported to TypeScript and adapted into EgressIntent by [Sean Bennett](https://swbennett.com).

EgressIntent offers a simple interface to execute code as the user's cursor exits a given area, with the added functionality of limiting the number of times this can occur over a given period of time by setting a cookie. As a million other things use the name 'EgressIntent', the name may be subject to change.

An adaptation of the [OuiBounce](https://github.com/carlsednaoui/ouibounce) library from [Carl Sednaoui](http://carlsednaoui.com/about) and other contributors, it has diverged from the original library:
* EgressIntent eschews the original library's style attribute modification of a given "modal" element on exit trigger, instead leaving the exact code to execute up to the developer.
* EgressIntent allows the developer to specify an element to use as the bounds to be exited from, rather than being hardcoded to act on the `<body>` element. As such, OuiBounce's _sensitivity_ configuration option has been left out.

## Installation

As there is no NPM package, it is necessary to do one of the following:
1. Copy _egress-intent.js_ from _dist/_ or _egress-intent.ts_ from _src/_ into your scripts folder
2. Run `npm install https://github.com/SWBennett06/EgressIntent.git`

## Usage

### Basic Usage:
EgressIntent is intended for use with a module bundler. For a project with ES6 modules enabled, simply:
```ts
import EgressIntent from 'egress-intent';

const trigger = new EgressIntent({
    callback: () => { console.log('Fired'); }
});
```

If using another module loader:
```js
const EgressIntent = require('egress-intent').default;
```

### Methods
The trigger can be manually fired:
```ts
trigger.fire();
```

Or disabled:
```ts
trigger.disable();
```

### Options
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| aggressive | `boolean` | `false` | Ignores whether a cookie has been set and always fires on exit. |
| timer | `number` | `1000` | The number of milliseconds after which to attach handlers. Reduces false positives. |
| delay | `number` | `0` | The number of milliseconds after which the user has exited the callback should trigger. Setting this allows the user to briefly exit and then return without triggering. |
| cookieExpire | `number` | `1` | The number of days after which the cookie should expire and trigger the code again for the user. |
| cookieDomain | `string` | `''` | If you need a cookie to work also in your subdomain (like blog.example.com and example.com), then set a cookieDomain such as .example.com (notice the dot in front). |
| cookieName | `string` | `'triggeredEI'` | If desired, override the default cookie name. |
| sitewide | `boolean` | `false` | If `true`, the cookie will apply to every page of the site rather than only that which the user triggered the code to be fired. |
| target | `HTMLElement` | `document.documentElement` | The element that defines the boundaries of the exit. |

When manually calling the `disable()` method on the class, custom cookie options (_cookieExpire_, _cookieDomain_, _cookieName_, and _sitewide_) can be specified that override those set when the class was instantiated:

```ts
trigger.disable({
    cookieExpire: 10
});
```