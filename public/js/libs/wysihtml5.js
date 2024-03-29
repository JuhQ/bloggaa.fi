/**
 * Full HTML5 compatibility rule set
 * These rules define which tags and CSS classes are supported and which tags should be specially treated.
 *
 * Examples based on this rule set:
 *
 *    <a href="http://foobar.com">foo</a>
 *    ... becomes ...
 *    <a href="http://foobar.com" target="_blank" rel="nofollow">foo</a>
 *
 *    <img align="left" src="http://foobar.com/image.png">
 *    ... becomes ...
 *    <img class="wysiwyg-float-left" src="http://foobar.com/image.png" alt="">
 *
 *    <div>foo<script>alert(document.cookie)</script></div>
 *    ... becomes ...
 *    <div>foo</div>
 *
 *    <marquee>foo</marquee>
 *    ... becomes ...
 *    <span>foo</span>
 *
 *    foo <br clear="both"> bar
 *    ... becomes ...
 *    foo <br class="wysiwyg-clear-both"> bar
 *
 *    <div>hello <iframe src="http://google.com"></iframe></div>
 *    ... becomes ...
 *    <div>hello </div>
 *
 *    <center>hello</center>
 *    ... becomes ...
 *    <div class="wysiwyg-text-align-center">hello</div>
 */
