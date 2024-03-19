import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./mainpage.css"

const Mainpage = () => {
  const navigate = useNavigate();
  const [userImages, setUserImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch user's images when the component mounts
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(!user){
      navigate("/")
    }
    fetchUserImages();
  }, []);

  const fetchUserImages = async () => {
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo.token);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get('/api/v1/myimages', config);
      setUserImages(response.data.userImages);
      console.log(response.data.userImages);
    } catch (error) {
      console.error('Error fetching user images:', error);
    }
  };

  const postDetails = (pics) => {
    setUploading(true);
    if (pics === undefined) {

      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatFlix");
      data.append("cloud_name", "sarthakproject");
      fetch("https://api.cloudinary.com/v1_1/sarthakproject/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setUploading(false);

        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    } else {

      setUploading(false);
      return;
    }
  };

  const submitHandler = async () => {

    if (!pic) {
      console.log("please upload an image");
      return;

    }

    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo.token);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/upload",
        {
          name,
          imageURL: pic
        },
        config
      );
      console.log(data);

      fetchUserImages();
    } catch (error) {
      console.log(error);

    }

  };


  return (
    <div className='mainpage' >
      <h1>Your Images</h1>
      <div className='images' >
        {/* Conditionally render user's images or a message if no images are found */}
        {userImages?.length > 0 ? (
          userImages.map(image => (
            <div key={image._id}>
              <img src={image.imageURL} alt={image.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <p>{image.name}</p>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
      <div className='inputform' >
        {/* Button to upload new image */}

        <input required id='imagename' placeholder='Enter image name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input required id='profilepicture' type="file" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
        <button type="button" onClick={submitHandler} >Submit</button>
      </div>
    </div>
  )
}

export default Mainpage