import { Link } from 'react-router-dom'

const MapsInfo = (props: any) => {
  return (
    <div className="maps-info">
      <div className="maps-info__title"><h1>{props.document?.title.substring(0, 1).toUpperCase() + props.document?.title.substring(1)}</h1></div>
      <div className="maps-info__image-wrapper"><img src={props.document?.image} alt="" /></div>
      <div className="maps-info__description"><p>{props.document?.description.slice(0, 425)}</p></div>
      <Link to="/documents" className="maps-info__button button">Read more</Link>
    </div>
  )
}

export default MapsInfo