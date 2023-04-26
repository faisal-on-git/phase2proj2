import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./Navbar.css"
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { Link } from 'react-router-dom'



export class Navbar extends Component {


    handlelogout = () => {
        this.props.logout()
        this.props.history.push('/')
    }
  render() {
    return (
        <div className='navbar-container'>
        
        <Link to='/'   className='navbar-home-text'>Home</Link>
        <div className='current-user-profile'>
            
            <div className='current-username'>
            {this.props?.user}
            
            </div>
            
            {this.props?.user && <div className='logout-button' onClick={this.handlelogout}>Logout</div>}
            </div>

        </div>
    )
  }
}

const NavbarWithRouter = withRouter(Navbar)

const matchStateToProps = (state) => ({
    user: state.authReducer.user
})

const matchDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(matchStateToProps, matchDispatchToProps)(NavbarWithRouter)