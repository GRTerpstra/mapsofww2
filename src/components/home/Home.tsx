import { useEffect } from 'react';
import HomeHero from "./HomeHero"
import HomeInfo from "./HomeInfo"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Home = () => {
  
  /**
  * Changes the color of the Home footer after scrolling down 30px.
  */
  function changeFooterColor() {
    if (window.scrollY > 30) {
      document.getElementById("homeFooter")!.classList.add('home__footer--scrolled');
    }
    else {
      document.getElementById("homeFooter")!.classList.remove('home__footer--scrolled');
    }
  };

  /**
    * Toggles the scroll icon off after scrolling down 250px
  */
  function toggleScrollIconOff() {
    if (window.scrollY > 250) {
      document.getElementById("homeScrollIcon")!.classList.remove('home__scroll-icon--show');
    }
  };

  /**
    * Scroll to the bottom of the window.
  */
  function goToBottomPage() {
    document.getElementsByClassName("home-info")[0].scrollIntoView({ behavior: "smooth", block: "end" });
  }

  /**
  * Effect hook to add the event listeners for the scroll events that change the footer color and scroll icon +
  * setTimeout method to show the scroll icon 3.5 seconds after entering the page.
  */
  useEffect(() => {
    window.addEventListener('scroll', changeFooterColor);
    window.addEventListener('scroll', toggleScrollIconOff);

    const timer = setTimeout(() => {
      document.getElementById("homeScrollIcon")!.classList.add('home__scroll-icon--show')
      toggleScrollIconOff();
    }, 3500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', changeFooterColor);
      window.removeEventListener('scroll', toggleScrollIconOff);
    };
  }, []);

  return (
    <section className="home">
      <HomeHero />
      <HomeInfo />
      <KeyboardDoubleArrowDownIcon className="home__scroll-icon" id="homeScrollIcon" onClick={() => goToBottomPage()} />
    </section>
  )
}

export default Home