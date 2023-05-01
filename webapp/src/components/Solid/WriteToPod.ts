import { SCHEMA_INRUPT, RDF } from "@inrupt/vocab-common-rdf";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import {
    createSolidDataset,
    createThing,
    buildThing,
    setThing,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
import { Marker } from "../../components/Map/OSMap";
import { getSessionWebID } from "./Session";

// podUrl must be correct for the moment
export async function writeDataToNewDataSet(podUrl: string, thingName: string, thingTitle: string, rdfType: string) {

  const { session } = getSessionWebID();

    // Crear un dataset vacío
    let courseSolidDataset = createSolidDataset();
  
    // Create a new Thing type Person
    const newThing = buildThing(createThing({ name: thingName }))
      .addStringNoLocale(SCHEMA_INRUPT.name, thingTitle)
      .addUrl(RDF.type, rdfType)
      .build();
  
    courseSolidDataset = setThing(courseSolidDataset, newThing);
  
    const savedSolidDataset = await saveSolidDatasetAt(
        podUrl,
        courseSolidDataset,
        { fetch: session.fetch } // fetch from authenticated Session
    );
  }

export async function writeMarkerToDataSet(podUrl: string, marker: Marker, rdfType: string) {

  const { session } = getSessionWebID();

  // Crear un dataset vacío
  let courseSolidDataset = createSolidDataset();

  // Create a new Thing type Person
  const newThing = buildThing(createThing({ name: marker.title }))
    .addStringNoLocale(SCHEMA_INRUPT.name, marker.title)
    .addStringNoLocale(SCHEMA_INRUPT.latitude, marker.lat.toString())
    .addStringNoLocale(SCHEMA_INRUPT.longitude, marker.lng.toString())
    .addStringNoLocale(SCHEMA_INRUPT.text, marker.comment)
    .addStringNoLocale(SCHEMA_INRUPT.model, marker.type) // TODO: es el tipo de marker, camiarlo a un atributo apropiado
    .addStringNoLocale(SCHEMA_INRUPT.description, JSON.stringify(marker))
    .addUrl(RDF.type, rdfType)
    
  if (marker.score <= 10 && marker.score >= 0) {
    newThing.addStringNoLocale(SCHEMA_INRUPT.value, marker.score.toString())
  }

  const thingToAdd = newThing.build()

  courseSolidDataset = setThing(courseSolidDataset, thingToAdd);

  const savedSolidDataset = await saveSolidDatasetAt(
      podUrl,
      courseSolidDataset,
      { fetch: session.fetch } // fetch from authenticated Session
  );
} 