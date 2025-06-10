import Login from "@/pages/authen/Login";

const authenPages = [
    {
        path: "/login",
        name: "Login",
        element: <Login />,
    },
    {
        path: "*",
        name: "Login",
        element: <Login />,
    }
]

export default authenPages;