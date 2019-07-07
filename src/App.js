import React, {useReducer, useEffect} from 'react';
import {reducer, initialState} from './reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const handleCharTyped = event => {
      const action = {
        type: 'KEY_PRESSED',
        payload: {
          ctrlKey: event.ctrlKey,
          key: event.key
        }
      };
      dispatch(action);
    };
    document.addEventListener('keydown', handleCharTyped);
    return () => document.removeEventListener('keydown', handleCharTyped);
  }, []);

  const {consoleLine, output, colorIdx} = state;

  return (
    <div className={`color-${colorIdx}`}>
      <h2>Welcome to Sergio's place! <span className="psst">(psst... finally a visitor!)</span></h2>
      <pre>
        Do you want to get in touch? That's great!<br/>
        <br/>
        Use the following commands to learn more:<br/>
        {' '}* "<b>about</b>"   - learn more about me<br/>
        {' '}* "<b>social</b>"  - social networks I use<br/>
        {' '}* "<b>contact</b>" - my email addresses<br/>
        {' '}* "<b>wtf</b>"     - a little surprise!<br/><br/>
      </pre>
      <pre className="inline interactive">
        {output}
Your input: {consoleLine}<span className="cursor"></span>
      </pre>
      <input id="letsfocus" type="password"/>
    </div>
  );
}

export default App;
