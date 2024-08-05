@vite(['resources/js/resumen_dinerario.js'])
@extends('aside')
@section('titulo', 'Resumen Dinerario')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Resumen Dinerario --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Resumen Dinerario</h4>
            <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row md:mx-5">
                <div class="flex flex-col justify-center">
                    <label for="fechaFiltrarResumenDinerario" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaFiltrarResumenDinerario">
                </div>
                <div class=" flex items-end">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarSaldoDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                </div>
            </div>
            <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:m-5 mt-5">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <caption class="bg-blue-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Resumen Dinerario</caption>
                    <thead class="text-xs uppercase bg-blue-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap border-r-2">
                                Ingreso
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Importe
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDeResumenDinerario">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            {{-- Termina contenedor Agregar Saldo --}}
        </div>
    </main>
@endsection
