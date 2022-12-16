import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { layout } from 'modelui-core-runtime';
import { structs } from 'modelui-core-runtime';

import { Layout } from './components/Grid/Grid';
// import { Dialog } from './components/Modal/Modal';
// import EventManager, { getTransformFunction } from './event/Event';

import registerComponents from './components/Components';
import { registerEventDebugging, registerEventApp } from './event/CommonEvents';

import { ThemeProvider } from '@mui/material/styles';

class AppBase extends React.Component {

  state = {
    modal: [],
    view: [],
    data: [],
    sources: [],
    events: [],
    transform: {}
  };

  data_sources = {};

  constructor(props) {
    super(props);
    
    // get access to manager instances
    this.stateManager = layout.Manager.ComponentManager.getInstance().getStateManager();
    this.eventManager = layout.Manager.ComponentManager.getInstance().getEventManager();

    // register components
    registerComponents();

    // clear all
    this.eventManager.clearAll(); // EventManager.getInstance().clearAll();

    // add specific solutions
    registerEventDebugging();
    registerEventApp();

  }

  initDataSources = (state) => {

    state = state || this.state;
    // register static memory
    this.stateManager.clearAll();
    this.stateManager.createState({
      id: "document_root",
      type: "layout",
      schema: {},
      config: {},
      data: this.state.view
    })
    /*
    stateManager.createState({
      id: "app",
      type: "app",
      schema: {},
      config: {},
      data: {}
    })
    */
    // register the view and then the modals
    this.stateManager.createLayoutState(state.view);
    this.stateManager.createLayoutState(state.modal);
    // register components for memory database
    this.stateManager.createStates(state.sources);
    // set dealy since we need to register all the component first
    // this is for being able to apply filtering on registered components
    state.events.forEach(evt => {
      if (typeof (evt.transform) !== 'function') {
        evt.transform =  structs.getTransformFunction(evt);
      }
    })
    this.eventManager.watch(state.events);

  }

  componentDidMount = () => {
    const eventMgr = this.eventManager;
    // notify ready event
    eventMgr.addEvent('app', 'ready', {}, {});
    window.eventManager = eventMgr;
    this.renderReady();
  }

  renderBody = () => {

    const is_ready = true;
    const manager = layout.Manager.ComponentManager.getInstance(); // layout.Manager.ComponentManager;

    if (is_ready) {
      return (
        <div>
          <Layout
            id="document_root"
            schema={{}}
            config={{
            }}
            data={this.state.view}
            manager={manager}
          />
          {
            /*
            this.state.modal.map((itm, idx) => (
              <Dialog
                key={itm.id}
                id={itm.id}
                data={itm.data}
                config={itm.config}
                schema={itm.schema}
                manager={manager}
              />
            ))
            */
          }</div>)

    } else {
      return (<div> LOADING ... </div>)
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div>
            {this.renderBody()}
          </div>
        </div >
      </ThemeProvider>
    );
  }
}

export default AppBase;
