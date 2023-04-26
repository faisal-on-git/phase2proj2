import React, { Component } from 'react'
import {withRouter,Switch,Route,BrowserRouter} from 'react-router-dom'
import Navbar from './componenets/navbar/Navbar'
import Home from './pages/home/Home'
import Quiz from './pages/quiz/Quiz'
import PlayQuiz from './playQuiz/PlayQuiz'
import "./App.css"
import Result from './pages/result/Result'





export class App extends Component {
  render() {
    return (
      <div>
       
        <Navbar/>

<Switch>
     
<Route exact path="/" component={Home}/>
<Route path='/quiz' component={Quiz}/>
    
     <Route  path='/startQuiz' component={PlayQuiz}/>
     <Route path='/result' component={Result}/>
     
    

   
   </Switch>

      </div>
    )
  }
}

export default withRouter(App)