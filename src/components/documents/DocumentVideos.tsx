const DocumentVideos = (props: any) => {

    const videoElements: any = props.youtubeVideos.map((videoURL: string) => (
        <iframe className="document-videos__video" src={videoURL} title="World War II in Europe with Flags: Every Day" allow="accelerometer clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    ))

    return (
        <div className="document-videos">
            <div className="document-videos__wrapper">
                <div className="document-videos__container">
                    {videoElements}
                </div>
            </div>
        </div>
    )
}

export default DocumentVideos