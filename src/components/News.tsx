
import newsArticlesMock from "../data/news-articles-mock.json"

import { useEffect, useState } from 'react';
import { formatDiagnosticsWithColorAndContext } from "typescript";

const News = () => {

    const [state, setState]: any = useState({
        news: [],
        descriptionCharacterMax: 140
    })

    /**
     * Sets the maximum number of characters a news article description can contain based on window width.
     */
    function setCharacterMax() {
        var newCharacterMax: number;

        if (window.window.innerWidth >= 1440) {
            newCharacterMax = 140;
        }
        else if (window.window.innerWidth >= 576) {
            newCharacterMax = 100;
        }
        else {
            newCharacterMax = 190;
        }
        setState((prevState: any) => ({
            ...prevState,
            descriptionCharacterMax: newCharacterMax
        }))
    }

    // ---------- Use this code to use mocking data: ----------
    useEffect(() => {
        window.addEventListener("resize", setCharacterMax)
        setCharacterMax()
        const timer = setTimeout(() => {
            setState((prevState: any) => ({
                ...prevState,
                news: newsArticlesMock.articles
            }))
            document.getElementById("loaderIcon")?.remove();
        }, 500);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", setCharacterMax);
        };
    }, [])

    // ----------Use this code for API Calls for real data: ----------
    // const url = 'https://newsapi.org/v2/everything?' +
    //     'q="ww2" OR "world war 2" OR "second world war" NOT (games OR game OR shooter OR putin)&' +
    //     'language=en&' +
    //     'apiKey=a04e43ab681544aeafc42489705bcb76';
    // var req = new Request(url);

    // useEffect(() => {
    //     fetch(req).then((response) => response.json())
    //         .then((data) => {
    //             document.getElementById("loaderIcon")?.remove();
    //             setState({
    //                 news: data.articles
    //             })
    //         });
    // }, [])

    return (
        <section className="news">
            <header className="news__header">
                <h1>Latest WW2 News:</h1>
            </header>
            <img className="news__loader-icon" id="loaderIcon" src="icons/loader-icon.svg" alt="Loading Articles..." />
            <div className="news__articles-container">
                {state.news?.slice(0, 12).map((article: any) => (
                    <a className="news__article" href={article.url} target="_blank">
                        <div className="news__article-title">
                            {article.title}
                        </div>
                        <div className="news__article-image-wrapper">
                            <img className="news__article-image" src={article.urlToImage} />
                        </div>
                        <div className="news__article-description" >
                            {article.description.substr(0, state.descriptionCharacterMax)}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default News