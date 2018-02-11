# posthtml-render
[![npm version](https://badge.fury.io/js/posthtml-render.svg)](http://badge.fury.io/js/posthtml-render)
[![Build Status](https://travis-ci.org/posthtml/posthtml-render.svg?branch=master)](https://travis-ci.org/posthtml/posthtml-render?branch=master)
[![Coverage Status](https://coveralls.io/repos/posthtml/posthtml-render/badge.svg?branch=master)](https://coveralls.io/r/posthtml/posthtml-render?branch=master)

Render [PostHTML](http://github.com/posthtml/posthtml) Tree to HTML/XML.
More info for [PostHTMLTree](https://github.com/posthtml/posthtml#posthtml-json-tree-example)

## Install

[NPM](http://npmjs.com) install
```
$ npm install posthtml-render
```
is also available for [bower](http://bower.io) and as an AMD, CommonJS, and globals module, uncompressed and compressed.


## Usage

__In NodeJS__

```js
var render = require('posthtml-render');
var listObj = { tag: 'ul' };

listObj.attrs = { class: 'list' };
listObj.content = ['one', 'two', 'three'].map(function(text) { return { tag: 'li', content: text }});

clonsole.log(render(listObj/*, options */));
// <ul class="list"><li>one</li><li>two</li><li>three</li></ul>
```

__In Browser__

```html
<!DOCTYPE html>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="./bower_components/posthtml-render/posthtml-render.min.js"></script>
    <script type="text/javascript">
        window.onload = function() {
            document.body.innerHTML = postHTMLRender({ tag: 'h1', attrs: { style: 'color: red;' }, content: ['Title'] });
        };
    </script>
</head>
<body>

</body>
</html>
```

## Options

### singleTags
Array tags for extend default list single tags

__Default__: `[]`

*Options* `{ singleTags: ['rect', 'custom'] }`

```html
...
<div>
    ...
    <rect>
    <custom>
</div>
```


### closingSingleTag
Option to specify version closing single tags.
Accepts values: `default`, `slash`, `tag`.

__Default__: `default`

*Options* `{ closingSingleTag: 'default' }`

```html
<img>
```

*Options* `{ closingSingleTag: 'slash' }`

```html
<img />
```

*Options* `{ closingSingleTag: 'tag' }`

```html
<img></img>
```

## License

[MIT](LICENSE)
