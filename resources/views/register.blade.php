@vite(['resources/js/register.js'])
@extends('aside')
@section('titulo', 'Registrar Usuario')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Registrar Usuario --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 pt-5">Registrar Usuario</h4>
        <div id="registroForm">
            <div class="md:p-5 py-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" id="divRegistroForm">
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="nombresUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombres</label>
                    <input class="entradaEnMayusculas validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresUsu" autocomplete="off" id="nombresUsu" placeholder="Ingrese Nombres">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="apellidoPaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Paterno</label>
                    <input class="entradaEnMayusculas validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoUsu" autocomplete="off" id="apellidoPaternoUsu" placeholder="Ingresar apellido Materno">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="apellidoMaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Materno</label>
                    <input class="entradaEnMayusculas validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoUsu" autocomplete="off" id="apellidoMaternoUsu" placeholder="Ingresar apellido Paterno">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="dniUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">DNI</label>
                    <input class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="dniUsu" autocomplete="off" id="dniUsu" placeholder="Ingrese DNI">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="celularUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Celular</label>
                    <input class="validarEntradasDeCelular validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="celularUsu" autocomplete="off" id="celularUsu" placeholder="Ingrese Celular">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Direccion</label>
                    <input class="entradaEnMayusculas validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionUsu" autocomplete="off" id="direccionUsu" placeholder="Ingrese Dirección">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Tipo de Usuario</label>
                    <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="tipoUsu" id="tipoUsu">
                        <option value="Invitado">Invitado</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Sexo</label>
                    <div class="w-full">
                        <div class="w-full flex gap-4 items-center justify-center flex-wrap md:flex-nowrap">
                            <input class="uppercase hidden outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="M" checked id="sexoUsuM">
                            <label class="rounded-lg w-full text-center cursor-pointer uppercase p-2.5 text-gray-900 dark:text-gray-50 border bg-sky-600 font-semibold" for="sexoUsuM" id="sexoUsuMR">Masculino</label>
    
                            <input class="uppercase hidden outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="F" id="sexoUsuF">
                            <label class="rounded-lg w-full text-center cursor-pointer uppercase p-2.5 text-gray-900 dark:text-gray-50 border font-semibold" for="sexoUsuF" id="sexoUsuFR">Femenino</label>
                        </div>
                        <!-- <p class="mt-1 text-xs text-center text-gray-500">“Los géneros son para la música no para las personas”</p> -->
                        <input class="hidden" type="text" value="img/hombre.png" name="rutaPerfilUsu" id="rutaPerfilUsu">
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="emailUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Correo
                        Electronico</label>
                    <input class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="emailUsu" autocomplete="off" id="emailUsu" placeholder="INGRESE CORREO">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                    <label for="usernameUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombre de Usuario</label>
                    <input class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="usernameUsu" autocomplete="new-username" id="usernameUsu" placeholder="INGRESE NOMBRE DE USUARIO">
                </div>
                <div class="flex flex-col md:flex-row gap-x-4 md:items-center relative">
                    <label for="passwordUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Contraseña</label>
                    <div class="w-full relative">
                        <input class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 pr-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="passwordUsu" autocomplete="new-password" id="passwordUsu" placeholder="INGRESE CONTRASEÑA">
                        <div class="flex items-center absolute right-2 top-0 bottom-0">
                            <label class="" id="passwordMosl"><i class="fa-regular fa-eye-slash text-gray-900 dark:text-white cursor-pointer" id="passwordMos"></i></label>
                            <label class="hidden" id="passwordOcul"><i class="fa-regular fa-eye text-gray-900 dark:text-white cursor-pointer" id="passwordOcu"></i></label>
                        </div>
                    </div>
                </div>
                <div class="flex justify-start items-center">
                    <button class="h-10 cursor-pointer w-full md:w-40 uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="generarContrasenaSegura"><i class='bx bx-key text-xl'></i> Generar</button>
                </div>
            </div>
            {{-- Inicia contenedor Añadir roles de Usuario --}}
            <div class="md:p-5 py-5 bg-gray-200 dark:bg-gray-800 rounded-xl">
                <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 px-5 md:px-0 pb-4">Añadir Roles de Usuario:</h4>
                <div id="RolesUsuarios" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                </div>
                <div class="flex items-center justify-end w-full pt-5 px-5 md:px-0">
                    <button class="cursor-pointer w-full md:w-64 uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="registrarUsuarios"><i class='bx bxs-user-plus text-xl'></i> Registrar</button>
                </div>
            </div>
            {{-- Termina contenedor Añadir roles de Usuario --}}
        </div>
        {{-- Termina contenedor Registrar Usuario --}}
</main>
@endsection