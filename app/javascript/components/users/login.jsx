// import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from "prop-types";

// class UserLogin extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         The name of this component is: UserLogin
//       </React.Fragment>
//     );
//   }
// }



// export default UserLogin;





import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const UserLogin = () => (
  <Form>
    <Form.Field>
      <label>Email</label>
      <input placeholder='' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default UserLogin