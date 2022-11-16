import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

  const location = useLocation();

  // Navbar state hook
  const [state, setState] = useState({
    showMobileNavbar: false
  })

  // Toggles the mobile version of navbar on and off.
  function toggleShowMobileNavbar() {
    setState(prevState => ({
      showMobileNavbar: !prevState.showMobileNavbar
    }))
  }

  return (
    <div className="navbar">
      <div className="navbar__dropdown-icon-wrapper">
        {
          state.showMobileNavbar == true ?
            <CloseIcon className="navbar__dropdown-icon" onClick={() => toggleShowMobileNavbar()} /> :
            <MenuIcon className="navbar__dropdown-icon" onClick={() => toggleShowMobileNavbar()} />
        }
      </div>
      <div className={state.showMobileNavbar == true ? "navbar__links" : "navbar__links navbar__links--off"}>
        <Link to="/" className={location.pathname == "/" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleShowMobileNavbar()}> Home </Link>
        <Link to="/news" className={location.pathname == "/news" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleShowMobileNavbar()}> News </Link>
        <Link to="/maps" className={location.pathname == "/maps" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleShowMobileNavbar()}> Maps </Link>
        <Link to="/documents" className={location.pathname == "/documents" ? "navbar__link navbar__link--active" : "navbar__link"} onClick={() => toggleShowMobileNavbar()}> Documents </Link>
      </div>
    </div>
  )
}

export default Navbar