import { configureStore } from 'redux-starter-kit';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from './reducers';

export default function createStore(preloadedState, devtoolsOpts = {}) {
  const reducer = rootReducer;

  let store = undefined;
  if (process.env.NODE_ENV !== 'production') {
    let addtlOpts = {};
    if (devtoolsOpts.remote) {
      addtlOpts.devTools = false;
      addtlOpts.enhancers = [devToolsEnhancer(devtoolsOpts)];
    }

    store = configureStore({
      reducer,
      preloadedState,
      ...addtlOpts,
    });

    if (module.hot) {
      module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    }
  }

  if (process.env.NODE_ENV === 'production') {
    store = configureStore({
      reducer,
      preloadedState,
    });
  }

  return store;
}
