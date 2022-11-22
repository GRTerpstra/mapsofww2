import { Link } from "react-router-dom"

const HomeHero = () => {
  return (
    <section className="home-hero">
      <video className="home-hero__video" src="videos/home-hero-video.mp4" autoPlay loop muted />
      <div className="home-hero__container">
        <header className="home-hero__header">
          <h1 className="home-hero__title">Maps of WW2</h1>
          <h2 className="home-hero__subtitle">A collection of Interactive maps that pinpoint all the battles and events of the Second World War all around the globe.</h2>
        </header>
          <div className="home-hero__buttons">
            <Link to="/documents" className="home-hero__button home-hero__documents-button">
              <h1 className="home-hero__image-text">Documents</h1>
              <img className="home-hero__image-button home-hero__documents-image" src="images/home-documents-image.jpeg"/>
            </Link>
            <Link to="/maps" className="home-hero__button home-hero__maps-button">
              <h1 className="home-hero__image-text">Interactive Maps</h1>
              <img className="home-hero__image-button home-hero__maps-image" src="images/home-maps-image.jpg"/>
            </Link>
          </div>
      </div>
    </section>
  )
}

export default HomeHero