import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Spinner from './components/Spinner';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const SignIn = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/SingIn'));
const Chat = lazy(() => import('./pages/Chat'));

// Входная точка приложения.
// Корень всего сайта.
const App = () => {
    
    const { checkUser } = useAuth();
    const [appState, setAppState] = React.useState<'loading' | 'loaded'>('loading');

    React.useEffect(() => {
        (async () => {
            if (appState === 'loading') {
                await checkUser();
                setAppState('loaded');
            }
        })();
    }, [appState, checkUser]);

    return (
        <Router>
            <Suspense fallback={<Spinner />}>
                {appState === 'loading' ? (
                    <Spinner />
                ) : (
                    <Switch>
                        <Route exact path="/signin" component={SignIn}></Route>
                        <ProtectedRoute path="/home/" component={Home} />
                        <ProtectedRoute exact path="/chat" component={Chat} />
                        <Route component={NotFound} />
                    </Switch>
                )}
            </Suspense>
        </Router>
    );
};
export default hot(App);
