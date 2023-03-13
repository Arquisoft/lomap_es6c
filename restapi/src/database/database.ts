import { MongoClient } from 'mongodb';
import { Marker } from '../api';

var db: any;
var client: any;

async function connectDatabase() {
  // Crear una instancia del cliente de MongoDB
  client = new MongoClient('mongodb://192.168.1.10:27017');

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
