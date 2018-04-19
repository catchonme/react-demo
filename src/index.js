import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/index'
// import Simplest from './components/simplest'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
