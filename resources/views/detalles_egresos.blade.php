@vite(['resources/js/detalles_egresos.js'])
@extends('aside')
@section('titulo', 'Detalles Egresos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Agregar Saldo --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Detalles Egresos</h4>
        <div class="w-full md:px-5 md:pb-5">
            {{-- Inicia contenedor filtrar clientes --}}
            {{-- <div class="flex flex-col gap-2">
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
                                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                            </label>
                            </div>
                        <div id="contenedorDeClientes" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                    </div>
                    <div id="clienteSeleccionadoCorrecto" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                        <i class='bx bx-check text-xl'></i>
                    </div>
                </div>
            </div> --}}
            {{-- Termina contenedor filtrar clientes --}}
            <div class="flex flex-col gap-2">
                <label class="font-semibold text-gray-800 dark:text-white">Categoria :</label>
                <div class="relative flex w-full">
                    <button
                        class="select-none md:min-w-min min-w-full rounded-lg bg-blue-600 py-2.5 px-6 text-center align-middle font-sans text-xs font-semibold uppercase text-white transition-all focus:opacity-[0.85] active:opacity-[0.85]"
                        type="button" id="agregarCategoriaBtn"
                    ><i class="fa-solid fa-layer-group"></i>&nbsp;&nbsp;Agregar Categoria
                    </button>
                </div>
            </div>
            <hr class="md:my-5 my-4">
            <div class="flex flex-col gap-3 md:flex-row justify-between items-end">
                <div class="md:min-w-min min-w-full">
                    <div class="flex flex-col md:flex-row gap-3 justify-center items-end">
                        <div class="flex flex-col w-full md:w-auto justify-center">
                            <label for="fechaFiltrarDetallesEgresos" class="text-base text-gray-900 dark:text-gray-50">Fecha :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaFiltrarDetallesEgresos">
                        </div>
                        <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarDetallesEgresos"><i class='bx bx-search-alt'></i> Buscar</button>
                    </div>
                </div>
                <div class="relative w-full md:w-auto">
                    <button
                        class="select-none rounded-lg bg-red-600 py-2.5 px-6 text-center align-middle font-sans text-xs font-semibold uppercase text-white transition-all focus:opacity-[0.85] active:opacity-[0.85] w-full md:w-auto"
                        type="button" id="agregarEgresoBtn"
                    ><i class="fa-solid fa-table"></i>&nbsp;&nbsp;Agregar Egreso
                    </button>
                </div>
            </div>
            <div class="w-full overflow-auto mt-5">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 tbodyLimpiar">
                    <caption class="bg-red-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Egresos sin Clasificar</caption>
                    <thead class="text-xs text-gray-100 uppercase bg-red-600 sticky top-0">
                        <tr>
                            <th class="px-2 py-4 text-center">Fecha</th>
                            <th class="px-2 py-4 text-center">Hora</th>
                            <th class="px-2 py-4 text-center">Uso de Egreso</th>
                            <th class="px-2 py-4 text-center">Cantidad</th>
                            <th class="px-2 py-4 text-center">Precio</th>
                            <th class="px-2 py-4 text-center">Monto</th>
                            <th class="px-2 py-4 text-center">Observación</th>
                            <th class="px-2 py-4 text-center hidden">Categoria</th>
                        </tr>
                    </thead>
                    <tbody id="bodyCategoriaSinClasificar">
                    </tbody>
                </table>
            </div>
            <div id="contenedorCategoriasEgresos" class="mt-5 flex flex-col gap-8">

            </div>
        </div>
    </div>
</main>
<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalCrearCategoria">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Crear Categoria</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <p class="text-sm text-gray-300">Ingrese nombre de categoria.</p>
                        <input class="convertirTextoEnMayusculasED p-2 rounded-lg text-base outline-none border-none text-center" type="text" id="inputNuevaCategoria" autocomplete="off" placeholder="Ingrese nombre">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnCrearCategoria">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalCrearCategoria">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarEgreso">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all md:max-w-3xl w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Egreso</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarEgreso" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarEgreso">
                        </div>
                        {{-- <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="horaAgregarEgreso" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarEgreso">
                        </div> --}}
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Categoria</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="selectAgregarCategoria" id="selectAgregarCategoria">
    
                            </select>                          
                        </div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table class="w-full text-sm text-left rtl:text-right border-collapse text-gray-500 dark:text-gray-400" id="tablaAgregarEgreso">
                                <thead class="text-xs uppercase bg-blue-600 text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Hora
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Uso Egreso
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Cantidad
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Precio
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Monto
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Observación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDePagosExcelEgreso">

                                </tbody>
                            </table>
                            <table class="w-full text-sm text-left rtl:text-right border-collapse text-gray-500 dark:text-gray-400 hidden" id="tablaAgregarEgresoPlanilla">
                                <thead class="text-xs uppercase bg-blue-600 text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            N°
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Hora
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Uso Egreso
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Cargo
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Monto
                                        </th>
                                        <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                            Observación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="bodyReporteDePagosExcelEgresoPlanilla">

                                </tbody>
                            </table>
                        </div>
                        {{-- <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="usoAgregarEgreso" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="w-full autocompleteEgresosCajaChica uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="usoAgregarEgreso" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div class="flex gap-4 w-full">
                                <div class="flex flex-col text-sm w-full">
                                    <label for="cantidadAgregarEgreso" class="text-gray-900 dark:text-white font-medium">Cantidad :</label>
                                    <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full accionarSumaMonto" id="cantidadAgregarEgreso" autocomplete="off">
                                </div>
                                <div class="flex flex-col text-sm w-full">
                                    <label for="precioAgregarEgreso" class="text-gray-900 dark:text-white font-medium">Precio :</label>
                                    <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full accionarSumaMonto" id="precioAgregarEgreso" autocomplete="off">
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full flex-col text-sm">
                            <label for="montoAgregarEgreso" class="text-gray-900 dark:text-white font-medium">Monto</label>
                            <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="montoAgregarEgreso" disabled="disabled">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarEgreso" class="mb-2 w-full whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white md:w-24">Observación :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="comentarioAgregarEgreso"></textarea>
                        </div> --}}
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarEgreso">Registrar</button>
                    <button type="button" class="w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto hidden" id="btnAgregarEgresoPlanilla">Registrar Planilla</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarEgreso">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarEgresoEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Egreso</h3>
                    </div>
                    <input type="text" class="hidden" id="idDetalleEgreso" value="0">
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarEgresoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarEgresoEditar">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="horaAgregarEgresoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarEgresoEditar">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Categoria</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="selectAgregarCategoria" id="selectAgregarCategoriaEditar">
    
                            </select>                          
                        </div>
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="usoAgregarEgresoEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="usoAgregarEgresoEditar" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full" id="ocultarSiPlanilla">
                            <div class="flex gap-4 w-full">
                                <div class="flex flex-col text-sm w-full">
                                    <label for="cantidadAgregarEgresoEditar" class="text-gray-900 dark:text-white font-medium">Cantidad :</label>
                                    <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full accionarSumaMontoEditar" id="cantidadAgregarEgresoEditar" autocomplete="off">
                                </div>
                                <div class="flex flex-col text-sm w-full">
                                    <label for="precioAgregarEgresoEditar" class="text-gray-900 dark:text-white font-medium">Precio :</label>
                                    <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full accionarSumaMontoEditar" id="precioAgregarEgresoEditar" autocomplete="off">
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center items-start flex-col relative w-full h-full" id="mostrarSiPlanilla">
                            <label for="usoAgregarEgresoEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cargo :</label>
                            <select id="selectEditarEgresoPlanilla" class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="PELADOR">PELADOR</option>
                                <option value="ESTIBADOR">ESTIBADOR</option>
                            </select>
                        </div>
                        <div class="flex w-full flex-col text-sm">
                            <label for="montoAgregarEgresoEditar" class="text-gray-900 dark:text-white font-medium">Monto</label>
                            <input type="text" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="montoAgregarEgresoEditar" disabled="disabled">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarEgresoEditar" class="mb-2 w-full whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white md:w-24">Observación :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="comentarioAgregarEgresoEditar"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarEgresoEditar">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarEgresoEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
