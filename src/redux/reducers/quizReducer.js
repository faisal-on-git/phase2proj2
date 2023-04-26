const initialState={
    quizQuestions: [],
    // quizAnswers: [],
    userAnswers: [],
    quizScore: 0,
    quizIndex: 0,
};

const quizReducer = (state = initialState, action) => {
    console.log(action.payload,"i am called from reducer")
    switch(action.type){
        case "SET_QUIZ_QUESTION":

            return {
                ...state,
                quizQuestions: action.payload,
            }
        // case "SET_QUIZ_ANSWERS":
        //     return {
        //         ...state,
        //         quizAnswers: action.payload,
        //     }
        case "SET_USER_ANSWERS":
            return {
                ...state,
                userAnswers: action.payload,
            }
        case "SET_QUIZ_SCORE":
            return {
                ...state,
                quizScore: action.payload,
            }
        case "SET_QUIZ_INDEX":
            return {
                ...state,
                quizIndex: action.payload,
            }
            case "RESET_QUIZ":
                return {
                    ...state,
                    
                    quizQuestions: [],
                  
                    userAnswers: [],
                    quizScore: 0,
                    quizIndex: 0,
                }
        default:
            return state;
        }
               

    }

    export default quizReducer;