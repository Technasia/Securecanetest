import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getCurrentUser } from './model/Functions';
import Home from './component/Home';
import AuthorisedPage from './component/AuthorisedPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Routes>
      <Route {...rest} render={props => (
        getCurrentUser() ? (
          <Component {...props} />
        ) : (
            <Navigate to={{
              pathname: '/',
              state: { from: props.location }
            }} />
          )
      )} />
    </Routes>
)
const NonPrivateRoute = ({ component: Component, ...rest }) => (
    <Routes>
      <Route {...rest} render={props => (
        getCurrentUser() ? (
          <Navigate to={{
            pathname: "/auth",
            state: { from: props.location }
          }} />
        ) : (
            <Component {...props} />
          )
      )} />
    </Routes>
)

function App() {
  return (
    <Router>
        <NonPrivateRoute exact path="/" element={<Home/>} />
        <PrivateRoute exact path="/auth" element={<AuthorisedPage/>} />
    </Router>
  );
}

export default App;
