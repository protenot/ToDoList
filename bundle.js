/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/calendar/createCalendar.ts":
/*!****************************************!*\
  !*** ./src/calendar/createCalendar.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Calendar: function() { return /* binding */ Calendar; }\n/* harmony export */ });\nclass Calendar {\n  constructor(divId) {\n    this.divId = divId;\n    this.DaysOfWeek = [\"Пн\", \"Вт\", \"Ср\", \"Чтв\", \"Птн\", \"Суб\", \"Вск\"];\n    this.Months = [\"Январь\", \"Февраль\", \"Март\", \"Апрель\", \"Май\", \"Июнь\", \"Июль\", \"Август\", \"Сентябрь\", \"Октябрь\", \"Ноябрь\", \"Декабрь\"];\n    const currentDate = new Date();\n    this.currentMonth = currentDate.getMonth();\n    this.currentYear = currentDate.getFullYear();\n    this.currentDay = currentDate.getDate();\n  }\n  nextMonth() {\n    if (this.currentMonth == 11) {\n      this.currentMonth = 0;\n      this.currentYear = this.currentYear + 1;\n    } else {\n      this.currentMonth = this.currentMonth + 1;\n    }\n    this.showCurrent();\n  }\n  previousMonth() {\n    if (this.currentMonth == 0) {\n      this.currentMonth = 11;\n      this.currentYear = this.currentYear - 1;\n    } else {\n      this.currentMonth = this.currentMonth - 1;\n    }\n    this.showCurrent();\n  }\n  showCurrent() {\n    this.showMonth(this.currentYear, this.currentMonth);\n  }\n  showMonth(year, month) {\n    const date = new Date(),\n      firstDayOfMonth = new Date(year, month, 7).getDay(),\n      lastDateOfMonth = new Date(year, month + 1, 0).getDate(),\n      lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();\n    let html = \"<table>\";\n    html += \"<thead><tr>\";\n    html += '<td colspan=\"7\">' + this.Months[month] + \" \" + year + \"</td>\";\n    html += \"</tr></thead>\";\n    html += '<tr class=\"days\">';\n    for (let i = 0; i < this.DaysOfWeek.length; i++) {\n      html += \"<td>\" + this.DaysOfWeek[i] + \"</td>\";\n    }\n    html += \"</tr>\";\n    let i = 1;\n    do {\n      const dow = new Date(year, month, i).getDay();\n      // Начать новую строку в понедельник\n      if (dow == 1) {\n        html += \"<tr>\";\n      } else if (i == 1) {\n        html += \"<tr>\";\n        let k = lastDayOfLastMonth - firstDayOfMonth + 1;\n        for (let j = 0; j < firstDayOfMonth; j++) {\n          html += '<td class=\"not-current\">' + k + \"</td>\";\n          k++;\n        }\n      }\n      i++;\n    } while (i <= lastDateOfMonth);\n    html += \"</table>\";\n    document.getElementById(this.divId).innerHTML = html;\n  }\n}\n\n//# sourceURL=webpack://todolist/./src/calendar/createCalendar.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_renderRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/renderRouter */ \"./src/router/renderRouter.ts\");\n/* harmony import */ var _router_routerRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/routerRouter */ \"./src/router/routerRouter.ts\");\n/* harmony import */ var _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar/createCalendar */ \"./src/calendar/createCalendar.ts\");\n\n\n\nconst divCal = \"divCal\";\nfunction getId(id) {\n  return document.getElementById(id);\n}\nwindow.onload = function () {\n  const newCalendar = new _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_2__.Calendar(divCal);\n  newCalendar.showCurrent();\n  getId(\"btnNext\").onclick = function () {\n    newCalendar.nextMonth();\n  };\n  getId(\"btnPrev\").onclick = function () {\n    newCalendar.previousMonth();\n  };\n};\nconst PREFIX = \"/Todolist\";\nconst createRender = content => (...args) => {\n  console.info(`${content} args=${JSON.stringify(args)}`);\n  document.getElementById(\"root\").innerHTML = `<h2>\"${PREFIX + content}\"</h2>`;\n  console.log(content);\n};\nconst router = (0,_router_routerRouter__WEBPACK_IMPORTED_MODULE_1__.Router)();\nconst aArray = document.querySelectorAll(\"a\");\nconsole.log(aArray);\naArray.forEach(link => {\n  link.href = PREFIX + link.pathname;\n  console.log(aArray[0].href);\n});\nrouter.on(\"/Calendar\", () => {\n  console.log(\"Calendar\");\n},\n// onEnter\nconsole.log(\"[leaving] /Calendar\"),\n//onLeaving\n() => {\n  console.log(\"[coming]/Calendar\"); // onBeforeEnter\n});\n\nrouter.on(\"/list\", createRender(\"/list\"),\n// onEnter\nconsole.log(\"[leaving] /list\"),\n// onLeave\n() => {\n  console.log(\"[coming]/list\"); // onBeforeEnter\n});\n\nrouter.on(\"/about\", createRender(\"/about\"), console.log(\"[leaving] /about\"), () => {\n  console.log(\"[coming/about]\");\n});\ndocument.body.addEventListener(\"click\", event => {\n  console.log(\"5\");\n  if (event.target && !event.target.matches(\"a\")) {\n    return;\n  }\n  event.preventDefault();\n  const url = event.target.getAttribute(\"href\");\n  router.go(url);\n});\nwindow.addEventListener(\"popstate\", () => {\n  console.log(\"4\");\n  (0,_router_renderRouter__WEBPACK_IMPORTED_MODULE_0__.render)();\n});\n\n//# sourceURL=webpack://todolist/./src/index.ts?");

/***/ }),

