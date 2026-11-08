# Práctica MongoDB - Rastro

## Parte A - Diseño

### A1 - ¿Por qué MongoDB?

**1. ¿Qué columnas tendría la tabla anuncios?**

La tabla tendría las columnas generales: id, titulo, descripcion, precio, categoria, estado, ciudad, fechaPublicacion, visitas y vendedorId.

También necesitaríamos columnas para los atributos de cada categoría: marca, modelo, anio, km, combustible, almacenamientoGB, bateriaPct, talla, genero, material, ancho, fondo y alto.

En total tendríamos 23 columnas.

**2. ¿Cuántas columnas quedarían en NULL para la chaqueta?**

La chaqueta utiliza los atributos talla, marca y genero. Los otros 10 atributos específicos quedarían en NULL porque no tienen relación con ese producto.

**3. ¿Qué pasaría si añadimos la categoría Deporte?**

En SQL habría que modificar la tabla para añadir los atributos nuevos, como tipo de bicicleta y pulgadas de rueda. La columna talla ya existiría.

En MongoDB no tendríamos que modificar la colección, porque podemos añadir documentos con atributos diferentes.

**4. ¿Cuántos JOIN harían falta?**

Si tenemos una tabla para cada una de las cuatro categorías y queremos sacar todos los anuncios con sus datos específicos en una sola consulta, podríamos necesitar cuatro LEFT JOIN.

**5. Documentos del iPhone y de la mesa en MongoDB**

Documento del iPhone:

```javascript
{
  titulo: "iPhone 13 128 GB",
  categoria: "Móviles",
  precio: 380,
  atributos: {
    marca: "Apple",
    modelo: "iPhone 13",
    almacenamientoGB: 128,
    bateriaPct: 87
  }
}
```

Documento de la mesa:

```javascript
{
  titulo: "Mesa de comedor de roble",
  categoria: "Muebles",
  precio: 120,
  atributos: {
    material: "roble",
    ancho: 160,
    fondo: 90,
    alto: 75
  }
}
```

### A2 - Anuncio y vendedor

**1. ¿Por qué no embebemos el usuario completo dentro del anuncio? Da dos razones.**

Porque un mismo usuario puede tener varios anuncios y estaríamos repitiendo toda su información en cada uno.

Además, si el usuario cambiara algún dato, como su nombre o email, tendríamos que modificarlo en todos los anuncios donde aparezca.

**2. ¿Por qué copiamos el nombre del vendedor y no su email ni su ciudad?**

Porque en la ficha del anuncio necesitamos mostrar el nombre del vendedor, pero no hace falta tener todos sus datos.

El email es información personal que no necesitamos mostrar y la ciudad del anuncio ya se guarda por separado. Así evitamos duplicar información innecesaria.

**3. Si Luis cambia su nombre, ¿qué documentos hay que actualizar?**

Primero habría que actualizar el documento de Luis en la colección de usuarios.

Después tendríamos que actualizar sus anuncios y cualquier otro documento donde hayamos copiado su nombre, por ejemplo, las ofertas que haya realizado.

**4. En el gimnasio de SQL, ¿cómo se resolvía mostrar el nombre del monitor de cada clase? ¿Qué cambia aquí?**

En PostgreSQL utilizábamos una clave ajena para relacionar las clases con los monitores y después hacíamos un JOIN para obtener el nombre.

En MongoDB guardamos el ID del vendedor y una copia de su nombre dentro del anuncio. De esta manera podemos mostrarlo directamente sin tener que consultar otra colección.

### A3 - Ofertas

**1. ¿Embebemos las ofertas o creamos una colección?**

Crearía una colección independiente llamada `ofertas`, porque un anuncio puede recibir muchas ofertas y estas pueden crecer bastante. Además, los compradores necesitan consultar sus propias ofertas sin tener que buscar dentro de cada anuncio.

**2. Documento de oferta de Sara por el iPhone**

