$(document).ready(function() {
    // Verifica se a URL corresponde à página de formulário de ticket
    if (window.location.href.indexOf("/front/ticket.form.php?id=") > -1) {
        // Função para ocultar o campo actiontime e o ícone do relógio
        function hideActionTimeFieldAndIcon() {
            // Seleciona todos os elementos que começam com o ID 'dropdown_actiontime'
            $('[id^="dropdown_actiontime"]').each(function() {
                var $selectContainer = $(this).closest('.field-container');
                if ($selectContainer.length) {
                    $selectContainer.hide(); // Oculta o contêiner do select

                    // Tenta encontrar e ocultar o ícone do relógio associado
                    var $icon = $selectContainer.prev('label').find('i.fas.fa-stopwatch');
                    if ($icon.length) {
                        $icon.hide(); // Oculta o ícone do relógio
                    }
                }
            });
        }

        // Função para adicionar os novos campos de data e hora de início e de fim



        function addDateTimeFields() {
            // Estrutura HTML para os novos campos de data e hora de início e de fim
            var dateTimeFieldsHtml = `
<div class="form-field row col-12 mb-2">
    <label class="col-form-label col-2 text-xxl-start" for="start_datetime_picker">
        <i class="far fa-calendar-alt" title="Inicio"></i>
    </label>
    <div class="col-10">
        <input type="text" id="start_datetime_picker" name="start_datetime" class="form-control">
    </div>
</div>
<div class="form-field row col-12 mb-2">
    <label class="col-form-label col-2 text-xxl-end" for="end_datetime_picker">
        <i class="far fa-calendar-alt" title="Fim"></i>
    </label>
    <div class="col-10">
        <input type="text" id="end_datetime_picker" name="end_datetime" class="form-control">
    </div>
</div>
            `;

            // Insere os novos campos após o campo actiontime
            $('[id^="dropdown_actiontime"]').closest('.field-container').after(dateTimeFieldsHtml);

            // Inicializa o Flatpickr nos novos campos, com as opções de data e hora
            flatpickr("#start_datetime_picker", {
                enableTime: true,
                dateFormat: "Y-m-d H:i:S",
                time_24hr: true,
                minuteIncrement: 1
            });

            flatpickr("#end_datetime_picker", {
                enableTime: true,
                dateFormat: "Y-m-d H:i:S",
                time_24hr: true,
                minuteIncrement: 1
            });
        }

        // Inicia um intervalo para verificar se o campo actiontime está presente
        var interval = setInterval(() => {
            // Verifica se ao menos um elemento com esse ID está presente
            if ($('[id^="dropdown_actiontime"]').length > 0) {
                clearInterval(interval); // Limpa o intervalo uma vez que o campo é encontrado
                hideActionTimeFieldAndIcon(); // Chama a função para ocultar o campo e o ícone
                addDateTimeFields(); // Chama a função para adicionar os novos campos
            }
        }, 100); // Checa a cada 100ms
    }
});

