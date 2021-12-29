/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/hello";
exports.ids = ["pages/api/hello"];
exports.modules = {

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "./db/db.js":
/*!******************!*\
  !*** ./db/db.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\ndotenv.config();\nmongoose.connect(process.env.MONGODB_URI, {\n    useNewUrlParser: true,\n    useUnifiedTopology: true,\n    useCreateIndex: true,\n    useFindAndModify: false\n}, ()=>{\n    console.log(\"Connected to MongoDB\");\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYi9kYi5qcy5qcyIsIm1hcHBpbmdzIjoiQUFDQSxLQUFLLENBQUNBLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQywwQkFBVTtBQUNuQyxLQUFLLENBQUNDLE1BQU0sR0FBR0QsbUJBQU8sQ0FBQyxzQkFBUTtBQUUvQkMsTUFBTSxDQUFDQyxNQUFNO0FBRWJILFFBQVEsQ0FBQ0ksT0FBTyxDQUNkQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsV0FBVyxFQUN2QixDQUFDO0lBQ0NDLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCQyxjQUFjLEVBQUUsSUFBSTtJQUNwQkMsZ0JBQWdCLEVBQUUsS0FBSztBQUN6QixDQUFDLE1BRUssQ0FBQztJQUNMQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFzQjtBQUNwQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vZGIvZGIuanM/NWQyNyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpXHJcbmNvbnN0IGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudicpXHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5tb25nb29zZS5jb25uZWN0KFxyXG4gIHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLFxyXG4gIHtcclxuICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSwgXHJcbiAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbiAgICB1c2VDcmVhdGVJbmRleDogdHJ1ZSxcclxuICAgIHVzZUZpbmRBbmRNb2RpZnk6IGZhbHNlLFxyXG4gIH0sXHJcblxyXG4gICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIE1vbmdvREJcIik7XHJcbiAgfVxyXG4pO1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiZG90ZW52IiwiY29uZmlnIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsInVzZUNyZWF0ZUluZGV4IiwidXNlRmluZEFuZE1vZGlmeSIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./db/db.js\n");

/***/ }),

/***/ "./pages/api/hello.js":
/*!****************************!*\
  !*** ./pages/api/hello.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _db_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db */ \"./db/db.js\");\n/* harmony import */ var _db_db__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_db_db__WEBPACK_IMPORTED_MODULE_0__);\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nfunction handler(req, res) {\n    res.status(200).json({\n        name: 'John Doe'\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvaGVsbG8uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsRUFBNkU7QUFDOUI7QUFDaEMsUUFBUSxDQUFDQyxPQUFPLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFLENBQUM7SUFDekNBLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7UUFBQ0MsSUFBSSxFQUFFLENBQVU7SUFBQyxDQUFDO0FBQzNDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9wYWdlcy9hcGkvaGVsbG8uanM/MWY3NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxyXG5pbXBvcnQgeyBjb25uZWN0VG9EYXRhYmFzZSB9IGZyb20gXCIuLi8uLi9kYi9kYlwiXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG5hbWU6ICdKb2huIERvZScgfSlcclxufVxyXG4iXSwibmFtZXMiOlsiY29ubmVjdFRvRGF0YWJhc2UiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwic3RhdHVzIiwianNvbiIsIm5hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/hello.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/hello.js"));
module.exports = __webpack_exports__;

})();