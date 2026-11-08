/*
 * PRÁCTICA MONGODB - RASTRO
 * Parte B: ejercicios B1, B2 y B3
 * Ejecutar una sola vez en la base rastro vacía; no repetir las inserciones.
 */

// ==================================================
// Ejercicio B1 - CARGAR LOS DATOS INICIALES
// ==================================================

// B1.1 - Insertar los 5 usuarios

db.usuarios.insertMany([
  {
    _id: ObjectId("660000000000000000000001"),
    nombre: "Ana García",
    email: "ana@rastro.es",
    ciudad: "Valencia",
    fechaAlta: new Date("2025-03-10"),
    favoritos: [ObjectId("670000000000000000000008")],
    valoracionMedia: 0,
    numValoraciones: 0,
  },
  {
    _id: ObjectId("660000000000000000000002"),
    nombre: "Luis Martín",
    email: "luis@rastro.es",
    ciudad: "Valencia",
    fechaAlta: new Date("2024-11-02"),
    favoritos: [],
    valoracionMedia: 0,
    numValoraciones: 0,
  },
  {
    _id: ObjectId("660000000000000000000003"),
    nombre: "Marta Ruiz",
    email: "marta@rastro.es",
    ciudad: "Alicante",
    fechaAlta: new Date("2025-06-21"),
    favoritos: [],
    valoracionMedia: 5,
    numValoraciones: 1,
  },
  {
    _id: ObjectId("660000000000000000000004"),
    nombre: "Hugo Sanz",
    email: "hugo@rastro.es",
    ciudad: "Castellón",
    fechaAlta: new Date("2026-01-15"),
    favoritos: [],
    valoracionMedia: 0,
    numValoraciones: 0,
  },
  {
    _id: ObjectId("660000000000000000000005"),
    nombre: "Sara López",
    email: "sara@rastro.es",
    ciudad: "Valencia",
    fechaAlta: new Date("2026-09-30"),
    favoritos: [
      ObjectId("670000000000000000000001"),
      ObjectId("670000000000000000000003"),
      ObjectId("670000000000000000000008"),
    ],
    valoracionMedia: 0,
    numValoraciones: 0,
  },
]);

// B1.2 - Insertar los 8 anuncios

