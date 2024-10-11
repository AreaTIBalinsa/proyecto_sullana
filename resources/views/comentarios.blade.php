@vite(['resources/js/comentarios.js'])
@extends('aside')
@section('titulo', 'Comentarios')
@section('contenido')
    <main class="p-6 min-h-[calc(100%-161px)]">
        <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
            {{-- Inicia contenedor Comentarios --}}
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Comentarios</h4>
            <div class="flex gap-4 w-full flex-col md:flex-row items-end md:mx-5 mb-5">
                <div class="flex flex-col justify-center">
                    <label for="fechaDesdeComentarios" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeComentarios">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaHastaComentarios" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaComentarios">
                </div>
                <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarComentarios"><i class='bx bx-search-alt'></i> Buscar</button>
            </div>

            <div class="relative rounded-lg overflow-auto aside_scrollED md:mx-5 md:mb-5">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaDeudaMaxima">
                    <thead id="headerDeudaMaxima" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                        <tr class="h-10">
                            <th class="p-4 whitespace-nowrap">Fecha</th>
                            <th class="p-4 whitespace-nowrap">Nombre de Cliente</th>
                            <th class="p-4 whitespace-nowrap">Comentario</th>
                        </tr>
                    </thead>
                    <tbody id="bodyComentarios">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan=3" class="text-center">No hay comentarios</td></tr>
                    </tbody>
                </table>
            </div>
            {{-- Fin contenedor Comentarios --}}
        </div>
    </main>
@endsection