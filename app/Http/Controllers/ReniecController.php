<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReniecController extends Controller
{
    public function consultarDni(Request $request)
    {
            // Obtener el número de DNI desde la solicitud POST
        $dni = $request->input('dni');

        // Configuración de la solicitud cURL a la API de Reniec
        $url = 'https://api.apis.net.pe/v2/reniec/dni?numero=' . $dni;
        $token = 'apis-token-5684.1ig087GYUAG1GEXOEpFoZIn3Hs6XPBZM'; // Reemplaza con tu token de autenticación

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 2,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Referer: https://apis.net.pe/consulta-dni-api',
                'Authorization: Bearer ' . $token
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        // Comprobar si la respuesta es un JSON válido
        $persona = json_decode($response);

        if ($persona) {
            // Devolver la respuesta en formato JSON
            return response()->json($persona);
        } else {
            return response()->json(['error' => 'Error en la respuesta de la API de Reniec'], 500);
        }
    }
}
