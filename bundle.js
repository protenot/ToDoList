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

/***/ "./src/ToDoTasks/TypesToDo.ts":
/*!************************************!*\
  !*** ./src/ToDoTasks/TypesToDo.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Status: function() { return /* binding */ Status; }\n/* harmony export */ });\nlet Status = /*#__PURE__*/function (Status) {\n  Status[\"Delayed\"] = \"delayed\";\n  Status[\"Done\"] = \"done\";\n  Status[\"Pending\"] = \"pending\";\n  Status[\"Cancelled\"] = \"cancelled\";\n  return Status;\n}({});\n\n//# sourceURL=webpack://todolist/./src/ToDoTasks/TypesToDo.ts?");

/***/ }),

/***/ "./src/ToDoTasks/classToDo.ts":
/*!************************************!*\
  !*** ./src/ToDoTasks/classToDo.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToDoList: function() { return /* binding */ ToDoList; }\n/* harmony export */ });\nconst TASKS_STORAGE_KEY = \"tasks\";\nclass ToDoList {\n  constructor() {\n    this.tasks = JSON.parse(localStorage.getItem(\"tasks\") || \"[]\");\n  }\n  async createToDoTask(task) {\n    return new Promise((resolve, reject) => {\n      if (this.tasks.find(task => task.content !== task.content)) {\n        console.log(ToDoList);\n        reject(\"Такая задача уже существует\");\n        return;\n      } else {\n        const newToDoTask = {\n          //...task,\n          id: task.id,\n          date: task.date,\n          content: task.content,\n          status: task.status\n        };\n        this.tasks.push(newToDoTask);\n        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));\n        location.reload();\n        resolve(\"Задача создана\");\n      }\n    });\n  }\n  async getToDoTask() {\n    const tasks = localStorage.getItem(\"tasks\");\n    console.log(\"Обратились в ЛС\");\n    if (tasks) {\n      return await JSON.parse(tasks);\n    }\n    return [];\n  }\n  async updateToDoTask(task) {\n    const tasks = await this.getToDoTask();\n    for (let i = 0; i < tasks.length; i++) {\n      if (task.id === tasks[i].id) {\n        tasks.splice(i, 1, task);\n        //tasks[i] = task;\n        console.log(tasks);\n        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));\n        location.reload();\n        return tasks;\n      }\n    }\n    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));\n    location.reload();\n    return tasks;\n  }\n  async deleteToDoTask(task) {\n    let tasks = await this.getToDoTask();\n    console.log(\"1 \" + tasks.length);\n    for (let i = 0; i < tasks.length; i++) {\n      if (task.id === tasks[i].id) {\n        console.log(tasks.length);\n        tasks.splice(i, 1);\n        console.log(\"длина \" + tasks.length);\n        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));\n        location.reload();\n        tasks = await this.getToDoTask();\n        console.log(tasks.length);\n        return tasks;\n      }\n      console.log(\"3 \" + tasks.length);\n    }\n    console.log(\"2  \" + tasks.length);\n    localStorage.setItem(\"item\", JSON.stringify(tasks));\n    return tasks;\n  }\n  async filterToDoTask(something) {\n    const tasks = await this.getToDoTask();\n    let newTasks;\n    if (something.date) {\n      newTasks = tasks.filter(task => task.date === something.date);\n      console.log(newTasks);\n      return newTasks;\n    }\n    if (something.content) {\n      newTasks = tasks.filter(task => task.content.includes(something.content));\n      console.log(newTasks);\n      return newTasks;\n    }\n    if (something.status) {\n      newTasks = tasks.filter(task => task.status === something.status);\n      return newTasks;\n    } else {\n      console.log(\"Try again\");\n    }\n  }\n}\n\n//# sourceURL=webpack://todolist/./src/ToDoTasks/classToDo.ts?");

/***/ }),

/***/ "./src/ToDoTasks/createIDToDo.ts":
/*!***************************************!*\
  !*** ./src/ToDoTasks/createIDToDo.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createID: function() { return /* binding */ createID; }\n/* harmony export */ });\nfunction createID() {\n  return Math.floor(Math.random() * 10000);\n}\n\n//# sourceURL=webpack://todolist/./src/ToDoTasks/createIDToDo.ts?");

