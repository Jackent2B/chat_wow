import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/profile/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setProfile(result);
      });
    console.log(state);
  }, []);

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
      });
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
      });
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: '550px', margin: '0px auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '18px 0px',
              borderBottom: '1px solid grey',
            }}
          >
            <div>
              <img
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '80px',
                }}
                alt={'avatar'}
                src={userProfile.user.pic}
              />
            </div>
            <div>
              <h4
                style={{ paddingLeft: '10px', fontFamily: 'Permanent Marker' }}
              >
                {userProfile.user.name}
              </h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  paddingLeft: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '108%',
                }}
              >
                <h6>
                  <b>{userProfile.posts.length}</b> posts
                </h6>
                <h6>
                  <b>{userProfile.user.followers.length}</b> followers
                </h6>
                <h6>
                  <b>{userProfile.user.following.length}</b> following
                </h6>
              </div>
              {state && !state.following.includes(userid) ? (
                <button
                  style={{
                    margin: '10px',
                  }}
                  className='waves-effect waves-light btn'
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{
                    margin: '10px',
                  }}
                  className='waves-effect waves-light btn'
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>
          <div className='gallery'>
            {userProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className='item'
                  src={item.photo}
                  alt={item.title}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2 style={{ textAlign: 'center', fontFamily: 'Galada' }}>
          loading...!
        </h2>
      )}
    </>
  );
};

export default Profile;
