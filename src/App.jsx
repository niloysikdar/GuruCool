import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Home } from './pages/Home';

const App = () => {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/' exact>
        <Home />
      </Route>
    </Switch>
  );
};

export { App };
