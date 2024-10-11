@vite(['resources/js/pesadas_web_merma.js'])
@extends('aside')
@section('titulo', 'Agregar Pesadas Web')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Pesadas Web --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Agregar Pesadas Web</h4>
            <div class="md:mx-5 mb-5">
                <div class="mb-5 w-full flex justify-between items-end flex-wrap gap-4">
                    <div class="flex gap-4 flex-wrap">
                        <div class="flex flex-col gap-1 w-full md:w-auto">
                            <label for="presentacionAgregarPesadas" class="text-sm font-medium text-gray-900 dark:text-white md:w-24">Especie :</label>
                            <select class="md:w-56 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="presentacionAgregarPesadas">
                                <option value="1">YUGO VIVO</option>
                                <option value="3">TECNICA VIVO</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 w-full md:w-auto">
                            <label for="fechaPesadas" class="text-sm font-medium text-gray-900 dark:text-white md:w-24">Fecha :</label>
                            <input type="date" class="md:w-56 w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaPesadas">
                        </div>
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
                                <th class="p-4 border-x-2 border-b-2 text-center whitespace-nowrap">Cantidad</th>
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
                            <option value="1">YUGO VIVO</option>
                            <option value="3">TECNICA VIVO</option>
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
