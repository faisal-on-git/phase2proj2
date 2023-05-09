import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { login } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import "./Home.css";
import { resetQuiz } from "../../redux/actions/quizAction";
import { Button } from "@mui/material";
import GoogleButton from "../../componenets/GoogleButton/GoogleButton";
import axios from "axios";
import { motion } from "framer-motion";


export class Home extends Component {
  state = {
    user: "",
  };

  componentDidMount() {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const params = {};
    for (const [key, value] of hashParams) {
      params[key] = value;
    }
    console.log(params);

    const token = hashParams.get("access_token");
    this.setState({ accessToken: token });

    if(this.props.user){
      this.props.history.push("/startQuiz", { user: this.props.user });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { accessToken } = this.state;
    if (accessToken && accessToken !== prevState.accessToken) {
      this.fetchUserInfo();
    }
  }

  async fetchUserInfo() {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        }
      );
      console.log("User info:", response.data);
      console.log(this.props.user, "state");
      this.props.login(response.data.name);

      this.props.history.push("/startQuiz", { user: response.data.name });
      console.log("login called from home");
    } catch (error) {
      console.error(error);
    }
  }

  handlePlay = () => {
    this.props.login(this.state.user);

    this.props.history.push("/startQuiz", { user: this.state.user });
    // this.props.login(this.props.user)
  };
  render() {
    return (
      <div className="home-container">
        <motion.div className="quizapp-text-container"
        animate={{ x: 0 }} initial={{ x: '100vw' }} transition={{ duration: 0.9 }}
        >
          <h1 className="white-text  quizapp-heading">Quiz App</h1>
        </motion.div>

        <div className="signin-options-container">
          <motion.div className="signin-with-google" animate={{ y: 0 }} initial={{ y: 50 }} transition={{ duration: 0.9 }}
          
          
          >
            <a
              href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000&client_id=80299088687-e0hit00vjvm11uqn4qum9otgt5aj5pn6.apps.googleusercontent.com"
              target="_blank"
            >
              <GoogleButton className="google-btn" />
            </a>
          </motion.div>

          <div className="signin-with-username">
            <span className="bottom-border"></span>
            <span className="or-text">OR</span>

            <input
              className="input-username"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => this.setState({ user: e.target.value })}
              
            ></input>
            {/* <button className='start-quiz-button' onClick={this.handlePlay}>Log In</button> */}

            <Button
            
              variant="outlined"
              style={{ backgroundColor: "#faff5a", color: "#222222" }}
              onClick={this.handlePlay}
              size="small"
              data-testid="login-button"
            >
              Log In
            </Button>
          </div>
        </div>

        {/* <button onClick={() => this.props.history.push('/startQuiz')}>Play Quiz</button> */}
        <button onClick={this.props.resetQuiz}>Reset</button>
        
        
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  resetQuiz: () => dispatch(resetQuiz()),
});

const HomeWithRouter = withRouter(Home);

export default connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter);
