import React from 'react';

import ComplexTreeComponent, { events as eventsComplexTree, triggers as triggersComplexTree, config as configComplexTree } from './ComplexTreeComponent'

export function ComplexTree(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ComplexTreeComponent {...props} />);
}

export function registerComplexTree(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: ComplexTree,
        type: 'tree-complex',
        events: eventsComplexTree,
        triggers: triggersComplexTree,
        config: configComplexTree
    });
}
