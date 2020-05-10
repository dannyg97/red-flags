import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

// Basic react renderer. Code is going to be injected into the #root div
ReactDom.render(<App />, document.querySelector('#root'));