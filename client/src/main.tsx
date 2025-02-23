import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import { Toaster} from "react-hot-toast";
import { ToastProvider } from './context/toast-context.tsx';
import { EditorProvider } from "./context/editor-context.tsx";
import { SocketProvider } from './context/socket-context.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <SocketProvider>
        <ToastProvider>
          <EditorProvider>
            <BrowserRouter>
              <Toaster position='bottom-left' toastOptions={{
                className: "custom-toast",
                success: { duration: 5000, },
                error: { duration: 5000,}
              }}
              />
              <App />
            </BrowserRouter>
          </EditorProvider>
        </ToastProvider>
      </SocketProvider>
    </Provider>
)
