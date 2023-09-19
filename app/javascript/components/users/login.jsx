
// import React from 'react'
// import { Button, Checkbox, Form } from 'semantic-ui-react'

// const UserLogin = () => (
//   <Form>
//     <Form.Field>
//       <label>Email</label>
//       <input placeholder='' />
//     </Form.Field>
//     <Form.Field>
//       <Checkbox label='I agree to the Terms and Conditions' />
//     </Form.Field>
//     <Button type='submit'>Submit</Button>
//   </Form>
// )

// export default UserLogin

import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     email: props.post.email,
    //     password: props.post.password
    // };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return str
      // return String(str)
      //     .replace(/</g, "&lt;")
      //     .replace(/>/g, "&gt;");
  }

  onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "users/sign_in";
    console.log("onSubmit")
    console.log(this.state)
    console.log(this.state['user[email]'])
    // {user[email]: 'benrdana@gmail.com', user[password]: 'password'}
    // const { user[email], password } = this.state;
    if (this.state['user[password]'].length === 0 || this.state['user[email]'].length === 0)
        return;

    const body = {
      user: {
        email: this.state['user[email]'],
        // description: description.replace(/\n/g, "<br> <br>")
        password: this.state['user[password]']
      }
    };

    

    // const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
        method: "POST",
        headers: {
            // "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            
            // const navigate = useNavigate();

            // navigate("/");
          // this.props.history.push('/');
          // const history = useHistory();
          // history.push('/');

          // return <Redirect to='/'  />
          // window.RedirectTimeout('/')
          window.location.replace('/')
            // return response.json();
        } else {
          console.log(response)
          throw new Error("Network response was not ok.");
        }
    })
    // .then(response => this.props.history.push(`/new_task/${response.id}`))
    .catch(error => console.log(error.message));
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
                User Login
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  name="user[email]"
                  // value={this.state.email}
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <label htmlFor="description">Password</label>
              <input
                type="password"
                className="form-control"
                name="user[password]"
                // value={this.state.password}
                rows="5"
                required
                onChange={this.onChange}
              />
              <button type="submit" value="Save" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default UserLogin;