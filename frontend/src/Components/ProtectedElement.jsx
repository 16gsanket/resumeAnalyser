import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedElement() {
    // Access the auth state correctly
    const stalestate = useSelector((state)=>state)
    console.log('stalestate ',stalestate);
    

    const authState = useSelector((state) => state.auth);
    console.log('auth state from auth:', authState);
    
    const isAuthenticated = authState?.isAuthenticated || false;
  
    return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
  }

export default ProtectedElement