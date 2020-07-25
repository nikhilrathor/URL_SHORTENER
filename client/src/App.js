import React, { Component } from 'react';

import AppNavbar from './components/AppNavbar';
import UrlList from './components/UrlList';
import ShrinkUrl from './components/ShrinkUrl';
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        {
          this.props.isAuthenticated ?
            <Container>
              <ShrinkUrl />
              <UrlList />
            </Container>
            : <Alert color="primary">
              Register or Log in, To Continue Creating Your Short Urls
          </Alert>}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loadUser })(App);
