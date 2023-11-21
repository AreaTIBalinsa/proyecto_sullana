@vite(['resources/js/zonas.js'])
@extends('aside')
@section('titulo', 'Consultar Zonas')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Consultar Zonas --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Zonas</h4>
        {{-- Tabla --}}
        <div class="flex flex-col-reverse lg:flex-row md:mx-5 md:mb-5 mt-0 ">
            <div id ="tblConsultarZonas" class="relative overflow-auto rounded-lg aside_scrollED max-h-[600px] w-full">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaConsultarZonas">
                    <thead id="headerConsultarZonas" class="bg-blue-600 text-gray-50 sticky top-0">
                        <tr class="h-10">
                            <th class="px-4 hidden">ID</th>
                            <th class="px-4 whitespace-nowrap">Zonas</h5></th>
                            <th class="px-4 whitespace-nowrap">N° Clientes</h5></th>
                        </tr>
                    </thead>
                    <tbody id="bodyConsultarZonas">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div class="flex flex-col lg:px-5 gap-4">
                <div class="bg-gray-200 dark:bg-gray-800 w-full lg:w-60 rounded-lg flex flex-col p-5">
                    <h2 id="contadorZonas" class="text-gray-900 dark:text-gray-100 font-bold text-3xl md:text-4xl">0</h2>
                    <div class="flex row gap-4">
                        <div class="flex flex-col items-start">
                            <div class="text-gray-700 dark:text-gray-400 font-semibold text-xl md:text-xl">Total de Zonas</div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2 justify-between w-full flex-col md:flex-row-reverse mb-5">
                    <button class="w-full text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="registrar_agregarZona"><i class='bx bxs-location-plus text-lg'></i> Agregar Zona</button>
                </div>
            </div>
        </div>
        {{-- Termina contenedor Consultar Zonas --}}
    </div>
</main>

{{-- Modal Agregar Zona --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalZonas" id="ModalZonas">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Zona</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                    <p class="text-sm text-gray-900 dark:text-gray-300">Ingrese Nombre de Zona:</p>
                        <input class="campoNombreZona p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="nombreAgregarZona" autocomplete="off" placeholder="Ingrese Zona">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarZonas">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalZonas" id="cerrarModalZonasbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Termina Modal Agregar Zona --}}

{{-- Modal Editar Zona --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalZonasEditar" id="ModalZonasEditar">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Zona</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                    <label id="idZonaEditar" value="" class="hidden"></label>
                    <p class="text-sm text-gray-900 dark:text-gray-300">Ingrese Nombre de Zona:</p>
                        <input class="campoNombreZona p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="nombreAgregarZonaEditar" autocomplete="off" placeholder="Ingrese Zona">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarZonasEditar">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalZonasEditar" id="cerrarModalZonasEditarbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Termina Modal Editar Zona --}}
@endsection