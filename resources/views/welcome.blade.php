@vite(['resources/js/inicio.js'])
@extends('aside')
@section('titulo', 'Bienvenido')
@section('contenido')
<main class="p-6">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        <div class="w-full flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Producción <span id="fechaDeProduccion">Actual</span></h4>
        </div>
        {{-- Inicia contenedor de Produccion Actual --}}
        <div class="" id="contenedorGraficaActual">
            <div class="flex flex-col xl:grid xl:grid-cols-4 2xl:grid-cols-3 gap-6 md:mx-5 mb-5">
                <div class="xl:col-start-1 xl:col-end-3 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-blue-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-blue-600 rounded-b-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">POLLO YUGO</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalYugo">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalYugo">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services" role="tabpanel" aria-labelledby="services-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES YUGO</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Yugo Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesPrimerEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgPrimerEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Yugo Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesSegundaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgSegundaEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Brasa Yugo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaSeptimaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaSeptimaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-3 xl:col-end-5 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about2-tab" data-tabs-target="#about2" type="button" role="tab" aria-controls="about2" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services2-tab" data-tabs-target="#services2" type="button" role="tab" aria-controls="services2" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-emerald-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-emerald-600 rounded-b-lg md:p-8" id="about2" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">POLLO TECNICA</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalTecnica">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalTecnica">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services2" role="tabpanel" aria-labelledby="services2-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES TECNICA</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Tecnica Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesTerceraEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgTerceraEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Tecnica Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesCuartaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgCuartaEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Brasa Tecnica</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaOctavaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaOctavaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-1 xl:col-end-3 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about3-tab" data-tabs-target="#about3" type="button" role="tab" aria-controls="about3" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services3-tab" data-tabs-target="#services3" type="button" role="tab" aria-controls="services3" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-indigo-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-indigo-600 rounded-b-lg md:p-8" id="about3" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">POLLO XX</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalPolloXX">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalPolloXX">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services3" role="tabpanel" aria-labelledby="services3-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES POLLO XX</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Pollo XX Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaNovenaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaNovenaEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Pollo XX Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaSextaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaSextaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-3 xl:col-end-5 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about4-tab" data-tabs-target="#about4" type="button" role="tab" aria-controls="about4" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services4-tab" data-tabs-target="#services4" type="button" role="tab" aria-controls="services4" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-yellow-400 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-yellow-400 rounded-b-lg md:p-8" id="about4" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">GALLO</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalGallo">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalGallo">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services4" role="tabpanel" aria-labelledby="services4-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES GALLO</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Gallo Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesVigesimaSegundaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgVigesimaSegundaEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Gallo Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesSeptimaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgSeptimaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-1 xl:col-end-3 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about5-tab" data-tabs-target="#about5" type="button" role="tab" aria-controls="about5" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services5-tab" data-tabs-target="#services5" type="button" role="tab" aria-controls="services5" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-blue-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-blue-600 rounded-b-lg md:p-8" id="about5" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">GALLINA DOBLE</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalGallinaDoble">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalGallinaDoble">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services5" role="tabpanel" aria-labelledby="services5-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES GALLINA DOBLE</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Gallina Doble Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesVigesimaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgVigesimaEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Gallina Doble Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesQuintaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgQuintaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-3 xl:col-end-5 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about6-tab" data-tabs-target="#about6" type="button" role="tab" aria-controls="about6" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services6-tab" data-tabs-target="#services6" type="button" role="tab" aria-controls="services6" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-emerald-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-emerald-600 rounded-b-lg md:p-8" id="about6" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">AHOGADOS Y SECOS</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalGallinaChica">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalGallinaChica">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services6" role="tabpanel" aria-labelledby="services6-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">AHOGADOS Y SECOS</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Ahogados</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesVigesimaPrimeraEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgVigesimaPrimeraEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Secos</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesSextaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgSextaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-1 xl:col-end-5 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about7-tab" data-tabs-target="#about7" type="button" role="tab" aria-controls="about7" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services7-tab" data-tabs-target="#services7" type="button" role="tab" aria-controls="services7" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-indigo-600 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-indigo-600 rounded-b-lg md:p-8" id="about7" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">MALTRATADO</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalPolloMaltratado">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalPolloMaltratado">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services7" role="tabpanel" aria-labelledby="services7-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES MALTRATADO</h2>
                            <!-- List -->
                            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Maltratado Vivo</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesVigesimaTerceraEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgVigesimaTerceraEspecie">0.00 Kg</span></div>
                                </div>
                                <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="leading-tight font-bold">Maltratado Pelado</span>
                                </div>
                                <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                    <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesOctavaEspecie">0 Uds.</span></div>
                                    <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgOctavaEspecie">0.00 Kg</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-start-1 xl:col-end-5 2xl:col-end-4 2xl:col-start-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li class="me-2">
                            <button id="about8-tab" data-tabs-target="#about8" type="button" role="tab" aria-controls="about8" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Inicio</button>
                        </li>
                        <li class="me-2">
                            <button id="services8-tab" data-tabs-target="#services8" type="button" role="tab" aria-controls="services8" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Detalles</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent" class="bg-yellow-400 h-[calc(100%-53px)]">
                        <div class="hidden p-4 bg-yellow-400 rounded-b-lg md:p-8" id="about8" role="tabpanel" aria-labelledby="about-tab">
                            <div class="flex flex-col w-full justify-center items-center h-[calc(100%-53px)]">
                                <h2 class="mb-3 text-3xl md:text-4xl text-center font-extrabold tracking-tight text-white">POLLO TROZADO</h2>
                                <div class="flex row mb-3 justify-center">
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">CANTIDAD<span>:</span></div>
                                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap gap-2">PESO TOTAL<span>:</span></div>
                                    </div>
                                    <div class="flex flex-col items-start">
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="cantidadTotalPolloTrozado">0 Uds.</div>
                                        <div class="text-white font-semibold text-xl md:text-2xl pl-2" id="pesoTotalPolloTrozado">0.00 Kg</div>
                                    </div>
                                </div>
                                <div class="text-white w-full flex justify-center p-1">En linea
                                    <span class="animacion_produccion_actual bg-gray-100">.</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden p-4 bg-white rounded-b-lg md:p-8 dark:bg-gray-800 h-full" id="services8" role="tabpanel" aria-labelledby="services8-tab">
                            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">VARIEDADES POLLO TROZADO</h2>
                            <!-- List -->
                            <div class="text-gray-800 dark:text-gray-200 flex w-full gap-2 flex-wrap lg:flex-nowrap">
                                <div class="space-y-4 w-full">
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">PECHUGA</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaEspecie">0.00 Kg</span></div>
                                    </div>
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">PIERNA</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaPrimeraEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaPrimeraEspecie">0.00 Kg</span></div>
                                    </div>
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">ALAS</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaSegundaEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaSegundaEspecie">0.00 Kg</span></div>
                                    </div>
                                </div>
                                <div class="space-y-4 w-full">
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">MENUDENCIA</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaTerceraEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaTerceraEspecie">0.00 Kg</span></div>
                                    </div>
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">DORSO</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaCuartaEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaCuartaEspecie">0.00 Kg</span></div>
                                    </div>
                                    <div class="flex space-x-2 rtl:space-x-reverse items-center">
                                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        <span class="leading-tight font-bold">OTROS</span>
                                    </div>
                                    <div class="w-full flex flex-col text-gray-800 dark:text-white">
                                        <div class="flex flex-1 border justify-center font-semibold">Cantidad :&nbsp;<span class="font-normal" id="totalUnidadesDecimaQuintaEspecie">0 Uds.</span></div>
                                        <div class="flex flex-1 border justify-center font-semibold">Peso :&nbsp;<span class="font-normal" id="totalKgDecimaQuintaEspecie">0.00 Kg</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-red-600 w-full xl:col-span-4 2xl:col-span-3 rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">VENTA TOTAL</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesEspecies">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgEspecies">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
            </div>
            {{-- Termina contenedor de Produccion Actual --}}
        </div>
    </div>
</main>

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalProduccionAnterior" id="ModalProduccionAnterior">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Seleccione la fecha</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaProduccionAnterior">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnBuscarProduccionAnterior">Buscar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalProduccionAnterior" id="cerrarModalProduccionAnteriorbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection