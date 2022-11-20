import { useState } from "react";
import { Link } from "react-router-dom"

const HomeInfo = () => {
  return (
    <div className="home-info">
      <div className="home-info__container">
        <div className="home-info__header">
          <h1>Recently Added Documents</h1>
        </div>
        <div className="home-info__content">
          <div className="home-info__documents">
            <input type="radio" name="slider" id="card1" defaultChecked />
            <input type="radio" name="slider" id="card2" />
            <input type="radio" name="slider" id="card3" />
            <div className="home-info__document-cards">
              <label className="home-info__document-card" htmlFor="card1" id="document1">
                <img className="home-info__document-image" src="https://cdn-cdaac.nitrocdn.com/tFOqLIaMYIaFjSGNUoYXbEDiJHtqbEtH/assets/static/optimized/rev-87b082e/wp-content/uploads/2014/11/450223-M-0000R-001.jpg" alt="song" />
              </label>
              <label className="home-info__document-card" htmlFor="card2" id="document2">
                <img className="home-info__document-image" src="https://www.nationalww2museum.org/sites/default/files/styles/wide_medium/public/2022-05/22-0353-dday-ww2-museum-bday-primary-image-960x700-r12.jpeg?h=6328b48a" alt="song" />
              </label>
              <label className="home-info__document-card" htmlFor="card3" id="document3">
                <img className="home-info__document-image" src="https://upload.wikimedia.org/wikipedia/commons/0/01/Donald_Malarkey_Easy_506PIR.jpg" alt="song" />
              </label>
            </div>
            <div className="home-info__document-info-container">
              <div className="home-info__document-info">
                <div className="home-info__document-info-slider" id="documentInfoSlider">
                  <label className="home-info__document-data" id="document1Data">
                    <div className="home-info__document-title">Iwo Jima</div>
                    <div className="home-info__document-story">The Battle of Iwo Jima (19 February – 26 March 1945) was a major battle in which the United States Marine Corps (USMC) and United States Navy (USN) landed on and eventually captured the island of Iwo Jima from the Imperial Japanese Army (IJA) during World War II...</div>
                  </label>
                  <label className="home-info__document-data" id="document1Data">
                    <div className="home-info__document-title">Normandy landings</div>
                    <div className="home-info__document-story">The Normandy landings were the landing operations and associated airborne operations on Tuesday, 6 June 1944 of the Allied invasion of Normandy in Operation Overlord during World War II. Codenamed Operation Neptune and often referred to as D-Day...</div>
                  </label>
                  <label className="home-info__document-data" id="document1Data">
                    <div className="home-info__document-title">Donald George Malarkey</div>
                    <div className="home-info__document-story">Donald George Malarkey (July 31, 19211 – September 30, 2017) was a non-commissioned officer with Easy Company, 2nd Battalion, 506th Parachute Infantry Regiment, in the 101st Airborne Division of the United States Army during World War II...</div>
                  </label>
                </div>
              </div>
              <Link to="/documents" className="home-info__document-cta">Read more...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeInfo