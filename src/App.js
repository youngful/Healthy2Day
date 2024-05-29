import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Breakfast from './pages/Breakfast';
// import Dinner from './pages/Dinner';
// import Supper from './pages/Supper';
// import Dessert from './pages/Dessert';
// import Saved from './pages/Saved';
// import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {


  const location = useLocation();
  const hideNavigationPaths = ['/signIn', '/signUp'];

  return (
    <div>
      {!hideNavigationPaths.includes(location.pathname) && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/breakfast" element={<Breakfast />} />
        {/* <Route path="/dinner" element={<Dinner />} />
        <Route path="/supper" element={<Supper />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
