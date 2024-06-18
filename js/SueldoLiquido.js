var SueldoLiquido = /** @class */ (function () {
    function SueldoLiquido() {
        this.salario = 0;
        this.bonificacion = 0;
        this.comisiones = 0;
        this.igss = 0;
        this.totalGanado = 0;
        this.ahorro = 0;
        this.prestamosDescuentos = 0;
        this.totalDescuentos = 0;
    }
    SueldoLiquido.prototype.asignarSalario = function (valor) {
        this.salario = valor;
    };
    SueldoLiquido.prototype.asignarBonificacion = function (valor) {
        this.bonificacion = valor;
    };
    SueldoLiquido.prototype.asignarComisiones = function (valor) {
        this.comisiones = valor;
    };
    SueldoLiquido.prototype.asignarAhorro = function (valor) {
        this.ahorro = valor;
    };
    SueldoLiquido.prototype.asignarPrestamosDescuentos = function (valor) {
        this.prestamosDescuentos = valor;
    };
    SueldoLiquido.prototype.calcularIGSS = function () {
        this.igss = (this.salario * 4.83) / 100;
    };
    SueldoLiquido.prototype.calcularTotalGanado = function () {
        this.calcularIGSS(); // Calculate IGSS before calculating total earned
        this.totalGanado = this.salario + this.bonificacion + this.comisiones;
        $('#resultado_igss').html("<h4><strong>".concat(this.obtenerIGSS(), "</strong></h4>")); // Display IGSS
        return "El total ganado es de: Q".concat(this.totalGanado.toFixed(2));
    };
    SueldoLiquido.prototype.obtenerIGSS = function () {
        return "".concat(this.igss.toFixed(2));
    };
    SueldoLiquido.prototype.calcularTotalDescuentos = function () {
        this.totalDescuentos = this.ahorro + this.igss + this.prestamosDescuentos;
        return "El total de descuentos es de: Q".concat(this.totalDescuentos.toFixed(2));
    };
    SueldoLiquido.prototype.calcularSueldoLiquido = function () {
        var sueldoLiquido = this.totalGanado - this.totalDescuentos;
        return "El sueldo l\u00EDquido es de: Q".concat(sueldoLiquido.toFixed(2));
    };
    return SueldoLiquido;
}());
// Crear un objeto de tipo SueldoLiquido
var sueldoLiquido = new SueldoLiquido();
function obtenerDatos() {
    // Asignando a los atributos del objeto los valores de los controles del formulario
    sueldoLiquido.asignarSalario(parseFloat(document.getElementById("salario").value));
    sueldoLiquido.asignarBonificacion(parseFloat(document.getElementById("bonificacion").value));
    sueldoLiquido.asignarComisiones(parseFloat(document.getElementById("comisiones").value));
}
function obtenerDatosDescuentos() {
    // Asignando a los atributos del objeto los valores de los controles del formulario
    sueldoLiquido.asignarAhorro(parseFloat(document.getElementById("ahorro").value));
    sueldoLiquido.asignarPrestamosDescuentos(parseFloat(document.getElementById("prestamos-descuentos").value));
}
function calcularTotalGanado(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    obtenerDatos();
    // Validar que los campos no estén vacíos
    var salario = document.getElementById("salario").value;
    var bonificacion = document.getElementById("bonificacion").value;
    var comisiones = document.getElementById("comisiones").value;
    if (salario.trim() === '' || bonificacion.trim() === '' || comisiones.trim() === '') {
        toggleError('#error1', salario.trim() === '');
        toggleError('#error2', bonificacion.trim() === '');
        toggleError('#error3', comisiones.trim() === '');
        return;
    }
    // Mostrar resultados
    $('#resultado_igss').html("<h4><strong>".concat(sueldoLiquido.obtenerIGSS(), "</strong></h4>"));
    $('#resultado_ganado').html("<h4><strong>".concat(sueldoLiquido.calcularTotalGanado(), "</strong></h4>"));
}
function calcularTotalDescuentos(event) {
    event.preventDefault(); // Evita el envío del formulario
    obtenerDatosDescuentos();
    // Obtener valores y validar
    if (isNaN(sueldoLiquido['ahorro']) || sueldoLiquido['ahorro'] <= 0 ||
        isNaN(sueldoLiquido['prestamosDescuentos']) || sueldoLiquido['prestamosDescuentos'] <= 0) {
        mostrarErrores(sueldoLiquido['ahorro'], sueldoLiquido['prestamosDescuentos']);
        return;
    }
    // Limpiar mensajes de error previos
    limpiarErrores();
    // Mostrar el total de descuentos
    $('#resultado_descuentos').html("<h4><strong>".concat(sueldoLiquido.calcularTotalDescuentos(), "</strong></h4>"));
}
function calcularSueldoLiquido(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    var resultSueldoLiquido = sueldoLiquido.calcularSueldoLiquido();
    $('#resultado_sueldo_liquido').html("<h4><strong>".concat(resultSueldoLiquido, "</strong></h4>"));
}
function toggleError(selector, condition) {
    $(selector).toggle(condition);
}
function mostrarErrores(ahorro, prestamosDescuentos) {
    toggleError('#error4', isNaN(ahorro) || ahorro <= 0);
    toggleError('#error5', isNaN(prestamosDescuentos) || prestamosDescuentos <= 0);
}
function limpiarErrores() {
    hideError('#error4');
    hideError('#error5');
}
function hideError(selector) {
    $(selector).hide();
}
$(document).ready(function () {
    $('#total_ganado').click(function (event) { return calcularTotalGanado(event); });
    $('#salario').change(function () { return hideError('#error1'); });
    $('#bonificacion').change(function () { return hideError('#error2'); });
    $('#comisiones').change(function () { return hideError('#error3'); });
    $('#calc_descuentos').click(function (event) { return calcularTotalDescuentos(event); });
    $('#ahorro').change(function () { return hideError('#error4'); });
    $('#prestamos-descuentos').change(function () { return hideError('#error5'); });
    $('#sueldo_liquido').click(function (event) { return calcularSueldoLiquido(event); });
});
