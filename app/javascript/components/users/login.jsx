// Works, but Devise's devise_token_auth is bugged and useless on back-end
// - Putting this on the back burner for the time being
import React, { useState } from 'react';
import { useAuth } from '../../components/auth_context.jsx';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, updateToken } = useAuth();

  const handleLogin = async () => {
    const url = "users/sign_in";

    // const body = {
    //   user: {
    //     email: email,
    //     // description: description.replace(/\n/g, "<br> <br>")
    //     password: password
    //   }
    // };

    const body = {
        email: email,
        // description: description.replace(/\n/g, "<br> <br>")
        password: password
    };

    try {
      const response = await axios.post(url, body);

      const authToken = response.data.authentication_token;

      // Update the token using the context
      updateToken(authToken);
    console.log("authToken")
    console.log("T:")
    console.log(authToken)
    console.log("data")
    console.log(response.data)
      // back to home
      //window.location.replace('/')

      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // const handleApiRequest = async () => {
  //   try {
  //     // Make an API request using the stored token
  //     const response = await axios.get('/api/data', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // Handle the API response
  //     console.log('API response:', response.data);
  //   } catch (error) {
  //     console.error('API request failed', error);
  //   }
  // };

  return (
    <div>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;