/***/ }),

/***/ "./src/ToDoTasks/createToDoMarkup.ts":
/*!*******************************************!*\
  !*** ./src/ToDoTasks/createToDoMarkup.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createModalW: function() { return /* binding */ createModalW; },\n/* harmony export */   createToDoMarkup: function() { return /* binding */ createToDoMarkup; }\n/* harmony export */ });\n/* harmony import */ var _TypesToDo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypesToDo */ \"./src/ToDoTasks/TypesToDo.ts\");\n/* harmony import */ var _classToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classToDo */ \"./src/ToDoTasks/classToDo.ts\");\n/* harmony import */ var _createIDToDo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createIDToDo */ \"./src/ToDoTasks/createIDToDo.ts\");\n\n\n\n//newToDoList.createToDoTask()\n\nconst newToDoList = new _classToDo__WEBPACK_IMPORTED_MODULE_1__.ToDoList();\n//Создаем массив из статусов\nconst statusVar = Object.keys(_TypesToDo__WEBPACK_IMPORTED_MODULE_0__.Status);\n//создаем массив для верхней строчки таблицы\nconst toDoListTitle = [\"Дата\", \"Время\", \"Задача\", \"Статус\", \"Удалить\", \"Изменить\"];\n//console.log(statusVar);\n\nfunction createModalW(el) {\n  const inputToDos = document.createElement(\"input\");\n  // console.log(toDoContainer)\n  el.append(inputToDos);\n  inputToDos.classList.add(\"input-todos\");\n  inputToDos.placeholder = \"Введите задачу\";\n  inputToDos.type = \"text\";\n  const inputDate = document.createElement(\"input\");\n  el.append(inputDate);\n  inputDate.classList.add(\"input-date\");\n  inputDate.type = \"datetime-local\";\n\n  /* let inputStatus:HTMLInputElement = document.createElement(\"input\");\n      toDoContainer.append(inputStatus);\n      inputStatus.classList.add(\"input-status\")\n      inputStatus.type = \"\"; */\n\n  const toDoButton = document.createElement(\"button\");\n  el.append(toDoButton);\n  toDoButton.classList.add(\"main-button\");\n  toDoButton.textContent = \"Сохранить задачу\";\n  toDoButton.addEventListener(\"click\", async () => {\n    if (inputToDos.value && inputDate.value) {\n      const currentTask = {\n        id: (0,_createIDToDo__WEBPACK_IMPORTED_MODULE_2__.createID)(),\n        date: inputDate.value,\n        content: inputToDos.value,\n        status: _TypesToDo__WEBPACK_IMPORTED_MODULE_0__.Status.Pending\n      };\n      await newToDoList.createToDoTask(currentTask);\n    }\n\n    //console.log(list1);\n  });\n\n  //return inputDate\n}\n\nasync function createToDoMarkup(el) {\n  const toDoContainer = document.querySelector(el);\n  createModalW(toDoContainer);\n  const selectStatus = document.createElement(\"select\");\n  toDoContainer.append(selectStatus);\n  selectStatus.classList.add(\"input-status\");\n  const optionChoice = document.createElement(\"option\");\n  optionChoice.text = \"Choose status\";\n  selectStatus.appendChild(optionChoice);\n  for (let i = 0; i < statusVar.length; i++) {\n    const option = document.createElement(\"option\");\n    option.value = statusVar[i];\n    option.text = statusVar[i];\n    option.classList.add(\"status-option\");\n    selectStatus.appendChild(option);\n  }\n  const statusOption = document.querySelector(\".status-option\");\n  console.log(statusOption.textContent);\n  const toDoList = document.createElement(\"div\");\n  toDoContainer.append(toDoList);\n  toDoList.classList.add(\"list\");\n  for (let j = 0; j < toDoListTitle.length; j++) {\n    const p = document.createElement(\"p\");\n    p.textContent = toDoListTitle[j];\n    toDoList.appendChild(p);\n  }\n  const list1 = await newToDoList.getToDoTask();\n  //console.log(\"ЭТО \" + list1);\n\n  list1.forEach(item => {\n    console.log(item.id);\n    const values = Object.entries(item);\n    const date = new Date(values[1][1]);\n    console.log(values[1][1]);\n    //Заполняем ячейку с датой\n    //  if (typeof date === Date){\n    const dateToDoTask = date.toLocaleDateString();\n    console.log(dateToDoTask);\n    const p1Date = document.createElement(\"p\");\n    p1Date.textContent = dateToDoTask;\n    toDoList.appendChild(p1Date);\n    //}\n    // заполняем ячейку со временем\n    const timeToDoTask = date.toLocaleTimeString();\n    const p1Time = document.createElement(\"p\");\n    p1Time.textContent = timeToDoTask;\n    toDoList.appendChild(p1Time);\n\n    // Заполняем ячейку с задачей\n    const p1Task = document.createElement(\"p\");\n    p1Task.textContent = values[2][1];\n    toDoList.appendChild(p1Task);\n\n    //Заполняем ячейку со статусом\n    const p1Status = document.createElement(\"p\");\n    p1Status.textContent = values[3][1];\n    toDoList.appendChild(p1Status);\n\n    // добавляем кнопку удалить\n    const currentButton = document.createElement(\"button\");\n    currentButton.classList.add(\"current-delete-button\");\n    currentButton.textContent = \"Удалить\";\n    toDoList.appendChild(currentButton);\n    //добавляем к ней функционал\n    currentButton.addEventListener(\"click\", () => {\n      console.log(item);\n      newToDoList.deleteToDoTask(item);\n      console.log(item);\n    });\n    //добавляем кнопку изменить\n    const currentButtonEdit = document.createElement(\"button\");\n    currentButtonEdit.classList.add(\"current-edit-button\");\n    currentButtonEdit.textContent = \"Изменить\";\n    toDoList.appendChild(currentButtonEdit);\n\n    //добавляем функционал кнопки изменить\n\n    currentButtonEdit.addEventListener(\"click\", () => {\n      const dateEdited = document.querySelector(\".input-date\");\n      console.log(dateEdited.value);\n      const currentStatus = selectStatus.value;\n      console.log(currentStatus);\n      console.log(item.id);\n      console.log(dateEdited.value);\n      const editedItem = {\n        id: item.id,\n        date: dateEdited.value,\n        content: item.content,\n        status: currentStatus\n      };\n      console.log(editedItem);\n      console.log(item);\n      newToDoList.updateToDoTask(editedItem);\n      //console.log(item);\n    });\n  });\n  // Добавляем функционал кнопки \"Создать задачу\"\n}\n\n/* export  function createButton(teg:HTMLElement,name:string){\n\n    let currentButton = document.createElement('button');\n        currentButton.textContent=name;\n       teg.appendChild(currentButton);\n  \n\n */\n\n//# sourceURL=webpack://todolist/./src/ToDoTasks/createToDoMarkup.ts?");