db.anuncios.insertMany([
  {
    _id: ObjectId("670000000000000000000001"),
    titulo: "Seat Ibiza 2015",
    descripcion: "Siempre en garaje, ITV pasada.",
    precio: 6500,
    categoria: "Coches",
    estado: "DISPONIBLE",
    ciudad: "Valencia",
    fechaPublicacion: new Date("2026-10-01"),
    visitas: 340,
    vendedor: {
      id: ObjectId("660000000000000000000002"),
      nombre: "Luis Martín",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a1-1.jpg",
        orden: 1,
      },
      {
        url: "https://img.rastro.es/a1-2.jpg",
        orden: 2,
      },
    ],
    atributos: {
      marca: "Seat",
      modelo: "Ibiza",
      anio: 2015,
      km: 98000,
      combustible: "gasolina",
    },
  },
  {
    _id: ObjectId("670000000000000000000002"),
    titulo: "Ford Focus 2012",
    descripcion: "Correa cambiada hace un año.",
    precio: 4200,
    categoria: "Coches",
    estado: "DISPONIBLE",
    ciudad: "Castellón",
    fechaPublicacion: new Date("2026-10-12"),
    visitas: 95,
    vendedor: {
      id: ObjectId("660000000000000000000004"),
      nombre: "Hugo Sanz",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a2-1.jpg",
        orden: 1,
      },
    ],
    atributos: {
      marca: "Ford",
      modelo: "Focus",
      anio: 2012,
      km: 165000,
      combustible: "diésel",
    },
  },
  {
    _id: ObjectId("670000000000000000000003"),
    titulo: "iPhone 13 128 GB",
    descripcion: "Con funda y cargador.",
    precio: 380,
    categoria: "Móviles",
    estado: "DISPONIBLE",
    ciudad: "Valencia",
    fechaPublicacion: new Date("2026-10-20"),
    visitas: 512,
    vendedor: {
      id: ObjectId("660000000000000000000001"),
      nombre: "Ana García",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a3-1.jpg",
        orden: 1,
      },
      {
        url: "https://img.rastro.es/a3-2.jpg",
        orden: 2,
      },
      {
        url: "https://img.rastro.es/a3-3.jpg",
        orden: 3,
      },
    ],
    atributos: {
      marca: "Apple",
      modelo: "iPhone 13",
      almacenamientoGB: 128,
      bateriaPct: 87,
    },
  },
  {
    _id: ObjectId("670000000000000000000004"),
    titulo: "Samsung Galaxy A52",
    descripcion: "Pantalla sin rayas.",
    precio: 150,
    categoria: "Móviles",
    estado: "VENDIDO",
    ciudad: "Alicante",
    fechaPublicacion: new Date("2026-09-05"),
    visitas: 210,
    vendedor: {
      id: ObjectId("660000000000000000000003"),
      nombre: "Marta Ruiz",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a4-1.jpg",
        orden: 1,
      },
    ],
    atributos: {
      marca: "Samsung",
      modelo: "Galaxy A52",
      almacenamientoGB: 128,
      bateriaPct: 80,
    },
  },
  {
    _id: ObjectId("670000000000000000000005"),
    titulo: "Xiaomi Redmi Note 10",
    descripcion: "Funciona perfecto.",
    precio: 90,
    categoria: "Móviles",
    estado: "DISPONIBLE",
    ciudad: "Valencia",
    fechaPublicacion: new Date("2026-10-22"),
    visitas: 48,
    vendedor: {
      id: ObjectId("660000000000000000000002"),
      nombre: "Luis Martín",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a5-1.jpg",
        orden: 1,
      },
    ],
    atributos: {
      marca: "Xiaomi",
      modelo: "Redmi Note 10",
      almacenamientoGB: 64,
      bateriaPct: 91,
    },
  },
  {
    _id: ObjectId("670000000000000000000006"),
    titulo: "Chaqueta vaquera Levi's",
    descripcion: "Poco uso.",
    precio: 25,
    categoria: "Ropa",
    estado: "DISPONIBLE",
    ciudad: "Alicante",
    fechaPublicacion: new Date("2026-10-25"),
    visitas: 12,
    vendedor: {
      id: ObjectId("660000000000000000000003"),
      nombre: "Marta Ruiz",
    },
    fotos: [],
    atributos: {
      talla: "M",
      marca: "Levi's",
      genero: "unisex",
    },
  },
  {
    _id: ObjectId("670000000000000000000007"),
    titulo: "Zapatillas Nike Air",
    descripcion: "Talla 42, como nuevas.",
    precio: 40,
    categoria: "Ropa",
    estado: "RESERVADO",
    ciudad: "Valencia",
    fechaPublicacion: new Date("2026-10-18"),
    visitas: 77,
    vendedor: {
      id: ObjectId("660000000000000000000001"),
      nombre: "Ana García",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a7-1.jpg",
        orden: 1,
      },
    ],
    atributos: {
      talla: "42",
      marca: "Nike",
      genero: "hombre",
    },
  },
  {
    _id: ObjectId("670000000000000000000008"),
    titulo: "Mesa de comedor de roble",
    descripcion: "Para 6 personas.",
    precio: 120,
    categoria: "Muebles",
    estado: "DISPONIBLE",
    ciudad: "Castellón",
    fechaPublicacion: new Date("2026-10-26"),
    visitas: 160,
    vendedor: {
      id: ObjectId("660000000000000000000004"),
      nombre: "Hugo Sanz",
    },
    fotos: [
      {
        url: "https://img.rastro.es/a8-1.jpg",
        orden: 1,
      },
    ],
    atributos: {
      material: "roble",
      ancho: 160,
      fondo: 90,
      alto: 75,
    },
  },
]);

// B1.3 - Insertar las 5 ofertas

db.ofertas.insertMany([
  {
    _id: ObjectId("680000000000000000000001"),
    importe: 340,
    estado: "PENDIENTE",
    fecha: new Date("2026-10-27"),
    anuncio: {
      id: ObjectId("670000000000000000000003"),
      titulo: "iPhone 13 128 GB",
      precio: 380,
    },
    comprador: {
      id: ObjectId("660000000000000000000005"),
      nombre: "Sara López",
    },
  },
  {
    _id: ObjectId("680000000000000000000002"),
    importe: 6000,
    estado: "RECHAZADA",
    fecha: new Date("2026-10-05"),
    anuncio: {
      id: ObjectId("670000000000000000000001"),
      titulo: "Seat Ibiza 2015",
      precio: 6500,
    },
    comprador: {
      id: ObjectId("660000000000000000000001"),
      nombre: "Ana García",
    },
  },
  {
    _id: ObjectId("680000000000000000000003"),
    importe: 6200,
    estado: "PENDIENTE",
    fecha: new Date("2026-10-26"),
    anuncio: {
      id: ObjectId("670000000000000000000001"),
      titulo: "Seat Ibiza 2015",
      precio: 6500,
    },
    comprador: {
      id: ObjectId("660000000000000000000005"),
      nombre: "Sara López",
    },
  },
  {
    _id: ObjectId("680000000000000000000004"),
    importe: 150,
    estado: "ACEPTADA",
    fecha: new Date("2026-09-10"),
    anuncio: {
      id: ObjectId("670000000000000000000004"),
      titulo: "Samsung Galaxy A52",
      precio: 150,
    },
    comprador: {
      id: ObjectId("660000000000000000000004"),
      nombre: "Hugo Sanz",
    },
  },
  {
    _id: ObjectId("680000000000000000000005"),
    importe: 35,
    estado: "ACEPTADA",
    fecha: new Date("2026-10-27"),
    anuncio: {
      id: ObjectId("670000000000000000000007"),
      titulo: "Zapatillas Nike Air",
      precio: 40,
    },
    comprador: {
      id: ObjectId("660000000000000000000002"),
      nombre: "Luis Martín",
    },
  },
]);

