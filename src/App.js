import React, { Component } from 'react'
import {withRouter,Switch,Route,BrowserRouter} from 'react-router-dom'
import Navbar from './componenets/navbar/Navbar'
import Home from './pages/home/Home'
import Quiz from './pages/quiz/Quiz'
import PlayQuiz from './playQuiz/PlayQuiz'
import "./App.css"
import Result from './pages/result/Result'
import ErrorBoundary from './componenets/ErrorBoundary'





export class App extends Component {
  render() {
    return (
      <div>
       <ErrorBoundary>
        <Navbar/>
        </ErrorBoundary>

<Switch>
     
<Route exact path="/" component={Home}/>

{/* <Route path='/quiz' component={Quiz}/> */}
<Route path='/quiz'>
  <ErrorBoundary>
    <Quiz />
  </ErrorBoundary>
</Route>

    
     <Route  path='/startQuiz' component={PlayQuiz}/>
     <Route path='/result' component={Result}/>
     
    

   
   </Switch>

      </div>
    )
  }
}

export default withRouter(App)