var wysihtml5ParserRules = {
    /**
     * CSS Class white-list
     * Following CSS classes won't be removed when parsed by the wysihtml5 HTML parser
     */
    "classes": {
        "wysiwyg-clear-both": 1,
        "wysiwyg-clear-left": 1,
        "wysiwyg-clear-right": 1,
        "wysiwyg-color-aqua": 1,
        "wysiwyg-color-black": 1,
        "wysiwyg-color-blue": 1,
        "wysiwyg-color-fuchsia": 1,
        "wysiwyg-color-gray": 1,
        "wysiwyg-color-green": 1,
        "wysiwyg-color-lime": 1,
        "wysiwyg-color-maroon": 1,
        "wysiwyg-color-navy": 1,
        "wysiwyg-color-olive": 1,
        "wysiwyg-color-purple": 1,
        "wysiwyg-color-red": 1,
        "wysiwyg-color-silver": 1,
        "wysiwyg-color-teal": 1,
        "wysiwyg-color-white": 1,
        "wysiwyg-color-yellow": 1,
        "wysiwyg-float-left": 1,
        "wysiwyg-float-right": 1,
        "wysiwyg-font-size-large": 1,
        "wysiwyg-font-size-larger": 1,
        "wysiwyg-font-size-medium": 1,
        "wysiwyg-font-size-small": 1,
        "wysiwyg-font-size-smaller": 1,
        "wysiwyg-font-size-x-large": 1,
        "wysiwyg-font-size-x-small": 1,
        "wysiwyg-font-size-xx-large": 1,
        "wysiwyg-font-size-xx-small": 1,
        "wysiwyg-text-align-center": 1,
        "wysiwyg-text-align-justify": 1,
        "wysiwyg-text-align-left": 1,
        "wysiwyg-text-align-right": 1
    },
    /**
     * Tag list
     *
     * The following options are available:
     *
     *    - add_class:        converts and deletes the given HTML4 attribute (align, clear, ...) via the given method to a css class
     *                        The following methods are implemented in wysihtml5.dom.parse:
     *                          - align_text:  converts align attribute values (right/left/center/justify) to their corresponding css class "wysiwyg-text-align-*")
     *                            <p align="center">foo</p> ... becomes ... <p> class="wysiwyg-text-align-center">foo</p>
     *                          - clear_br:    converts clear attribute values left/right/all/both to their corresponding css class "wysiwyg-clear-*"
     *                            <br clear="all"> ... becomes ... <br class="wysiwyg-clear-both">
     *                          - align_img:    converts align attribute values (right/left) on <img> to their corresponding css class "wysiwyg-float-*"
     *                          
     *    - remove:             removes the element and its content
     *
     *    - rename_tag:         renames the element to the given tag
     *
     *    - set_class:          adds the given class to the element (note: make sure that the class is in the "classes" white list above)
     *
     *    - set_attributes:     sets/overrides the given attributes
     *
     *    - check_attributes:   checks the given HTML attribute via the given method
     *                            - url:            allows only valid urls (starting with http:// or https://)
     *                            - src:            allows something like "/foobar.jpg", "http://google.com", ...
     *                            - href:           allows something like "mailto:bert@foo.com", "http://google.com", "/foobar.jpg"
     *                            - alt:            strips unwanted characters. if the attribute is not set, then it gets set (to ensure valid and compatible HTML)
     *                            - numbers:  ensures that the attribute only contains numeric characters
     */
    "tags": {
        "tr": {
            "add_class": {
                "align": "align_text"
            }
        },
        "strike": {
            "remove": 1
        },
        "form": {
            "rename_tag": "div"
        },
        "rt": {
            "rename_tag": "span"
        },
        "code": {},
        "acronym": {
            "rename_tag": "span"
        },
        "br": {
            "add_class": {
                "clear": "clear_br"
            }
        },
        "details": {
            "rename_tag": "div"
        },
        "h4": {
            "add_class": {
                "align": "align_text"
            }
        },
        "em": {},
        "title": {
            "remove": 1
        },
        "multicol": {
            "rename_tag": "div"
        },
        "figure": {
            "rename_tag": "div"
        },
        "xmp": {
            "rename_tag": "span"
        },
        "small": {
            "rename_tag": "span",
            "set_class": "wysiwyg-font-size-smaller"
        },
        "area": {
            "remove": 1
        },
        "time": {
            "rename_tag": "span"
        },
        "dir": {
            "rename_tag": "ul"
        },
        "bdi": {
            "rename_tag": "span"
        },
        "command": {
            "remove": 1
        },
        "ul": {},
        "progress": {
            "rename_tag": "span"
        },
        "dfn": {
            "rename_tag": "span"
        },
        "iframe": {
            "remove": 1
        },
        "figcaption": {
            "rename_tag": "div"
        },
        "a": {
            "check_attributes": {
                "href": "url" // if you compiled master manually then change this from 'url' to 'href'
            },
            "set_attributes": {
                "target": "_blank"
            }
        },
        "img": {
            "check_attributes": {
                "width": "numbers",
                "alt": "alt",
                "src": "url", // if you compiled master manually then change this from 'url' to 'src'
                "height": "numbers"
            },
            "add_class": {
                "align": "align_img"
            }
        },
        "rb": {
            "rename_tag": "span"
        },
        "footer": {
            "rename_tag": "div"
        },
        "noframes": {
            "remove": 1
        },
        "abbr": {
            "rename_tag": "span"
        },
        "u": {},
        "bgsound": {
            "remove": 1
        },
        "sup": {
            "rename_tag": "span"
        },
        "address": {
            "rename_tag": "div"
        },
        "basefont": {
            "remove": 1
        },
        "nav": {
            "rename_tag": "div"
        },
        "h1": {
            "add_class": {
                "align": "align_text"
            }
        },
        "head": {
            "remove": 1
        },
        "tbody": {
            "add_class": {
                "align": "align_text"
            }
        },
        "dd": {
            "rename_tag": "div"
        },
        "s": {
            "rename_tag": "span"
        },
        "li": {},
        "td": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers"
            },
            "add_class": {
                "align": "align_text"
            }
        },
        "object": {
            "remove": 1
        },
        "div": {
            "add_class": {
                "align": "align_text"
            }
        },
        "option": {
            "rename_tag": "span"
        },
        "select": {
            "rename_tag": "span"
        },
        "i": {},
        "track": {
            "remove": 1
        },
        "wbr": {
            "remove": 1
        },
        "fieldset": {
            "rename_tag": "div"
        },
        "big": {
            "rename_tag": "span",
            "set_class": "wysiwyg-font-size-larger"
        },
        "button": {
            "rename_tag": "span"
        },
        "noscript": {
            "remove": 1
        },
        "svg": {
            "remove": 1
        },
        "input": {
            "remove": 1
        },
        "table": {},
        "keygen": {
            "remove": 1
        },
        "h5": {
            "add_class": {
                "align": "align_text"
            }
        },
        "meta": {
            "remove": 1
        },
        "map": {
            "rename_tag": "div"
        },
        "isindex": {
            "remove": 1
        },
        "mark": {
            "rename_tag": "span"
        },
        "caption": {
            "add_class": {
                "align": "align_text"
            }
        },
        "tfoot": {
            "add_class": {
                "align": "align_text"
            }
        },
        "base": {
            "remove": 1
        },
        "video": {
            "remove": 1
        },
        "strong": {},
        "canvas": {
            "remove": 1
        },
        "output": {
            "rename_tag": "span"
        },
        "marquee": {
            "rename_tag": "span"
        },
        "b": {},
        "q": {
            "check_attributes": {
                "cite": "url"
            }
        },
        "applet": {
            "remove": 1
        },
        "span": {},
        "rp": {
            "rename_tag": "span"
        },
        "spacer": {
            "remove": 1
        },
        "source": {
            "remove": 1
        },
        "aside": {
            "rename_tag": "div"
        },
        "frame": {
            "remove": 1
        },
        "section": {
            "rename_tag": "div"
        },
        "body": {
            "rename_tag": "div"
        },
        "ol": {},
        "nobr": {
            "rename_tag": "span"
        },
        "html": {
            "rename_tag": "div"
        },
        "summary": {
            "rename_tag": "span"
        },
        "var": {
            "rename_tag": "span"
        },
        "del": {
            "remove": 1
        },
        "blockquote": {
            "check_attributes": {
                "cite": "url"
            }
        },
        "style": {
            "remove": 1
        },
        "device": {
            "remove": 1
        },
        "meter": {
            "rename_tag": "span"
        },
        "h3": {
            "add_class": {
                "align": "align_text"
            }
        },
        "textarea": {
            "rename_tag": "span"
        },
        "embed": {
            "remove": 1
        },
        "hgroup": {
            "rename_tag": "div"
        },
        "font": {
            "rename_tag": "span",
            "add_class": {
                "size": "size_font"
            }
        },
        "tt": {
            "rename_tag": "span"
        },
        "noembed": {
            "remove": 1
        },
        "thead": {
            "add_class": {
                "align": "align_text"
            }
        },
        "blink": {
            "rename_tag": "span"
        },
        "plaintext": {
            "rename_tag": "span"
        },
        "xml": {
            "remove": 1
        },
        "h6": {
            "add_class": {
                "align": "align_text"
            }
        },
        "param": {
            "remove": 1
        },
        "th": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers"
            },
            "add_class": {
                "align": "align_text"
            }
        },
        "legend": {
            "rename_tag": "span"
        },
        "hr": {},
        "label": {
            "rename_tag": "span"
        },
        "dl": {
            "rename_tag": "div"
        },
        "kbd": {
            "rename_tag": "span"
        },
        "listing": {
            "rename_tag": "div"
        },
        "dt": {
            "rename_tag": "span"
        },
        "nextid": {
            "remove": 1
        },
        "pre": {},
        "center": {
            "rename_tag": "div",
            "set_class": "wysiwyg-text-align-center"
        },
        "audio": {
            "remove": 1
        },
        "datalist": {
            "rename_tag": "span"
        },
        "samp": {
            "rename_tag": "span"
        },
        "col": {
            "remove": 1
        },
        "article": {
            "rename_tag": "div"
        },
        "cite": {},
        "link": {
            "remove": 1
        },
        "script": {
            "remove": 1
        },
        "bdo": {
            "rename_tag": "span"
        },
        "menu": {
            "rename_tag": "ul"
        },
        "colgroup": {
            "remove": 1
        },
        "ruby": {
            "rename_tag": "span"
        },
        "h2": {
            "add_class": {
                "align": "align_text"
            }
        },
        "ins": {
            "rename_tag": "span"
        },
        "p": {
            "add_class": {
                "align": "align_text"
            }
        },
        "sub": {
            "rename_tag": "span"
        },
        "comment": {
            "remove": 1
        },
        "frameset": {
            "remove": 1
        },
        "optgroup": {
            "rename_tag": "span"
        },
        "header": {
            "rename_tag": "div"
        }
    }
};
/*
 wysihtml5 v0.4.0pre
 https://github.com/xing/wysihtml5

 Author: Christopher Blum (https://github.com/tiff)

 Copyright (C) 2012 XING AG
 Licensed under the MIT license (MIT)

 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.2.2
 Build date: 13 November 2011
*/
var wysihtml5={version:"0.4.0pre",commands:{},dom:{},quirks:{},toolbar:{},lang:{},selection:{},views:{},INVISIBLE_SPACE:"\ufeff",EMPTY_FUNCTION:function(){},ELEMENT_NODE:1,TEXT_NODE:3,BACKSPACE_KEY:8,ENTER_KEY:13,ESCAPE_KEY:27,SPACE_KEY:32,DELETE_KEY:46};
window.rangy=function(){function b(a,b){var c=typeof a[b];return c==j||!!(c==g&&a[b])||"unknown"==c}function c(a,b){return!!(typeof a[b]==g&&a[b])}function a(a,b){return typeof a[b]!=k}function d(a){return function(b,c){for(var d=c.length;d--;)if(!a(b,c[d]))return!1;return!0}}function e(a){return a&&p(a,u)&&t(a,v)}function f(a){window.alert("Rangy not supported in your browser. Reason: "+a);q.initialized=!0;q.supported=!1}function h(){if(!q.initialized){var a,d=!1,g=!1;b(document,"createRange")&&
(a=document.createRange(),p(a,n)&&t(a,m)&&(d=!0),a.detach());if((a=c(document,"body")?document.body:document.getElementsByTagName("body")[0])&&b(a,"createTextRange"))a=a.createTextRange(),e(a)&&(g=!0);!d&&!g&&f("Neither Range nor TextRange are implemented");q.initialized=!0;q.features={implementsDomRange:d,implementsTextRange:g};d=A.concat(y);g=0;for(a=d.length;g<a;++g)try{d[g](q)}catch(j){c(window,"console")&&b(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
j)}}}function i(a){this.name=a;this.supported=this.initialized=!1}var g="object",j="function",k="undefined",m="startContainer startOffset endContainer endOffset collapsed commonAncestorContainer START_TO_START START_TO_END END_TO_START END_TO_END".split(" "),n="setStart setStartBefore setStartAfter setEnd setEndBefore setEndAfter collapse selectNode selectNodeContents compareBoundaryPoints deleteContents extractContents cloneContents insertNode surroundContents cloneRange toString detach".split(" "),
v="boundingHeight boundingLeft boundingTop boundingWidth htmlText text".split(" "),u="collapse compareEndPoints duplicate getBookmark moveToBookmark moveToElementText parentElement pasteHTML select setEndPoint getBoundingClientRect".split(" "),p=d(b),r=d(c),t=d(a),q={version:"1.2.2",initialized:!1,supported:!0,util:{isHostMethod:b,isHostObject:c,isHostProperty:a,areHostMethods:p,areHostObjects:r,areHostProperties:t,isTextRange:e},features:{},modules:{},config:{alertOnWarn:!1,preferTextRange:!1}};
q.fail=f;q.warn=function(a){a="Rangy warning: "+a;q.config.alertOnWarn?window.alert(a):typeof window.console!=k&&typeof window.console.log!=k&&window.console.log(a)};({}).hasOwnProperty?q.util.extend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}:f("hasOwnProperty not supported");var y=[],A=[];q.init=h;q.addInitListener=function(a){q.initialized?a(q):y.push(a)};var B=[];q.addCreateMissingNativeApiListener=function(a){B.push(a)};q.createMissingNativeApi=function(a){a=a||window;h();
for(var b=0,c=B.length;b<c;++b)B[b](a)};i.prototype.fail=function(a){this.initialized=!0;this.supported=!1;throw Error("Module '"+this.name+"' failed to load: "+a);};i.prototype.warn=function(a){q.warn("Module "+this.name+": "+a)};i.prototype.createError=function(a){return Error("Error in Rangy "+this.name+" module: "+a)};q.createModule=function(a,b){var c=new i(a);q.modules[a]=c;A.push(function(a){b(a,c);c.initialized=!0;c.supported=!0})};q.requireModules=function(a){for(var b=0,c=a.length,d,e;b<
c;++b){e=a[b];d=q.modules[e];if(!d||!(d instanceof i))throw Error("Module '"+e+"' not found");if(!d.supported)throw Error("Module '"+e+"' not supported");}};var D=!1,r=function(){D||(D=!0,q.initialized||h())};if(typeof window==k)f("No window found");else if(typeof document==k)f("No document found");else return b(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",r,!1),b(window,"addEventListener")?window.addEventListener("load",r,!1):b(window,"attachEvent")?window.attachEvent("onload",
r):f("Window does not have required addEventListener or attachEvent method"),q}();
rangy.createModule("DomUtil",function(b,c){function a(a){for(var b=0;a=a.previousSibling;)b++;return b}function d(a,b){var c=[],d;for(d=a;d;d=d.parentNode)c.push(d);for(d=b;d;d=d.parentNode)if(p(c,d))return d;return null}function e(a,b,c){for(c=c?a:a.parentNode;c;){a=c.parentNode;if(a===b)return c;c=a}return null}function f(a){a=a.nodeType;return 3==a||4==a||8==a}function h(a,b){var c=b.nextSibling,d=b.parentNode;c?d.insertBefore(a,c):d.appendChild(a);return a}function i(a){if(9==a.nodeType)return a;
if(typeof a.ownerDocument!=n)return a.ownerDocument;if(typeof a.document!=n)return a.document;if(a.parentNode)return i(a.parentNode);throw Error("getDocument: no document found for node");}function g(a){return!a?"[No node]":f(a)?'"'+a.data+'"':1==a.nodeType?"<"+a.nodeName+(a.id?' id="'+a.id+'"':"")+">["+a.childNodes.length+"]":a.nodeName}function j(a){this._next=this.root=a}function k(a,b){this.node=a;this.offset=b}function m(a){this.code=this[a];this.codeName=a;this.message="DOMException: "+this.codeName}
var n="undefined",v=b.util;v.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||c.fail("document missing a Node creation method");v.isHostMethod(document,"getElementsByTagName")||c.fail("document missing getElementsByTagName method");var u=document.createElement("div");v.areHostMethods(u,["insertBefore","appendChild","cloneNode"])||c.fail("Incomplete Element implementation");v.isHostProperty(u,"innerHTML")||c.fail("Element is missing innerHTML property");u=document.createTextNode("test");
v.areHostMethods(u,["splitText","deleteData","insertData","appendData","cloneNode"])||c.fail("Incomplete Text Node implementation");var p=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1};j.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next,b;if(this._current){b=a.firstChild;if(!b)for(b=null;a!==this.root&&!(b=a.nextSibling);)a=a.parentNode;this._next=b}return this._current},detach:function(){this._current=this._next=this.root=
null}};k.prototype={equals:function(a){return this.node===a.node&this.offset==a.offset},inspect:function(){return"[DomPosition("+g(this.node)+":"+this.offset+")]"}};m.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};m.prototype.toString=function(){return this.message};b.dom={arrayContains:p,isHtmlNamespace:function(a){var b;return typeof a.namespaceURI==n||null===(b=a.namespaceURI)||"http://www.w3.org/1999/xhtml"==
b},parentElement:function(a){a=a.parentNode;return 1==a.nodeType?a:null},getNodeIndex:a,getNodeLength:function(a){var b;return f(a)?a.length:(b=a.childNodes)?b.length:0},getCommonAncestor:d,isAncestorOf:function(a,b,c){for(b=c?b:b.parentNode;b;){if(b===a)return!0;b=b.parentNode}return!1},getClosestAncestorIn:e,isCharacterDataNode:f,insertAfter:h,splitDataNode:function(a,b){var c=a.cloneNode(!1);c.deleteData(0,b);a.deleteData(b,a.length-b);h(c,a);return c},getDocument:i,getWindow:function(a){a=i(a);
if(typeof a.defaultView!=n)return a.defaultView;if(typeof a.parentWindow!=n)return a.parentWindow;throw Error("Cannot get a window object for node");},getIframeWindow:function(a){if(typeof a.contentWindow!=n)return a.contentWindow;if(typeof a.contentDocument!=n)return a.contentDocument.defaultView;throw Error("getIframeWindow: No Window object found for iframe element");},getIframeDocument:function(a){if(typeof a.contentDocument!=n)return a.contentDocument;if(typeof a.contentWindow!=n)return a.contentWindow.document;
throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(a){return v.isHostObject(a,"body")?a.body:a.getElementsByTagName("body")[0]},getRootContainer:function(a){for(var b;b=a.parentNode;)a=b;return a},comparePoints:function(b,c,g,j){var f;if(b==g)return c===j?0:c<j?-1:1;if(f=e(g,b,!0))return c<=a(f)?-1:1;if(f=e(b,g,!0))return a(f)<j?-1:1;c=d(b,g);b=b===c?c:e(b,c,!0);g=g===c?c:e(g,c,!0);if(b===g)throw Error("comparePoints got to case 4 and childA and childB are the same!");
for(c=c.firstChild;c;){if(c===b)return-1;if(c===g)return 1;c=c.nextSibling}throw Error("Should not be here!");},inspectNode:g,fragmentFromNodeChildren:function(a){for(var b=i(a).createDocumentFragment(),c;c=a.firstChild;)b.appendChild(c);return b},createIterator:function(a){return new j(a)},DomPosition:k};b.DOMException=m});
rangy.createModule("DomRange",function(b){function c(a,b){return 3!=a.nodeType&&(l.isAncestorOf(a,b.startContainer,!0)||l.isAncestorOf(a,b.endContainer,!0))}function a(a){return l.getDocument(a.startContainer)}function d(a,b,c){if(b=a._listeners[b])for(var d=0,e=b.length;d<e;++d)b[d].call(a,{target:a,args:c})}function e(a){return new H(a.parentNode,l.getNodeIndex(a))}function f(a){return new H(a.parentNode,l.getNodeIndex(a)+1)}function h(a,b,c){var d=11==a.nodeType?a.firstChild:a;l.isCharacterDataNode(b)?
c==b.length?l.insertAfter(a,b):b.parentNode.insertBefore(a,0==c?b:l.splitDataNode(b,c)):c>=b.childNodes.length?b.appendChild(a):b.insertBefore(a,b.childNodes[c]);return d}function i(b){for(var c,d,e=a(b.range).createDocumentFragment();d=b.next();){c=b.isPartiallySelectedSubtree();d=d.cloneNode(!c);c&&(c=b.getSubtreeIterator(),d.appendChild(i(c)),c.detach(!0));if(10==d.nodeType)throw new C("HIERARCHY_REQUEST_ERR");e.appendChild(d)}return e}function g(a,b,c){for(var d,e,c=c||{stop:!1};d=a.next();)if(a.isPartiallySelectedSubtree())if(!1===
b(d)){c.stop=!0;break}else{if(d=a.getSubtreeIterator(),g(d,b,c),d.detach(!0),c.stop)break}else for(d=l.createIterator(d);e=d.next();)if(!1===b(e)){c.stop=!0;return}}function j(a){for(var b;a.next();)a.isPartiallySelectedSubtree()?(b=a.getSubtreeIterator(),j(b),b.detach(!0)):a.remove()}function k(b){for(var c,d=a(b.range).createDocumentFragment(),e;c=b.next();){b.isPartiallySelectedSubtree()?(c=c.cloneNode(!1),e=b.getSubtreeIterator(),c.appendChild(k(e)),e.detach(!0)):b.remove();if(10==c.nodeType)throw new C("HIERARCHY_REQUEST_ERR");
d.appendChild(c)}return d}function m(a,b,c){var d=!(!b||!b.length),e,j=!!c;d&&(e=RegExp("^("+b.join("|")+")$"));var f=[];g(new v(a,!1),function(a){(!d||e.test(a.nodeType))&&(!j||c(a))&&f.push(a)});return f}function n(a){return"["+("undefined"==typeof a.getName?"Range":a.getName())+"("+l.inspectNode(a.startContainer)+":"+a.startOffset+", "+l.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function v(a,b){this.range=a;this.clonePartiallySelectedTextNodes=b;if(!a.collapsed){this.sc=a.startContainer;
this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var c=a.commonAncestorContainer;this.sc===this.ec&&l.isCharacterDataNode(this.sc)?(this.isSingleCharacterDataNode=!0,this._first=this._last=this._next=this.sc):(this._first=this._next=this.sc===c&&!l.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:l.getClosestAncestorIn(this.sc,c,!0),this._last=this.ec===c&&!l.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:l.getClosestAncestorIn(this.ec,c,!0))}}function u(a){this.code=
this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function p(a,b,c){this.nodes=m(a,b,c);this._next=this.nodes[0];this._position=0}function r(a){return function(b,c){for(var d,e=c?b:b.parentNode;e;){d=e.nodeType;if(l.arrayContains(a,d))return e;e=e.parentNode}return null}}function t(a,b){if(L(a,b))throw new u("INVALID_NODE_TYPE_ERR");}function q(a){if(!a.startContainer)throw new C("INVALID_STATE_ERR");}function y(a,b){if(!l.arrayContains(b,a.nodeType))throw new u("INVALID_NODE_TYPE_ERR");
}function A(a,b){if(0>b||b>(l.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new C("INDEX_SIZE_ERR");}function B(a,b){if(I(a,!0)!==I(b,!0))throw new C("WRONG_DOCUMENT_ERR");}function D(a){if(T(a,!0))throw new C("NO_MODIFICATION_ALLOWED_ERR");}function z(a,b){if(!a)throw new C(b);}function x(a){q(a);if(!l.arrayContains(M,a.startContainer.nodeType)&&!I(a.startContainer,!0)||!l.arrayContains(M,a.endContainer.nodeType)&&!I(a.endContainer,!0)||!(a.startOffset<=(l.isCharacterDataNode(a.startContainer)?
a.startContainer.length:a.startContainer.childNodes.length))||!(a.endOffset<=(l.isCharacterDataNode(a.endContainer)?a.endContainer.length:a.endContainer.childNodes.length)))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")");}function G(){}function Q(a){a.START_TO_START=U;a.START_TO_END=Y;a.END_TO_END=ca;a.END_TO_START=Z;a.NODE_BEFORE=$;a.NODE_AFTER=aa;a.NODE_BEFORE_AND_AFTER=ba;a.NODE_INSIDE=V}function s(a){Q(a);Q(a.prototype)}function J(a,b){return function(){x(this);
var c=this.startContainer,d=this.startOffset,e=this.commonAncestorContainer,j=new v(this,!0);c!==e&&(c=l.getClosestAncestorIn(c,e,!0),d=f(c),c=d.node,d=d.offset);g(j,D);j.reset();e=a(j);j.detach();b(this,c,d,c,d);return e}}function N(a,d,g){function h(a,b){return function(c){q(this);y(c,E);y(K(c),M);c=(a?e:f)(c);(b?S:i)(this,c.node,c.offset)}}function S(a,b,c){var e=a.endContainer,g=a.endOffset;if(b!==a.startContainer||c!==a.startOffset){if(K(b)!=K(e)||1==l.comparePoints(b,c,e,g))e=b,g=c;d(a,b,c,
e,g)}}function i(a,b,c){var e=a.startContainer,g=a.startOffset;if(b!==a.endContainer||c!==a.endOffset){if(K(b)!=K(e)||-1==l.comparePoints(b,c,e,g))e=b,g=c;d(a,e,g,b,c)}}a.prototype=new G;b.util.extend(a.prototype,{setStart:function(a,b){q(this);t(a,!0);A(a,b);S(this,a,b)},setEnd:function(a,b){q(this);t(a,!0);A(a,b);i(this,a,b)},setStartBefore:h(!0,!0),setStartAfter:h(!1,!0),setEndBefore:h(!0,!1),setEndAfter:h(!1,!1),collapse:function(a){x(this);a?d(this,this.startContainer,this.startOffset,this.startContainer,
this.startOffset):d(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(a){q(this);t(a,!0);d(this,a,0,a,l.getNodeLength(a))},selectNode:function(a){q(this);t(a,!1);y(a,E);var b=e(a),a=f(a);d(this,b.node,b.offset,a.node,a.offset)},extractContents:J(k,d),deleteContents:J(j,d),canSurroundContents:function(){x(this);D(this.startContainer);D(this.endContainer);var a=new v(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);a.detach();return!b},
detach:function(){g(this)},splitBoundaries:function(){x(this);var a=this.startContainer,b=this.startOffset,c=this.endContainer,e=this.endOffset,g=a===c;l.isCharacterDataNode(c)&&(0<e&&e<c.length)&&l.splitDataNode(c,e);l.isCharacterDataNode(a)&&(0<b&&b<a.length)&&(a=l.splitDataNode(a,b),g?(e-=b,c=a):c==a.parentNode&&e>=l.getNodeIndex(a)&&e++,b=0);d(this,a,b,c,e)},normalizeBoundaries:function(){x(this);var a=this.startContainer,b=this.startOffset,c=this.endContainer,e=this.endOffset,g=function(a){var b=
a.nextSibling;b&&b.nodeType==a.nodeType&&(c=a,e=a.length,a.appendData(b.data),b.parentNode.removeChild(b))},j=function(d){var g=d.previousSibling;if(g&&g.nodeType==d.nodeType){a=d;var j=d.length;b=g.length;d.insertData(0,g.data);g.parentNode.removeChild(g);a==c?(e+=b,c=a):c==d.parentNode&&(g=l.getNodeIndex(d),e==g?(c=d,e=j):e>g&&e--)}},f=!0;l.isCharacterDataNode(c)?c.length==e&&g(c):(0<e&&(f=c.childNodes[e-1])&&l.isCharacterDataNode(f)&&g(f),f=!this.collapsed);f?l.isCharacterDataNode(a)?0==b&&j(a):
b<a.childNodes.length&&(g=a.childNodes[b])&&l.isCharacterDataNode(g)&&j(g):(a=c,b=e);d(this,a,b,c,e)},collapseToPoint:function(a,b){q(this);t(a,!0);A(a,b);(a!==this.startContainer||b!==this.startOffset||a!==this.endContainer||b!==this.endOffset)&&d(this,a,b,a,b)}});s(a)}function R(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset;a.commonAncestorContainer=a.collapsed?a.startContainer:l.getCommonAncestor(a.startContainer,a.endContainer)}function O(a,b,c,e,g){var j=a.startContainer!==
b||a.startOffset!==c,f=a.endContainer!==e||a.endOffset!==g;a.startContainer=b;a.startOffset=c;a.endContainer=e;a.endOffset=g;R(a);d(a,"boundarychange",{startMoved:j,endMoved:f})}function w(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};R(this)}b.requireModules(["DomUtil"]);var l=b.dom,H=l.DomPosition,C=b.DOMException;v.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:!1,reset:function(){this._current=
null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;a&&(this._next=a!==this._last?a.nextSibling:null,l.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes&&(a===this.ec&&(a=a.cloneNode(!0)).deleteData(this.eo,a.length-this.eo),this._current===this.sc&&(a=a.cloneNode(!0)).deleteData(0,this.so)));return a},remove:function(){var a=this._current,b,c;l.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)?(b=a===this.sc?this.so:0,c=a===
this.ec?this.eo:a.length,b!=c&&a.deleteData(b,c-b)):a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return c(this._current,this.range)},getSubtreeIterator:function(){var b;if(this.isSingleCharacterDataNode)b=this.range.cloneRange(),b.collapse();else{b=new w(a(this.range));var c=this._current,d=c,e=0,g=c,j=l.getNodeLength(c);l.isAncestorOf(c,this.sc,!0)&&(d=this.sc,e=this.so);l.isAncestorOf(c,this.ec,!0)&&(g=this.ec,j=this.eo);O(b,d,e,g,j)}return new v(b,this.clonePartiallySelectedTextNodes)},
detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};u.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};u.prototype.toString=function(){return this.message};p.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var E=[1,3,4,5,
7,8,10],M=[2,9,11],F=[1,3,4,5,7,8,10,11],P=[1,3,4,5,7,8],K=l.getRootContainer,I=r([9,11]),T=r([5,6,10,12]),L=r([6,10,12]),S=document.createElement("style"),W=!1;try{S.innerHTML="<b>x</b>",W=3==S.firstChild.nodeType}catch(da){}b.features.htmlParsingConforms=W;var X="startContainer startOffset endContainer endOffset collapsed commonAncestorContainer".split(" "),U=0,Y=1,ca=2,Z=3,$=0,aa=1,ba=2,V=3;G.prototype={attachListener:function(a,b){this._listeners[a].push(b)},compareBoundaryPoints:function(a,b){x(this);
B(this.startContainer,b.startContainer);var c=a==Z||a==U?"start":"end",d=a==Y||a==U?"start":"end";return l.comparePoints(this[c+"Container"],this[c+"Offset"],b[d+"Container"],b[d+"Offset"])},insertNode:function(a){x(this);y(a,F);D(this.startContainer);if(l.isAncestorOf(a,this.startContainer,!0))throw new C("HIERARCHY_REQUEST_ERR");a=h(a,this.startContainer,this.startOffset);this.setStartBefore(a)},cloneContents:function(){x(this);var b,c;if(this.collapsed)return a(this).createDocumentFragment();if(this.startContainer===
this.endContainer&&l.isCharacterDataNode(this.startContainer))return b=this.startContainer.cloneNode(!0),b.data=b.data.slice(this.startOffset,this.endOffset),c=a(this).createDocumentFragment(),c.appendChild(b),c;c=new v(this,!0);b=i(c);c.detach();return b},canSurroundContents:function(){x(this);D(this.startContainer);D(this.endContainer);var a=new v(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);a.detach();return!b},surroundContents:function(a){y(a,P);if(!this.canSurroundContents())throw new u("BAD_BOUNDARYPOINTS_ERR");
var b=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);h(a,this.startContainer,this.startOffset);a.appendChild(b);this.selectNode(a)},cloneRange:function(){x(this);for(var b=new w(a(this)),c=X.length,d;c--;)d=X[c],b[d]=this[d];return b},toString:function(){x(this);var a=this.startContainer;if(a===this.endContainer&&l.isCharacterDataNode(a))return 3==a.nodeType||4==a.nodeType?a.data.slice(this.startOffset,this.endOffset):"";var b=[],a=new v(this,!0);g(a,function(a){(3==
a.nodeType||4==a.nodeType)&&b.push(a.data)});a.detach();return b.join("")},compareNode:function(a){x(this);var b=a.parentNode,c=l.getNodeIndex(a);if(!b)throw new C("NOT_FOUND_ERR");a=this.comparePoint(b,c);b=this.comparePoint(b,c+1);return 0>a?0<b?ba:$:0<b?aa:V},comparePoint:function(a,b){x(this);z(a,"HIERARCHY_REQUEST_ERR");B(a,this.startContainer);return 0>l.comparePoints(a,b,this.startContainer,this.startOffset)?-1:0<l.comparePoints(a,b,this.endContainer,this.endOffset)?1:0},createContextualFragment:W?
function(a){var b=this.startContainer,c=l.getDocument(b);if(!b)throw new C("INVALID_STATE_ERR");var d=null;1==b.nodeType?d=b:l.isCharacterDataNode(b)&&(d=l.parentElement(b));d=null===d||"HTML"==d.nodeName&&l.isHtmlNamespace(l.getDocument(d).documentElement)&&l.isHtmlNamespace(d)?c.createElement("body"):d.cloneNode(!1);d.innerHTML=a;return l.fragmentFromNodeChildren(d)}:function(b){q(this);var c=a(this).createElement("body");c.innerHTML=b;return l.fragmentFromNodeChildren(c)},toHtml:function(){x(this);
var b=a(this).createElement("div");b.appendChild(this.cloneContents());return b.innerHTML},intersectsNode:function(b,c){x(this);z(b,"NOT_FOUND_ERR");if(l.getDocument(b)!==a(this))return!1;var d=b.parentNode,e=l.getNodeIndex(b);z(d,"NOT_FOUND_ERR");var g=l.comparePoints(d,e,this.endContainer,this.endOffset),d=l.comparePoints(d,e+1,this.startContainer,this.startOffset);return c?0>=g&&0<=d:0>g&&0<d},isPointInRange:function(a,b){x(this);z(a,"HIERARCHY_REQUEST_ERR");B(a,this.startContainer);return 0<=
l.comparePoints(a,b,this.startContainer,this.startOffset)&&0>=l.comparePoints(a,b,this.endContainer,this.endOffset)},intersectsRange:function(b,c){x(this);if(a(b)!=a(this))throw new C("WRONG_DOCUMENT_ERR");var d=l.comparePoints(this.startContainer,this.startOffset,b.endContainer,b.endOffset),e=l.comparePoints(this.endContainer,this.endOffset,b.startContainer,b.startOffset);return c?0>=d&&0<=e:0>d&&0<e},intersection:function(a){if(this.intersectsRange(a)){var b=l.comparePoints(this.startContainer,
this.startOffset,a.startContainer,a.startOffset),c=l.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),d=this.cloneRange();-1==b&&d.setStart(a.startContainer,a.startOffset);1==c&&d.setEnd(a.endContainer,a.endOffset);return d}return null},union:function(a){if(this.intersectsRange(a,!0)){var b=this.cloneRange();-1==l.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)&&b.setStart(a.startContainer,a.startOffset);1==l.comparePoints(a.endContainer,
a.endOffset,this.endContainer,this.endOffset)&&b.setEnd(a.endContainer,a.endOffset);return b}throw new u("Ranges do not intersect");},containsNode:function(a,b){return b?this.intersectsNode(a,!1):this.compareNode(a)==V},containsNodeContents:function(a){return 0<=this.comparePoint(a,0)&&0>=this.comparePoint(a,l.getNodeLength(a))},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var b=this.cloneRange();b.selectNode(a);var c=b.getNodes([3]);return 0<c.length?
(b.setStart(c[0],0),a=c.pop(),b.setEnd(a,a.length),a=this.containsRange(b),b.detach(),a):this.containsNodeContents(a)},createNodeIterator:function(a,b){x(this);return new p(this,a,b)},getNodes:function(a,b){x(this);return m(this,a,b)},getDocument:function(){return a(this)},collapseBefore:function(a){q(this);this.setEndBefore(a);this.collapse(!1)},collapseAfter:function(a){q(this);this.setStartAfter(a);this.collapse(!0)},getName:function(){return"DomRange"},equals:function(a){return w.rangesEqual(this,
a)},inspect:function(){return n(this)}};N(w,O,function(a){q(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;d(a,"detach",null);a._listeners=null});b.rangePrototype=G.prototype;w.rangeProperties=X;w.RangeIterator=v;w.copyComparisonConstants=s;w.createPrototypeRange=N;w.inspect=n;w.getRangeDocument=a;w.rangesEqual=function(a,b){return a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===
b.endOffset};b.DomRange=w;b.RangeException=u});
rangy.createModule("WrappedRange",function(b){function c(a,b,c,d){var g=a.duplicate();g.collapse(c);var j=g.parentElement();e.isAncestorOf(b,j,!0)||(j=b);if(!j.canHaveHTML)return new f(j.parentNode,e.getNodeIndex(j));var b=e.getDocument(j).createElement("span"),h,k=c?"StartToStart":"StartToEnd";do j.insertBefore(b,b.previousSibling),g.moveToElementText(b);while(0<(h=g.compareEndPoints(k,a))&&b.previousSibling);k=b.nextSibling;if(-1==h&&k&&e.isCharacterDataNode(k)){g.setEndPoint(c?"EndToStart":"EndToEnd",
a);if(/[\r\n]/.test(k.data)){j=g.duplicate();c=j.text.replace(/\r\n/g,"\r").length;for(c=j.moveStart("character",c);-1==j.compareEndPoints("StartToEnd",j);)c++,j.moveStart("character",1)}else c=g.text.length;j=new f(k,c)}else k=(d||!c)&&b.previousSibling,j=(c=(d||c)&&b.nextSibling)&&e.isCharacterDataNode(c)?new f(c,0):k&&e.isCharacterDataNode(k)?new f(k,k.length):new f(j,e.getNodeIndex(b));b.parentNode.removeChild(b);return j}function a(a,b){var c,d,g=a.offset,j=e.getDocument(a.node),f=j.body.createTextRange(),
h=e.isCharacterDataNode(a.node);h?(c=a.node,d=c.parentNode):(c=a.node.childNodes,c=g<c.length?c[g]:null,d=a.node);j=j.createElement("span");j.innerHTML="&#feff;";c?d.insertBefore(j,c):d.appendChild(j);f.moveToElementText(j);f.collapse(!b);d.removeChild(j);if(h)f[b?"moveStart":"moveEnd"]("character",g);return f}b.requireModules(["DomUtil","DomRange"]);var d,e=b.dom,f=e.DomPosition,h=b.DomRange;if(b.features.implementsDomRange&&(!b.features.implementsTextRange||!b.config.preferTextRange)){var i=function(a){for(var b=
j.length,c;b--;)c=j[b],a[c]=a.nativeRange[c]},g,j=h.rangeProperties,k;d=function(a){if(!a)throw Error("Range must be specified");this.nativeRange=a;i(this)};h.createPrototypeRange(d,function(a,b,c,d,e){var g=a.endContainer!==d||a.endOffset!=e;if(a.startContainer!==b||a.startOffset!=c||g)a.setEnd(d,e),a.setStart(b,c)},function(a){a.nativeRange.detach();a.detached=!0;for(var b=j.length,c;b--;)c=j[b],a[c]=null});g=d.prototype;g.selectNode=function(a){this.nativeRange.selectNode(a);i(this)};g.deleteContents=
function(){this.nativeRange.deleteContents();i(this)};g.extractContents=function(){var a=this.nativeRange.extractContents();i(this);return a};g.cloneContents=function(){return this.nativeRange.cloneContents()};g.surroundContents=function(a){this.nativeRange.surroundContents(a);i(this)};g.collapse=function(a){this.nativeRange.collapse(a);i(this)};g.cloneRange=function(){return new d(this.nativeRange.cloneRange())};g.refresh=function(){i(this)};g.toString=function(){return this.nativeRange.toString()};
var m=document.createTextNode("test");e.getBody(document).appendChild(m);var n=document.createRange();n.setStart(m,0);n.setEnd(m,0);try{n.setStart(m,1),g.setStart=function(a,b){this.nativeRange.setStart(a,b);i(this)},g.setEnd=function(a,b){this.nativeRange.setEnd(a,b);i(this)},k=function(a){return function(b){this.nativeRange[a](b);i(this)}}}catch(v){g.setStart=function(a,b){try{this.nativeRange.setStart(a,b)}catch(c){this.nativeRange.setEnd(a,b),this.nativeRange.setStart(a,b)}i(this)},g.setEnd=function(a,
b){try{this.nativeRange.setEnd(a,b)}catch(c){this.nativeRange.setStart(a,b),this.nativeRange.setEnd(a,b)}i(this)},k=function(a,b){return function(c){try{this.nativeRange[a](c)}catch(d){this.nativeRange[b](c),this.nativeRange[a](c)}i(this)}}}g.setStartBefore=k("setStartBefore","setEndBefore");g.setStartAfter=k("setStartAfter","setEndAfter");g.setEndBefore=k("setEndBefore","setStartBefore");g.setEndAfter=k("setEndAfter","setStartAfter");n.selectNodeContents(m);g.selectNodeContents=n.startContainer==
m&&n.endContainer==m&&0==n.startOffset&&n.endOffset==m.length?function(a){this.nativeRange.selectNodeContents(a);i(this)}:function(a){this.setStart(a,0);this.setEnd(a,h.getEndOffset(a))};n.selectNodeContents(m);n.setEnd(m,3);k=document.createRange();k.selectNodeContents(m);k.setEnd(m,4);k.setStart(m,2);g.compareBoundaryPoints=-1==n.compareBoundaryPoints(n.START_TO_END,k)&1==n.compareBoundaryPoints(n.END_TO_START,k)?function(a,b){b=b.nativeRange||b;a==b.START_TO_END?a=b.END_TO_START:a==b.END_TO_START&&
(a=b.START_TO_END);return this.nativeRange.compareBoundaryPoints(a,b)}:function(a,b){return this.nativeRange.compareBoundaryPoints(a,b.nativeRange||b)};b.util.isHostMethod(n,"createContextualFragment")&&(g.createContextualFragment=function(a){return this.nativeRange.createContextualFragment(a)});e.getBody(document).removeChild(m);n.detach();k.detach();b.createNativeRange=function(a){a=a||document;return a.createRange()}}else b.features.implementsTextRange&&(d=function(a){this.textRange=a;this.refresh()},
d.prototype=new h(document),d.prototype.refresh=function(){var a,b,d=this.textRange;a=d.parentElement();var g=d.duplicate();g.collapse(!0);b=g.parentElement();g=d.duplicate();g.collapse(!1);d=g.parentElement();b=b==d?b:e.getCommonAncestor(b,d);b=b==a?b:e.getCommonAncestor(a,b);0==this.textRange.compareEndPoints("StartToEnd",this.textRange)?b=a=c(this.textRange,b,!0,!0):(a=c(this.textRange,b,!0,!1),b=c(this.textRange,b,!1,!1));this.setStart(a.node,a.offset);this.setEnd(b.node,b.offset)},h.copyComparisonConstants(d),
g=function(){return this}(),"undefined"==typeof g.Range&&(g.Range=d),b.createNativeRange=function(a){a=a||document;return a.body.createTextRange()});b.features.implementsTextRange&&(d.rangeToTextRange=function(b){if(b.collapsed)return a(new f(b.startContainer,b.startOffset),!0);var c=a(new f(b.startContainer,b.startOffset),!0),d=a(new f(b.endContainer,b.endOffset),!1),b=e.getDocument(b.startContainer).body.createTextRange();b.setEndPoint("StartToStart",c);b.setEndPoint("EndToEnd",d);return b});d.prototype.getName=
function(){return"WrappedRange"};b.WrappedRange=d;b.createRange=function(a){a=a||document;return new d(b.createNativeRange(a))};b.createRangyRange=function(a){a=a||document;return new h(a)};b.createIframeRange=function(a){return b.createRange(e.getIframeDocument(a))};b.createIframeRangyRange=function(a){return b.createRangyRange(e.getIframeDocument(a))};b.addCreateMissingNativeApiListener(function(a){a=a.document;"undefined"==typeof a.createRange&&(a.createRange=function(){return b.createRange(this)});
a=a=null})});
rangy.createModule("WrappedSelection",function(b,c){function a(a){return(a||window).getSelection()}function d(a){return(a||window).document.selection}function e(a,b,c){var d=c?"end":"start",c=c?"start":"end";a.anchorNode=b[d+"Container"];a.anchorOffset=b[d+"Offset"];a.focusNode=b[c+"Container"];a.focusOffset=b[c+"Offset"]}function f(a){a.anchorNode=a.focusNode=null;a.anchorOffset=a.focusOffset=0;a.rangeCount=0;a.isCollapsed=!0;a._ranges.length=0}function h(a){var c;a instanceof t?(c=a._selectionNativeRange,
c||(c=b.createNativeRange(p.getDocument(a.startContainer)),c.setEnd(a.endContainer,a.endOffset),c.setStart(a.startContainer,a.startOffset),a._selectionNativeRange=c,a.attachListener("detach",function(){this._selectionNativeRange=null}))):a instanceof q?c=a.nativeRange:b.features.implementsDomRange&&a instanceof p.getWindow(a.startContainer).Range&&(c=a);return c}function i(a){var b=a.getNodes(),c;a:if(!b.length||1!=b[0].nodeType)c=!1;else{c=1;for(var d=b.length;c<d;++c)if(!p.isAncestorOf(b[0],b[c])){c=
!1;break a}c=!0}if(!c)throw Error("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");return b[0]}function g(a,b){var c=new q(b);a._ranges=[c];e(a,c,!1);a.rangeCount=1;a.isCollapsed=c.collapsed}function j(a){a._ranges.length=0;if("None"==a.docSelection.type)f(a);else{var c=a.docSelection.createRange();if(c&&"undefined"!=typeof c.text)g(a,c);else{a.rangeCount=c.length;for(var d,j=p.getDocument(c.item(0)),h=0;h<a.rangeCount;++h)d=b.createRange(j),d.selectNode(c.item(h)),
a._ranges.push(d);a.isCollapsed=1==a.rangeCount&&a._ranges[0].collapsed;e(a,a._ranges[a.rangeCount-1],!1)}}}function k(a,b){for(var c=a.docSelection.createRange(),d=i(b),e=p.getDocument(c.item(0)),e=p.getBody(e).createControlRange(),g=0,f=c.length;g<f;++g)e.add(c.item(g));try{e.add(d)}catch(h){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}e.select();j(a)}function m(a,b,c){this.nativeSelection=a;this.docSelection=b;this._ranges=
[];this.win=c;this.refresh()}function n(a,b){for(var c=p.getDocument(b[0].startContainer),c=p.getBody(c).createControlRange(),d=0,e;d<rangeCount;++d){e=i(b[d]);try{c.add(e)}catch(g){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}c.select();j(a)}function v(a,b){if(a.anchorNode&&p.getDocument(a.anchorNode)!==p.getDocument(b))throw new y("WRONG_DOCUMENT_ERR");}function u(a){var b=[],c=new A(a.anchorNode,a.anchorOffset),
d=new A(a.focusNode,a.focusOffset),e="function"==typeof a.getName?a.getName():"Selection";if("undefined"!=typeof a.rangeCount)for(var g=0,j=a.rangeCount;g<j;++g)b[g]=t.inspect(a.getRangeAt(g));return"["+e+"(Ranges: "+b.join(", ")+")(anchor: "+c.inspect()+", focus: "+d.inspect()+"]"}b.requireModules(["DomUtil","DomRange","WrappedRange"]);b.config.checkSelectionRanges=!0;var p=b.dom,r=b.util,t=b.DomRange,q=b.WrappedRange,y=b.DOMException,A=p.DomPosition,B,D,z=b.util.isHostMethod(window,"getSelection"),
x=b.util.isHostObject(document,"selection"),G=x&&(!z||b.config.preferTextRange);G?(B=d,b.isSelectionValid=function(a){var a=(a||window).document,b=a.selection;return"None"!=b.type||p.getDocument(b.createRange().parentElement())==a}):z?(B=a,b.isSelectionValid=function(){return!0}):c.fail("Neither document.selection or window.getSelection() detected.");b.getNativeSelection=B;var z=B(),Q=b.createNativeRange(document),s=p.getBody(document),J=r.areHostObjects(z,r.areHostProperties(z,["anchorOffset","focusOffset"]));
b.features.selectionHasAnchorAndFocus=J;var N=r.isHostMethod(z,"extend");b.features.selectionHasExtend=N;var R="number"==typeof z.rangeCount;b.features.selectionHasRangeCount=R;var O=!1,w=!0;if(r.areHostMethods(z,["addRange","getRangeAt","removeAllRanges"])&&"number"==typeof z.rangeCount&&b.features.implementsDomRange){var l=document.createElement("iframe");s.appendChild(l);w=p.getIframeDocument(l);w.open();w.write("<html><head></head><body>12</body></html>");w.close();var H=p.getIframeWindow(l).getSelection(),
C=w.documentElement.lastChild.firstChild,E=w.createRange();E.setStart(C,1);E.collapse(!0);H.addRange(E);w=1==H.rangeCount;H.removeAllRanges();var M=E.cloneRange();E.setStart(C,0);M.setEnd(C,2);H.addRange(E);H.addRange(M);O=2==H.rangeCount;E.detach();M.detach();s.removeChild(l)}b.features.selectionSupportsMultipleRanges=O;b.features.collapsedNonEditableSelectionsSupported=w;var F=!1;s&&r.isHostMethod(s,"createControlRange")&&(s=s.createControlRange(),r.areHostProperties(s,["item","add"])&&(F=!0));
b.features.implementsControlRange=F;D=J?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:!1};var P;r.isHostMethod(z,"getRangeAt")?P=function(a,b){try{return a.getRangeAt(b)}catch(c){return null}}:J&&(P=function(a){var c=p.getDocument(a.anchorNode),c=b.createRange(c);c.setStart(a.anchorNode,a.anchorOffset);c.setEnd(a.focusNode,a.focusOffset);c.collapsed!==this.isCollapsed&&(c.setStart(a.focusNode,a.focusOffset),
c.setEnd(a.anchorNode,a.anchorOffset));return c});b.getSelection=function(a){var a=a||window,b=a._rangySelection,c=B(a),e=x?d(a):null;b?(b.nativeSelection=c,b.docSelection=e,b.refresh(a)):(b=new m(c,e,a),a._rangySelection=b);return b};b.getIframeSelection=function(a){return b.getSelection(p.getIframeWindow(a))};s=m.prototype;if(!G&&J&&r.areHostMethods(z,["removeAllRanges","addRange"])){s.removeAllRanges=function(){this.nativeSelection.removeAllRanges();f(this)};var K=function(a,c){var d=t.getRangeDocument(c),
d=b.createRange(d);d.collapseToPoint(c.endContainer,c.endOffset);a.nativeSelection.addRange(h(d));a.nativeSelection.extend(c.startContainer,c.startOffset);a.refresh()};s.addRange=R?function(a,c){if(F&&x&&"Control"==this.docSelection.type)k(this,a);else if(c&&N)K(this,a);else{var d;O?d=this.rangeCount:(this.removeAllRanges(),d=0);this.nativeSelection.addRange(h(a));this.rangeCount=this.nativeSelection.rangeCount;this.rangeCount==d+1?(b.config.checkSelectionRanges&&(d=P(this.nativeSelection,this.rangeCount-
1))&&!t.rangesEqual(d,a)&&(a=new q(d)),this._ranges[this.rangeCount-1]=a,e(this,a,L(this.nativeSelection)),this.isCollapsed=D(this)):this.refresh()}}:function(a,b){b&&N?K(this,a):(this.nativeSelection.addRange(h(a)),this.refresh())};s.setRanges=function(a){if(F&&1<a.length)n(this,a);else{this.removeAllRanges();for(var b=0,c=a.length;b<c;++b)this.addRange(a[b])}}}else if(r.isHostMethod(z,"empty")&&r.isHostMethod(Q,"select")&&F&&G)s.removeAllRanges=function(){try{if(this.docSelection.empty(),"None"!=
this.docSelection.type){var a;if(this.anchorNode)a=p.getDocument(this.anchorNode);else if("Control"==this.docSelection.type){var b=this.docSelection.createRange();b.length&&(a=p.getDocument(b.item(0)).body.createTextRange())}a&&(a.body.createTextRange().select(),this.docSelection.empty())}}catch(c){}f(this)},s.addRange=function(a){"Control"==this.docSelection.type?k(this,a):(q.rangeToTextRange(a).select(),this._ranges[0]=a,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,e(this,a,!1))},
s.setRanges=function(a){this.removeAllRanges();var b=a.length;1<b?n(this,a):b&&this.addRange(a[0])};else return c.fail("No means of selecting a Range or TextRange was found"),!1;s.getRangeAt=function(a){if(0>a||a>=this.rangeCount)throw new y("INDEX_SIZE_ERR");return this._ranges[a]};var I;if(G)I=function(a){var c;b.isSelectionValid(a.win)?c=a.docSelection.createRange():(c=p.getBody(a.win.document).createTextRange(),c.collapse(!0));"Control"==a.docSelection.type?j(a):c&&"undefined"!=typeof c.text?
g(a,c):f(a)};else if(r.isHostMethod(z,"getRangeAt")&&"number"==typeof z.rangeCount)I=function(a){if(F&&x&&"Control"==a.docSelection.type)j(a);else if(a._ranges.length=a.rangeCount=a.nativeSelection.rangeCount,a.rangeCount){for(var c=0,d=a.rangeCount;c<d;++c)a._ranges[c]=new b.WrappedRange(a.nativeSelection.getRangeAt(c));e(a,a._ranges[a.rangeCount-1],L(a.nativeSelection));a.isCollapsed=D(a)}else f(a)};else if(J&&"boolean"==typeof z.isCollapsed&&"boolean"==typeof Q.collapsed&&b.features.implementsDomRange)I=
function(a){var b;b=a.nativeSelection;b.anchorNode?(b=P(b,0),a._ranges=[b],a.rangeCount=1,b=a.nativeSelection,a.anchorNode=b.anchorNode,a.anchorOffset=b.anchorOffset,a.focusNode=b.focusNode,a.focusOffset=b.focusOffset,a.isCollapsed=D(a)):f(a)};else return c.fail("No means of obtaining a Range or TextRange from the user's selection was found"),!1;s.refresh=function(a){var b=a?this._ranges.slice(0):null;I(this);if(a){a=b.length;if(a!=this._ranges.length)return!1;for(;a--;)if(!t.rangesEqual(b[a],this._ranges[a]))return!1;
return!0}};var T=function(a,b){var c=a.getAllRanges(),d=!1;a.removeAllRanges();for(var e=0,g=c.length;e<g;++e)d||b!==c[e]?a.addRange(c[e]):d=!0;a.rangeCount||f(a)};s.removeRange=F?function(a){if("Control"==this.docSelection.type){for(var b=this.docSelection.createRange(),a=i(a),c=p.getDocument(b.item(0)),c=p.getBody(c).createControlRange(),d,e=!1,g=0,f=b.length;g<f;++g)d=b.item(g),d!==a||e?c.add(b.item(g)):e=!0;c.select();j(this)}else T(this,a)}:function(a){T(this,a)};var L;!G&&J&&b.features.implementsDomRange?
(L=function(a){var b=!1;a.anchorNode&&(b=1==p.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset));return b},s.isBackwards=function(){return L(this)}):L=s.isBackwards=function(){return!1};s.toString=function(){for(var a=[],b=0,c=this.rangeCount;b<c;++b)a[b]=""+this._ranges[b];return a.join("")};s.collapse=function(a,c){v(this,a);var d=b.createRange(p.getDocument(a));d.collapseToPoint(a,c);this.removeAllRanges();this.addRange(d);this.isCollapsed=!0};s.collapseToStart=function(){if(this.rangeCount){var a=
this._ranges[0];this.collapse(a.startContainer,a.startOffset)}else throw new y("INVALID_STATE_ERR");};s.collapseToEnd=function(){if(this.rangeCount){var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)}else throw new y("INVALID_STATE_ERR");};s.selectAllChildren=function(a){v(this,a);var c=b.createRange(p.getDocument(a));c.selectNodeContents(a);this.removeAllRanges();this.addRange(c)};s.deleteFromDocument=function(){if(F&&x&&"Control"==this.docSelection.type){for(var a=this.docSelection.createRange(),
b;a.length;)b=a.item(0),a.remove(b),b.parentNode.removeChild(b);this.refresh()}else if(this.rangeCount){a=this.getAllRanges();this.removeAllRanges();b=0;for(var c=a.length;b<c;++b)a[b].deleteContents();this.addRange(a[c-1])}};s.getAllRanges=function(){return this._ranges.slice(0)};s.setSingleRange=function(a){this.setRanges([a])};s.containsNode=function(a,b){for(var c=0,d=this._ranges.length;c<d;++c)if(this._ranges[c].containsNode(a,b))return!0;return!1};s.toHtml=function(){var a="";if(this.rangeCount){for(var a=
t.getRangeDocument(this._ranges[0]).createElement("div"),b=0,c=this._ranges.length;b<c;++b)a.appendChild(this._ranges[b].cloneContents());a=a.innerHTML}return a};s.getName=function(){return"WrappedSelection"};s.inspect=function(){return u(this)};s.detach=function(){this.win=this.anchorNode=this.focusNode=this.win._rangySelection=null};m.inspect=u;b.Selection=m;b.selectionPrototype=s;b.addCreateMissingNativeApiListener(function(a){"undefined"==typeof a.getSelection&&(a.getSelection=function(){return b.getSelection(this)});
a=null})});var Base=function(){};
Base.extend=function(b,c){var a=Base.prototype.extend;Base._prototyping=!0;var d=new this;a.call(d,b);d.base=function(){};delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!=arguments[0])return(arguments[0].extend||a).call(arguments[0],d)};f.ancestor=this;f.extend=this.extend;f.forEach=this.forEach;f.implement=this.implement;f.prototype=
d;f.toString=this.toString;f.valueOf=function(a){return"object"==a?f:e.valueOf()};a.call(f,c);"function"==typeof f.init&&f.init();return f};
Base.prototype={extend:function(b,c){if(1<arguments.length){var a=this[b];if(a&&"function"==typeof c&&(!a.valueOf||a.valueOf()!=c.valueOf())&&/\bbase\b/.test(c)){var d=c.valueOf(),c=function(){var b=this.base||Base.prototype.base;this.base=a;var c=d.apply(this,arguments);this.base=b;return c};c.valueOf=function(a){return"object"==a?c:d};c.toString=Base.toString}this[b]=c}else if(b){var e=Base.prototype.extend;!Base._prototyping&&"function"!=typeof this&&(e=this.extend||e);for(var f={toSource:null},
h=["constructor","toString","valueOf"],i=Base._prototyping?0:1;g=h[i++];)b[g]!=f[g]&&e.call(this,g,b[g]);for(var g in b)f[g]||e.call(this,g,b[g])}return this}};
Base=Base.extend({constructor:function(b){this.extend(b)}},{ancestor:Object,version:"1.1",forEach:function(b,c,a){for(var d in b)void 0===this.prototype[d]&&c.call(a,b[d],d,b)},implement:function(){for(var b=0;b<arguments.length;b++)if("function"==typeof arguments[b])arguments[b](this.prototype);else this.prototype.extend(arguments[b]);return this},toString:function(){return String(this.valueOf())}});
wysihtml5.browser=function(){var b=navigator.userAgent,c=document.createElement("div"),a=-1!==b.indexOf("MSIE")&&-1===b.indexOf("Opera"),d=-1!==b.indexOf("Gecko")&&-1===b.indexOf("KHTML"),e=-1!==b.indexOf("AppleWebKit/"),f=-1!==b.indexOf("Chrome/"),h=-1!==b.indexOf("Opera/"),i={formatBlock:a,insertUnorderedList:a||e,insertOrderedList:a||e},g={insertHTML:d};return{USER_AGENT:b,supported:function(){var a=this.USER_AGENT.toLowerCase(),b="contentEditable"in c,d=document.execCommand&&document.queryCommandSupported&&
document.queryCommandState,e=document.querySelector&&document.querySelectorAll,a=this.isIos()&&5>+(/ipad|iphone|ipod/.test(a)&&a.match(/ os (\d+).+? like mac os x/)||[,0])[1]||this.isAndroid()&&4>+(a.match(/android (\d+)/)||[,0])[1]||-1!==a.indexOf("opera mobi")||-1!==a.indexOf("hpwos/");return b&&d&&e&&!a},isTouchDevice:function(){return this.supportsEvent("touchmove")},isIos:function(){return/ipad|iphone|ipod/i.test(this.USER_AGENT)},isAndroid:function(){return-1!==this.USER_AGENT.indexOf("Android")},
supportsSandboxedIframes:function(){return a},throwsMixedContentWarningWhenIframeSrcIsEmpty:function(){return!("querySelector"in document)},displaysCaretInEmptyContentEditableCorrectly:function(){return a},hasCurrentStyleProperty:function(){return"currentStyle"in c},hasHistoryIssue:function(){return d},insertsLineBreaksOnReturn:function(){return d},supportsPlaceholderAttributeOn:function(a){return"placeholder"in a},supportsEvent:function(a){var b;if(!(b="on"+a in c))c.setAttribute("on"+a,"return;"),
b="function"===typeof c["on"+a];return b},supportsEventsInIframeCorrectly:function(){return!h},supportsHTML5Tags:function(a){a=a.createElement("div");a.innerHTML="<article>foo</article>";return"<article>foo</article>"===a.innerHTML.toLowerCase()},supportsCommand:function(a,b){if(!i[b]){try{return a.queryCommandSupported(b)}catch(c){}try{return a.queryCommandEnabled(b)}catch(d){return!!g[b]}}return!1},doesAutoLinkingInContentEditable:function(){return a},canDisableAutoLinking:function(){return this.supportsCommand(document,
"AutoUrlDetect")},clearsContentEditableCorrectly:function(){return d||h||e},supportsGetAttributeCorrectly:function(){return"1"!=document.createElement("td").getAttribute("rowspan")},canSelectImagesInContentEditable:function(){return d||a||h},autoScrollsToCaret:function(){return!e},autoClosesUnclosedTags:function(){var a=c.cloneNode(!1),b;a.innerHTML="<p><div></div>";a=a.innerHTML.toLowerCase();b="<p></p><div></div>"===a||"<p><div></div></p>"===a;this.autoClosesUnclosedTags=function(){return b};return b},
supportsNativeGetElementsByClassName:function(){return-1!==String(document.getElementsByClassName).indexOf("[native code]")},supportsSelectionModify:function(){return"getSelection"in window&&"modify"in window.getSelection()},needsSpaceAfterLineBreak:function(){return h},supportsSpeechApiOn:function(a){return 11<=(b.match(/Chrome\/(\d+)/)||[,0])[1]&&("onwebkitspeechchange"in a||"speech"in a)},crashesWhenDefineProperty:function(b){return a&&("XMLHttpRequest"===b||"XDomainRequest"===b)},doesAsyncFocus:function(){return a},
hasProblemsSettingCaretAfterImg:function(){return a},hasUndoInContextMenu:function(){return d||f||h},hasInsertNodeIssue:function(){return h},hasIframeFocusIssue:function(){return a}}}();
wysihtml5.lang.array=function(b){return{contains:function(c){if(b.indexOf)return-1!==b.indexOf(c);for(var a=0,d=b.length;a<d;a++)if(b[a]===c)return!0;return!1},without:function(c){for(var c=wysihtml5.lang.array(c),a=[],d=0,e=b.length;d<e;d++)c.contains(b[d])||a.push(b[d]);return a},get:function(){for(var c=0,a=b.length,d=[];c<a;c++)d.push(b[c]);return d}}};
wysihtml5.lang.Dispatcher=Base.extend({on:function(b,c){this.events=this.events||{};this.events[b]=this.events[b]||[];this.events[b].push(c);return this},off:function(b,c){this.events=this.events||{};var a=0,d,e;if(b){d=this.events[b]||[];for(e=[];a<d.length;a++)d[a]!==c&&c&&e.push(d[a]);this.events[b]=e}else this.events={};return this},fire:function(b,c){this.events=this.events||{};for(var a=this.events[b]||[],d=0;d<a.length;d++)a[d].call(this,c);return this},observe:function(){return this.on.apply(this,
arguments)},stopObserving:function(){return this.off.apply(this,arguments)}});wysihtml5.lang.object=function(b){return{merge:function(c){for(var a in c)b[a]=c[a];return this},get:function(){return b},clone:function(){var c={},a;for(a in b)c[a]=b[a];return c},isArray:function(){return"[object Array]"===Object.prototype.toString.call(b)}}};
(function(){var b=/^\s+/,c=/\s+$/;wysihtml5.lang.string=function(a){a=String(a);return{trim:function(){return a.replace(b,"").replace(c,"")},interpolate:function(b){for(var c in b)a=this.replace("#{"+c+"}").by(b[c]);return a},replace:function(b){return{by:function(c){return a.split(b).join(c)}}}}}})();
(function(b){function c(i){if(!a.contains(i.nodeName))if(i.nodeType===b.TEXT_NODE&&i.data.match(d)){var g=i.parentNode,j;j=g.ownerDocument;var k=j._wysihtml5_tempElement;k||(k=j._wysihtml5_tempElement=j.createElement("div"));j=k;j.innerHTML="<span></span>"+i.data.replace(d,function(a,b){var c=(b.match(e)||[])[1]||"",d=h[c],b=b.replace(e,"");b.split(d).length>b.split(c).length&&(b+=c,c="");var g=d=b;b.length>f&&(g=g.substr(0,f)+"...");"www."===d.substr(0,4)&&(d="http://"+d);return'<a href="'+d+'">'+
g+"</a>"+c});for(j.removeChild(j.firstChild);j.firstChild;)g.insertBefore(j.firstChild,i);g.removeChild(i)}else{g=b.lang.array(i.childNodes).get();j=g.length;for(k=0;k<j;k++)c(g[k]);return i}}var a=b.lang.array("CODE PRE A SCRIPT HEAD TITLE STYLE".split(" ")),d=/((https?:\/\/|www\.)[^\s<]{3,})/gi,e=/([^\w\/\-](,?))$/i,f=100,h={")":"(","]":"[","}":"{"};b.dom.autoLink=function(b){var d;a:{d=b;for(var e;d.parentNode;){d=d.parentNode;e=d.nodeName;if(a.contains(e)){d=!0;break a}if("body"===e)break}d=!1}if(d)return b;
b===b.ownerDocument.documentElement&&(b=b.ownerDocument.body);return c(b)};b.dom.autoLink.URL_REG_EXP=d})(wysihtml5);
(function(b){var c=b.dom;c.addClass=function(a,b){var e=a.classList;if(e)return e.add(b);c.hasClass(a,b)||(a.className+=" "+b)};c.removeClass=function(a,b){var c=a.classList;if(c)return c.remove(b);a.className=a.className.replace(RegExp("(^|\\s+)"+b+"(\\s+|$)")," ")};c.hasClass=function(a,b){var c=a.classList;if(c)return c.contains(b);c=a.className;return 0<c.length&&(c==b||RegExp("(^|\\s)"+b+"(\\s|$)").test(c))}})(wysihtml5);
wysihtml5.dom.contains=function(){var b=document.documentElement;if(b.contains)return function(b,a){a.nodeType!==wysihtml5.ELEMENT_NODE&&(a=a.parentNode);return b!==a&&b.contains(a)};if(b.compareDocumentPosition)return function(b,a){return!!(b.compareDocumentPosition(a)&16)}}();
wysihtml5.dom.convertToList=function(){function b(b,a){var d=b.createElement("li");a.appendChild(d);return d}return function(c,a){if("UL"===c.nodeName||"OL"===c.nodeName||"MENU"===c.nodeName)return c;var d=c.ownerDocument,e=d.createElement(a),f=c.querySelectorAll("br"),h=f.length,i,g,j,k,m;for(m=0;m<h;m++)for(i=f[m];(g=i.parentNode)&&g!==c&&g.lastChild===i;){if("block"===wysihtml5.dom.getStyle("display").from(g)){g.removeChild(i);break}wysihtml5.dom.insert(i).after(i.parentNode)}f=wysihtml5.lang.array(c.childNodes).get();
h=f.length;for(m=0;m<h;m++)k=k||b(d,e),i=f[m],g="block"===wysihtml5.dom.getStyle("display").from(i),j="BR"===i.nodeName,g?(k=k.firstChild?b(d,e):k,k.appendChild(i),k=null):j?k=k.firstChild?null:k:k.appendChild(i);0===f.length&&b(d,e);c.parentNode.replaceChild(e,c);return e}}();wysihtml5.dom.copyAttributes=function(b){return{from:function(c){return{to:function(a){for(var d,e=0,f=b.length;e<f;e++)d=b[e],"undefined"!==typeof c[d]&&""!==c[d]&&(a[d]=c[d]);return{andTo:arguments.callee}}}}}};
(function(b){var c=["-webkit-box-sizing","-moz-box-sizing","-ms-box-sizing","box-sizing"];b.copyStyles=function(a){return{from:function(d){var e;b:{e=0;for(var f=c.length;e<f;e++)if("border-box"===b.getStyle(c[e]).from(d)){e=c[e];break b}e=void 0}e=e?parseInt(b.getStyle("width").from(d),10)<d.offsetWidth:!1;e&&(a=wysihtml5.lang.array(a).without(c));var h="";e=a.length;for(var f=0,i;f<e;f++)i=a[f],h+=i+":"+b.getStyle(i).from(d)+";";return{to:function(a){b.setStyles(h).on(a);return{andTo:arguments.callee}}}}}}})(wysihtml5.dom);
(function(b){b.dom.delegate=function(c,a,d,e){return b.dom.observe(c,d,function(d){for(var h=d.target,i=b.lang.array(c.querySelectorAll(a));h&&h!==c;){if(i.contains(h)){e.call(h,d);break}h=h.parentNode}})}})(wysihtml5);
wysihtml5.dom.getAsDom=function(){var b="abbr article aside audio bdi canvas command datalist details figcaption figure footer header hgroup keygen mark meter nav output progress rp rt ruby svg section source summary time track video wbr".split(" ");return function(c,a){var a=a||document,d;if("object"===typeof c&&c.nodeType)d=a.createElement("div"),d.appendChild(c);else if(wysihtml5.browser.supportsHTML5Tags(a))d=a.createElement("div"),d.innerHTML=c;else{d=a;if(!d._wysihtml5_supportsHTML5Tags){for(var e=
0,f=b.length;e<f;e++)d.createElement(b[e]);d._wysihtml5_supportsHTML5Tags=!0}d=a;e=d.createElement("div");e.style.display="none";d.body.appendChild(e);try{e.innerHTML=c}catch(h){}d.body.removeChild(e);d=e}return d}}();
wysihtml5.dom.getParentElement=function(){function b(b,a){return!a||!a.length?!0:"string"===typeof a?b===a:wysihtml5.lang.array(a).contains(b)}return function(c,a,d){d=d||50;if(a.className||a.classRegExp){a:{for(var e=a.nodeName,f=a.className,a=a.classRegExp;d--&&c&&"BODY"!==c.nodeName;){var h;if(h=c.nodeType===wysihtml5.ELEMENT_NODE)if(h=b(c.nodeName,e)){h=f;var i=(c.className||"").match(a)||[];h=!h?!!i.length:i[i.length-1]===h}if(h)break a;c=c.parentNode}c=null}return c}a:{e=a.nodeName;for(f=d;f--&&
c&&"BODY"!==c.nodeName;){if(b(c.nodeName,e))break a;c=c.parentNode}c=null}return c}}();
wysihtml5.dom.getStyle=function(){var b={"float":"styleFloat"in document.createElement("div").style?"styleFloat":"cssFloat"},c=/\-[a-z]/g;return function(a){return{from:function(d){if(d.nodeType===wysihtml5.ELEMENT_NODE){var e=d.ownerDocument,f=b[a]||a.replace(c,function(a){return a.charAt(1).toUpperCase()}),h=d.style,i=d.currentStyle,g=h[f];if(g)return g;if(i)try{return i[f]}catch(j){}var f=e.defaultView||e.parentWindow,e=("height"===a||"width"===a)&&"TEXTAREA"===d.nodeName,k;if(f.getComputedStyle)return e&&
(k=h.overflow,h.overflow="hidden"),d=f.getComputedStyle(d,null).getPropertyValue(a),e&&(h.overflow=k||""),d}}}}}();wysihtml5.dom.hasElementWithTagName=function(){var b={},c=1;return function(a,d){var e=(a._wysihtml5_identifier||(a._wysihtml5_identifier=c++))+":"+d,f=b[e];f||(f=b[e]=a.getElementsByTagName(d));return 0<f.length}}();
(function(b){var c={},a=1;b.dom.hasElementWithClassName=function(d,e){if(!b.browser.supportsNativeGetElementsByClassName())return!!d.querySelector("."+e);var f=(d._wysihtml5_identifier||(d._wysihtml5_identifier=a++))+":"+e,h=c[f];h||(h=c[f]=d.getElementsByClassName(e));return 0<h.length}})(wysihtml5);wysihtml5.dom.insert=function(b){return{after:function(c){c.parentNode.insertBefore(b,c.nextSibling)},before:function(c){c.parentNode.insertBefore(b,c)},into:function(c){c.appendChild(b)}}};
wysihtml5.dom.insertCSS=function(b){b=b.join("\n");return{into:function(c){var a=c.createElement("style");a.type="text/css";a.styleSheet?a.styleSheet.cssText=b:a.appendChild(c.createTextNode(b));var d=c.querySelector("head link");d?d.parentNode.insertBefore(a,d):(c=c.querySelector("head"))&&c.appendChild(a)}}};
wysihtml5.dom.observe=function(b,c,a){for(var c="string"===typeof c?[c]:c,d,e,f=0,h=c.length;f<h;f++)e=c[f],b.addEventListener?b.addEventListener(e,a,!1):(d=function(c){"target"in c||(c.target=c.srcElement);c.preventDefault=c.preventDefault||function(){this.returnValue=!1};c.stopPropagation=c.stopPropagation||function(){this.cancelBubble=!0};a.call(b,c)},b.attachEvent("on"+e,d));return{stop:function(){for(var e,g=0,f=c.length;g<f;g++)e=c[g],b.removeEventListener?b.removeEventListener(e,a,!1):b.detachEvent("on"+
e,d)}}};
wysihtml5.dom.parse=function(){function b(c,e){var g=c.childNodes,f=g.length,j=a[c.nodeType],h=0,k,j=j&&j(c);if(!j)return null;for(h=0;h<f;h++)(k=b(g[h],e))&&j.appendChild(k);return e&&1>=j.childNodes.length&&j.nodeName.toLowerCase()===d&&!j.attributes.length?j.firstChild:j}function c(a,b){var b=b.toLowerCase(),c;if(c="IMG"==a.nodeName)if(c="src"==b){var d;a:{try{d=a.complete&&!a.mozMatchesSelector(":-moz-broken");break a}catch(e){if(a.complete&&"complete"===a.readyState){d=!0;break a}}d=void 0}c=
!0===d}return c?a.src:i&&"outerHTML"in a?-1!=a.outerHTML.toLowerCase().indexOf(" "+b+"=")?a.getAttribute(b):null:a.getAttribute(b)}var a={1:function(a){var b,g,j=h.tags;g=a.nodeName.toLowerCase();b=a.scopeName;if(a._wysihtml5)return null;a._wysihtml5=1;if("wysihtml5-temp"===a.className)return null;b&&"HTML"!=b&&(g=b+":"+g);"outerHTML"in a&&!wysihtml5.browser.autoClosesUnclosedTags()&&("P"===a.nodeName&&"</p>"!==a.outerHTML.slice(-4).toLowerCase())&&(g="div");if(g in j){b=j[g];if(!b||b.remove)return null;
b="string"===typeof b?{rename_tag:b}:b}else if(a.firstChild)b={rename_tag:d};else return null;g=a.ownerDocument.createElement(b.rename_tag||g);var j={},f=b.set_class,k=b.add_class,i=b.set_attributes,m=b.check_attributes,n=h.classes,p=0,t=[];b=[];var u=[],r=[],w;i&&(j=wysihtml5.lang.object(i).clone());if(m)for(w in m)if(i=v[m[w]])i=i(c(a,w)),"string"===typeof i&&(j[w]=i);f&&t.push(f);if(k)for(w in k)if(i=q[k[w]])f=i(c(a,w)),"string"===typeof f&&t.push(f);n["_wysihtml5-temp-placeholder"]=1;(r=a.getAttribute("class"))&&
(t=t.concat(r.split(e)));for(k=t.length;p<k;p++)a=t[p],n[a]&&b.push(a);for(n=b.length;n--;)a=b[n],wysihtml5.lang.array(u).contains(a)||u.unshift(a);u.length&&(j["class"]=u.join(" "));for(w in j)try{g.setAttribute(w,j[w])}catch(l){}j.src&&("undefined"!==typeof j.width&&g.setAttribute("width",j.width),"undefined"!==typeof j.height&&g.setAttribute("height",j.height));return g},3:function(a){return a.ownerDocument.createTextNode(a.data)}},d="span",e=/\s+/,f={tags:{},classes:{}},h={},i=!wysihtml5.browser.supportsGetAttributeCorrectly(),
g=/^https?:\/\//i,j=/^(\/|https?:\/\/)/i,k=/^(\/|https?:\/\/|mailto:)/i,m=/[^ a-z0-9_\-]/gi,n=/\D/g,v={url:function(a){return!a||!a.match(g)?null:a.replace(g,function(a){return a.toLowerCase()})},src:function(a){return!a||!a.match(j)?null:a.replace(j,function(a){return a.toLowerCase()})},href:function(a){return!a||!a.match(k)?null:a.replace(k,function(a){return a.toLowerCase()})},alt:function(a){return!a?"":a.replace(m,"")},numbers:function(a){return(a=(a||"").replace(n,""))||null}},u={left:"wysiwyg-float-left",
right:"wysiwyg-float-right"},p={left:"wysiwyg-text-align-left",right:"wysiwyg-text-align-right",center:"wysiwyg-text-align-center",justify:"wysiwyg-text-align-justify"},r={left:"wysiwyg-clear-left",right:"wysiwyg-clear-right",both:"wysiwyg-clear-both",all:"wysiwyg-clear-both"},t={1:"wysiwyg-font-size-xx-small",2:"wysiwyg-font-size-small",3:"wysiwyg-font-size-medium",4:"wysiwyg-font-size-large",5:"wysiwyg-font-size-x-large",6:"wysiwyg-font-size-xx-large",7:"wysiwyg-font-size-xx-large","-":"wysiwyg-font-size-smaller",
"+":"wysiwyg-font-size-larger"},q={align_img:function(a){return u[String(a).toLowerCase()]},align_text:function(a){return p[String(a).toLowerCase()]},clear_br:function(a){return r[String(a).toLowerCase()]},size_font:function(a){return t[String(a).charAt(0)]}};return function(a,c,d,e){wysihtml5.lang.object(h).merge(f).merge(c).get();for(var d=d||a.ownerDocument||document,c=d.createDocumentFragment(),g="string"===typeof a,a=g?wysihtml5.dom.getAsDom(a,d):a;a.firstChild;)d=a.firstChild,a.removeChild(d),
(d=b(d,e))&&c.appendChild(d);a.innerHTML="";a.appendChild(c);return g?wysihtml5.quirks.getCorrectInnerHTML(a):a}}();wysihtml5.dom.removeEmptyTextNodes=function(b){for(var c=wysihtml5.lang.array(b.childNodes).get(),a=c.length,d=0;d<a;d++)b=c[d],b.nodeType===wysihtml5.TEXT_NODE&&""===b.data&&b.parentNode.removeChild(b)};
wysihtml5.dom.renameElement=function(b,c){for(var a=b.ownerDocument.createElement(c),d;d=b.firstChild;)a.appendChild(d);wysihtml5.dom.copyAttributes(["align","className"]).from(b).to(a);b.parentNode.replaceChild(a,b);return a};wysihtml5.dom.replaceWithChildNodes=function(b){if(b.parentNode)if(b.firstChild){for(var c=b.ownerDocument.createDocumentFragment();b.firstChild;)c.appendChild(b.firstChild);b.parentNode.replaceChild(c,b)}else b.parentNode.removeChild(b)};
(function(b){function c(a){var b=a.ownerDocument.createElement("br");a.appendChild(b)}b.resolveList=function(a,d){if(a.nodeName.match(/^(MENU|UL|OL)$/)){var e=a.ownerDocument,f=e.createDocumentFragment(),h=a.previousElementSibling||a.previousSibling,i,g;if(d)for(h&&"block"!==b.getStyle("display").from(h)&&c(f);g=a.firstElementChild||a.firstChild;){for(e=g.lastChild;h=g.firstChild;)i=(i=h===e)&&"block"!==b.getStyle("display").from(h)&&"BR"!==h.nodeName,f.appendChild(h),i&&c(f);g.parentNode.removeChild(g)}else for(;g=
a.firstElementChild||a.firstChild;){if(g.querySelector&&g.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6"))for(;h=g.firstChild;)f.appendChild(h);else{for(i=e.createElement("p");h=g.firstChild;)i.appendChild(h);f.appendChild(i)}g.parentNode.removeChild(g)}a.parentNode.replaceChild(f,a)}}})(wysihtml5.dom);
(function(b){var c=document,a="parent top opener frameElement frames localStorage globalStorage sessionStorage indexedDB".split(" "),d="open close openDialog showModalDialog alert confirm prompt openDatabase postMessage XMLHttpRequest XDomainRequest".split(" "),e=["referrer","write","open","close"];b.dom.Sandbox=Base.extend({constructor:function(a,c){this.callback=a||b.EMPTY_FUNCTION;this.config=b.lang.object({}).merge(c).get();this.iframe=this._createIframe()},insertInto:function(a){"string"===typeof a&&
(a=c.getElementById(a));a.appendChild(this.iframe)},getIframe:function(){return this.iframe},getWindow:function(){this._readyError()},getDocument:function(){this._readyError()},destroy:function(){var a=this.getIframe();a.parentNode.removeChild(a)},_readyError:function(){throw Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet");},_createIframe:function(){var a=this,d=c.createElement("iframe");d.className="wysihtml5-sandbox";b.dom.setAttributes({security:"restricted",allowtransparency:"true",
frameborder:0,width:0,height:0,marginwidth:0,marginheight:0}).on(d);b.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()&&(d.src="javascript:'<html></html>'");d.onload=function(){d.onreadystatechange=d.onload=null;a._onLoadIframe(d)};d.onreadystatechange=function(){/loaded|complete/.test(d.readyState)&&(d.onreadystatechange=d.onload=null,a._onLoadIframe(d))};return d},_onLoadIframe:function(f){if(b.dom.contains(c.documentElement,f)){var h=this,i=f.contentWindow,g=f.contentWindow.document,j=this._getHtml({charset:c.characterSet||
c.charset||"utf-8",stylesheets:this.config.stylesheets});g.open("text/html","replace");g.write(j);g.close();this.getWindow=function(){return f.contentWindow};this.getDocument=function(){return f.contentWindow.document};i.onerror=function(a,b,c){throw Error("wysihtml5.Sandbox: "+a,b,c);};if(!b.browser.supportsSandboxedIframes()){var k,j=0;for(k=a.length;j<k;j++)this._unset(i,a[j]);j=0;for(k=d.length;j<k;j++)this._unset(i,d[j],b.EMPTY_FUNCTION);j=0;for(k=e.length;j<k;j++)this._unset(g,e[j]);this._unset(g,
"cookie","",!0)}this.loaded=!0;setTimeout(function(){h.callback(h)},0)}},_getHtml:function(a){var c=a.stylesheets,d="",e=0,j;if(c="string"===typeof c?[c]:c)for(j=c.length;e<j;e++)d+='<link rel="stylesheet" href="'+c[e]+'">';a.stylesheets=d;return b.lang.string('<!DOCTYPE html><html><head><meta charset="#{charset}">#{stylesheets}</head><body></body></html>').interpolate(a)},_unset:function(a,c,d,e){try{a[c]=d}catch(j){}try{a.__defineGetter__(c,function(){return d})}catch(k){}if(e)try{a.__defineSetter__(c,
function(){})}catch(m){}if(!b.browser.crashesWhenDefineProperty(c))try{var n={get:function(){return d}};e&&(n.set=function(){});Object.defineProperty(a,c,n)}catch(v){}}})})(wysihtml5);(function(){var b={className:"class"};wysihtml5.dom.setAttributes=function(c){return{on:function(a){for(var d in c)a.setAttribute(b[d]||d,c[d])}}}})();
wysihtml5.dom.setStyles=function(b){return{on:function(c){c=c.style;if("string"===typeof b)c.cssText+=";"+b;else for(var a in b)"float"===a?(c.cssFloat=b[a],c.styleFloat=b[a]):c[a]=b[a]}}};
(function(b){b.simulatePlaceholder=function(c,a,d){var e=function(){a.hasPlaceholderSet()&&a.clear();a.placeholderSet=!1;b.removeClass(a.element,"placeholder")},f=function(){a.isEmpty()&&(a.placeholderSet=!0,a.setValue(d),b.addClass(a.element,"placeholder"))};c.on("set_placeholder",f).on("unset_placeholder",e).on("focus:composer",e).on("paste:composer",e).on("blur:composer",f);f()}})(wysihtml5.dom);
(function(b){var c=document.documentElement;"textContent"in c?(b.setTextContent=function(a,b){a.textContent=b},b.getTextContent=function(a){return a.textContent}):"innerText"in c?(b.setTextContent=function(a,b){a.innerText=b},b.getTextContent=function(a){return a.innerText}):(b.setTextContent=function(a,b){a.nodeValue=b},b.getTextContent=function(a){return a.nodeValue})})(wysihtml5.dom);
wysihtml5.quirks.cleanPastedHTML=function(){var b={"a u":wysihtml5.dom.replaceWithChildNodes};return function(c,a,d){var a=a||b,d=d||c.ownerDocument||document,e="string"===typeof c,f,h,i,g=0,c=e?wysihtml5.dom.getAsDom(c,d):c;for(i in a){f=c.querySelectorAll(i);d=a[i];for(h=f.length;g<h;g++)d(f[g])}return e?c.innerHTML:c}}();
wysihtml5.quirks.ensureProperClearing=function(){var b=function(){var b=this;setTimeout(function(){var a=b.innerHTML.toLowerCase();if("<p>&nbsp;</p>"==a||"<p>&nbsp;</p><p>&nbsp;</p>"==a)b.innerHTML=""},0)};return function(c){wysihtml5.dom.observe(c.element,["cut","keydown"],b)}}();
(function(b){b.quirks.getCorrectInnerHTML=function(c){var a=c.innerHTML;if(-1===a.indexOf("%7E"))return a;var c=c.querySelectorAll("[href*='~'], [src*='~']"),d,e,f,h;h=0;for(f=c.length;h<f;h++)d=c[h].href||c[h].src,e=b.lang.string(d).replace("~").by("%7E"),a=b.lang.string(a).replace(e).by(d);return a}})(wysihtml5);
(function(b){b.quirks.redraw=function(c){b.dom.addClass(c,"wysihtml5-quirks-redraw");b.dom.removeClass(c,"wysihtml5-quirks-redraw");try{var a=c.ownerDocument;a.execCommand("italic",!1,null);a.execCommand("italic",!1,null)}catch(d){}}})(wysihtml5);
(function(b){var c=b.dom;b.Selection=Base.extend({constructor:function(a){window.rangy.init();this.editor=a;this.composer=a.composer;this.doc=this.composer.doc},getBookmark:function(){var a=this.getRange();return a&&a.cloneRange()},setBookmark:function(a){a&&this.setSelection(a)},setBefore:function(a){var b=rangy.createRange(this.doc);b.setStartBefore(a);b.setEndBefore(a);return this.setSelection(b)},setAfter:function(a){var b=rangy.createRange(this.doc);b.setStartAfter(a);b.setEndAfter(a);return this.setSelection(b)},
selectNode:function(a,d){var e=rangy.createRange(this.doc),f=a.nodeType===b.ELEMENT_NODE,h="canHaveHTML"in a?a.canHaveHTML:"IMG"!==a.nodeName,i=f?a.innerHTML:a.data,i=""===i||i===b.INVISIBLE_SPACE,g=c.getStyle("display").from(a),g="block"===g||"list-item"===g;if(i&&f&&h&&!d)try{a.innerHTML=b.INVISIBLE_SPACE}catch(j){}h?e.selectNodeContents(a):e.selectNode(a);h&&i&&f?e.collapse(g):h&&i&&(e.setStartAfter(a),e.setEndAfter(a));this.setSelection(e)},getSelectedNode:function(a){if(a&&this.doc.selection&&
"Control"===this.doc.selection.type&&(a=this.doc.selection.createRange())&&a.length)return a.item(0);a=this.getSelection(this.doc);return a.focusNode===a.anchorNode?a.focusNode:(a=this.getRange(this.doc))?a.commonAncestorContainer:this.doc.body},executeAndRestore:function(a,d){var e=this.doc.body,f=d&&e.scrollTop,h=d&&e.scrollLeft,i='<span class="_wysihtml5-temp-placeholder">'+b.INVISIBLE_SPACE+"</span>",g=this.getRange(this.doc),j;if(g){b.browser.hasInsertNodeIssue()?this.doc.execCommand("insertHTML",
!1,i):(i=g.createContextualFragment(i),g.insertNode(i));try{a(g.startContainer,g.endContainer)}catch(k){setTimeout(function(){throw k;},0)}(g=this.doc.querySelector("._wysihtml5-temp-placeholder"))?(i=rangy.createRange(this.doc),j=g.nextSibling,b.browser.hasInsertNodeIssue()&&j&&"BR"===j.nodeName?(j=this.doc.createTextNode(b.INVISIBLE_SPACE),c.insert(j).after(g),i.setStartBefore(j),i.setEndBefore(j)):(i.selectNode(g),i.deleteContents()),this.setSelection(i)):e.focus();d&&(e.scrollTop=f,e.scrollLeft=
h);try{g.parentNode.removeChild(g)}catch(m){}}else a(e,e)},executeAndRestoreSimple:function(a){var b,c,f=this.getRange(),h=this.doc.body,i;if(f){b=f.getNodes([3]);h=b[0]||f.startContainer;i=b[b.length-1]||f.endContainer;b=h===f.startContainer?f.startOffset:0;c=i===f.endContainer?f.endOffset:i.length;try{a(f.startContainer,f.endContainer)}catch(g){setTimeout(function(){throw g;},0)}a=rangy.createRange(this.doc);try{a.setStart(h,b)}catch(j){}try{a.setEnd(i,c)}catch(k){}try{this.setSelection(a)}catch(m){}}else a(h,
h)},set:function(a,b){var c=rangy.createRange(this.doc);c.setStart(a,b||0);this.setSelection(c)},insertHTML:function(a){var a=rangy.createRange(this.doc).createContextualFragment(a),b=a.lastChild;this.insertNode(a);b&&this.setAfter(b)},insertNode:function(a){var b=this.getRange();b&&b.insertNode(a)},surround:function(a){var b=this.getRange();if(b)try{b.surroundContents(a),this.selectNode(a)}catch(c){a.appendChild(b.extractContents()),b.insertNode(a)}},scrollIntoView:function(){var a=this.doc,c=a.documentElement.scrollHeight>
a.documentElement.offsetHeight,e;if(!(e=a._wysihtml5ScrollIntoViewElement))e=a.createElement("span"),e.innerHTML=b.INVISIBLE_SPACE;e=a._wysihtml5ScrollIntoViewElement=e;if(c){this.insertNode(e);var c=e,f=0;if(c.parentNode){do f+=c.offsetTop||0,c=c.offsetParent;while(c)}c=f;e.parentNode.removeChild(e);c>=a.body.scrollTop+a.documentElement.offsetHeight-5&&(a.body.scrollTop=c)}},selectLine:function(){b.browser.supportsSelectionModify()?this._selectLine_W3C():this.doc.selection&&this._selectLine_MSIE()},
_selectLine_W3C:function(){var a=this.doc.defaultView.getSelection();a.modify("extend","left","lineboundary");a.modify("extend","right","lineboundary")},_selectLine_MSIE:function(){var a=this.doc.selection.createRange(),b=a.boundingTop,c=this.doc.body.scrollWidth,f;if(a.moveToPoint){0===b&&(f=this.doc.createElement("span"),this.insertNode(f),b=f.offsetTop,f.parentNode.removeChild(f));b+=1;for(f=-10;f<c;f+=2)try{a.moveToPoint(f,b);break}catch(h){}for(f=this.doc.selection.createRange();0<=c;c--)try{f.moveToPoint(c,
b);break}catch(i){}a.setEndPoint("EndToEnd",f);a.select()}},getText:function(){var a=this.getSelection();return a?a.toString():""},getNodes:function(a,b){var c=this.getRange();return c?c.getNodes([a],b):[]},getRange:function(){var a=this.getSelection();return a&&a.rangeCount&&a.getRangeAt(0)},getSelection:function(){return rangy.getSelection(this.doc.defaultView||this.doc.parentWindow)},setSelection:function(a){return rangy.getSelection(this.doc.defaultView||this.doc.parentWindow).setSingleRange(a)}})})(wysihtml5);
(function(b,c){function a(a,b){return c.dom.isCharacterDataNode(a)?0==b?!!a.previousSibling:b==a.length?!!a.nextSibling:!0:0<b&&b<a.childNodes.length}function d(a,b,e){var f;c.dom.isCharacterDataNode(b)&&(0==e?(e=c.dom.getNodeIndex(b),b=b.parentNode):e==b.length?(e=c.dom.getNodeIndex(b)+1,b=b.parentNode):f=c.dom.splitDataNode(b,e));if(!f){f=b.cloneNode(!1);f.id&&f.removeAttribute("id");for(var h;h=b.childNodes[e];)f.appendChild(h);c.dom.insertAfter(f,b)}return b==a?f:d(a,f.parentNode,c.dom.getNodeIndex(f))}
function e(a){this.firstTextNode=(this.isElementMerge=a.nodeType==b.ELEMENT_NODE)?a.lastChild:a;this.textNodes=[this.firstTextNode]}function f(a,b,c,d){this.tagNames=a||[h];this.cssClass=b||"";this.similarClassRegExp=c;this.normalize=d;this.applyToAnyTagName=!1}var h="span",i=/\s+/g;e.prototype={doMerge:function(){for(var a=[],b,c,d=0,e=this.textNodes.length;d<e;++d)b=this.textNodes[d],c=b.parentNode,a[d]=b.data,d&&(c.removeChild(b),c.hasChildNodes()||c.parentNode.removeChild(c));return this.firstTextNode.data=
a=a.join("")},getLength:function(){for(var a=this.textNodes.length,b=0;a--;)b+=this.textNodes[a].length;return b},toString:function(){for(var a=[],b=0,c=this.textNodes.length;b<c;++b)a[b]="'"+this.textNodes[b].data+"'";return"[Merge("+a.join(",")+")]"}};f.prototype={getAncestorWithClass:function(a){for(var d;a;){if(this.cssClass)if(d=this.cssClass,a.className){var e=a.className.match(this.similarClassRegExp)||[];d=e[e.length-1]===d}else d=!1;else d=!0;if(a.nodeType==b.ELEMENT_NODE&&c.dom.arrayContains(this.tagNames,
a.tagName.toLowerCase())&&d)return a;a=a.parentNode}return!1},postApply:function(a,b){for(var c=a[0],d=a[a.length-1],f=[],h,i=c,p=d,r=0,t=d.length,q,y,A=0,B=a.length;A<B;++A)q=a[A],(y=this.getAdjacentMergeableTextNode(q.parentNode,!1))?(h||(h=new e(y),f.push(h)),h.textNodes.push(q),q===c&&(i=h.firstTextNode,r=i.length),q===d&&(p=h.firstTextNode,t=h.getLength())):h=null;if(c=this.getAdjacentMergeableTextNode(d.parentNode,!0))h||(h=new e(d),f.push(h)),h.textNodes.push(c);if(f.length){A=0;for(B=f.length;A<
B;++A)f[A].doMerge();b.setStart(i,r);b.setEnd(p,t)}},getAdjacentMergeableTextNode:function(a,c){var d=a.nodeType==b.TEXT_NODE,e=d?a.parentNode:a,f=c?"nextSibling":"previousSibling";if(d){if((d=a[f])&&d.nodeType==b.TEXT_NODE)return d}else if((d=e[f])&&this.areElementsMergeable(a,d))return d[c?"firstChild":"lastChild"];return null},areElementsMergeable:function(a,b){var d;if(d=c.dom.arrayContains(this.tagNames,(a.tagName||"").toLowerCase()))if(d=c.dom.arrayContains(this.tagNames,(b.tagName||"").toLowerCase()))if(d=
a.className.replace(i," ")==b.className.replace(i," "))a:if(a.attributes.length!=b.attributes.length)d=!1;else{d=0;for(var e=a.attributes.length,f,h;d<e;++d)if(f=a.attributes[d],h=f.name,"class"!=h&&(h=b.attributes.getNamedItem(h),f.specified!=h.specified||f.specified&&f.nodeValue!==h.nodeValue)){d=!1;break a}d=!0}return d},createContainer:function(a){a=a.createElement(this.tagNames[0]);this.cssClass&&(a.className=this.cssClass);return a},applyToTextNode:function(a){var b=a.parentNode;1==b.childNodes.length&&
c.dom.arrayContains(this.tagNames,b.tagName.toLowerCase())?this.cssClass&&(a=this.cssClass,b.className?(b.className&&(b.className=b.className.replace(this.similarClassRegExp,"")),b.className+=" "+a):b.className=a):(b=this.createContainer(c.dom.getDocument(a)),a.parentNode.insertBefore(b,a),b.appendChild(a))},isRemovable:function(a){return c.dom.arrayContains(this.tagNames,a.tagName.toLowerCase())&&b.lang.string(a.className).trim()==this.cssClass},undoToTextNode:function(b,c,e){c.containsNode(e)||
(b=c.cloneRange(),b.selectNode(e),b.isPointInRange(c.endContainer,c.endOffset)&&a(c.endContainer,c.endOffset)&&(d(e,c.endContainer,c.endOffset),c.setEndAfter(e)),b.isPointInRange(c.startContainer,c.startOffset)&&a(c.startContainer,c.startOffset)&&(e=d(e,c.startContainer,c.startOffset)));this.similarClassRegExp&&e.className&&(e.className=e.className.replace(this.similarClassRegExp,""));if(this.isRemovable(e)){c=e;for(e=c.parentNode;c.firstChild;)e.insertBefore(c.firstChild,c);e.removeChild(c)}},applyToRange:function(a){var c=
a.getNodes([b.TEXT_NODE]);if(!c.length)try{var d=this.createContainer(a.endContainer.ownerDocument);a.surroundContents(d);this.selectNode(a,d);return}catch(e){}a.splitBoundaries();c=a.getNodes([b.TEXT_NODE]);if(c.length){for(var f=0,h=c.length;f<h;++f)d=c[f],this.getAncestorWithClass(d)||this.applyToTextNode(d);a.setStart(c[0],0);d=c[c.length-1];a.setEnd(d,d.length);this.normalize&&this.postApply(c,a)}},undoToRange:function(a){var c=a.getNodes([b.TEXT_NODE]),d,e;c.length?(a.splitBoundaries(),c=a.getNodes([b.TEXT_NODE])):
(c=a.endContainer.ownerDocument.createTextNode(b.INVISIBLE_SPACE),a.insertNode(c),a.selectNode(c),c=[c]);for(var f=0,h=c.length;f<h;++f)d=c[f],(e=this.getAncestorWithClass(d))&&this.undoToTextNode(d,a,e);1==h?this.selectNode(a,c[0]):(a.setStart(c[0],0),d=c[c.length-1],a.setEnd(d,d.length),this.normalize&&this.postApply(c,a))},selectNode:function(a,c){var d=c.nodeType===b.ELEMENT_NODE,e="canHaveHTML"in c?c.canHaveHTML:!0,f=d?c.innerHTML:c.data;if((f=""===f||f===b.INVISIBLE_SPACE)&&d&&e)try{c.innerHTML=
b.INVISIBLE_SPACE}catch(h){}a.selectNodeContents(c);f&&d?a.collapse(!1):f&&(a.setStartAfter(c),a.setEndAfter(c))},getTextSelectedByRange:function(a,b){var c=b.cloneRange();c.selectNodeContents(a);var d=c.intersection(b),d=d?d.toString():"";c.detach();return d},isAppliedToRange:function(a){var c=[],d,e=a.getNodes([b.TEXT_NODE]);if(!e.length)return(d=this.getAncestorWithClass(a.startContainer))?[d]:!1;for(var f=0,h=e.length,i;f<h;++f){i=this.getTextSelectedByRange(e[f],a);d=this.getAncestorWithClass(e[f]);
if(""!=i&&!d)return!1;c.push(d)}return c},toggleRange:function(a){this.isAppliedToRange(a)?this.undoToRange(a):this.applyToRange(a)}};b.selection.HTMLApplier=f})(wysihtml5,rangy);
wysihtml5.Commands=Base.extend({constructor:function(b){this.editor=b;this.composer=b.composer;this.doc=this.composer.doc},support:function(b){return wysihtml5.browser.supportsCommand(this.doc,b)},exec:function(b,c){var a=wysihtml5.commands[b],d=wysihtml5.lang.array(arguments).get(),e=a&&a.exec,f=null;this.editor.fire("beforecommand:composer");if(e)d.unshift(this.composer),f=e.apply(a,d);else try{f=this.doc.execCommand(b,!1,c)}catch(h){}this.editor.fire("aftercommand:composer");return f},state:function(b,
c){var a=wysihtml5.commands[b],d=wysihtml5.lang.array(arguments).get(),e=a&&a.state;if(e)return d.unshift(this.composer),e.apply(a,d);try{return this.doc.queryCommandState(b)}catch(f){return!1}}});wysihtml5.commands.bold={exec:function(b,c){return wysihtml5.commands.formatInline.exec(b,c,"b")},state:function(b,c){return wysihtml5.commands.formatInline.state(b,c,"b")}};
(function(b){var c=b.dom;b.commands.createLink={exec:function(a,d,e){var f=this.state(a,d);if(f)a.selection.executeAndRestore(function(){for(var a=f.length,b=0,d,e,g;b<a;b++)d=f[b],e=c.getParentElement(d,{nodeName:"code"}),g=c.getTextContent(d),g.match(c.autoLink.URL_REG_EXP)&&!e?c.renameElement(d,"code"):c.replaceWithChildNodes(d)});else{var d=e="object"===typeof e?e:{href:e},e=a.doc,h="_wysihtml5-temp-"+ +new Date,i=0,g,j,k;b.commands.formatInline.exec(a,void 0,"A",h,/non-matching-class/g);g=e.querySelectorAll("A."+
h);for(h=g.length;i<h;i++)for(k in j=g[i],j.removeAttribute("class"),d)j.setAttribute(k,d[k]);k=j;1===h&&(h=c.getTextContent(j),i=!!j.querySelector("*"),h=""===h||h===b.INVISIBLE_SPACE,!i&&h&&(c.setTextContent(j,d.text||j.href),d=e.createTextNode(" "),a.selection.setAfter(j),c.insert(d).after(j),k=d));a.selection.setAfter(k)}},state:function(a,c){return b.commands.formatInline.state(a,c,"A")}}})(wysihtml5);
(function(b){var c=/wysiwyg-font-size-[0-9a-z\-]+/g;b.commands.fontSize={exec:function(a,d,e){return b.commands.formatInline.exec(a,d,"span","wysiwyg-font-size-"+e,c)},state:function(a,d,e){return b.commands.formatInline.state(a,d,"span","wysiwyg-font-size-"+e,c)},value:function(){}}})(wysihtml5);
(function(b){var c=/wysiwyg-color-[0-9a-z]+/g;b.commands.foreColor={exec:function(a,d,e){return b.commands.formatInline.exec(a,d,"span","wysiwyg-color-"+e,c)},state:function(a,d,e){return b.commands.formatInline.state(a,d,"span","wysiwyg-color-"+e,c)}}})(wysihtml5);
(function(b){function c(a){for(a=a.previousSibling;a&&a.nodeType===b.TEXT_NODE&&!b.lang.string(a.data).trim();)a=a.previousSibling;return a}function a(a){for(a=a.nextSibling;a&&a.nodeType===b.TEXT_NODE&&!b.lang.string(a.data).trim();)a=a.nextSibling;return a}function d(a){return"BR"===a.nodeName||"block"===e.getStyle("display").from(a)?!0:!1}var e=b.dom,f="H1 H2 H3 H4 H5 H6 P BLOCKQUOTE DIV".split(" ");b.commands.formatBlock={exec:function(h,i,g,j,k){var m=h.doc,n=this.state(h,i,g,j,k),v=h.config.useLineBreaks,
u=v?"DIV":"P",p,g="string"===typeof g?g.toUpperCase():g;if(n)h.selection.executeAndRestoreSimple(function(){k&&(n.className=n.className.replace(k,""));if(!b.lang.string(n.className).trim()&&(v||"P"===g)){var f=n,h=f.ownerDocument,j=a(f),i=c(f);j&&!d(j)&&f.parentNode.insertBefore(h.createElement("br"),j);i&&!d(i)&&f.parentNode.insertBefore(h.createElement("br"),f);e.replaceWithChildNodes(n)}else e.renameElement(n,"P"===g?"DIV":u)});else{if(null===g||b.lang.array(f).contains(g))if(p=h.selection.getSelectedNode(),
n=e.getParentElement(p,{nodeName:f})){h.selection.executeAndRestore(function(){g&&(n=e.renameElement(n,g));if(j){var a=n;a.className?(a.className=a.className.replace(k,""),a.className+=" "+j):a.className=j}});return}if(h.commands.support(i)){h=g||u;if(j)var r=e.observe(m,"DOMNodeInserted",function(a){var a=a.target,c;a.nodeType===b.ELEMENT_NODE&&(c=e.getStyle("display").from(a),"inline"!==c.substr(0,6)&&(a.className+=" "+j))});m.execCommand(i,!1,h);r&&r.stop()}else n=m.createElement(g||u),j&&(n.className=
j),i=n,h.selection.selectLine(),h.selection.surround(i),m=a(i),r=c(i),m&&"BR"===m.nodeName&&m.parentNode.removeChild(m),r&&"BR"===r.nodeName&&r.parentNode.removeChild(r),(m=i.lastChild)&&"BR"===m.nodeName&&m.parentNode.removeChild(m),h.selection.selectNode(i,b.browser.displaysCaretInEmptyContentEditableCorrectly())}},state:function(a,b,c,d,f){c="string"===typeof c?c.toUpperCase():c;a=a.selection.getSelectedNode();return e.getParentElement(a,{nodeName:c,className:d,classRegExp:f})}}})(wysihtml5);
(function(b){function c(c,f,h){var i=c+":"+f;if(!d[i]){var g=d,j=b.selection.HTMLApplier,k=a[c],c=k?[c.toLowerCase(),k.toLowerCase()]:[c.toLowerCase()];g[i]=new j(c,f,h,!0)}return d[i]}var a={strong:"b",em:"i",b:"strong",i:"em"},d={};b.commands.formatInline={exec:function(a,b,d,i,g){b=a.selection.getRange();if(!b)return!1;c(d,i,g).toggleRange(b);a.selection.setSelection(b)},state:function(d,f,h,i,g){var f=d.doc,j=a[h]||h;if(!b.dom.hasElementWithTagName(f,h)&&!b.dom.hasElementWithTagName(f,j)||i&&
!b.dom.hasElementWithClassName(f,i))return!1;d=d.selection.getRange();return!d?!1:c(h,i,g).isAppliedToRange(d)}}})(wysihtml5);wysihtml5.commands.insertHTML={exec:function(b,c,a){b.commands.support(c)?b.doc.execCommand(c,!1,a):b.selection.insertHTML(a)},state:function(){return!1}};
(function(b){b.commands.insertImage={exec:function(c,a,d){var d="object"===typeof d?d:{src:d},e=c.doc,a=this.state(c),f;if(a)c.selection.setBefore(a),d=a.parentNode,d.removeChild(a),b.dom.removeEmptyTextNodes(d),"A"===d.nodeName&&!d.firstChild&&(c.selection.setAfter(d),d.parentNode.removeChild(d)),b.quirks.redraw(c.element);else{a=e.createElement("IMG");for(f in d)"className"===f&&(f="class"),a.setAttribute(f,d[f]);c.selection.insertNode(a);b.browser.hasProblemsSettingCaretAfterImg()?(d=e.createTextNode(b.INVISIBLE_SPACE),
c.selection.insertNode(d),c.selection.setAfter(d)):c.selection.setAfter(a)}},state:function(c){var a;if(!b.dom.hasElementWithTagName(c.doc,"IMG"))return!1;a=c.selection.getSelectedNode();if(!a)return!1;if("IMG"===a.nodeName)return a;if(a.nodeType!==b.ELEMENT_NODE)return!1;a=c.selection.getText();if(a=b.lang.string(a).trim())return!1;c=c.selection.getNodes(b.ELEMENT_NODE,function(a){return"IMG"===a.nodeName});return 1!==c.length?!1:c[0]}}})(wysihtml5);
(function(b){var c="<br>"+(b.browser.needsSpaceAfterLineBreak()?" ":"");b.commands.insertLineBreak={exec:function(a,d){a.commands.support(d)?(a.doc.execCommand(d,!1,null),b.browser.autoScrollsToCaret()||a.selection.scrollIntoView()):a.commands.exec("insertHTML",c)},state:function(){return!1}}})(wysihtml5);
wysihtml5.commands.insertOrderedList={exec:function(b,c){var a=b.doc,d=b.selection.getSelectedNode(),e=wysihtml5.dom.getParentElement(d,{nodeName:"OL"}),f=wysihtml5.dom.getParentElement(d,{nodeName:"UL"}),d="_wysihtml5-temp-"+(new Date).getTime(),h;!e&&!f&&b.commands.support(c)?a.execCommand(c,!1,null):e?b.selection.executeAndRestore(function(){wysihtml5.dom.resolveList(e,b.config.useLineBreaks)}):f?b.selection.executeAndRestore(function(){wysihtml5.dom.renameElement(f,"ol")}):(b.commands.exec("formatBlock",
"div",d),h=a.querySelector("."+d),a=""===h.innerHTML||h.innerHTML===wysihtml5.INVISIBLE_SPACE||"<br>"===h.innerHTML,b.selection.executeAndRestore(function(){e=wysihtml5.dom.convertToList(h,"ol")}),a&&b.selection.selectNode(e.querySelector("li"),!0))},state:function(b){b=b.selection.getSelectedNode();return wysihtml5.dom.getParentElement(b,{nodeName:"OL"})}};
wysihtml5.commands.insertUnorderedList={exec:function(b,c){var a=b.doc,d=b.selection.getSelectedNode(),e=wysihtml5.dom.getParentElement(d,{nodeName:"UL"}),f=wysihtml5.dom.getParentElement(d,{nodeName:"OL"}),d="_wysihtml5-temp-"+(new Date).getTime(),h;!e&&!f&&b.commands.support(c)?a.execCommand(c,!1,null):e?b.selection.executeAndRestore(function(){wysihtml5.dom.resolveList(e,b.config.useLineBreaks)}):f?b.selection.executeAndRestore(function(){wysihtml5.dom.renameElement(f,"ul")}):(b.commands.exec("formatBlock",
"div",d),h=a.querySelector("."+d),a=""===h.innerHTML||h.innerHTML===wysihtml5.INVISIBLE_SPACE||"<br>"===h.innerHTML,b.selection.executeAndRestore(function(){e=wysihtml5.dom.convertToList(h,"ul")}),a&&b.selection.selectNode(e.querySelector("li"),!0))},state:function(b){b=b.selection.getSelectedNode();return wysihtml5.dom.getParentElement(b,{nodeName:"UL"})}};
wysihtml5.commands.italic={exec:function(b,c){return wysihtml5.commands.formatInline.exec(b,c,"i")},state:function(b,c){return wysihtml5.commands.formatInline.state(b,c,"i")}};(function(b){var c=/wysiwyg-text-align-[0-9a-z]+/g;b.commands.justifyCenter={exec:function(a){return b.commands.formatBlock.exec(a,"formatBlock",null,"wysiwyg-text-align-center",c)},state:function(a){return b.commands.formatBlock.state(a,"formatBlock",null,"wysiwyg-text-align-center",c)}}})(wysihtml5);
(function(b){var c=/wysiwyg-text-align-[0-9a-z]+/g;b.commands.justifyLeft={exec:function(a){return b.commands.formatBlock.exec(a,"formatBlock",null,"wysiwyg-text-align-left",c)},state:function(a){return b.commands.formatBlock.state(a,"formatBlock",null,"wysiwyg-text-align-left",c)}}})(wysihtml5);
(function(b){var c=/wysiwyg-text-align-[0-9a-z]+/g;b.commands.justifyRight={exec:function(a){return b.commands.formatBlock.exec(a,"formatBlock",null,"wysiwyg-text-align-right",c)},state:function(a){return b.commands.formatBlock.state(a,"formatBlock",null,"wysiwyg-text-align-right",c)}}})(wysihtml5);
(function(b){var c=/wysiwyg-text-align-[0-9a-z]+/g;b.commands.justifyFull={exec:function(a){return b.commands.formatBlock.exec(a,"formatBlock",null,"wysiwyg-text-align-justify",c)},state:function(a){return b.commands.formatBlock.state(a,"formatBlock",null,"wysiwyg-text-align-justify",c)}}})(wysihtml5);wysihtml5.commands.redo={exec:function(b){return b.undoManager.redo()},state:function(){return!1}};
wysihtml5.commands.underline={exec:function(b,c){return wysihtml5.commands.formatInline.exec(b,c,"u")},state:function(b,c){return wysihtml5.commands.formatInline.state(b,c,"u")}};wysihtml5.commands.undo={exec:function(b){return b.undoManager.undo()},state:function(){return!1}};
(function(b){var c='<span id="_wysihtml5-undo" class="_wysihtml5-temp">'+b.INVISIBLE_SPACE+"</span>",a='<span id="_wysihtml5-redo" class="_wysihtml5-temp">'+b.INVISIBLE_SPACE+"</span>",d=b.dom;b.UndoManager=b.lang.Dispatcher.extend({constructor:function(a){this.editor=a;this.composer=a.composer;this.element=this.composer.element;this.position=0;this.historyStr=[];this.historyDom=[];this.transact();this._observe()},_observe:function(){var e=this,f=this.composer.sandbox.getDocument(),h;d.observe(this.element,
"keydown",function(a){if(!(a.altKey||!a.ctrlKey&&!a.metaKey)){var b=a.keyCode,c=90===b&&a.shiftKey||89===b;90===b&&!a.shiftKey?(e.undo(),a.preventDefault()):c&&(e.redo(),a.preventDefault())}});d.observe(this.element,"keydown",function(a){a=a.keyCode;a!==h&&(h=a,(8===a||46===a)&&e.transact())});if(b.browser.hasUndoInContextMenu()){var i,g,j=function(){for(var a;a=f.querySelector("._wysihtml5-temp");)a.parentNode.removeChild(a);clearInterval(i)};d.observe(this.element,"contextmenu",function(){j();e.composer.selection.executeAndRestoreSimple(function(){e.element.lastChild&&
e.composer.selection.setAfter(e.element.lastChild);f.execCommand("insertHTML",!1,c);f.execCommand("insertHTML",!1,a);f.execCommand("undo",!1,null)});i=setInterval(function(){f.getElementById("_wysihtml5-redo")?(j(),e.redo()):f.getElementById("_wysihtml5-undo")||(j(),e.undo())},400);g||(g=!0,d.observe(document,"mousedown",j),d.observe(f,["mousedown","paste","cut","copy"],j))})}this.editor.on("newword:composer",function(){e.transact()}).on("beforecommand:composer",function(){e.transact()})},transact:function(){var a=
this.historyStr[this.position-1],c=this.composer.getValue();if(c!==a){if(25<(this.historyStr.length=this.historyDom.length=this.position))this.historyStr.shift(),this.historyDom.shift(),this.position--;this.position++;var d=this.composer.selection.getRange(),a=d.startContainer||this.element,i=d.startOffset||0,g;a.nodeType===b.ELEMENT_NODE?d=a:(d=a.parentNode,g=this.getChildNodeIndex(d,a));d.setAttribute("data-wysihtml5-selection-offset",i);"undefined"!==typeof g&&d.setAttribute("data-wysihtml5-selection-node",
g);g=this.element.cloneNode(!!c);this.historyDom.push(g);this.historyStr.push(c);d.removeAttribute("data-wysihtml5-selection-offset");d.removeAttribute("data-wysihtml5-selection-node")}},undo:function(){this.transact();this.undoPossible()&&(this.set(this.historyDom[--this.position-1]),this.editor.fire("undo:composer"))},redo:function(){this.redoPossible()&&(this.set(this.historyDom[++this.position-1]),this.editor.fire("redo:composer"))},undoPossible:function(){return 1<this.position},redoPossible:function(){return this.position<
this.historyStr.length},set:function(a){this.element.innerHTML="";for(var b=0,c=a.childNodes,d=a.childNodes.length;b<d;b++)this.element.appendChild(c[b].cloneNode(!0));a.hasAttribute("data-wysihtml5-selection-offset")?(b=a.getAttribute("data-wysihtml5-selection-offset"),c=a.getAttribute("data-wysihtml5-selection-node"),a=this.element):(a=this.element.querySelector("[data-wysihtml5-selection-offset]")||this.element,b=a.getAttribute("data-wysihtml5-selection-offset"),c=a.getAttribute("data-wysihtml5-selection-node"),
a.removeAttribute("data-wysihtml5-selection-offset"),a.removeAttribute("data-wysihtml5-selection-node"));null!==c&&(a=this.getChildNodeByIndex(a,+c));this.composer.selection.set(a,b)},getChildNodeIndex:function(a,b){for(var c=0,d=a.childNodes,g=d.length;c<g;c++)if(d[c]===b)return c},getChildNodeByIndex:function(a,b){return a.childNodes[b]}})})(wysihtml5);
wysihtml5.views.View=Base.extend({constructor:function(b,c,a){this.parent=b;this.element=c;this.config=a;this._observeViewChange()},_observeViewChange:function(){var b=this;this.parent.on("beforeload",function(){b.parent.on("change_view",function(c){c===b.name?(b.parent.currentView=b,b.show(),setTimeout(function(){b.focus()},0)):b.hide()})})},focus:function(){if(this.element.ownerDocument.querySelector(":focus")!==this.element)try{this.element.focus()}catch(b){}},hide:function(){this.element.style.display=
"none"},show:function(){this.element.style.display=""},disable:function(){this.element.setAttribute("disabled","disabled")},enable:function(){this.element.removeAttribute("disabled")}});
(function(b){var c=b.dom,a=b.browser;b.views.Composer=b.views.View.extend({name:"composer",CARET_HACK:"<br>",constructor:function(a,b,c){this.base(a,b,c);this.textarea=this.parent.textarea;this._initSandbox()},clear:function(){this.element.innerHTML=a.displaysCaretInEmptyContentEditableCorrectly()?"":this.CARET_HACK},getValue:function(a){var c=this.isEmpty()?"":b.quirks.getCorrectInnerHTML(this.element);a&&(c=this.parent.parse(c));return c=b.lang.string(c).replace(b.INVISIBLE_SPACE).by("")},setValue:function(a,
b){b&&(a=this.parent.parse(a));try{this.element.innerHTML=a}catch(c){this.element.innerText=a}},show:function(){this.iframe.style.display=this._displayStyle||"";this.textarea.element.disabled||(this.disable(),this.enable())},hide:function(){this._displayStyle=c.getStyle("display").from(this.iframe);"none"===this._displayStyle&&(this._displayStyle=null);this.iframe.style.display="none"},disable:function(){this.parent.fire("disable:composer");this.element.removeAttribute("contentEditable")},enable:function(){this.parent.fire("enable:composer");
this.element.setAttribute("contentEditable","true")},focus:function(a){b.browser.doesAsyncFocus()&&this.hasPlaceholderSet()&&this.clear();this.base();var c=this.element.lastChild;a&&c&&("BR"===c.nodeName?this.selection.setBefore(this.element.lastChild):this.selection.setAfter(this.element.lastChild))},getTextContent:function(){return c.getTextContent(this.element)},hasPlaceholderSet:function(){return this.getTextContent()==this.textarea.element.getAttribute("placeholder")&&this.placeholderSet},isEmpty:function(){var a=
this.element.innerHTML.toLowerCase();return""===a||"<br>"===a||"<p></p>"===a||"<p><br></p>"===a||this.hasPlaceholderSet()},_initSandbox:function(){var a=this;this.sandbox=new c.Sandbox(function(){a._create()},{stylesheets:this.config.stylesheets});this.iframe=this.sandbox.getIframe();var b=this.textarea.element;c.insert(this.iframe).after(b);if(b.form){var f=document.createElement("input");f.type="hidden";f.name="_wysihtml5_mode";f.value=1;c.insert(f).after(b)}},_create:function(){var d=this;this.doc=
this.sandbox.getDocument();this.element=this.doc.body;this.textarea=this.parent.textarea;this.element.innerHTML=this.textarea.getValue(!0);this.selection=new b.Selection(this.parent);this.commands=new b.Commands(this.parent);c.copyAttributes("className spellcheck title lang dir accessKey".split(" ")).from(this.textarea.element).to(this.element);c.addClass(this.element,this.config.composerClassName);this.config.style&&this.style();this.observe();var e=this.config.name;e&&(c.addClass(this.element,e),
c.addClass(this.iframe,e));this.enable();this.textarea.element.disabled&&this.disable();(e="string"===typeof this.config.placeholder?this.config.placeholder:this.textarea.element.getAttribute("placeholder"))&&c.simulatePlaceholder(this.parent,this,e);this.commands.exec("styleWithCSS",!1);this._initAutoLinking();this._initObjectResizing();this._initUndoManager();this._initLineBreaking();(this.textarea.element.hasAttribute("autofocus")||document.querySelector(":focus")==this.textarea.element)&&!a.isIos()&&
setTimeout(function(){d.focus(!0)},100);a.clearsContentEditableCorrectly()||b.quirks.ensureProperClearing(this);this.initSync&&this.config.sync&&this.initSync();this.textarea.hide();this.parent.fire("beforeload").fire("load")},_initAutoLinking:function(){var d=this,e=a.canDisableAutoLinking(),f=a.doesAutoLinkingInContentEditable();e&&this.commands.exec("autoUrlDetect",!1);if(this.config.autoLink){if(!f||f&&e)this.parent.on("newword:composer",function(){c.getTextContent(d.element).match(c.autoLink.URL_REG_EXP)&&
d.selection.executeAndRestore(function(a,b){c.autoLink(b.parentNode)})}),c.observe(this.element,"blur",function(){c.autoLink(d.element)});var h=this.sandbox.getDocument().getElementsByTagName("a"),i=c.autoLink.URL_REG_EXP,g=function(a){a=b.lang.string(c.getTextContent(a)).trim();"www."===a.substr(0,4)&&(a="http://"+a);return a};c.observe(this.element,"keydown",function(a){if(h.length){var a=d.selection.getSelectedNode(a.target.ownerDocument),b=c.getParentElement(a,{nodeName:"A"},4),e;b&&(e=g(b),setTimeout(function(){var a=
g(b);a!==e&&a.match(i)&&b.setAttribute("href",a)},0))}})}},_initObjectResizing:function(){this.commands.exec("enableObjectResizing",!0);if(a.supportsEvent("resizeend")){var d=["width","height"],e=d.length,f=this.element;c.observe(f,"resizeend",function(a){var a=a.target||a.srcElement,c=a.style,g=0,j;if("IMG"===a.nodeName){for(;g<e;g++)j=d[g],c[j]&&(a.setAttribute(j,parseInt(c[j],10)),c[j]="");b.quirks.redraw(f)}})}},_initUndoManager:function(){this.undoManager=new b.UndoManager(this.parent)},_initLineBreaking:function(){function d(a){var b=
c.getParentElement(a,{nodeName:["P","DIV"]},2);b&&e.selection.executeAndRestore(function(){e.config.useLineBreaks?c.replaceWithChildNodes(b):"P"!==b.nodeName&&c.renameElement(b,"p")})}var e=this,f="LI P H1 H2 H3 H4 H5 H6".split(" "),h=["UL","OL","MENU"];this.config.useLineBreaks||c.observe(this.element,["focus","keydown"],function(){if(e.isEmpty()){var b=e.doc.createElement("P");e.element.innerHTML="";e.element.appendChild(b);a.displaysCaretInEmptyContentEditableCorrectly()?e.selection.selectNode(b,
!0):(b.innerHTML="<br>",e.selection.setBefore(b.firstChild))}});c.observe(this.doc,"keydown",function(a){var g=a.keyCode;if(!a.shiftKey&&!(g!==b.ENTER_KEY&&g!==b.BACKSPACE_KEY)){var j=c.getParentElement(e.selection.getSelectedNode(),{nodeName:f},4);j?setTimeout(function(){var a=e.selection.getSelectedNode(),f;if("LI"===j.nodeName){if(!a)return;(f=c.getParentElement(a,{nodeName:h},2))||d(a)}g===b.ENTER_KEY&&j.nodeName.match(/^H[1-6]$/)&&d(a)},0):e.config.useLineBreaks&&(g===b.ENTER_KEY&&!b.browser.insertsLineBreaksOnReturn())&&
(e.commands.exec("insertLineBreak"),a.preventDefault())}})}})})(wysihtml5);
(function(b){var c=b.dom,a=document,d=window,e=a.createElement("div"),f="background-color color cursor font-family font-size font-style font-variant font-weight line-height letter-spacing text-align text-decoration text-indent text-rendering word-break word-wrap word-spacing".split(" "),h="background-color border-collapse border-bottom-color border-bottom-style border-bottom-width border-left-color border-left-style border-left-width border-right-color border-right-style border-right-width border-top-color border-top-style border-top-width clear display float margin-bottom margin-left margin-right margin-top outline-color outline-offset outline-width outline-style padding-left padding-right padding-top padding-bottom position top left right bottom z-index vertical-align text-align -webkit-box-sizing -moz-box-sizing -ms-box-sizing box-sizing -webkit-box-shadow -moz-box-shadow -ms-box-shadow box-shadow -webkit-border-top-right-radius -moz-border-radius-topright border-top-right-radius -webkit-border-bottom-right-radius -moz-border-radius-bottomright border-bottom-right-radius -webkit-border-bottom-left-radius -moz-border-radius-bottomleft border-bottom-left-radius -webkit-border-top-left-radius -moz-border-radius-topleft border-top-left-radius width height".split(" "),i=
["html                 { height: 100%; }","body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }","body > p:first-child { margin-top: 0; }","._wysihtml5-temp     { display: none; }",b.browser.isGecko?"body.placeholder { color: graytext !important; }":"body.placeholder { color: #a9a9a9 !important; }","img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"];b.views.Composer.prototype.style=function(){var g=this,j=a.querySelector(":focus"),k=this.textarea.element,
m=k.hasAttribute("placeholder"),n=m&&k.getAttribute("placeholder"),v=k.style.display,u=k.disabled,p;this.focusStylesHost=e.cloneNode(!1);this.blurStylesHost=e.cloneNode(!1);this.disabledStylesHost=e.cloneNode(!1);m&&k.removeAttribute("placeholder");k===j&&k.blur();k.disabled=!1;k.style.display=p="none";if(k.getAttribute("rows")&&"auto"===c.getStyle("height").from(k)||k.getAttribute("cols")&&"auto"===c.getStyle("width").from(k))k.style.display=p=v;c.copyStyles(h).from(k).to(this.iframe).andTo(this.blurStylesHost);
c.copyStyles(f).from(k).to(this.element).andTo(this.blurStylesHost);c.insertCSS(i).into(this.element.ownerDocument);k.disabled=!0;c.copyStyles(h).from(k).to(this.disabledStylesHost);c.copyStyles(f).from(k).to(this.disabledStylesHost);k.disabled=u;k.style.display=v;if(k.setActive)try{k.setActive()}catch(r){}else{var t=k.style,u=a.documentElement.scrollTop||a.body.scrollTop,q=a.documentElement.scrollLeft||a.body.scrollLeft,t={position:t.position,top:t.top,left:t.left,WebkitUserSelect:t.WebkitUserSelect};
c.setStyles({position:"absolute",top:"-99999px",left:"-99999px",WebkitUserSelect:"none"}).on(k);k.focus();c.setStyles(t).on(k);d.scrollTo&&d.scrollTo(q,u)}k.style.display=p;c.copyStyles(h).from(k).to(this.focusStylesHost);c.copyStyles(f).from(k).to(this.focusStylesHost);k.style.display=v;c.copyStyles(["display"]).from(k).to(this.iframe);var y=b.lang.array(h).without(["display"]);j?j.focus():k.blur();m&&k.setAttribute("placeholder",n);this.parent.on("focus:composer",function(){c.copyStyles(y).from(g.focusStylesHost).to(g.iframe);
c.copyStyles(f).from(g.focusStylesHost).to(g.element)});this.parent.on("blur:composer",function(){c.copyStyles(y).from(g.blurStylesHost).to(g.iframe);c.copyStyles(f).from(g.blurStylesHost).to(g.element)});this.parent.observe("disable:composer",function(){c.copyStyles(y).from(g.disabledStylesHost).to(g.iframe);c.copyStyles(f).from(g.disabledStylesHost).to(g.element)});this.parent.observe("enable:composer",function(){c.copyStyles(y).from(g.blurStylesHost).to(g.iframe);c.copyStyles(f).from(g.blurStylesHost).to(g.element)});
return this}})(wysihtml5);
(function(b){var c=b.dom,a=b.browser,d={66:"bold",73:"italic",85:"underline"};b.views.Composer.prototype.observe=function(){var e=this,f=this.getValue(),h=this.sandbox.getIframe(),i=this.element,g=a.supportsEventsInIframeCorrectly()?i:this.sandbox.getWindow();c.observe(h,"DOMNodeRemoved",function(){clearInterval(j);e.parent.fire("destroy:composer")});var j=setInterval(function(){c.contains(document.documentElement,h)||(clearInterval(j),e.parent.fire("destroy:composer"))},250);c.observe(g,"focus",
function(){e.parent.fire("focus").fire("focus:composer");setTimeout(function(){f=e.getValue()},0)});c.observe(g,"blur",function(){f!==e.getValue()&&e.parent.fire("change").fire("change:composer");e.parent.fire("blur").fire("blur:composer")});c.observe(i,"dragenter",function(){e.parent.fire("unset_placeholder")});c.observe(i,["drop","paste"],function(){setTimeout(function(){e.parent.fire("paste").fire("paste:composer")},0)});c.observe(i,"keyup",function(a){a=a.keyCode;(a===b.SPACE_KEY||a===b.ENTER_KEY)&&
e.parent.fire("newword:composer")});this.parent.on("paste:composer",function(){setTimeout(function(){e.parent.fire("newword:composer")},0)});a.canSelectImagesInContentEditable()||c.observe(i,"mousedown",function(a){var b=a.target;"IMG"===b.nodeName&&(e.selection.selectNode(b),a.preventDefault())});a.hasHistoryIssue()&&a.supportsSelectionModify()&&c.observe(i,"keydown",function(a){if(a.metaKey||a.ctrlKey){var b=a.keyCode,c=i.ownerDocument.defaultView.getSelection();if(37===b||39===b)37===b&&(c.modify("extend",
"left","lineboundary"),a.shiftKey||c.collapseToStart()),39===b&&(c.modify("extend","right","lineboundary"),a.shiftKey||c.collapseToEnd()),a.preventDefault()}});c.observe(i,"keydown",function(a){var b=d[a.keyCode];if((a.ctrlKey||a.metaKey)&&!a.altKey&&b)e.commands.exec(b),a.preventDefault()});c.observe(i,"keydown",function(a){var c=e.selection.getSelectedNode(!0),d=a.keyCode;if(c&&"IMG"===c.nodeName&&(d===b.BACKSPACE_KEY||d===b.DELETE_KEY))d=c.parentNode,d.removeChild(c),"A"===d.nodeName&&!d.firstChild&&
d.parentNode.removeChild(d),setTimeout(function(){b.quirks.redraw(i)},0),a.preventDefault()});a.hasIframeFocusIssue()&&(c.observe(this.iframe,"focus",function(){setTimeout(function(){e.doc.querySelector(":focus")!==e.element&&e.focus()},0)}),c.observe(this.element,"blur",function(){setTimeout(function(){e.selection.getSelection().removeAllRanges()},0)}));var k={IMG:"Image: ",A:"Link: "};c.observe(i,"mouseover",function(a){var a=a.target,b=a.nodeName;!("A"!==b&&"IMG"!==b)&&!a.hasAttribute("title")&&
(b=k[b]+(a.getAttribute("href")||a.getAttribute("src")),a.setAttribute("title",b))})}})(wysihtml5);
(function(b){b.views.Synchronizer=Base.extend({constructor:function(b,a,d){this.editor=b;this.textarea=a;this.composer=d;this._observe()},fromComposerToTextarea:function(c){this.textarea.setValue(b.lang.string(this.composer.getValue()).trim(),c)},fromTextareaToComposer:function(b){var a=this.textarea.getValue();a?this.composer.setValue(a,b):(this.composer.clear(),this.editor.fire("set_placeholder"))},sync:function(b){"textarea"===this.editor.currentView.name?this.fromTextareaToComposer(b):this.fromComposerToTextarea(b)},
_observe:function(){var c,a=this,d=this.textarea.element.form,e=function(){c=setInterval(function(){a.fromComposerToTextarea()},400)},f=function(){clearInterval(c);c=null};e();d&&(b.dom.observe(d,"submit",function(){a.sync(!0)}),b.dom.observe(d,"reset",function(){setTimeout(function(){a.fromTextareaToComposer()},0)}));this.editor.on("change_view",function(b){"composer"===b&&!c?(a.fromTextareaToComposer(!0),e()):"textarea"===b&&(a.fromComposerToTextarea(!0),f())});this.editor.on("destroy:composer",
f)}})})(wysihtml5);
wysihtml5.views.Textarea=wysihtml5.views.View.extend({name:"textarea",constructor:function(b,c,a){this.base(b,c,a);this._observe()},clear:function(){this.element.value=""},getValue:function(b){var c=this.isEmpty()?"":this.element.value;b&&(c=this.parent.parse(c));return c},setValue:function(b,c){c&&(b=this.parent.parse(b));this.element.value=b},hasPlaceholderSet:function(){var b=wysihtml5.browser.supportsPlaceholderAttributeOn(this.element),c=this.element.getAttribute("placeholder")||null,a=this.element.value;
return b&&!a||a===c},isEmpty:function(){return!wysihtml5.lang.string(this.element.value).trim()||this.hasPlaceholderSet()},_observe:function(){var b=this.element,c=this.parent,a={focusin:"focus",focusout:"blur"},d=wysihtml5.browser.supportsEvent("focusin")?["focusin","focusout","change"]:["focus","blur","change"];c.on("beforeload",function(){wysihtml5.dom.observe(b,d,function(b){b=a[b.type]||b.type;c.fire(b).fire(b+":textarea")});wysihtml5.dom.observe(b,["paste","drop"],function(){setTimeout(function(){c.fire("paste").fire("paste:textarea")},
0)})})}});
(function(b){var c=b.dom;b.toolbar.Dialog=b.lang.Dispatcher.extend({constructor:function(a,b){this.link=a;this.container=b},_observe:function(){if(!this._observed){var a=this,d=function(b){var c=a._serialize();c==a.elementToChange?a.fire("edit",c):a.fire("save",c);a.hide();b.preventDefault();b.stopPropagation()};c.observe(a.link,"click",function(){c.hasClass(a.link,"wysihtml5-command-dialog-opened")&&setTimeout(function(){a.hide()},0)});c.observe(this.container,"keydown",function(c){var e=c.keyCode;
e===b.ENTER_KEY&&d(c);e===b.ESCAPE_KEY&&a.hide()});c.delegate(this.container,"[data-wysihtml5-dialog-action=save]","click",d);c.delegate(this.container,"[data-wysihtml5-dialog-action=cancel]","click",function(b){a.fire("cancel");a.hide();b.preventDefault();b.stopPropagation()});for(var e=this.container.querySelectorAll("input, select, textarea"),f=0,h=e.length,i=function(){clearInterval(a.interval)};f<h;f++)c.observe(e[f],"change",i);this._observed=!0}},_serialize:function(){for(var a=this.elementToChange||
{},b=this.container.querySelectorAll("[data-wysihtml5-dialog-field]"),c=b.length,f=0;f<c;f++)a[b[f].getAttribute("data-wysihtml5-dialog-field")]=b[f].value;return a},_interpolate:function(a){for(var b,c,f=document.querySelector(":focus"),h=this.container.querySelectorAll("[data-wysihtml5-dialog-field]"),i=h.length,g=0;g<i;g++)b=h[g],b!==f&&!(a&&"hidden"===b.type)&&(c=b.getAttribute("data-wysihtml5-dialog-field"),c=this.elementToChange?this.elementToChange[c]||"":b.defaultValue,b.value=c)},show:function(a){if(!c.hasClass(this.link,
"wysihtml5-command-dialog-opened")){var b=this,e=this.container.querySelector("input, select, textarea");this.elementToChange=a;this._observe();this._interpolate();a&&(this.interval=setInterval(function(){b._interpolate(!0)},500));c.addClass(this.link,"wysihtml5-command-dialog-opened");this.container.style.display="";this.fire("show");if(e&&!a)try{e.focus()}catch(f){}}},hide:function(){clearInterval(this.interval);this.elementToChange=null;c.removeClass(this.link,"wysihtml5-command-dialog-opened");
this.container.style.display="none";this.fire("hide")}})})(wysihtml5);
(function(b){var c=b.dom,a={position:"relative"},d={left:0,margin:0,opacity:0,overflow:"hidden",padding:0,position:"absolute",top:0,zIndex:1},e={cursor:"inherit",fontSize:"50px",height:"50px",marginTop:"-25px",outline:0,padding:0,position:"absolute",right:"-4px",top:"50%"},f={"x-webkit-speech":"",speech:""};b.toolbar.Speech=function(h,i){var g=document.createElement("input");if(b.browser.supportsSpeechApiOn(g)){var j=h.editor.textarea.element.getAttribute("lang");j&&(f.lang=j);j=document.createElement("div");
b.lang.object(d).merge({width:i.offsetWidth+"px",height:i.offsetHeight+"px"});c.insert(g).into(j);c.insert(j).into(i);c.setStyles(e).on(g);c.setAttributes(f).on(g);c.setStyles(d).on(j);c.setStyles(a).on(i);c.observe(g,"onwebkitspeechchange"in g?"webkitspeechchange":"speechchange",function(){h.execCommand("insertText",g.value);g.value=""});c.observe(g,"click",function(a){c.hasClass(i,"wysihtml5-command-disabled")&&a.preventDefault();a.stopPropagation()})}else i.style.display="none"}})(wysihtml5);
(function(b){var c=b.dom;b.toolbar.Toolbar=Base.extend({constructor:function(a,c){this.editor=a;this.container="string"===typeof c?document.getElementById(c):c;this.composer=a.composer;this._getLinks("command");this._getLinks("action");this._observe();this.show();for(var e=this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"),f=e.length,h=0;h<f;h++)new b.toolbar.Speech(this,e[h])},_getLinks:function(a){for(var c=this[a+"Links"]=b.lang.array(this.container.querySelectorAll("[data-wysihtml5-"+
a+"]")).get(),e=c.length,f=0,h=this[a+"Mapping"]={},i,g,j,k,m;f<e;f++)i=c[f],j=i.getAttribute("data-wysihtml5-"+a),k=i.getAttribute("data-wysihtml5-"+a+"-value"),g=this.container.querySelector("[data-wysihtml5-"+a+"-group='"+j+"']"),m=this._getDialog(i,j),h[j+":"+k]={link:i,group:g,name:j,value:k,dialog:m,state:!1}},_getDialog:function(a,c){var e=this,f=this.container.querySelector("[data-wysihtml5-dialog='"+c+"']"),h,i;f&&(h=new b.toolbar.Dialog(a,f),h.on("show",function(){i=e.composer.selection.getBookmark();
e.editor.fire("show:dialog",{command:c,dialogContainer:f,commandLink:a})}),h.on("save",function(b){i&&e.composer.selection.setBookmark(i);e._execCommand(c,b);e.editor.fire("save:dialog",{command:c,dialogContainer:f,commandLink:a})}),h.on("cancel",function(){e.editor.focus(!1);e.editor.fire("cancel:dialog",{command:c,dialogContainer:f,commandLink:a})}));return h},execCommand:function(a,b){if(!this.commandsDisabled){var c=this.commandMapping[a+":"+b];c&&c.dialog&&!c.state?c.dialog.show():this._execCommand(a,
b)}},_execCommand:function(a,b){this.editor.focus(!1);this.composer.commands.exec(a,b);this._updateLinkStates()},execAction:function(a){var b=this.editor;"change_view"===a&&(b.currentView===b.textarea?b.fire("change_view","composer"):b.fire("change_view","textarea"))},_observe:function(){for(var a=this,b=this.editor,e=this.container,f=this.commandLinks.concat(this.actionLinks),h=f.length,i=0;i<h;i++)c.setAttributes({href:"javascript:;",unselectable:"on"}).on(f[i]);c.delegate(e,"[data-wysihtml5-command], [data-wysihtml5-action]",
"mousedown",function(a){a.preventDefault()});c.delegate(e,"[data-wysihtml5-command]","click",function(b){var c=this.getAttribute("data-wysihtml5-command"),d=this.getAttribute("data-wysihtml5-command-value");a.execCommand(c,d);b.preventDefault()});c.delegate(e,"[data-wysihtml5-action]","click",function(b){var c=this.getAttribute("data-wysihtml5-action");a.execAction(c);b.preventDefault()});b.on("focus:composer",function(){a.bookmark=null;clearInterval(a.interval);a.interval=setInterval(function(){a._updateLinkStates()},
500)});b.on("blur:composer",function(){clearInterval(a.interval)});b.on("destroy:composer",function(){clearInterval(a.interval)});b.on("change_view",function(b){setTimeout(function(){a.commandsDisabled="composer"!==b;a._updateLinkStates();a.commandsDisabled?c.addClass(e,"wysihtml5-commands-disabled"):c.removeClass(e,"wysihtml5-commands-disabled")},0)})},_updateLinkStates:function(){var a=this.commandMapping,d=this.actionMapping,e,f,h;for(e in a)h=a[e],this.commandsDisabled?(f=!1,c.removeClass(h.link,
"wysihtml5-command-active"),h.group&&c.removeClass(h.group,"wysihtml5-command-active"),h.dialog&&h.dialog.hide()):(f=this.composer.commands.state(h.name,h.value),b.lang.object(f).isArray()&&(f=1===f.length?f[0]:!0),c.removeClass(h.link,"wysihtml5-command-disabled"),h.group&&c.removeClass(h.group,"wysihtml5-command-disabled")),h.state!==f&&((h.state=f)?(c.addClass(h.link,"wysihtml5-command-active"),h.group&&c.addClass(h.group,"wysihtml5-command-active"),h.dialog&&("object"===typeof f?h.dialog.show(f):
h.dialog.hide())):(c.removeClass(h.link,"wysihtml5-command-active"),h.group&&c.removeClass(h.group,"wysihtml5-command-active"),h.dialog&&h.dialog.hide()));for(e in d)a=d[e],"change_view"===a.name&&(a.state=this.editor.currentView===this.editor.textarea,a.state?c.addClass(a.link,"wysihtml5-action-active"):c.removeClass(a.link,"wysihtml5-action-active"))},show:function(){this.container.style.display=""},hide:function(){this.container.style.display="none"}})})(wysihtml5);
(function(b){var c={name:void 0,style:!0,toolbar:void 0,autoLink:!0,parserRules:{tags:{br:{},span:{},div:{},p:{}},classes:{}},parser:b.dom.parse,composerClassName:"wysihtml5-editor",bodyClassName:"wysihtml5-supported",useLineBreaks:!0,stylesheets:[],placeholderText:void 0,supportTouchDevices:!0};b.Editor=b.lang.Dispatcher.extend({constructor:function(a,d){this.textareaElement="string"===typeof a?document.getElementById(a):a;this.config=b.lang.object({}).merge(c).merge(d).get();this.currentView=this.textarea=
new b.views.Textarea(this,this.textareaElement,this.config);this._isCompatible=b.browser.supported();if(!this._isCompatible||!this.config.supportTouchDevices&&b.browser.isTouchDevice()){var e=this;setTimeout(function(){e.fire("beforeload").fire("load")},0)}else{b.dom.addClass(document.body,this.config.bodyClassName);this.currentView=this.composer=new b.views.Composer(this,this.textareaElement,this.config);"function"===typeof this.config.parser&&this._initParser();this.on("beforeload",function(){this.synchronizer=
new b.views.Synchronizer(this,this.textarea,this.composer);this.config.toolbar&&(this.toolbar=new b.toolbar.Toolbar(this,this.config.toolbar))});}},isCompatible:function(){return this._isCompatible},clear:function(){this.currentView.clear();return this},getValue:function(a){return this.currentView.getValue(a)},setValue:function(a,b){this.fire("unset_placeholder");if(!a)return this.clear();
this.currentView.setValue(a,b);return this},focus:function(a){this.currentView.focus(a);return this},disable:function(){this.currentView.disable();return this},enable:function(){this.currentView.enable();return this},isEmpty:function(){return this.currentView.isEmpty()},hasPlaceholderSet:function(){return this.currentView.hasPlaceholderSet()},parse:function(a){var c=this.config.parser(a,this.config.parserRules,this.composer.sandbox.getDocument(),!0);"object"===typeof a&&b.quirks.redraw(a);return c},
_initParser:function(){this.on("paste:composer",function(){var a=this;a.composer.selection.executeAndRestore(function(){b.quirks.cleanPastedHTML(a.composer.element);a.parse(a.composer.element)},!0)})}})})(wysihtml5);

define("wysihtml5",function(){return wysihtml5});