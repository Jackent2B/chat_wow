import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //making it optional for the user to upload profile pic at the time of signup or can be later
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
        <h4 style={{ fontFamily: 'Galada' }}>Welcome to ChatWow</h4>
        <h2 style={{ fontFamily: 'Galada' }}>Signup</h2>
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='waves-effect waves-light btn'>
            <span>Upload pic</span>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          className='waves-effect waves-light btn'
          onClick={() => PostData()}
        >
          SignUp
        </button>
        <div style={{ paddingTop: '10px', fontFamily: 'Galada' }}>
          Already have an Account? <Link to='/signin'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
