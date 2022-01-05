import React from 'react'
import ReactDOM from 'react-dom'
// import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { SecureLife } from './components/SecureLife.js'
import SSRProvider from 'react-bootstrap/SSRProvider'
import '../node_modules/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SSRProvider>
        <SecureLife />
      </SSRProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
