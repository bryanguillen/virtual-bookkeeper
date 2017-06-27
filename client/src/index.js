import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import UserHome from './components/UserHome';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<UserHome />, document.getElementById('root'));
registerServiceWorker();
