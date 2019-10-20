// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.ts":[function(require,module,exports) {
"use strict"; // Closure

{
  // ****************** Variable Setup ******************
  var newGame = document.querySelector(".newgame");
  var rock = document.querySelector(".rock");
  var paper = document.querySelector(".paper");
  var scissors = document.querySelector(".scissors");
  var hands = document.querySelector(".hands");
  var yourHand = document.querySelector(".yourID");
  var compHand = document.querySelector(".compID");
  var yourScore = document.querySelector(".yourScore");
  var compScore = document.querySelector(".compScore");
  var results = document.querySelector(".resultsText");
  var yourStartingHand = "<span class=\"yourID yourHand__rock rock\"><i class=\"far fa-hand-rock\"></i></span>";
  var compStartingHand = "<span class=\"compID compHand__rock rock\"><i class=\"far fa-hand-rock fa-flip-vertical\"></i></span>"; // ****************** Data Structures Setup ******************

  var scores = {
    yourScore: 0,
    // tslint:disable-next-line: object-literal-sort-keys
    compScore: 0
  };
  var choices = {
    rock: "rock",
    // tslint:disable-next-line: object-literal-sort-keys
    paper: "paper",
    scissors: "scissors"
  };
  var outcomes = {
    rock: {
      winsAgainst: "scissors",
      // tslint:disable-next-line: object-literal-sort-keys
      losesAgainst: "paper"
    },
    scissors: {
      winsAgainst: "paper",
      // tslint:disable-next-line: object-literal-sort-keys
      losesAgainst: "rock"
    },
    paper: {
      winsAgainst: "rock",
      // tslint:disable-next-line: object-literal-sort-keys
      losesAgainst: "scissors"
    }
  };
  var selections = {
    yourSelection: "",
    // tslint:disable-next-line: object-literal-sort-keys
    compSelection: ""
  }; // ****************** Event Listeners Setup ******************

  newGame.addEventListener("click", function () {
    resetGame();
  });
  rock.addEventListener("click", function () {
    resetHands();
    selections.yourSelection = "rock";
    compLogic();
    var win = outcomes.rock.winsAgainst;
    var loss = outcomes.rock.losesAgainst;
    gameResults(win, loss);
    resetBounce();
  });
  paper.addEventListener("click", function () {
    resetHands();
    selections.yourSelection = "paper";
    compLogic();
    var win = outcomes.paper.winsAgainst;
    var loss = outcomes.paper.losesAgainst;
    gameResults(win, loss);
    resetBounce();
  });
  scissors.addEventListener("click", function () {
    resetHands();
    selections.yourSelection = "scissors";
    compLogic();
    var win = outcomes.scissors.winsAgainst;
    var loss = outcomes.scissors.losesAgainst;
    gameResults(win, loss);
    resetBounce();
  }); // ****************** Game Function Logic Setup ******************
  // Computer logic used to decide selection

  var compLogic = function compLogic() {
    var randomNum = Math.floor(Math.random() * 3); // tslint:disable-next-line: triple-equals

    if (randomNum == 0) {
      selections.compSelection = "rock"; // tslint:disable-next-line: triple-equals
    } else if (randomNum == 1) {
      selections.compSelection = "paper"; // tslint:disable-next-line: triple-equals
    } else if (randomNum == 2) {
      selections.compSelection = "scissors";
    } else {
      // tslint:disable-next-line: no-console
      console.log("error!");
    }
  }; // Necessary to ensure hand symbols are correctly formatted for screen display


  var HandSignHTMLFormatting = function HandSignHTMLFormatting() {
    var yourHandSign;
    var compHandSign;

    if (selections.yourSelection === "scissors") {
      yourHandSign = "<span class=\"yourID yourHand__".concat(selections.yourSelection, " ").concat(selections.yourSelection, "\"><i class=\"far fa-hand-").concat(selections.yourSelection, " fa-flip-vertical\"></i></span>");
    } else {
      yourHandSign = "<span class=\"yourID yourHand__".concat(selections.yourSelection, " ").concat(selections.yourSelection, "\"><i class=\"far fa-hand-").concat(selections.yourSelection, "\"></i></span>");
    }

    if (selections.compSelection === "scissors") {
      compHandSign = "<span class=\"compID compHand__".concat(selections.compSelection, " ").concat(selections.compSelection, "\"><i class=\"far fa-hand-").concat(selections.compSelection, " fa-flip\"></i></span>");
    } else {
      compHandSign = "<span class=\"compID compHand__".concat(selections.compSelection, " ").concat(selections.compSelection, "\"><i class=\"far fa-hand-").concat(selections.compSelection, " fa-flip-vertical\"></i></span>");
    }

    hands.innerHTML = yourHandSign + compHandSign;
  }; // Runs game logic to decide round results, updates scores and displays result text


  var gameResults = function gameResults(win, loss) {
    hands.classList.toggle("bounce");
    setTimeout(function () {
      HandSignHTMLFormatting();

      if (win === selections.compSelection) {
        scores.yourScore++;
        results.textContent = "You Win!";
        yourScore.textContent = scores.yourScore;
      } else if (loss === selections.compSelection) {
        scores.compScore++;
        results.textContent = "You Lose!";
        compScore.textContent = scores.compScore;
      } else {
        results.textContent = "Tie!";
      }
    }, 1800);
  }; // New Game, resets all values


  var resetGame = function resetGame() {
    scores.yourScore = 0;
    scores.compScore = 0;
    yourScore.textContent = scores.yourScore;
    compScore.textContent = scores.compScore;
    results.textContent = "";
    hands.innerHTML = yourStartingHand + compStartingHand;
  }; // Causes hand symbols to reset back to rock at start of each round 
  // and removes results text


  var resetHands = function resetHands() {
    hands.innerHTML = yourStartingHand + compStartingHand;
    results.textContent = "";
  }; // Toggles bounce class off, so that on next round the gameResults function
  // can toggle the class back on


  var resetBounce = function resetBounce() {
    setTimeout(function () {
      hands.classList.toggle("bounce");
      var yourTempHand = document.querySelector(".yourID");
      var compTempHand = document.querySelector(".compID");
      yourHand = yourTempHand;
      compHand = compTempHand;
    }, 2000);
  };
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58462" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map