import "./Login.scss";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Login = () => {

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [userInfor, setUserInfor] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfor({
      ...userInfor,
      [name]: value,
    });
  };

  const fetchData = async (inf) => {
    try {
      const res = await axios.post("http://localhost:1337/api/userwebs", {
        data: inf,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        setSubmitSuccess(true);
        console.log("Login successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [footImg, setFootImg] = useState(null);
  const [leftImg, setLeftImg] = useState(null);
  const [rightImg, setRightImg] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);

  const fetchImg = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/images?populate=*');
      const data = await response.json();
      console.log(data.data);
      data.data.map((img) => {
        console.log(img.attributes.Type_of_image);
        console.log(img.attributes.image.data[0].attributes.url);
        const typeOfImage = img.attributes.Type_of_image;
        const imageUrl = img.attributes.image.data[0].attributes.url;
        switch (typeOfImage) {
          case "image1":
            setImg1(imageUrl);
            break;
          case "image2":
            setImg2(imageUrl);
            break;
          case "image3":
            setImg3(imageUrl);
            break;
          case "footer_image":
            setFootImg(imageUrl);
            break;
          case "left_image":
            setLeftImg(imageUrl);
            break;
          case "right_image":
            setRightImg(imageUrl);
            break;
          case "background":
            setBackgroundImg(imageUrl);
            break;
          default:
            console.log("Unknown image type:", typeOfImage);
        }

      })


    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {

    fetchImg()

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    setUserInfor({
      ...userInfor,
    });

    // Send data to database
    if (
      userInfor.username !== "" &&
      userInfor.username !== undefined &&
      userInfor.password !== "" &&
      userInfor.password !== undefined
    ) {
      const data = {
        username: userInfor.username,
        password: userInfor.password,
      };
      fetchData(data);
      console.log(data);
    }

    var error = document.getElementsByClassName("error");
    for (let i = 0; i < error.length; i++) {
      error[i].innerHTML = "";
    }

    // Handle error for username
    if ((userInfor.username === "") | (userInfor.username === undefined)) {
      let errorItem = document.getElementById("error_username");
      errorItem.innerHTML = "Username is required!";
      console.log(userInfor.username);
      setSubmitSuccess(false);
    }

    if (userInfor.username.length < 6 && userInfor.username.length > 0) {
      let errorItem = document.getElementById("error_username");
      errorItem.innerHTML = "Username must be at least 6 characters!";
      console.log("Username must be at least 6 characters!");
      setSubmitSuccess(false);
    }

    // Handle error for password
    if ((userInfor.password === "") | (userInfor.password === undefined)) {
      let errorItem = document.getElementById("error_password");
      errorItem.innerHTML = "Password is required!";
      console.log("Password is required!");
      setSubmitSuccess(false);
    }

    if (userInfor.password.length < 6 && userInfor.password.length > 0) {
      let errorItem = document.getElementById("error_password");
      errorItem.innerHTML = "Password must be at least 6 characters!";
      console.log("Password must be at least 6 characters!");
      setSubmitSuccess(false);
    }
  };


  console.log('check img1', img1);
  console.log('check img2', img2);
  console.log('check img3', img3);
  console.log('check img background', backgroundImg);
  console.log('check img left_img', leftImg);
  console.log('check img right_img', rightImg);
  console.log('check img foot_img', footImg);


  return (
    <div className="login-container">
      <div className="login-body"
        style={{ backgroundImage: `url(http://localhost:1337${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="left-image"
          style={{ backgroundImage: `url(http://localhost:1337${leftImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div className="login-form">
          <div
            className="image1"
            style={{ backgroundImage: `url(http://localhost:1337${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div
            className="image2"
            style={{ backgroundImage: `url(http://localhost:1337${img2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div
            className="image3"
            style={{ backgroundImage: `url(http://localhost:1337${img3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >

          </div>


          <div className="wrapper">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <h1>Login</h1>
              <div id="error_username" className="error"></div>
              <div className="input-box username">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <FaUserAlt className="icon" />
              </div>

              <div id="error_password" className="error"></div>
              <div className="input-box password">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-me">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn-login">
                <NavLink to="/loading" className="nav-link">
                  Login
                </NavLink>
              </button>
            </form>
          </div>
        </div>

        <div className="right-image"

          style={{ backgroundImage: `url(http://localhost:1337${rightImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
      </div>

      <div className="login-footer">
        <div className="f-infor">
          This is my company's formation. If you want to contact with us, please
          call 0964737054. We do this for you bro, lets use it. Have a good day!
        </div>

        <div className="f-image1"
          style={{ backgroundImage: `url(http://localhost:1337${footImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>

        <div className="f-contact">
          <div className="facebook">
            <p>Facebook</p>
            <div className="i-facebook">0</div>
          </div>

          <div className="f-text">Paramecia/Demacia</div>

          <div className="instagram">
            <p>Instagram</p>
            <div className="i-insta1">0</div>
            <div className="i-insta2">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;