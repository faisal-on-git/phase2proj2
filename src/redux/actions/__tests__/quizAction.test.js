import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchQuizQuestions } from '../quizAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');



describe('fetchQuizQuestions', () => {
    it('dispatches SET_QUIZ_QUESTION when successful', async () => {
      const mockQuestions = [
        { question: 'Question 1', correct_answer: 'Answer 1', incorrect_answers: ['Answer 2', 'Answer 3', 'Answer 4'] },
        { question: 'Question 2', correct_answer: 'Answer 2', incorrect_answers: ['Answer 1', 'Answer 3', 'Answer 4'] }
      ];
      axios.get.mockResolvedValueOnce({ data: { results: mockQuestions } });
  
      const expectedActions = [{ type: 'SET_QUIZ_QUESTION', payload: mockQuestions }];
  
      const store = mockStore({});
      await store.dispatch(fetchQuizQuestions('url'));
  
      expect(store.getActions()).toEqual(expectedActions);
    });
  });