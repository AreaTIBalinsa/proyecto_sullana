@vite(['resources/js/reporte_acumulado.js'])
@extends('aside')
@section('titulo', 'Reporte Acumulado')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte Acumulado --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte Acumulado <span id="diaReporteAcumulado"></span></h4>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoReporteAcumulado"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        <div class="flex gap-2 flex-wrap justify-start items-end">
            <div class="flex flex-col items-start md:mx-5">
                <label for="fechaReporteExcel" class="text-base text-gray-900 dark:text-gray-50">Reporte Excel :</label>
                <input type="date" class="max-w-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaReporteExcel">
            </div>
            <button class="cursor-pointer uppercase  bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="filtrarReporteAcumuladoDesdeHastaExcel"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
        </div>
        
        <div class="md:mx-5 my-5">
            <div class="w-full flex justify-between items-start flex-wrap gap-4 mb-5">
                <div class="flex w-full lg:max-w-xs">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i class='bx bxs-user-circle text-xl'></i>
                    </span>
                    <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarClienteReporteAcumuladoExcel" placeholder="Ingrese Nombre de Cliente">
                </div>
                <button class="text-base py-2 px-5 bg-blue-600 md:max-w-xs w-full hover:bg-blue-700 text-gray-50 rounded-lg md:w-auto font-semibold" id="btnCambiarPrecioPesadas">S/ Cambiar Precios</button>
            </div>

            <div id="contenedorRecalculandoDatos" class="hidden w-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-900 dark:text-white transition ease-in-out duration-150 cursor-not-allowed">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Recalculando datos...
            </div>

            <div class="relative rounded-lg overflow-auto aside_scrollEDINSON max-h-[600px]" id="divReporteAcumuladoDetalleExcel">
                <div class="bg-gray-50 dark:bg-gray-900 hidden top-0 left-0 z-[100] w-full max-h-[600px] h-full" id="eskeleto">
                    <div role="status" class="animate-pulse w-full">
                        <table class="mb-2">
                            <caption class="bg-gray-200 dark:bg-gray-700 h-10 w-full mb-[2px] rounded-t-lg"></caption>
                            <thead>
                                <tr>
                                    <th class="bg-gray-200 border-2 border-l-0 border-gray-300 dark:border-gray-900 h-10 w-[74.44px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[299.63px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[73.16px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[299.63px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[73.16px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[299.63px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[73.16px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[299.63px] dark:bg-gray-700"></th>
                                    <th class="bg-gray-200 border-2 border-r-0 border-gray-300 dark:border-gray-900 h-10 w-[73.16px] dark:bg-gray-700"></th>
                                </tr>
                            </thead>
                        </table>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                </div>
                <table class="w-full border-separate border-spacing-0 text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReporteAcumuladoExcel">
                    <caption class="bg-blue-600 text-gray-50 p-2 font-bold text-lg rounded-t-lg border-x-2 sticky top-0 border-t-2 z-50" id="fechaReporteExcelTitle"></caption>
                    <thead id="headerReporteAcumuladoExcel" class="bg-blue-600 text-gray-50 sticky top-[46px] text-xs uppercase z-50 border-separate">
                        <tr class="h-10">
                            <th class="px-4 border-y-2 border-r-[1px] border-l-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">YUGO VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">YUGO PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">BRASA YUGO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">TECNICA VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">TECNICA PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">BRASA TECNICA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">POLLO XX PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">POLLO XX VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA DOBLE PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA DOBLE VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            {{-- <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">AHOGADOS</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">SECOS</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th> --}}
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLO PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLO VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">POLLO MALTRATADO PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA CHICA VIVA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA CHICA PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">TROZADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            {{-- <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">PECHUGA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">PIERNA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">ALAS</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">MENUDENCIA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">DORSO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">OTROS</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th> --}}
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap bg-red-600" colspan="3">DESCUENTO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap bg-green-400" colspan="3">TOTAL</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap bg-yellow-300 text-gray-900" colspan="4">SALDOS Y ABONOS</th>
                            <th class="px-4 border-y-2 border-l-[1px] border-r-2 whitespace-nowrap bg-blue-600"></th>
                        </tr>
                        <tr class="h-10 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-900">
                            <th class="text-left px-2 text-sm border-r-[1px] border-b-2 border-l-2 whitespace-nowrap bg-blue-600 text-white">CLIENTE</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            {{-- <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th> --}}
                            {{-- <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th> --}}
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PROMEDIO PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap bg-blue-600 text-white">PROM.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SUB TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">UNI.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">PESO</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">TOTAL</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SALDO ANT.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">SALDO ACT.</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">COBRANZA</th>
                            <th class="px-4 border-x-[1px] border-b-2 whitespace-nowrap">NUEVO SALDO</th>
                            <th class="px-4 border-l-[1px] border-b-2 border-r-2 whitespace-nowrap text-sm bg-blue-600 text-white">CLIENTE</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteAcumuladoExcel">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="100" class="text-center border-2">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-5 flex gap-10 flex-wrap items-start justify-start">
                <div class="overflow-auto relative" id="divTotalesUno">
                    <div class="bg-gray-50 dark:bg-gray-900 hidden top-0 left-0 z-[100] w-full" id="eskeletoUno">
                        <div role="status" class="animate-pulse w-full">
                            <table class="mb-2">
                                <caption class="bg-gray-200 dark:bg-gray-700 h-10 w-full mb-[2px] rounded-t-lg"></caption>
                                <thead>
                                    <tr>
                                        <th class="bg-gray-200 border-2 border-l-0 border-gray-300 dark:border-gray-900 h-10 w-[177px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-r-0 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                    </tr>
                                </thead>
                            </table>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                    </div>
                    <table class="mb-2">
                        <caption class="bg-blue-600 text-gray-50 p-2 font-bold text-lg rounded-t-lg border-x-2 border-t-2 z-50">TOTALES</caption>
                        <thead class="bg-blue-600 text-gray-50 uppercase z-50 text-sm">
                            <tr>
                                <th class="bg-blue-600 border-2 px-2 py-1 text-left">VARIEDAD</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">CANTIDAD</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">PESO</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteAcumuladoExcelTotales" class="text-gray-900 dark:text-gray-50 ">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="4" class="text-center border-2">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="overflow-auto relative" id="divTotalesDos">
                    <div class="bg-gray-50 dark:bg-gray-900 hidden top-0 left-0 z-[100] w-full" id="eskeletoDos">
                        <div role="status" class="animate-pulse w-full">
                            <table class="mb-2">
                                <caption class="bg-gray-200 dark:bg-gray-700 h-10 w-full mb-[2px] rounded-t-lg"></caption>
                                <thead>
                                    <tr>
                                        <th class="bg-gray-200 border-2 border-l-0 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                        <th class="bg-gray-200 border-2 border-r-0 border-gray-300 dark:border-gray-900 h-10 w-[105px] dark:bg-gray-700"></th>
                                    </tr>
                                </thead>
                            </table>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                    </div>
                    <table class="mb-2">
                        <thead class="bg-blue-600 text-gray-50 uppercase z-50 text-sm">
                            <tr>
                                <th class="bg-blue-600 border-2 px-2 py-2 text-center text-lg" colspan="3">AHOGADOS, SECOS,<br>MALTRADOS, TROZADOS</th>
                                <th class="bg-blue-600 border-2 px-2 py-1"><button class="w-full bg-green-600 rounded-lg p-2" id="filtrarDetalleTrozado"><i class='bx bx-detail'></i></button></th>
                            </tr>
                            <tr>
                                <th class="bg-blue-600 border-2 px-2 py-1 text-left">VARIEDAD</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">CANTIDAD</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">PESO</th>
                                <th class="bg-blue-600 border-2 px-2 py-1">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteAcumuladoExcelTotalesTrozado" class="text-gray-900 dark:text-gray-50 ">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="4" class="text-center border-2">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</main>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalCambiarPrecioPesada">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cambiar Precio Pesadas</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        {{-- <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCambiarPrecioPesadaCliente" autocomplete="off" id="idCambiarPrecioPesadaCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliCambiarPrecioPesada" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesCambiarPrecioPesada" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div> --}}
                        {{-- Inicia contenedor filtrar clientes modales --}}
                        <div class="relative flex w-full justify-center max-w-xs">
                            <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </div>
                            <div class="w-full relative">
                                <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado2">
                                <div class="relative w-full h-10 text-sm">
                                    <input
                                      class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                                      placeholder=" " id="inputNombreClientes2" autocomplete="off"/><label
                                      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                                    </label>
                                  </div>
                                <div id="contenedorDeClientes2" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                            </div>
                            <div id="clienteSeleccionadoCorrecto2" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                                <i class='bx bx-check text-xl'></i>
                            </div>
                        </div>
                        {{-- Termina contenedor filtrar clientes modales --}}
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full md:w-80" id="fechaCambiarPrecioPesada">
                        {{-- <select class="h-10 w-full md:w-80 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especiesCambioPrecioPesadas" id="especiesCambioPrecioPesadas">
                        </select> 
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <b>S/</b>
                            </span>
                            <input class="validarSoloNumerosDosDecimales max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nuevoPrecioCambiarPesadas" autocomplete="off" id="nuevoPrecioCambiarPesadas" placeholder="Ingrese Nuevo Precio">
                        </div> --}}
                        <div class="overflow-auto w-full">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                                    <tr>
                                        <th class="hidden">Id</th>
                                        <th class="p-4 border-l-2 border-t-2 border-r-2 border-b-2 whitespace-nowrap">Nombre de Especie</th>
                                        <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap">Nuevo Precio</th>
                                        <th class="p-4 border-r-2 border-t-2 border-b-2 text-center whitespace-nowrap hidden">Id Especie</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyCambiarPreciosExcel">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnCambiarPrecioPesada">Cambiar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalCambiarPrecioPesada">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal Tablas --}}
<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalTrozadoModal">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg aside_scrollEDINSON max-h-[80%] inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left shadow-xl transform transition-all sm:max-w-[80%] w-full overflow-auto">
            <div class="p-4">
                <div class="w-full overflow-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="bg-blue-600 p-2 w-full border-b-2 text-lg font-bold text-gray-100">TROZADO</caption>
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0">
                            <tr>
                                <th class="px-2 py-4 text-center">Fecha</th>
                                <th class="px-2 py-4 text-center">Hora</th>
                                <th class="px-2 py-4 text-center">Nombre de Cliente</th>
                                <th class="px-2 py-4 text-center">Especie</th>
                                <th class="px-2 py-4 text-center">Cantidad</th>
                                <th class="px-2 py-4 text-center">Peso Bruto</th>
                                <th class="px-2 py-4 text-center">Peso Tara</th>
                                <th class="px-2 py-4 text-center">Peso Neto</th>
                                <th class="px-2 py-4 text-center">Precio</th>
                            </tr>
                        </thead>
                        <tbody id="bodyTrozadoModal">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalTrozadoModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection