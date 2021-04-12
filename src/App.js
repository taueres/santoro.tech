import React, {useReducer, useEffect, useCallback} from 'react';
import {reducer, initialState} from './reducer';

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const handleCharTyped = event => {
      if (isTouchDevice() && event.key !== 'Backspace' && event.key !== 'Enter') {
        return;
      }
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

  useEffect(() => window.scrollTo(0, document.body.scrollHeight), [state.output]);

  const onInputChange = useCallback(event => {
    event.preventDefault();
    const action = {
      type: 'KEY_PRESSED',
      payload: {
        ctrlKey: false,
        key: event.nativeEvent.data,
      }
    };
    dispatch(action);
  }, []);

  useEffect(() => {
    if (isTouchDevice()) {
      const handler = () => {
        document.getElementById('letsfocus').focus();
      };
      document.addEventListener('click', handler);
      return () => {
        document.removeEventListener('click', handler);
      };
    }
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
        <div className="view-source">
          Curious to see how this app works?
          {' '}<a href="https://github.com/taueres/santoro.tech" target="_blank" rel="noreferrer nofollow">View source</a>
        </div><br/>
      </pre>
      <pre className="inline interactive">
        {output}
Your input: {consoleLine}<span className="cursor"></span>
      </pre>
      {isTouchDevice() && <input id="letsfocus" type="password" onChange={onInputChange}/>}
    </div>
  );
}

export default App;