// B1.4 - Insertar una valoracion

db.valoraciones.insertOne({
  anuncioId: ObjectId("670000000000000000000004"),
  autor: {
    id: ObjectId("660000000000000000000004"),
    nombre: "Hugo Sanz",
  },
  valoradoId: ObjectId("660000000000000000000003"),
  estrellas: 5,
  comentario: "Todo perfecto",
  fecha: new Date("2026-09-15"),
});

// B1.5 - Comprobar los documentos insertados

print("Usuarios:", db.usuarios.countDocuments({}));
print("Anuncios:", db.anuncios.countDocuments({}));
print("Ofertas:", db.ofertas.countDocuments({}));
print("Valoraciones:", db.valoraciones.countDocuments({}));

// ==================================================
// Ejercicio B2 - INSERTAR DOS ANUNCIOS NUEVOS
// ==================================================

// B2.1 - Bicicleta de montaña Orbea

db.anuncios.insertOne({
  titulo: "Bicicleta de montaña Orbea",
  descripcion: "Revisada en taller.",
  precio: 300,
  categoria: "Deporte",
  estado: "DISPONIBLE",
  ciudad: "Castellón",
  fechaPublicacion: new Date("2026-10-27"),
  visitas: 0,
  vendedor: {
    id: ObjectId("660000000000000000000004"),
    nombre: "Hugo Sanz",
  },
  fotos: [
    {
      url: "https://img.rastro.es/bici-1.jpg",
      orden: 1,
    },
  ],
  atributos: {
    talla: "L",
    tipoBici: "montaña",
    pulgadasRueda: 29,
  },
});

// B2.2 - Google Pixel 7

db.anuncios.insertOne({
  titulo: "Google Pixel 7",
  descripcion: "Libre, con caja.",
  precio: 260,
  categoria: "Móviles",
  estado: "DISPONIBLE",
  ciudad: "Valencia",
  fechaPublicacion: new Date("2026-10-28"),
  visitas: 0,
  vendedor: {
    id: ObjectId("660000000000000000000005"),
    nombre: "Sara López",
  },
  fotos: [
    {
      url: "https://img.rastro.es/pixel-1.jpg",
      orden: 1,
    },
    {
      url: "https://img.rastro.es/pixel-2.jpg",
      orden: 2,
    },
  ],
  atributos: {
    marca: "Google",
    modelo: "Pixel 7",
    almacenamientoGB: 128,
    bateriaPct: 92,
  },
});

// Comprobar que ahora tenemos 10 anuncios

print("Total anuncios:", db.anuncios.countDocuments({}));

// ==================================================
// Ejercicio B3 - INDICES
// ==================================================

// B3.1 - Crear indice unico para el email

db.usuarios.createIndex({ email: 1 }, { unique: true });

// B3.2 - Evitar que un usuario valore dos veces
// el mismo anuncio

db.valoraciones.createIndex(
  {
    "autor.id": 1,
    anuncioId: 1,
  },
  {
    unique: true,
  },
);

// B3.3 - Indice de categoria y precio

db.anuncios.createIndex({
  categoria: 1,
  precio: 1,
});

// B3.4 - Mostrar los indices creados

print("Indices de usuarios:");
printjson(db.usuarios.getIndexes());

print("Indices de valoraciones:");
printjson(db.valoraciones.getIndexes());

print("Indices de anuncios:");
printjson(db.anuncios.getIndexes());

// B3.5 - Comprobar el uso del indice con explain

print("Plan de ejecucion:");

printjson(
  db.anuncios
    .find({ categoria: "Coches" })
    .sort({ precio: 1 })
    .explain("executionStats"),
);

