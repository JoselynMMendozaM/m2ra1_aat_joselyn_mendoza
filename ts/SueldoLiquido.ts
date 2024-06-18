class SueldoLiquido {
    private salario: number = 0;
    private bonificacion: number = 0;
    private comisiones: number = 0;
    private igss: number = 0;
    private totalGanado: number = 0;
    private ahorro: number = 0;
    private prestamosDescuentos: number = 0;
    private totalDescuentos: number = 0;

    public asignarSalario(valor: number) {
        this.salario = valor;
    }

    public asignarBonificacion(valor: number) {
        this.bonificacion = valor;
    }

    public asignarComisiones(valor: number) {
        this.comisiones = valor;
    }

    public asignarAhorro(valor: number) {
        this.ahorro = valor;
    }

    public asignarPrestamosDescuentos(valor: number) {
        this.prestamosDescuentos = valor;
    }

    private calcularIGSS(): void {
        this.igss = (this.salario * 4.83) / 100;
    }

    public calcularTotalGanado(): string {
        this.calcularIGSS(); // Calculate IGSS before calculating total earned
        this.totalGanado = this.salario + this.bonificacion + this.comisiones;
        $('#resultado_igss').html(`<h4><strong>${this.obtenerIGSS()}</strong></h4>`); // Display IGSS
        return `El total ganado es de: Q${this.totalGanado.toFixed(2)}`;
    }

    public obtenerIGSS(): string {
        return `${this.igss.toFixed(2)}`;
    }

    public calcularTotalDescuentos(): string {
        this.totalDescuentos = this.ahorro + this.igss + this.prestamosDescuentos;
        return `El total de descuentos es de: Q${this.totalDescuentos.toFixed(2)}`;
    }

    public calcularSueldoLiquido(): string {
        const sueldoLiquido = this.totalGanado - this.totalDescuentos;
        return `El sueldo líquido es de: Q${sueldoLiquido.toFixed(2)}`;
    }
}

// Crear un objeto de tipo SueldoLiquido
const sueldoLiquido = new SueldoLiquido();

function obtenerDatos() {
    // Asignando a los atributos del objeto los valores de los controles del formulario
    sueldoLiquido.asignarSalario(
        parseFloat((document.getElementById("salario") as HTMLInputElement).value)
    );
    sueldoLiquido.asignarBonificacion(
        parseFloat((document.getElementById("bonificacion") as HTMLInputElement).value)
    );
    sueldoLiquido.asignarComisiones(
        parseFloat((document.getElementById("comisiones") as HTMLInputElement).value)
    );
}

function obtenerDatosDescuentos() {
    // Asignando a los atributos del objeto los valores de los controles del formulario
    sueldoLiquido.asignarAhorro(
        parseFloat((document.getElementById("ahorro") as HTMLInputElement).value)
    );
    sueldoLiquido.asignarPrestamosDescuentos(
        parseFloat((document.getElementById("prestamos-descuentos") as HTMLInputElement).value)
    );
}

function calcularTotalGanado(event: Event) {
    event.preventDefault(); // Evita que el formulario se envíe
    obtenerDatos();

    // Validar que los campos no estén vacíos
    const salario = (document.getElementById("salario") as HTMLInputElement).value;
    const bonificacion = (document.getElementById("bonificacion") as HTMLInputElement).value;
    const comisiones = (document.getElementById("comisiones") as HTMLInputElement).value;

    if (salario.trim() === '' || bonificacion.trim() === '' || comisiones.trim() === '') {
        toggleError('#error1', salario.trim() === '');
        toggleError('#error2', bonificacion.trim() === '');
        toggleError('#error3', comisiones.trim() === '');
        return;
    }

    // Mostrar resultados
    $('#resultado_igss').html(`<h4><strong>${sueldoLiquido.obtenerIGSS()}</strong></h4>`);
    $('#resultado_ganado').html(`<h4><strong>${sueldoLiquido.calcularTotalGanado()}</strong></h4>`);
}

function calcularTotalDescuentos(event: Event) {
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
    $('#resultado_descuentos').html(`<h4><strong>${sueldoLiquido.calcularTotalDescuentos()}</strong></h4>`);
}

function calcularSueldoLiquido(event: Event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const resultSueldoLiquido = sueldoLiquido.calcularSueldoLiquido();
    $('#resultado_sueldo_liquido').html(`<h4><strong>${resultSueldoLiquido}</strong></h4>`);
}

function toggleError(selector: string, condition: boolean) {
    $(selector).toggle(condition);
}

function mostrarErrores(ahorro: number, prestamosDescuentos: number) {
    toggleError('#error4', isNaN(ahorro) || ahorro <= 0);
    toggleError('#error5', isNaN(prestamosDescuentos) || prestamosDescuentos <= 0);
}

function limpiarErrores() {
    hideError('#error4');
    hideError('#error5');
}

function hideError(selector: string) {
    $(selector).hide();
}

$(document).ready(function() {
    $('#total_ganado').click((event) => calcularTotalGanado(event));
    $('#salario').change(() => hideError('#error1'));
    $('#bonificacion').change(() => hideError('#error2'));
    $('#comisiones').change(() => hideError('#error3'));

    $('#calc_descuentos').click((event) => calcularTotalDescuentos(event));
    $('#ahorro').change(() => hideError('#error4'));
    $('#prestamos-descuentos').change(() => hideError('#error5'));

    $('#sueldo_liquido').click((event) => calcularSueldoLiquido(event));
});