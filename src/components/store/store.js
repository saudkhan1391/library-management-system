import React from 'react'
const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADED_DATES":
            return { ...state, loadedDates: action.payload };
        default:
            return state;
    }
};
export default class ContextProvider extends React.Component {
    state = {
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }, id: null

    }
    render() {
        let { state, props: { children } } = this;
        return (
            <Context.Provider value={state}>{children}</Context.Provider>
        )
    }
}
export const ContextConsumer = Context.Consumer;