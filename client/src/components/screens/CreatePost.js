import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: '#c62828 red darken-3' });
          } else {
            M.toast({
              html: 'Post Created Successfully!',
              classes: '#43a047 green darken-1',
            });
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postImage = () => {
    //uploading an file from computer
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'chatWow');
    data.append('cloud_name', 'jackent2b');
    fetch('https://api.cloudinary.com/v1_1/jackent2b/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.secure_url))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='card auth-card'>
        <h2 style={{ fontFamily: 'Galada' }}>Create Post</h2>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='text'
          placeholder='Content'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className='file-field input-field'>
          <div className='btn'>
            <span>Add Images</span>
            <input
              type='file'
              multiple
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className='file-path-wrapper'>
            <input
              className='file-path validate'
              type='text'
              placeholder='Upload one or more files'
            />
          </div>
        </div>
        <button
          className='waves-effect waves-light btn'
          onClick={() => postImage()}
        >
          Post
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