/***/ }),

/***/ "./src/calendar/createCalendar.ts":
/*!****************************************!*\
  !*** ./src/calendar/createCalendar.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Calendar: function() { return /* binding */ Calendar; }\n/* harmony export */ });\n/* harmony import */ var _createModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createModal */ \"./src/calendar/createModal.ts\");\n\nclass Calendar {\n  constructor(divId) {\n    this.divId = divId;\n    this.DaysOfWeek = [\"Пн\", \"Вт\", \"Ср\", \"Чтв\", \"Птн\", \"Суб\", \"Вск\"];\n    this.Months = [\"Январь\", \"Февраль\", \"Март\", \"Апрель\", \"Май\", \"Июнь\", \"Июль\", \"Август\", \"Сентябрь\", \"Октябрь\", \"Ноябрь\", \"Декабрь\"];\n    const currentDate = new Date();\n    console.log(currentDate);\n    this.currentMonth = currentDate.getMonth();\n    this.currentYear = currentDate.getFullYear();\n    this.currentDay = currentDate.getDate();\n  }\n  nextMonth() {\n    if (this.currentMonth == 11) {\n      this.currentMonth = 0;\n      this.currentYear = this.currentYear + 1;\n    } else {\n      this.currentMonth = this.currentMonth + 1;\n    }\n    this.showCurrent();\n  }\n  previousMonth() {\n    if (this.currentMonth == 0) {\n      this.currentMonth = 11;\n      this.currentYear = this.currentYear - 1;\n    } else {\n      this.currentMonth = this.currentMonth - 1;\n    }\n    this.showCurrent();\n  }\n  showCurrent() {\n    this.showMonth(this.currentYear, this.currentMonth);\n  }\n  showMonth(year, month) {\n    const date = new Date(),\n      firstDayOfMonth = new Date(year, month, 7).getDay(),\n      lastDateOfMonth = new Date(year, month + 1, 0).getDate(),\n      lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();\n    console.log(\"firstDayOfMonth \" + firstDayOfMonth);\n    console.log(\"lastDateOfMonth \" + lastDateOfMonth);\n    let html = \"<table>\";\n    html += \"<thead><tr>\";\n    html += '<td colspan=\"7\">' + this.Months[month] + \" \" + year + \"</td>\";\n    html += \"</tr></thead>\";\n    html += '<tr class=\"days\">';\n    for (let i = 0; i < this.DaysOfWeek.length; i++) {\n      html += \"<td>\" + this.DaysOfWeek[i] + \"</td>\";\n    }\n    html += \"</tr>\";\n    let i = 1;\n    do {\n      let dow = new Date(year, month, i).getDay();\n      // Начать новую строку в понедельник\n      if (dow == 1) {\n        html += \"<tr>\";\n      } else if (i == 1) {\n        html += \"<tr>\";\n        let k = lastDayOfLastMonth - firstDayOfMonth + 1;\n        for (let j = 0; j < firstDayOfMonth; j++) {\n          html += '<td class=\"not-current\">' + k + \"</td>\";\n          k++;\n        }\n      }\n      const chk = new Date();\n      const chkY = chk.getFullYear();\n      const chkM = chk.getMonth();\n      if (chkY == this.currentYear && chkM == this.currentMonth && i == this.currentDay) {\n        html += '<td class=\"today\">' + i + \"<p class = mark>\" + \"</p>\" + \"</td>\";\n      } else {\n        html += '<td class=\"normal\">' + i + \"<p class = mark>\" + \"</p>\" + \"</td>\";\n      }\n      // закрыть строку в воскресенье\n      if (dow == 0) {\n        html += \"</tr>\";\n      }\n\n      // Если последний день месяца не воскресенье, показать первые дни следующего месяца\n      else if (i == lastDateOfMonth) {\n        let k = 1;\n        for (dow; dow < 7; dow++) {\n          html += '<td class=\"not-current\">' + k + \"</td>\";\n          k++;\n        }\n      }\n      i++;\n    } while (i <= lastDateOfMonth);\n    html += \"</table>\";\n    // console.log(html);\n    // console.log(this.divId);\n    console.log(document.getElementById(this.divId));\n    document.getElementById(this.divId).innerHTML = html;\n    //добавляем переход на страницу с задачами по двойному щелчку\n    const table = document.querySelector('table');\n    table.addEventListener('dblclick', () => {\n      document.location = \"/ToDoList/list\";\n    });\n    //добавляем listener на даты\n    //const placeForModal = document.querySelector('.mark')\n    const normalDate = document.querySelectorAll(\".normal\");\n    normalDate.forEach(n => {\n      n.addEventListener(\"click\", () => {\n        //let root = document.getElementById('root')\n        (0,_createModal__WEBPACK_IMPORTED_MODULE_0__.createModal)(table);\n      }, {\n        once: true\n      });\n    });\n    const currentDate = document.querySelector(\".today\");\n    currentDate.addEventListener(\"click\", () => {\n      //let root = document.getElementById('root')\n      (0,_createModal__WEBPACK_IMPORTED_MODULE_0__.createModal)(table);\n    }, {\n      once: true\n    });\n  }\n}\n\n//# sourceURL=webpack://todolist/./src/calendar/createCalendar.ts?");

