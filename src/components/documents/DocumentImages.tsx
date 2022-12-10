import { useState } from "react"

const DocumentImages = (props: any) => {

    const [state, setState] = useState({
        loadingIcon: true,
    })

    function setLoadingIconFalse() {
        console.log('setFalse')
        setState((prevState) => ({
            ...prevState,
            loadingIcon: false
        }))
    }

    const imageElements: any = props.images.map((imageURL: string) => (
        <div className="document-images__image-wrapper">
            <img className="document-images__image" onLoad={setLoadingIconFalse} src={imageURL} />
        </div>
    ))

    return (
        <div className="document-images">
            {state.loadingIcon && <div className="document-images__loader-icon-container">
                <div className="document-images__loader-icon-background" />
                <img className="document-images__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading map..." />
            </div>}
            <div className="document-images__wrapper">
                <div className="document-images__container">
                    {imageElements}
                </div>
            </div>
        </div>
    )
}

export default DocumentImages