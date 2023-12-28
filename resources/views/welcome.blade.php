@vite(['resources/js/inicio.js'])
@extends('aside')
@section('titulo', 'Bienvenido')
@section('contenido')
<main class="p-6">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        <div class="w-full flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Producción <span id="fechaDeProduccion">Actual</span></h4>
            <button class="bg-blue-500 p-1 rounded-full" id="btnProduccionAnterior"><i class='bx bx-history text-white'></i></button>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoProduccionAnterior"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        {{-- Inicia contenedor de Produccion Actual --}}
        <div class="" id="contenedorGraficaActual">
            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:mx-5">
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO YUGO</h5>
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
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO PERLA</h5>
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
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO CHIMU</h5>
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
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO XX</h5>
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
                <div class="bg-red-600 w-full md:col-span-2 rounded-lg py-5 flex flex-col items-center">
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
            {{-- Inicia contenedor de Tabla Grafica Actual --}}
            <div class="md:m-5 mt-10">
                <div class="overflow-x-auto aside_scrollED rounded-lg">
                    <table class="tabla_reporte_inicio table-auto text-gray-500 dark:text-gray-300 w-full border-collapse">
                        <thead class="bg-blue-600">
                            <tr>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">#</th>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Cantidad</th>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Peso</th>
                                <th class="text-white py-2 md:text-md text-left px-2">Promedio</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-red-600 whitespace-nowrap">Compra</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadCompra">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoCompra">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioCompra">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-emerald-600 whitespace-nowrap">Venta</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadVenta">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoVenta">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioVenta">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-orange-600 whitespace-nowrap">Merma</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadMerma">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoMerma">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioMerma">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-yellow-400 whitespace-nowrap">Merma %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadMermaPor">0 %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoMermaPor">0 %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioMermaPor">0 %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {{-- Termina contenedor de Tabla Grafica Actual --}}
        </div>
        {{-- Inicia contenedor de Produccion Anterior --}}
        <div class="hidden" id="contenedorGraficaAnterior">
            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:mx-5">
                <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO YUGO</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div class="col-span-2">PESO TOTAL</div>
                                    <div class="text-center col-span-2">VIVO</div>
                                </div>
                                <div class="h-full flex justify-center items-center"><span>:</span></div>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesPrimerEspecieAnterior">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoPrimerEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoPrimerEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between gap-0 w-full pr-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div></div>
                                    <div>&nbsp;</div>
                                </div>
                                <div class="h-full flex justify-center items-center -translate-x-1" id="totalKgPrimerEspecieAnterior">0.00 Kg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO PERLA</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div class="col-span-2">PESO TOTAL</div>
                                    <div class="text-center col-span-2">VIVO</div>
                                </div>
                                <div class="h-full flex justify-center items-center"><span>:</span></div>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesSegundaEspecieAnterior">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoSegundaEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoSegundaEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between gap-0 w-full pr-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div></div>
                                    <div>&nbsp;</div>
                                </div>
                                <div class="h-full flex justify-center items-center -translate-x-1" id="totalKgSegundaEspecieAnterior">0.00 Kg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO CHIMU</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div class="col-span-2">PESO TOTAL</div>
                                    <div class="text-center col-span-2">VIVO</div>
                                </div>
                                <div class="h-full flex justify-center items-center"><span>:</span></div>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesTerceraEspecieAnterior">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoTerceraEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoTerceraEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div></div>
                                    <div>&nbsp;</div>
                                </div>
                                <div class="h-full flex justify-center items-center -translate-x-1" id="totalKgTerceraEspecieAnterior">0.00 Kg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO XX</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div class="col-span-2">PESO TOTAL</div>
                                    <div class="text-center col-span-2">VIVO</div>
                                </div>
                                <div class="h-full flex justify-center items-center"><span>:</span></div>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesCuartaEspecieAnterior">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoCuartaEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoCuartaEspecieAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div></div>
                                    <div>&nbsp;</div>
                                </div>
                                <div class="h-full flex justify-center items-center -translate-x-1" id="totalKgCuartaEspecieAnterior">0.00 Kg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-red-600 w-full md:col-span-2 rounded-lg py-5 flex flex-col items-center">
                    <h5 class="text-white font-bold text-3xl md:text-4xl">VENTA TOTAL</h5>
                    <div class="flex row">
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div class="col-span-2">PESO TOTAL</div>
                                    <div class="text-center col-span-2">VIVO</div>
                                </div>
                                <div class="h-full flex justify-center items-center"><span>:</span></div>
                            </div>
                        </div>
                        <div class="flex flex-col items-start">
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesEspeciesAnterior">0 Uds.</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoEspeciesAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoEspeciesAnterior">0.00 Kg</div>
                            <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                                <div class="grid grid-rows-2 grid-cols-2">
                                    <div></div>
                                    <div>&nbsp;</div>
                                </div>
                                <div class="h-full flex justify-center items-center -translate-x-1" id="totalKgEspeciesAnterior">0.00 Kg</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {{-- Termina contenedor de Produccion Anterior --}}
            {{-- Inicia contenedor de Tabla Grafica Anterior --}}
            <div class="md:m-5 mt-10">
                <div class="overflow-x-auto aside_scrollED rounded-lg">
                    <table class="tabla_reporte_inicio table-auto text-gray-500 dark:text-gray-300 w-full border-collapse">
                        <thead class="bg-blue-600">
                            <tr>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">#</th>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Cantidad</th>
                                <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Peso</th>
                                <th class="text-white py-2 md:text-md text-left px-2">Promedio</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-red-600 whitespace-nowrap">Compra</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadCompraAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoCompraAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioCompraAnterior">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-emerald-600 whitespace-nowrap">Venta</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadVentaAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoVentaAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioVentaAnterior">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-orange-600 whitespace-nowrap">Merma</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadMermaAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoMermaAnterior">0</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioMermaAnterior">0</td>
                            </tr>
                            <tr>
                                <td class="text-white border-r-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-yellow-400 whitespace-nowrap">Merma %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblCantidadMermaPorAnterior">0 %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPesoMermaPorAnterior">0 %</td>
                                <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white whitespace-nowrap" id="tblPromedioMermaPorAnterior">0 %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {{-- Termina contenedor de Tabla Grafica Anterior --}}
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