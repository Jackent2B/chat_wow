import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signinData = () => {
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //toast is used to popup when their is an error.
        if (data.message) {
          M.toast({ html: data.message, classes: '#c62828 red darken-3' });
        } else if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          //to store token locally so that we can create post after signin
          localStorage.setItem('jwt', data.token);
          //we need to stringify this because in local storage we can only store strings
          localStorage.setItem('user', JSON.stringify(data.user));

          dispatch({ type: 'USER', payload: data.user });

          M.toast({
            html: 'Successfully SignedIn!',
            classes: '#43a047 green darken-1',
          });
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className='card auth-card'>
        <h4 style={{ fontFamily: 'Galada' }}>Welcome to ChatWow</h4>
        <h2 style={{ fontFamily: 'Galada' }}>Login</h2>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className='waves-effect waves-light btn'
          onClick={() => signinData()}
        >
          Login
        </button>
        <div style={{ paddingTop: '10px', fontFamily: 'Galada' }}>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
