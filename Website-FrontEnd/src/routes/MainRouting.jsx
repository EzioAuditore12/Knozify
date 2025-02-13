import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";



//Routes
import AuthenticationPages from './01_AuthenticationPages';
import HomeScreenPage from './02_HomeScreenPage';


//Authentication
import { loadAuth } from '../features/user'
import { useDispatch,useSelector } from 'react-redux'


function MainRouting() {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <>
    {isAuthenticated ? <Outlet /> : <AuthenticationPages />}
    </>
  )
}

export default MainRouting
