import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./App"
import { StateProvider } from "./Context/StateProvider"
import { initialState } from "./Context/initalState"
import reducer from "./Context/reducer"
import Footer from "./components/Footer"
import './i18next'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
        <Footer />
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

