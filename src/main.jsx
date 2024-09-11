import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/Layout.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ItemDetailPage from "./components/ItemDetailPage.jsx";
import Dashboard from "./components/Dashboard.jsx";

//  M 1
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         children: [
//             {
//                 path: "",
//                 element: <HomePage />,
//             },
//         ],
//     },
//     {
//         path: "/Signup",
//         element: <Signup />,
//     },
//     {
//         path: "/Login",
//         element: <Login />,
//     },
// ]);
//

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<HomePage />} />
                <Route path="/ItemDetailPage" element={<ItemDetailPage />} />
                <Route path="/Dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
    </React.StrictMode>
);
