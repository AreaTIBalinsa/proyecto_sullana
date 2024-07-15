@vite(['resources/js/reporte_de_pagos.js'])
{{-- @vite(['resources/js/reporte_de_pagos_cuenta_cliente.js']) --}}
@extends('aside')
@section('titulo', 'Reporte de Caja')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte de Pagos --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte de Caja</h4>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelCliente"><i class='bx bx-arrow-back text-white'></i></button>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelClienteDescuento"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        <div id="primerContenedorReporteDePagos" class="">
            <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="registrar_agregarPago_submit"><i class='bx bx-dollar-circle text-lg'></i><h5 class="min-w-max">Agregar Pago</h5></button>
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-orange-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-orange-600" type="submit" autocomplete="off" id="descuento_FiltrarPorCliente_submit"><i class='bx bxs-file-find text-lg'></i><h5 class="min-w-max">Consultar Descuentos</h5></button>
                {{-- <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrar_FiltrarPorCliente_submit"><i class='bx bxs-user-detail text-lg'></i><h5 class="min-w-max">Estado de Cuenta</h5></button> --}}
            </div>
            <div class="flex justify-start md:items-end gap-x-14 gap-y-4 flex-col md:flex-row flex-wrap md:m-5 mt-0 mb-5">
                <div class="flex gap-x-14 gap-y-4 flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteDePagos">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteDePagos">
                    </div>
                </div>
                <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrar_pagos_submit"><i class='bx bx-search-alt text-lg' ></i> Buscar</button>
            </div>
            <div class="md:m-5 mt-0">
                <div class="relative overflow-auto aside_scrollED rounded-lg flex items-start">
                    {{-- <div>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                            <tbody id="bodyReporteDePagos">
                                <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                            </tbody>
                        </table>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                                <tr class="border-2 border-r-[1px]">
                                    <th class="p-4 whitespace-nowrap text-center" colspan="7">FILAS A AGREGAR</th>
                                    <th class="p-4 whitespace-nowrap text-center"><button class="border-2 w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                </tr>
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
                            <tbody id="bodyReporteDePagosExcel">
                            </tbody>
                        </table>
                    </div> --}}
                    <div>
                        <div class="text-white font-bold bg-yellow-400 flex justify-center w-full gap-4 p-1.5">
                            <div class="">Diferencia : </div>
                            <div class="" id="diferencia">0.00</div>
                        </div>
                        <div class="flex">
                            <div>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <caption class="bg-green-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Caja Chica Ingreso</caption>
                                    <thead class="text-xs text-gray-100 uppercase bg-green-600">
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                                            <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Nombre de Cliente</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosCajaChicaIngreso">
                                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
                                    </tbody>
                                </table>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-100 uppercase bg-green-600">
                                        <tr class="border-2 border-l-[1px] border-r-[1px]">
                                            <th class="p-4 whitespace-nowrap text-center" colspan="6">FILAS A AGREGAR</th>
                                            <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel2"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                        </tr>
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
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
                            <div>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <caption class="bg-red-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">Caja Chica Egreso</caption>
                                    <thead class="text-xs text-gray-100 uppercase bg-red-600">
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Uso Egreso</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Cantidad</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Precio</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap">Monto</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Forma Pago</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Banco</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Codigo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosCajaChicaEgreso">
                                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                                    </tbody>
                                </table>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-100 uppercase bg-red-600">
                                        <tr class="border-2 border-l-[1px] border-r-[1px]">
                                            <th class="p-4 whitespace-nowrap text-center" colspan="4">FILAS A AGREGAR</th>
                                            <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_ExcelEgreso1"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                        </tr>
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Uso Egreso</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Cantidad</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Precio</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Monto</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosExcelEgreso1">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-white font-bold bg-green-600 flex justify-center w-full gap-4 p-1.5">
                            <div class="ml-[20px]">Diferencia : </div>
                            <div class="" id="diferenciaPaul">0.00</div>
                        </div>
                        <div class="flex">
                            <div>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <caption class="bg-purple-600 p-2 w-full rounded-rt-lg border-b-2 text-sm font-bold text-gray-100">Cobranza de Paul Ingresos</caption>
                                    <thead class="text-xs text-gray-100 uppercase bg-purple-600">
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Nombre de Cliente</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                            <th class="p-4 border-b-2 border-r-[1px] text-center whitespace-nowrap hidden">Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosCobranzaDePaul">
                                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                                    </tbody>
                                </table>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-100 uppercase bg-purple-600">
                                        <tr class="border-2 border-l-[1px] border-r-[1px]">
                                            <th class="p-4 whitespace-nowrap text-center" colspan="3">FILAS A AGREGAR</th>
                                            <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel3"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                        </tr>
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
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
                            <div>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <caption class="bg-yellow-400 p-2 w-full rounded-rt-lg border-b-2 text-sm font-bold text-gray-100">Cobranza de Paul Egresos</caption>
                                    <thead class="text-xs text-gray-100 uppercase bg-yellow-400">
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-r-2 border-b-2 border-l-[1px] whitespace-nowrap">Uso Egreso</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Banco</th>
                                            <th class="p-4 text-center border-r-2 border-b-2 whitespace-nowrap hidden">Codigo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosCobranzaDePaulEgresos">
                                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                                    </tbody>
                                </table>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-100 uppercase bg-yellow-400">
                                        <tr class="border-2 border-l-[1px] border-r-[1px]">
                                            <th class="p-4 whitespace-nowrap text-center" colspan="2">FILAS A AGREGAR</th>
                                            <th class="p-4 whitespace-nowrap text-center"><button class="w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap border-2" type="submit" autocomplete="off" id="registrar_agregarPagos_ExcelEgreso2"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
                                        </tr>
                                        <tr>
                                            <th class="hidden">Id</th>
                                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Fecha</th>
                                            <th class="p-4 border-l-[1px] border-r-2 border-b-2 whitespace-nowrap">Uso Egreso</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Forma Pago</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Banco</th>
                                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap hidden">Codigo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyReporteDePagosExcelEgreso2">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {{-- <div>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                            <tbody id="bodyReporteDePagosDirectoGranja">
                                <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                            </tbody>
                        </table>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-100 uppercase bg-orange-500">
                                <tr class="border-2 border-l-[1px]">
                                    <th class="p-4 whitespace-nowrap text-center" colspan="7">FILAS A AGREGAR</th>
                                    <th class="p-4 whitespace-nowrap text-center"><button class="border-2 w-full flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600 whitespace-nowrap" type="submit" autocomplete="off" id="registrar_agregarPagos_Excel4"><i class='bx bx-save text-lg'></i>Guardar Pagos</button></th>
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
                                </tr>
                            </thead>
                            <tbody id="bodyReporteDePagosExcel4">
                            </tbody>
                        </table>
                    </div> --}}
                </div>
            </div>
        </div>
        {{-- Segundo Contenedor Reporte Pagos --}}
        {{-- <div id="segundoContenedorReporteDePagos" class="hidden">
            <div class="md:mx-5 mt-0 mb-5 relative">
                <div class="flex flex-col gap-5">
                    <div class="flex justify-center items-start flex-col relative">
                        <label for="idCuentaDelCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </span>
                            <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCuentaDelCliente" autocomplete="off" id="idCuentaDelCliente" placeholder="Ingrese Nombre de Cliente">
                        </div>
    
                        <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                        <label id="selectedCodigoCliCuentaDelCliente" class="hidden" value=""></label>
    
                        <!-- Contenedor para las sugerencias -->
                        <div id="contenedorClientesCuentaDelCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                            <!-- Aquí se mostrarán las sugerencias -->
                        </div>
                    </div>
                    <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                        <div class="flex flex-col justify-center">
                            <label for="fechaDesdeCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCuentaDelCliente">
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="fechaHastaCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCuentaDelCliente">
                        </div>
                        <div class=" flex items-end">
                            <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-end py-1 rounded-xl px-1">
                        <button class="text-base py-2 px-5 bg-blue-600 md:max-w-xs w-full hover:bg-blue-700 text-gray-50 rounded-lg md:w-auto font-semibold" id="btnCambiarPrecioPesadas">S/ Cambiar Precios</button>
                        <!--<button class="text-base py-2 px-5 bg-green-600 hover:bg-green-700 text-gray-50 rounded-lg w-full md:w-auto flex gap-2 items-center" id="btnEnviarCuentaWhatsApp"><img src='{{ asset("img/WhatsApp.png") }}' alt="" class="h-5"> Enviar Cuenta</button>-->
                    </div>
                </div>
            </div>
            <!-- Tabla -->
            <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelCliente">
                    <thead id="headerCuentaDelCliente" class="bg-blue-600 text-gray-50 sticky top-0">
                        <tr class="h-10">
                            <th class="px-4 font-medium whitespace-nowrap">DIA</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRESENTACIÓN</th>
                            <th class="px-4 font-medium whitespace-nowrap">CANTIDAD</th>
                            <th class="px-4 font-medium whitespace-nowrap">PESO</th>
                            <th class="px-4 font-medium whitespace-nowrap">TOTAL</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                        </tr>
                    </thead>
                    <tbody id="bodyCuentaDelCliente">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div> --}}
        {{-- Tercer Contenedor Descuentos --}}
        <div id="tercerContenedorReporteDeDescuentos" class="hidden">
            <div class="md:mx-5 mt-0 mb-5 relative">
                <div class="flex flex-col gap-5">
                    <div class="flex justify-center items-start flex-col relative">
                        <label for="idCuentaDelClienteDescuentos" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <i class='bx bxs-user-circle text-xl'></i>
                            </span>
                            <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCuentaDelClienteDescuentos" autocomplete="off" id="idCuentaDelClienteDescuentos" placeholder="Ingrese Nombre de Cliente">
                        </div>
                    </div>
                    <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                        <div class="flex flex-col justify-center">
                            <label for="fechaDesdeCuentaDelClienteDescuentos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCuentaDelClienteDescuentos">
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="fechaHastaCuentaDelClienteDescuentos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCuentaDelClienteDescuentos">
                        </div>
                        <div class=" flex items-end">
                            <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelClienteDescuentos"><i class='bx bx-search-alt'></i> Buscar</button>
                        </div>
                    </div>
                    <div class="flex justify-end w-full">
                        <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-600" type="submit" autocomplete="off" id="registrar_agregarDescuento_submit"><i class='bx bxs-discount text-lg'></i><h5 class="min-w-max">Agregar Descuento</h5></button>
                    </div>
                </div>
            </div>
            {{-- Tabla --}}
            <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelClienteDescuentos">
                    <thead id="headerCuentaDelClienteDescuentos" class="bg-blue-600 text-gray-50 sticky top-0">
                        <tr class="h-10">
                            <th class="hidden">ID</th>
                            <th class="px-4 font-medium whitespace-nowrap">CLIENTE</th>
                            <th class="px-4 font-medium whitespace-nowrap">Kg.</th>
                            <th class="px-4 font-medium whitespace-nowrap">ESPECIE</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                            <th class="px-4 font-medium whitespace-nowrap">DIA</th>
                            <th class="px-4 font-medium whitespace-nowrap">OBSERVACION</th>
                        </tr>
                    </thead>
                    <tbody id="bodyCuentaDelClienteDescuentos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        {{-- Termina contenedor Reporte de Pagos --}}  
    </div>
</main>

{{-- Modal Agregar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoCliente">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Pago</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoCliente">
                        <div class="w-full h-full" id="divClienteOpcional">
                            <div class="flex justify-center items-start flex-col relative w-full h-full">
                                <label for="idAgregarPagoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                                <div class="flex max-w-xs w-full">
                                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <i class='bx bxs-user-circle text-xl'></i>
                                    </span>
                                    <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoCliente" autocomplete="off" id="idAgregarPagoCliente" placeholder="Ingrese Nombre de Cliente">
                                </div>
            
                                <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                                <label id="selectedCodigoCliAgregarPagoCliente" class="hidden" val=""></label>
            
                                <!-- Contenedor para las sugerencias -->
                                <div id="contenedorClientesAgregarPagoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                    <!-- Aquí se mostrarán las sugerencias -->
                                </div>
                            </div>
                            <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotal">0.00</span></h2>
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Pago Derivado a :</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="pagoDerivado" id="pagoDerivado">
                                <option value="1">Depositos a Banco</option>
                                <option value="2">Caja Chica</option>
                                <option value="3">Cobranza de Paul</option>
                                <option value="4">Egresos de Paul</option>
                                <option value="5">Depositos a Granja</option>
                            </select>                          
                        </div>
                        <div class="flex justify-center items-start flex-col relative w-full h-full" id="divEgresoPaul">
                            <input type="text" class="hidden" value="" id="idReporteDeEgreso">
                            <label for="idAgregarEgresoPaul" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarEgresoPaul" autocomplete="off" id="idAgregarEgresoPaul" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPago" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPago">
                        </div>
                        <div class="flex w-full justify-start items-center gap-2" id="divHoraaa">
                            <h5 for="horaAgregarPago" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Hora :</h5>
                            <input type="time" step="1" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="horaAgregarPago">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoCliente" autocomplete="off" id="valorAgregarPagoCliente" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePago" id="formaDePago">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Yape">Yape</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBanco">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoCliente" autocomplete="off" id="bancoAgregarPagoCliente" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTrans">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoCliente" autocomplete="off" id="codAgregarPagoCliente" value="">
                        </div>
                        <div class="flex flex-col w-full" id="divComentario">
                            <label for="comentarioAgregarPagoCliente" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoCliente" autocomplete="off" id="comentarioAgregarPagoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoCliente">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Pago --}}

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

{{-- Modal Agregar Descuento --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarDescuentoCliente">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Descuento</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarDescuentoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarDescuentoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarDescuentoCliente" autocomplete="off" id="idAgregarDescuentoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarDescuentoCliente" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarDescuentoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarDescuento" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarDescuento">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Presentación</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="presentacionAgregarDescuentoCliente" id="presentacionAgregarDescuentoCliente">

                            </select>                          
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Descuento Kg.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarDescuentoCliente" placeholder="0.0" autocomplete="off" id="valorAgregarDescuentoCliente" value="">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioDescuento" autocomplete="off" id="valorPrecioDescuento" value="" placeholder="0.0">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarDescuentoCliente" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarDescuentoCliente" autocomplete="off" id="comentarioAgregarDescuentoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarDescuentoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarDescuentoCliente">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Descuento --}}

{{-- Modal Editar Descuento --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalEditarDescuentoClienteEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Descuento</h3>
                    </div>
                    <label class="hidden" type="text" value="" id="valorEditarDescuentoCliente"></label>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divEditarDescuentoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <label class="hidden" value="" id="idEditarNombreDeClienteDescuento"></label>
                                <input disabled="" class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idEditarNombreDescuentoCliente" autocomplete="off" id="idEditarNombreDescuentoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaPagoEditarDescuento" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaPagoEditarDescuento">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Presentación</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="editarPresentacionDescuentoCliente" id="editarPresentacionDescuentoCliente">

                            </select>                          
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Descuento Kg.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorClienteEditarDescuento" autocomplete="off" id="valorClienteEditarDescuento" value="" placeholder="0.0">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioEditarDescuento" autocomplete="off" id="valorPrecioEditarDescuento" value="" placeholder="0.0">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoClienteEditar" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioEditarDescuentoCliente" autocomplete="off" id="comentarioEditarDescuentoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnEditarDescuentoClienteEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalEditarDescuento">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Descuento --}}
{{-- Modal Agregar Egreso Editar --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarEgresoEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Egreso Editar</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarEgresoEditar">
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarEgresoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarEgresoEditar">
                        </div>
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <input type="text" class="hidden" value="" id="idReporteDeEgresoEditar">
                            <label for="idAgregarEgresoEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Uso :</label>
                            <div class="flex w-full">
                                <textarea class="validarCampo w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarEgresoEditar" autocomplete="off" id="idAgregarEgresoEditar" placeholder="Ingrese Uso"></textarea>
                            </div>
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="cantidadAgregarEgresoClienteEditar" autocomplete="off" id="cantidadAgregarEgresoClienteEditar" value="" placeholder="Ingrese Cantidad">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio:</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarEgresoClienteEditar" autocomplete="off" id="valorAgregarEgresoClienteEditar" value="" placeholder="Ingrese Precio">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Monto:</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="montoAgregarEgresoClienteEditar" autocomplete="off" id="montoAgregarEgresoClienteEditar" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="hidden w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEgresoEditar" id="formaDePagoEgresoEditar">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Yape">Yape</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divBancoEgresoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full mayusculasGaaa uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarEgresoClienteEditar" autocomplete="off" id="bancoAgregarEgresoClienteEditar" value="">
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEgresoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarEgresoClienteEditar" autocomplete="off" id="codAgregarEgresoClienteEditar" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarEgresoEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarEgresoEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Egreso Editar --}}

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
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
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
                        </div>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full md:w-80" id="fechaCambiarPrecioPesada">
                        <select class="h-10 w-full md:w-80 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especiesCambioPrecioPesadas" id="especiesCambioPrecioPesadas">
                        </select> 
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <b>S/</b>
                            </span>
                            <input class="validarSoloNumerosDosDecimales max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nuevoPrecioCambiarPesadas" autocomplete="off" id="nuevoPrecioCambiarPesadas" placeholder="Ingrese Nuevo Precio">
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
@endsection