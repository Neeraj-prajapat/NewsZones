import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {
pageSize=5;


state={
  progress:0
}

setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render() {
    return (
     <BrowserRouter>
      <LoadingBar
        color='#f11946'
        height={2}
        progress={this.state.progress}
      />
        <Navbar/>
        <Routes>
          <Route path="/" key="general" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="general"  />}/>
          <Route path="/business" key="business" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="business"/>}/>
          <Route path="/entertainment" key="entertainment" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="entertainment"/>}/>
          <Route path="/health" key="health" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="health"/>}/>
          <Route path="/sports" key="sports" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports"/>}/>
          <Route path="/technology" key="technology" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="technology"/>}/>
        </Routes>
     </BrowserRouter> 
    )
  }
}























