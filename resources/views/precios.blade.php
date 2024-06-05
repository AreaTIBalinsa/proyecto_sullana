@vite(['resources/js/precios.js'])
@extends('aside')
@section('titulo', 'Precios por Presentación')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Precios por Presentación --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Precios por Presentación</h4>
        <div class="overflow-x-auto md:mx-5 mt-0 md:mb-5">
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Precios Mínimos</h5>
                <div class="overflow-x-auto border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">YUGO VIVO:</span>
                            <label class="hidden" value="" id="idPolloVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivo" disabled="" autocomplete="off" id="valorPrecioPolloVivo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">YUGO PELADO:</span>
                            <label class="hidden" value="" id="idPolloVivoPelado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPelado" disabled="" autocomplete="off" id="valorPrecioPolloVivoPelado">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">TECNICA VIVO:</span>
                            <label class="hidden" value="" id="idPolloVivoTecnicoVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoTecnicoVivo" disabled="" autocomplete="off" id="valorPrecioPolloVivoTecnicoVivo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">TECNICA PELADO:</span>
                            <label class="hidden" value="" id="idPolloTecnicoPelado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloTecnicoPelado" disabled="" autocomplete="off" id="valorPrecioPolloTecnicoPelado">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">GALLINA DOBLE PELADO:</span>
                            <label class="hidden" value="" id="idGallinaDoblePelado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaDoblePelado" disabled="" autocomplete="off" id="valorPrecioGallinaDoblePelado">
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">AHOGADOS:</span>
                            <label class="hidden" value="" id="idGallinaChicaPelado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaChicaPelado" disabled="" autocomplete="off" id="valorPrecioGallinaChicaPelado">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">GALLO PELADO:</span>
                            <label class="hidden" value="" id="idGalloPelado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGalloPelado" disabled="" autocomplete="off" id="valorPrecioGalloPelado">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold whitespace-nowrap">POLLO MALTRATADO:</span>
                            <label class="hidden" value="" id="idPolloVivoMaltratado"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoMaltratado" disabled="" autocomplete="off" id="valorPrecioPolloVivoMaltratado">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">PECHUGA:</span>
                            <label class="hidden" value="" id="idPolloVivoPechuga"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPechuga" disabled="" autocomplete="off" id="valorPrecioPolloVivoPechuga">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">PIERNA:</span>
                            <label class="hidden" value="" id="idPolloVivoPierna"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPierna" disabled="" autocomplete="off" id="valorPrecioPolloVivoPierna">
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">ALAS:</span>
                            <label class="hidden" value="" id="idPolloVivoAlas"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoAlas" disabled="" autocomplete="off" id="valorPrecioPolloVivoAlas">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">MENUDENCIA:</span>
                            <label class="hidden" value="" id="idPolloVivoMenudencia"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoMenudencia" disabled="" autocomplete="off" id="valorPrecioPolloVivoMenudencia">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">DORSO:</span>
                            <label class="hidden" value="" id="idPolloVivoDorso"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoDorso" disabled="" autocomplete="off" id="valorPrecioPolloVivoDorso">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">OTROS:</span>
                            <label class="hidden" value="" id="idPolloVivoOtros"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoOtros" disabled="" autocomplete="off" id="valorPrecioPolloVivoOtros">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">POLLO XX PELADO:</span>
                            <label class="hidden" value="" id="idPolloxx"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloxx" disabled="" autocomplete="off" id="valorPrecioPolloxx">
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">BRASA YUGO:</span>
                            <label class="hidden" value="" id="idBrasaYugo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioBrasaYugo" disabled="" autocomplete="off" id="valorPrecioBrasaYugo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">BRASA TECNICA:</span>
                            <label class="hidden" value="" id="idBrasaTecnico"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioBrasaTecnico" disabled="" autocomplete="off" id="valorPrecioBrasaTecnico">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">POLLO XX VIVO</span>
                            <label class="hidden" value="" id="idPolloxxVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloxxVivo" disabled="" autocomplete="off" id="valorPrecioPolloxxVivo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">GALLINA DOBLE VIVO:</span>
                            <label class="hidden" value="" id="idGallinaDobleVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaDobleVivo" disabled="" autocomplete="off" id="valorPrecioGallinaDobleVivo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">SECOS:</span>
                            <label class="hidden" value="" id="idGallinaChicaVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaChicaVivo" disabled="" autocomplete="off" id="valorPrecioGallinaChicaVivo">
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">GALLO VIVO:</span>
                            <label class="hidden" value="" id="idGalloVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGalloVivo" disabled="" autocomplete="off" id="valorPrecioGalloVivo">
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos w-48">
                            <span class="text-sm font-bold">MALTRATADO VIVO:</span>
                            <label class="hidden" value="" id="idMaltratadoVivo"></label>
                            <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioMaltratadoVivo" disabled="" autocomplete="off" id="valorPrecioMaltratadoVivo">
                        </div>
                    </div>
                </div>
            </div>
            {{-- Aumentar o disminuir precios --}}
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Aumentar o Disminuir Precios</h5>
                <div class="overflow-x-auto border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center gap-2 items-center w-48">
                            <label class="text-sm font-bold">YUGO VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloVivo" disabled="" autocomplete="off" id="precioPolloVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">YUGO PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPelado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloPelado" disabled="" autocomplete="off" id="precioPolloPelado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPelado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">TECNICA VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloTecnicoVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloTecnicoVivo" disabled="" autocomplete="off" id="precioPolloTecnicoVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloTecnicoVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">TECNICA PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloTecnicoPelado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloTecnicoPelado" disabled="" autocomplete="off" id="precioPolloTecnicoPelado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloTecnicoPelado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">GALLINA DOBLE PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaDoble">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGallinaDoble" disabled="" autocomplete="off" id="precioGallinaDoble" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaDoble">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">AHOGADOS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaChica">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGallinaChica" disabled="" autocomplete="off" id="precioGallinaChica" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaChica">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">GALLO PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGallo" disabled="" autocomplete="off" id="precioGallo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">MALTRATADO PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloMaltratado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloMaltratado" disabled="" autocomplete="off" id="precioPolloMaltratado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloMaltratado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">PECHUGA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPechuga">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloPechuga" disabled="" autocomplete="off" id="precioPolloPechuga" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPechuga">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">PIERNA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPierna">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloPierna" disabled="" autocomplete="off" id="precioPolloPierna" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPierna">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">ALAS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloAlas">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloAlas" disabled="" autocomplete="off" id="precioPolloAlas" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloAlas">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">MENUDENCIA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloMenudencia">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloMenudencia" disabled="" autocomplete="off" id="precioPolloMenudencia" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloMenudencia">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">DORSO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloDorso">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloDorso" disabled="" autocomplete="off" id="precioPolloDorso" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloDorso">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">OTROS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloOtros">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloOtros" disabled="" autocomplete="off" id="precioPolloOtros" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloOtros">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">POLLO XX PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloxx">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloxx" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloxx">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">BRASA YUGO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioBrasaYugo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioBrasaYugo" disabled="" autocomplete="off" id="precioBrasaYugo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioBrasaYugo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">BRASA TECNICA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioBrasaTecnico">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioBrasaTecnico" disabled="" autocomplete="off" id="precioBrasaTecnico" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioBrasaTecnico">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">POLLO XX VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloxxVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxxVivo" disabled="" autocomplete="off" id="precioPolloxxVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloxxVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">GALLINA DOBLE VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaDobleVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGallinaDobleVivo" disabled="" autocomplete="off" id="precioGallinaDobleVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaDobleVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">SECOS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaChicaVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGallinaChicaVivo" disabled="" autocomplete="off" id="precioGallinaChicaVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaChicaVivo">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-evenly min-w-[960px]">
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">GALLO VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGalloVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioGalloVivo" disabled="" autocomplete="off" id="precioGalloVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGalloVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2 w-48">
                            <label class="text-sm font-bold">MALTRATADO VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioMaltratadoVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioMaltratadoVivo" disabled="" autocomplete="off" id="precioMaltratadoVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioMaltratadoVivo">+</button>
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
                            <th class="p-4 text-center whitespace-nowrap">YUGO VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">YUGO PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">TECNICA VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">TECNICA PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLINA DOBLE PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">AHOGADOS</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLO PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">MALTRATADO PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">PECHUGA</th>
                            <th class="p-4 text-center whitespace-nowrap">PIERNA</th>
                            <th class="p-4 text-center whitespace-nowrap">ALAS</th>
                            <th class="p-4 text-center whitespace-nowrap">MENUDENCIA</th>
                            <th class="p-4 text-center whitespace-nowrap">DORSO</th>
                            <th class="p-4 text-center whitespace-nowrap">OTROS</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO XX PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">BRASA YUGO</th>
                            <th class="p-4 text-center whitespace-nowrap">BRASA TECNICA</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO XX VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLINA DOBLE VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">SECOS</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLO VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">MALTRATADO VIVO</th>
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

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalPreciosXPresentacion">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
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

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalPreciosMinimos">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
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