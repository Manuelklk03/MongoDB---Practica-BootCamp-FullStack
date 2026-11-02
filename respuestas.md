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

### A4 - Valoraciones

### A5 - Favoritos

### A6 - Embeber o referenciar

## Parte B - Explicaciones

### B2.3 - Nuevas categorías

### B4 - Integridad de datos

### B5.12 - Consultas sobre atributos

### B8 - Preguntas finales
```
