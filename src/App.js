import React, { useEffect } from 'react'
// import DemoHookRedux from './SearchApp/SearchApp';
import {createBrowserHistory} from 'history'
import TipCauculator from './TipCauculatorApp/TipCauculator';
export const history = createBrowserHistory();

export default function App() {
  return (
    <TipCauculator/>
  )
}
