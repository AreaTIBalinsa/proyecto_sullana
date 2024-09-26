@vite(['resources/js/pesadas_web_merma.js'])
@extends('aside')
@section('titulo', 'Agregar Pesadas Web')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Pesadas Web --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Agregar Pesadas Web</h4>
            <div class="md:mx-5">
                {{-- <div class="overflow-x-auto mt-0 mb-5 relative">
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
                </div> --}}
                <div class="mt-0 mb-5 relative">
                    {{-- Inicia contenedor filtrar clientes --}}
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

{{-- Modal Editar Pesadas --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalEditarPesadasWeb">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Editar Pesada Web!</h3>
                    </div>
                    <label id="idPesadaWebEditar" class="hidden"></label>
                    <div class="flex mt-4 justify-center items-start flex-col relative w-full h-full">
                        <label for="idEditarPesadasWebCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </span>
                            <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idEditarPesadasWebCliente" autocomplete="off" id="idEditarPesadasWebCliente" placeholder="Ingrese Nombre de Cliente">
                        </div>
    
                        <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                        <label id="selectedCodigoClientePesadas" class="hidden" val=""></label>
    
                        <!-- Contenedor para las sugerencias -->
                        <div id="contenedorClientesAgregarDescuentoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                            <!-- Aquí se mostrarán las sugerencias -->
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="date" name="fechaEditarPesada" placeholder="0.00" autocomplete="off" id="fechaEditarPesada" value="">
                    </div>
                    <div class="flex w-full mt-4 h-10">
                        <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Especie</h4>
                        </div>
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especieEditarPesada" id="especieEditarPesada">
                        </select>                          
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="cantidadEditarPesada" placeholder="0.00" autocomplete="off" id="cantidadEditarPesada" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Bruto</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="pesoBrutoEditarPesada" placeholder="0.00" autocomplete="off" id="pesoBrutoEditarPesada" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Jabas</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="pesoJabasEditarPesada" placeholder="0.00" autocomplete="off" id="pesoJabasEditarPesada" value="">
                    </div>
                    @if (auth()->user()->tipoUsu == 'Administrador')
                        <div class="mt-4 flex justify-center items-center h-10">
                            <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="precioEditarPesada" placeholder="0.00" autocomplete="off" id="precioEditarPesada" value="">
                        </div>
                    @endif
                    <div class="flex mt-4 flex-col w-full">
                        <label for="comentarioEditarPesada" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                        <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioEditarPesada" autocomplete="off" id="comentarioEditarPesada"></textarea>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarPesadasEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalEditarPesadasWeb" id="btncerrarModalEditarPesadasWeb">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Pesadas --}}

@endsection
