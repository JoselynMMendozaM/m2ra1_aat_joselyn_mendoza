class SueldoLiquido {
    constructor() {
        $(document).ready(() => {
            this.initEventListeners();
        });
    }

    initEventListeners() {
        $('#total_ganado').click((event) => this.calcularTotalGanado(event));
        $('#salario').change(() => this.ocultarError('#error1'));
        $('#bonificacion').change(() => this.ocultarError('#error2'));
        $('#comisiones').change(() => this.ocultarError('#error3'));
        $('#calc_descuentos').click((event) => this.calcularTotalDescuentos(event));
        $('#ahorro').change(() => this.ocultarError('#error4'));
        $('#prestamos-descuentos').change(() => this.ocultarError('#error5'));
        $('#sueldo_liquido').click((event) => this.calcularSueldoLiquido(event));
    }

    ocultarError(selector) {
        $(selector).hide();
    }
   

    mostrarErrores(ahorro, prestamosDescuentos) {
        if (isNaN(ahorro) || ahorro <= 0) {
            $('#error4').show();
        } else {
            $('#error4').hide();
        }

        if (isNaN(prestamosDescuentos) || prestamosDescuentos <= 0) {
            $('#error5').show();
        } else {
            $('#error5').hide();
        }
    }

    limpiarErrores() {
        $('#error4').hide();
        $('#error5').hide();
    }

    calcularTotalGanado(event) {
        event.preventDefault();

        const salario = $('#salario').val().trim();
        const bonificacion = $('#bonificacion').val().trim();
        const comisiones = $('#comisiones').val().trim();

        if (salario === '' || bonificacion === '' || comisiones === '') {
            $('#error1').toggle(salario === '');
            $('#error2').toggle(bonificacion === '');
            $('#error3').toggle(comisiones === '');
            return;
        }

        const igss = (parseFloat(salario) * 4.83) / 100;
        $('#resultado_igss').html(`<h4><strong>${igss.toFixed(2)}</strong></h4>`);

        const totalGanado = parseFloat(salario) + parseFloat(bonificacion) + parseFloat(comisiones);
        $('#resultado_ganado').html(`<h4><strong>El total ganado es de: Q${totalGanado.toFixed(2)}</strong></h4>`);
    }

    calcularTotalDescuentos(event) {
        event.preventDefault();

        const ahorro = parseFloat($('#ahorro').val().trim());
        const igss = parseFloat($('#resultado_igss').text().trim());
        const prestamosDescuentos = parseFloat($('#prestamos-descuentos').val().trim());

        if (isNaN(ahorro) || ahorro <= 0 || isNaN(prestamosDescuentos) || prestamosDescuentos <= 0) {
            this.mostrarErrores(ahorro, prestamosDescuentos);
            return;
        }

        this.limpiarErrores();

        const totalDescuentos = ahorro + igss + prestamosDescuentos;
        $('#resultado_descuentos').html(`<h4><strong>El total de descuentos es de: Q${totalDescuentos.toFixed(2)}</strong></h4>`);
    }

    calcularSueldoLiquido(event) {
        event.preventDefault();

        const totalGanadoText = $('#resultado_ganado').text();
        const totalDescuentosText = $('#resultado_descuentos').text();

        const totalGanadoMatch = totalGanadoText.match(/\d+(\.\d+)?/);
        const totalDescuentosMatch = totalDescuentosText.match(/\d+(\.\d+)?/);

        if (!totalGanadoMatch || !totalDescuentosMatch) {
            console.error('No se pudieron extraer los números de los resultados.');
            return;
        }

        const totalGanado = parseFloat(totalGanadoMatch[0]);
        const totalDescuentos = parseFloat(totalDescuentosMatch[0]);

        const sueldoLiquido = totalGanado - totalDescuentos;
        $('#resultado_sueldo_liquido').html(`<h4><strong>El sueldo líquido es de: Q${sueldoLiquido.toFixed(2)}</strong></h4>`);
    }
}

const app = new SueldoLiquido();