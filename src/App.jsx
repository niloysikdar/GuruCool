import { Switch, Route, useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { ClassRoom } from './pages/ClassRoomPage';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/auth' && <Navbar />}
      <Switch>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/classroom'>
          <ClassRoom />
        </Route>
      </Switch>
    </>
  );
};

export { App };
