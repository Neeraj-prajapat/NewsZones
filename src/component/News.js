import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export default class News extends Component {

  static defaultProps ={
    country:'in',
    pageSize:8,
    category:"general"
  }
  static propTypes={
    country: PropTypes.string,  
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state={    
      articles:[],
      loading: false,    
      page:1
    }
  }



  async componentDidMount(){
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=10776dce81894495bdbe5448878ac03d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parseData= await data.json()
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
        articles: parseData.articles,
        totalResults:parseData.totalResults,
        loading: false 

    })
    this.props.setProgress(100);
    }


  handlePrevClick= async()=>{
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=10776dce81894495bdbe5448878ac03d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parseData= await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
        page: this.state.page-1,
        articles: parseData.articles,
        loading: false
    })
    this.props.setProgress(100);
  }



handleNextClick = async()=>{
  this.props.setProgress(10);
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=10776dce81894495bdbe5448878ac03d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data= await fetch(url);
        this.props.setProgress(30);
        let parseData= await data.json();
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({
            page: this.state.page+1,
            articles: parseData.articles,
            loading: false
        })      
        this.props.setProgress(100);   
  }



  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center mb-3">NewsZones-Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
                     <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}
                      imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />  
                   </div>
        })}
        </div>
        {!this.state.loading &&<div className= " container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className='btn btn-primary' onClick={this.handlePrevClick} > &larr; Previous</button>
                <button disabled={this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-primary' onClick={this.handleNextClick}  >Next &rarr; </button>
            </div>}
    </div>
    )
  }
}



