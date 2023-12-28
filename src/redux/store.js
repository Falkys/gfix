import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth';
import { gamesReducer } from './slices/games';
import { messagesReducer } from './slices/messages';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    posts: postsReducer,
    auth: authReducer,
    messages: messagesReducer,
  },
});

export default store;