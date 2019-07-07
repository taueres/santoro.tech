import {processCommandOutput} from './command';

const letterRegex = /^[a-z]$/i;

export const initialState = {
  consoleLine: '',
  output: []
};

export function reducer(state, {type, payload}) {
  switch (type) {
    case 'KEY_PRESSED': {
      const {key, ctrlKey} = payload;

      if (ctrlKey) {
        return state;
      }

      if (letterRegex.test(key)) {
        return {
          ...state,
          consoleLine: state.consoleLine + key
        };
      }
    
      if (key === 'Backspace' && state.consoleLine.length > 0) {
        return {
          ...state,
          consoleLine: state.consoleLine.slice(0, -1)
        };
      }

      if (key === 'Enter') {
        return {
          ...state,
          consoleLine: '',
          output: processCommandOutput(state.output, state.consoleLine)
        };
      }

      return state;
    }
    default:
      return state;
  }
}
