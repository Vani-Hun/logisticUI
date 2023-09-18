import { useEffect } from 'react';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

function StaffRoute() {
  const { user, checkAuthenticated } = useContext(MainContext)
  /*  const [valid, setValid] = useState(false) */
  const navigate = useNavigate()
  useEffect(async () => {
    const login = localStorage.getItem("login")
    if (login) {
      await checkAuthenticated()
    }
  }, [user])
  useEffect(() => {
    if (user === "admin") {
      navigate("/quan-tri", { replace: true });
    }
    else if (user === "storekeeper") {
      navigate("/thu-kho", { replace: true });
    }
    else if (user === "driver") {
      navigate("/tai-xe/dat-hang", { replace: true });
    }
  }, [user])
  return <Outlet />;
};
export default StaffRoute