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

### B4 - Integridad de datos

### B5.12 - Consultas sobre atributos

### B8 - Preguntas finales
