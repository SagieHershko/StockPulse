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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/NavBar.js":
/*!******************************!*\
  !*** ./components/NavBar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavBar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst LINKS = [\n    {\n        href: \"/\",\n        label: \"Home\",\n        icon: \"⌂\"\n    },\n    {\n        href: \"/news\",\n        label: \"News\",\n        icon: \"\\uD83D\\uDCF0\"\n    },\n    {\n        href: \"/heatmap\",\n        label: \"Map\",\n        icon: \"\\uD83D\\uDFE9\"\n    },\n    {\n        href: \"/screener\",\n        label: \"Screener\",\n        icon: \"\\uD83D\\uDCCA\"\n    }\n];\nfunction NavBar() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [dark, setDark] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const saved =  false ? 0 : \"dark\";\n        setDark(saved === \"dark\");\n        document.documentElement.setAttribute(\"data-theme\", saved);\n    }, []);\n    const toggle = ()=>{\n        const next = dark ? \"light\" : \"dark\";\n        setDark(!dark);\n        document.documentElement.setAttribute(\"data-theme\", next);\n        localStorage.setItem(\"sp-theme\", next);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"sticky top-0 z-50 w-full border-b\",\n        style: {\n            background: \"var(--c-surface)\",\n            borderColor: \"var(--c-border)\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"max-w-[1500px] mx-auto px-4 sm:px-8 h-14 flex items-center gap-6\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                    href: \"/\",\n                    className: \"font-syne font-extrabold text-lg tracking-tight flex items-center gap-2 shrink-0\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,160,0.5)]\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 40,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            style: {\n                                color: \"var(--c-ink)\"\n                            },\n                            children: \"Stock\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-accent\",\n                            children: \"Pulse\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                    lineNumber: 39,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-1\",\n                    children: LINKS.map(({ href, label, icon })=>{\n                        const active = router.pathname === href;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: href,\n                            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all ${active ? \"bg-accent/10 text-accent\" : \"text-muted hover:text-ink hover:bg-surface2\"}`,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    children: icon\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                                    lineNumber: 56,\n                                    columnNumber: 17\n                                }, this),\n                                label\n                            ]\n                        }, href, true, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 50,\n                            columnNumber: 15\n                        }, this);\n                    })\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                    lineNumber: 63,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: toggle,\n                    title: dark ? \"Switch to light mode\" : \"Switch to dark mode\",\n                    className: \"flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-syne font-bold text-muted hover:text-ink transition-all\",\n                    style: {\n                        borderColor: \"var(--c-border)\"\n                    },\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-base\",\n                            children: dark ? \"☀️\" : \"\\uD83C\\uDF19\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 73,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"hidden sm:block\",\n                            children: dark ? \"Light\" : \"Dark\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n                    lineNumber: 66,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n            lineNumber: 36,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\components\\\\NavBar.js\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdkJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTZCO0FBQ1c7QUFDSTtBQUU1QyxNQUFNSSxRQUFRO0lBQ1o7UUFBRUMsTUFBTTtRQUFjQyxPQUFPO1FBQVlDLE1BQU07SUFBSztJQUNwRDtRQUFFRixNQUFNO1FBQWNDLE9BQU87UUFBWUMsTUFBTTtJQUFLO0lBQ3BEO1FBQUVGLE1BQU07UUFBY0MsT0FBTztRQUFZQyxNQUFNO0lBQUs7SUFDcEQ7UUFBRUYsTUFBTTtRQUFjQyxPQUFPO1FBQVlDLE1BQU07SUFBSztDQUNyRDtBQUVjLFNBQVNDO0lBQ3RCLE1BQU1DLFNBQVNSLHNEQUFTQTtJQUN4QixNQUFNLENBQUNTLE1BQU1DLFFBQVEsR0FBR1IsK0NBQVFBLENBQUM7SUFFakNELGdEQUFTQSxDQUFDO1FBQ1IsTUFBTVUsUUFBUSxNQUFrQixHQUM1QkMsQ0FBb0MsR0FDcEM7UUFDSkYsUUFBUUMsVUFBVTtRQUNsQkcsU0FBU0MsZUFBZSxDQUFDQyxZQUFZLENBQUMsY0FBY0w7SUFDdEQsR0FBRyxFQUFFO0lBRUwsTUFBTU0sU0FBUztRQUNiLE1BQU1DLE9BQU9ULE9BQU8sVUFBVTtRQUM5QkMsUUFBUSxDQUFDRDtRQUNUSyxTQUFTQyxlQUFlLENBQUNDLFlBQVksQ0FBQyxjQUFjRTtRQUNwRE4sYUFBYU8sT0FBTyxDQUFDLFlBQVlEO0lBQ25DO0lBRUEscUJBQ0UsOERBQUNFO1FBQ0NDLFdBQVU7UUFDVkMsT0FBTztZQUFFQyxZQUFZO1lBQW9CQyxhQUFhO1FBQWtCO2tCQUV4RSw0RUFBQ0M7WUFBSUosV0FBVTs7OEJBR2IsOERBQUN0QixrREFBSUE7b0JBQUNLLE1BQUs7b0JBQUlpQixXQUFVOztzQ0FDdkIsOERBQUNLOzRCQUFLTCxXQUFVOzs7Ozs7c0NBQ2hCLDhEQUFDSzs0QkFBS0osT0FBTztnQ0FBRUssT0FBTzs0QkFBZTtzQ0FBRzs7Ozs7O3NDQUN4Qyw4REFBQ0Q7NEJBQUtMLFdBQVU7c0NBQWM7Ozs7Ozs7Ozs7Ozs4QkFJaEMsOERBQUNJO29CQUFJSixXQUFVOzhCQUNabEIsTUFBTXlCLEdBQUcsQ0FBQyxDQUFDLEVBQUV4QixJQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFO3dCQUMvQixNQUFNdUIsU0FBU3JCLE9BQU9zQixRQUFRLEtBQUsxQjt3QkFDbkMscUJBQ0UsOERBQUNMLGtEQUFJQTs0QkFBWUssTUFBTUE7NEJBQ3JCaUIsV0FBVyxDQUFDLDRGQUE0RixFQUN0R1EsU0FDSSw2QkFDQSw4Q0FDTCxDQUFDOzs4Q0FDRiw4REFBQ0g7OENBQU1wQjs7Ozs7O2dDQUFhRDs7MkJBTlhEOzs7OztvQkFTZjs7Ozs7OzhCQUlGLDhEQUFDcUI7b0JBQUlKLFdBQVU7Ozs7Ozs4QkFHZiw4REFBQ1U7b0JBQ0NDLFNBQVNmO29CQUNUZ0IsT0FBT3hCLE9BQU8seUJBQXlCO29CQUN2Q1ksV0FBVTtvQkFFVkMsT0FBTzt3QkFBRUUsYUFBYTtvQkFBa0I7O3NDQUV4Qyw4REFBQ0U7NEJBQUtMLFdBQVU7c0NBQWFaLE9BQU8sT0FBTzs7Ozs7O3NDQUMzQyw4REFBQ2lCOzRCQUFLTCxXQUFVO3NDQUFtQlosT0FBTyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs5RCIsInNvdXJjZXMiOlsid2VicGFjazovL3N0b2NrcHVsc2UvLi9jb21wb25lbnRzL05hdkJhci5qcz9lYjkxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBMSU5LUyA9IFtcbiAgeyBocmVmOiAnLycsICAgICAgICAgIGxhYmVsOiAnSG9tZScsICAgICBpY29uOiAn4oyCJyAgfSxcbiAgeyBocmVmOiAnL25ld3MnLCAgICAgIGxhYmVsOiAnTmV3cycsICAgICBpY29uOiAn8J+TsCcgfSxcbiAgeyBocmVmOiAnL2hlYXRtYXAnLCAgIGxhYmVsOiAnTWFwJywgICAgICBpY29uOiAn8J+fqScgfSxcbiAgeyBocmVmOiAnL3NjcmVlbmVyJywgIGxhYmVsOiAnU2NyZWVuZXInLCBpY29uOiAn8J+TiicgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdkJhcigpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtkYXJrLCBzZXREYXJrXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3AtdGhlbWUnKSB8fCAnZGFyaydcbiAgICAgIDogJ2RhcmsnO1xuICAgIHNldERhcmsoc2F2ZWQgPT09ICdkYXJrJyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHNhdmVkKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHRvZ2dsZSA9ICgpID0+IHtcbiAgICBjb25zdCBuZXh0ID0gZGFyayA/ICdsaWdodCcgOiAnZGFyayc7XG4gICAgc2V0RGFyayghZGFyayk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIG5leHQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzcC10aGVtZScsIG5leHQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG5hdlxuICAgICAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcC0wIHotNTAgdy1mdWxsIGJvcmRlci1iXCJcbiAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1jLXN1cmZhY2UpJywgYm9yZGVyQ29sb3I6ICd2YXIoLS1jLWJvcmRlciknIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy1bMTUwMHB4XSBteC1hdXRvIHB4LTQgc206cHgtOCBoLTE0IGZsZXggaXRlbXMtY2VudGVyIGdhcC02XCI+XG5cbiAgICAgICAgey8qIExvZ28gKi99XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvXCIgY2xhc3NOYW1lPVwiZm9udC1zeW5lIGZvbnQtZXh0cmFib2xkIHRleHQtbGcgdHJhY2tpbmctdGlnaHQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hyaW5rLTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctYWNjZW50IHNoYWRvdy1bMF8wXzEwcHhfcmdiYSgwLDIyOSwxNjAsMC41KV1cIiAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tYy1pbmspJyB9fT5TdG9jazwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFjY2VudFwiPlB1bHNlPC9zcGFuPlxuICAgICAgICA8L0xpbms+XG5cbiAgICAgICAgey8qIE5hdiBsaW5rcyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgIHtMSU5LUy5tYXAoKHsgaHJlZiwgbGFiZWwsIGljb24gfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gcm91dGVyLnBhdGhuYW1lID09PSBocmVmO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPExpbmsga2V5PXtocmVmfSBocmVmPXtocmVmfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtc3luZSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1hY2NlbnQvMTAgdGV4dC1hY2NlbnQnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtbXV0ZWQgaG92ZXI6dGV4dC1pbmsgaG92ZXI6Ymctc3VyZmFjZTInXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIDxzcGFuPntpY29ufTwvc3Bhbj57bGFiZWx9XG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTcGFjZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCIgLz5cblxuICAgICAgICB7LyogVGhlbWUgdG9nZ2xlICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlfVxuICAgICAgICAgIHRpdGxlPXtkYXJrID8gJ1N3aXRjaCB0byBsaWdodCBtb2RlJyA6ICdTd2l0Y2ggdG8gZGFyayBtb2RlJ31cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJvcmRlciB0ZXh0LXhzIGZvbnQtc3luZSBmb250LWJvbGRcbiAgICAgICAgICAgICAgICAgICAgIHRleHQtbXV0ZWQgaG92ZXI6dGV4dC1pbmsgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgIHN0eWxlPXt7IGJvcmRlckNvbG9yOiAndmFyKC0tYy1ib3JkZXIpJyB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlXCI+e2RhcmsgPyAn4piA77iPJyA6ICfwn4yZJ308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmJsb2NrXCI+e2RhcmsgPyAnTGlnaHQnIDogJ0RhcmsnfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L25hdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJMaW5rIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMSU5LUyIsImhyZWYiLCJsYWJlbCIsImljb24iLCJOYXZCYXIiLCJyb3V0ZXIiLCJkYXJrIiwic2V0RGFyayIsInNhdmVkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidG9nZ2xlIiwibmV4dCIsInNldEl0ZW0iLCJuYXYiLCJjbGFzc05hbWUiLCJzdHlsZSIsImJhY2tncm91bmQiLCJib3JkZXJDb2xvciIsImRpdiIsInNwYW4iLCJjb2xvciIsIm1hcCIsImFjdGl2ZSIsInBhdGhuYW1lIiwiYnV0dG9uIiwib25DbGljayIsInRpdGxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/NavBar.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/NavBar */ \"./components/NavBar.js\");\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NavBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\pages\\\\_app.js\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sagie\\\\OneDrive\\\\Desktop\\\\לימודים\\\\Claude\\\\stockpulse-V6\\\\stockpulse\\\\pages\\\\_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBK0I7QUFDVztBQUUzQixTQUFTQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ2xELHFCQUNFOzswQkFDRSw4REFBQ0gsMERBQU1BOzs7OzswQkFDUCw4REFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9ja3B1bHNlLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZCYXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOYXZCYXIgLz5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJOYXZCYXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();