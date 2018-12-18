import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Pixel from './Pixel.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      currentColor: 'red',
      user: null,
      flashMessage: '',
      flashType: null,
      canvas: ''
    }
  }

  componentDidMount () {
    const canvas = []
    for (let i = 0; i <= 1979; i++) {
      canvas.push('blue')
    }
    this.setState({
      canvas: canvas
    })
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  handleClick (position) {
    console.log(this.state)
    const shallowCanvas = this.state.canvas
    shallowCanvas[position] = this.state.currentColor
    this.setState({
      canvas: shallowCanvas
    })
  }

  render () {
    const { flashMessage, flashType, user } = this.state
    const canvas = []
    for (let i = 0; i <= 1979; i++) {
      canvas.push(
        <Pixel
          key={i}
          position={i}
          handleClick={(i) => this.handleClick(i)}
          color={this.state.canvas[i]}
        />)
    }
    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <div className='canvas'>
            {canvas}
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App
