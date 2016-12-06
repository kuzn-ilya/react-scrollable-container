(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactScrollable"] = factory(require("react"));
	else
		root["ReactScrollable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(10);
	__webpack_require__(11);
	module.exports = __webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(6);
	var css_utils_1 = __webpack_require__(7);
	var joinClasses_1 = __webpack_require__(9);
	var ScrollableContainerContent_1 = __webpack_require__(10);
	__webpack_require__(1);
	var ScrollableContainer = (function (_super) {
	    __extends(ScrollableContainer, _super);
	    function ScrollableContainer(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.handleWindowResize = function () { return _this.measureScrollbars(); };
	        this.handleScroll = function (event) {
	            var scrollLeft = event.target.scrollLeft;
	            var scrollTop = event.target.scrollTop;
	            if (_this.props.onScrollPosChanged) {
	                _this.props.onScrollPosChanged(scrollLeft, scrollTop);
	            }
	        };
	        this.measureScrollbars = function () {
	            if (_this.ref) {
	                var newState = {
	                    horzScrollThumbHeight: _this.ref.offsetHeight - _this.ref.clientHeight,
	                    vertScrollThumbWidth: _this.ref.offsetWidth - _this.ref.clientWidth
	                };
	                var oldState = _this.state;
	                if (newState.vertScrollThumbWidth !== oldState.vertScrollThumbWidth ||
	                    newState.horzScrollThumbHeight !== oldState.horzScrollThumbHeight) {
	                    _this.setState(newState);
	                    if (_this.props.onVerticalScrollVisibilityChanged &&
	                        newState.vertScrollThumbWidth !== oldState.vertScrollThumbWidth) {
	                        _this.props.onVerticalScrollVisibilityChanged(newState.vertScrollThumbWidth > 0, newState.vertScrollThumbWidth);
	                    }
	                    if (_this.props.onHorizontalScrollVisibilityChanged &&
	                        newState.horzScrollThumbHeight !== oldState.horzScrollThumbHeight) {
	                        _this.props.onHorizontalScrollVisibilityChanged(newState.horzScrollThumbHeight > 0, newState.horzScrollThumbHeight);
	                    }
	                }
	            }
	        };
	        this.handleWindowResize = this.handleWindowResize.bind(this);
	        this.handleScroll = this.handleScroll.bind(this);
	        this.state = {
	            horzScrollThumbHeight: 0,
	            vertScrollThumbWidth: 0
	        };
	    }
	    ScrollableContainer.prototype.componentDidMount = function () {
	        this.measureScrollbars();
	        this.updateScrollPositions();
	        this.ref.addEventListener('scroll', this.handleScroll);
	        window.addEventListener('resize', this.handleWindowResize);
	    };
	    ScrollableContainer.prototype.componentDidUpdate = function () {
	        this.updateScrollPositions();
	    };
	    ScrollableContainer.prototype.componentWillUnmount = function () {
	        this.ref.removeEventListener('scroll', this.handleScroll);
	        window.removeEventListener('resize', this.handleWindowResize);
	    };
	    ScrollableContainer.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("div", {className: joinClasses_1.joinClasses(css_utils_1.addPrefixToClass('container'), this.props.className), style: {
	            height: this.props.height,
	            width: this.props.width
	        }, id: this.props.id}, 
	            React.createElement("div", {className: css_utils_1.addPrefixToClass('container-scrollable'), ref: function (ref) { return _this.ref = ref; }, style: {
	                bottom: this.props.horzScrollBarReplacerHeight ? this.props.horzScrollBarReplacerHeight + 'px' : '0px',
	                overflowX: this.props.overflowX,
	                overflowY: this.props.overflowY,
	                right: this.props.vertScrollBarReplacerWidth ? this.props.vertScrollBarReplacerWidth + 'px' : '0px'
	            }}, 
	                React.createElement(ScrollableContainerContent_1.ScrollableContainerContent, {contentWidth: this.props.contentWidth, contentHeight: this.props.contentHeight, dataRenderer: this.props.dataRenderer, data: this.props.data}, this.props.children)
	            )
	        ));
	    };
	    ScrollableContainer.prototype.updateScrollPositions = function () {
	        if (this.ref) {
	            this.ref.scrollLeft = this.props.scrollLeft;
	            this.ref.scrollTop = this.props.scrollTop;
	        }
	    };
	    ScrollableContainer.defaultProps = {
	        className: '',
	        contentHeight: 'auto',
	        contentWidth: 'auto',
	        height: '100%',
	        horzScrollBarReplacerHeight: 0,
	        overflowX: 'auto',
	        overflowY: 'auto',
	        scrollLeft: 0,
	        scrollTop: 0,
	        style: {},
	        vertScrollBarReplacerWidth: 0,
	        width: '100%'
	    };
	    return ScrollableContainer;
	}(React.PureComponent));
	exports.ScrollableContainer = ScrollableContainer;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Nyb2xsYWJsZUNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNjcm9sbGFibGVDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLDBCQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELDRCQUE0Qix3QkFBd0IsQ0FBQyxDQUFBO0FBSXJELDJDQUEyQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRTFFLFFBQU8saUJBQWlCLENBQUMsQ0FBQTtBQUV6QjtJQUF5Qyx1Q0FBdUU7SUFpQjVHLDZCQUFZLEtBQStCO1FBakIvQyxpQkFzSEM7UUFwR08sa0JBQU0sS0FBSyxDQUFDLENBQUM7UUEwRFQsdUJBQWtCLEdBQ3RCLGNBQU0sT0FBQSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQztRQUUzQixpQkFBWSxHQUE2QixVQUFDLEtBQUs7WUFDbkQsSUFBSSxVQUFVLEdBQUksS0FBSyxDQUFDLE1BQWtCLENBQUMsVUFBVSxDQUFDO1lBQ3RELElBQUksU0FBUyxHQUFJLEtBQUssQ0FBQyxNQUFrQixDQUFDLFNBQVMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQVNNLHNCQUFpQixHQUFlO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksUUFBUSxHQUFHO29CQUNYLHFCQUFxQixFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtvQkFDcEUsb0JBQW9CLEVBQUUsS0FBSSxD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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cssVars_1 = __webpack_require__(8);
	var classPrefix = cssVars_1.CSS_VARS['base-css-name'];
	function addPrefixToClass(className) {
	    return classPrefix + "-" + className;
	}
	exports.addPrefixToClass = addPrefixToClass;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3NzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBeUIsa0JBQWtCLENBQUMsQ0FBQTtBQUU1QyxJQUFNLFdBQVcsR0FBRyxrQkFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRTlDLDBCQUFpQyxTQUFpQjtJQUM5QyxNQUFNLENBQUksV0FBVyxTQUFJLFNBQVcsQ0FBQztBQUN6QyxDQUFDO0FBRmUsd0JBQWdCLG1CQUUvQixDQUFBIn0=

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    CSS_VARS: {
	        'base-css-name': 'react-container'
	    }
	};



