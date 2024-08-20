@vite(['resources/js/deuda_maxima.js'])
@extends('aside')
@section('titulo', 'Deuda Maxima')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
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
        <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row md:px-5 my-5">
            <div class="flex flex-col justify-center">
                <label for="weekPicker" class="text-base text-gray-900 dark:text-gray-50">Seleccione una semana :</label>
                <input type="week" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="weekPicker">
            </div>
            <div class=" flex items-end">
                <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarSaldoSemanal"><i class='bx bx-search-alt'></i> Buscar</button>
            </div>
        </div>

        <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:mx-5 md:mb-5">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaDeudaMaxima">
                <thead id="headerDeudaMaxima" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                    <tr class="h-10">
                        <th class="hidden">Id</th>   
                        <th class="p-4 whitespace-nowrap">Nombre de Cliente</th>
                        <th class="p-4 whitespace-nowrap">Deuda Maxima</th>
                        <th class="p-4">Lunes</th>
                        <th class="p-4">Martes</th>
                        <th class="p-4">Miercoles</th>
                        <th class="p-4">Jueves</th>
                        <th class="p-4">Viernes</th>
                        <th class="p-4">Sabado</th>
                        <th class="p-4">Domingo</th>
                    </tr>
                </thead>
                <tbody id="bodyDeudaMaxima">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
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
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
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