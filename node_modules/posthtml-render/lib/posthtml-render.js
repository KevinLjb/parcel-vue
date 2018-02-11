(function(global) {
/**
 * Parse PostHTMLTree to html
 * @param  {Object} tree    PostHTMLTree
 * @param  {Object} options Parse options
 * @return {String}         html string
 */
function postHTMLRender(tree, options) {
    options = options || {};

    /**
     * options parse
     * @param {Array}  singleTags           single tags array for extend default
     * @param {String} closingSingleTag     option for closing single tag
     *                                      Option:
     *                                          default: `<br>`
     *                                          slash: `<br />`
     *                                          tag: `<br></br>`
     *
     */

    var optSingleTags = options.singleTags,
        closingSingleTag = options.closingSingleTag;

    var SINGLE_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen',
                        'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
    var singleTags = {};

    for (var i = 0, leni = SINGLE_TAGS.length; i < leni; i++) {
        singleTags[SINGLE_TAGS[i]] = 1;
    }

    if (optSingleTags) {
        for (var j = 0, lenj = optSingleTags.length; j < lenj; j++) {
            singleTags[optSingleTags[j]] = 1;
        }
    }

    return html(tree);

    function html(tree) {

        var buf = '';

        traverse([].concat(tree), function(node) {
            if (!node) return;
            if (typeof node === 'string' || typeof node === 'number') {
                buf += node;
                return;
            }
            if (typeof node.tag === 'boolean' && !node.tag) {
                typeof node.content !== 'object' &&  (buf += node.content);
                return node.content;
            }

            // treat as new root tree if node is an array
            if (Array.isArray(node)) {
                buf += html(node);
                return;
            }

            var tag = node.tag || 'div';
            if (singleTags[tag]) {
                buf += '<'+ tag + attrs(node.attrs);
                switch (closingSingleTag) {
                    case 'slash':
                        buf += ' />';
                        break;
                    case 'tag':
                        buf += '></' + tag + '>';
                        break;
                    default:
                        buf += '>';
                }
            } else {
                buf += '<' + tag + (node.attrs? attrs(node.attrs): '') + '>' +
                    (node.content? html(node.content): '') +
                    '</' + tag + '>';
            }
        });

        return buf;

        function attrs(obj) {
            var attr = '';
            for (var key in obj) {
                if (
                    typeof obj[key] === 'boolean' &&
                    obj[key]
                ) attr += ' ' + key;
                else if (
                    typeof obj[key] === 'string' ||
                    typeof obj[key] === 'number'
                ) attr += ' ' + key + '="' + obj[key] + '"';
            }
            return attr;
        }
    }
}

function traverse(tree, cb) {
    if (Array.isArray(tree)) {
        for (var i = 0, len = tree.length; i < len; i++) {
            traverse(cb(tree[i]), cb);
        }
    } else if (typeof tree === 'object' && tree.hasOwnProperty('content')) traverse(tree.content, cb);
    return tree;
}

var defineAsGlobal = true;

/* istanbul ignore next */
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = postHTMLRender;
    defineAsGlobal = false;
}

/* istanbul ignore next */
if (typeof modules === 'object' && typeof modules.define === 'function') {
    modules.define('postHTMLRender', function(provide) {
        provide(postHTMLRender);
    });
    defineAsGlobal = false;
}

/* istanbul ignore next */
if (typeof define === 'function') {
    define(function(require, exports, module) {
        module.exports = postHTMLRender;
    });
    defineAsGlobal = false;
}
/* istanbul ignore next */
defineAsGlobal && (global.postHTMLRender = postHTMLRender);

/* istanbul ignore next */
})(typeof window !== 'undefined'? window: global);
