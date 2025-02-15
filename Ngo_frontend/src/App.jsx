import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Form from './Pages/Form';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Projects from './Pages/Projects';
import Events from './Pages/Events';
import Donate from './Pages/Donate';
import StatusPage from './Pages/StatusPage';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/form" element={<Form />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/events" element={<Events />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/status" element={<StatusPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
