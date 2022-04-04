import React, { createContext, useReducer } from "react";

interface ContextFactoryI {
  reducer: any;
  actions: any;
  initialState: any;
  initializer?: any;
  useHook?: any;
  selectors?: any;
  name?: string;
}

export default ({
  reducer,
  actions,
  initialState,
  initializer = () => {
    return initialState;
  },
  useHook = () => {},
  selectors = {},
  name = "",
}: ContextFactoryI) => {
  const Context = createContext<any>(initialState);
  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState, initializer);
    const boundActions: any = {};
    const boundSelectors: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    for (let key in selectors) {
      boundSelectors[key] = selectors[key](state);
    }
    useHook({ state, ...boundActions });
    return (
      <Context.Provider value={{ state, ...boundActions, ...boundSelectors }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
