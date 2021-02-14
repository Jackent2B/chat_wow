import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.posts);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'chatWow');
      data.append('cloud_name', 'jackent2b');
      fetch('https://api.cloudinary.com/v1_1/jackent2b/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              //updating the url in local storage
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  return (
    <div style={{ maxWidth: '550px', margin: '0px auto' }}>
      <div
        style={{
          margin: '18px 0px',
          borderBottom: '1px solid grey',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <img
              style={{ width: '160px', height: '160px', borderRadius: '80px' }}
              src={state ? state.pic : 'loading'}
            />
          </div>
          <div>
            <h4 style={{ paddingLeft: '10px', fontFamily: 'Permanent Marker' }}>
              {state ? state.name.toUpperCase() : 'loading'}
            </h4>
            <h5 style={{ paddingLeft: '10px' }}>
              {state ? state.email : 'loading'}
            </h5>
            <div
              style={{
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '108%',
              }}
            >
              <h6><b>{mypics.length}</b> posts</h6>
              <h6><b>{state ? state.followers.length : 0}</b> Followers</h6>
              <h6><b>{state ? state.following.length : 0}</b> Following</h6>
            </div>
          </div>
        </div>

        <div className='file-field input-field' style={{ margin: '10px' }}>
          <div className='waves-effect waves-light btn'>
            <span>Update pic</span>
            <input
              type='file'
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
      </div>
      <div className='gallery'>
        {mypics.map((item) => {
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
  );
};

export default Profile;
