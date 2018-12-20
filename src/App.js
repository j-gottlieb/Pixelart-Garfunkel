import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
import { SketchPicker } from 'react-color'

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
      currentColor: '#f0f0f5',
      user: null,
      flashMessage: '',
      flashType: null,
      canvas: '',
      drawActive: false
    }
  }

  componentDidMount () {
    const canvas = []
    for (let i = 0; i <= 1979; i++) {
      canvas.push(this.state.currentColor)
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

  handleDrawing (position) {
    if (this.state.drawActive) {
      const shallowCanvas = this.state.canvas
      shallowCanvas[position] = this.state.currentColor
      this.setState({
        canvas: shallowCanvas
      })
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ currentColor: color.hex })
  }

  handleClick () {
    const toggle = !this.state.drawActive
    this.setState({ drawActive: toggle })
  }

  render () {
    const { flashMessage, flashType, user } = this.state
    const canvas = []
    for (let i = 0; i <= 2969; i++) {
      canvas.push(
        <Pixel
          key={i}
          position={i}
          handleDrawing={(i) => this.handleDrawing(i)}
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
          <div className='artRoom'>
            <div className='colorPicker'>
              <SketchPicker
                color={ this.state.currentColor }
                onChangeComplete={ this.handleChangeComplete }/>
            </div>
            <div className='instructions'>
              <h4>Instructions:</h4>
              <ul>
                <li>Select color</li>
                <li>Click inside the canvas to start drawing.</li>
                <li>Click again to stop drawing.</li>
              </ul>
            </div>
            <div className='canvas' onClick={() => this.handleClick()}>
              {canvas}
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App
