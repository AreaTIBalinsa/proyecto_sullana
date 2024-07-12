@vite(['resources/js/detalles_ingresos.js'])
@extends('aside')
@section('titulo', 'Detalles Ingresos')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Agregar Saldo --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Detalles Ingresos</h4>
            <div class="w-full md:mx-5 md:mb-5">
                {{-- Inicia contenedor filtrar clientes --}}
                <div class="flex flex-col gap-2">
                    <label for="inputNombreClientes" class="font-semibold text-gray-800">Cliente :</label>
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
            </div>
        </div>
    </main>
@endsection
