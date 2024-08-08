@vite(['resources/js/reporte_por_proveedor.js'])
@extends('aside')
@section('titulo', 'Reporte por Proveedor')
@section('contenido')
<main class="p-6 min-h-[calc(100%-161px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte por Proveedor --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte por Proveedor</h4>
        <div class="md:mx-5 mt-0 mb-5 relative">
            <div class="flex flex-col gap-5">
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorProveedor">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorProveedor">
                    </div>
                </div>
                <div class="flex gap-4 justify-between w-full flex-col md:flex-row">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarReportePorProveedor"><i class='bx bx-search-alt'></i> Buscar</button>
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnAgregarGuiasReportePorProveedor"><i class='bx bxs-file-plus'></i> Agregar Guias</button>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReportePorProveedor">
                <thead id="headerReportePorProveedor" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="hidden">Id</th>
                        <th class="px-4 font-medium whitespace-nowrap">N° GUIA</th>
                        <th class="px-4 font-medium whitespace-nowrap">ESPECIE</th>
                        <th class="px-4 font-medium whitespace-nowrap">CANTIDAD</th>
                        <th class="px-4 font-medium whitespace-nowrap">PESO BRUTO</th>
                        <th class="px-4 font-medium whitespace-nowrap">TARA</th>
                        <th class="px-4 font-medium whitespace-nowrap">PESO NETO</th>
                        <th class="px-4 font-medium whitespace-nowrap">PROMEDIO</th>
                        @if (auth()->user()->tipoUsu == 'Administrador')
                            <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                            <th class="px-4 font-medium whitespace-nowrap">TOTAL</th>
                        @endif
                        <th class="px-4 font-medium whitespace-nowrap">OPCIONES</th>
                    </tr>
                </thead>
                <tbody id="bodyReportePorProveedor">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        <div class="md:mx-5 md:mb-5">
            <h2 class="text-gray-900 dark:text-white text-base font-semibold mb-5">Control de Stock</h2>
            <div class="flex gap-x-10 gap-4 w-full flex-col md:flex-row items-end justify-start mb-5">
                <div class="flex flex-col justify-center w-full md:w-auto">
                    <label for="fechaDesdeReportePorProveedorControlStock" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorProveedorControlStock">
                </div>
                <div class="flex flex-col justify-center w-full md:w-auto">
                    <label for="fechaHastaReportePorProveedorControlStock" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorProveedorControlStock">
                </div>
                <button class="w-full md:w-auto text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarReportePorProveedorControlStock"><i class='bx bx-search-alt'></i> Buscar</button>
            </div>
            <div class="flex gap-4 justify-end w-full flex-col md:flex-row mb-5">
                <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg flex items-center justify-center gap-2" id="btnAgregarStockReportePorProveedor"><i class='bx bx-list-plus text-2xl'></i> Agregar Stock</button>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table class="w-full text-sm text-center border-collapse text-gray-500 dark:text-gray-400">
                    <thead class="text-sm uppercase bg-blue-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Fecha
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Proveedor
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Cantidad
                            </th>
                            <th scope="col" class="px-6 py-3 border-b-2 whitespace-nowrap">
                                Peso
                            </th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteControlStock">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="4" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        @if (auth()->user()->tipoUsu == 'Administrador')
        {{-- Termina contenedor Reporte por Proveedor --}}
        <div class="relative rounded-lg md:px-5 md:mb-5 mt-10 max-h-[500px] flex justify-center items-center gap-6 flex-col w-full">
            <div class="w-full overflow-auto aside_scrollED">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="bg-blue-600 p-2 w-full rounded-lt-lg border-b-2 text-sm font-bold text-gray-100">Pagos a Proveedores</caption>
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Fecha</th>
                            <th class="p-4 border-l-2 border-r-2 border-b-2 text-center whitespace-nowrap">Nombre de Proveedor</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Importe</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Codigo</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Hora</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Banco</th>
                            <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap">Forma Pago</th>
                            <th class="p-4 border-r-[1px] border-b-2 text-center whitespace-nowrap">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody id="bodyReporteDePagosProveedores">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full overflow-auto aside_scrollED">
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
        </div>
        @endif
    </div>
