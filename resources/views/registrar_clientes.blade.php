@vite(['resources/js/registrar_clientes.js'])
@extends('aside')
@section('titulo', 'Registrar Clientes')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Agregar Cliente</h4>
        <div class="pb-5 md:p-5 pt-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" id="registroClientes">
                    <div class="flex md:flex-row md:items-center md:h-12">
                        <div class="text-sm h-12 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Codigo :</h4>
                        </div>
                        <input disabled class="validarCampo w-full h-12 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codigoCli" autocomplete="off" id="codigoCli" value="">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <select class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="tipoDocumentoCli" id="tipoDocumentoCli">
                        </select>                         
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center">
                        <div class="text-sm h-12 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 rounded-t-lg md:rounded-none md:rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">N° de Documento :</h4>
                        </div>
                        <div class="w-full flex h-12">
                            <input class="registroClientes validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-b-lg md:rounded-none md:rounded-r-lg h-full" type="text" name="documentoCli" autocomplete="off" id="documentoCli" value="" disabled placeholder="Ingrese numero de documento">
                            <button class="hidden items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 h-full rounded-br-lg md:rounded-none md:rounded-r-lg w-20" id="especialBuscarPorDNI"><i class="bx bx-search-alt text-gray-900 dark:text-gray-300 font-medium text-xl" ></i></button>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="nombresCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombres</label>
                        <input class="entradaEnMayusculas validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresCli" autocomplete="off" id="nombresCli" placeholder="Ingrese Nombres">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoPaternoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Paterno</label>
                        <input class="entradaEnMayusculas w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoCli" autocomplete="off" id="apellidoPaternoCli" placeholder="Ingrese Apellido Paterno">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoMaternoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Materno</label>
                        <input class="entradaEnMayusculas w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoCli" autocomplete="off" id="apellidoMaternoCli" placeholder="Ingrese Apellido Materno">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="contactoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Numero Celular</label>
                        <input class="validarEntradasDeCelular w-full outline-none uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="contactoCli" autocomplete="off" id="contactoCli" placeholder="Ingrese Celular">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="direccionCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Dirección</label>
                        <input class="entradaEnMayusculas uppercase w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionCli" autocomplete="off" id="direccionCli" placeholder="Ingrese Dirección">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="comentarioCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario</label>
                        <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioCli" autocomplete="off" id="comentarioCli" placeholder="INGRESE COMENTARIO"></textarea>
                    </div>
                </div>
                <div class="flex md:px-5 pt-0 md:pb-5 md:justify-end w-full">
                    <div class="flex items-center md:justify-end w-full">
                        <button class="cursor-pointer w-full md:w-56 uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="registrar_usuario_submit"><i class='bx bx-user-plus text-xl'></i> Registrar</button>
                    </div>
                </div>
        {{-- Termina contenedor Registrar Clientes --}}
    </div>
</main>
@endsection