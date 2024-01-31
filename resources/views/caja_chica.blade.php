@vite(['resources/js/caja_chica.js'])
@extends('aside')
@section('titulo', 'Caja Chica')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Caja Chica</h4>
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id=""><i class='bx bx-plus-medical text-lg'></i><h5 class="min-w-max">Registrar Ingreso</h5></button>
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-700" type="submit" autocomplete="off" id=""><i class='bx bx-minus text-lg'></i><h5 class="min-w-max">Registrar Egreso</h5></button>
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
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4 whitespace-nowrap">Uso Egreso</th>
                            <th class="p-4 text-center whitespace-nowrap">Importe</th>
                            <th class="p-4 text-center whitespace-nowrap">Forma Pago</th>
                            <th class="p-4 text-center whitespace-nowrap">Codigo</th>
                            <th class="p-4 text-center whitespace-nowrap">Fecha</th>
                            <th class="p-4 text-center whitespace-nowrap">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteDePagos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
@endsection