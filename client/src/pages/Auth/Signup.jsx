// eslint-disable-next-line
import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  FormControl,
  TextField,
} from "@mui/material"
import axios from "axios"
// import CloseIcon from "@mui/icons-material/Close";
// import GoogleIcon from "@mui/icons-material/Google";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import { Link } from "react-router-dom"
import BgStars from "../../components/background/BgStars"
import Navbar from "../../components/Navbar";
import "./Signup.css"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

// const Input = styled('input')({
//   // display: 'none',
// });

export default function Login() {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const [about, setAbout] = useState("")
  const [file, setFile] = useState(null)
  const [social, setSocial] = useState({ Instagram: "", Github: "", Linkedin: "" })

  // useEffect(() => {
  //   async function runAxios() {
  //     await axios({
  //       method: 'post',
  //       url: `127.0.0.1:5000/api/login`,
  //       headers: {email: mail, password: pass},
  //       withCredentials: true
  //     }).then((props) => {
  //         console.log(props)
  //     })
  //   }
  //   runAxios()
  // }, [])

  var formData = new FormData()
  formData.append("name", name)
  formData.append("roll", mail) //append the values with key, value pair
  formData.append("password", pass)
  formData.append("description", about)
  formData.append("social_media", social)
  // formData.append('image',file)

  async function handleSubmit() {
    formData.append("image", file)

    if (name === "" || mail === "" || pass === "" || about === "" || file === null) {
      alert("Please fill all fields")
    }
    else {
      await axios({
        method: "post",
        url: "http://127.0.0.1:5000/api/register",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
        .then((props) => {
          console.log(props)
          // localStorage.setItem('userid', props.data.id)
          // window.location= "/"
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        })
      // axios calls and other checks

      await axios.get("http://127.0.0.1:5000/api/checklogin").then((props) => {
        console.log(props)
      })
    }
  }

  return (
    <>
     <Navbar/>
      <BgStars />
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            minHeight: "90vh",
            padding: "10vh 40px",
          }}
        >
          <Card
            sx={{
              minWidth: 270,
              maxWidth: 800,
              textAlign: "center",
              padding: "20px 5vh",
            }}
          >
            <CardContent>
              <Typography variant="h4" color="text.primary" gutterBottom>
                Signup
              </Typography>
              <Divider className="divider" sx={{ mb: 2 }} />
              <Typography variant="body2">New user? Register...</Typography>

              <FormControl variant="standard" margin="dense" fullWidth="true">
                <TextField
                  id="Name"
                  label="Name"
                  helperText="Enter your name"
                  variant="standard"
                  margin="dense"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  id="Id"
                  label="Institute ID"
                  helperText="Your institute ID"
                  variant="standard"
                  margin="dense"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
                <TextField
                  id="Password"
                  label="New Password"
                  type="password"
                  helperText="Give a coded password"
                  variant="standard"
                  margin="dense"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <TextField
                  id="standard-textarea"
                  label="About"
                  placeholder="Something about you in atmost 3 lines"
                  multiline
                  value={about}
                  margin="dense"
                  variant="standard"
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl variant="standard" margin="dense" fullWidth="true">
                <TextField
                  id="Insta"
                  label="Instagram"
                  type="link"
                  helperText="Your Instagram profile link"
                  variant="standard"
                  value={social.insta}
                  margin="dense"
                  onChange={(e) =>
                    setSocial({ ...social, Instagram: e.target.value })
                  }
                />
                <TextField
                  id="Github"
                  label="Github"
                  helperText="Your github profile link"
                  variant="standard"
                  margin="dense"
                  value={social.github}
                  onChange={(e) =>
                    setSocial({ ...social, Github: e.target.value })
                  }
                />
                <TextField
                  id="Linkedin"
                  label="Linkedin"
                  margin="dense"
                  helperText="Your linkedin profile link"
                  variant="standard"
                  value={social.linkedin}
                  onChange={(e) =>
                    setSocial({ ...social, Linkedin: e.target.value })
                  }
                />
                <label
                htmlFor="imageinput"
                style={{ marginTop: "15px" }}
                className="custom-file-upload"
              >
                <input
                  id="imageinput"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button variant="text" component="span">
                  <Typography variant="body2" color="text.secondary">
                    Click to upload image
                  </Typography>
                </Button>
              </label>
              </FormControl>
              
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleSubmit}
                size="large"
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // startIcon={<GoogleIcon />}
              >
                Signup
              </Button>
            </CardActions>
            <div sx={{ padding: "0px" }}>
              <Link to="/login">
                <Button size="small" variant="text">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </ThemeProvider>
    </>
  )
}
