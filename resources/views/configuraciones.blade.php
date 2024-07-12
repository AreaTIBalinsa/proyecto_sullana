@vite(['resources/js/configuraciones.js'])
@extends('aside')
@section('titulo', 'Pedidos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Configuraciones --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Programación de Pedidos</h4>
        {{-- Termina contenedor Configuraciones --}}
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrarPedidoCliente"><i class='bx bxs-user-detail text-lg'></i><h5 class="min-w-max">Agregar Pedido</h5></button>
            <div class="flex flex-col justify-center w-full md:w-auto">
                <label for="fechaProgramacionPedidos" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                <div class="flex gap-2 items-center">
                    <input type="date" class="w-full md:w-auto outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaProgramacionPedidos">
                    <i class='bx bx-search-alt dark:text-white text-gray-900 bg-blue-600 p-2.5 rounded-lg cursor-pointer hover:bg-blue-700' id="btnBuscarPedidos"></i>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center relative flex-col gap-4 md:mx-5 lg:flex-row mb-5">
            <div class="flex w-full lg:max-w-xs">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarClientePedido" placeholder="Ingrese Nombre de Cliente">
            </div>
        </div>
        <div class="md:m-5 mt-0">
            <div class="relative overflow-auto max-h-[500px] aside_scrollED rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4 whitespace-nowrap">Nombre de Cliente</th>
                            <th class="p-4 text-center whitespace-nowrap">Yugo Vivo</th>
                            <th class="p-4 text-center whitespace-nowrap">Yugo Pelado</th>
                            <th class="p-4 text-center whitespace-nowrap">Tecnica Vivo</th>
                            <th class="p-4 text-center whitespace-nowrap">Tecnica Pelado</th>
                            <th class="p-4 text-center whitespace-nowrap">Gallina Doble</th>
                            <th class="p-4 text-center whitespace-nowrap">Ahogados</th>
                            <th class="p-4 text-center whitespace-nowrap">Gallo</th>
                            <th class="p-4 text-center whitespace-nowrap">Pollo XX</th>
                            <th class="p-4 text-center whitespace-nowrap">Brasa Yugo</th>
                            <th class="p-4 text-center whitespace-nowrap">Brasa Tecnica</th>
                        </tr>
                    </thead>
                    <tbody id="bodyProgramacionPedidos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="12" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>
</main>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalRegistrarPedido">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Registrar Pedido</h3>
                    </div>
                    <div class="mt-4 px-4 flex justify-center items-center flex-col gap-4" id="divRegistrarPedidoCliente">
                        <div class="flex justify-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="idRegistrarPedidoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoRegistrarPedido" class="hidden" value="0"></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesRegistrarPedido" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-4 px-4">
                        <input type="date" class="max-w-xs w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaProgramacionPedidosModal">
                    </div>
                    <div class="flex mt-4 px-4">
                        <select class="max-w-xs w-full h-10 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="selectEspecieAgregarPedido">
                            
                        </select>
                    </div>
                    <div id="contenedorDeEspeciesPedidos" class="contenedorDeEspeciesPedidos flex flex-col items-center w-full max-h-60 overflow-y-scroll aside_scrollED overflow-x-hidden mt-4">
                        <div class="hidden flex-col justify-center px-4 w-full" id="divPedidoYugoVivo">
                            <span class="text-base text-gray-900 dark:text-gray-50">Yugo Vivo :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadYugoVivo" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoYugoPelado">
                            <span class="text-base text-gray-900 dark:text-gray-50">Yugo Pelado :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadYugoPelado" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoTecnicoVivo">
                            <span class="text-base text-gray-900 dark:text-gray-50">Tecnica Vivo :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadTecnicoVivo" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoTecnicoPelado">
                            <span class="text-base text-gray-900 dark:text-gray-50">Tecnica Pelado :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadTecnicoPelado" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoGallinaDoble">
                            <span class="text-base text-gray-900 dark:text-gray-50">Gallina Doble :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadGallinaDoble" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoGallinaChica">
                            <span class="text-base text-gray-900 dark:text-gray-50">Ahogados :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadGallinaChica" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoGallo">
                            <span class="text-base text-gray-900 dark:text-gray-50">Gallo :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadGallo" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoPolloXX">
                            <span class="text-base text-gray-900 dark:text-gray-50">Pollo XX :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadPolloXX" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoBrasaYugo">
                            <span class="text-base text-gray-900 dark:text-gray-50">Brasa Yugo :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadBrasaYugo" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="hidden flex-col justify-center px-4 w-full mt-2" id="divPedidoBrasaTecnico">
                            <span class="text-base text-gray-900 dark:text-gray-50">Brasa Tecnica :</span>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="inputCantidadBrasaTecnico" placeholder="Ingrese Cantidad">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnRegistrarPedido">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarPedido">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection