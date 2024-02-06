@vite(['resources/js/caja_chica.js'])
@extends('aside')
@section('titulo', 'Caja Chica')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Caja Chica</h4>
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="registrar_agregarPago_submit"><i class='bx bx-plus-medical text-lg'></i><h5 class="min-w-max">Registrar Ingreso</h5></button>
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-700" type="submit" autocomplete="off" id="registrar_Egreso_submit"><i class='bx bx-minus text-lg'></i><h5 class="min-w-max">Registrar Egreso</h5></button>
        </div>
        <div class="flex justify-start md:items-end gap-x-14 gap-y-4 flex-col md:flex-row flex-wrap md:m-5 mt-0 mb-5">
            <div class="flex gap-x-14 gap-y-4 flex-col md:flex-row">
                <div class="flex flex-col justify-center">
                    <label for="fechaDesdeCajaChica" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCajaChica">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaHastaCajaChica" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCajaChica">
                </div>
            </div>
            <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrarIngresosYEgresos"><i class='bx bx-search-alt text-lg' ></i> Buscar</button>
        </div>
        <div class="flex justify-between items-center relative flex-col gap-4 lg:flex-row mb-5 md:mx-5">
            <div class="flex w-full lg:max-w-xs">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarCodigoPago" placeholder="Ingrese Codigo de Pago">
            </div>
        </div>
        <h1 class="m-5 dark:text-white font-bold text-gray-900 w-full text-center text-2xl">INGRESOS</h1>
        <div class="md:m-5 mt-0">
            <div class="relative overflow-auto max-h-[500px] aside_scrollED rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaIngresos">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4 whitespace-nowrap">Nombre de Cliente</th>
                            <th class="p-4 text-center whitespace-nowrap">Importe</th>
                            <th class="p-4 text-center whitespace-nowrap">Forma Pago</th>
                            <th class="p-4 text-center whitespace-nowrap">Banco</th>
                            <th class="p-4 text-center whitespace-nowrap">Codigo</th>
                            <th class="p-4 text-center whitespace-nowrap">Fecha</th>
                            <th class="p-4 text-center whitespace-nowrap">Hora</th>
                            <th class="p-4 text-center whitespace-nowrap">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteDePagos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h1 class="m-5 dark:text-white font-bold text-gray-900 w-full text-center text-2xl">EGRESOS</h1>
        <div class="md:m-5 mt-0">
            <div class="relative overflow-auto max-h-[500px] aside_scrollED rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaEgresos">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4 whitespace-nowrap">Uso Egreso</th>
                            <th class="p-4 text-center whitespace-nowrap">Importe</th>
                            <th class="p-4 text-center whitespace-nowrap">Forma Pago</th>
                            <th class="p-4 text-center whitespace-nowrap">Banco</th>
                            <th class="p-4 text-center whitespace-nowrap">Codigo</th>
                            <th class="p-4 text-center whitespace-nowrap">Fecha</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteDeEgresos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

{{-- Modal Agregar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoCliente">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Ingreso</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoCliente" autocomplete="off" id="idAgregarPagoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarPagoCliente" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarPagoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotal">0.00</span></h2>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPago" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPago">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="horaAgregarPago" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" step="1" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarPago">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoCliente" autocomplete="off" id="valorAgregarPagoCliente" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePago" id="formaDePago">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBanco">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoCliente" autocomplete="off" id="bancoAgregarPagoCliente" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTrans">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoCliente" autocomplete="off" id="codAgregarPagoCliente" value="">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoCliente" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoCliente" autocomplete="off" id="comentarioAgregarPagoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoCliente">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Pago --}}

{{-- Modal Editar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoClienteEditar">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Ingreso</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoClienteEditar">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoClienteEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <label id="idReporteDePago" class="hidden mb-2 text-base font-medium text-gray-900 dark:text-white"></label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoClienteEditar" autocomplete="off" id="idAgregarPagoClienteEditar" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarPagoClienteEditar" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarPagoClienteEditar" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotalEditar">0.00</span></h2>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPagoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPagoEditar">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="horaAgregarPagoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" step="1" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarPagoEditar">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoClienteEditar" autocomplete="off" id="valorAgregarPagoClienteEditar" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEditar" id="formaDePagoEditar">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBancoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full mayusculasGaaa uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoClienteEditar" autocomplete="off" id="bancoAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoClienteEditar" autocomplete="off" id="codAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoClienteEditar" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoClienteEditar" autocomplete="off" id="comentarioAgregarPagoClienteEditar"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoClienteEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoClienteEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Pago --}}

{{-- Modal Agregar Egreso --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarEgreso">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Egreso</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarEgreso">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarEgreso" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarEgreso" autocomplete="off" id="idAgregarEgreso" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarEgreso" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarEgreso">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarEgresoCliente" autocomplete="off" id="valorAgregarEgresoCliente" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEgreso" id="formaDePagoEgreso">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBancoEgreso">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoCliente" autocomplete="off" id="bancoAgregarEgresoCliente" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEgreso">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoCliente" autocomplete="off" id="codAgregarEgresoCliente" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarEgreso">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarEgreso">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Egreso --}}
@endsection