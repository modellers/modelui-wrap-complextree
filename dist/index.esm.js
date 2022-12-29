import { structs, layout } from 'modelui-core-runtime';
import React from 'react';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import 'react-complex-tree/lib/style.css';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var events = structs.TreeBase.events;
var triggers = structs.TreeBase.triggers;
var options = {
  "id": "tree-complex",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Complex Tree options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "autoPlayStrategy": {
      "title": "Auto Play Strategy",
      "description": "Auto play strategy",
      "type": "string",
      "enum": ['default', 'action', 'all', 'none'],
      "default": "default"
    },
    "autoPlayInterval": {
      "title": "Auto Play Interval",
      "description": "Auto play interval",
      "type": "number",
      "default": 2000
    },
    "infinite": {
      "title": "Infinite",
      "description": "Infinite",
      "type": "boolean",
      "default": true
    }
  },
  "required": ["autoPlayStrategy", "autoPlayInterval", "infinite"]
};
var config = {
  name: "Complex Tree",
  type: "tree-complex",
  author: "Kjartan Jónsson",
  description: "Complex Tree component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent

  },
  options: options,
  state: structs.TreeBase.StateTree
}; // styles
// event handler
// https://react-swipeable-views.com/api/api/
// https://maxmarinich.github.io/react-alice-carousel/#basic
// const handleDragStart = (e) => e.preventDefault();

