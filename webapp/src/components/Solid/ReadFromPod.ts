import {
    getFile,
    getThing,
    getSolidDataset,
    getStringNoLocale,
    getThingAll,
    getUrlAll
  } from "@inrupt/solid-client";
import * as solid from '@inrupt/solid-client'
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { getMarkersUrl, getSessionWebID } from "./Session";


function isData(element : any, index : number, array: any) { 
  return (element != "No data"); 
}

export async function readFromFriendDataSet(friendUrl : string) {

  // Obtener la sesion actual y su webId
  const { session } = getSessionWebID();

  // Obtener la url del dataset de marcadores
  const datasetUrl = friendUrl.substring(0, friendUrl.length + 1 - "profile/card#me".length) + "/public/markers/"

  // Obtenemos la url de cada marcador
  const myDataset = await getSolidDataset(
      datasetUrl,
      { fetch: session.fetch }          // fetch from authenticated session
    );
    // Obtener los datos de cada marcador
  const markers =  getThingAll(myDataset).map( async (thing) => {
    const thingDataset = await getSolidDataset(
        thing.url,
        { fetch: session.fetch }          // fetch from authenticated session
      );
      // Devolvemos un JSON con los datos o un string con el mensaje de 'No data'
        const data = getThingAll(thingDataset).map((thing) => {
            const thingData = getStringNoLocale(thing, SCHEMA_INRUPT.description)
            return thingData ? JSON.parse(thingData) : "No data";
        }).filter(isData)

    return data
  })


    // Crear una nueva lista
    let newMarkers = new Array()

    for(let i = 0; i < markers.length; i++){
      markers[i].then((array: any) => {
        array.forEach((object: any) => {
          newMarkers.push(object)
        });
      });
    }
    
    return newMarkers;
  }

  //Devuevle los amigos de usuario registrado
export async function getAllFriendsFromPod() { 

// Obtener la sesion actual y su webId
const { webId } = getSessionWebID();

const profile = getThing(await getSolidDataset( webId.split("#")[0]), webId)
if (profile !== null) {
  let friendsURL = getUrlAll(profile, FOAF.knows);

  friendsURL.shift() // We have to extract the first one because it is the user

  return friendsURL;
} else {
  return null
}

}

export async function readFromDataSet() {

  // Obtener la sesion actual y su webId
  const { session, webId } = getSessionWebID();

  // Obtener la url del dataset de marcadores
  const datasetUrl = webId.replace("profile/card#me", "") + "public/markers/"

  // Obtenemos la url de cada marcador
  const myDataset = await getSolidDataset(
      datasetUrl,
      { fetch: session.fetch }          // fetch from authenticated session
    );
    // Obtener los datos de cada marcador
  const markers = getThingAll(myDataset).map( async (thing) => {
    const thingDataset = await getSolidDataset(
        thing.url,
        { fetch: session.fetch }          // fetch from authenticated session
      );

      // Devolvemos un JSON con los datos o un string con el mensaje de 'No data'
      const data = getThingAll(thingDataset).map((thing) => {
        const thingData = getStringNoLocale(thing, SCHEMA_INRUPT.description)
        return thingData ? JSON.parse(thingData) : "No data";
    }).filter(isData)
        

    return data;
  })


    // Crear una nueva lista
    let newMarkers = new Array()

    for(let i = 0; i < markers.length; i++){
      markers[i].then((array: any) => {
        array.forEach((object: any) => {
          newMarkers.push(object)
        });
      });
    }
    return newMarkers
  }

export async function getFriendsFromPod() {
  // Obtener la sesion actual y su webId
  const { session, webId } = getSessionWebID();

  const fileURL = webId.replace("#me", "")

  try {
    // file is a Blob (see https://developer.mozilla.org/docs/Web/API/Blob)
    const file = await getFile(
      fileURL,               // File in Pod to Read
      { fetch: session.fetch }       // fetch from authenticated session
    );

    const reader = new FileReader();

    // Wrap the event listener in a Promise
    const contentPromise = new Promise<string>((resolve) => {
      reader.addEventListener("loadend", (e) => {
        const content : any = parseContent(e.target?.result);
        resolve(content);
      });
    });

    // Start reading the blob as text.
    reader.readAsText(file);

    // Wait for the Promise to resolve before returning the content.
  const content = await contentPromise;

  return content;
    
  } catch (err) {
    console.error(err);
  }
}

function parseContent(content: any){
  const lines = content.split("\n")
  let prefixes = new Array()
  lines.forEach((e : string) => {
    if (e.includes("@prefix c"))
    prefixes.push(e)
  })

  let friends = new Array()
  prefixes.forEach((e : string) => {
    let url = e.split(": ")[1]
    url = url.replace("<", "")
    url = url.replace(">", "")
    url = url.substring(0, url.length - 1)
    friends.push(url)
  })

  friends.shift()

  return friends
}

// Get my markers
export async function getMyMarkers() {
  const {session, webId} = getSessionWebID()

  const markersDatasetUrl = getMarkersUrl(webId);

  try {

    const myDataset = await solid.getSolidDataset(markersDatasetUrl, { fetch: session.fetch });
    
    const markersDirectory = solid.getThingAll(myDataset);
    if (markersDirectory != null) {
      let markers = new Array()

      markersDirectory.forEach((marker) => {
        markers.push(marker.url)
      })

      markers.shift()

      return markers
    } else {
      throw new Error("No markers found")
    }
  } catch (error) {
    console.log(error)
  }
}