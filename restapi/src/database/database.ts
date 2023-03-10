import { MongoClient } from 'mongodb';
import { Marker } from '../api';

var db: any;
var client: any;

async function connectDatabase() {
  // Crear una instancia del cliente de MongoDB
  client = new MongoClient('mongodb://mongodb:27017');

  try {
    // Conectar al servidor de MongoDB
    await client.connect();

    // Obtener una referencia a la base de datos
    db = client.db('mongodb');
  } catch (error) {
    // Error
    console.log("Error connecting to database: ");
    console.log(error);
  }
}

export async function storeMarker(marker: Marker){
  // Conectar a la base de datos
  await connectDatabase();

  // Obtener una referencia a la colección de marcadores
  const collection = db.collection('markers');

  // Insertar el marcador en la base de datos
  await collection.insertOne(marker);

  // Cerrar la conexión
  client.close();
}

export async function getMarker(id: number) {
  // Conectar a la base de datos
  await connectDatabase();

  // Obtener una referencia a la colección de marcadores
  const markers = db.collection('markers');

  // Eliminar el marcador de la base de datos
  const marker = await markers.findOne({_id: id});

  // Cerrar la conexión
  client.close();

  return marker;
}

export async function removeMarker(id: number){
  // Conectar a la base de datos
  await connectDatabase();

  // Obtener una referencia a la colección de marcadores
  const markers = db.collection('markers');

  // Filtrar por el id del marcador
  const filter = { id: id };

  // Eliminar el marcador de la base de datos
  await markers.deleteOne(filter);

  // Cerrar la conexión
  client.close();
}


export async function editMarker(id: number, newComment: string){
  // Conectar a la base de datos
  await connectDatabase();

  // Obtener una referencia a la colección de marcadores
  const markers = db.collection('markers');

  // Cambiar comentario
  const update = { $set: { comment: newComment} };

  // Eliminar el marcador de la base de datos
  await markers.updateOne({_id: id}, update);

  // Cerrar la conexión
  client.close();
}
