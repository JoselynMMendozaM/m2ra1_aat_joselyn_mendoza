class IndemnizacionApp {
    constructor() {
        $(document).ready(() => {
            this.initEventListeners();
        });
    }

    initEventListeners() {
        $('#calc_indemnizacion').click((event) => this.calcularIndemnizacion(event));
        $('#sueldo_base').change(() => this.ocultarError('#error1'));
        $('#cant_años').change(() => this.ocultarError('#error2'));
        $('#salario_pendiente').change(() => this.ocultarError('#error3'));
        $('#deudas_cobros').change(() => this.ocultarError('#error4'));
    }

    ocultarError(selector) {
        $(selector).hide();
    }

    calcularIndemnizacion(event) {
        event.preventDefault();

        const sueldoBase = parseFloat($('#sueldo_base').val());
        const cantAños = parseFloat($('#cant_años').val());
        const salarioPendiente = parseFloat($('#salario_pendiente').val());
        const deudasCobros = parseFloat($('#deudas_cobros').val());

        let errores = false;

        if (isNaN(sueldoBase) || sueldoBase <= 0) {
            $('#error1').show();
            errores = true;
        } else {
            $('#error1').hide();
        }

        if (isNaN(cantAños) || cantAños <= 0) {
            $('#error2').show();
            errores = true;
        } else {
            $('#error2').hide();
        }

        if (isNaN(salarioPendiente) || salarioPendiente < 0) {
            $('#error3').show();
            errores = true;
        } else {
            $('#error3').hide();
        }

        if (isNaN(deudasCobros) || deudasCobros < 0) {
            $('#error4').show();
            errores = true;
        } else {
            $('#error4').hide();
        }

        if (errores) return;

        const cantMeses = cantAños * 12;
        const aguinaldo = (sueldoBase / 12) * cantMeses;
        const bonoCatorce = (sueldoBase / 12) * cantMeses;
        const indemnizacion = (sueldoBase * cantAños) + bonoCatorce + aguinaldo + salarioPendiente - deudasCobros;

        $('#result_indemnizacion').html(`<h4><strong>La indemnización es de: Q${indemnizacion.toFixed(2)}</strong></h4>`);
    }
}

const app = new IndemnizacionApp();