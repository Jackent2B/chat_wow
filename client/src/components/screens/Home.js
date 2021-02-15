import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  //to know the state of the user
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData([...data, ...result.posts]);
        console.log(data);
      });
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  //unlike post
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  //comment post
  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleting post
  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  //delete comment
  const deleteComment = (id, commentId) => {
    fetch('/deleteComment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
        commentId: commentId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  return (
    <div className='home'>
      {data.length ? (
        data.map((item) => {
          return (
            <div className='card home-card' key={item._id}>
              <ul className='collection'>
                <li className='collection-item avatar'>
                  <Link
                    style={{ color: 'black' }}
                    to={
                      item.postedBy._id !== state._id
                        ? '/profile/' + item.postedBy._id
                        : '/profile'
                    }
                  >
                    <img src={item.postedBy.pic} alt='' className='circle' />
                    <span className='title' style={{ padding: '15px' }}>
                      <b>{item.postedBy.name.toUpperCase()}</b>
                    </span>
                  </Link>

                  {/* <p>First Line</p> */}
                  {item.postedBy._id === state._id && (
                    <i
                      className='material-icons'
                      style={{
                        float: 'right',
                      }}
                      onClick={() => deletePost(item._id)}
                    >
                      delete
                    </i>
                  )}
                  <br />
                  <span style={{ padding: '15px' }}>
                    {item.createdAt.split('T')[0]}
                  </span>
                </li>
              </ul>
              <div className='card-image'>
                <img src={item.photo} alt={'image here'} />
              </div>
              <div className='card-content'>
                {/* state._id contains the user id */}
                {item.likes.includes(state._id) ? (
                  <i
                    className='material-icons'
                    onClick={() => {
                      unlikePost(item._id);
                    }}
                    style={{ color: 'red' }}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className='material-icons'
                    onClick={() => {
                      likePost(item._id);
                    }}
                    style={{ color: '#bfbfbf' }}
                  >
                    favorite
                  </i>
                )}
                <h6>{item.likes.length} likes</h6>
                <h5>
                  <b>{item.title}</b>
                </h5>
                <p>{item.body}</p>

                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <Link
                        style={{ color: 'black' }}
                        to={
                          record.postedBy._id !== state._id
                            ? '/profile/' + record.postedBy._id
                            : '/profile'
                        }
                      >
                        <span style={{ fontWeight: '500' }}>
                          {record.postedBy.name}
                        </span>
                      </Link>{' '}
                      {record.text}
                      {record.postedBy._id === state._id && (
                        <i
                          className='material-icons'
                          style={{
                            float: 'right',
                          }}
                          onClick={() => deleteComment(item._id, record._id)}
                        >
                          delete
                        </i>
                      )}
                    </h6>
                  );
                })}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                    e.target[0].value = ' ';
                  }}
                >
                  <input type='text' placeholder='add a comment' />
                </form>
              </div>
            </div>
          );
        })
      ) : (
        <h2 style={{ textAlign: 'center', fontFamily: 'Galada' }}>
          Loading...
        </h2>
      )}
    </div>
  );
};

export default Home;
