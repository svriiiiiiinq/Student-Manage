import React from "react";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
const Account = () => {
const { user } = useAuth();
return (
<div className="container mt-5">
<div className="row justify-content-center">
<div className="col-md-6">
<div className="card">
<div className="card-body">
<h2 className="card-title text-center mb-4">Account
Page</h2>

{user ? (<p className="card-text">Welcome, {user.displayName}!</p>
) : (
<p className="card-text">Please sign in to view your
account.</p>
)}
</div>
</div>
</div>
</div>
</div>
);
};
export default Account;