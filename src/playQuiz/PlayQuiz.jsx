import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { Paper, InputBase, IconButton, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import "./PlayQuiz.css";
import { fetchQuizQuestions } from "../redux/actions/quizAction";
import { motion } from "framer-motion";
import { NonceProvider } from "react-select";
import jsPDF from "jspdf";
// const styledBy = (property, mapping) => (props) => mapping[props[property]];

export class PlayQuiz extends Component {
  


componentDidMount() {
  if(!this.props.user){
    this.props.history.push("/");
  }
}    

  state = {
    category: "",
    difficulty: "",
    type: "",
    amount: 10,
    categoryDisplay: "",
    difficultyDisplay: "",
    typeDisplay: "",
  };
  categoryOptions = [
    { data: 9, label: "General Knowledge" },
    { data: 10, label: "Entertainment: Books" },
    { data: 11, label: "Entertainment: Film" },
    { data: 12, label: "Entertainment: Music" },
    { data: 13, label: "Entertainment: Musicals & Theatres" },
    { data: 14, label: "Entertainment: Television" },
    { data: 15, label: "Entertainment: Video Games" },
    { data: 16, label: "Entertainment: Board Games" },
    { data: 17, label: "Science & Nature" },
    { data: 18, label: "Science: Computers" },
    { data: 19, label: "Science: Mathematics" },
    { data: 20, label: "Mythology" },
    { data: 21, label: "Sports" },
    { data: 22, label: "Geography" },
    { data: 23, label: "History" },
    { data: 24, label: "Politics" },
    { data: 25, label: "Art" },
    { data: 26, label: "Celebrities" },
    { data: 27, label: "Animals" },
    { data: 28, label: "Vehicles" },
    { data: 29, label: "Entertainment: Comics" },
    { data: 30, label: "Science: Gadgets" },
    { data: 31, label: "Entertainment: Japanese Anime & Manga" },
    { data: 32, label: "Entertainment: Cartoon & Animations" },
  ];

  difficultyOptions = [
    { data: "easy", label: "Easy" },
    { data: "medium", label: "Medium" },
    { data: "hard", label: "Hard" },
  ];

  typeOptions = [
    { data: "multiple", label: "Multiple Choice" },
    { data: "boolean", label: "True/False" },
  ];
  handlePlay = () => {
    console.log(this.state, "state");

    // this.props.fetchQuizQuestions("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=boolean")
    this.props.fetchQuizQuestions(
      `https://opentdb.com/api.php?amount=${this.state.amount}&category=${this.state.category}&difficulty=${this.state.difficulty}&type=${this.state.type}`
    );

    this.props.history.push({
      pathname: "/quiz",
      data: this.state,
    });
  };

  render() {
    return (
      //   <div>
      //     current user{this.props.user}
      //     <button onClick={() => this.props.history.push("/quiz")}>
      //       play quiz
      //     </button>
      //   </div>

      <div className="start-quiz-main-container">
        <motion.div className="start-quiz-and-button"
        
        animate={{ x: 0  }} initial={{ x: -1000 }} transition={{ duration: 1 }}
        >
          <div className="start-quiz-option-container">
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                height: 40,
                mr: 1,
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                loading={true}
                options={this.categoryOptions}
                sx={{ flex: 1 }}
               
                
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Category.."
                    placeholder="Category.."

                    
                    autoFocus
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "&.Mui-focused fieldset": {
                          border: "none",
                      
                         
                        },
                     

                      },
                     
                     
                      focusVisible: false,
                    }}
                  />
                )}
                // onChange={(event, option) => this.handleOptionSelected(option)}
                onChange={(event, option) => {
                  if (option !== null) {
                    this.setState({ category: option.data });
                  } else {
                    this.setState({ category: "" });
                  }
                }}
                inputValue={this.state.categoryDisplay}
                onInputChange={(event, newInputValue) => {
                  //   this.setState({ category: newInputValue });
                  this.setState({ categoryDisplay: newInputValue });
                }}
                freeSolo={false}
                autoFocus
              />
            </Paper>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                height: 40,
                mr: 1,
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                loading={true}
                options={this.difficultyOptions}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Difficulty..."
                    placeholder="Difficulty..."
                    autoFocus
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                      focusVisible: false,
                    }}
                  />
                )}
                // onChange={(event, option) => this.handleOptionSelected(option)}
                onChange={(event, option) => {
                  if (option !== null) {
                    this.setState({ difficulty: option.data });
                  } else {
                    this.setState({ difficulty: "" });
                  }
                }}
                // inputValue={this.state.difficulty}
                inputValue={this.state.difficultyDisplay}
                // onInputChange={(event, newInputValue) => {
                // this.setState({difficulty: newInputValue})
                // }}
                onInputChange={(event, newInputValue) => {
                  this.setState({ difficultyDisplay: newInputValue });
                }}
                freeSolo={false}
                autoFocus
              />
            </Paper>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                height: 40,
                mr: 1,
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                loading={true}
                options={this.typeOptions}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Type.."
                    placeholder="Type.."
                    autoFocus
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                      focusVisible: false,
                    }}
                  />
                )}
                // onChange={(event, option) => this.handleOptionSelected(option)}
                onChange={(event, option) => {
                  if (option !== null) {
                    this.setState({ type: option.data });
                  } else {
                    this.setState({ type: "" });
                  }
                }}
                // inputValue={this.state.type}
                inputValue={this.state.typeDisplay}
                // onInputChange={(event, newInputValue) => {
                // this.setState({type: newInputValue})
                // }}
                onInputChange={(event, newInputValue) => {
                  this.setState({ typeDisplay: newInputValue });
                }}
                freeSolo={false}
                autoFocus
              />
            </Paper>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                height: 40,
                mr: 1,
              }}
            >
              <InputBase
                onChange={(e) => this.setState({ amount: e.target.value })}
                // value={this.state.searchQuery}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Amount.."
              />
            </Paper>
          </div>
          <Button
            variant="outlined"
            style={{ backgroundColor: "#faff5a", color: "#222222" }}
            onClick={this.handlePlay}
            data-testid="play-button"
          >
            Play!
          </Button>
        </motion.div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  fetchQuizQuestions: (url) => dispatch(fetchQuizQuestions(url)),
});
const PlayQuizWithRouter = withRouter(PlayQuiz);

export default connect(mapStateToProps, mapDispatchToProps)(PlayQuizWithRouter);
