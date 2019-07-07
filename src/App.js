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

  const {consoleLine, output} = state;

  return (
    <>
      <pre className="inline">
        {output}
Your input: {consoleLine}<span className="cursor"></span>
      </pre>
      <input id="letsfocus" type="password"/>
    </>
  );
}

export default App;