// Ejercicio B4 - COMPROBAR QUÉ PROTEGE LA BASE DE DATOS
// Ejecutar esta sección después de B3. Los errores de B4.1, B4.2 y B4.5
// son el resultado esperado; se capturan para poder seguir con la práctica.

// B4.1 - El índice único de email rechaza el duplicado.
try {
  db.usuarios.insertOne({ nombre: "Ana Copia", email: "ana@rastro.es", ciudad: "Valencia", fechaAlta: new Date(), favoritos: [], valoracionMedia: 0, numValoraciones: 0 });
} catch (error) {
  print("B4.1:", error.message);
}

// B4.2 - El índice compuesto rechaza una segunda valoración de la misma compra.
try {
  db.valoraciones.insertOne({ anuncioId: ObjectId("670000000000000000000004"), autor: { id: ObjectId("660000000000000000000004"), nombre: "Hugo Sanz" }, valoradoId: ObjectId("660000000000000000000003"), estrellas: 1, comentario: "Cambio de opinión", fecha: new Date() });
} catch (error) {
  print("B4.2:", error.message);
}

// B4.3 - MongoDB no comprueba si el vendedor referenciado existe.
db.anuncios.insertOne({ titulo: "Prueba fantasma", precio: 10, categoria: "Libros", estado: "DISPONIBLE", ciudad: "Valencia", fechaPublicacion: new Date(), visitas: 0, vendedor: { id: ObjectId("660000000000000000000099"), nombre: "Nadie" }, fotos: [], atributos: {} });

// B4.4 - Sin validador, también se acepta un precio de tipo texto.
db.anuncios.insertOne({ titulo: "Prueba lámpara", precio: "75", categoria: "Muebles", estado: "DISPONIBLE", ciudad: "Valencia", fechaPublicacion: new Date(), visitas: 0, vendedor: { id: ObjectId("660000000000000000000001"), nombre: "Ana García" }, fotos: [], atributos: { material: "metal" } });
printjson(db.anuncios.find({ precio: { $lt: 100 } }, { titulo: 1, precio: 1, _id: 0 }).toArray());

// B4.5 - updateOne exige un operador de actualización.
try {
  db.anuncios.updateOne({ _id: ObjectId("670000000000000000000005") }, { precio: 80 });
} catch (error) {
  print("B4.5:", error.message);
}

// B4.6 - Un string no coincide con un ObjectId, aunque tenga los mismos caracteres.
printjson(db.anuncios.findOne({ _id: "670000000000000000000003" }));

// Retirar solo los dos documentos de prueba creados en esta sección.
db.anuncios.deleteMany({ titulo: { $in: ["Prueba fantasma", "Prueba lámpara"] } });

// Ejercicio B5 - CONSULTAS
printjson(db.anuncios.find({ estado: "DISPONIBLE", ciudad: "Valencia" }, { _id: 0, titulo: 1, precio: 1 }).sort({ precio: 1 }).toArray()); // B5.1
printjson(db.anuncios.find({ categoria: "Coches", "atributos.km": { $lt: 100000 } }).toArray()); // B5.2
printjson(db.anuncios.find({ categoria: "Móviles", "atributos.almacenamientoGB": { $gte: 128 } }).toArray()); // B5.3
printjson(db.anuncios.find({ precio: { $gte: 50, $lte: 400 } }).toArray()); // B5.4
printjson(db.anuncios.find({ titulo: /nike/i }).toArray()); // B5.5
printjson(db.anuncios.find({ "vendedor.id": ObjectId("660000000000000000000002") }).toArray()); // B5.6
printjson(db.anuncios.find({ fotos: { $size: 0 } }).toArray()); // B5.7
printjson(db.ofertas.find({ estado: "PENDIENTE", "anuncio.id": ObjectId("670000000000000000000001") }).toArray()); // B5.8
printjson(db.usuarios.find({ favoritos: ObjectId("670000000000000000000008") }, { _id: 0, nombre: 1 }).toArray()); // B5.9
print("B5.10 - Anuncios vendidos:", db.anuncios.countDocuments({ estado: "VENDIDO" }));
printjson(db.anuncios.find({}, { _id: 0, titulo: 1, visitas: 1 }).sort({ visitas: -1 }).limit(3).toArray()); // B5.11