/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	function joinClasses() {
	    var classNames = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        classNames[_i - 0] = arguments[_i];
	    }
	    var result = '';
	    for (var i = 0; i < classNames.length; i++) {
	        var nextClass = classNames[i];
	        if (nextClass) {
	            result = (result ? result + ' ' : '') + nextClass;
	        }
	    }
	    return result;
	}
	exports.joinClasses = joinClasses;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbkNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqb2luQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUE7SUFBNEIsb0JBQXVCO1NBQXZCLFdBQXVCLENBQXZCLHNCQUF1QixDQUF2QixJQUF1QjtRQUF2QixtQ0FBdUI7O0lBQy9DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRlLG1CQUFXLGNBUzFCLENBQUEifQ==

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(6);
	var css_utils_1 = __webpack_require__(7);
	__webpack_require__(1);
	var ScrollableContainerContent = (function (_super) {
	    __extends(ScrollableContainerContent, _super);
	    function ScrollableContainerContent() {
	        _super.apply(this, arguments);
	    }
	    ScrollableContainerContent.prototype.render = function () {
	        var wrapper = null;
	        if (this.props.contentWidth !== 'auto' || this.props.contentHeight !== 'auto') {
	            wrapper = (React.createElement("div", {className: css_utils_1.addPrefixToClass('container-wrapper'), style: {
	                left: this.props.contentWidth === 'auto' ? 0 : this.props.contentWidth - 1,
	                top: this.props.contentHeight === 'auto' ? 0 : this.props.contentHeight - 1
	            }}));
	        }
	        return (React.createElement("div", {style: {
	            height: this.props.contentHeight === 'auto' ? '100%' : this.props.contentHeight,
	            width: this.props.contentWidth === 'auto' ? '100%' : this.props.contentWidth
	        }, className: css_utils_1.addPrefixToClass('content')}, 
	            this.props.dataRenderer ? this.props.dataRenderer(this.props.data) : null, 
	            this.props.children, 
	            wrapper));
	    };
	    ScrollableContainerContent.defaultProps = {
	        contentHeight: 'auto',
	        contentWidth: 'auto'
	    };
	    return ScrollableContainerContent;
	}(React.PureComponent));
	exports.ScrollableContainerContent = ScrollableContainerContent;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Nyb2xsYWJsZUNvbnRhaW5lckNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTY3JvbGxhYmxlQ29udGFpbmVyQ29udGVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsMEJBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFFeEQsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBS3pCO0lBQWdELDhDQUFxRjtJQUFySTtRQUFnRCw4QkFBcUY7SUFpQ3JJLENBQUM7SUExQkcsMkNBQU0sR0FBTjtRQUNJLElBQUksT0FBTyxHQUFvQixJQUFJLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxHQUFHLENBQ04scUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBRSw0QkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBRSxFQUNsRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQztnQkFDMUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQzthQUM3RSxFQUNKLENBQ0wsQ0FBQztRQUNOLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsS0FBSyxFQUFFO1lBQ0osTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO1lBQy9FLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtTQUM5RSxFQUNGLFNBQVMsRUFBRSw0QkFBZ0IsQ0FBQyxTQUFTLENBQUU7WUFFdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFLO1lBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztZQUNwQixPQUFRLENBQ1AsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQTlCTSx1Q0FBWSxHQUFvQztRQUNuRCxhQUFhLEVBQUUsTUFBTTtRQUNyQixZQUFZLEVBQUUsTUFBTTtLQUN2QixDQUFDO0lBNEJOLGlDQUFDO0FBQUQsQ0FBQyxBQWpDRCxDQUFnRCxLQUFLLENBQUMsYUFBYSxHQWlDbEU7QUFqQ1ksa0NBQTBCLDZCQWlDdEMsQ0FBQSJ9

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	var React = __webpack_require__(6);
	function baseRender(Comp) {
	    return (function (_super) {
	        __extends(BaseRender, _super);
	        function BaseRender() {
	            _super.apply(this, arguments);
	        }
	        BaseRender.prototype.render = function () {
	            return React.createElement(Comp, __assign({}, this.props));
	        };
	        return BaseRender;
	    }(React.Component));
	}
	exports.baseRender = baseRender;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2VSZW5kZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFJL0Isb0JBQXNFLElBQXlCO0lBQzNGLE1BQU0sQ0FBQztRQUF5Qiw4QkFBc0I7UUFBL0M7WUFBeUIsOEJBQXNCO1FBSXRELENBQUM7UUFIRywyQkFBTSxHQUFOO1lBQ0ksTUFBTSxDQUFDLG9CQUFDLElBQUksZUFBSyxJQUFJLENBQUMsS0FBSyxFQUFJLENBQUM7UUFDcEMsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQUpNLENBQXlCLEtBQUssQ0FBQyxTQUFTLEVBSTlDLENBQUM7QUFDTixDQUFDO0FBTmUsa0JBQVUsYUFNekIsQ0FBQSJ9

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var baseRender_1 = __webpack_require__(11);
	function mounted(Comp, onMounted, onUnmounting) {
	    return (function (_super) {
	        __extends(Mounted, _super);
	        function Mounted() {
	            _super.apply(this, arguments);
	        }
	        Mounted.prototype.componentDidMount = function () {
	            onMounted.call(this);
	        };
	        Mounted.prototype.componentWillUnmount = function () {
	            onUnmounting.call(this);
	        };
	        return Mounted;
	    }(baseRender_1.baseRender(Comp)));
	}
	exports.mounted = mounted;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vdW50ZWQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDJCQUEyQixjQUFjLENBQUMsQ0FBQTtBQUcxQyxpQkFBOEIsSUFBOEIsRUFBRSxTQUFxQixFQUFFLFlBQXdCO0lBQ3pHLE1BQU0sQ0FBQztRQUFzQiwyQkFBNkM7UUFBbkU7WUFBc0IsOEJBQTZDO1FBTzFFLENBQUM7UUFORyxtQ0FBaUIsR0FBakI7WUFDSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxzQ0FBb0IsR0FBcEI7WUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FBQyxBQVBNLENBQXNCLHVCQUFVLENBQThCLElBQUksQ0FBQyxFQU96RSxDQUFDO0FBQ04sQ0FBQztBQVRlLGVBQU8sVUFTdEIsQ0FBQSJ9

/***/ }
/******/ ])
});
;