import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Sweet Shop Management</h1>
      <Link to="/user-signup">User Signup</Link> | 
      <Link to="/user-login">User Login</Link> | 
      <Link to="/admin-login">Admin Login</Link>
    </div>
  );
}

export default Home;
