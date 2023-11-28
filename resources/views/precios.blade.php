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
                <div class="grid grid-cols-5 justify-evenly border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO VIVO:</span>
                        <label class="hidden" value="" id="idPolloVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivo" disabled="" autocomplete="off" id="valorPrecioPolloVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO PELADO:</span>
                        <label class="hidden" value="" id="idPolloVivoPelado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPelado" disabled="" autocomplete="off" id="valorPrecioPolloVivoPelado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">TECNICO VIVO:</span>
                        <label class="hidden" value="" id="idPolloVivoTecnicoVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoTecnicoVivo" disabled="" autocomplete="off" id="valorPrecioPolloVivoTecnicoVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">TECNICO PELADO:</span>
                        <label class="hidden" value="" id="idPolloTecnicoPelado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloTecnicoPelado" disabled="" autocomplete="off" id="valorPrecioPolloTecnicoPelado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLINA DOBLE:</span>
                        <label class="hidden" value="" id="idGallinaDobleVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaDobleVivo" disabled="" autocomplete="off" id="valorPrecioGallinaDobleVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLINA CHICA:</span>
                        <label class="hidden" value="" id="idGallinaChicaVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaChicaVivo" disabled="" autocomplete="off" id="valorPrecioGallinaChicaVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLO:</span>
                        <label class="hidden" value="" id="idGalloVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGalloVivo" disabled="" autocomplete="off" id="valorPrecioGalloVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO MALTRATADO:</span>
                        <label class="hidden" value="" id="idPolloVivoMaltratado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoMaltratado" disabled="" autocomplete="off" id="valorPrecioPolloVivoMaltratado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">PECHUGA:</span>
                        <label class="hidden" value="" id="idPolloVivoPechuga"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPechuga" disabled="" autocomplete="off" id="valorPrecioPolloVivoPechuga">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">PIERNA:</span>
                        <label class="hidden" value="" id="idPolloVivoPierna"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoPierna" disabled="" autocomplete="off" id="valorPrecioPolloVivoPierna">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">ALAS:</span>
                        <label class="hidden" value="" id="idPolloVivoAlas"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoAlas" disabled="" autocomplete="off" id="valorPrecioPolloVivoAlas">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">MENUDENCIA:</span>
                        <label class="hidden" value="" id="idPolloVivoMenudencia"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoMenudencia" disabled="" autocomplete="off" id="valorPrecioPolloVivoMenudencia">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">DORSO:</span>
                        <label class="hidden" value="" id="idPolloVivoDorso"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoDorso" disabled="" autocomplete="off" id="valorPrecioPolloVivoDorso">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">OTROS:</span>
                        <label class="hidden" value="" id="idPolloVivoOtros"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloVivoOtros" disabled="" autocomplete="off" id="valorPrecioPolloVivoOtros">
                    </div>
                </div>
            </div>
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Precios Mínimos Beneficiado</h5>
                <div class="grid grid-cols-5 justify-evenly border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO VIVO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoVivo" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO PELADO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoPelado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloPelado" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloPelado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">TECNICO VIVO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoTecnicoVivo"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloTecnicoVivo" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloTecnicoVivo">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">TECNICO PELADO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoTecnicoPelado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPolloTecnicoPelado" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPolloTecnicoPelado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLINA DOBLE:</span>
                        <label class="hidden" value="" id="idGallinaDobleBeneficiado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaDobleBeneficiado" disabled="" autocomplete="off" id="valorPrecioGallinaDobleBeneficiado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLINA CHICA:</span>
                        <label class="hidden" value="" id="idGallinaChicaBeneficiado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGallinaChicaBeneficiado" disabled="" autocomplete="off" id="valorPrecioGallinaChicaBeneficiado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">GALLO:</span>
                        <label class="hidden" value="" id="idGalloBeneficiado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioGalloBeneficiado" disabled="" autocomplete="off" id="valorPrecioGalloBeneficiado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">POLLO MALTRATADO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoMaltratado"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoMaltratado" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoMaltratado">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">PECHUGA:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoPechuga"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPechuga" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPechuga">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">PIERNA:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoPierna"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoPierna" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoPierna">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">ALAS:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoAlas"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoAlas" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoAlas">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">MENUDENCIA:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoMenudencia"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoMenudencia" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoMenudencia">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">DORSO:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoDorso"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoDorso" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoDorso">
                    </div>
                    <div class="flex flex-col p-2 justify-center items-center gap-2 divPreciosMinimos">
                        <span class="text-sm font-bold">OTROS:</span>
                        <label class="hidden" value="" id="idPolloBeneficiadoOtros"></label>
                        <input class="preciosMinimosEspecies validarSoloNumerosDosDecimales w-32 uppercase outline-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="valorPrecioPolloBeneficiadoOtros" disabled="" autocomplete="off" id="valorPrecioPolloBeneficiadoOtros">
                    </div>
                </div>
            </div>
            {{-- Aumentar o disminuir precios --}}
            <div class="text-gray-900 dark:text-gray-200 w-full relative pt-2 mb-5">
                <h5 class="absolute -top-1 z-20 left-5 bg-white dark:bg-gray-900 px-2">Aumentar o Disminuir Precios</h5>
                <div class="flex flex-col gap-4 border border-gray-300 dark:border-gray-600 py-10 rounded-lg">
                    <div class="grid grid-cols-5 justify-evenly">
                        <div class="flex flex-col p-2 justify-center gap-2 items-center">
                            <label class="text-sm font-bold">POLLO VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloVivo" disabled="" autocomplete="off" id="precioPolloVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">POLLO PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPelado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloPelado" disabled="" autocomplete="off" id="precioPolloPelado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPelado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">TECNICO VIVO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloTecnicoVivo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloChimu" disabled="" autocomplete="off" id="precioPolloTecnicoVivo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloTecnicoVivo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">TECNICO PELADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloTecnicoPelado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloTecnicoPelado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloTecnicoPelado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">GALLINA DOBLE:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaDoble">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioGallinaDoble" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaDoble">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">GALLINA CHICA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallinaChica">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioGallinaChica" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallinaChica">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">GALLO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioGallo">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioGallo" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioGallo">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">POLLO MALTRATADO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloMaltratado">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloMaltratado" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloMaltratado">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">PECHUGA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPechuga">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloPechuga" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPechuga">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">PIERNA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloPierna">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloPierna" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloPierna">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">ALAS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloAlas">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloAlas" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloAlas">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">MENUDENCIA:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloMenudencia">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloMenudencia" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloMenudencia">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">DORSO:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloDorso">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloDorso" disabled="" autocomplete="off" id="precioPolloDorso" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloDorso">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col p-2 justify-center items-center gap-2">
                            <label class="text-sm font-bold">OTROS:</label>
                            <div class="text-gray-900 dark:text-gray-200 flex gap-2 items-center">
                                <button class="h-7 md:w-2 text-base p-4 bg-amber-300 hover:bg-amber-400 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="restar_precioPolloOtros">-</button>
                                <input class="rounded-lg lg:max-w-xs h-8 w-20 text-center uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="precioPolloxx" disabled="" autocomplete="off" id="precioPolloOtros" value="0.0">
                                <button class="h-7 md:w-2 text-base p-4 bg-green-400 hover:bg-green-500 text-gray-50 rounded-lg flex justify-center items-center gap-2" id="sumar_precioPolloOtros">+</button>
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
                            <th class="p-4 text-center whitespace-nowrap">POLLO VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">TECNICO VIVO</th>
                            <th class="p-4 text-center whitespace-nowrap">TECNICO PELADO</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLINA DOBLE</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLINA CHICA</th>
                            <th class="p-4 text-center whitespace-nowrap">GALLO</th>
                            <th class="p-4 text-center whitespace-nowrap">POLLO MALTRATADO</th>
                            <th class="p-4 text-center whitespace-nowrap">PECHUGA</th>
                            <th class="p-4 text-center whitespace-nowrap">PIERNA</th>
                            <th class="p-4 text-center whitespace-nowrap">ALAS</th>
                            <th class="p-4 text-center whitespace-nowrap">MENUDENCIA</th>
                            <th class="p-4 text-center whitespace-nowrap">DORSO</th>
                            <th class="p-4 text-center whitespace-nowrap">OTROS</th>
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