/***/ "./src/router/renderRouter.ts":
/*!************************************!*\
  !*** ./src/router/renderRouter.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* binding */ render; }\n/* harmony export */ });\nconst render = () => {\n  const route = location.pathname;\n  document.getElementById(\"root\").innerHTML = `<h2>\"${route} page\"</h2>`;\n  console.log(\"1\" + route);\n};\n\n// 1. Handle initial page load\n\nwindow.addEventListener(\"load\", () => {\n  render(); // 👈\n  console.log(\"2\");\n});\n\n// 2. Handle history navigations. alternative \"window.onpopstate\"\nwindow.addEventListener(\"popstate\", event => {\n  render();\n  console.log(\"35\");\n});\n\n// 3. Catch <a> tag clicks + trigger change handler\ndocument.body.addEventListener(\"click\", event => {\n  if (event.target && !event.target.matches(\"a\")) {\n    return;\n  }\n  event.preventDefault();\n  const url = event.target && event.target.getAttribute(\"href\");\n  history.pushState({\n    foo: \"bar\",\n    url\n  }, document.title, url);\n  console.log(history.state);\n  // history.replaceState({ foo: \"bar\" }, url, url);\n  render(); // 👈\n  console.log(\"3\");\n});\n\n//# sourceURL=webpack://todolist/./src/router/renderRouter.ts?");

/***/ }),

/***/ "./src/router/routerRouter.ts":
/*!************************************!*\
  !*** ./src/router/routerRouter.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: function() { return /* binding */ Router; }\n/* harmony export */ });\nconst PREFIX = \"/Todolist\";\nfunction Router(hash) {\n  let listeners = [];\n  let currentPath = location.pathname;\n  let previousPath = null;\n  const isMatch = (match, path) => match instanceof RegExp && match.test(path) || typeof match === \"function\" && match(path) || typeof match === \"string\" && match === path;\n  const handleListener = ({\n    match,\n    onEnter,\n    onLeave,\n    onBeforeEnter\n  }) => {\n    const args = {\n      currentPath,\n      previousPath,\n      state: history.state\n    };\n    match = PREFIX + match;\n    isMatch(match, currentPath) && onEnter(args);\n    onLeave && isMatch(match, previousPath) && onLeave();\n    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();\n    //console.log(onBeforeEnter);\n  };\n\n  const handleAllListeners = () => listeners.forEach(handleListener);\n  const generateId = () => {\n    const getRandomNumber = () => Math.floor(Math.random() * listeners.length * 1000);\n    const doesExist = id => listeners.find(listener => listener.id === id);\n    let id = getRandomNumber();\n    while (doesExist(id)) {\n      id = getRandomNumber();\n    }\n    return id;\n  };\n  const on = (match, onEnter, onLeave, onBeforeEnter) => {\n    const id = generateId();\n    const listener = {\n      id,\n      match,\n      onEnter,\n      onLeave,\n      onBeforeEnter\n    };\n    listeners.push(listener);\n    console.log(listeners);\n    handleListener(listener);\n    return () => {\n      console.log(\"removed\");\n      listeners = listeners.filter(listener => listener.id !== id);\n    };\n  };\n  const go = (url, state) => {\n    previousPath = currentPath;\n    if (hash === true) {\n      window.location.hash = url;\n    } else {\n      history.pushState(state, url, url);\n      currentPath = location.pathname;\n      handleAllListeners();\n    }\n  };\n\n  // window.addEventListener(\"popstate\", handleAllListeners);\n\n  return {\n    on,\n    go\n  };\n}\n\n//# sourceURL=webpack://todolist/./src/router/routerRouter.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;