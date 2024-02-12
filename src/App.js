import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConnectWalletPage from './pages/ConnectWalletPage';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <ConnectWalletPage />
                    </Route>
                    <Route path="/register">
                        <RegistrationPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
dF