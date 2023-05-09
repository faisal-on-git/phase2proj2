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
import "./Quiz.css";
import {motion} from "framer-motion"


import {
  fetchQuizQuestions,
  setQuizIndex,
  resetQuiz,
  setUserAnswers,
  setQuizScore,
} from "../../redux/actions/quizAction";
import {
  Button,
  Pagination,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ErrorBoundary from "../../componenets/ErrorBoundary";


export class Quiz extends Component {
  theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .MuiPaginationItem-page": {
              color: "#f2f2f2",
            },
            "& .MuiPaginationItem-icon": {
              color: "#f2f2f2",
            },
          },
        },
      },
    },
  });

  state = {
    modifiedQuizQuestions: [],
    selectedValue: "",
    currentQuestionIndex: 0,
  };

  handleChange = (event) => {
    console.log(event.target.value, "event.target.value");
    this.setState({ selectedValue: event.target.value });
    const updatedAnswers = [...this.props.userAnswers];
    updatedAnswers[this.props.quizIndex] = event.target.value;
    console.log(updatedAnswers, "updatedAnswers");
    this.props.setUserAnswers(updatedAnswers);
    if (this.props.quizIndex === this.props.quizQuestions.length) {
      this.props.setQuizIndex(0);
      this.props.history.push("/result", {});
    }
  };

  handleSubmit = () => {
    this.props.history.push("/result", {});
  };

  handleNext = () => {
    const ci = this.props.quizIndex;
    const qi = this.props.quizQuestions.length;

    if (ci === qi - 1) {
      console.log(ci, "ci", qi, "qi");
      // this.props.resetQuiz()
      console.log(this.props.userAnswers, "userAnswers");
      const updatedAnswers = [...this.props.userAnswers];
      updatedAnswers.push(this.state.selectedValue);

      console.log(updatedAnswers, "updatedAnswers at last question");
      this.props.setUserAnswers(updatedAnswers);

      this.props.history.push("/result", {});
    }

    if (ci < qi - 1) {
      this.props.setQuizIndex(ci + 1);
      console.log(this.props.userAnswers, "userAnswers");
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
    }
  };

  handlePaginationQusetion = (event, value) => {
    this.setState({ currentQuestionIndex: value - 1 });
    this.props.setQuizIndex(value - 1); 
  };

  calculateScore = () => {
    const { quizQuestions, userAnswers } = this.props;
    console.log(userAnswers, "userAnswers");
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
    console.log(shuffled, "shuffled");
    this.setState({ modifiedQuizQuestions: shuffled });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevProps, "prevProps");

    console.log(this.props, "this.props");
    if (prevProps.quizQuestions !== this.props.quizQuestions) {
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

    
  };

  render() {
    const { modifiedQuizQuestions } = this.state;

    if (modifiedQuizQuestions?.length === 0) {
      return <div>Loading...</div>;
    }
    if (this.props.quizQuestions?.length === 0) {
      return <div>Quiz is over</div>;
    }

    return (
     
      <div className="quiz-main-container">
        <motion.div className="quiz-container"
        animate={{ x: 0 }} initial={{ x: "-100vw" }} transition={{ duration: 1 }}
        
        
        >
            <motion.div
        initial={{ x: "-100vw" }} // Initial position off-screen to the left
        animate={{ x: 0 }} // Animate to the center of the screen
        transition={{ duration: 4 }} // Transition animation duration
      >
          {
            <FormControl>
              <h6 className="question-text">
                {he.decode(
                  this.state.modifiedQuizQuestions[this.props.quizIndex]
                    ?.question
                )}
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
                      control={
                        <Radio color="secondary" sx={{ color: pink[600] }} />
                      }
                      label={answer}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            
          }
</motion.div>
          <ThemeProvider theme={this.theme}>
            <Stack spacing={2} direction="row">
              <Pagination
                count={this.props.quizQuestions.length}
                color="secondary"
                onChange={this.handlePaginationQusetion}
                sx={{ color: "white" }}
              />
            </Stack>
          </ThemeProvider>

          {this.props.quizIndex === this.props.quizQuestions.length - 1 && (
            <Button
              variant="outlined"
              style={{ backgroundColor: "#faff5a", color: "#222222" }}
              size="small"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          )}
        </motion.div>
      </div>
      
      // </div>
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
