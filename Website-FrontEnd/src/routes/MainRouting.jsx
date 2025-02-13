import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import AuthenticationPages from './01_AuthenticationPages';


//Routes



//Authentication
import { loadAuth } from '../features/user'
import { useDispatch,useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'


function MainRouting() {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  if (isAuthLoading) {
    return (
    <div className="flex-1 justify-center items-center bg-white">
    <div className="transform scale-150">
            <ActivityIndicator size="large" color="#28A361" />
       </div>
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