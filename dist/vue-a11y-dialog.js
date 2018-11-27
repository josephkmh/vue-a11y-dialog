(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.VueA11yDialog={})})(this,function(a){"use strict";var b="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window,c=function(a,b){return b={exports:{}},a(b,b.exports),b.exports}(function(a){(function(){function b(a,b){this._show=this.show.bind(this),this._hide=this.hide.bind(this),this._maintainFocus=this._maintainFocus.bind(this),this._bindKeypress=this._bindKeypress.bind(this),this.container=a,this.dialog=a.querySelector("dialog, [role=\"dialog\"], [role=\"alertdialog\"]"),this.role=this.dialog.getAttribute("role")||"dialog",this.useDialog="show"in document.createElement("dialog")&&"DIALOG"===this.dialog.nodeName,this._listeners={},this.create(b)}function c(a){return Array.prototype.slice.call(a)}function d(a,b){return c((b||document).querySelectorAll(a))}function e(a){return NodeList.prototype.isPrototypeOf(a)?c(a):Element.prototype.isPrototypeOf(a)?[a]:"string"==typeof a?d(a):void 0}function f(a){var b=g(a),c=a.querySelector("[autofocus]")||b[0];c&&c.focus()}function g(a){return d(k.join(","),a).filter(function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)})}function h(a,b){var c=g(a),d=c.indexOf(document.activeElement);b.shiftKey&&0===d?(c[c.length-1].focus(),b.preventDefault()):!b.shiftKey&&d===c.length-1&&(c[0].focus(),b.preventDefault())}function i(a){var b=c(a.parentNode.childNodes),d=b.filter(function(a){return 1===a.nodeType});return d.splice(d.indexOf(a),1),d}var j,k=["a[href]:not([tabindex^=\"-\"]):not([inert])","area[href]:not([tabindex^=\"-\"]):not([inert])","input:not([disabled]):not([inert])","select:not([disabled]):not([inert])","textarea:not([disabled]):not([inert])","button:not([disabled]):not([inert])","iframe:not([tabindex^=\"-\"]):not([inert])","audio:not([tabindex^=\"-\"]):not([inert])","video:not([tabindex^=\"-\"]):not([inert])","[contenteditable]:not([tabindex^=\"-\"]):not([inert])","[tabindex]:not([tabindex^=\"-\"]):not([inert])"];b.prototype.create=function(a){return this._targets=this._targets||e(a)||i(this.container),this.shown=this.dialog.hasAttribute("open"),this.dialog.setAttribute("role",this.role),this.useDialog?this.container.setAttribute("data-a11y-dialog-native",""):this.shown?this.container.removeAttribute("aria-hidden"):this.container.setAttribute("aria-hidden",!0),this._openers=d("[data-a11y-dialog-show=\""+this.container.id+"\"]"),this._openers.forEach(function(a){a.addEventListener("click",this._show)}.bind(this)),this._closers=d("[data-a11y-dialog-hide]",this.container).concat(d("[data-a11y-dialog-hide=\""+this.container.id+"\"]")),this._closers.forEach(function(a){a.addEventListener("click",this._hide)}.bind(this)),this._fire("create"),this},b.prototype.show=function(a){return this.shown?this:(this.shown=!0,j=document.activeElement,this.useDialog?this.dialog.showModal(a instanceof Event?void 0:a):(this.dialog.setAttribute("open",""),this.container.removeAttribute("aria-hidden"),this._targets.forEach(function(a){a.setAttribute("aria-hidden","true")})),f(this.dialog),document.body.addEventListener("focus",this._maintainFocus,!0),document.addEventListener("keydown",this._bindKeypress),this._fire("show",a),this)},b.prototype.hide=function(a){return this.shown?(this.shown=!1,this.useDialog?this.dialog.close(a instanceof Event?void 0:a):(this.dialog.removeAttribute("open"),this.container.setAttribute("aria-hidden","true"),this._targets.forEach(function(a){a.removeAttribute("aria-hidden")})),j&&j.focus(),document.body.removeEventListener("focus",this._maintainFocus,!0),document.removeEventListener("keydown",this._bindKeypress),this._fire("hide",a),this):this},b.prototype.destroy=function(){return this.hide(),this._openers.forEach(function(a){a.removeEventListener("click",this._show)}.bind(this)),this._closers.forEach(function(a){a.removeEventListener("click",this._hide)}.bind(this)),this._fire("destroy"),this._listeners={},this},b.prototype.on=function(a,b){return"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]),this._listeners[a].push(b),this},b.prototype.off=function(a,b){var c=this._listeners[a].indexOf(b);return-1<c&&this._listeners[a].splice(c,1),this},b.prototype._fire=function(a,b){var c=this._listeners[a]||[];c.forEach(function(a){a(this.container,b)}.bind(this))},b.prototype._bindKeypress=function(a){this.shown&&a.which===27&&"alertdialog"!==this.role&&(a.preventDefault(),this.hide()),this.shown&&a.which===9&&h(this.dialog,a)},b.prototype._maintainFocus=function(a){this.shown&&!this.container.contains(a.target)&&f(this.dialog)},a.exports=b})("undefined"==typeof b?window:b)}),d={name:"VueA11yDialog",props:{id:{type:String,required:!0},appRoot:{type:[String,Array],required:!0},classNames:{type:Object,default:()=>({})},titleId:{type:String},closeButtonLabel:{type:String,default:"Close this dialog window"},disableNative:{type:Boolean,default:!1},role:{type:String,default:"dialog"}},computed:{fullTitleId(){return this.titleId||this.id+"-title"},dialogElement(){return this.disableNative?"div":"dialog"},roleAttribute(){return["dialog","alertdialog"].includes(this.role)?this.role:"dialog"}},data:()=>({dialog:null}),methods:{close(){this.dialog.hide()}},mounted(){this.dialog=new c(this.$refs.rootElement,this.appRoot),this.$emit("dialog-ref",this.dialog)},destroyed(){this.dialog&&this.dialog.destroy(),this.$emit("dialog-ref")}};var e=function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{ref:"rootElement",class:a.classNames.base,attrs:{id:a.id}},[c("div",{class:a.classNames.overlay,attrs:{"data-a11y-dialog-hide":"",tabIndex:"-1"},on:{click:function(){"alertdialog"===a.role?void 0:a.close}}}),a._v(" "),c(a.dialogElement,{tag:"component",class:a.classNames.element,attrs:{role:a.roleAttribute,"aria-labelledby":a.titleId}},[c("div",{class:a.classNames.document,attrs:{role:"document"}},[c("button",{class:a.classNames.closeButton,attrs:{"data-a11y-dialog-hide":"",type:"button","aria-label":a.closeButtonLabel},on:{click:a.close}},[a._t("closeButtonContent",[a._v("\n          "+a._s("\xD7")+"\n        ")])],2),a._v(" "),c("h1",{class:a.classNames.title,attrs:{id:a.fullTitleId}},[a._t("title")],2),a._v(" "),a._t("default")],2)])],1)};e._withStripped=!0;var f=function(a,b,c,d,e){const f=("function"==typeof c?c.options:c)||{};return f.__file="/Users/morkro/Projects/Personal/vue-a11y-dialog/src/A11yDialog.vue",f.render||(f.render=a.render,f.staticRenderFns=a.staticRenderFns,f._compiled=!0,e&&(f.functional=!0)),f._scopeId=d,f}({render:e,staticRenderFns:[]},void 0,d,void 0,!1,void 0,void 0,void 0),g={install(a){a.component("a11y-dialog",f)}};a.A11yDialog=f,a.default=g,Object.defineProperty(a,"__esModule",{value:!0})});
