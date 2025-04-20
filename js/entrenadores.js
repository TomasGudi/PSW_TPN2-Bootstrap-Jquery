$(document).ready(function() {

  // --- Skill Bar Animation (ON PAGE LOAD) ---
  // Selecciona todas las barras de progreso dentro de las caras traseras de las tarjetas
  $('.flip-card-back .progress-bar').each(function() {
    const $bar = $(this); // La barra actual
    // Obtiene el valor objetivo del atributo aria-valuenow del elemento padre .progress
    const targetValue = $bar.closest('.progress').attr('aria-valuenow');

    // Verifica si el valor es válido y numérico
    if (targetValue && !isNaN(targetValue)) {
      const targetWidth = targetValue + '%'; // Construye el string de porcentaje

      // Anima la propiedad 'width' de la barra usando jQuery .animate()
      $bar.animate(
        { width: targetWidth },
        {
          duration: 1500, // Duración de la animación en milisegundos (ajustable)
          queue: false    // Evita que las animaciones se pongan en cola si hay muchas
          // easing: 'swing' // Efecto de animación (default: 'swing')
        }
      );
    } else {
      // Advierte en consola si el valor no se encuentra o no es válido
      console.warn("Valor aria-valuenow inválido o faltante al buscar en .progress para:", $bar[0]);
    }
  }); // Fin de .each() para barras de progreso

  // --- Star Rating Interaction ---

  // Función para actualizar las estrellas rellenas basado en el radio seleccionado
  function updateFilledStars(ratingContainer) {
    ratingContainer.find('label').removeClass('star-filled'); // Limpia todas primero
    const checkedRadioId = ratingContainer.find('input[type="radio"]:checked').attr('id');
    if (checkedRadioId) {
        // Añade la clase 'star-filled' a la label correspondiente y a todas las anteriores (debido a RTL)
        ratingContainer.find(`label[for="${checkedRadioId}"]`).addClass('star-filled');
        ratingContainer.find(`label[for="${checkedRadioId}"]`).prevAll('label').addClass('star-filled');
    }
  }

  // Inicializa las estrellas en la carga de la página basado en el atributo 'checked'
  $('.rating').each(function() {
    updateFilledStars($(this));
  });

  // Efecto Hover para previsualizar el rating
  $('.rating label').on('mouseenter', function() {
    const $ratingContainer = $(this).closest('.rating');
    $ratingContainer.find('label').removeClass('star-hover'); // Limpia hover previo en este grupo
    $(this).addClass('star-hover'); // Añade clase hover a la estrella actual
    $(this).prevAll('label').addClass('star-hover'); // Añade clase hover a las estrellas anteriores (debido a RTL)
  });

  // Quita el efecto hover cuando el ratón sale del contenedor del rating
  $('.rating').on('mouseleave', function() {
    $(this).find('label').removeClass('star-hover');
  });

  // Manejador de Click para establecer el rating
  $('.rating label').on('click', function(e) {
    e.preventDefault(); // Previene comportamiento por defecto si es necesario
    const $label = $(this);
    const $radio = $('#' + $label.attr('for')); // El input radio asociado
    const $ratingContainer = $label.closest('.rating');

    // Solo actualiza si no está ya seleccionado
    if (!$radio.is(':checked')) {
        $radio.prop('checked', true); // Marca el input radio como seleccionado
        // Actualiza el estado visual de las estrellas rellenas
        updateFilledStars($ratingContainer);
        // Opcional: Mostrar el valor seleccionado o enviarlo a algún sitio
        // console.log('Rating set to:', $radio.val());
    }
  });

}); // Fin del document.ready
