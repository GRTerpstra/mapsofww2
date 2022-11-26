import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

  const location = useLocation().pathname;

  // Navbar state hook
  const [state, setState] = useState({
    showMobileNavbar: false
  })

  /**
   * Toggles the mobile version of navbar on or off.
   */
  function toggleMobileNavbar() {
    setState(prevState => ({
      showMobileNavbar: !prevState.showMobileNavbar
    }))
  }

  /**
   * Scrolls the user back to the top of the window.
   */
  function ScrollToTop() {
    window.scrollTo(0, 0)
  }

  /**
   * Toggles the height of the navigation bar when the user scrolls past 155px in height
   */
  function toggleNavbarHeight() {
    if (window.scrollY > 155) {
      document.getElementById("navbar")!.classList.add('navbar--tall');
    }
    else {
      document.getElementById("navbar")!.classList.remove('navbar--tall');
    }
  };

  /**
   * Toggles the title of the web app in the Navbar when the user scroll past the header in Home.
   */
  function toggleTitle() {
    if (window.scrollY > 155) {
      document.getElementById("navbarTitle")!.classList.add('navbar__title--on');
    }
    else {
      document.getElementById("navbarTitle")!.classList.remove('navbar__title--on');
    }
  };

  // Effect hook to add the event listener for the scroll events that change the footer color.
  useEffect(() => {
    window.addEventListener('scroll', toggleTitle);
    window.addEventListener('scroll', toggleNavbarHeight);
    return () => {
      window.removeEventListener('scroll', toggleTitle);
      window.removeEventListener('scroll', toggleNavbarHeight);
    };
  }, []);

  return (
    <nav className={location === '/maps' ? "navbar navbar--tall" : "navbar"} id="navbar">
      <div className="navbar__dropdown-icon-wrapper">
        {
          state.showMobileNavbar == true ?
            <CloseIcon className="navbar__dropdown-icon" onClick={() => toggleMobileNavbar()} /> :
            <MenuIcon className="navbar__dropdown-icon" onClick={() => toggleMobileNavbar()} />
        }
      </div>
      <div className={state.showMobileNavbar === true ? "navbar__links" : "navbar__links navbar__links--off"}>
        <Link to="/" className={location === "/" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleMobileNavbar()}> Home </Link>
        <Link to="/news" className={location === "/news" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleMobileNavbar()}> News </Link>
        <Link to="/maps" className={location === "/maps" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleMobileNavbar()}> Maps </Link>
        <Link to="/documents" className={location === "/documents" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleMobileNavbar()}> Documents </Link>
      </div>
      <h1 className="navbar__title navbar__title--off" id="navbarTitle" onClick={() => ScrollToTop()}> Maps of WW2 </h1>
    </nav>
  )
}

export default Navbar