// Ejercicio B6 - AGREGACIONES
printjson(db.anuncios.aggregate([{ $group: { _id: "$categoria", total: { $sum: 1 } } }, { $sort: { total: -1, _id: 1 } }]).toArray()); // B6.1
printjson(db.anuncios.aggregate([{ $group: { _id: "$categoria", precioMedio: { $avg: "$precio" } } }, { $sort: { _id: 1 } }]).toArray()); // B6.2
printjson(db.anuncios.aggregate([{ $group: { _id: "$ciudad", total: { $sum: 1 } } }, { $sort: { total: -1, _id: 1 } }]).toArray()); // B6.3
print("B6.4 - Valor en venta por vendedor:");
printjson(db.anuncios.aggregate([{ $match: { estado: "DISPONIBLE" } }, { $group: { _id: "$vendedor.nombre", valorEnVenta: { $sum: "$precio" } } }, { $sort: { valorEnVenta: -1, _id: 1 } }]).toArray());
printjson(db.anuncios.aggregate([{ $group: { _id: "$categoria", visitasTotales: { $sum: "$visitas" } } }, { $sort: { visitasTotales: -1, _id: 1 } }, { $limit: 1 }]).toArray()); // B6.5

// Ejercicio B7 - MODIFICACIONES
// Cada lectura anterior al update muestra el documento que coincide con su filtro.

// B7.1 - La foto pertenece al anuncio, por eso se añade a su array.
printjson(db.anuncios.findOne({ _id: ObjectId("670000000000000000000003") }, { fotos: 1 }));
db.anuncios.updateOne({ _id: ObjectId("670000000000000000000003") }, { $push: { fotos: { url: "https://img.rastro.es/a3-4.jpg", orden: 4 } } });

// B7.2 - $inc evita leer y reescribir manualmente el contador.
printjson(db.anuncios.findOne({ _id: ObjectId("670000000000000000000005") }, { visitas: 1 }));
db.anuncios.updateOne({ _id: ObjectId("670000000000000000000005") }, { $inc: { visitas: 1 } });

// B7.3 - $pull retira el iPhone; $addToSet impide duplicar el Ford.
printjson(db.usuarios.findOne({ _id: ObjectId("660000000000000000000005") }, { favoritos: 1 }));
db.usuarios.updateOne({ _id: ObjectId("660000000000000000000005") }, { $pull: { favoritos: ObjectId("670000000000000000000003") }, $addToSet: { favoritos: ObjectId("670000000000000000000002") } });
db.usuarios.updateOne({ _id: ObjectId("660000000000000000000005") }, { $addToSet: { favoritos: ObjectId("670000000000000000000002") } });
printjson(db.usuarios.findOne({ _id: ObjectId("660000000000000000000005") }, { favoritos: 1 }));

// B7.4 - Son dos escrituras en documentos distintos; podrían requerir una transacción.
printjson(db.ofertas.findOne({ _id: ObjectId("680000000000000000000003") }, { estado: 1 }));
printjson(db.anuncios.findOne({ _id: ObjectId("670000000000000000000001") }, { estado: 1 }));
db.ofertas.updateOne({ _id: ObjectId("680000000000000000000003") }, { $set: { estado: "ACEPTADA" } });
db.anuncios.updateOne({ _id: ObjectId("670000000000000000000001") }, { $set: { estado: "RESERVADO" } });

// B7.5 - El filtro limita la rebaja a los coches.
printjson(db.anuncios.find({ categoria: "Coches" }, { titulo: 1, precio: 1 }).toArray());
db.anuncios.updateMany({ categoria: "Coches" }, { $mul: { precio: 0.9 } });
printjson(db.anuncios.find({ categoria: "Coches" }, { titulo: 1, precio: 1 }).toArray());

// B7.6 - El nombre copiado se sincroniza por id en las tres colecciones.
printjson(db.usuarios.findOne({ _id: ObjectId("660000000000000000000002") }, { nombre: 1 }));
db.usuarios.updateOne({ _id: ObjectId("660000000000000000000002") }, { $set: { nombre: "Luis M. Martín" } });
printjson(db.anuncios.find({ "vendedor.id": ObjectId("660000000000000000000002") }, { "vendedor.nombre": 1 }).toArray());
db.anuncios.updateMany({ "vendedor.id": ObjectId("660000000000000000000002") }, { $set: { "vendedor.nombre": "Luis M. Martín" } });
printjson(db.ofertas.find({ "comprador.id": ObjectId("660000000000000000000002") }, { "comprador.nombre": 1 }).toArray());
db.ofertas.updateMany({ "comprador.id": ObjectId("660000000000000000000002") }, { $set: { "comprador.nombre": "Luis M. Martín" } });
printjson(db.valoraciones.find({ "autor.id": ObjectId("660000000000000000000002") }, { "autor.nombre": 1 }).toArray());
db.valoraciones.updateMany({ "autor.id": ObjectId("660000000000000000000002") }, { $set: { "autor.nombre": "Luis M. Martín" } });
