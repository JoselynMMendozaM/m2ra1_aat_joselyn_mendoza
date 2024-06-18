var IndemnizacionCalculator = /** @class */ (function () {
    function IndemnizacionCalculator() {
        this.sueldoBase = 0;
        this.cantAños = 0;
        this.salarioPendiente = 0;
        this.deudasCobros = 0;
    }
    // Métodos para asignar valores
    IndemnizacionCalculator.prototype.asignarSueldoBase = function (valor) {
        this.sueldoBase = valor;
    };
    IndemnizacionCalculator.prototype.asignarCantAños = function (valor) {
        this.cantAños = valor;
    };
    IndemnizacionCalculator.prototype.asignarSalarioPendiente = function (valor) {
        this.salarioPendiente = valor;
    };
    IndemnizacionCalculator.prototype.asignarDeudasCobros = function (valor) {
        this.deudasCobros = valor;
    };
    // Método para calcular la indemnización
    IndemnizacionCalculator.prototype.calcularIndemnizacion = function () {
        var cantMeses = this.cantAños * 12;
        var aguinaldo = (this.sueldoBase / 12) * cantMeses;
        var bonoCatorce = (this.sueldoBase / 12) * cantMeses;
        var indemnizacion = (this.sueldoBase * this.cantAños) + bonoCatorce + aguinaldo + this.salarioPendiente - this.deudasCobros;
        return "La indemnizaci\u00F3n es de: Q".concat(indemnizacion.toFixed(2));
    };
    return IndemnizacionCalculator;
}());
// Crear un objeto de tipo IndemnizacionCalculator
var indemnizacionCalculator = new IndemnizacionCalculator();
function obtenerDatosIndemnizacion() {
    indemnizacionCalculator.asignarSueldoBase(parseFloat(document.getElementById("sueldo_base").value));
    indemnizacionCalculator.asignarCantAños(parseFloat(document.getElementById("cant_años").value));
    indemnizacionCalculator.asignarSalarioPendiente(parseFloat(document.getElementById("salario_pendiente").value));
    indemnizacionCalculator.asignarDeudasCobros(parseFloat(document.getElementById("deudas_cobros").value));
}
function calcularIndemnizacion(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    obtenerDatosIndemnizacion();
    // Validar que los campos no estén vacíos y sean números válidos
    var sueldoBase = document.getElementById("sueldo_base").value;
    var cantAños = document.getElementById("cant_años").value;
    var salarioPendiente = document.getElementById("salario_pendiente").value;
    var deudasCobros = document.getElementById("deudas_cobros").value;
    if (isNaN(parseFloat(sueldoBase)) || parseFloat(sueldoBase) <= 0) {
        $('#error1').show();
    }
    else {
        $('#error1').hide();
    }
    if (isNaN(parseFloat(cantAños)) || parseFloat(cantAños) <= 0) {
        $('#error2').show();
    }
    else {
        $('#error2').hide();
    }
    if (isNaN(parseFloat(salarioPendiente)) || parseFloat(salarioPendiente) < 0) {
        $('#error3').show();
    }
    else {
        $('#error3').hide();
    }
    if (isNaN(parseFloat(deudasCobros)) || parseFloat(deudasCobros) < 0) {
        $('#error4').show();
    }
    else {
        $('#error4').hide();
    }
    // Mostrar el resultado
    $('#result_indemnizacion').html("<h4><strong>".concat(indemnizacionCalculator.calcularIndemnizacion(), "</strong></h4>"));
}
function hideError(selector) {
    $(selector).hide();
}
$(document).ready(function () {
    $('#calc_indemnizacion').click(function (event) { return calcularIndemnizacion(event); });
    $('#sueldo_base').change(function () { return hideError('#error1'); });
    $('#cant_años').change(function () { return hideError('#error2'); });
    $('#salario_pendiente').change(function () { return hideError('#error3'); });
    $('#deudas_cobros').change(function () { return hideError('#error4'); });
});
