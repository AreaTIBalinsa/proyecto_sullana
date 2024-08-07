@vite(['resources/js/caja_chica.js'])
@extends('aside')
@section('titulo', 'Caja Chica')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 pt-5">Caja Chica</h4>
        {{-- <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="registrar_agregarPago_submit"><i class='bx bx-plus-medical text-lg'></i><h5 class="min-w-max">Registrar Ingreso</h5></button>
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-700" type="submit" autocomplete="off" id="registrar_Egreso_submit"><i class='bx bx-minus text-lg'></i><h5 class="min-w-max">Registrar Egreso</h5></button>
        </div> --}}
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
        <div class="flex gap-2 justify-end w-full items-center flex-col md:flex-row px-4 mb-5">
            <a class="text-sm py-2 px-5 bg-red-600 hover:bg-red-700 text-gray-50 rounded-lg" href="/detalles_egresos"><i class='bx bx-log-in-circle'></i> Ir a Egresos Detallados</a>
        </div>
        {{-- <div class="flex justify-between items-center relative flex-col gap-4 lg:flex-row mb-5 md:mx-5">
            <div class="flex w-full lg:max-w-xs">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarCodigoPago" placeholder="Ingrese Codigo de Pago">
            </div>
        </div> --}}
        <div class="md:m-5 mt-0">
            <div class="relative overflow-auto aside_scrollED rounded-lg flex items-start">
                <div>
                    <div class="text-white font-bold bg-yellow-400 flex justify-center w-full gap-4 p-1.5">
                        <div class="">Diferencia : </div>
                        <div class="" id="diferencia">0.00</div>
                    </div>
                    <div class="flex">
                        <div>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <caption class="bg-green-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Caja Chica Ingreso</caption>
                                <thead class="text-xs text-gray-100 uppercase bg-green-600">
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                        <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Nombre de Cliente</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                        <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyReporteDePagosCajaChicaIngreso">
                                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
                                </tbody>
                            </table>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-100 uppercase bg-green-600">
                                    <tr class="border-2 border-l-[1px] border-r-[1px]">
                                        <th class="p-4 whitespace-nowrap text-center" colspan="6">FILAS A AGREGAR</th>
                                        <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel2"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                    </tr>
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                        <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Observaciones</th>
                                        <th class="p-4 border-r-[1px] border-b-2 text-center">Fecha Registro</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyReporteDePagosExcel2">
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <caption class="bg-red-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Caja Chica Egreso</caption>
                                <thead class="text-xs text-gray-100 uppercase bg-red-600">
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                        <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Uso Egreso</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Cantidad</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Precio</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Monto</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Forma Pago</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Banco</th>
                                        <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Codigo</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyReporteDePagosCajaChicaEgreso">
                                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                                </tbody>
                            </table>
                            {{-- <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-100 uppercase bg-red-600">
                                    <tr class="border-2 border-l-[1px] border-r-[1px]">
                                        <th class="p-4 whitespace-nowrap text-center" colspan="4">FILAS A AGREGAR</th>
                                        <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_ExcelEgreso1"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                    </tr>
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                        <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Uso Egreso</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Cantidad</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Precio</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Monto</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                        <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyReporteDePagosExcelEgreso1">
                                </tbody>
                            </table> --}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

{{-- Modal Editar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoClienteEditar">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Pago</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoClienteEditar">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoClienteEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <label id="idReporteDePago" class="hidden mb-2 text-base font-medium text-gray-900 dark:text-white"></label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoClienteEditar" autocomplete="off" id="idAgregarPagoClienteEditar" placeholder="Ingrese Nombre de Cliente">
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
                                <option value="Yape">Yape</option>
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

{{-- Modal Agregar Egreso Editar --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarEgresoEditar">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Egreso Editar</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarEgresoEditar">
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarEgresoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarEgresoEditar">
                        </div>
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <input type="text" class="hidden" value="" id="idReporteDeEgresoEditar">
                            <label for="idAgregarEgresoEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarEgresoEditar" autocomplete="off" id="idAgregarEgresoEditar" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="cantidadAgregarEgresoClienteEditar" autocomplete="off" id="cantidadAgregarEgresoClienteEditar" value="" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio:</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarEgresoClienteEditar" autocomplete="off" id="valorAgregarEgresoClienteEditar" value="" placeholder="Ingrese Precio">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Monto:</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="montoAgregarEgresoClienteEditar" autocomplete="off" id="montoAgregarEgresoClienteEditar" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="hidden w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEgresoEditar" id="formaDePagoEgresoEditar">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Yape">Yape</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBancoEgresoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full mayusculasGaaa uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarEgresoClienteEditar" autocomplete="off" id="bancoAgregarEgresoClienteEditar" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEgresoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarEgresoClienteEditar" autocomplete="off" id="codAgregarEgresoClienteEditar" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarEgresoEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarEgresoEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Egreso Editar --}}
{{-- Modal Tablas --}}
<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalEgresosModal">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[80%] w-full">
            <div class="p-4">
                <div class="w-full overflow-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="bg-blue-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100" id="captionEgresosModal">Egresos sin Clasificar</caption>
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="headerEgresosModal">
                            <tr>
                                <th class="px-2 py-4 text-center">#</th>
                                <th class="px-2 py-4 text-center">Fecha</th>
                                <th class="px-2 py-4 text-center">Hora</th>
                                <th class="px-2 py-4 text-center">Uso de Egreso</th>
                                <th class="px-2 py-4 text-center">Cantidad</th>
                                <th class="px-2 py-4 text-center">Precio</th>
                                <th class="px-2 py-4 text-center">Monto</th>
                                <th class="px-2 py-4 text-center">Observación</th>
                            </tr>
                        </thead>
                        <tbody id="bodyCategoriaModal">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalEgresosModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection