import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { MainPage } from './pages/Main';
import { ContextProvider } from './context/MyContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ContextProvider>
        <>
          <Route path="/room" component={App} />
          <Route exact path="/" component={MainPage} />
        </>
      </ContextProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);
