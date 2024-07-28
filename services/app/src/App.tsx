import '@styles';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AlertsConsumer, AlertsProvider, AuthConsumer, AuthProvider, BottomPopupConsumer, BottomPopupProvider, TelegramConsumer, TelegramProvider } from '@providers';

function App() {
  return (
    <BrowserRouter>
      <TelegramProvider>
        <AuthProvider>
          <AlertsProvider>
            <BottomPopupProvider>
              <AlertsConsumer/>
              <AppRouter/>
              <TelegramConsumer/>
              <AuthConsumer/>
              <BottomPopupConsumer/>
            </BottomPopupProvider>
          </AlertsProvider>
        </AuthProvider>
      </TelegramProvider>
    </BrowserRouter>
  )
}

export default App