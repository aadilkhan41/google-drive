import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { loginLoader } from './auth/loginLoader';
import { PrivateRoute } from './components/Compontents';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Login, Home, Shared, Layout } from './pages/Pages';

const routes = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,
        loader: loginLoader
    }, {
        path: '/',
        element:
            <PrivateRoute>
                <Layout />
            </PrivateRoute>,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: 'shared',
                element: <Shared />
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    </StrictMode>,
);