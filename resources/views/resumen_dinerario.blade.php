@vite(['resources/js/resumen_dinerario.js'])
@extends('aside')
@section('titulo', 'Resumen Dinerario')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Resumen Dinerario --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Resumen Dinerario</h4>
            <div class="flex w-full lg:max-w-xs md:px-5">
                <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input
                    class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text" name="filtrarClienteAgregarSaldo" autocomplete="off" id="filtrarClienteAgregarSaldo"
                    placeholder="Ingrese Nombre de Cliente">
            </div>
            <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row mt-5 md:mx-5">
                <div class="flex flex-col justify-center">
                    <label for="fechaSaldoDelCliente" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaSaldoDelCliente">
                </div>
                <div class=" flex items-end">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarSaldoDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                </div>
            </div>
            <div class="flex items-center justify-end py-1 rounded-xl px-1 gap-4 md:mx-5">
                <button class="text-base py-2 px-5 bg-blue-600 md:max-w-xs w-full hover:bg-blue-700 text-gray-50 rounded-lg md:w-auto font-semibold" id="btnRegularSaldos">Regular Saldo</button>
            </div>
            <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:m-5 mt-5">
                
            </div>
            {{-- Termina contenedor Agregar Saldo --}}
        </div>
    </main>
@endsection
