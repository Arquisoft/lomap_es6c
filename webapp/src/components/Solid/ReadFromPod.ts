import {
    getThing,
    getSolidDataset,
    getStringNoLocale,
    getThingAll,
    getUrlAll
  } from "@inrupt/solid-client";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { getMarkersUrl, getSessionWebID } from "./Session";


function isData(element : any, index : number, array: any) { 
  return (element !== "No data"); 
}

export async function readFromDataSetUrl(webId: string) {

  const { session } = getSessionWebID();

  const datasetUrl = getMarkersUrl(webId);
  // Obtenemos la url de cada marcador
  const myDataset = await getSolidDataset(datasetUrl, { fetch: session.fetch });

  // Obtener los datos de cada marcador
  const markers = await Promise.all(
    getThingAll(myDataset).map(async (thing) => {
      const thingDataset = await getSolidDataset(thing.url, { fetch: session.fetch });
      // Devolvemos un JSON con los datos o un string con el mensaje de 'No data'
      const data = getThingAll(thingDataset)
        .map((thing) => {
          const thingData = getStringNoLocale(thing, SCHEMA_INRUPT.description);
          return thingData ? JSON.parse(thingData) : "No data";
        })
        .filter(isData);
      return data;
    })
  );

  // Crear una nueva lista
  const newMarkers: any[] = [];
  markers.forEach((array: any) => {
    array.forEach((object: any) => {
      newMarkers.push(object);
    });
  });

  return newMarkers;
}


export async function getAllFriendsFromPod() { 

  // Obtener la sesion actual y su webId
  const { webId } = getSessionWebID();
  
  const userId = webId.split("#")[0]

  const profile = getThing(await getSolidDataset(userId), webId)
  if (profile !== null) {
    let friendsAndUser = getUrlAll(profile, FOAF.knows);
    const filteredFriends = friendsAndUser.filter((e: string) => e !== webId);
    
    return filteredFriends;
  } else {
    return null
  }
  
  }