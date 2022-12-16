import React from 'react';
import { action } from '@storybook/addon-actions'
// test utils
import { util } from 'modelui-core-runtime'
import registerComponents from './Components';

// components
import ComplexTreeComponent, { triggers, events, config } from './ComplexTreeComponent'
import { example_tree_array_items, example_generators } from '../test/data/TestTree';
import { layout } from 'modelui-core-runtime';

/// Event addon
export default {
  title: 'Components/Complex Tree',
  component: ComplexTreeComponent,
  argTypes: util.StoryUtil.createStoryArgumentTypesFromSchema(config.options)
};

export const Basic = (args) => {

  const props = {
    id: 'ComplexTreeBasic_id',
    type: 'tree-complex',
    data: example_tree_array_items,
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {util.StoryUtil.prepStoryComponent(layout.Manager.ComponentManager.getInstance(), action, registerComponents, props, triggers, events)}
      <ComplexTreeComponent {...props} />
    </div>
  );
};
Basic.args = {

}
