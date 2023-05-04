import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

export const getSessionWebID = () => {
    // Obtener la sesion actual y su webId
    const session = getDefaultSession();
    const info = session.info;
    const { webId }  = info;
  
    // Comprobar que la sesion es válida
    if (!webId) {
      throw new Error("No se ha iniciado sesión")
    }
  
    return {session, webId}
}

export const getMarkersUrl = (webId : string) => {
  return webId.replace(/\/profile\/card#me/, '/public/markers');
}