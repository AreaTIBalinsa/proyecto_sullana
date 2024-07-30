@vite(['resources/js/cuenta_cliente.js'])
@extends('aside')
@section('titulo', 'Cuenta de Cliente')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="md:px-10 px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Cuenta de Cliente --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Cuenta de Cliente</h4>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelCliente"><i class='bx bx-arrow-back text-white'></i></button>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelClienteDescuento"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        <label id="totalCuentaDia" class="hidden" value="0"></label>
        <label id="totalPagos" class="hidden" value="0"></label>
        <label id="totalSaldo" class="hidden" value="0"></label>
        {{-- Segundo Contenedor Reporte Pagos --}}
        <div class="mt-0 mb-5 relative">
            <div class="flex flex-col gap-5">
                {{-- <div class="flex justify-center items-start flex-col relative">
                    <label for="idCuentaDelCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                    <div class="flex max-w-xs w-full">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <i class='bx bxs-user-circle text-xl'></i>
                        </span>
                        <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCuentaDelCliente" autocomplete="off" id="idCuentaDelCliente" placeholder="Ingrese Nombre de Cliente">
                    </div>

                    <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                    <label id="selectedCodigoCliCuentaDelCliente" class="hidden" value=""></label>

                    <!-- Contenedor para las sugerencias -->
                    <div id="contenedorClientesCuentaDelCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                        <!-- Aquí se mostrarán las sugerencias -->
                    </div>
                </div> --}}
                {{-- Inicia contenedor filtrar clientes --}}
                <div class="flex flex-col gap-2">
                    <label for="inputNombreClientes" class="font-semibold text-gray-800 dark:text-white">Cliente :</label>
                    <div class="relative flex w-full">
                        <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                            <i class='bx bxs-user-circle text-xl'></i>
                        </div>
                        <div class="w-full md:w-64 relative">
                            <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado">
                            <div class="relative w-full md:w-64 h-10 text-sm">
                                <input
                                  class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                                  placeholder=" " id="inputNombreClientes" autocomplete="off"/><label
                                  class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                                </label>
                              </div>
                            <div id="contenedorDeClientes" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                        </div>
                        <div id="clienteSeleccionadoCorrecto" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                            <i class='bx bx-check text-xl'></i>
                        </div>
                    </div>
                </div>
                {{-- Termina contenedor filtrar clientes --}}
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaCuentaDelCliente">
                    </div>
                    <div class=" flex items-end">
                        <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                    </div>
                </div>
                <div class="flex items-center justify-end py-1 rounded-xl px-1 flex-wrap gap-4">
                    <button class="text-base py-2 px-5 bg-green-600 hover:bg-green-700 text-gray-50 rounded-lg w-full md:w-auto md:flex gap-2 items-center justify-center hidden" id="btnEnviarCuentaWhatsApp"><img src='{{ asset("img/WhatsApp.png") }}' alt="" class="h-5"> Enviar Cuenta</button>
                    <button class="text-base py-2 px-5 bg-green-600 hover:bg-green-700 text-gray-50 rounded-lg w-full md:w-auto flex gap-2 items-center justify-center md:hidden" id="btnEnviarCuentaWhatsAppTelefono"><img src='{{ asset("img/WhatsApp.png") }}' alt="" class="h-5"> Descargar Cuenta</button>
                    <button class="text-base py-2 px-5 bg-green-600 hover:bg-green-700 text-gray-50 rounded-lg w-full md:w-auto flex gap-2 items-center justify-center md:hidden" id="btnEnviarCuentaWhatsAppTelefonoAbrir"><img src='{{ asset("img/WhatsApp.png") }}' alt="" class="h-5"> Ir a WhatsApp</button>
                    <div class="w-full md:w-56">
                        <div class="flex items-center">
                            <button class="flex p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg"	width="30"	height="20">
                                    <path fill="#D91023" d="m0,0h30v20H0"/>
                                    <path fill="#FFF" d="m10,0h10v20H10"/>
                                    </svg> +51
                            </button>
                            <div class="relative w-full">
                                <input type="text" id="phoneInput" class="validarEntradasDeCelular block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="987-654-321"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-end py-1 rounded-xl px-1 gap-4">
                    <button class="text-base py-2 px-5 bg-red-600 md:max-w-xs w-full hover:bg-red-700 text-gray-50 rounded-lg md:w-auto font-semibold" id="btnAgregarDiferencia">Agregar Diferencia</button>
                    <button class="text-base py-2 px-5 bg-blue-600 md:max-w-xs w-full hover:bg-blue-700 text-gray-50 rounded-lg md:w-auto font-semibold" id="btnCambiarPrecioPesadas">S/ Cambiar Precios</button>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="flex overflow-auto p-1">
            <div class="relative rounded-lg md:mb-5 border-2" id="hmtlCapture">
                <h2 id="cuentaClienteNombre" class="py-5 text-2xl font-bold text-center bg-[#92D14E] text-black border-b-2 border-black"></h2>
                <div class="flex justify-center items-start">
                    <table class="border-collapse w-full text-black select-none relative text-sm" id="tablaCuentaDelCliente">
                        <thead id="headerCuentaDelCliente" class="bg-[#92D14E] text-black">
                            <tr class="h-8 bg-white">
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2"></th>
                            </tr>
                            <tr class="h-10 bg-white">
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 bg-white"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-black bg-white"></th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-t-2 border-black" colspan="4">VENTA</th>
                            </tr>
                            <tr class="h-10">
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-t-2 border-black w-[90px]">DIA</th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-black w-[200px]">REPRESENTACIÓN</th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-black w-[150px]">UNIDADES</th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-black w-[150px]">PESO</th>
                                <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 border-black w-[150px]">PRECIO</th>
                                <th class="px-4 font-bold whitespace-nowrap border-b-2 border-r-2 border-black w-[150px]">IMPORTE</th>
                            </tr>
                        </thead>
                        <tbody id="bodyCuentaDelCliente" class="font-semibold">
                            <tr class="rounded-lg border-b-2 border-black bg-white"><td colspan="7" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                    <table class="border-collapse text-black select-none relative text-sm" id="tablaCuentaDelCliente">
                        <thead id="headerCuentaDelCliente" class="bg-[#FEFF01] text-black">
                            <tr class="h-8 bg-white">
                                <th class="px-4 font-bold whitespace-nowrap border-r-2"></th>
                                <th class="px-4 font-bold whitespace-nowrap"></th>
                            </tr>
                            <tr class="h-10 bg-white">
                                <th class="px-4 font-bold whitespace-nowrap border-b-2 border-t-2 border-r-2 border-black">COBRANZA</th>
                                <th class="px-4 font-bold whitespace-nowrap border-t-2"></th>
                            </tr>
                            <tr class="h-10">
                                <th class="px-4 bg-[#92D14E] font-bold whitespace-nowrap border-b-2 border-t-2 border-r-2 border-black">ABONO</th>
                                <th class="px-4 font-bold whitespace-nowrap border-b-2 border-t-2 border-black">SALDO ANTERIOR</th>
                            </tr>
                        </thead>
                        <tbody id="bodyCuentaDelClientePagos" class="font-semibold">
                            <tr class="rounded-lg border-b-2 border-black bg-white"><td colspan="2" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
                <div id="mensajeDeuda" class="py-5 bg-white">
                        
                </div>
            </div>
        </div>
        {{-- Termina contenedor Cuenta de Cliente --}}
    </div>
