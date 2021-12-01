import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// mount function to start the app
const mount = (el) => {
    ReactDOM.render(<App />, el)
}

// If we are running in Dev & in Isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#_marketing-dev-root");

    if (devRoot) {
        mount(devRoot);
    }
}


// We are running through Container
// we should export mount function
export { mount };