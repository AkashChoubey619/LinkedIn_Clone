import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import PhotoIcon from '@mui/icons-material/Photo';
import Video from '@mui/icons-material/SmartDisplay';
import ThreeDotsIcon from '@mui/icons-material/MoreHoriz';
import Event from '@mui/icons-material/CalendarMonth';
import Article from '@mui/icons-material/Newspaper';
import { Box, Button, ButtonGroup, CardMedia, Checkbox, Divider, Stack, Typography, debounce, useMediaQuery } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Like from '@mui/icons-material/ThumbUpAltOutlined';
import FilledLike from '@mui/icons-material/ThumbUpAlt';
import Comment from '@mui/icons-material/MarkUnreadChatAltOutlined';
import FilledComment from '@mui/icons-material/MarkUnreadChatAlt';
import Repost from '@mui/icons-material/RepeatSharp';
import FilledRepost from '@mui/icons-material/RepeatOnSharp';
import CloseIcon from '@mui/icons-material/Close';
import LeftSection from './LeftSection'
import RightSection from './RightSection';
import Context from '../ContextApi/MainContext';
import Send from '@mui/icons-material/SendOutlined';
import FilledSend from '@mui/icons-material/Send';
import PublicIcon from '@mui/icons-material/Public';
import Emoji from '@mui/icons-material/InsertEmoticon';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import Dot from '@mui/icons-material/FiberManualRecordSharp';
import Tooltip from '@mui/material/Tooltip';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import './Style.css'
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Main() {
  // const [card, setCard] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openRepost, setOpenRepost] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRepost = () => setOpenRepost(true);
  const handleCloseRepost = () => setOpenRepost(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);
  const [editPost, setEditPost] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editCommentId, setEditCommentId] = useState('');
  const { card, setCard, mode } = useContext(Context);
  const [postContent, setPostContent] = useState('');
  const [likeCount, setLikeCount] = useState({})
  const [countComment, setCountComment] = useState({})
  const [postImage, setPostImage] = useState(null)
  const [commentData, setCommentData] = useState({});
  const [comment, setComment] = useState({})
  const [isLiked, setIsLiked] = useState({})
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [showComm, setShowComm] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"))

  const token = localStorage.getItem("token");

  const [page, setPage] = useState(1);
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  const handleComment = (e) => {
    setComment((prevComments) => ({
      ...prevComments,
      [e.target.id]: e.target.value,

    }));
  };

  const dateVisible = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = newDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

  }


  // <=======================Create Post=======================>

  const creatingPost = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("images", postImage);
    console.log(formData, 'post')
    console.log(postImage, 'image')

    fetch('https://academics.newtonschool.co/api/v1/linkedin/post/', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        projectId: 'ut1dy4576cd1'
      },
      body: formData,
    })
      .then((res) => {
        res.json();
        console.log('comment ok')
        setPostContent('')

        setPostImage(null)

        handleClose()

        console.log('post success')
        window.location.reload(false)

      }).catch((error) => console.log(error))

  }


  // <=======================Post Update=======================>

  const updatePost = async (postId, updatePost) => {

    const formData = new FormData();
    formData.append("content", updatePost);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ut1dy4576cd1",
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Comment done");
      } else {
        const errorData = await response.json();
        console.error("error", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editPostBtn = (postId, postContent) => {
    setEditPost(postContent);
    setEditPostId(postId);
  };
  const saveEditPost = async (postId) => {
    await updatePost(postId, editPost);

    setEditPost("");
    setEditPostId("");
    window.location.reload(false)
  };
  const isEditingPost = (postId) => postId === editPostId;

  // <=======================Post Delete=======================>

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ut1dy4576cd1",
          },
        }
      );

      if (response.ok) {
        console.log("Post deleted successfully");
        setCard(() => card.filter(
          (post) => post._id !== postId
        ),
        );

      } else {
        const errorPostData = await response.json();
        console.error("Post Error:", errorPostData);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };


  const handelLike = async (id, isLiked) => {
    const updatedIsLiked = !isLiked;
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          projectId: 'ut1dy4576cd1'
        }
      }
      )
      if (res.ok) {
        setLikeCount(prevLike =>
          ({ ...prevLike, [id]: prevLike[id] + 1 })
        )
        setIsLiked(prevLike => ({
          ...prevLike,
          [id]: updatedIsLiked,
        }));
        console.log('item liked', isLiked)
      }
      else {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            projectId: 'ut1dy4576cd1'
          }
        }
        )
        if (response.ok) {
          setLikeCount(prevLike =>
            ({ ...prevLike, [id]: prevLike[id] - 1 })
          )
          console.log('item disliked', isLiked)
        }
      }
    }
    catch (error) {
      console.error('likeError', error)
    }

  }

  // <=======================Creating Comment=======================>

  const creatingComment = async (id) => {
    try {

      const comments = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          projectID: 'ut1dy4576cd1'
        },
        body: JSON.stringify({
          content: comment[id]
        }),
      })
      let data
      if (comments.ok) {
        data = await comments.json();
        console.log(data)
        setComment({});
        setCountComment(prevCommentCount =>
          ({ ...prevCommentCount, [id]: prevCommentCount[id] + 1 })
        )
      } else {
        console.log('comment rejected')
      }
    } catch (error) { console.log('createCommentErr', error) }

    handleRenderComment(id)
  }

  // <=======================UpdateComment=======================>

  const updateComment = async (postId, commentId, updatedComment) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/comment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ut1dy4576cd1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: updatedComment }),
        }
      );

      if (response.ok) {
        const increasedCommentCount = card.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              commentCount: post.commentCount + 1,
            };
          }
          return post;
        });
        setCard(increasedCommentCount);
      } else {
        const errorData = await response.json();
        console.error("error", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editComments = (commentId, commContent) => {
    setEditComment(commContent);

    setEditCommentId(commentId);
  };
  const saveComments = async (postId) => {
    await updateComment(postId, editCommentId, editComment);
    setEditComment("");
    setEditCommentId("");

    handleRenderComment(postId);
  };
  const isEditingComment = (commentId) => commentId === editCommentId;

  // <--------------------------display Comment for particular post------------------------->

  const toggleComment = (postId) => {
    setShowComm(prev =>
      ({ ...prev, [postId]: !prev[postId] })
    )
    console.log(showComm);
  }

  // <--------------------------handleComment------------------------->

  const handleRenderComment = async (id) => {

    try {
      const userComments = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${id}/comments`, {
        headers: {
          Authorization: 'Bearer ' + { token },
          projectId: 'ut1dy4576cd1'
        }
      }
      )

      if (userComments.ok) {
        const data = await userComments.json();

        setCommentData((prevComments) => ({
          ...prevComments,
          [id]: data.data,

        }))

      }
      else {
        console.log('unable to fetch')
      }
    }
    catch (error) { console.log(error) }
  }


  // <=======================Delete Comments=======================>

  const deleteComments = async (postId, commentId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ut1dy4576cd1",
          },
        }
      );

      if (response.ok) {
        console.log("Comment deleted successfully");
        setCommentData((prevComments) => ({
          ...prevComments,
          [postId]: prevComments[postId].filter(
            (comment) => comment._id !== commentId
          ),
        }));
        setCountComment(prevCommentCount =>
          ({ ...prevCommentCount, [postId]: prevCommentCount[postId] + 1 })
        )
      } else {
        const errorCommentData = await response.json();
        console.error("Comment Error:", errorCommentData);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };


  // <=======================peopleData=======================>
  const url = `https://academics.newtonschool.co/api/v1/linkedin/post?limit=10&page=${page}`;

  const contentApi = async function () {

    try {

      setIsLoading(true)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          projectId: 'ut1dy4576cd1'
        }
      });

      if (response.ok) {

        const data = await response.json();
        setCard((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1)

        // fetching comment

        data.data.forEach((post) => {
          handleRenderComment(post._id);
          setLikeCount(prevLikeCount => ({
            ...prevLikeCount,
            [post._id]: parseInt(post.likeCount),
          }));
          setIsLiked(prevLike => ({
            ...prevLike,
            [post._id]: post.isLiked,
          }));
          setCountComment(prevCount => ({
            ...prevCount,
            [post._id]: parseInt(post.commentCount),
          }));
        });
      }

      setIsLoading(false)
    } catch (error) {
      console.log('Error', error);
    } finally {
      console.log('fetch successfully ', page)
    }
  }

  //<_______________________________infinityScroll_____________________________>

  const handleScroll = debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    try {
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        contentApi();
      }
    }
    catch (error) {
      console.log(error)
    }

  }, 150)

  // console.log(page)

  useEffect(() => {
    contentApi()
  }, [])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)

    }
  }

    , [handleScroll]
  )

  return (
    <Stack direction="row" id='mainContent'>
      {isMdScreen && (<div>
        <LeftSection prop={userData.profileImage} />
      </div>)}

      <div id='main'>
        <section className='mainPosition' >
          <section id='mainInfo' className={mode ? 'darkModeMain' : ''}>
            <div className='mainHead1'>
              {userData && <Avatar src={userData.profileImage} sx={{ bgcolor: randomColor }}>
                {userData.name.toUpperCase().charAt(0)}</Avatar>}
              <div id='mainSearch'>
                <TriggerButton type="button" sx={{ borderRadius: '20px', p: 0, border: 'none', flex: 'start', width: '100%' }}
                  onClick={handleOpen}>
                  <input type='text' className={mode ? 'mainSearchPostDark' : 'mainSearchPost'}
                    placeholder='Start post' />
                </TriggerButton>
              </div>
            </div>

            <div className='mainHead2' >
              <div className='mainIconData' onClick={handleOpen} style={{ cursor: "pointer" }}>
                <PhotoIcon /><p className='IconData'>Photo</p></div>
              <div className='mainIconData' onClick={handleOpen} style={{ cursor: "pointer" }}>
                <Video /><p className='IconData'>Video</p></div>
              <div className='mainIconData' onClick={handleOpen} style={{ cursor: "pointer" }}>
                <Event /><p className='IconData'>Event</p></div>
              <div className='mainIconData' onClick={handleOpen} style={{ cursor: "pointer" }}>
                <Article /><p className='IconData'>Article</p></div>
            </div>
          </section>
          <Box>

            <Modaal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              slots={{ backdrop: StyledBackdrop }}
            >
              <ModalContent sx={mode ? { width: 550, background: 'black', color: 'white' } : { width: 550 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h2 id="unstyled-modal-title" className="modal-title">
                    Add post
                  </h2>
                  <CloseIcon sx={mode && { color: 'white' }} onClick={handleClose} />
                </Box>
                <form onSubmit={creatingPost}>
                  <textarea type='text'
                    style={mode ? { border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', background: 'black', color: 'white' } :
                      { border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit' }}
                    rows={6} id="unstyled-modal-description" placeholder='What do you want to talk about...?'
                    value={postContent}
                    onChange={(e) => { setPostContent(e.target.value) }}
                    className="modal-description">
                  </textarea>
                  <Button sx={{ borderRadius: '50%', width: '40px', height: '60px', color: 'grey' }} variant="text">
                    <label htmlFor="file-input">
                      <ImageIcon />
                    </label>
                    {postImage === null ? (
                      <input id="file-input" value={postImage}
                        onChange={
                          (e) => {
                            setPostImage(e.target.files[0])
                          }} type="file" style={{ display: 'none' }} />
                    ) : null}
                  </Button>
                  <Box sx={{ margin: 'left', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' sx={mode ? { borderRadius: '20px', width: '80px', background: 'darkslategray' } : { borderRadius: '20px', width: '80px' }}
                      variant="contained">Post</Button>
                  </Box>
                </form>
              </ModalContent>
            </Modaal>


            <Modal
              open={openRepost}
              onClose={handleCloseRepost}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={mode?darkStyle:style} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h2 id="unstyled-modal-title" className="modal-title">
                    Can't find the content you are looking for?
                  </h2>
                  <CloseIcon sx={mode && { color: 'white' }} onClick={handleCloseRepost} />
                </Box>
                <Typography id="modal-modal-title" variant="body2" component="h2">
                  There might be some issue  with your post, but don’t worry! You can try after after sometime
                </Typography>
                <Typography id="modal-modal-description" variant="body1"  sx={{ mt: 2 }}>
                  Sorry for the issue
                </Typography>
              </Box>
            </Modal>

            <Modal
              open={openShare}
              onClose={handleCloseShare}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={mode?darkStyle:style} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h2 id="unstyled-modal-title" className="modal-title">
                    No  sharing yet! Make connections
                  </h2>
                  <CloseIcon sx={mode && { color: 'white' }} onClick={handleCloseShare} />
                </Box>
                <Typography id="modal-modal-title" variant="body1" component="h2">
                 may  take a while to show up here. But don’t worry, we will notify you as soon as it is ready.
                </Typography>
              </Box>
            </Modal>

          </Box>
        </section>
        <Divider sx={mode ? { bgcolor: 'white', m: 2 } : { m: 2 }} orientation='horizontal' flexItem />
        <section id='renderPosts'>
          {
            card.map((item, index) => {
              return (
                <div key={item._id + index} className={mode ? 'infoCardDark' : 'infoCard'}>
                  <div id={item._id} className='user_info'>
                    {isLoading ?
                      <Skeleton sx={mode ? { bgcolor: 'white' } : ''} variant="circular" width={45} height={45} /> :
                      <Link id={item._id} to={'/userProfile'} onClick={() => {
                        item.author._id &&
                          localStorage.setItem('getId', item.author._id);
                        console.log(item.author._id);
                      }}
                      >
                        <Avatar className='userLogo' alt='user_profile' src={item.author.profileImage}>
                        </Avatar>
                      </Link>}
                    <div id={item._id} className='userHead'>
                      {isLoading ?
                        <Skeleton variant="text" sx={mode ? { bgcolor: 'white', fontSize: '1rem' } :
                          { fontSize: '1rem' }} width={75} /> :
                        <h2 id={item._id} className='userName'>
                          <Link onClick={() => {
                            item.author._id &&
                              localStorage.setItem('getId', item.author._id);
                            console.log(item.author._id);
                          }} to={`/userProfile?=${item.author._id}`}
                            className={mode ? 'userNameDark' : 'userNameLink'}>
                            {item.author.name}
                          </Link>
                          {
                            userData._id === item.author._id ?
                              <Dropdown key={item._id} >
                                <MenuButton id={item._id} sx={mode ? { bgcolor: 'black', boxShadow: 'none' } :
                                  { bgcolor: 'white', boxShadow: 'none' }}>
                                  <ThreeDotsIcon sx={mode ? { fontSize: '18px', bgcolor: 'black', color: 'white' } :
                                    { fontSize: '18px', bgcolor: 'white' }} />
                                </MenuButton>
                                <Menu id={item._id} slots={{ listbox: Listbox }}>
                                  <MenuItem id={item._id}
                                    onClick={() => {
                                      editPostBtn(item._id, item.content)
                                    }}
                                  >edit</MenuItem>
                                  <MenuItem id={item._id} onClick={() => {
                                    deletePost(item._id)
                                  }}>
                                    delete
                                  </MenuItem>
                                </Menu>
                              </Dropdown> : ''
                          }
                        </h2>}
                      {isLoading ?
                        <Skeleton variant="text" sx={mode ? { bgcolor: 'white', fontSize: '12px' } : { fontSize: '12px' }} width={45} /> : <p className='postTime'>
                          <div id={item._id}  >
                            {dateVisible(item.createdAt)}</div>
                          <div>
                            <div id={item._id} className='headIcon'>
                              &nbsp;<Dot sx={{ fontSize: 9 }} />
                              &nbsp; <PublicIcon sx={{ fontSize: 12 }} />
                            </div>
                          </div>
                        </p>}
                    </div>
                  </div>
                  {isLoading ? <Skeleton sx={mode ? { bgcolor: 'white' } : ''}
                    variant="rounded" width={'100%'} height={80} /> :
                    <div id={item._id} className='userPost'>
                      <Tooltip title='Title ' arrow>
                        <p className='userCaption'>{item.title}</p>
                      </Tooltip>
                      {
                        isEditingPost(item._id) ?
                          <div className='editPost' id={item._id}>
                            <input aria-label="minimum height"
                              id={item._id}
                              className={mode ? 'editPostInputDark' : 'editPostInput'}
                              type="text" placeholder="Write a caption..."
                              value={editPost}
                              onChange={(e) => { setEditPost(e.target.value) }}
                            />
                            <Button id={item._id}
                              variant="contained"
                              sx={{ width: '25px', height: '25px', fontSize: '10px' }}
                              onClick={() => saveEditPost(item._id)}>
                              Save
                            </Button>
                            <Button
                              id={comment._id}
                              sx={{ width: '25px', height: '25px', fontSize: '10px', ml: '10px' }}
                              className="editCommentBtn"
                              onClick={() => {
                                setEditPost('')
                                setEditPostId('')
                              }
                              }
                              variant="outlined"
                            >cancel</Button>

                          </div> :
                          <p id={item._id} className='userContent'>
                            {item.content}
                          </p>
                      }
                      {item.images === null || item.images.length === 0 ? null :

                        <img src={item.images} id={item._id} className='contentImg'
                          alt='content_Image' />}
                      {/* {item.images === null || item.images.length === 0 ? null :
                        item.images && typeof item.images === 'string' ? 
                        ( // Check if image is a URL
                          <img src={item.images} className='contentImg' alt="Posted" />
                        ) : (
                          <img src={URL.createObjectURL(item.images)} className='contentImg' alt="Posted" /> // Create object URL for file
                        )
                      } */}

                    </div>
                  }

                  <div className='postReaction'>
                    {isLoading ? <Skeleton sx={mode ? { bgcolor: 'white', fontSize: '12px' } : ''} variant="text" width={20} /> :
                      likeCount[item._id] &&
                      (<p>{likeCount[item._id] !== undefined ? likeCount[item._id] : 0} &nbsp; Reaction</p>)}
                    {isLoading ? <Skeleton variant="text" sx={mode ? { bgcolor: 'white', fontSize: '12px' } : ''} width={35} height={19} /> :
                      countComment[item._id] && (
                        <p>
                          {countComment[item._id] !== undefined ? countComment[item._id] : 0} &nbsp; Comments
                        </p>
                      )
                    }
                  </div>
                  <Divider sx={mode ? { bgcolor: 'white', m: 2 } : { m: 2 }} />

                  {/* <-----Like,comment,share,report-------> */}

                  {isLoading ? <Skeleton variant="text"
                    sx={mode ? { bgcolor: 'white', fontSize: '12px' } : ''}
                    width={"100%"} height={49} /> :
                    <div className='interactiveIcons'>

                      {/* <<======================Like===============================>> */}

                      <div className='like'

                      >
                        <label htmlFor={`like ${index}`} style={{ cursor: 'pointer' }}
                          className='interactiveIcons_custom'>
                          <Checkbox sx={mode ? { color: 'white' } : ''} id={`like ${index}`} icon={<Like />}
                            onClick={() => handelLike(item._id, item.isLiked)
                            }
                            checked={isLiked[item._id]}
                            checkedIcon={<FilledLike />}
                          />
                          {isSmScreen && (<p className='icon_text'>Like</p>)}
                        </label>
                      </div>
                      {/* <<======================Comment===============================>> */}
                      <label htmlFor={`comment` + index} onClick={() => toggleComment(item._id)} className='comment'>
                        <div id={item._id} style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                          <Checkbox sx={mode ? { color: 'white' } : ''} id={`comment` + index}
                            icon={<Comment />} checkedIcon={<FilledComment />} />
                          {isSmScreen && (<p onClick={() => toggleComment(item._id)} className='icon_text'>Comment</p>)}
                        </div>

                      </label>


                      {/* <<======================repost===============================>> */}

                      <label htmlFor={`repost` + index} onClick={handleOpenRepost} className='repost'>
                        <div style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                          <Checkbox sx={mode ? { color: 'white' } : ''} id={`repost` + index}
                            checked={openRepost}
                            onChange={handleOpenRepost}
                            icon={<Repost />} checkedIcon={<FilledRepost />} />
                          {isSmScreen && (<p className='icon_text'>Repost</p>)}
                        </div>
                      </label>
                      <div id={item._id} className='share'>



                        {/* <<======================Send===============================>> */}

                        <label htmlFor={`send` + index} onClick={handleOpenShare}
                          style={{ cursor: 'pointer' }} className='interactiveIcons_custom'>
                          <Checkbox sx={mode ? { color: 'white' } : ''}
                            id={`send` + index} icon={<Send />}
                            checked={openShare}
                             checkedIcon={<FilledSend />} />
                          {isSmScreen && (<p className='icon_text'>Send</p>)}
                        </label>
                      </div>
                    </div>}

                  {/* <============ Comments box ============> */}

                  {showComm[item._id] && (<Box id={item._id} className='commentSection'>
                    <Typography variant='h6' id={item._id}>
                      Comments
                    </Typography>
                    <Stack id={item._id} sx={{ alignItems: 'center', my: '10px' }}
                      spacing={1} direction={'row'} className='commentsOfUsers'>
                      <Avatar src={userData.profileImage} sx={{ width: 34, height: 34 }}>
                        {'akash'.toUpperCase().charAt(0)}
                      </Avatar>
                      <input type='text' value={comment[item._id]}
                        onChange={handleComment}
                        id={item._id}
                        className={mode ? 'mainSearchCommentDark' : 'mainSearchComment'}
                        placeholder='Add a comment...' />
                      <ButtonGroup id={item._id} className='groupBtnComment' variant="none" aria-label="button group">
                        <Button id={item._id}><Emoji /></Button>
                        <Button id={item._id}><ImageIcon /></Button>
                        <Button id={item._id} onClick={() => {
                          creatingComment(item._id)
                        }
                        }><FilledSend /></Button>
                      </ButtonGroup>


                    </Stack>


                    {

                      commentData[item._id] && commentData[item._id].map((comment) => {

                        return (
                          <Stack
                            key={comment._id}
                            direction={'row'} mb={1} spacing={1}
                            className='allComments'>
                            <Avatar
                              id={comment._id} src={''} sx={{ bgcolor: randomColor, my: '10px', width: 36, height: 36 }}>
                              {'akash'.toUpperCase().charAt(0)}</Avatar>
                            <Box id={comment._id}
                              sx={mode ? { width: '80%', p: "10px", borderRadius: '7px', bgcolor: 'darkslategray' } :
                                { width: '80%', p: "10px", borderRadius: '7px', bgcolor: '#f1e2e2' }}
                              className='displayComment'>
                              <Box id={comment._id} mb={1}>
                                <Stack
                                  id={comment._id}
                                  direction={'row'}
                                  height={10} justifyContent={'space-between'}
                                  alignItems={'center'} className='allComments' flexItem>
                                  <Typography
                                    id={comment._id} className='person_name' variant='body2'>
                                    {userData._id === comment.author ? userData.name : 'New user'}</Typography>
                                  <Typography
                                    id={comment._id} sx={{
                                      display: 'flex', alignItems: 'center',
                                      fontSize: '8px'
                                    }} spacing={2} className='person_name'
                                    variant='body'>
                                    {dateVisible(comment.createdAt)}&nbsp;
                                    {
                                      userData._id === comment.author ?
                                        <Dropdown key={comment._id}>
                                          <MenuButton sx={mode ? { bgcolor: 'darkslategray', color: 'white' } : { bgcolor: '#f1e2e2' }}
                                            id={comment._id}>
                                            <ThreeDotsIcon sx={mode ? { bgcolor: 'darkslategray', color: '#white', fontSize: '18px' }
                                              : { fontSize: '18px', bgcolor: '#f1e2e2' }} />
                                          </MenuButton>
                                          <Menu sx={mode ? { bgcolor: 'grey', color: 'white' } : {}}
                                            slots={{ listbox: Listbox }}>
                                            <MenuItem id={comment._id}
                                              onClick={() =>
                                                editComments(comment._id, comment.content)
                                              }>

                                              edit</MenuItem>
                                            <MenuItem id={comment._id}
                                              onClick={() =>
                                                deleteComments(item._id, comment._id)
                                              }>
                                              delete
                                            </MenuItem>
                                          </Menu>
                                        </Dropdown> : ''
                                    }
                                  </Typography>
                                </Stack>
                                <Typography id={comment._id} sx={{ fontSize: '9px' }}
                                  className='person_about' variant='body'>
                                  Unknown
                                </Typography>
                              </Box>
                              {isEditingComment(comment._id) ?
                                <div id={comment._id} className="makeEdit">
                                  <input
                                    type="text"
                                    id={comment._id}
                                    className='editCommentInputBox'
                                    placeholder="Edit comment..."
                                    value={editComment}
                                    onChange={(e) =>
                                      setEditComment(e.target.value)
                                    }
                                  />
                                  <Button
                                    id={comment._id}
                                    sx={{ width: '25px', height: '25px', fontSize: '10px' }}
                                    className="editCommentBtn"
                                    onClick={() => {
                                      saveComments(item._id)
                                    }
                                    }
                                    variant="contained"
                                  >
                                    save
                                  </Button>
                                  <Button
                                    id={comment._id}
                                    sx={{ width: '25px', height: '25px', fontSize: '10px', ml: '10px' }}
                                    className="editCommentBtn"
                                    onClick={() => {
                                      setEditComment('')
                                      setEditCommentId('')
                                    }
                                    }
                                    variant="outlined"
                                  >
                                    cancel
                                  </Button>
                                </div> :
                                <Typography id={comment._id} fontSize={'0.9em'}
                                  m={1} className='person_comment' variant='body'>
                                  {comment.content}
                                </Typography>}
                            </Box>

                          </Stack>
                        )
                      }
                      )
                    }
                  </Box>)}


                </div>

              )
            })
          }


        </section>
      </div>

      {isSmScreen && (<RightSection />)}

    </Stack>
  )
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modaal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'8px'
};
const darkStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  color:'white',
  border: '2px solid #000',
  boxShadow: '0px 0px 14px white',
  p: 4,
  borderRadius:'8px'
}

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 150px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : 'lightgrey'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(

  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  background:'#f1e2e2'

  
  `,
);