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
        setData(result.posts);
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
        setData(...data, newData);
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
        setData(...data, newData);
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

  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <div className='card home-card' key={item._id}>
            <ul class='collection'>
              <li class='collection-item avatar'>
                <Link
                  style={{ color: 'black' }}
                  to={
                    item.postedBy._id !== state._id
                      ? '/profile/' + item.postedBy._id
                      : '/profile'
                  }
                >
                  <img src={item.postedBy.pic} alt='' class='circle' />
                  <span
                    class='title'
                    style={{ padding: '15px', fontFamily: 'Permanent Marker' }}
                  >
                    {item.postedBy.name.toUpperCase()}
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
              <h6>{item.title}</h6>
              <p>{item.body}</p>

              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: '500' }}>
                      {record.postedBy.name}
                    </span>{' '}
                    {record.text}
                  </h6>
                );
              })}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type='text' placeholder='add a comment' />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