```javascript
{
  importe: 340,
  estado: "PENDIENTE",
  fecha: new Date("2026-10-27"),
  anuncio: {
    id: ObjectId("670000000000000000000003"),
    titulo: "iPhone 13 128 GB",
    precio: 380
  },
  comprador: {
    id: ObjectId("660000000000000000000005"),
    nombre: "Sara López"
  }
}
```

**3. ¿Qué datos copiaríamos del anuncio?**

Guardaría el título y el precio original del anuncio dentro de la oferta. Así el comprador podría ver esos datos directamente en su lista de ofertas.

**4. Si Ana baja el precio del iPhone, ¿cambiaría el de la oferta?**

No, porque el precio guardado corresponde al momento en el que se hizo la oferta. Es importante mantener ese valor para saber las condiciones originales.

### A4 - Valoraciones

**1. ¿Embeber o crear una colección independiente?**

Crearía una colección `valoraciones`, porque un usuario puede recibir muchas y no sabemos cuántas tendrá. Además, así podemos consultar las valoraciones por separado.

**2. Documento de valoración de Hugo a Marta**

```javascript
{
  anuncioId: ObjectId("670000000000000000000004"),
  autor: {
    id: ObjectId("660000000000000000000004"),
    nombre: "Hugo Sanz"
  },
  valoradoId: ObjectId("660000000000000000000003"),
  estrellas: 5,
  comentario: "Todo perfecto",
  fecha: new Date("2026-09-15")
}
```

**3. ¿Sobre qué campos crearíamos un índice único?**

Crearía un índice único compuesto por `autor.id` y `anuncioId`, para impedir que el mismo usuario valore dos veces el mismo anuncio.

**4. ¿Qué campos guardaríamos para mostrar la nota media?**

Guardaría `valoracionMedia` y `numValoraciones` dentro del documento del usuario. Así podemos mostrar su puntuación sin calcular todas las valoraciones cada vez.

### A5 - Favoritos

**1. ¿Cuántos favoritos puede tener cada usuario?**

Un usuario normal podría guardar unos cuantos anuncios o algunas decenas, pero un anuncio popular puede estar en los favoritos de miles de usuarios.

**2. ¿Qué opción descartaríamos?**

Descartaría guardar un array de usuarios dentro del anuncio, porque si es muy popular ese array podría crecer demasiado.

**3. ¿Qué opción facilita la pantalla Mis favoritos?**

Guardaría un array de IDs de anuncios dentro del usuario. Así podemos saber directamente qué anuncios tiene guardados cada persona.

**4. ¿Cómo contaríamos los usuarios que tienen un anuncio en favoritos?**

Podemos utilizar `countDocuments()` para contar los usuarios cuyo array de favoritos contiene el ID de ese anuncio.

Por ejemplo:

```javascript
db.usuarios.countDocuments({
  favoritos: ObjectId("670000000000000000000008"),
});
```

**5. ¿Qué operador utilizaríamos para evitar duplicados?**

Utilizaría `$addToSet`, porque añade el elemento al array solamente si todavía no existe.

### A6 - ¿Embeber o referenciar?

**1. Mensajes de chat entre comprador y vendedor**

Los guardaría en una colección independiente, porque una conversación puede tener muchos mensajes y crecer bastante.

**2. Dirección de envío de una compra**

La embebería dentro del documento de la compra, porque pertenece a esa operación y necesitamos conservar la dirección utilizada en ese momento.

**3. Etiquetas de un anuncio**

Las embebería dentro del anuncio en un array, porque son pocos datos y se consultan junto con él.

**4. Categorías con nombre, icono y atributos obligatorios**

Las guardaría en una colección independiente de categorías, porque varios anuncios utilizan la misma categoría y sus configuraciones pueden cambiar.

**5. Historial de cambios de precio**

Lo guardaría en una colección independiente si queremos conservar todos los cambios sin límite, ya que el historial puede seguir creciendo.

**6. Anuncios de un usuario dentro de su documento**

Los referenciaría. No guardaría todos los anuncios dentro del usuario porque puede publicar muchos y cada anuncio tiene su propia información.

**7. Furniro: líneas de un pedido**

Las embebería dentro del pedido, porque forman parte de él y necesitamos conservar los productos, cantidades y precios de esa compra.

