import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetQuiz } from "../../redux/actions/quizAction";
import "./Result.css";
import { Button } from "@mui/material";
import { setQuizScore } from "../../redux/actions/quizAction";


export class Result extends Component {

    handleRestart = () => {
        this.props.resetQuiz();

        this.props.history.push("/startQuiz");
        };

        componentDidMount(){
         const  calculateScore = () => {
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
          const score = calculateScore();
          this.props.setQuizScore(score);

        }
  render() {
    return (
      <>
        <div className="result-page">
          <div className="result-container">
            <div className="score-container">
              <div className="result-text">Your Score is:</div>
              <div className="result-score">{this.props.quizScore}</div>
            </div>
            <div className="answer-count-container"></div>
            <div className="correct-answer">
              <div className="correct-answer-text">Correct Answers:</div>
              <div className="correct-answer-score">{this.props.quizScore}</div>
            </div>
            <div className="wrong-answer">
              <div className="wrong-answer-text">Wrong Answers:</div>
              <div className="wrong-answer-score">{this.props?.quizQuestions?.length-this.props.quizScore}</div>
            </div>
            <Button
            variant="outlined"
            style={{ backgroundColor: "#faff5a", color: "#222222",marginBottom: "20px" }}
            onClick={this.handleRestart}
          >
            Restart!
          </Button>
          </div>
         
        </div>
        <div>{this.props.quizScore}</div>
        <div>{this.props.user}</div>
        {/* </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  quizScore: state.quizReducer.quizScore,
  user: state.authReducer.user,
  quizQuestions: state.quizReducer.quizQuestions,
  userAnswers: state.quizReducer.userAnswers,
});
const mapDispatchToProps = (dispatch) => ({
  resetQuiz: () => dispatch(resetQuiz()),
  setQuizScore: (score) => dispatch(setQuizScore(score)),

});
const ResultWithRouter = withRouter(Result);
export default connect(mapStateToProps, mapDispatchToProps)(ResultWithRouter);
