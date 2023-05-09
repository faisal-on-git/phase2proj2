import rootReducer from "../index";
import authReducer from "../authReducer";

describe("root reducer",() =>{
    it("should combine all reducers",() =>{

        const expectedState = {
            authReducer: {
                user: null,
            },
            quizReducer: {
                quizQuestions: [],
                userAnswers: [],
                quizScore: 0,
                quizIndex: 0, 
               
            },
        }
        expect(rootReducer(undefined,{})).toEqual(expectedState) 
        // expect(rootReducer).toBeTruthy()
    })


    it("should handle login",() =>{
        const expectedState = {
            user: "Faisal",
        }
        expect(authReducer(undefined,{
            type: "LOGIN",
            payload: "Faisal",
        })).toEqual(expectedState)
    })
})   