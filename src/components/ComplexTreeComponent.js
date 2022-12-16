import React from 'react';
// core dependencies
// This only needs to be done once; probably during your application's bootstrapping process.

import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';   // https://github.com/lukasbach/react-complex-tree
import 'react-complex-tree/lib/style.css';

import { structs } from 'modelui-core-runtime'

export const events = structs.TreeBase.events;
export const triggers = structs.TreeBase.triggers;

export const options = {
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
}


export const config = {

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
}
// styles
// event handler
// https://react-swipeable-views.com/api/api/
// https://maxmarinich.github.io/react-alice-carousel/#basic

// const handleDragStart = (e) => e.preventDefault();

class ComplexTreeComponent extends structs.TreeBase.TreeBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    super(props);
    this.props = props;
    this.instance = null;
    this.self = this;
  }

  getIdByEvent = (evt) => {
    let event_data = null;
    try {
      event_data = this.state.data[evt.item];
    } catch (e) {
      // TODO: handle error where we could not index item
      return
    }
    return event_data;
  }

  showSelected = (id, idx) => {
    return true; // returns false to notify not to change state
  }

  updateView = (action, arr, updated, data) => {
    // extend by parent
    if (action === 'select') {
      const selected_array = [];
      arr.forEach(itm => { // for each item in selected array
        selected_array.push(itm.id);
      });
      // this.instance.selectItems(selected_array, 'tree-1');
      return true;
    }
    if (action === 'push') {
      console.log("asfd");
      // this.instance.
    }
    return false;
  }

  handleDragStart = (e) => e.preventDefault();

  canDrop = ({ node, nextParent, prevPath, nextPath }) => {
    // check if node.type in node.group.allow and not in node.group.expel
    if (nextParent) {
      if (nextParent.drop) {
        try {
          if (nextParent.drop.allow) {
            if (nextParent.drop.allow.includes(node.type)) { return true; }
          }
          if (nextParent.drop.deny) {
            if (nextParent.drop.deny.includes(node.type)) { return false; }
          }
        } catch (e) { console.warning("Could not process drop: " + e); return false; }
        return true; // TODO: should be false
      }
    }
    return false;
  }

  getList(data) {
    const items = {};
    const root_children = [];
    data.forEach((itm) => {
      // create if missing
      if (!items[itm.id]) { items[itm.id] = {} }
      // fill data
      items[itm.id].index = itm.id;
      items[itm.id].canMove = true;
      items[itm.id].hasChildren = false;
      items[itm.id].children = [];
      items[itm.id].data = itm.title;
      items[itm.id].canRename = true;
      // if itm has parent
      if (itm.parent) {
        // create if missing
        if (!items[itm.parent]) { items[itm.parent] = { children: [] } }
        // add parent
        items[itm.parent].children.push(itm.id);
        items[itm.parent].hasChildren = true;
      } else {
        root_children.push(itm.id);
      }
    });

    // TODO: check if zero then select find root
    items["root"] = {
      index: 'root',
      canMove: true,
      hasChildren: true,
      children: root_children,
      data: 'Root item ---',
      canRename: true,
    }
    return items;
  }

  onSelectItems = (items, treeId, b) => {
    /// where items is an array of ids
    if (items.length) {
      const idx = this.findItemIndexById(items[0], this.state.data);
      const itm = this.state.data[idx];
      if (itm) {
        if (itm.expanded !== undefined) {
          itm.expanded = !itm.expanded;
          this.updateItem(itm.id, itm, true); // updates without triggering event
        }
        this.triggerAction("select", { id: itm.id })
      }
    }
  }

  onDrop = (items, target) => {
    const itm = items[0]; // TODO: support multiple selection and movement of items
    const data = [...this.state.data]; // copy
    const idx = this.findItemIndexById(itm.index, this.state.data)
    const moved = this.state.data[idx];
    const parent_idx = this.findItemIndexById(target.parentItem, this.state.data)
    const parent = this.state.data[parent_idx];
    // TODO: check if can drop
    // TODO: respect ordering (allow user to add on top or bellow other items)
    if (moved && parent) { moved.parent = parent.id; }
    this.triggerAction('replace', data);
  }

  render() {
    // const TEAM_COLORS = ['Red', 'Black', 'Green', 'Blue'];
    // const getNodeKey = ({ node: { id } }) => id;
    const items = this.getList(this.state.data)
    this.viewStyle = this.props.config.options;
    const state = this.getItemTreeState();

    return (
      <ControlledTreeEnvironment
        canDragAndDrop={true}
        canDropOnItemWithChildren={true}
        canReorderItems={true}
        canRename={false} // disable for now
        items={items}
        // dataProvider={new StaticTreeDataProvider(items, (item, data) => ({ ...item, data }))}
        getItemTitle={item => item.data}
        onSelectItems={this.onSelectItems}
        onDrop={this.onDrop}
        viewState={{
          ['tree-1']: {
            expandedItems: state.expanded,
            focusedItem: state.focused,
            selectedItems: state.selected,
          }
        }
        }
        ref={instance => { this.instance = instance; }}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </ControlledTreeEnvironment>
    );
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

}

export default ComplexTreeComponent;