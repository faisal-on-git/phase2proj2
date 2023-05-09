export default{
    get: jest.fn(() => Promise.resolve({data: {}}))
    
}



//data format of question
// {
//     "category": "Entertainment: Video Games",
//     "type": "multiple",
//     "difficulty": "easy",
//     "question": "Which of these is NOT a playable character in the 2016 video game Overwatch?",
//     "correct_answer": "Invoker",
//     "incorrect_answers": [
//     "Widowmaker",
//     "Genji",
//     "Zenyatta"
//     ]
//     }
