import React, { useState } from 'react'
import { LoginButton } from '@inrupt/solid-ui-react'
import {
  Button,
  Container,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

function LoginForm() {
  const [idp, setIdp] = useState('https://inrupt.net')

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            alignItems: 'center',
            flexDirection: 'column',
            display: 'inline-flex',
          }}
        >

          <h2>LOGIN</h2>
          <LoginButton
            oidcIssuer={idp}
            redirectUrl={'http://localhost:3000'}>
            <Button variant="contained" type="submit" sx={{ mt: 4 }}>
              Sign In
            </Button>
          </LoginButton>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default LoginForm;