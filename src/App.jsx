import { Switch, Route } from 'react-router-dom';

import { Auth } from './pages/Auth';
import { Home } from './pages/Home';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/auth'>
        <Auth />
      </Route>
    </Switch>
  );
};

export { App };