var ComplexTreeComponent = /*#__PURE__*/function (_structs$TreeBase$Tre) {
  _inherits(ComplexTreeComponent, _structs$TreeBase$Tre);

  var _super = _createSuper(ComplexTreeComponent);

  /**
   * Used to manage internal state of avatars
   */
  function ComplexTreeComponent(props) {
    var _this;

    _classCallCheck(this, ComplexTreeComponent);

    _this = _super.call(this, props);

    _this.getIdByEvent = function (evt) {
      var event_data = null;

      try {
        event_data = _this.state.data[evt.item];
      } catch (e) {
        // TODO: handle error where we could not index item
        return;
      }

      return event_data;
    };

    _this.showSelected = function (id, idx) {
      return true; // returns false to notify not to change state
    };

    _this.updateView = function (action, arr, updated, data) {
      // extend by parent
      if (action === 'select') {
        var selected_array = [];
        arr.forEach(function (itm) {
          // for each item in selected array
          selected_array.push(itm.id);
        }); // this.instance.selectItems(selected_array, 'tree-1');

        return true;
      }

      if (action === 'push') {
        console.log("asfd"); // this.instance.
      }

      return false;
    };

    _this.handleDragStart = function (e) {
      return e.preventDefault();
    };

    _this.canDrop = function (_ref) {
      var node = _ref.node,
          nextParent = _ref.nextParent;
          _ref.prevPath;
          _ref.nextPath;

      // check if node.type in node.group.allow and not in node.group.expel
      if (nextParent) {
        if (nextParent.drop) {
          try {
            if (nextParent.drop.allow) {
              if (nextParent.drop.allow.includes(node.type)) {
                return true;
              }
            }

            if (nextParent.drop.deny) {
              if (nextParent.drop.deny.includes(node.type)) {
                return false;
              }
            }
          } catch (e) {
            console.warning("Could not process drop: " + e);
            return false;
          }

          return true; // TODO: should be false
        }
      }

      return false;
    };

    _this.onSelectItems = function (items, treeId, b) {
      /// where items is an array of ids
      if (items.length) {
        var idx = _this.findItemIndexById(items[0], _this.state.data);

        var itm = _this.state.data[idx];

        if (itm) {
          if (itm.expanded !== undefined) {
            itm.expanded = !itm.expanded;

            _this.updateItem(itm.id, itm, true); // updates without triggering event

          }

          _this.triggerAction("select", {
            id: itm.id
          });
        }
      }
    };

    _this.onDrop = function (items, target) {
      var itm = items[0]; // TODO: support multiple selection and movement of items

      var data = _toConsumableArray(_this.state.data); // copy


      var idx = _this.findItemIndexById(itm.index, _this.state.data);

      var moved = _this.state.data[idx];

      var parent_idx = _this.findItemIndexById(target.parentItem, _this.state.data);

      var parent = _this.state.data[parent_idx]; // TODO: check if can drop
      // TODO: respect ordering (allow user to add on top or bellow other items)

      if (moved && parent) {
        moved.parent = parent.id;
      }

      _this.triggerAction('replace', data);
    };

    _this.props = props;
    _this.instance = null;
    _this.self = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(ComplexTreeComponent, [{
    key: "getList",
    value: function getList(data) {
      var items = {};
      var root_children = [];
      data.forEach(function (itm) {
        // create if missing
        if (!items[itm.id]) {
          items[itm.id] = {};
        } // fill data


        items[itm.id].index = itm.id;
        items[itm.id].canMove = true;
        items[itm.id].hasChildren = false;
        items[itm.id].children = [];
        items[itm.id].data = itm.title;
        items[itm.id].canRename = true; // if itm has parent

        if (itm.parent) {
          // create if missing
          if (!items[itm.parent]) {
            items[itm.parent] = {
              children: []
            };
          } // add parent


          items[itm.parent].children.push(itm.id);
          items[itm.parent].hasChildren = true;
        } else {
          root_children.push(itm.id);
        }
      }); // TODO: check if zero then select find root

      items["root"] = {
        index: 'root',
        canMove: true,
        hasChildren: true,
        children: root_children,
        data: 'Root item ---',
        canRename: true
      };
      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // const TEAM_COLORS = ['Red', 'Black', 'Green', 'Blue'];
      // const getNodeKey = ({ node: { id } }) => id;
      var items = this.getList(this.state.data);
      this.viewStyle = this.props.config.options;
      var state = this.getItemTreeState();
      return /*#__PURE__*/React.createElement(ControlledTreeEnvironment, {
        canDragAndDrop: true,
        canDropOnItemWithChildren: true,
        canReorderItems: true,
        canRename: false // disable for now
        ,
        items: items // dataProvider={new StaticTreeDataProvider(items, (item, data) => ({ ...item, data }))}
        ,
        getItemTitle: function getItemTitle(item) {
          return item.data;
        },
        onSelectItems: this.onSelectItems,
        onDrop: this.onDrop,
        viewState: _defineProperty({}, 'tree-1', {
          expandedItems: state.expanded,
          focusedItem: state.focused,
          selectedItems: state.selected
        }),
        ref: function ref(instance) {
          _this2.instance = instance;
        }
      }, /*#__PURE__*/React.createElement(Tree, {
        treeId: "tree-1",
        rootItem: "root",
        treeLabel: "Tree Example"
      }));
      /*
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <SortableTree
            treeData={tree}
            canDrop={this.canDrop}
            onChange={(tree) => {
              const data = this.getListFromTree(tree);
               this.setInstanceState({ ...this.state, data: data, tree: tree });
              // data changed lets notify
              EventManager.getInstance().addEvent(this.props.id, 'changed', { count: data.length, items: data }, {});
             }}
             generateNodeProps={({ node, path }) => {
              let x = {};
              // if (node.id === this.state.selectedId) {
              if (node.selected) {
                x = {
                  boxShadow: `0 0 0 1px rgb(245 0 87 / 72%)`,
                }
              }
              return {
                style: x,
                //title: `${playerColor} ${path.length === 1 ? 'Captain' : node.title}`,
                 onClick: () => {
                  /// FIXME: disabling code bellow will make open and closing the tree work again
                  const idx = this.findItemIndexById(node.id, this.state.data);
                  const tree_item = this.state.data[idx];
                  const state = { ...this.state };
                  state.selectedId = tree_item.id;
                  this.setState(state);
                  this.setSelectedId(state.selectedId);
                  ////
                },
              };
            }
            }
          />
        </div>
      );
      */
    }
  }]);

  return ComplexTreeComponent;
}(structs.TreeBase.TreeBase);

function ComplexTree(props) {
  // lets enumerate schema to extract uiSchema and validation
  return /*#__PURE__*/React.createElement(ComplexTreeComponent, props);
}
function registerComplexTree(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: ComplexTree,
    type: 'tree-complex',
    events: events,
    triggers: triggers,
    config: config
  });
}

// Managers and factories
function registerComponents(component_manager) {
  if (!component_manager) {
    component_manager = layout.Manager.ComponentManager.getInstance();
  }
  /*
  if (component_manager.constructor.name !== 'ComponentManager') {
      throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
  }
  */


  registerComplexTree(component_manager);
}

export { registerComponents };
//# sourceMappingURL=index.esm.js.map
