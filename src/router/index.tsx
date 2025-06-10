import { type Route } from '@/interface/routes';
import App from '@/App';
import authenPages from './authen';
import usersPages from './users';
import ProtectedRoute from '@/utils/authen/ProtectedRoute';

export const routes: Route[] = [...usersPages];   

export const router = [
    ...authenPages,
    {
        path: "/",
        element:(
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children : routes
    }
]