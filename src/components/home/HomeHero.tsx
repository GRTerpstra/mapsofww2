import { Link } from "react-router-dom"

const HomeHero = () => {
  return (
    <section className="home-hero">
      <video className="home-hero__video" src="videos/home-hero-video.mp4" autoPlay loop muted />
      <div className="home-hero__container">
        <header className="home-hero__header-container">
          <h1 className="home-hero__title">Maps of WW2</h1>
          <h2 className="home-hero__subtitle">A collection of Interactive maps that pinpoint all the battles and events of the Second World War all around the globe.</h2>
        </header>
        <div className="home-hero__buttons-container">
          <Link to="/maps" className="home-hero__button-container">
            <div className="home-hero__image-container">
              <h1 className="home-hero__button-image-title">Interactive Maps</h1>
              <img className="home-hero__button-image" src="images/home-maps-image.jpg" />
            </div>
            <p className="home-hero__button-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta voluptatum obcaecati numquam quos blanditiis error unde, sequi magnam quae harum optio corrupti velit odio quibusdam alias esse cum quo?</p>
          </Link>
          <Link to="/documents" className="home-hero__button-container">
            <p className="home-hero__button-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta voluptatum obcaecati numquam quos blanditiis error unde, sequi magnam quae harum optio corrupti velit odio quibusdam alias esse cum quo?</p>
            <div className="home-hero__image-container">
              <h1 className="home-hero__button-image-title">Documents</h1>
              <img className="home-hero__button-image" src="images/home-documents-image.jpeg" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHero