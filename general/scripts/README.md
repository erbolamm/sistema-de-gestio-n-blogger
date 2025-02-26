# Scripts y Utilidades

Esta carpeta contiene scripts y herramientas para facilitar la gestión de blogs en Blogger.

## Propósito

Los scripts incluidos aquí están diseñados para automatizar tareas comunes y mejorar la productividad en la gestión de blogs, incluyendo:

- Optimización de imágenes
- Validación de contenido
- Análisis de SEO
- Respaldo de contenido
- Generación de informes

## Requisitos

Para utilizar estos scripts, necesitarás:

- Python 3.x
- Bibliotecas requeridas (instalables vía pip):
  * requests
  * beautifulsoup4
  * colorama
  * Pillow

## Instalación

1. Asegúrate de tener Python 3.x instalado
2. Instala las dependencias:

```bash
pip install -r requirements.txt
```

## Scripts Disponibles

### Optimización de Imágenes

`optimizar_imagenes.py` - Comprime y optimiza imágenes para web

```bash
python optimizar_imagenes.py --directorio /ruta/a/imagenes --calidad 80
```

### Validación de Contenido

`validar_contenido.py` - Verifica problemas comunes en el contenido

```bash
python validar_contenido.py --archivo /ruta/al/contenido.md
```

### Análisis SEO

`analizar_seo.py` - Evalúa el contenido para optimización SEO

```bash
python analizar_seo.py --archivo /ruta/al/contenido.md --palabras-clave "palabra1,palabra2"
```

## Personalización

Puedes modificar estos scripts según tus necesidades específicas. Cada script incluye comentarios detallados para facilitar su comprensión y adaptación.

## Contribuciones

Si creas scripts útiles, considera añadirlos a esta carpeta para beneficio de todo el proyecto.

---

**Nota**: Estos scripts son herramientas complementarias y no reemplazan la plataforma Blogger. Úsalos como ayuda para tu flujo de trabajo.