import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Actions } from "./Actions";
import { Provider } from "./Context";
import Form from "./components/Form";
import UserList from "./components/UserList";
import OrderDashboard from "./OrderDashboard";
import "./Home.css"; // ไฟล์ CSS ที่จะใส่ลูกเล่น
import "./index.css"; 

const Home = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [showAppCopy, setShowAppCopy] = useState(false);

  const handleShowAppCopy = () => {
    setShowAppCopy(true);
  };

  const handleSignOut = () => {
    signOut(); // เรียกใช้งาน signOut
    setShowAppCopy(false); // เปลี่ยนสถานะให้กลับไปที่หน้าแรก
  };

  const data = Actions();

  if (showAppCopy) {
    return (
      <Provider value={data}>
        <div className="App">
          <div className="background-parallax"></div>
          <h1 className="text-center text-gradient mb-5">React JS + PHP CRUD Application ข้อมูลนักศึกษา</h1>
          <div className="wrapper d-flex justify-content-center">
            <section className="left-side p-4 shadow-lg rounded">
              <Form />
            </section>
            <section className="right-side p-4 shadow-lg rounded">
              <UserList />
              <OrderDashboard />
            </section>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-danger btn-signout-animated mt-3" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </Provider>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card custom-card shadow-lg rounded">
            <div className="card-body text-center">
              <h2 className="card-title mb-4 text-gradient">
                Welcome, {user ? user.displayName : "Teacher"}!
              </h2>
              {user ? (
                <>
                  <p className="card-text">Email: {user.email}</p>
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="img-fluid rounded-circle user-profile-img"
                  />
                  <br />
                  <button className="btn btn-danger btn-signout-animated mt-3" onClick={handleSignOut}>
                    Sign Out
                  </button>
                  <button className="btn btn-warning btn-animated mt-3" onClick={handleShowAppCopy}>
                    จัดการข้อมูล
                  </button>
                </>
              ) : (
                <>
                  <section className="bg-light p-4 rounded shadow-sm login-section">
                    <p className="card-text mb-4">Please sign in to access your account.</p>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    </form>
                    <button className="btn btn-outline-primary btn-block mt-3 btn-google-animated" onClick={signInWithGoogle}>
                      Sign In with Google
                    </button>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
