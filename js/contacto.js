$(document).ready(function() {

  // --- Validación en Tiempo Real ---
  const form = $('#contactoForm');
  const inputs = form.find('.form-control'); // Selecciona todos los inputs/textarea

  // Función para validar un campo individual
  function validateField(field) {
    const $field = $(field);
    // Usa checkValidity() del elemento DOM para verificar las reglas HTML5 (required, minlength, pattern, type=email, etc.)
    if (field.checkValidity()) {
      $field.removeClass('is-invalid').addClass('is-valid');
      return true;
    } else {
      $field.removeClass('is-valid').addClass('is-invalid');
      return false;
    }
  }

  // Validar en el evento 'input' (mientras se escribe) y 'blur' (al salir del campo)
  inputs.on('input blur', function() {
    validateField(this);
  });

  // --- Manejo del Envío del Formulario ---
  form.on('submit', function(event) {
    event.preventDefault(); // Previene el envío real del formulario

    let isFormValid = true;

    // Validar todos los campos uno por uno al intentar enviar
    inputs.each(function() {
      if (!validateField(this)) {
        isFormValid = false;
      }
    });

    // Si el formulario NO es válido, detenerse aquí
    if (!isFormValid) {
      // Opcional: Enfocar el primer campo inválido
      form.find('.is-invalid').first().focus();
      return;
    }

    // --- Si el formulario ES válido ---

    // 1. Mostrar Spinner y deshabilitar botón
    const submitBtn = $('#submitBtn');
    const spinner = $('#formSpinner');
    const btnText = $('#submitBtnText');

    submitBtn.prop('disabled', true); // Deshabilita el botón
    btnText.text('Enviando...');      // Cambia texto (opcional)
    spinner.removeClass('d-none');    // Muestra el spinner

    // 2. Simular envío (reemplazar con AJAX en una aplicación real)
    setTimeout(function() {
      // 3. Ocultar Spinner y habilitar botón (después de la simulación)
      spinner.addClass('d-none');     // Oculta el spinner
      btnText.text('Enviar Mensaje'); // Restaura texto original
      submitBtn.prop('disabled', false); // Habilita el botón

      // 4. Mostrar Modal de Confirmación
      const confirmationModal = new bootstrap.Modal('#confirmationModal');
      confirmationModal.show();

      // 5. Limpiar formulario y clases de validación
      form[0].reset(); // Resetea los campos del formulario
      inputs.removeClass('is-valid is-invalid'); // Quita clases de validación

    }, 1500); // Simula 1.5 segundos de espera

  }); // Fin del form.on('submit')

}); // Fin del document.ready
