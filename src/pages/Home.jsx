import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { isMobile } from 'react-device-detect';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import style from './Home.scss';
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { posts, tags } = useSelector(state => state.posts);
  const userdata = useSelector(state => state.auth.data);

  
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading'; 
  
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const handleClick = () => {
    navigate("/wheel")
  }
 return (
    
    <div style={{ marginTop: 100 }}>
      <Typography variant="h6"> Это сайт для подарков к новому году</Typography>
      <Typography variant="subtitle1" gutterBottom>Кнш бета версия</Typography>
      <Button onClick={handleClick} color="primary" type='submit' size="large" variant="outlined" >
        Перейти к колесу подарков
      </Button>
      <Typography variant="subtitle1" gutterBottom>В будующем планируется очень много развлекух, это покачто бета версия</Typography>
    </div>
  );
};
