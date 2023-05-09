import axios from "axios";

export const setQuizQuestions = (questions) => ({
  type: "SET_QUIZ_QUESTION",
  payload: questions,
});
export const setUserAnswers = (answers) => ({
  type: "SET_USER_ANSWERS",
  payload: answers,
});

export const setQuizScore = (score) => ({
  type: "SET_QUIZ_SCORE",
  payload: score,
});

export const setQuizIndex = (index) => ({
  type: "SET_QUIZ_INDEX",
  payload: index,
});
export const resetQuiz = () => ({
  type: "RESET_QUIZ",
});

export const SET_QUIZ_QUESTION = "SET_QUIZ_QUESTION";

export const fetchQuizQuestions = (url) => {
  console.log(url, "i am called from thunk");
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        const questions = response.data.results.map((item) => {
          return {
            question: item.question,
            correct_answer: item.correct_answer,
            incorrect_answers: item.incorrect_answers,
          };
        });
        dispatch({
          type: SET_QUIZ_QUESTION,
          payload: questions,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //   console.log(questions,"i am called from thunk")
};
