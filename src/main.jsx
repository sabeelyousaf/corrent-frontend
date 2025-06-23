import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {store, persistor} from './redux/store.js';
import {PersistGate} from 'redux-persist/integration/react';
import {Toaster} from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import {Provider as ReduxProvider} from 'react-redux';
createRoot (document.getElementById ('root')).render (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    <Toaster />
  </ReduxProvider>
);
