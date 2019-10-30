parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EVxB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=document.querySelector(".newgame"),o=document.querySelector(".rock"),t=document.querySelector(".paper"),c=document.querySelector(".scissors"),n=document.querySelector(".hands"),r=document.querySelector(".yourID"),s=document.querySelector(".compID"),a=document.querySelector(".yourScore"),i=document.querySelector(".compScore"),p=document.querySelector(".resultsText"),l='<span class="yourID yourHand__rock rock"><i class="far fa-hand-rock"></i></span>',u='<span class="compID compHand__rock rock"><i class="far fa-hand-rock fa-flip-vertical"></i></span>',m={yourScore:0,compScore:0},S={rock:"rock",paper:"paper",scissors:"scissors"},d={rock:{winsAgainst:"scissors",losesAgainst:"paper"},scissors:{winsAgainst:"paper",losesAgainst:"rock"},paper:{winsAgainst:"rock",losesAgainst:"scissors"}},y={yourSelection:"",compSelection:""};e.addEventListener("click",function(){exports.resetGame()}),o.addEventListener("click",function(){f(),y.yourSelection="rock",x();var e=d.rock.winsAgainst,o=d.rock.losesAgainst;g(e,o),k()}),t.addEventListener("click",function(){f(),y.yourSelection="paper",x();var e=d.paper.winsAgainst,o=d.paper.losesAgainst;g(e,o),k()}),c.addEventListener("click",function(){f(),y.yourSelection="scissors",x();var e=d.scissors.winsAgainst,o=d.scissors.losesAgainst;g(e,o),k()}),exports.compLogic=function(){var e=Math.floor(3*Math.random());0==e?y.compSelection="rock":1==e?y.compSelection="paper":2==e?y.compSelection="scissors":console.log("error!")},exports.HandSignHTMLFormatting=function(){var e,o;e="scissors"===y.yourSelection?'<span class="yourID yourHand__'.concat(y.yourSelection," ").concat(y.yourSelection,'"><i class="far fa-hand-').concat(y.yourSelection,' fa-flip-vertical"></i></span>'):'<span class="yourID yourHand__'.concat(y.yourSelection," ").concat(y.yourSelection,'"><i class="far fa-hand-').concat(y.yourSelection,'"></i></span>'),o="scissors"===y.compSelection?'<span class="compID compHand__'.concat(y.compSelection," ").concat(y.compSelection,'"><i class="far fa-hand-').concat(y.compSelection,' fa-flip"></i></span>'):'<span class="compID compHand__'.concat(y.compSelection," ").concat(y.compSelection,'"><i class="far fa-hand-').concat(y.compSelection,' fa-flip-vertical"></i></span>'),n.innerHTML=e+o},exports.gameResults=function(e,o){n.classList.toggle("bounce"),setTimeout(function(){exports.HandSignHTMLFormatting(),e===y.compSelection?(m.yourScore++,p.textContent="You Win!",a.textContent=m.yourScore):o===y.compSelection?(m.compScore++,p.textContent="You Lose!",i.textContent=m.compScore):p.textContent="Tie!"},1800)},exports.resetGame=function(){m.yourScore=0,m.compScore=0,a.textContent=m.yourScore,i.textContent=m.compScore,p.textContent="",n.innerHTML=l+u},exports.resetHands=function(){n.innerHTML=l+u,p.textContent=""},exports.resetBounce=function(){setTimeout(function(){n.classList.toggle("bounce");var e=document.querySelector(".yourID"),o=document.querySelector(".compID");r=e,s=o},2e3)},exports.throttled=function(e,o){var t=0;return function(){var c=(new Date).getTime();if(!(c-t<e))return t=c,o.apply(void 0,arguments)}};var f=exports.throttled(2e3,exports.resetHands),x=exports.throttled(2e3,exports.compLogic),g=exports.throttled(2e3,exports.gameResults),k=exports.throttled(2e3,exports.resetBounce);
},{}]},{},["EVxB"], null)
//# sourceMappingURL=/app.b2590bc7.js.map