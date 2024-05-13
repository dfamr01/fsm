import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TRIVIA_MOCK_DATA } from "./trivia.mock";
// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

export const initMockServer = () => {
  mock.onGet("/trivia-questions").reply(200, TRIVIA_MOCK_DATA);
};