/***/ }),

/***/ "./src/calendar/createModal.ts":
/*!*************************************!*\
  !*** ./src/calendar/createModal.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createModal: function() { return /* binding */ createModal; }\n/* harmony export */ });\n/* harmony import */ var _ToDoTasks_createToDoMarkup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ToDoTasks/createToDoMarkup */ \"./src/ToDoTasks/createToDoMarkup.ts\");\n\nfunction createModal(el) {\n  const placeForModal = document.createElement(\"div\");\n  placeForModal.classList.add(\"flex\");\n  //placeForModal.classList.add (\"hidden\")\n  el.append(placeForModal);\n  placeForModal.innerHTML = `\n<button class =\"btn btn-close\">х</button>\n\n\n`;\n  //const place:HTMLElement = document.querySelector('.place')\n  (0,_ToDoTasks_createToDoMarkup__WEBPACK_IMPORTED_MODULE_0__.createModalW)(placeForModal);\n  const closeButton = document.querySelector(\".btn\");\n  closeButton.addEventListener(\"click\", () => {\n    placeForModal.classList.add(\"hidden\");\n    location.reload();\n  });\n}\n/* <section class = \"modal\">\n<div class =\"flexy\">\n\n</div>\n</section>\n<div class =\"overlay hidden\"></div> */\n\n//# sourceURL=webpack://todolist/./src/calendar/createModal.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_renderRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/renderRouter */ \"./src/router/renderRouter.ts\");\n/* harmony import */ var _router_routerRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/routerRouter */ \"./src/router/routerRouter.ts\");\n/* harmony import */ var _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar/createCalendar */ \"./src/calendar/createCalendar.ts\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\n\n\n\n\n/* const divCal: string = \"divCal\";\nfunction getId(id: string) {\n  return document.getElementById(id);\n}\n\nwindow.onload = function () {\n  const newCalendar = new Calendar(divCal);\n  newCalendar.showCurrent();\n  getId(\"btnNext\").onclick = function () {\n    newCalendar.nextMonth();\n  };\n  getId(\"btnPrev\").onclick = function () {\n    newCalendar.previousMonth();\n  };\n};\n */\nconst PREFIX = \"/ToDoList\";\nconst createRender = content => (...args) => {\n  console.info(`${content} args=${JSON.stringify(args)}`);\n  if (content === \"/\") {\n    document.getElementById(\"root\").innerHTML = ` <div class=\"calendar-wrapper\">\n    <button id=\"btnPrev\" type=\"button\">Предыдущий</button>\n    <button id=\"btnNext\" type=\"button\">Следующий</button>\n    <div id=\"divCal\"></div>\n  </div>`;\n\n    //window.onload = function () {\n    const divCal = \"divCal\";\n    function getId(id) {\n      return document.getElementById(id);\n    }\n    console.log(divCal);\n    const newCalendar = new _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_2__.Calendar(divCal);\n    newCalendar.showCurrent();\n    getId(\"btnNext\").onclick = function () {\n      newCalendar.nextMonth();\n    };\n    getId(\"btnPrev\").onclick = function () {\n      newCalendar.previousMonth();\n    };\n    //};\n  } else {\n    document.getElementById(\"root\").innerHTML = `<h2>\"${PREFIX + content}\"</h2>`;\n  }\n  console.log(content);\n};\nconst router = (0,_router_routerRouter__WEBPACK_IMPORTED_MODULE_1__.Router)();\nconst aArray = document.querySelectorAll(\"a\");\nconsole.log(aArray);\naArray.forEach(link => {\n  link.href = PREFIX + link.pathname;\n  console.log(aArray[0].href);\n});\nrouter.on(\"/\", createRender(\"/\"),\n// onEnter\nconsole.log(\"[leaving] /calendar\"),\n//onLeaving\n() => {\n  console.log(\"[coming]/calendar\"); // onBeforeEnter\n});\n\nrouter.on(\"/list\", createRender(\"/list\"),\n// onEnter\nconsole.log(\"[leaving] /list\"),\n// onLeave\n() => {\n  console.log(\"[coming]/list\"); // onBeforeEnter\n});\n\nrouter.on(\"/about\", createRender(\"/about\"), console.log(\"[leaving] /about\"), () => {\n  console.log(\"[coming/about]\");\n});\ndocument.body.addEventListener(\"click\", event => {\n  if (event.target && !event.target.matches(\"a\")) {\n    console.log(\"5\");\n    return;\n  }\n  event.preventDefault();\n  const url = event.target.getAttribute(\"href\");\n  router.go(url);\n});\nwindow.addEventListener(\"popstate\", () => {\n  console.log(\"4\");\n  (0,_router_renderRouter__WEBPACK_IMPORTED_MODULE_0__.render)();\n});\n\n//# sourceURL=webpack://todolist/./src/index.ts?");

