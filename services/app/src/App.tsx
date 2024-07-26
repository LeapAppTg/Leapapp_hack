import '@styles';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AlertsConsumer, AlertsProvider, AuthConsumer, AuthProvider, TelegramConsumer, TelegramProvider } from '@providers';

function App() {
  return (
    <BrowserRouter>
      <TelegramProvider>
        <AuthProvider>
          <AlertsProvider>
            <AlertsConsumer/>
            <AppRouter/>
            <TelegramConsumer/>
            <AuthConsumer/>
          </AlertsProvider>
        </AuthProvider>
      </TelegramProvider>
    </BrowserRouter>
  )
}

export default App