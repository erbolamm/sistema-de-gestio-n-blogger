/**
 * Utilidades JavaScript para Blogger
 * 
 * Este archivo contiene funciones útiles para mejorar la funcionalidad
 * y experiencia de usuario en blogs de Blogger.
 * 
 * Versión: 1.0.0
 * Autor: Sistema de Gestión Blogger
 * Licencia: MIT
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    generateTableOfContents();
    setupLightbox();
    handleExternalLinks();
    setupScrollToTop();
    setupLazyLoading();
    calculateReadingTime();
});

/**
 * Genera una tabla de contenidos basada en los encabezados del artículo
 */
function generateTableOfContents() {
    const article = document.querySelector('.post-body');
    const tocContainer = document.getElementById('toc-container');
    
    if (!article || !tocContainer) return;
    
    // Obtener todos los encabezados h2 y h3
    const headings = article.querySelectorAll('h2, h3');
    
    if (headings.length < 3) {
        tocContainer.style.display = 'none';
        return;
    }
    
    // Crear la estructura de la tabla de contenidos
    const tocTitle = document.createElement('h4');
    tocTitle.textContent = 'Tabla de Contenidos';
    tocContainer.appendChild(tocTitle);
    
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    // Añadir cada encabezado a la tabla de contenidos
    headings.forEach((heading, index) => {
        // Asignar un ID al encabezado si no tiene uno
        if (!heading.id) {
            heading.id = 'toc-heading-' + index;
        }
        
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-subitem' : 'toc-item';
        
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    tocContainer.appendChild(tocList);
    
    // Añadir botón para colapsar/expandir
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toc-toggle';
    toggleButton.textContent = 'Ocultar';
    toggleButton.addEventListener('click', function() {
        const isVisible = tocList.style.display !== 'none';
        tocList.style.display = isVisible ? 'none' : 'block';
        this.textContent = isVisible ? 'Mostrar' : 'Ocultar';
    });
    
    tocContainer.insertBefore(toggleButton, tocList);
}

/**
 * Configura un lightbox simple para las imágenes del artículo
 */
function setupLightbox() {
    // Crear elementos del lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.display = 'none';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Obtener todas las imágenes del artículo
    const images = document.querySelectorAll('.post-body img');
    
    // Añadir evento click a cada imagen
    images.forEach(img => {
        // No aplicar a imágenes pequeñas o iconos
        if (img.width < 100 || img.height < 100) return;
        
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar lightbox al hacer click en el botón o fuera de la imagen
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Maneja los enlaces externos añadiendo atributos de seguridad y un icono
 */
function handleExternalLinks() {
    const links = document.querySelectorAll('a');
    const currentDomain = window.location.hostname;
    
    links.forEach(link => {
        // Verificar si es un enlace externo
        if (link.hostname && link.hostname !== currentDomain && !link.classList.contains('internal-link')) {
            // Añadir atributos de seguridad
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
            
            // Añadir icono de enlace externo si no tiene ya uno
            if (!link.querySelector('.external-link-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-link-icon';
                icon.innerHTML = ' <svg width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M6 1H3C1.89543 1 1 1.89543 1 3V9C1 10.1046 1.89543 11 3 11H9C10.1046 11 11 10.1046 11 9V6M9 1H11M11 1V3M11 1L6 6"/></svg>';
                link.appendChild(icon);
            }
        }
    });
}

/**
 * Añade un botón para volver al inicio de la página
 */
function setupScrollToTop() {
    // Crear el botón
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '&uarr;';
    scrollBtn.title = 'Volver arriba';
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar el botón según la posición de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Evento click para volver arriba
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Implementa carga perezosa (lazy loading) para imágenes
 */
function setupLazyLoading() {
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Si hay una versión de alta resolución
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        function lazyLoad() {
            const scrollTop = window.pageYOffset;
            
            lazyImages.forEach(function(img) {
                if (img.offsetTop < window.innerHeight + scrollTop) {
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                }
            });
            
            // Si todas las imágenes están cargadas, quitar el evento
            if (lazyImages.length === 0) { 
                document.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationChange', lazyLoad);
            }
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
}

/**
 * Calcula y muestra el tiempo estimado de lectura
 */
function calculateReadingTime() {
    const article = document.querySelector('.post-body');
    const readingTimeContainer = document.getElementById('reading-time');
    
    if (!article || !readingTimeContainer) return;
    
    // Obtener el texto del artículo
    const text = article.textContent;
    
    // Calcular palabras (promedio de 200 palabras por minuto)
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Mostrar el tiempo de lectura
    readingTimeContainer.textContent = `Tiempo de lectura: ${readingTime} min`;
}

/**
 * Función para añadir comentarios anidados
 * Debe ser llamada manualmente cuando se necesite
 */
function setupNestedComments() {
    const commentButtons = document.querySelectorAll('.comment-reply');
    
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.dataset.commentId;
            const commentForm = document.getElementById('comment-form');
            
            // Mover el formulario bajo el comentario seleccionado
            const commentContainer = document.getElementById('comment-' + commentId);
            commentContainer.appendChild(commentForm);
            
            // Añadir campo oculto para identificar el comentario padre
            let parentInput = document.getElementById('comment-parent-id');
            if (!parentInput) {
                parentInput = document.createElement('input');
                parentInput.type = 'hidden';
                parentInput.id = 'comment-parent-id';
                parentInput.name = 'parentId';
                commentForm.appendChild(parentInput);
            }
            
            parentInput.value = commentId;
            
            // Añadir botón para cancelar respuesta
            let cancelButton = document.getElementById('cancel-reply');
            if (!cancelButton) {
                cancelButton = document.createElement('button');
                cancelButton.id = 'cancel-reply';
                cancelButton.className = 'cancel-reply-button';
                cancelButton.textContent = 'Cancelar respuesta';
                commentForm.insertBefore(cancelButton, commentForm.firstChild);
                
                cancelButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    resetCommentForm();
                });
            } else {
                cancelButton.style.display = 'block';
            }
            
            // Scroll al formulario
            commentForm.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    function resetCommentForm() {
        const commentForm = document.getElementById('comment-form');
        const commentsSection = document.getElementById('comments');
        
        // Devolver el formulario a su posición original
        commentsSection.appendChild(commentForm);
        
        // Resetear el campo de parentId
        const parentInput = document.getElementById('comment-parent-id');
        if (parentInput) {
            parentInput.value = '';
        }
        
        // Ocultar botón de cancelar
        const cancelButton = document.getElementById('cancel-reply');
        if (cancelButton) {
            cancelButton.style.display = 'none';
        }
    }
}

/**
 * Función para compartir en redes sociales
 * Debe ser llamada manualmente cuando se necesite
 */
function setupSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const network = this.dataset.network;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl;
            
            switch(network) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'pinterest':
                    const img = document.querySelector('meta[property="og:image"]');
                    const imgUrl = img ? encodeURIComponent(img.content) : '';
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imgUrl}&description=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
                    break;
                case 'telegram':
                    shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}