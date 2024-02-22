@vite(['resources/js/deuda_maxima.js'])
@extends('aside')
@section('titulo', 'Deuda Maxima')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Deuda Maxima --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Deuda Maxima</h4>
        <div class="flex w-full lg:max-w-xs md:px-5">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class='bx bxs-user-circle text-xl'></i>
            </span>
            <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClienteDeudaMaxima" autocomplete="off" id="filtrarClienteDeudaMaxima" placeholder="Ingrese Nombre de Cliente">
        </div>
        <p class="text-gray-900 font-semibold text-ml dark:text-gray-300 md:px-5 my-5">En este apartado podrá designar la deuda máxima que puede tener un cliente.</p>
        <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:mx-5 md:mb-5">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaDeudaMaxima">
                <thead id="headerDeudaMaxima" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                    <tr class="h-10">
                        <th class="hidden">Id</th>   
                        <th class="p-4" data-column="nombres">
                            <h5 class="whitespace-nowrap flex items-center">Nombre de Cliente<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></button>
                            </h5>
                        </th>
                        <th class="p-4 hidden">Deuda Maxima</th>
                        <th class="p-4" data-column="deuda">
                            <h5 class="whitespace-nowrap w-full justify-center flex items-center">Deuda Maxima<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></button>
                            </h5>
                        </th>
                    </tr>
                </thead>
                <tbody id="bodyDeudaMaxima">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="2" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Deuda Maxima --}}
    </div>
</main>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalDeudaMaxima">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cambiar Deuda Maxima</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label id="idCodigoClienteDeudaMaxima" class="hidden"></label>
                        <p class="text-sm text-gray-900 dark:text-gray-300">Se cambiara deuda maxima de : <span id="nombreClienteDeudaMaxima"></span></p>
                        <input class="validarSoloNumerosDosDecimales p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="valorNuevoDeudaMaxima" autocomplete="off" placeholder="0">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnDeudaMaxima">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalDeudaMaxima" id="cerrarModalDeudaMaximabtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection