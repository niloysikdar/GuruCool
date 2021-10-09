import { Switch, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
      </Switch>
    </>
  );
};

export { App };
