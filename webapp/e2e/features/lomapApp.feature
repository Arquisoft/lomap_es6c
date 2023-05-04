Feature: Casos de uso del usuario en la aplicación

Scenario: El usuario accede a la página de inicio
  Given Un acceso a la app por un usuario
  When Se encuentra en la página inicial
  Then El usuario visualiza el mensaje de bienvenida

Scenario: El usuario hace click en Solid
  Given Un acceso a la app por un usuario
  When Tras hacer click en el icono de Solid
  Then El usuario es redirigido a la página de Solid

Scenario: El usuario accede a la página de información
  Given Un acceso a la app por un usuario
  When Tras hacer click en el botón de información
  Then El usuario es redirigido a la página de información sobre nosotros

Scenario: El usuario accede a su perfil
  Given Un acceso a la app por un usuario
  When El usuario inicia sesión
  Then El usuario puede acceder a su perfil haciendo click en el botón del perfil

Scenario: El usuario accede a su mapa desde su perfil
  Given Un acceso al perfil de la app por un usuario (con la sesión iniciada)
  When Tras hacer click en el enlace al mapa
  Then El usuario es redirigido a la página principal con vista de su mapa

Scenario: El usuario busca a un amigo desde su perfil
  Given Un acceso al perfil de la app por un usuario (con la sesión iniciada)
  When Tras hacer click en el botón amigos
  Then El usuario es redirigido al buscador de amigos
  And Al buscar un amigo es redirigido a su perfil de Solid

Scenario: El usuario añade un comentario a su mapa
  Given Un acceso a la app por un usuario
  When El usuario inicia sesión y accede a su mapa
  Then El usuario selecciona una posición en el mapa
  And Añade el nuevo comentario

Scenario: El usuario accede a la página de documentación
  Given Un acceso a la app por un usuario
  When Tras hacer click en el botón de la documentación
  Then El usuario es redirigido a la página de documentación
