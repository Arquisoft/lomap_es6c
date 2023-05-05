Feature: Inicio de sesión

Background:
  Given el usuario accede a la aplicación

Scenario: El usuario introduce incorrectamente sus credenciales
  When el usuario hace click sobre el botón Comenzar y es redirigido a la página de Inrupt
  Then el usuario introduce su usuario y contraseña incorrectamente
  And el usuario visualiza un mensaje de error

Scenario: El usuario introduce correctamente sus credenciales
  When el usuario hace click sobre el botón Comenzar y es redirigido a la página de Inrupt
  Then el usuario introduce su usuario y contraseña correctamente e inicia sesión
  And el usuario puede visualizar su perfil en la app
