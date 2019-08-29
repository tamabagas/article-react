import React, { Component } from 'react';
import Loading from '../Loading';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: []
        }
        this.convertDate = this.convertDate.bind(this);
    }
    convertDate(val) {
        // var date = new Date();
        // var date2 = new Date(val.replace("Z", " "))
        // // console.log(date.toISOString().replace("T", " ").replace("Z", " "));
        // // var timeDiff = Math.abs(date.getTime() - date2.getTime())
        // // var diffDays = Math.ceil(timeDiff / (1000 * 3600));
        // console.log(Math.abs(date - date2))
        return val.replace("T", " ").replace("Z", " ");

    }
    render() {

        const News = this.props.newsData.map((data, index) =>
            <div key={index} className="news-container">
                <img src={data.urlToImage} style={{ width: '100%' }} alt="img" />
                <div className="news-list">
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <a href={data.url} target="_blank">Read more ..</a>
                </div>
                <div className="news-list-head">
                    <p>{data.source.name}</p>
                    <p>{this.convertDate(data.publishedAt)}</p>
                </div>
            </div>
        )
        return (
            <div className="post-article">
                {News}
                <Loading showloading={this.props.loading} />
                <button id="buttonLoad" onClick={() => this.props.loadMore(this.props.thisCategory)} style={{ display: this.props.buttonLoad }} className="load-more">load more</button>
            </div>

        )
    }
}
export default News;
