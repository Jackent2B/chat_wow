import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Reset = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const signinData = () => {
    fetch('/reset-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        //toast is used to popup when their is an error.
        if (data.message) {
          M.toast({ html: data.message, classes: '#c62828 red darken-3' });
        } else if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          //dispatch({type:"USER",payload:data.user})

          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className='card auth-card'>
        <h4 style={{ fontFamily: 'Galada' }}>ChatWow</h4>
        <h2 style={{ fontFamily: 'Galada' }}>Reset Password</h2>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className='waves-effect waves-light btn'
          onClick={() => signinData()}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};
export default Reset;
