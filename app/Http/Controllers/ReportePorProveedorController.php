<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ReportePorProveedor\DatosProveedor;
use App\Models\ReportePorProveedor\RegistrarGuia;
use App\Models\ReportePorProveedor\EliminarGuia;
use App\Models\ReportePorProveedor\EliminarPago;
use App\Models\ReportePorProveedor\ActualizarGuia;
use App\Models\ReportePorProveedor\AgregarPagoClienteProveedores;
use App\Models\ReportePorProveedor\EditarStockReportePorProveedores;
use App\Models\ReportePorProveedor\RegistrarStock;
use App\Models\ReportePorProveedor\EliminarStock;

class ReportePorProveedorController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_por_proveedor');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarProveedor(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select idGuia, 
                    numGuia,
                    tb_especies_compra.nombreEspecie as nombreEspecieCompra,
                    tb_guias.idProveedor,
                    cantidadGuia,
                    precioGuia,
                    fechaGuia,
                    pesoBrutoGuia,
                    pesoTaraGuia
                    from tb_guias
                    INNER JOIN tb_especies_compra ON tb_guias.idProveedor = tb_especies_compra.idEspecie 
                    WHERE tb_guias.estadoGuia = 1 AND fechaGuia BETWEEN ? AND ?
                    order by idGuia asc',[$fechaDesde,$fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosProveedor(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosProveedor::select('idEspecie', 'nombreEspecie')
                ->where('idEspecie','!=', '13')
                ->where('idEspecie','!=', '14')
                ->where('idEspecie','!=', '15')
                ->where('idEspecie','!=', '16')
                ->where('idEspecie','!=', '17')
                ->where('idEspecie','!=', '21')
                ->orderBy('idEspecie', 'asc')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarGuia(Request $request)
    {
        $idProveedor = $request->input('idProveedor');
        $cantidadAgregarGuia = $request->input('cantidadAgregarGuia');
        $precioAgregarGuia = $request->input('precioAgregarGuia');
        $fechaRegistrarGuia = $request->input('fechaRegistrarGuia');
        $precioPesoBruto = $request->input('precioPesoBruto');
        $precioPesoTara = $request->input('precioPesoTara');
        $valorNumeroGuiaAgregarGuia = $request->input('valorNumeroGuiaAgregarGuia');
        $especie = $request->input('especie');

        if (Auth::check()) {
            $registrarGuia = new RegistrarGuia;
            $registrarGuia->idProveedor = $idProveedor;
            $registrarGuia->idEspecie = $especie;
            $registrarGuia->cantidadGuia = $cantidadAgregarGuia;
            $registrarGuia->precioGuia = $precioAgregarGuia ? $precioAgregarGuia : 0;
            $registrarGuia->pesoBrutoGuia = $precioPesoBruto;
            $registrarGuia->pesoTaraGuia = $precioPesoTara ? $precioPesoTara : 0;
            $registrarGuia->fechaGuia = $fechaRegistrarGuia;
            $registrarGuia->numGuia = $valorNumeroGuiaAgregarGuia;
            $registrarGuia->save();
        
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarGuia(Request $request)
    {
        $codigoGuia = $request->input('codigoGuia');

        if (Auth::check()) {
            $EliminarGuia = new EliminarGuia;
            $EliminarGuia->where('idGuia', $codigoGuia)
                ->update([
                    'estadoGuia' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarGuia(Request $request){

        $codigoGuia = $request->input('codigoGuia');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            select idGuia, 
            numGuia,
            idEspecie,
            idProveedor,
            cantidadGuia,
            precioGuia,
            fechaGuia,
            pesoBrutoGuia,
            pesoTaraGuia
            from tb_guias
            WHERE idGuia = ?',[$codigoGuia]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarGuiaEditar(Request $request)
    {
        $idActualizarGuia = $request->input('idActualizarGuia');
        $idProveedorEditar = $request->input('idProveedorEditar');
        $cantidadAgregarGuiaEditar = $request->input('cantidadAgregarGuiaEditar');
        $pesoBrutoEditar = $request->input('pesoBrutoEditar');
        $pesoTaraEditar = $request->input('pesoTaraEditar');
        $precioAgregarGuiaEditar = $request->input('precioAgregarGuiaEditar');
        $fechaRegistrarGuiaEditar = $request->input('fechaRegistrarGuiaEditar');
        $valorNumeroGuiaAgregarGuiaEditar = $request->input('valorNumeroGuiaAgregarGuiaEditar');
        $especie = $request->input('especie');

        if (Auth::check()) {
            $ActualizarGuia = new ActualizarGuia;
            $ActualizarGuia->where('idGuia', $idActualizarGuia)
                ->update([
                    'idProveedor' => $idProveedorEditar,
                    'idEspecie' => $especie,
                    'cantidadGuia' => $cantidadAgregarGuiaEditar,
                    'pesoBrutoGuia' => $pesoBrutoEditar,
                    'pesoTaraGuia' => $pesoTaraEditar ? $pesoTaraEditar : 0,
                    'precioGuia' => $precioAgregarGuiaEditar ? $precioAgregarGuiaEditar : 0,
                    'fechaGuia' => $fechaRegistrarGuiaEditar,
                    'numGuia' => $valorNumeroGuiaAgregarGuiaEditar,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosFechasProveedores(Request $request){

        $fechaDesdeTraerProveedores = $request->input('fechaDesdeTraerProveedores');
        $fechaHastaTraerProveedores = $request->input('fechaHastaTraerProveedores');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT tb_pagos_proveedores.idPagos, 
                tb_pagos_proveedores.cantidadAbonoPag,
                tb_pagos_proveedores.tipoAbonoPag,
                tb_pagos_proveedores.fechaOperacionPag,
                tb_pagos_proveedores.codigoTransferenciaPag,
                tb_pagos_proveedores.observacion,
                tb_pagos_proveedores.fechaRegistroPag,
                tb_pagos_proveedores.horaOperacionPag,
                tb_pagos_proveedores.bancaPago,
                tb_pagos_proveedores.codigoCli,
                tb_especies_compra.nombreEspecie AS nombreCompleto
                FROM tb_pagos_proveedores
                LEFT JOIN tb_especies_compra ON tb_especies_compra.idEspecie = tb_pagos_proveedores.codigoCli  
                WHERE tb_pagos_proveedores.estadoPago = 1 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ? 
                ORDER BY idPagos ASC, nombreCompleto ASC', ["Saldo",$fechaDesdeTraerProveedores,$fechaHastaTraerProveedores]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VerificarCodigoPagoProveedores(Request $request){

        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_pagos_proveedores.idPagos, 
                    tb_pagos_proveedores.cantidadAbonoPag,
                    tb_pagos_proveedores.tipoAbonoPag,
                    tb_pagos_proveedores.fechaOperacionPag,
                    tb_pagos_proveedores.codigoTransferenciaPag,
                    tb_pagos_proveedores.observacion,
                    tb_pagos_proveedores.fechaRegistroPag,
                    tb_pagos_proveedores.horaOperacionPag,
                    tb_pagos_proveedores.bancaPago,
                    tb_especies_compra.idEspecie,
                    tb_especies_compra.nombreEspecie AS nombreCompleto
            FROM tb_pagos_proveedores
            LEFT JOIN tb_especies_compra ON tb_especies_compra.idEspecie = tb_pagos_proveedores.codigoCli  
            WHERE codigoTransferenciaPag = ? AND estadoPago = 1',[$codAgregarPagoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarPagoClienteProveedores(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $formaDePago = $request->input('formaDePago');
        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');
        $comentarioAgregarPagoCliente = $request->input('comentarioAgregarPagoCliente');
        $bancoAgregarPagoCliente = $request->input('bancoAgregarPagoCliente');
        $horaAgregarPago = $request->input('horaAgregarPago');
        $pagoDerivado = $request->input('pagoDerivado');
        $nombreCliente = $request->input('nombreCliente');
        $fechaRegistroPagoCliente = $request->input('fechaRegistroPagoCliente');
        $especie = $request->input('especie');

        if (Auth::check()) {
            $agregarPagoCliente = new AgregarPagoClienteProveedores;
            $agregarPagoCliente->codigoCli = $codigoCliente;
            $agregarPagoCliente->tipoAbonoPag = $formaDePago;
            $agregarPagoCliente->cantidadAbonoPag = $montoAgregarPagoCliente;
            $agregarPagoCliente->fechaOperacionPag = $fechaAgregarPagoCliente;
            $agregarPagoCliente->codigoTransferenciaPag = $codAgregarPagoCliente;
            $agregarPagoCliente->observacion = $comentarioAgregarPagoCliente;
            $agregarPagoCliente->bancaPago = $bancoAgregarPagoCliente;
            $agregarPagoCliente->horaOperacionPag = $horaAgregarPago;
            $agregarPagoCliente->fechaRegistroPag = $fechaRegistroPagoCliente === null ? now()->setTimezone('America/New_York')->toDateString() : $fechaRegistroPagoCliente;
            $agregarPagoCliente->estadoPago = 1;
            $agregarPagoCliente->campoExtraEspecie = $especie;
            $agregarPagoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPagoProveedor(Request $request)
    {
        $codigoPago = $request->input('codigoPago');

        if (Auth::check()) {
            $EliminarPago = new EliminarPago;
            $EliminarPago->where('idPagos', $codigoPago)
                ->update([
                    'estadoPago' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_actualizarPagoProveedor(Request $request)
    {
        $idPago = $request->input('idPago');
        $codigoEspecie = $request->input('codigoEspecie');
        $fechaPago = $request->input('fechaPago');
        $horaPago = $request->input('horaPago');
        $importePago = $request->input('importePago');
        $bancoPago = $request->input('bancoPago');
        $codigoTransferencia = $request->input('codigoTransferencia');
        $formaPago = $request->input('formaPago');
        $comentarioPago = $request->input('comentarioPago');

        if (Auth::check()) {
            $EliminarPago = new AgregarPagoClienteProveedores;
            $EliminarPago->where('idPagos', $idPago)
                ->update([
                    'codigoCli' => $codigoEspecie,
                    'fechaOperacionPag' => $fechaPago,
                    'horaOperacionPag' => $horaPago,
                    'cantidadAbonoPag' => $importePago,
                    'bancaPago' => $bancoPago,
                    'codigoTransferenciaPag' => $codigoTransferencia,
                    'tipoAbonoPag' => $formaPago,
                    'observacion' => $comentarioPago,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerControlStock(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
                tb_stock.id_stock, 
                tb_stock.fecha_stock,
                tb_stock.cantidad_stock,
                tb_stock.peso_stock,
                tb_stock.estado_stock,
                tb_stock.idProveedor,
                tb_stock.precio_stock,
                tb_especies_compra.nombreEspecie
            FROM tb_stock
            INNER JOIN tb_especies_compra ON tb_especies_compra.idEspecie = tb_stock.idProveedor
            WHERE fecha_stock BETWEEN ? AND ? and estado_stock = 1
            ORDER BY fecha_stock asc',[$fechaDesde,$fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosProveedorStock(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosProveedor::select('idEspecie', 'nombreEspecie')
                ->whereIn('idEspecie', [13, 14, 15, 16, 17, 21])
                ->orderBy('idEspecie', 'asc')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarStock(Request $request)
    {
        $fechaStock = $request->input('fechaStock');
        $idProveedor = $request->input('idProveedor');
        $valorCantidad = $request->input('valorCantidad');
        $valorPeso = $request->input('valorPeso');
        $precioNuevo = $request->input('precioNuevo');

        if (Auth::check()) {
            $registrarGuia = new RegistrarStock;
            $registrarGuia->fecha_stock = $fechaStock;
            $registrarGuia->idProveedor = $idProveedor;
            $registrarGuia->cantidad_stock = $valorCantidad;
            $registrarGuia->peso_stock = $valorPeso;
            $registrarGuia->precio_stock = $precioNuevo;
            $registrarGuia->save();
        
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarStock(Request $request)
    {
        $codigoStock = $request->input('codigoStock');

        if (Auth::check()) {
            $EliminarStock = new EliminarStock;
            $EliminarStock->where('id_stock', $codigoStock)
                ->update([
                    'estado_stock' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarStockEditar(Request $request)
    {
        $fechaStock = $request->input('fechaStock');
        $idProveedor = $request->input('idProveedor');
        $valorCantidad = $request->input('valorCantidad');
        $valorPeso = $request->input('valorPeso');
        $idStock = $request->input('idStock');
        $precioNuevo = $request->input('precioNuevo');

        if (Auth::check()) {
            $EditarStock = new EditarStockReportePorProveedores;
            $EditarStock->where('id_stock', $idStock)
                ->update([
                    'fecha_stock' => $fechaStock,
                    'idProveedor' => $idProveedor,
                    'cantidad_stock' => $valorCantidad,
                    'peso_stock' => $valorPeso,
                    'precio_stock' => $precioNuevo
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ConsultarProveedorSum(Request $request) {
        $fecha = $request->input('fecha');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos con sumas y agrupación
            $datos = DB::select('
            SELECT 
                tb_guias.idProveedor,
                SUM(cantidadGuia) as totalCantidadGuia,
                SUM(pesoBrutoGuia) as totalPesoBrutoGuia,
                SUM(pesoTaraGuia) as totalPesoTaraGuia,
                tb_especies_compra.nombreEspecie as nombreEspecieCompra,
                COUNT(idGuia) as totalGuias
            FROM tb_guias
            INNER JOIN tb_especies_compra ON tb_guias.idProveedor = tb_especies_compra.idEspecie 
            WHERE tb_guias.estadoGuia = 1 AND fechaGuia = ?
            GROUP BY tb_guias.idProveedor, tb_especies_compra.nombreEspecie
            ORDER BY tb_guias.idProveedor ASC', [$fecha]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, devuelve un error
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_ConsultarProveedorEstadoCuenta(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        $nombreProveedor = $request->input('nombreProveedor');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select idGuia, 
                    numGuia,
                    tb_especies_compra.nombreEspecie as nombreEspecieCompra,
                    tb_guias.idProveedor,
                    cantidadGuia,
                    precioGuia,
                    fechaGuia,
                    pesoBrutoGuia,
                    pesoTaraGuia
                    from tb_guias
                    INNER JOIN tb_especies_compra ON tb_guias.idProveedor = tb_especies_compra.idEspecie
                    WHERE tb_guias.estadoGuia = 1 AND fechaGuia BETWEEN ? AND ? AND tb_guias.idEspecie = ?
                    order by idGuia asc',[$fechaDesde,$fechaHasta,$nombreProveedor]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
    public function consulta_ConsultarPagosProveedorEstadoCuenta(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        $nombreProveedor = $request->input('nombreProveedor');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT
                        idPagos,
                        tb_especies_compra.nombreEspecie as nombreEspecieCompra,
                        codigoCli,
                        tipoAbonoPag,
                        cantidadAbonoPag,
                        fechaOperacionPag,
                        codigoTransferenciaPag,
                        observacion,
                        fechaRegistroPag,
                        estadoPago,
                        bancaPago,
                        horaOperacionPag,
                        campoExtraEspecie
                    FROM tb_pagos_proveedores
                        INNER JOIN tb_especies_compra ON tb_pagos_proveedores.codigoCli = tb_especies_compra.idEspecie
                    WHERE tb_pagos_proveedores.estadoPago = 1 AND fechaOperacionPag BETWEEN ? AND ? AND campoExtraEspecie = ?
                    ORDER BY idPagos asc',[$fechaDesde,$fechaHasta,$nombreProveedor]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ConsultarCuentaAnteriorProveedorEstadoCuenta(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        $nombreProveedor = $request->input('nombreProveedor');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT
                        IFNULL((SELECT SUM(cantidadAbonoPag)
                                FROM tb_pagos_proveedores
                                WHERE estadoPago = 1 
                                AND fechaOperacionPag < ?
                                AND campoExtraEspecie = ?), 0) AS totalPagos,
                                
                        IFNULL((SELECT SUM((pesoBrutoGuia - pesoTaraGuia) * precioGuia)
                                FROM tb_guias
                                WHERE estadoGuia = 1
                                AND fechaGuia < ?
                                AND idEspecie = ?), 0) AS totalGuias;
                    ',[$fechaHasta,$nombreProveedor, $fechaHasta,$nombreProveedor]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}