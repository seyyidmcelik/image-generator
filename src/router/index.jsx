import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import('../pages/Home'))
const Generator = lazy(() => import('../pages/Generator'))
const Login = lazy(() => import('../pages/Login'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    },
    {
        path: '/generate',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Generator />
        </Suspense>
    },
    {
        path: '/login',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    }
])

export default router