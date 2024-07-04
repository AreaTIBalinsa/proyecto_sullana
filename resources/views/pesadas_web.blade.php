@vite(['resources/js/pesadas_web.js'])
@extends('aside')
@section('titulo', 'Agregar Pesadas Web')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Pesadas Web --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Agregar Pesadas Web</h4>
            <div class="md:mx-5">
                <div class="overflow-x-auto mt-0 mb-5 relative">
                    <div class="flex w-full justify-between items-end gap-5 flex-wrap relative">
                        <div class="flex justify-center items-start flex-col relative overflow-hidden">
                            <label for="idCuentaDelCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-56 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCuentaDelCliente" autocomplete="off" id="idCuentaDelCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliCuentaDelCliente" class="hidden" value=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesCuentaDelCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto relative max-h-40 z-[1000] text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-5 w-full flex justify-between items-end flex-wrap gap-4">
                    <div class="flex flex-col gap-1 w-full md:w-auto">
                        <label for="presentacionAgregarPesadas" class="text-sm font-medium text-gray-900 dark:text-white md:w-24">Especie :</label>
                        <select class="md:w-56 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="presentacionAgregarPesadas">
                        </select>
                    </div>
                    <div class="md:w-56 w-full">
                        <button class="border-2 w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel4"><i class='bx bx-save text-lg'></i>Guardar Pesadas</button>
                    </div>
                </div>
                <div class="overflow-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="p-4 whitespace-nowrap text-center text-gray-100 uppercase bg-blue-600 border-2 font-bold">PESADAS A AGREGAR</caption>
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                            <tr>
                                <th class="p-4 border-r-2 border-b-2 border-l-2 text-center whitespace-nowrap">Fecha</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Especie</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Cantidad</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Peso Bruto</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Peso Jabas</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Precio</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePesadasExcel">
                        </tbody>
                    </table>
                </div>
            </div>
            <hr class="my-5 md:mx-5">
            <div class="md:mx-5 md:mb-5">
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdePesadas" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdePesadas">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaPesadas" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaPesadas">
                    </div>
                    <div class=" flex items-end">
                        <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                    </div>
                </div>
                <div class="overflow-auto mt-5">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                            <tr>
                                <th class="hidden">Id</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                <th class="p-4 border-r-2 border-t-2 border-l-2 border-b-2 text-center whitespace-nowrap">Nombre Cliente</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Especie</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Promedio</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Cantidad</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Peso Bruto</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Peso Jabas</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Peso Neto</th>
                                <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Precio</th>
                                <th class="p-4 border-2 border-t-2 text-center whitespace-nowrap">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePesadas">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="10" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
@endsection
