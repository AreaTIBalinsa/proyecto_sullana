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
            <div class="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 md:mx-5 mb-5">
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">YUGO VIVO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesPrimerEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPrimerEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">YUGO PELADO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesSegundaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgSegundaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">TECNICA VIVO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesTerceraEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgTerceraEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">TECNICA PELADO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesCuartaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgCuartaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>

                {{--  --}}
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">GALLINA DOBLE</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesQuintaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgQuintaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">GALLINA CHICA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesSextaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgSextaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">GALLO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesSeptimaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgSeptimaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO MALTRATADO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesOctavaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgOctavaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">PECHUGA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">PIERNA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaPrimeraEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaPrimeraEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">ALAS</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaSegundaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaSegundaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">MENUDENCIA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaTerceraEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaTerceraEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">DORSO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaCuartaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaCuartaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">OTROS</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaQuintaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaQuintaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO XX</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaSextaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaSextaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">BRASA YUGO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaSeptimaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaSeptimaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">BRASA TECNICA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">PESO TOTAL<span>:</span></div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesDecimaOctavaEspecie">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgDecimaOctavaEspecie">0.00 Kg</div>
                        </div>
                    </div>
                    <div class="text-white w-full flex justify-center p-1">En linea
                        <span class="animacion_produccion_actual bg-gray-100"></span>
                    </div>
                </div>
                {{--  --}}

                <div class="bg-red-600 w-full md:col-span-2 xl:col-span-3 rounded-lg py-5 flex flex-col items-center">
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