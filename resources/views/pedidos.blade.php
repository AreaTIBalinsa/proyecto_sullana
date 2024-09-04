@vite(['resources/js/pedidos.js'])
@extends('aside')
@section('titulo', 'Pedidos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Pedidos --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 pt-5">Pedidos</h4>
        {{-- <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <div class="flex gap-2 w-full md:w-auto">
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="traerPedidosAnteriores"><i class='bx bx-list-ul text-lg'></i><h5 class="min-w-max">Traer Pedidos</h5></button>
            </div>
        </div>
        <hr class="md:mx-5"> --}}
        <div class="flex justify-between items-center gap-4 flex-wrap my-5 md:px-5">
            <div class="flex w-full md:max-w-xs">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="md:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClientePedidos" autocomplete="off" id="filtrarClientePedidos" placeholder="Ingrese Nombre de Cliente">
            </div>
            <div class="flex gap-2 w-full md:w-auto">
                <input type="date" class="w-full md:w-auto outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaBuscarPedidos">
                <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrarPedidosFecha"><i class='bx bx-search-alt text-lg'></i></button>
            </div>
        </div>
        <div class="relative overflow-auto max-h-[500px] aside_scrollED shadow-md rounded-lg md:mx-5 mb-5">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaPedidos">
                <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="headerPedidos">
                    <tr>
                        <th class="hidden">Id</th>
                        <th class="px-2 py-4 text-center">Nombre de Cliente</th>
                        <th class="px-2 py-4 text-center">Yugo Vivo</th>
                        <th class="px-2 py-4 text-center">Yugo Pelado</th>
                        <th class="px-2 py-4 text-center">Brasa Yugo</th>
                        <th class="px-2 py-4 text-center">Tecnica Vivo</th>
                        <th class="px-2 py-4 text-center">Tecnica Pelado</th>
                        <th class="px-2 py-4 text-center">Brasa Tecnica</th>
                        <th class="px-2 py-4 text-center">Pollo XX Pelado</th>
                        <th class="px-2 py-4 text-center">Pollo XX Vivo</th>
                        <th class="px-2 py-4 text-center">Gallina Doble Pelado</th>
                        <th class="px-2 py-4 text-center">Gallina Doble Vivo</th>
                        <th class="px-2 py-4 text-center">Gallo Pelado</th>
                        <th class="px-2 py-4 text-center">Gallo Vivo</th>
                        <th class="px-2 py-4 text-center">Gallina Chica Pelado</th>
                        <th class="px-2 py-4 text-center">Gallina Chica Vivo</th>
                        <th class="px-2 py-4 text-center whitespace-nowrap">TOTAL</th>
                        <th class="px-2 py-4 text-center">Comentario</th>
                        <th class="hidden">Fecha</th>
                        <th class="hidden">Codigo de Cliente</th>
                    </tr>
                </thead>
                <tbody id="bodyPedidos" class="text-gray-900 dark:text-white">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="17" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- <div class="mt-5 ml-5 flex gap-10 flex-wrap items-start justify-start">
            <table class="mb-2">
                <caption class="bg-blue-600 text-gray-50 p-2 font-bold text-lg rounded-t-lg border-x-2 border-t-2 z-50">TOTALES</caption>
                <thead class="bg-blue-600 text-gray-50 uppercase z-50 text-sm">
                    <tr>
                        <th class="bg-blue-600 border-2 px-2 py-1 text-left">VARIEDAD</th>
                        <th class="bg-blue-600 border-2 px-2 py-1">CANTIDAD</th>
                        <th class="bg-blue-600 border-2 px-2 py-1">PESO</th>
                    </tr>
                </thead>
                <tbody id="bodyReporteAcumuladoExcelStockPollos" class="text-gray-900 dark:text-gray-50 ">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="4" class="text-center border-2">No hay datos</td></tr>
                </tbody>
            </table>
        </div> --}}
        <div class="w-full md:max-w-xs md:mx-5">
            <table class="mb-2">
                <caption class="bg-yellow-400 text-gray-50 p-2 font-bold text-lg rounded-t-lg border-x-2 border-t-2 z-50">POR REPARTIR</caption>
                <thead class="bg-yellow-400 text-gray-50 uppercase z-50 text-sm">
                    <tr>
                        <th class="bg-red-600 border-2 px-2 py-1 text-left">VARIEDAD</th>
                        <th class="bg-blue-600 border-2 px-2 py-1">PELADO</th>
                        <th class="bg-blue-600 border-2 px-2 py-1">VIVO</th>
                        <th class="bg-green-600 border-2 px-2 py-1">TOTAL</th>
                    </tr>
                </thead>
                <tbody id="bodyReporteTotalPedidos" class="text-gray-900 dark:text-gray-50 ">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="4" class="text-center border-2">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalTraerPedido">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="rounded-lg max-h-[100%] aside_scrollED overflow-y-auto bg-white dark:bg-gray-700 text-left shadow-xl transform transition-all max-w-lg w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Traer Pedido</h3>
                    </div>
                    <div class="flex justify-center items-center flex-col gap-4 mt-4" id="divTraerPedidos">
                        <div class="flex justify-start items-end gap-2 w-full">
                            <div class="w-full justify-center items-start gap-2 flex-col">
                                <label for="fechaTraerPedido" class="text-sm font-medium text-gray-900 dark:text-white md:w-24 whitespace-nowrap">Traer Pedidos :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaTraerPedido">
                            </div>
                            <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrarTraerPedidosFecha">Buscar <i class='bx bx-search-alt text-lg'></i></button>
                        </div>
                        <div class="w-full">
                            <h4 class="text-sm font-medium text-gray-900 dark:text-white md:w-24 whitespace-nowrap">Se encontraron : <span id="cantidadRegistrosPedidos">0 registros.</span></h4>
                        </div>
                        <div class="flex justify-start items-end gap-2 w-full">
                            <div class="w-full justify-center items-start gap-2 flex-col">
                                <label for="fechaRegistrarPedidoADia" class="text-sm font-medium text-gray-900 dark:text-white md:w-24 whitespace-nowrap">Registrar Pedidos a Dia :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaRegistrarPedidoADia">
                            </div>
                            <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="btnFechaRegistrarPedidoADia">Revisar <i class='bx bx-revision text-lg'></i></button>
                        </div>
                        <div class="w-full">
                            <h4 class="text-sm font-medium text-gray-900 dark:text-white md:w-24 whitespace-nowrap">Se registraran : <span id="cantidadRegistrosRegistrar">0 pedidos.</span></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnTraerPedido">Registrar <i class='bx bx-plus-circle'></i></button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalTraerPedido">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection