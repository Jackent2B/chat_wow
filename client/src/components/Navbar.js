import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const Navbar = () => {
  const [search, setSearch] = useState('');
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([]);
  const searchModal = useRef(null);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    //if user is signed in then this will return
    if (state) {
      return [
        <Tippy content='Search Users'>
          <li key='1'>
            <i
              data-target='modal1'
              className='large material-icons modal-trigger'
            >
              search
            </i>
          </li>
        </Tippy>,
        <Tippy content='Create Post'>
          <li key='2'>
            <Link to='/createPost'>
              <i className='material-icons'>add_a_photo</i>
            </Link>
          </li>
        </Tippy>,
        <Tippy content='Your Profile'>
          <li key='3'>
            <Link to='/profile'>
              <i className='material-icons'>person</i>
            </Link>
          </li>
        </Tippy>,
        <Tippy content='Followings Post'>
          <li key='4'>
            <Link to='/followingPost'>
              <i className='material-icons'>person_add</i>
            </Link>
          </li>
        </Tippy>,
        <li key='5'>
          <a
            onClick={() => {
              localStorage.clear();
              dispatch({ type: 'CLEAR' });
              history.push('/signin');
            }}
          >
            LOGOUT
          </a>
        </li>,
      ];
    } else {
      return [
        <li key='6'>
          <Link to='/signin'>LOGIN</Link>
        </li>,
        <li key='7'>
          <Link to='/signup'>SIGNUP</Link>
        </li>,
      ];
    }
  };

  const fetchUser = (query) => {
    setSearch(query);
    fetch('/search-user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user);
        setUserDetails(data.user);
      });
  };

  return (
    <div>
      <nav style={{ background: '#1f1f2e' }}>
        <div className='nav-wrapper'>
          <Tippy content='Home'>
            <Link
              to={state ? '/' : '/signin'}
              className='left brand-logo'
              style={{ paddingLeft: '11px', fontFamily: 'Galada' }}
            >
              CW!
            </Link>
          </Tippy>
          <ul id='nav-mobile' className='right' style={{ paddingRight: '8px' }}>
            {renderList()}
          </ul>
        </div>
        <div
          id='modal1'
          className='modal'
          ref={searchModal}
          style={{ color: 'black', width: '40%' }}
        >
          <div className='modal-content'>
            <input
              type='text'
              placeholder='Search Users'
              value={search}
              onChange={(e) => fetchUser(e.target.value)}
            />
            <ul className='collection'>
              {userDetails.map((item) => {
                return (
                  <Link
                    key={item._id}
                    to={
                      item._id === state._id
                        ? '/profile'
                        : '/profile/' + item._id
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch('');
                    }}
                  >
                    <li className='collection-item'>{item.email}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className='modal-footer'>
            <button
              className='modal-close btn-flat '
              onClick={() => setSearch('')}
            >
              Close
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
