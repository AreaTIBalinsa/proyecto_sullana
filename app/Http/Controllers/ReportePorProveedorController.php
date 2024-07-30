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
                    WHERE tb_guias.estadoGuia = 1 AND fechaGuia BETWEEN ? AND ? order by idGuia asc',[$fechaDesde,$fechaHasta]);

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

        if (Auth::check()) {
            $registrarGuia = new RegistrarGuia;
            $registrarGuia->idProveedor = $idProveedor;
            $registrarGuia->cantidadGuia = $cantidadAgregarGuia;
            $registrarGuia->precioGuia = $precioAgregarGuia;
            $registrarGuia->pesoBrutoGuia = $precioPesoBruto;
            $registrarGuia->pesoTaraGuia = $precioPesoTara;
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

        if (Auth::check()) {
            $ActualizarGuia = new ActualizarGuia;
            $ActualizarGuia->where('idGuia', $idActualizarGuia)
                ->update([
                    'idProveedor' => $idProveedorEditar,
                    'cantidadGuia' => $cantidadAgregarGuiaEditar,
                    'pesoBrutoGuia' => $pesoBrutoEditar,
                    'pesoTaraGuia' => $pesoTaraEditar,
                    'precioGuia' => $precioAgregarGuiaEditar,
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

}