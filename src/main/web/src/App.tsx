import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {


  return (
    <div className="App">
      <header className="App-header"> 
      <h1 style={{color: 'black'}}>Shift Management System</h1>       
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/shift-management" />
            </Route>
            <Route path="/shift-management" component={Home} />
            <Route path="/register" component ={Register} />
            <Route path="/login" component={Login} />
            <Route path="/:userName?/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