</main>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalCambiarPrecioPesada">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cambiar Precio Pesadas</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        {{-- <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCambiarPrecioPesadaCliente" autocomplete="off" id="idCambiarPrecioPesadaCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliCambiarPrecioPesada" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesCambiarPrecioPesada" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div> --}}
                        {{-- Inicia contenedor filtrar clientes modales --}}
                        <div class="relative flex w-full justify-center max-w-xs">
                            <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </div>
                            <div class="w-full relative">
                                <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado2">
                                <div class="relative w-full h-10 text-sm">
                                    <input
                                      class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                                      placeholder=" " id="inputNombreClientes2" autocomplete="off"/><label
                                      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                                    </label>
                                  </div>
                                <div id="contenedorDeClientes2" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                            </div>
                            <div id="clienteSeleccionadoCorrecto2" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                                <i class='bx bx-check text-xl'></i>
                            </div>
                        </div>
                        {{-- Termina contenedor filtrar clientes modales --}}
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full md:w-80" id="fechaCambiarPrecioPesada">
                        {{-- <select class="h-10 w-full md:w-80 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especiesCambioPrecioPesadas" id="especiesCambioPrecioPesadas">
                        </select> 
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <b>S/</b>
                            </span>
                            <input class="validarSoloNumerosDosDecimales max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nuevoPrecioCambiarPesadas" autocomplete="off" id="nuevoPrecioCambiarPesadas" placeholder="Ingrese Nuevo Precio">
                        </div> --}}
                        <div class="overflow-auto w-full">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-l-2 border-t-2 border-r-2 border-b-2 whitespace-nowrap">Nombre de Especie</th>
                                        <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Nuevo Precio</th>
                                        <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap hidden">Id Especie</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyCambiarPreciosExcel">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnCambiarPrecioPesada">Cambiar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalCambiarPrecioPesada">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal Agregar Descuento --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarDescuentoCliente">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Diferencia</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarDescuentoCliente">
                        {{-- <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarDescuentoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarDescuentoCliente" autocomplete="off" id="idAgregarDescuentoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarDescuentoCliente" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarDescuentoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div> --}}
                        {{-- Inicia contenedor filtrar clientes modales 2 --}}
                        <div class="relative flex w-full justify-center">
                            <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </div>
                            <div class="w-full relative">
                                <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado3">
                                <div class="relative w-full h-10 text-sm">
                                    <input
                                      class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                                      placeholder=" " id="inputNombreClientes3" autocomplete="off"/><label
                                      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                                    </label>
                                  </div>
                                <div id="contenedorDeClientes3" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                            </div>
                            <div id="clienteSeleccionadoCorrecto3" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                                <i class='bx bx-check text-xl'></i>
                            </div>
                        </div>
                        {{-- Termina contenedor filtrar clientes modales 2 --}}
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarDescuento" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarDescuento">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Presentación</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="presentacionAgregarDescuentoCliente" id="presentacionAgregarDescuentoCliente">

                            </select>                          
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Descuento Kg.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarDescuentoCliente" placeholder="0.0" autocomplete="off" id="valorAgregarDescuentoCliente" value="">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioDescuento" autocomplete="off" id="valorPrecioDescuento" value="" placeholder="0.0">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarDescuentoCliente" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarDescuentoCliente" autocomplete="off" id="comentarioAgregarDescuentoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarDescuentoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarDescuentoCliente">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Descuento --}}

@endsection