/***/ }),

/***/ "./src/router/renderRouter.ts":
/*!************************************!*\
  !*** ./src/router/renderRouter.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var _ToDoTasks_createToDoMarkup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ToDoTasks/createToDoMarkup */ \"./src/ToDoTasks/createToDoMarkup.ts\");\n/* harmony import */ var _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../calendar/createCalendar */ \"./src/calendar/createCalendar.ts\");\n\n\nconst render = () => {\n  const route = window.location.pathname;\n  console.log(route);\n  if (route.match(\"/ToDoList/\")) {\n    document.getElementById(\"root\").innerHTML = ` <div class=\"calendar-wrapper\">\n    <button id=\"btnPrev\" type=\"button\">Предыдущий</button>\n    <button id=\"btnNext\" type=\"button\">Следующий</button>\n    <div id=\"divCal\"></div>\n  </div>`;\n\n    //window.onload = function () {\n    const divCal = \"divCal\";\n    function getId(id) {\n      return document.getElementById(id);\n    }\n    console.log(divCal);\n    const newCalendar = new _calendar_createCalendar__WEBPACK_IMPORTED_MODULE_1__.Calendar(divCal);\n    newCalendar.showCurrent();\n    getId(\"btnNext\").onclick = function () {\n      newCalendar.nextMonth();\n    };\n    getId(\"btnPrev\").onclick = function () {\n      newCalendar.previousMonth();\n    };\n  }\n  if (route.match(\"/ToDoList/list\")) {\n    document.getElementById(\"root\").innerHTML = `<div id = \"divCont\"></div>`;\n    const divCont = \"#divCont\";\n    console.log(document.getElementById(divCont));\n    (0,_ToDoTasks_createToDoMarkup__WEBPACK_IMPORTED_MODULE_0__.createToDoMarkup)(divCont);\n  }\n  if (route.match(\"/ToDoList/about\")) {\n    document.getElementById(\"root\").innerHTML = `<h2>\"${route} page\"</h2>`;\n  }\n};\n\n// 1. Handle initial page load\n\nwindow.addEventListener(\"load\", () => {\n  render(); // 👈\n  console.log(\"2\");\n});\n\n// 2. Handle history navigations. alternative \"window.onpopstate\"\nwindow.addEventListener(\"popstate\", event => {\n  render();\n  console.log(\"35\");\n});\n\n// 3. Catch <a> tag clicks + trigger change handler\ndocument.body.addEventListener(\"click\", event => {\n  if (event.target && !event.target.matches(\"a\")) {\n    return;\n  }\n  event.preventDefault();\n  const url = event.target && event.target.getAttribute(\"href\");\n  history.pushState({\n    foo: \"bar\",\n    url\n  }, document.title, url);\n  console.log(history.state);\n  // history.replaceState({ foo: \"bar\" }, url, url);\n  render(); // 👈\n  console.log(\"3\");\n});\n\n//# sourceURL=webpack://todolist/./src/router/renderRouter.ts?");

/***/ }),

/***/ "./src/router/routerRouter.ts":
/*!************************************!*\
  !*** ./src/router/routerRouter.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: function() { return /* binding */ Router; }\n/* harmony export */ });\nconst PREFIX = \"/ToDoList\";\nfunction Router(hash) {\n  let listeners = [];\n  let currentPath = location.pathname;\n  let previousPath = null;\n  const isMatch = (match, path) => match instanceof RegExp && match.test(path) || typeof match === \"function\" && match(path) || typeof match === \"string\" && match === path;\n  const handleListener = ({\n    match,\n    onEnter,\n    onLeave,\n    onBeforeEnter\n  }) => {\n    const args = {\n      currentPath,\n      previousPath,\n      state: history.state\n    };\n    match = PREFIX + match;\n    isMatch(match, currentPath) && onEnter(args);\n    onLeave && isMatch(match, previousPath) && onLeave();\n    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();\n    //console.log(onBeforeEnter);\n  };\n\n  const handleAllListeners = () => listeners.forEach(handleListener);\n  const generateId = () => {\n    const getRandomNumber = () => Math.floor(Math.random() * listeners.length * 1000);\n    const doesExist = id => listeners.find(listener => listener.id === id);\n    let id = getRandomNumber();\n    while (doesExist(id)) {\n      id = getRandomNumber();\n    }\n    return id;\n  };\n  const on = (match, onEnter, onLeave, onBeforeEnter) => {\n    const id = generateId();\n    const listener = {\n      id,\n      match,\n      onEnter,\n      onLeave,\n      onBeforeEnter\n    };\n    listeners.push(listener);\n    console.log(listeners);\n    handleListener(listener);\n    return () => {\n      console.log(\"removed\");\n      listeners = listeners.filter(listener => listener.id !== id);\n    };\n  };\n  const go = (url, state) => {\n    previousPath = currentPath;\n    if (hash === true) {\n      window.location.hash = url;\n    } else {\n      history.pushState(state, url, url);\n      currentPath = location.pathname;\n      handleAllListeners();\n    }\n  };\n\n  // window.addEventListener(\"popstate\", handleAllListeners);\n\n  return {\n    on,\n    go\n  };\n}\n\n//# sourceURL=webpack://todolist/./src/router/routerRouter.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return __WEBPACK_DEFAULT_EXPORT__; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.calendar-wrapper {\n  width: 360px;\n  margin: 3em auto;\n  padding: 2em;\n  border: 1px solid #dcdcff;\n  border-radius: 5px;\n  background: #fff;\n}\ntable {\n  clear: both;\n  width: 100%;\n  border: 1px solid #dcdcff;\n  border-radius: 3px;\n  border-collapse: collapse;\n  color: #444;\n}\ntd {\n  position: relative;\n  height: 48px;\n  text-align: center;\n  vertical-align: top;\n  border-right: 1px solid #dcdcff;\n  border-top: 1px solid #dcdcff;\n  width: 14.28571429%;\n}\n.mark {\n  position: absolute;\n  background-color: #dcdcff;\n  height: 15px;\n  width: 15px;\n  top: 70%;\n  left: 60%;\n  border-radius: 50%;\n}\n/* .normal{\n  position: absolute;\n} */\nthead td {\n  border: none;\n  color: #28283b;\n  text-transform: uppercase;\n  font-size: 1.5em;\n}\n\ntd.not-current {\n  color: #c0c0c0;\n}\n\ntd.today {\n  font-weight: 700;\n  color: #28283b;\n  font-size: 1.5em;\n}\n\n#btnPrev {\n  float: left;\n  margin-bottom: 20px;\n}\n#btnPrev:before {\n  content: \"\\\\f104\";\n  font-family: FontAwesome;\n  padding-right: 4px;\n}\n#btnNext {\n  float: right;\n  margin-bottom: 20px;\n}\n#btnNext:after {\n  content: \"\\\\f105\";\n  font-family: FontAwesome;\n  padding-left: 4px;\n}\n#btnPrev,\n#btnNext {\n  background: transparent;\n  border: none;\n  outline: none;\n  font-size: 1em;\n  color: #c0c0c0;\n  cursor: pointer;\n  font-family: sans-serif;\n  text-transform: uppercase;\n  transition: all 0.3s ease;\n}\n\n#btnPrev:hover,\n#btnNext:hover {\n  color: #28283b;\n  font-weight: bold;\n}\n\n#divCont {\n  width: 100%;\n}\n.input-todos {\n  width: 80%;\n  margin: 20px auto;\n  text-align: center;\n}\n.list {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr 1fr 4fr 1fr 1fr 1fr;\n  grid-template-rows: auto;\n  text-align: center;\n}\n.flex {\n  /*  position: relative; */\n  background-color: #c0c0c0;\n  width: 60%;\n  height: 20%;\n  position: absolute;\n  z-index: 100;\n}\n\n.btn {\n  background-color: black;\n  width: 20%;\n  position: absolute;\n  top: 80%;\n  color: #fff;\n  z-index: 101;\n}\n.modal {\n  width: 400px;\n  height: 300px;\n}\n.flexy {\n  width: inherit;\n  height: inherit;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todolist/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://todolist/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://todolist/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return __WEBPACK_DEFAULT_EXPORT__; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://todolist/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://todolist/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
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