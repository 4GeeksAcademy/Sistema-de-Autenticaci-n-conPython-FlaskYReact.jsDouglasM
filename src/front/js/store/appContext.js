import React, { useState, useEffect } from "react";
import { Context } from "/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/js/store/flux.js"; // Verifica la ruta
import getState from "/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/js/store/flux.js"; // Asegúrate de que la ruta sea correcta

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState(prevState => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions }
                    }))
            })
        );

        useEffect(() => {
            state.actions.getMessage(); // Llamada de ejemplo a una acción
        }, [state.actions]);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
