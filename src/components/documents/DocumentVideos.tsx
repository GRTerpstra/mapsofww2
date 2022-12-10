import { useState } from "react"

const DocumentVideos = (props: any) => {

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

    const videoElements: any = props.youtubeVideos.map((videoURL: string) => (
        <iframe className="document-videos__video" src={videoURL} title="Video" onLoad={() => setLoadingIconFalse()} allow="accelerometer clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    ))

    return (
        <div className="document-videos">
            {state.loadingIcon && <div className="document-videos__loader-icon-container">
                <div className="document-videos__loader-icon-background" />
                <img className="document-videos__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading map..." />
            </div>}
            <div className="document-videos__wrapper">
                <div className="document-videos__container">
                    {videoElements}
                </div>
            </div>
        </div>
    )
}

export default DocumentVideos