import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>Health Train</div>
    </Provider>
  );
}

export default App;
