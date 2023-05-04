import * as solid from '@inrupt/solid-client'
import { getMarkersUrl, getSessionWebID } from './Session';
import { readFromDataSetUrl } from './ReadFromPod';

// Crear una acl
export const createAclForMarkers = async () => {

  const {session, webId} = getSessionWebID()

  // Obtener la url del dataset de marcadores
  const datasetUrl = getMarkersUrl(webId)

  console.log(datasetUrl);
  try {
    let file: any = await solid.getFile(datasetUrl, { fetch: session.fetch })

    let acl = solid.createAcl(file)

    const updatedAcl = solid.setAgentResourceAccess(acl, webId, { read: true, append: true, write: true, control: true })

    await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch })

  } catch (error) {
    console.log(error)
  }

}

// Crear un acl con permisos de owner para cada uno de los marcadores del dataset
export const createAclForMarker = async (markerUrl: string) => {
  const {session, webId} = getSessionWebID()

  try {
    let file: any = await solid.getFile(markerUrl, { fetch: session.fetch })

    let acl = solid.createAcl(file)

    const updatedAcl = solid.setAgentResourceAccess(acl, webId, { read: true, append: true, write: true, control: true })

    await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch })

  } catch (error) {
    console.log(error)
  }
}

// Eliminar el acl del dataset de markers
export const deleteAclForDataset = async (datasetUrl : string) => {
  
    const {session} = getSessionWebID()
  
    try {
      await solid.deleteFile(
        datasetUrl + "/.acl",  // File to delete
        { fetch: session.fetch }
      );
      console.log("Eliminado el file: " + datasetUrl + "/.acl")
    } catch (error) {
      console.log(error)
    }
  
}

// Eliminar el acl del marker
export const deleteAclForMarker = async (datasetUrl : string) => {
  
  const {session} = getSessionWebID()

  try {
    await solid.deleteFile(
      datasetUrl + ".acl",  // File to delete
      { fetch: session.fetch }
    );
    console.log("Eliminado el file: " + datasetUrl + ".acl")
  } catch (error) {
    console.log(error)
  }

}

// Darle permisos de escritura y lectura a un amigo
export const addFriendPermissionsToMarker = async (friendWebId: string, marker: any) => {
  
  const {session, webId} = getSessionWebID()
  const markerUrl = webId.replace(/\/profile\/card#me/, '/public/markers/' + marker.title);

  console.log("vamos a darle permisos de escritura y lectura a un amigo")
  console.log(friendWebId);
  console.log(markerUrl);
  try {
      let datasetWithAcl: any = await solid.getSolidDatasetWithAcl(markerUrl, { fetch: session.fetch })
  
      let acl = solid.getResourceAcl(datasetWithAcl)
  
      const updatedAcl = solid.setAgentResourceAccess(acl, friendWebId, { read: true, append: false, write: true, control: false })
  
      await solid.saveAclFor(datasetWithAcl, updatedAcl, { fetch: session.fetch })

      console.log("Permisos de escritura y lectura dados a un amigo")

    } catch (error) {
      createAclForMarker(markerUrl)
    }
  
  }

// Quitar los permisos de lectura y escritura a un amigo
export const removeFriendPermissionsToMarkers = async (friendWebId: string, marker : any) => {
    
  const {session, webId} = getSessionWebID()
  const markerUrl = webId.replace(/\/profile\/card#me/, '/public/markers/' + marker.title);

    try {
      let datasetWithAcl: any = await solid.getSolidDatasetWithAcl(markerUrl, { fetch: session.fetch })
  
      let acl = solid.getResourceAcl(datasetWithAcl)
  
      const updatedAcl = solid.setAgentResourceAccess(acl, friendWebId, { read: false, append: false, write: false, control: false })
  
      await solid.saveAclFor(datasetWithAcl, updatedAcl, { fetch: session.fetch })

      console.log("Permisos de escritura y lectura quitarle a un amigo")

    } catch (error) {
      console.log(error)
    }
    
}

export const removeFriendPermissionsForAllMarkers = async (friendWebId: string) => {
  const markers = await readFromDataSetUrl(getSessionWebID().webId)

  if (markers !== undefined) {
    markers.forEach(async (marker) => {
      await removeFriendPermissionsToMarkers(friendWebId, marker)
    })
  }
}

export const addFriendPermissionsForAllMarkers = async (friendWebId: string) => {
  const markers = await readFromDataSetUrl(getSessionWebID().webId)

  if (markers !== undefined) {
    for (const marker of markers) {
      await addFriendPermissionsToMarker(friendWebId, marker)
    }
  }
}