import  { RequireAuth, Layout } from "../src/routes/LayoutStyle/LayoutStyle";
import Home from "./routes/Home/Home";
import ListPage from "./routes/ListPage/ListPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SinglePage from "./routes/SinglePage/SinglePage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import NewPost from "./routes/NewPost/NewPost";
import UpdateProfile from "./routes/UpdateProfile/UpdateProfile";
import { listPageLoader, profilePageLoader, singlePageLoader, updatePostLoader } from "./lib/loaders";
import UpdatePost from "./routes/UpdatePost/UpdatePost";
import About from "./routes/About/About";
import Contact from "./routes/Contact/Contact";
 




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader,

        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader,
        },
        
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children: [
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader:profilePageLoader
        },
        {
          path:"/profile/update",
          element:<UpdateProfile/>
        },
        {
          path:"/add",
          element:<NewPost/>
        },
        {
          path:"/update/:id",
          element:<UpdatePost/>,
          loader:updatePostLoader,
        },
        
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
