import React, { Component } from 'react';
import Header from '../../../Components/Header';
import News from '../../../Components/News';
import token from '../../../token';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ['general', 'entertainment', 'business', 'health', 'science', 'sports', 'technology'],
            currentCategory: 'general',
            data: [],
            loading: "block",
            buttonLoading: "none",
            page: 1
        }
        this.changeCategory = this.changeCategory.bind(this)
        this.loadmorearticles = this.loadmorearticles.bind(this);
        this.execLoad = this.execLoad.bind(this);

    }

    componentDidMount() {

        fetch('https://newsapi.org/v2/top-headlines?country=id&category=' + this.state.currentCategory + '&pageSize=10&page=1&apiKey=' + token.newsapp)
            .then(response => { return response.json() })
            .then(res => {
                console.log(res)

                if (res.articles.length >= 10) {
                    this.setState({
                        data: res.articles,
                        loading: "none",
                        buttonLoading: "block"

                    })
                    // loadButton.style.display = "block";
                }



            })
            .catch(err => {
                console.log(err);
                this.setState({

                    loading: "none",
                    buttonLoading: "none"

                })
            })

    }
    changeCategory(val) {
        this.setState({
            page: 1,
            loading: "block",
            buttonLoading: "none"
        }, () => {
            fetch('https://newsapi.org/v2/top-headlines?country=id&category=' + val + '&pageSize=10&apiKey=' + token.newsapp)
                .then(response => { return response.json() })
                .then(res => {
                    console.log(res)
                    if (res.articles.length >= 10) {
                        this.setState({
                            data: res.articles,
                            loading: "none",
                            buttonLoading: "block",
                            currentCategory: val

                        })
                        // loadButton.style.display = "block";
                    }

                })
                .catch(err => {
                    this.setState({

                        loading: "none",
                        buttonLoading: "none"

                    })
                })
        })
        console.log(val)

    }

    loadmorearticles(val) {
        this.setState({
            page: this.state.page + 1,
            loading: "block",
            buttonLoading: "none"
        },
            () => { this.execLoad(val) }

        )

    }
    execLoad(val) {

        fetch('https://newsapi.org/v2/top-headlines?country=id&category=' + this.state.currentCategory + '&pageSize=10&page=' + this.state.page + '&apiKey=' + token.newsapp)
            .then(response => { return response.json() })
            .then(res => {
                console.log(res)
                if (res.articles.length >= 10) {
                    this.setState({
                        data: this.state.data.concat(res.articles),
                        loading: "none",
                        buttonLoading: "block"

                    })
                    // loadButton.style.display = "block";
                }
                else {
                    this.setState({
                        data: this.state.data.concat(res.articles),
                        loading: "none",
                        buttonLoading: "none"

                    })
                }

            })
            .catch(err => {
                console.log(err);
                this.setState({

                    loading: "none",
                    buttonLoading: "none"

                })
            })
    }
    render() {
        return (
            <div className="news-article">
                <Header category={this.state.category} populateNews={this.changeCategory} />
                <News newsData={this.state.data} thisCategory={this.currentCategory} loading={this.state.loading} loadMore={this.loadmorearticles} buttonLoad={this.state.buttonLoading} />

            </div>


        );
    }
}
export default Home;