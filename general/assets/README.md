# Recursos para Blogger

Este directorio contiene recursos estáticos para mejorar y personalizar blogs en Blogger. Estos archivos están diseñados para ser fácilmente implementables en cualquier blog de la plataforma Blogger.

## Estructura del Directorio

```
assets/
├── README.md (Este archivo)
├── css/ (Estilos personalizados)
│   └── blogger-custom.css (Estilos CSS principales)
├── js/ (Scripts personalizados)
│   └── blogger-utils.js (Utilidades JavaScript)
└── img/ (Imágenes comunes)
    ├── icons/ (Iconos para la interfaz)
    └── placeholders/ (Imágenes de marcador de posición)
```

## Recursos CSS

### blogger-custom.css

Este archivo contiene estilos CSS personalizados diseñados específicamente para Blogger. Incluye:

- Diseño responsive para adaptarse a todos los dispositivos
- Estilos mejorados para elementos de blog (entradas, comentarios, etc.)
- Clases de utilidad para formatear contenido
- Correcciones para problemas comunes en temas de Blogger
- Mejoras de accesibilidad
- Optimizaciones para dispositivos móviles

#### Cómo implementar el CSS

1. Accede al panel de administración de Blogger
2. Ve a Tema > Editar HTML
3. Busca la etiqueta `</head>` en el código
4. Justo antes de esa etiqueta, añade:

```html
<style>
/* Pega aquí el contenido de blogger-custom.css */
</style>
```

Alternativamente, puedes alojar el archivo en un CDN y enlazarlo:

```html
<link rel="stylesheet" href="URL-DEL-ARCHIVO-CSS">
```

## Recursos JavaScript

### blogger-utils.js

Este archivo contiene funciones JavaScript útiles para mejorar la funcionalidad de blogs en Blogger:

- Generación automática de tabla de contenidos
- Lightbox para imágenes
- Manejo de enlaces externos (añade atributos rel y target)
- Botón "Volver arriba"
- Carga perezosa (lazy loading) de imágenes
- Cálculo de tiempo de lectura
- Funciones para comentarios anidados
- Botones de compartir en redes sociales

#### Cómo implementar el JavaScript

1. Accede al panel de administración de Blogger
2. Ve a Tema > Editar HTML
3. Busca la etiqueta `</body>` en el código
4. Justo antes de esa etiqueta, añade:

```html
<script>
// Pega aquí el contenido de blogger-utils.js
</script>
```

Alternativamente, puedes alojar el archivo en un CDN y enlazarlo:

```html
<script src="URL-DEL-ARCHIVO-JS" defer></script>
```

## Personalización

Estos recursos están diseñados para ser modulares. Puedes:

- Utilizar solo las partes que necesites
- Modificar los colores y estilos para que coincidan con tu tema
- Añadir o eliminar funcionalidades según tus necesidades

## Compatibilidad

Los recursos han sido probados y son compatibles con:

- Todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móviles y de escritorio
- Diferentes temas de Blogger

## Solución de problemas

Si encuentras conflictos con tu tema actual:

1. Verifica que no haya duplicación de funcionalidades
2. Comprueba las clases CSS para evitar conflictos
3. Asegúrate de que jQuery esté cargado si utilizas funciones que lo requieran

## Recursos adicionales

- [Documentación oficial de Blogger](https://support.google.com/blogger)
- [Guía de personalización de Blogger](https://support.google.com/blogger/answer/176245)
- [Foro de ayuda de Blogger](https://support.google.com/blogger/community)

---

*Última actualización: 26 de febrero de 2025*