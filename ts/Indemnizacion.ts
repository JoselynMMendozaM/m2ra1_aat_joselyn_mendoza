class IndemnizacionCalculator {
    private sueldoBase: number = 0;
    private cantAños: number = 0;
    private salarioPendiente: number = 0;
    private deudasCobros: number = 0;

    // Métodos para asignar valores
    public asignarSueldoBase(valor: number) {
        this.sueldoBase = valor;
    }

    public asignarCantAños(valor: number) {
        this.cantAños = valor;
    }

    public asignarSalarioPendiente(valor: number) {
        this.salarioPendiente = valor;
    }

    public asignarDeudasCobros(valor: number) {
        this.deudasCobros = valor;
    }

    // Método para calcular la indemnización
    public calcularIndemnizacion(): string {
        const cantMeses = this.cantAños * 12;
        const aguinaldo = (this.sueldoBase / 12) * cantMeses;
        const bonoCatorce = (this.sueldoBase / 12) * cantMeses;
        const indemnizacion = (this.sueldoBase * this.cantAños) + bonoCatorce + aguinaldo + this.salarioPendiente - this.deudasCobros;
        return `La indemnización es de: Q${indemnizacion.toFixed(2)}`;
    }
}

// Crear un objeto de tipo IndemnizacionCalculator
const indemnizacionCalculator = new IndemnizacionCalculator();

function obtenerDatosIndemnizacion() {
    indemnizacionCalculator.asignarSueldoBase(
        parseFloat((document.getElementById("sueldo_base") as HTMLInputElement).value)
    );
    indemnizacionCalculator.asignarCantAños(
        parseFloat((document.getElementById("cant_años") as HTMLInputElement).value)
    );
    indemnizacionCalculator.asignarSalarioPendiente(
        parseFloat((document.getElementById("salario_pendiente") as HTMLInputElement).value)
    );
    indemnizacionCalculator.asignarDeudasCobros(
        parseFloat((document.getElementById("deudas_cobros") as HTMLInputElement).value)
    );
}

function calcularIndemnizacion(event: Event) {
    event.preventDefault(); // Evita que el formulario se envíe
    obtenerDatosIndemnizacion();

    // Validar que los campos no estén vacíos y sean números válidos
    const sueldoBase = (document.getElementById("sueldo_base") as HTMLInputElement).value;
    const cantAños = (document.getElementById("cant_años") as HTMLInputElement).value;
    const salarioPendiente = (document.getElementById("salario_pendiente") as HTMLInputElement).value;
    const deudasCobros = (document.getElementById("deudas_cobros") as HTMLInputElement).value;

    if (isNaN(parseFloat(sueldoBase)) || parseFloat(sueldoBase) <= 0) {
        $('#error1').show();
    } else {
        $('#error1').hide();
    }

    if (isNaN(parseFloat(cantAños)) || parseFloat(cantAños) <= 0) {
        $('#error2').show();
    } else {
        $('#error2').hide();
    }

    if (isNaN(parseFloat(salarioPendiente)) || parseFloat(salarioPendiente) < 0) {
        $('#error3').show();
    } else {
        $('#error3').hide();
    }

    if (isNaN(parseFloat(deudasCobros)) || parseFloat(deudasCobros) < 0) {
        $('#error4').show();
    } else {
        $('#error4').hide();
    }

    // Mostrar el resultado
    $('#result_indemnizacion').html(`<h4><strong>${indemnizacionCalculator.calcularIndemnizacion()}</strong></h4>`);
}

function hideError(selector: string) {
    $(selector).hide();
}

$(document).ready(function() {
    $('#calc_indemnizacion').click((event) => calcularIndemnizacion(event));
    $('#sueldo_base').change(() => hideError('#error1'));
    $('#cant_años').change(() => hideError('#error2'));
    $('#salario_pendiente').change(() => hideError('#error3'));
    $('#deudas_cobros').change(() => hideError('#error4'));
});