**8. Furniro: reseñas de un producto**

Las guardaría en una colección independiente, porque un producto puede recibir muchas reseñas y necesitamos consultarlas por separado.

### Comparación con el modelo del apartado 9

Mi diseño coincide con el modelo propuesto en el ejercicio en las relaciones principales: las fotos se guardan dentro de los anuncios, las ofertas y valoraciones tienen colecciones independientes y los favoritos se guardan en un array dentro del usuario.

He elegido esta estructura porque permite consultar fácilmente los datos más utilizados sin que los documentos crezcan demasiado.

## Parte B - Explicaciones

### B2.3 - Nuevas categorías

No he tenido que modificar ninguna colección para añadir la categoría Deporte, porque MongoDB permite que cada documento tenga sus propios atributos.

En PostgreSQL, si los atributos estuvieran definidos como columnas, tendría que modificar la tabla para añadir los nuevos. En cambio, si utilizara un campo JSONB, no necesitaría cambiar la estructura.

### Comprobación de B1, B2 y B3 — 2 de noviembre de 2026

Ejecutado en `rastro`, dentro de `mongodb-practica` (MongoDB 8.0.34), sin reiniciar ni borrar la base de datos.

- **B1:** 5 usuarios, 8 anuncios, 5 ofertas y 1 valoración después de la carga inicial.
- **B2:** insertados la bicicleta Orbea y el Google Pixel 7; total de 10 anuncios.
- **B3:** índices `email_1` (único), `autor.id_1_anuncioId_1` (único) y `categoria_1_precio_1` creados y comprobados con `getIndexes()`.
- **Explain:** plan `FETCH → IXSCAN`, índice `categoria_1_precio_1`, 2 documentos devueltos y 2 claves y documentos examinados. Los coches salen ordenados: Ford Focus (4200) y Seat Ibiza (6500).
- Comprobados los conteos, los atributos y las fotos de los dos anuncios nuevos y las referencias de vendedores, compradores y anuncios de ofertas.

La carga se ha ejecutado una sola vez. No hay que volver a ejecutar las inserciones sobre estos datos.

El 8 de noviembre de 2026 ejecuté `rastro.js` completo con `mongosh` en un contenedor temporal aislado de MongoDB 8.0, partiendo de una base vacía. Las predicciones de B4 se escribieron antes de esta ejecución. B1 dejó 5 usuarios, 8 anuncios, 5 ofertas y 1 valoración; B2 elevó los anuncios a 10. B4–B7 terminaron sin errores inesperados. Esta ejecución es independiente de la comprobación anterior del 2 de noviembre.

### B4 - Integridad de datos

| Prueba | Predicción y motivo | Resultado observado y explicación |
|---|---|---|
| B4.1: email repetido | Fallará: `email_1` es único. | `E11000 duplicate key error collection: rastro.usuarios index: email_1`; lo impide el índice único de `usuarios.email`. |
| B4.2: segunda valoración de Hugo | Fallará: se repite la pareja `autor.id` + `anuncioId`. | `E11000 duplicate key error collection: rastro.valoraciones index: autor.id_1_anuncioId_1`; lo impide el índice único compuesto. |
| B4.3: vendedor inexistente | Se insertará: MongoDB no valida referencias entre colecciones. | Se insertó el anuncio huérfano y se eliminó al terminar B4. La aplicación debe comprobar que existe el vendedor. |
| B4.4: precio `"75"` | Se insertará: no hemos configurado un validador de esquema. | Se insertó; la consulta `{ precio: { $lt: 100 } }` no incluyó la lámpara porque el precio era texto. |
| B4.5: actualización sin `$set` | Fallará: el segundo argumento de `updateOne` necesita operadores. | `Update document requires atomic operators`; el precio del Xiaomi permaneció igual hasta B7. |
| B4.6: id como texto | La consulta no encontrará el iPhone. | Devolvió `null`: el `_id` guardado es un `ObjectId`, no un string. |

