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
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarResumenDinerario"><i class='bx bx-search-alt'></i> Buscar</button>
                </div>
            </div>
            <div class="relative rounded-lg overflow-auto aside_scrollED md:m-5 mt-5">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <caption class="bg-green-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100 uppercase">Ingresos</caption>
                    <thead class="text-xs uppercase bg-green-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left border-b-2 whitespace-nowrap border-r-2" colspan="2">
                                Ingreso
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Importe
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 uppercase hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDeResumenDinerario">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="3" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="relative rounded-lg overflow-auto aside_scrollED md:m-5 mt-5">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <caption class="bg-red-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100 uppercase">Egresos</caption>
                    <thead class="text-xs uppercase bg-red-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left border-b-2 whitespace-nowrap border-r-2">
                                Egreso
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Importe
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 uppercase hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDeResumenDinerarioEgresos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="2" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="relative rounded-lg overflow-auto aside_scrollED md:m-5 mt-5">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <caption class="bg-blue-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100 uppercase">Guias Proveedores</caption>
                    <thead class="text-xs uppercase bg-blue-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left border-b-2 whitespace-nowrap border-r-2">
                                Egreso
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Importe
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 uppercase hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDeResumenDinerarioProveedores">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="2" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            {{-- Termina contenedor Agregar Saldo --}}
            <div class="relative rounded-lg overflow-auto aside_scrollED md:mb-5 md:mx-5 whitespace-nowrap flex justify-center items-center" id="resultadoResumenDinerario">

            </div>
            <div class="flex gap-x-24 gap-4 w-full flex-col mt-5 md:flex-row md:mx-5">
                <div class="flex flex-col justify-center">
                    <label for="fechaFiltrarResumenDinerarioTripaDesde" class="text-base text-gray-900 dark:text-gray-50">Fecha Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaFiltrarResumenDinerarioTripaDesde">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaFiltrarResumenDinerarioTripaHasta" class="text-base text-gray-900 dark:text-gray-50">Fecha Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaFiltrarResumenDinerarioTripaHasta">
                </div>
                <div class=" flex items-end">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarResumenDinerarioTripa"><i class='bx bx-search-alt'></i> Buscar</button>
                </div>
            </div>
            <div class="relative rounded-lg overflow-auto aside_scrollED md:m-5 mt-5">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <caption class="bg-orange-500 p-2 w-full border-b-2 text-sm font-bold text-gray-100 uppercase">Control de Tripa</caption>
                    <thead class="text-xs uppercase bg-orange-500 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left border-b-2 whitespace-nowrap border-r-2">
                                Fecha
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap border-r-2">
                                Uso Egreso
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Monto
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 uppercase hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDeResumenDinerarioControlTripa">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="3" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
@endsection