</main>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalRegistrarGuias">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Guia!</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">N° de Guia</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorNumeroGuiaAgregarGuia" placeholder="0" autocomplete="off" id="valorNumeroGuiaAgregarGuia" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarGuia">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idProveedorAgregarGuia" id="idProveedorAgregarGuia">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuia" placeholder="0" autocomplete="off" id="valorCantidadAgregarGuia" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Bruto</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoBruto" placeholder="0.00" autocomplete="off" id="valorPesoBruto" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Tara</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoTara" placeholder="0.00" autocomplete="off" id="valorPesoTara" value="">
                    </div>
                    @if (auth()->user()->tipoUsu == 'Administrador')
                        <div class="mt-4 flex justify-center items-center h-10">
                            <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioAgregarGuia" placeholder="0.00" autocomplete="off" id="valorPrecioAgregarGuia" value="">
                        </div>
                    @endif
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarGuias">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarGuias" id="btncerrarModalRegistrarGuias">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalRegistrarGuiasEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Guia!</h3>
                    </div>
                    <label id="idGuiaEditar" class="hidden"></label>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">N° de Guia</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorNumeroGuiaAgregarGuiaEditar" placeholder="0" autocomplete="off" id="valorNumeroGuiaAgregarGuiaEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarGuiaEditar">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idProveedorAgregarGuiaEditar" id="idProveedorAgregarGuiaEditar">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuiaEditar" placeholder="0" autocomplete="off" id="valorCantidadAgregarGuiaEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Bruto</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoBrutoEditar" placeholder="0.00" autocomplete="off" id="valorPesoBrutoEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Tara</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoTaraEditar" placeholder="0.00" autocomplete="off" id="valorPesoTaraEditar" value="">
                    </div>
                    @if (auth()->user()->tipoUsu == 'Administrador')
                        <div class="mt-4 flex justify-center items-center h-10">
                            <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioAgregarGuiaEditar" placeholder="0.00" autocomplete="off" id="valorPrecioAgregarGuiaEditar" value="">
                        </div>
                    @endif
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarGuiasEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarGuiasEditar" id="btncerrarModalRegistrarGuiasEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal Editar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalAgregarPagoProveedoresEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Pago Proveedores</h3>
                    </div>
                    <input type="text" class="hidden" value="0" id="idEditarPagoProveedor">
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoClienteEditar">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="inputNombreClientes" class="font-semibold text-gray-800 dark:text-white">Proveedor :</label>
                            <div class="relative flex w-full">
                                <div class="inline-flex h-10 items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </div>
                                <div class="w-full md:w-64 relative">
                                    <input type="text" class="hidden" disabled="disabled" value="0" id="codigoClienteSeleccionado">
                                    <div class="relative w-full md:w-64 h-10 text-sm">
                                        <input
                                          class="peer w-full h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500 uppercase"
                                          placeholder=" " id="inputNombreClientes" autocomplete="off"/><label
                                          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[7px] peer-placeholder-shown:text-sm text-[10px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Ingrese nombre de Proveedor
                                        </label>
                                      </div>
                                    <div id="contenedorDeClientes" class="w-full max-h-60 border border-gray-300 rounded-lg absolute hidden overflow-auto text-sm divide-y divide-gray-200 bg-white dark:bg-gray-800"></div>
                                </div>
                                <div id="clienteSeleccionadoCorrecto" class="ml-1 hidden justify-center items-center px-2 text-white bg-green-500 text-sm border border-gray-300 rounded-md dark:border-gray-600">
                                    <i class='bx bx-check text-xl'></i>
                                </div>
                            </div>
                        </div>
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
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="flex w-full h-10" id="divBancoEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Banco</h4>
                            </div>
                            <input class="w-full mayusculasGaaa uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="bancoAgregarPagoClienteEditar" autocomplete="off" id="bancoAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="flex w-full h-10" id="divCodTransEditar">
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
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoProveedoresEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Pago --}}

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalRegistrarStock">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Stock!</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarStock">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idProveedorAgregarGuia" id="idProveedorAgregarStock">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuia" placeholder="0" autocomplete="off" id="valorCantidadAgregarStock" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoBruto" placeholder="0.00" autocomplete="off" id="valorPesoStock" value="">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarStock">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarStock" id="btncerrarModalRegistrarStock">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed inset-0 overflow-y-auto z-[100] hidden" id="ModalRegistrarStockEditar">
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
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Stock!</h3>
                    </div>
                    <input type="text" class="hidden" id="idStockEditar">
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarStockEditar">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" id="idProveedorAgregarStockEditar">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuia" placeholder="0" autocomplete="off" id="valorCantidadAgregarStockEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoBruto" placeholder="0.00" autocomplete="off" id="valorPesoStockEditar" value="">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarStockEditar">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarStockEditar" id="btncerrarModalRegistrarStockEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection