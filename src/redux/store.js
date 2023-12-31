import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { messagesReducer } from './slices/messages';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    messages: messagesReducer,
  },
});

export default store;