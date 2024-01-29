@vite(['resources/js/consultar_clientes.js'])
@extends('aside')
@section('titulo', 'Consultar Clientes')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Clientes</h4>
        {{-- Tabla --}}
        <div class="flex justify-between items-center relative mb-5 md:mx-5 mt-0 flex-col gap-4 lg:flex-row">
            <div class="flex w-full lg:max-w-xs">
                <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input
                    class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text" name="filtrarConsultarClientes" autocomplete="off" id="filtrarConsultarClientes"
                    placeholder="Ingrese Nombre de Cliente">
            </div>
        </div>
        <div id ="tblConsultarClientes" class="relative overflow-auto md:m-5 rounded-lg max-h-[600px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm"
                id="tablaConsultarClientes">
                <thead id="headerConsultarClientes" class="bg-blue-600 text-gray-50 sticky top-0 text-sm">
                    <tr class="h-10">
                        <th class="px-4 hidden">ID</th>
                        <th class="px-4" data-column="codigo">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Codigo<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="nombres">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Nombres y Apellidos<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="documento">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Documento<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="numdocumento">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Nro Doc.<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="telefono">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Telefono<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="comentario">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Comentario<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                        <th class="px-4" data-column="estado">
                            <h5 class="whitespace-nowrap flex justify-center items-center">Estado<button><svg
                                        class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></button></h5>
                        </th>
                    </tr>
                </thead>
                <tbody id="bodyConsultarClientes">
                    <tr class="rounded-lg border-2 dark:border-gray-700">
                        <td colspan="9" class="text-center">No hay datos</td>
                    </tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Consultar por Cliente --}}
    </div>
    {{-- Termina contenedor Consultar Clientes --}}
    </div>

</main>


{{-- Modal Opciones de Clientes --}}

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalEditarDatosdeCliente">
    <div class="flex justify-center items-center w-full min-h-screen py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="rounded-lg max-h-[100%] aside_scrollED overflow-hidden overflow-y-auto bg-white dark:bg-slate-700 text-left shadow-xl transform transition-all max-w-[700px] w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Cliente</h3>
                    </div>
                    <div class="md:p-5 py-5 grid grid-cols-1 lg:grid-cols-3 gap-4" id="divEditarDatosClientes">
                        <div class="flex w-full justify-start items-center h-10">
                            <div
                                class="h-10 text-sm flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2 w-full">Codigo :
                                </h4>
                            </div>
                            <input
                                class="w-full h-10 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg"
                                type="text" name="valorEditarDatosdeCliente" autocomplete="off"
                                id="valorEditarCodigoCliente" placeholder="Codigo" disabled>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNombresCliente" autocomplete="off"
                                id="valorEditarNombresCliente" placeholder="Nombres">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarApellidoPaternoCliente" autocomplete="off"
                                id="valorEditarApellidoPaternoCliente" placeholder="Apellido Paterno">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarApellidoMaternoCliente" autocomplete="off"
                                id="valorEditarApellidoMaternoCliente" placeholder="Apellido Materno">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <select
                                class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg"
                                name="valorEditarTipoDeDocumento" id="valorEditarTipoDeDocumento">
                            </select>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNumeroDeDocumento" autocomplete="off"
                                id="valorEditarNumeroDeDocumento" placeholder="Nro de Documento">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarEntradasDeCelular w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNumeroDeCelular" autocomplete="off"
                                id="valorEditarNumeroDeCelular" placeholder="N° de Celular">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2 lg:col-start-2 lg:col-end-4">
                            <input
                                class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarDireccionCliente" autocomplete="off"
                                id="valorEditarDireccionCliente" placeholder="Direccion">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2 lg:col-start-1 lg:col-end-4">
                            <textarea
                                class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                name="valorEditarComentario" autocomplete="off" id="valorEditarComentario" placeholder="Comentario"></textarea>
                        </div>
                        <div class="flex w-full justify-start items-center gap-4 lg:col-start-1 lg:col-end-3">                            
                            <div class="flex items-center gap-2">
                                <input id="opcionActivo" type="radio" value="1" name="opcionEstado" class="focus:ring-green-500 w-4 h-4 text-green-500 bg-gray-100 dark:bg-gray-700">
                                <label for="opcionActivo" class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">ACTIVO</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <input id="opcionDeshabilitado" type="radio" value="2" name="opcionEstado" class="focus:ring-gray-400 w-4 h-4 text-gray-400 bg-gray-100 dark:bg-gray-700">
                                <label for="opcionDeshabilitado" class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">INHABILITADO</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full justify-between flex flex-col gap-2 sm:flex-row pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white sm:mt-0 sm:w-auto"id="btnEliminarCliente">Eliminar Cliente</button>
                    <div class="flex flex-col gap-2 sm:flex-row">
                        <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white sm:mt-0 sm:w-auto cerrarModalEditarDatosdeCliente">Cancelar</button>
                        <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"id="btnEditarDatosdeCliente">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Opciones de Clientes --}}

@endsection