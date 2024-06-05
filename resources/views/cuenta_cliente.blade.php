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
        {{-- Segundo Contenedor Reporte Pagos --}}
        <div class="overflow-x-auto mt-0 mb-5 relative">
            <div class="flex flex-col gap-5">
                <div class="flex justify-center items-start flex-col relative">
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
                </div>
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
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg md:mb-5 border-2 bg-white dark:bg-gray-800" id="hmtlCapture">
            <h2 id="cuentaClienteNombre" class="py-5 text-xl font-bold text-center bg-blue-600 text-gray-50 border-b-2"></h2>
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelCliente">
                <thead id="headerCuentaDelCliente" class="bg-blue-600 text-gray-50">
                    <tr class="h-10">
                        <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 dark:border-gray-300">DIA</th>
                        <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 dark:border-gray-300">PRESENTACIÓN</th>
                        <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 dark:border-gray-300">UNIDADES</th>
                        <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 dark:border-gray-300">PESO</th>
                        <th class="px-4 font-bold whitespace-nowrap border-r-2 border-b-2 dark:border-gray-300">PRECIO</th>
                        <th class="px-4 font-bold whitespace-nowrap border-b-2 dark:border-gray-300">TOTAL</th>
                    </tr>
                </thead>
                <tbody id="bodyCuentaDelCliente">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
            <div id="mensajeDeuda" class="py-5">
                    
            </div>
        </div>
        {{-- Termina contenedor Cuenta de Cliente --}}
    </div>
</main>
@endsection