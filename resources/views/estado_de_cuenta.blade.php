@vite(['resources/js/reporte_de_pagos_cuenta_cliente.js'])
@extends('aside')
@section('titulo', 'Estado de Cuenta')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte de Pagos --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Estado de Cuenta</h4>
        </div>
        <div class="md:mx-5 mt-0 mb-5 relative">
            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label for="inputNombreClientes" class="font-semibold text-gray-800 dark:text-white">Cliente :</label>
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
                                  class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Proveedor
                                </label>
                              </div>
                            <div id="contenedorDeClientes" class="w-full z-50 max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                        </div>
                        <div id="clienteSeleccionadoCorrecto" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                            <i class='bx bx-check text-xl'></i>
                        </div>
                    </div>
                </div>
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex-col justify-center hidden">
                        <label for="fechaDesdeCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCuentaDelCliente">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCuentaDelCliente">
                    </div>
                    <div class=" flex items-end">
                        <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                    </div>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelCliente">
                <thead id="headerCuentaDelCliente" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="px-4 font-medium whitespace-nowrap">N° GUIA</th>
                        <th class="px-4 font-medium whitespace-nowrap">PRESENTACIÓN</th>
                        <th class="px-4 font-medium whitespace-nowrap">CANTIDAD</th>
                        <th class="px-4 font-medium whitespace-nowrap">PESO NETO</th>
                        <th class="px-4 font-medium whitespace-nowrap">PROMEDIO</th>
                        <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                        <th class="px-4 font-medium whitespace-nowrap">TOTAL</th>
                    </tr>
                </thead>
                <tbody id="bodyCuentaDelCliente">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalCambiarPrecioPesada">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cambiar Precio Pesadas</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCambiarPrecioPesadaCliente" autocomplete="off" id="idCambiarPrecioPesadaCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliCambiarPrecioPesada" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesCambiarPrecioPesada" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full md:w-80" id="fechaCambiarPrecioPesada">
                        <select class="h-10 w-full md:w-80 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especiesCambioPrecioPesadas" id="especiesCambioPrecioPesadas">
                        </select> 
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <b>S/</b>
                            </span>
                            <input class="validarSoloNumerosDosDecimales max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nuevoPrecioCambiarPesadas" autocomplete="off" id="nuevoPrecioCambiarPesadas" placeholder="Ingrese Nuevo Precio">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnCambiarPrecioPesada">Cambiar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalCambiarPrecioPesada">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection