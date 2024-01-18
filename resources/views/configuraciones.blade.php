@vite(['resources/js/configuraciones.js'])
@extends('aside')
@section('titulo', 'Pedidos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Configuraciones --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Programación de Pedidos</h4>
        {{-- Termina contenedor Configuraciones --}}
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrarPedidoCliente"><i class='bx bxs-user-detail text-lg'></i><h5 class="min-w-max">Agregar Pedido</h5></button>
            <div class="flex flex-col justify-center">
                <label for="fechaProgramacionPedidos" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                <div class="flex gap-2">
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaProgramacionPedidos">
                    <i class='bx bx-search-alt'></i>
                </div>
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
                            <th class="p-4 text-center whitespace-nowrap">Tecnico Vivo</th>
                            <th class="p-4 text-center whitespace-nowrap">Tecnico Pelado</th>
                            <th class="p-4 text-center whitespace-nowrap">Gallina Doble</th>
                            <th class="p-4 text-center whitespace-nowrap">Gallina Chica</th>
                            <th class="p-4 text-center whitespace-nowrap">Gallo</th>
                            <th class="p-4 text-center whitespace-nowrap">Pollo XX</th>
                            <th class="p-4 text-center whitespace-nowrap">Brasa Yugo</th>
                            <th class="p-4 text-center whitespace-nowrap">Brasa Tecnico</th>
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
@endsection