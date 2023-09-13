
function HelloWorld2(props) {
  return (
    <React.Fragment>
      Greeting: {props.greeting}
    </React.Fragment>
  );
}

HelloWorld2.propTypes = {
  greeting: PropTypes.string
};


