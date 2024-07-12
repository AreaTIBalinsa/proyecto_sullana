@vite(['resources/js/consultar_usuarios.js'])
@extends('aside')
@section('titulo', 'Consultar Usuarios')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Usuarios</h4>
        {{-- Termina contenedor Registrar Clientes --}}
        <div id ="tblConsultarUsuarios" class="relative overflow-auto md:m-5 rounded-lg max-h-[600px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm"
                id="tablaConsultarUsuarios">
                <thead id="headerConsultarUsuarios" class="bg-blue-600 text-gray-50 sticky top-0 text-sm">
                    <tr class="h-10">
                        <th class="px-4 hidden">ID</th>
                        <th class="px-4 whitespace-nowrap">Nombres</th>
                        <th class="px-4 whitespace-nowrap">Celular</th>
                        <th class="px-4 whitespace-nowrap">Correo Electronico</th>
                        <th class="px-4 whitespace-nowrap">Tipo de Usuario</th>
                    </tr>
                </thead>
                <tbody id="bodyConsultarUsuarios">
                    <tr class="rounded-lg border-2 dark:border-gray-700">
                        <td colspan="9" class="text-center">No hay datos</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

{{-- Modal Opciones de Usuarios --}}

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalEditarDatosdeUsuario">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="rounded-lg max-h-[100%] aside_scrollED overflow-y-auto bg-white dark:bg-gray-700 text-left shadow-xl transform transition-all max-w-[700px] w-full">
            <div class="px-4 pt-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Usuario</h3>
                    </div>
                    <input class="hidden" type="text" id="valorEditarCodigoUsuario">
                    <div class="md:p-5 py-5 grid grid-cols-1 lg:grid-cols-3 gap-4" id="divEditarDatosUsuarios">
                        <div class="flex w-full justify-start items-center gap-2">
                            <select
                                class="w-full h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg"
                                name="valorEditarTipoDeUsuario" id="valorEditarTipoDeUsuario">
                                <option value="Invitado">Invitado</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full entradaEnMayusculas outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarApellidoPaternoUsuario" autocomplete="off"
                                id="valorEditarApellidoPaternoUsuario" placeholder="Apellido Paterno">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full entradaEnMayusculas outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarApellidoMaternoUsuario" autocomplete="off"
                                id="valorEditarApellidoMaternoUsuario" placeholder="Apellido Materno">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full entradaEnMayusculas outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNombresUsuario" autocomplete="off"
                                id="valorEditarNombresUsuario" placeholder="Nombres">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarDniUsuario" autocomplete="off"
                                id="valorEditarDniUsuario" placeholder="DNI">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full validarEntradasDeCelular outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNumeroDeCelularUsuario" autocomplete="off"
                                id="valorEditarNumeroDeCelularUsuario" placeholder="Celular">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full entradaEnMayusculas outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarDireccionUsuario" autocomplete="off"
                                id="valorEditarDireccionUsuario" placeholder="Direccion">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="email" name="valorEditarCorreoElectronicoUsuario" autocomplete="off"
                                id="valorEditarCorreoElectronicoUsuario" placeholder="Correo Electronico">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <input
                                class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarNombreDeUsuario" autocomplete="off"
                                id="valorEditarNombreDeUsuario" placeholder="Nombre de Usuario">
                        </div>
                        <div class="flex w-full flex-col justify-center items-start gap-2">
                            <div class="flex items-center gap-2">
                                <input id="opcionActualizarConstrasena" type="checkbox" value="si" name="opcionActualizarConstrasena" class="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <label for="opcionActualizarConstrasena" class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Actualizar Contraseña</label>
                            </div>
                            <input
                                class="w-full hidden outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md"
                                type="text" name="valorEditarContrasenaUsuario" autocomplete="off"
                                id="valorEditarContrasenaUsuario" placeholder="Contraseña">
                        </div>
                        <div class="flex w-full justify-start items-center gap-4 lg:col-start-1 lg:col-end-3">                            
                            <div class="flex items-center gap-2">
                                <input id="opcionSexoMasculino" type="radio" value="M" name="opcionSexo" class="focus:ring-blue-600 w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700">
                                <label for="opcionSexoMasculino" class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Masculino</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <input id="opcionSexoFemenino" type="radio" value="F" name="opcionSexo" class="focus:ring-pink-400 w-4 h-4 text-pink-400 bg-gray-100 dark:bg-gray-700">
                                <label for="opcionSexoFemenino" class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Femenino</label>
                            </div>
                            <input class="hidden" type="text" value="img/hombre.png" name="rutaPerfilUsuEditar" id="rutaPerfilUsuEditar">
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-5 mb-5 py-5 md:px-5 bg-gray-200 dark:bg-gray-600 rounded-xl">
                <h4 class="text-gray-400 font-semibold text-ml dark:text-gray-300 px-5 md:px-0 pb-4">Editar Roles de Usuario:</h4>
                <div id="EditarRolesUsuarios" class="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full justify-between flex flex-col gap-2 sm:flex-row pt-4">
                    <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white sm:mt-0 sm:w-auto"
                        id="btnEliminarUsuario">Eliminar Usuario</button>
                    <div class="flex flex-col gap-2 sm:flex-row">
                        <button type="button"
                            class="inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white sm:mt-0 sm:w-auto CerrarModalEditarDatosdeUsuario">Cancelar</button>
                        <button type="button"
                            class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                            id="btnEditarDatosdeUsuario">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Opciones de Usuarios --}}

@endsection