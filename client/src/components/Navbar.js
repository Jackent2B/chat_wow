import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    //if user is signed in then this will return
    if (state) {
      return [
        <li>
          <Link to='/createPost'>
            <i className='material-icons'>add_a_photo</i>
          </Link>
        </li>,
        <li>
          <Link to='/profile'>
            <i className='material-icons'>person</i>
          </Link>
        </li>,
        <li>
          <Link to='/followingPost'>
            <i className='material-icons'>person_add</i>
          </Link>
        </li>,
        <button
          className='waves-effect waves-light btn'
          onClick={() => {
            localStorage.clear();
            dispatch({ type: 'CLEAR' });
            history.push('/signin');
          }}
        >
          Logout
        </button>,
      ];
    } else {
      return [
        <li>
          <Link to='/signin'>LOGIN</Link>
        </li>,
        <li>
          <Link to='/signup'>SIGNUP</Link>
        </li>,
      ];
    }
  };

  return (
    <div>
      <nav style={{ background: '#1f1f2e' }}>
        <div className='nav-wrapper'>
          <Link
            to={state ? '/' : '/signin'}
            className='left brand-logo'
            style={{ paddingLeft: '11px', fontFamily: 'Galada' }}
          >
            Cw!
          </Link>
          <ul id='nav-mobile' className='right' style={{ paddingRight: '8px' }}>
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
