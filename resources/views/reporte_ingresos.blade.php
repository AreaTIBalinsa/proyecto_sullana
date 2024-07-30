@vite(['resources/js/reporte_ingresos.js'])
@extends('aside')
@section('titulo', 'Reporte de Ingresos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor de Reporte de Ingresos de Bancos --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte de Bancos</h4>
            {{-- <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelCliente"><i class='bx bx-arrow-back text-white'></i></button>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelClienteDescuento"><i class='bx bx-arrow-back text-white'></i></button> --}}
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-end lg:px-4 sm:px-4 px-1">
            <div class="flex flex-col justify-center">
                <label for="fechaDesdeReporteDeIngresosBancos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteDeIngresosBancos">
            </div>
            <div class="flex flex-col justify-center">
                <label for="fechaHastaReporteDeIngresosBancos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteDeIngresosBancos">
            </div>
            {{-- <div class="flex items-center relative">
                <div class="flex w-full">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i class='bx bxs-user-circle text-xl'></i>
                    </span>
                    <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="idCuentaDelCliente" placeholder="Ingrese Nombre de Cliente">
                </div>
                <label id="selectedCodigoCliCuentaDelCliente" class="hidden" value=""></label>
                <!-- Contenedor para las sugerencias -->
                <div id="contenedorClientesCuentaDelCliente" class="w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                    <!-- Aquí se mostrarán las sugerencias -->
                </div>
            </div> --}}
            <div class="relative flex w-full justify-center">
                <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                    <i class='bx bxs-user-circle text-xl'></i>
                </div>
                <div class="w-full relative">
                    <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado">
                    <div class="relative w-full h-10 text-sm">
                        <input
                          class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                          placeholder=" " id="inputNombreClientes" autocomplete="off"/><label
                          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Cliente
                        </label>
                      </div>
                    <div id="contenedorDeClientes" class="z-50 w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                </div>
                <div id="clienteSeleccionadoCorrecto" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                    <i class='bx bx-check text-xl'></i>
                </div>
            </div>
            <div class="flex w-full">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bx-money text-xl'></i>
                </span>
                <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarImportePagoIngreso" placeholder="Ingrese Importe de Pago">
            </div>
            <div class="flex w-full">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bx-qr text-xl'></i>
                </span>
                <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" autocomplete="off" id="filtrarCodigoPagoIngreso" placeholder="Ingrese Codigo de Pago">
            </div>
            <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrar_reporte_ingresos_submit"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
        </div>
        <hr class="mt-4 mx-2 lg:mx-4 sm:mx-4 px-1">
        <div class="flex md:flex-row flex-col lg:px-4 sm:px-4 px-1 items-end my-4 gap-6 justify-end">
            <button class="flex whitespace-nowrap gap-2 w-full md:w-auto justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-700" type="submit" autocomplete="off" id="ingresar_pagos_reportes">
                <i class='bx bx-list-check text-lg'></i><span id="abrirModalPagos">REGISTRAR PAGOS</span></button>
            <div class="flex flex-col md:flex-row md:items-center w-full lg:max-w-xs lg:h-10">
                <div class="h-10 text-sm flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-t-lg md:rounded-none md:rounded-l-lg">
                    <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Filtrar Banco: </h4>
                </div>
                <select name="filtrarBancoPagos" id="filtrarBancoPagos" class="w-full h-10 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-b-lg md:rounded-none md:rounded-r-lg">
                    <option value="0">TODOS</option>
                    <option value="BCP">BCP</option>
                    {{-- <option value="BCP BREC">BCP BREC</option>
                    <option value="BCP BRIALE">BCP BRIALE</option>
                    <option value="BCP BRIALEMAGI">BCP BRIALEMAGI</option> --}}
                    <option value="IBK">IBK</option>
                    {{-- <option value="IBK B">IBK B</option>
                    <option value="IBK BRE">IBK BRE</option> --}}
                    <option value="CMAC">CMAC</option>
                    {{-- <option value="CMAC B">CMAC B</option>
                    <option value="CMAC BRE">CMAC BRE</option> --}}
                    <option value="BBVA">BBVA</option>
                    {{-- <option value="BBVA B">BBVA B</option>
                    <option value="BBVA BRE">BBVA BRE</option> --}}
                    <option value="YAPE">YAPE</option>
                    <option value="CAJA PIURA">CAJA PIURA</option>
                </select>
            </div>
        </div>
        <div id="contenedordeReportedePagos" class="hidden md:px-5 px-0.5 py-4">
            <div class="xl:col-start-1 xl:col-end-3 2xl:col-end-auto 2xl:col-start-auto w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                    <li class="me-2">
                        <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Bancos</button>
                    </li>
                    <li class="me-2">
                        <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Caja Chica</button>
                    </li>
                    <li class="me-2">
                        <button id="paul-tab" data-tabs-target="#paul" type="button" role="tab" aria-controls="paul" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Ingresos Paul</button>
                    </li>
                </ul>
                <div id="defaultTabContent" class="">
                    <div class="hidden overflow-auto aside_scrollED p-2 rounded-b-lg" id="about" role="tabpanel" aria-labelledby="about-tab">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                                <tr class="border-2 border-r-[1px]">
                                    <th class="p-4 whitespace-nowrap text-center" colspan="8">FILAS A AGREGAR</th>
                                    <th class="p-4 whitespace-nowrap text-center"><button class="border-2 w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                </tr>
                                <tr>
                                    <th class="hidden">Id</th>
                                    <th class="p-4 border-r-2 border-b-2 border-l-[1px] text-center whitespace-nowrap">Fecha</th>
                                    <th class="p-4 border-l-2 border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Codigo</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Banco</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Observaciones</th>
                                    <th class="p-4 border-r-[1px] border-b-2 text-center">Fecha Registro</th>
                                </tr>
                            </thead>
                            <tbody id="bodyReporteDePagosExcel">
                            </tbody>
                        </table>
                    </div>
                    <div class="hidden overflow-auto aside_scrollED p-2 bg-white rounded-b-lg dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-100 uppercase bg-green-600">
                                <tr class="border-2 border-l-[1px] border-r-[1px]">
                                    <th class="p-4 whitespace-nowrap text-center" colspan="6">FILAS A AGREGAR</th>
                                    <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel2"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                </tr>
                                <tr>
                                    <th class="hidden">Id</th>
                                    <th class="p-4 border-r-2 border-b-2 border-l-[1px] text-center whitespace-nowrap">Fecha</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                    <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Observaciones</th>
                                    <th class="p-4 border-r-[1px] border-b-2 text-center">Fecha Registro</th>
                                </tr>
                            </thead>
                            <tbody id="bodyReporteDePagosExcel2">
                            </tbody>
                        </table>
                    </div>
                    <div class="hidden overflow-auto aside_scrollED p-2 bg-white rounded-b-lg dark:bg-gray-800" id="paul" role="tabpanel" aria-labelledby="paul-tab">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-100 uppercase bg-purple-600">
                                <tr class="border-2 border-l-[1px] border-r-[1px]">
                                    <th class="p-4 whitespace-nowrap text-center" colspan="3">FILAS A AGREGAR</th>
                                    <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel3"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                </tr>
                                <tr>
                                    <th class="hidden">Id</th>
                                    <th class="p-4 border-r-2 border-b-2 border-l-[1px] text-center whitespace-nowrap">Fecha</th>
                                    <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                    <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Observaciones</th>
                                    <th class="p-4 border-r-[1px] border-b-2 text-center">Fecha Registro</th>
                                </tr>
                            </thead>
                            <tbody id="bodyReporteDePagosExcel3">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:m-5 mt-0">
            {{-- <div class="relative overflow-auto aside_scrollED rounded-lg flex items-start"> --}}
            <div class="relative overflow-auto aside_scrollED rounded-lg flex items-start">
                <div>
                    <table id="tableReporteIngresosBancos" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="bg-blue-600 p-2 w-full rounded-lt-lg border-b-2 text-sm font-bold text-gray-100">Bancos</caption>
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                            <tr>
                                <th class="hidden">Id</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                <th class="p-4 border-l-2 border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Codigo</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Banco</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePagosIngresosBancos">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table id="tableReporteIngresosGranja" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="bg-orange-500 p-2 w-full rounded-lt-lg border-b-2 text-sm font-bold text-gray-100">Depositos a Granja</caption>
                        <thead class="text-xs text-gray-100 uppercase bg-orange-500">
                            <tr>
                                <th class="hidden">Id</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Nombre de Cliente</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Codigo</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Banco</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePagosDirectoGranjaIngresoGranja">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-100 uppercase bg-orange-500">
                            <tr class="border-2 border-l-[1px]">
                                <th class="p-4 whitespace-nowrap text-center" colspan="8">FILAS A AGREGAR</th>
                                <th class="p-4 whitespace-nowrap text-center"><button class="border-2 w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel_Ingreso_Banco"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                            </tr>
                            <tr>
                                <th class="hidden">Id</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Nombre de Cliente</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Codigo</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Banco</th>
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                <th class="p-4 border-2 text-center whitespace-nowrap">Observaciones</th>
                                <th class="p-4 border-r-[1px] border-b-2 text-center">Fecha Registro</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePagosExcel4IngresoGranja">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

{{-- Modal Editar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoClienteEditar">
    <div class="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Pago</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoClienteEditar">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoClienteEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <label id="idReporteDePago" class="hidden mb-2 text-base font-medium text-gray-900 dark:text-white"></label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoClienteEditar" autocomplete="off" id="idAgregarPagoClienteEditar" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarPagoClienteEditar" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarPagoClienteEditar" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotalEditar">0.00</span></h2>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPagoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPagoEditar">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="horaAgregarPagoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" step="1" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarPagoEditar">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoClienteEditar" autocomplete="off" id="valorAgregarPagoClienteEditar" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEditar" id="formaDePagoEditar">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Yape">Yape</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBancoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full mayusculasGaaa uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoClienteEditar" autocomplete="off" id="bancoAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoClienteEditar" autocomplete="off" id="codAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoClienteEditar" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoClienteEditar" autocomplete="off" id="comentarioAgregarPagoClienteEditar"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoClienteEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoClienteEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Pago --}}

@endsection