@vite(['resources/js/reporte_acumulado.js'])
@extends('aside')
@section('titulo', 'Reporte Acumulado')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte Acumulado --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte Acumulado <span id="diaReporteAcumulado"></span></h4>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoReporteAcumulado"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        {{-- <div id="primerContenedorReporteAcumulado">
            <div class="flex flex-col gap-4 md:mx-5 my-0">
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row flex-wrap">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReporteAcumulado" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteAcumulado">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReporteAcumulado" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteAcumulado">
                    </div>
                    <div class="flex items-end md:justify-end">
                        <button class="cursor-pointer w-full uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="filtrarReporteAcumuladoDesdeHasta"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
                    </div>
                </div>
            </div>
            <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:m-5 mt-5">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReporteAcumulado">
                    <thead id="headerReporteAcumulado" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                        <tr class="h-10">
                            <th class="px-4 whitespace-nowrap">FECHA</th>
                            <th class="px-4 whitespace-nowrap">YUGO VIVO</th>
                            <th class="px-4 whitespace-nowrap">YUGO PELADO</th>
                            <th class="px-4 whitespace-nowrap">TECNICA VIVO</th>
                            <th class="px-4 whitespace-nowrap">TECNICA PELADO</th>
                            <th class="px-4 whitespace-nowrap">GALLINA DOBLE</th>
                            <th class="px-4 whitespace-nowrap">GALLINA CHICA</th>
                            <th class="px-4 whitespace-nowrap">GALLO</th>
                            <th class="px-4 whitespace-nowrap">POLLO MALTRATADO</th>
                            <th class="px-4 whitespace-nowrap">PECHUGA</th>
                            <th class="px-4 whitespace-nowrap">PIERNA</th>
                            <th class="px-4 whitespace-nowrap">ALAS</th>
                            <th class="px-4 whitespace-nowrap">MENUDENCIA</th>
                            <th class="px-4 whitespace-nowrap">DORSO</th>
                            <th class="px-4 whitespace-nowrap">OTROS</th>
                            <th class="px-4 whitespace-nowrap">POLLO XX</th>
                            <th class="px-4 whitespace-nowrap">BRASA YUGO</th>
                            <th class="px-4 whitespace-nowrap">BRASA TECNICA</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteAcumulado">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="15" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="segundoContenedorReporteAcumulado" class="hidden">
            <div class="flex justify-between items-center md:mx-5">
                <div class="flex w-full lg:max-w-xs">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i class='bx bxs-user-circle text-xl'></i>
                    </span>
                    <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClienteReporteAcumulado" autocomplete="off" id="filtrarClienteReporteAcumulado" placeholder="Ingrese Nombre de Cliente">
                </div>
            </div>
            <div class="relative rounded-lg overflow-auto max-h-[600px] aside_scrollED md:m-5 mt-5" id="divReporteAcumuladoDetalle">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReporteAcumuladoDetalle">
                    <thead id="headerReporteAcumuladoDetalle" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                        <tr class="h-10">
                            <th class="px-4 whitespace-nowrap">CODIGO</th>
                            <th class="px-4 whitespace-nowrap">CLIENTE</th>
                            <th class="px-4 whitespace-nowrap">ESPECIE</th>
                            <th class="px-4 whitespace-nowrap">CANTIDAD</th>
                            <th class="px-4 whitespace-nowrap">PESO</th>
                            <th class="px-4 whitespace-nowrap">PRECIO</th>
                            <th class="px-4 whitespace-nowrap">SALDO</th>
                            <th class="px-4 whitespace-nowrap">PROMEDIO</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteAcumuladoDetalle">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="11" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div> --}}

        {{-- Termina contenedor Reporte Acumulado --}}
        <div class="flex gap-2 flex-wrap justify-start items-end">
            <div class="flex flex-col items-start md:mx-5">
                <label for="fechaReporteExcel" class="text-base text-gray-900 dark:text-gray-50">Reporte Excel :</label>
                <input type="date" class="max-w-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaReporteExcel">
            </div>
            <button class="cursor-pointer uppercase  bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="filtrarReporteAcumuladoDesdeHastaExcel"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
        </div>
        
        <div class="md:mx-5 my-5">
            <div class="flex w-full lg:max-w-xs mb-5">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarClienteReporteAcumuladoExcel" placeholder="Ingrese Nombre de Cliente">
            </div>

            <div class="relative rounded-lg overflow-auto max-h-[600px] aside_scrollEDINSON" id="divReporteAcumuladoDetalleExcel">
                <table class="w-full border-separate border-spacing-0 text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReporteAcumuladoExcel">
                    <caption class="bg-blue-600 text-gray-50 p-2 font-bold text-lg rounded-t-lg border-x-2 sticky top-0 border-t-2 z-50" id="fechaReporteExcelTitle"></caption>
                    <thead id="headerReporteAcumuladoExcel" class="bg-blue-600 text-gray-50 sticky top-[46px] text-xs uppercase z-50 border-separate">
                        <tr class="h-10">
                            <th class="px-4 border-y-2 border-r-[1px] border-l-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">YUGO VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">YUGO PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">TECNICA VIVO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">TECNICA PELADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA DOBLE</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLINA CHICA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">GALLO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">POLLO MALTRATADO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">PECHUGA</th>
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
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">POLLO XX</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">BRASA YUGO</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap" colspan="4">BRASA TECNICA</th>
                            <th class="px-4 border-x-[1px] border-y-2 whitespace-nowrap"></th>
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
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="90" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</main>
@endsection