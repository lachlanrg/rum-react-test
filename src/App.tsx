import React, { useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useRecordPageView, useRecordPageViewWithoutUserId, ErrorBoundary } from "./RumConfig";

export default function App() {
  return (
    <Router>
      <div>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/users">Users</Link></p>
        <p><Link to="/welcome">Welcome</Link></p>
        <ErrorBoundary>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/*" element={<User />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  )
}

function Home() {
  useRecordPageView();
  return (
    <>
      <h2>Home</h2>
      <p>Welcome to our website!</p>
      <img src="https://via.placeholder.com/150" alt="Mock" />
    </>
  );
}

function About() {
  useRecordPageView();
  return (
    <>
      <h2>About</h2>
      <p>Learn more about our company.</p>
      <img src="https://via.placeholder.com/150" alt="Mock" />
    </>
  );
}

function Users() {
  useRecordPageView();
  return (
    <div>
      <h2>Users</h2>
      <p><Link to="/user/1">User 1</Link></p>
      <p><Link to="/user/2">User 2</Link></p>
      <p><Link to="/user/3">User 3</Link></p>
      <img src="https://via.placeholder.com/150" alt="Mock" />
    </div>
  );
}

function User() {
  useRecordPageViewWithoutUserId();

  const location = useLocation();
  const user = location.pathname.split('/').pop();
  return (
    <>
      <h2>User: {user}</h2>
      <p>Profile information for User {user}</p>
      <img src={`https://via.placeholder.com/150?text=User${user}`} alt={`User ${user}`} />
    </>
  );
}

function Welcome() {
  useRecordPageView();
  // deliberate error
  return (
    <>
      <h2>Welcome</h2>
      <p>This page intentionally throws an error.</p>
      <img src="https://via.placeholder.com/150" alt="Mock" />
    </>
  );
}