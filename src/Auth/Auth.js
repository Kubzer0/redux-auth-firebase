import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'


import Forms from './Forms'

import {
  initAuthChangeListeningAction,
  onLogOutAsyncAction,
  onLogInByGoogleClickAsyncAction,
  logInAsyncAction,
  emailChangeAction,
  passwordChangeAction
} from '../state/auth'

import { connect } from 'react-redux'

class Auth extends React.Component {

  componentDidMount() {
    this.props._initAuthChangeListeningAction()
  }


  onLogInClick = () => {
    this.props._logInAsyncAction(this.state.email, this.state.password)
  }


  render() {
    return (
      this.props._isUserLoggedIn ?
        <div>
          <FloatingActionButton
            style={{
              position: 'fixed',
              top: 10,
              right: 10,
              zIndex: 9999,
              color: 'white'
            }}
            secondary={true}
            onClick={this.props._onLogOutAsyncAction}
          >
            X
          </FloatingActionButton>
          {this.props.children}
        </div>
        :
        <Forms
          email={this.props._email}
          onEmailChangeHandler={this.props._emailChangeAction}
          password={this.props._password}
          onPasswordChangeHandler={this.props._passwordChangeAction}
          onLogInClick={this.onLogInClick}
          onLogInByGoogleClick={this.props._onLogInByGoogleClickAsyncAction}
        />
    )
  }
}

const mapStateToProps = state => ({
  _isUserLoggedIn: state.auth.isUserLoggedIn,
  _email: state.auth.email,
  _password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
  _initAuthChangeListeningAction: () => dispatch(initAuthChangeListeningAction()),
  _onLogOutAsyncAction: () => dispatch(onLogOutAsyncAction()),
  _onLogInByGoogleClickAsyncAction: () => dispatch(onLogInByGoogleClickAsyncAction()),
  _logInAsyncAction: (email, password) => dispatch(logInAsyncAction(email, password)),
  _emailChangeAction: (event)=> dispatch(emailChangeAction(event.target.value)),
  _passwordChangeAction: (event) => dispatch(passwordChangeAction(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)