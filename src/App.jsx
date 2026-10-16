import { AuthProvider } from '@/contexts/Auth';
import { NotificationsProvider } from '@/contexts/Notifications';
import Main from '@/components/Main';

function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <Main />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;
