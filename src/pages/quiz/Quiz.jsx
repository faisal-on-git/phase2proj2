import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";

// import Radio from '@mui/joy/Radio';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { pink } from "@mui/material/colors";
import he from "he";
import './Quiz.css'
// import Button from "@mui/material";
// import { connect } from "react-redux";

import {
  fetchQuizQuestions,
  setQuizIndex,
  resetQuiz,
  setUserAnswers,
  setQuizScore
} from "../../redux/actions/quizAction";
import { Button } from "@mui/material";
// import { FormControlLabel } from '@mui/material';

export class Quiz extends Component {



  state = {
    modifiedQuizQuestions: [],
    selectedValue: "",
  };





  handleChange = (event) => {
    console.log(event.target.value, "event.target.value");
    this.setState({ selectedValue: event.target.value });
  };

  handleNext = () => {
    const ci = this.props.quizIndex;
    const qi = this.props.quizQuestions.length;




    if(ci===qi-1){
      console.log(ci, "ci", qi, "qi")
      // this.props.resetQuiz()
      console.log(this.props.userAnswers, "userAnswers")
      const updatedAnswers = [...this.props.userAnswers];
      updatedAnswers.push(this.state.selectedValue);
      
      console.log(updatedAnswers, "updatedAnswers at last question");
      this.props.setUserAnswers(updatedAnswers);
      const score=this.calculateScore()
      this.props.setQuizScore(score)

      
      this.props.history.push('/result',{})

    }

    if (ci < qi - 1) {
      this.props.setQuizIndex(ci + 1);
      console.log(this.props.userAnswers, "userAnswers")
      const updatedAnswers = [...this.props.userAnswers];
      updatedAnswers.push(this.state.selectedValue);
      console.log(updatedAnswers, "updatedAnswers");
      this.props.setUserAnswers(updatedAnswers);



    }
    console.log(ci, "ci", qi, "qi");
  };

  handlePrv = () => {
    const ci = this.props.quizIndex;
    if (ci > 0) {
      this.props.setQuizIndex(ci - 1);

      const updatedAnswers = [...this.props.userAnswers];
      updatedAnswers.splice(ci, 1);
      console.log(updatedAnswers, "updatedAnswers");
      this.props.setUserAnswers(updatedAnswers);


      
  // this.setState((prevState) => {
  //   const updatedAnswers = [...prevState.userAnswers];
  //   updatedAnswers.splice(prevState.currentQuestionIndex, 1);
    
  // });


    }
  };


  calculateScore = () => {
    const { quizQuestions, userAnswers } = this.props;
    console.log(userAnswers, "userAnswers")
    let score = 0;
    quizQuestions.forEach((question, index) => {
      console.log(question.correct_answer, "question.correct_answer");
      console.log(userAnswers[index], "userAnswers[index]");
      if (question.correct_answer === userAnswers[index]) {
        score += 1;
      }
    });
    return score;
  };

  componentDidMount = () => {
    console.log("componentDidMount");
    // this.props.fetchQuizQuestions('https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple');

    const shuffled = this.props.quizQuestions.map((question, index) => {
      const answers = question.incorrect_answers.concat(
        question.correct_answer
      );
      return {
        question: question.question,
        answers: _.shuffle(answers),
        correctAnswer: question.correct_answer,
        questionId: index,
      };
    });
    console.log(shuffled, "shuffled")
    this.setState({ modifiedQuizQuestions: shuffled });
    // console.log(shuffled, "shuffled");

    // console.log(this.props.quizQuestions, "quizQuestions");
    // console.log(shuffled[0].answers, "shuffled[0].answers");
  };


componentDidUpdate=(prevProps, prevState)=>{
  // console.log("componentDidUpdate")
  console.log(prevProps, "prevProps")

  // console.log(prevState, "prevState")
  console.log(this.props, "this.props")
  // console.log(this.state, "this.state")
  if(prevProps.quizQuestions!==this.props.quizQuestions){
const shuffled = this.props.quizQuestions?.map((question, index) => {
      const answers = question.incorrect_answers.concat(
        question.correct_answer
      );
      return {  
        question: question.question,
        answers: _.shuffle(answers),
        correctAnswer: question.correct_answer,
        questionId: index,
      };
    });
  this.setState({ modifiedQuizQuestions: shuffled });

  }
  
}





  render() {
    // const controlProps = (item) => ({
    //   checked: item === "c",
    //   disabled: item === "d",
    //   name: "radio-buttons",
    //   value: item,
    // });
    // console.log(this.props.quizQuestions, "quizQuestions")

    const { modifiedQuizQuestions } = this.state;

    if (modifiedQuizQuestions?.length === 0) {
      return <div>Loading...</div>;
    }
    if(this.props.quizQuestions?.length===0){
      return <div>Quiz is over</div>;
    }

    return (
      <div className="quiz-main-container">


        <div className="quiz-container">
        
        {/* <p><b>qn</b>{this.state.modifiedQuizQuestions[this.props.quizIndex].question}</p>
       
        <ul>
            {
            this.state.modifiedQuizQuestions[this.props.quizIndex].answers.map((answer, index) => {
                return (
                    <li key={index}>{answer}</li>
                )
            })
        }

        </ul> */}
        {
          <FormControl>
            {/* <FormLabel >{this.state.modifiedQuizQuestions[this.props.quizIndex].question}</FormLabel> */}
            <h6 className="question-text">
              {he.decode(this.state.modifiedQuizQuestions[this.props.quizIndex]?.question)}
            </h6>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={this.selectedValue}
              onChange={this.handleChange}
            >
              {this.state.modifiedQuizQuestions[
                this.props.quizIndex
              ]?.answers?.map((answer, index) => {
                return (
                  <FormControlLabel
                    value={answer}
                    control={<Radio color="secondary" sx={{color: pink[600]}}/>}
                    label={answer}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        }
        <div className="button-container-quiz">
        <Button
            variant="outlined"
            style={{ backgroundColor: "#faff5a", color: "#222222" }}
            onClick={this.handleNext}
          >
            Next
          </Button>

        {/* <button onClick={this.handleNext}>next</button> */}
       {/* {this.props?.quizIndex>0 && <button onClick={this.handlePrv}>prev</button>} */}

       {this.props?.quizIndex>0 && <Button
      variant="outlined"
      style={{ backgroundColor: "#0DFF92", color: "#222222" }} 
      onClick={this.handlePrv}
      >
      Prev
      </Button>
      
      
      }
       </div>
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizQuestions: state.quizReducer.quizQuestions,
  quizIndex: state.quizReducer.quizIndex,
  userAnswers: state.quizReducer.userAnswers,
});
const mapDispatchToProps = (dispatch) => ({
  // login: (user) => dispatch(login(user))
  fetchQuizQuestions: (url) => dispatch(fetchQuizQuestions(url)),
  setQuizIndex: (index) => dispatch(setQuizIndex(index)),
  resetQuiz: () => dispatch(resetQuiz()),
  setQuizScore: (score) => dispatch(setQuizScore(score)),
  setUserAnswers: (answers) => dispatch(setUserAnswers(answers)),
});

const QuizWithRouter = withRouter(Quiz);

export default connect(mapStateToProps, mapDispatchToProps)(QuizWithRouter);
