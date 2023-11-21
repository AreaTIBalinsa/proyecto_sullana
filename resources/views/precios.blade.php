@vite(['resources/js/precios.js'])
@extends('aside')
@section('titulo', 'Precios por Presentación')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Precios por Presentación --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Precios por Presentación</h4>
        <div class="overflow-x-auto md:mx-5 mt-0 md:mb-5">
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Precios Mínimos Pollo Vivo</h5>
                <div class="flex-wrap flex justify-evenly border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO YUGO:</span>
                        <label class="hidden" value="" id="idPolloVivoYugo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoYugo" disabled="" autocomplete="off" id="valorPrecioPolloVivoYugo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO PERLA:</span>
                        <label class="hidden" value="" id="idPolloVivoPerla"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPerla" disabled="" autocomplete="off" id="valorPrecioPolloVivoPerla">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO CHIMU:</span>
                        <label class="hidden" value="" id="idPolloVivoChimu"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoChimu" disabled="" autocomplete="off" id="valorPrecioPolloVivoChimu">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO XX:</span>
                        <label class="hidden" value="" id="idPolloVivoxx"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoxx" disabled="" autocomplete="off" id="valorPrecioPolloVivoxx">
                    </div>
                </div>
            </div>
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Precios Mínimos Beneficiado</h5>
                <div class="flex-wrap flex justify-evenly border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO YUGO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoYugo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloYugo" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloYugo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO PERLA:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoPerla"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloPerla" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloPerla">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO CHIMU:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoChimu"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloChimu" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloChimu">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO XX:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoxx"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloxx" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloxx">
                    </div>
                </div>
            </div>
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Aumentar o Disminuir Precios</h5>
                <div class="flex flex-col gap-4 border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex-wrap flex justify-evenly">
                        <div class="flex flex-col p-2 justify-center gap-2 items-center">
                            <label class="text-sm font-bold">POLLO YUGO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloYugo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloYugo" disabled="" autocomplete="off" id="precioPolloYugo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloYugo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">POLLO PERLA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPerla">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloPerla" disabled="" autocomplete="off" id="precioPolloPerla" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPerla">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">POLLO CHIMU:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloChimu">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloChimu" disabled="" autocomplete="off" id="precioPolloChimu" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloChimu">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">POLLO XX:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloxx">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloxx" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloxx">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end w-full md:pr-5 px-4 flex-wrap">
                        <button class="w-full md:w-auto text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="btnGuardarNuevoPrecioPollo"><i class='bx bx-save text-lg'></i>Guardar</button>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center relative flex-col gap-4 lg:flex-row mb-5">
                <div class="flex w-full lg:max-w-xs">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i class='bx bxs-user-circle text-xl'></i>
                    </span>
                    <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClientePrecios" autocomplete="off" id="filtrarClientePrecios" placeholder="Ingrese Nombre de Cliente">
                </div>
                <div class="flex flex-col md:flex-row md:items-center w-full lg:max-w-xs lg:h-10">
                    <div class="h-10 text-sm flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-t-lg md:rounded-none md:rounded-l-lg">
                        <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Tipo :</h4>
                    </div>
                    <select class="w-full h-10 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-b-lg md:rounded-none md:rounded-r-lg" name="tipoPolloPrecios" id="tipoPolloPrecios">
                    </select>
                </div>
            </div>
            <div class="relative overflow-auto max-h-[500px] aside_scrollED shadow-md rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaPreciosXPresentacion">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="headerPreciosXPresentacion">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4" data-column="nombres">
                                <h5 class="whitespace-nowrap flex items-center">Nombre de Cliente<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></button></h5>
                            </th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO YUGO</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO PERLA</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO CHIMU</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO XX</th>
                        </tr>
                    </thead>
                    <tbody id="bodyPreciosXPresentacion">

                    </tbody>
                </table>
            </div>
        </div>
        {{-- Termina contenedor Precios por Presentación --}}
    </div>
</main>

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalPreciosXPresentacion" id="ModalPreciosXPresentacion">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Precio por Presentación</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label id="idClientePrecioXPresentacion" class="hidden"></label>
                        <label id="idEspeciePrecioXActualizar" class="hidden"></label>
                        <p class="text-sm text-gray-900 dark:text-gray-300">Nombre del cliente: <span id="nombrePrecioXPresentacion"></span></p>
                        <p class="text-sm text-gray-900 dark:text-gray-300">Presentación: <span id="nombrePresentacionModal"></span></p>
                        <input class="validarSoloNumerosDosDecimales p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="nuevoValorPrecioXPresentacion" autocomplete="off" placeholder="Ingrese precio">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnActualizarPreciosXPresentacion">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalPreciosXPresentacion" id="cerrarModalPreciosXPresentacionbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal Agregar Precio --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalPreciosMinimos" id="ModalPreciosMinimos">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Editar Precio!</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label class="hidden" id="idEspeciePrecioMinimo"></label>
                        <p class="text-sm text-gray-900 dark:text-gray-300">Ingrese Precio:</p>
                        <input class="validarSoloNumerosDosDecimales p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="agregarPreciosMinimos" autocomplete="off" placeholder="0.0">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarPreciosMinimos">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalPreciosMinimos" id="btncerrarModalPreciosMinimos">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Termina Modal Agregar Precio --}}
@endsection