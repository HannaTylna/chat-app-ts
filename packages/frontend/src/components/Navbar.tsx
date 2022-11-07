import React from 'react'
import { Button, Container, Navbar as NavbarBs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleOnClick } from './Logout'

type CurrentUserProp = {
  currentUser: string
}

export default function NavBar(props: CurrentUserProp) {
  const { currentUser } = props
  return (
    <NavbarBs>
      <Container>
        <NavbarBs.Brand href='#home'>welcome to kikis express chatroom</NavbarBs.Brand>
        <NavbarBs.Toggle />
        {currentUser ? (
          <>
            <NavbarBs.Collapse className='justify-content-end'>
              <NavbarBs.Text>
                Signed in as: <span>{currentUser}</span>
              </NavbarBs.Text>
            </NavbarBs.Collapse>

            <Button variant='outline-primary' className='mx-4' onClick={handleOnClick}>
              logout
            </Button>
          </>
        ) : (
          <Link to='/login'>login</Link>
        )}
      </Container>
    </NavbarBs>
  )
}
