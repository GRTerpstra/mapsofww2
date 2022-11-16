import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home">
      <video className="home__video" src="videos/home-video.mp4" autoPlay loop muted />
      <div className="home__header">
        <h1 className="home__title">Maps of WW2</h1>
        <h2 className="home__subtitle">An interactive map that pinpoints all the events during the Second World War all around the globe.</h2>
      </div>
      <div className="home__content">
        <div className="home__links">
          <Link to="/documents" className="home__link">
            <h1>Documents</h1>
            <img className="home__link-image home__documents-image" />
          </Link>
          <Link to="/maps" className="home__link">
            <h1>Interactive Maps</h1>
            <img className="home__link-image home__maps-image" />
          </Link>
        </div>
      </div>
      <div className="home__footer">
        <p className="home__copyright-text">Copyright © 2022 Maps of WW2. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Home