**B4.7.** En PostgreSQL, una clave ajena habría rechazado un `plan_id` inexistente. En Rastro, el servicio que crea el anuncio debe consultar `usuarios` y rechazar un vendedor ausente; MongoDB no aporta una clave ajena entre colecciones.

**B4.8.** El precio de la lámpara está guardado como texto. Las comparaciones de rango de MongoDB respetan el tipo BSON del valor consultado; el número `100` no convierte automáticamente `"75"` en número.

**B4.9.** Ambas operaciones muestran reglas de integridad que no hemos definido: existencia de referencias y tipo del precio. Podemos imponer el tipo con un validador de colección; la existencia del vendedor corresponde a la lógica de la aplicación.

Los dos anuncios de prueba se eliminan al terminar B4. Si una inserción falla, el `catch` imprime el mensaje para poder seguir con las demás pruebas.

### B5.12 - Consultas sobre atributos

Los anuncios sin `atributos.km` no coinciden con el filtro y no generan errores. Así, el iPhone simplemente no aparece entre los coches con menos de 100.000 km.

En B5.6 filtro por `vendedor.id`: el identificador no cambia cuando Luis modifica su nombre, mientras que una búsqueda por nombre dejaría de encontrar anuncios con una copia desactualizada.

### B6.4 - Valor en venta por vendedor

La agregación filtra primero `DISPONIBLE`, agrupa por `vendedor.nombre` y suma `precio`. Antes de B7 devolvió Luis Martín: 6590 €, Hugo Sanz: 4620 €, Ana García: 380 €, Sara López: 260 € y Marta Ruiz: 25 €. [Captura de la salida real de `mongosh`](capturas/b6-4.png). La imagen representa el texto obtenido en la ejecución; no se inventaron resultados.

### B7 - Modificaciones

**B7.3.** Verificado: `$pull` retiró el iPhone y dos llamadas a `$addToSet` dejaron una sola referencia al Ford Focus. Se usan instrucciones separadas porque ambos operadores modifican el mismo array.

**B7.4.** Se necesitan dos `updateOne`, uno en `ofertas` y otro en `anuncios`. Si el proceso se interrumpe entre ambas escrituras, la oferta puede quedar aceptada mientras el anuncio sigue disponible. En un flujo de compra real usaríamos una transacción con una sesión de MongoDB o una operación de compensación, según los requisitos.

En la ejecución se comprobaron la oferta `ACEPTADA` y el Seat `RESERVADO`. Tras la rebaja B7.5, el Seat costaba 5850 € y el Ford 3780 €.

**B7.6.** Tras cambiar solo `usuarios.nombre`, los anuncios siguen mostrando «Luis Martín» porque guardan una copia. Hay que sincronizar por id los nombres copiados en `anuncios.vendedor`, `ofertas.comprador` y `valoraciones.autor`; ahora mismo Luis no figura como autor de una valoración, pero la operación cubre ese caso.

La comprobación final confirmó el nuevo nombre en el usuario, sus dos anuncios y su oferta. También confirmó 5 usuarios, 10 anuncios, 5 ofertas, 1 valoración, cero anuncios de prueba, cuatro fotos del iPhone y 49 visitas del Xiaomi.

### B8 - Preguntas finales

1. MongoDB permite que cada categoría tenga atributos distintos sin cambiar las columnas y deja guardar fotos y datos de la ficha dentro del mismo anuncio.
2. Guardaría pagos, facturas y saldos en SQL, porque sus relaciones e invariantes de integridad necesitan controles estrictos y operaciones coherentes.
3. Cada anuncio tiene como máximo diez fotos y se leen junto a él; las ofertas pueden crecer sin límite y también se consultan desde el comprador.
4. La copia conserva el precio que tenía el anuncio cuando se hizo la oferta, aunque luego cambie el precio publicado.
5. Desnormalizar es copiar un dato en varios documentos para leerlo con menos consultas. El nombre del vendedor aparece directamente en la ficha, pero cambiarlo obliga a actualizar las copias.
6. La aplicación debe comprobar que el documento referenciado existe; MongoDB no impone claves ajenas entre colecciones. Los índices únicos y los validadores cubren reglas diferentes.
