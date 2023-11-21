<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define el View Composer para la vista aside
        View::composer('aside', function ($view) {
            // Llama a la función privada para obtener los menús y submenús
            $menusAgrupados = $this->obtenerMenusAgrupados();
            
            // Adjunta los datos a la vista aside
            $view->with('menusAgrupados', $menusAgrupados);
        });
    }

    /**
     * Obtiene los menús y submenús agrupados.
     */
    private function obtenerMenusAgrupados()
    {
        // Obtén el ID del usuario autenticado
        $idUsuario = auth()->id();

        // Realiza la consulta para obtener los menús y submenús asociados al usuario y con estado 'si'
        $menusConSubmenus = DB::table('tb_roles_de_usuario')
            ->where([
                'idUsuario' => $idUsuario,
                'estadoRol' => 'si',
            ])
            ->leftJoin('tb_menus', 'tb_roles_de_usuario.idMenu', '=', 'tb_menus.idMenu')
            ->leftJoin('tb_submenus', 'tb_roles_de_usuario.idSubMenu', '=', 'tb_submenus.idSubMenu')
            ->select('tb_menus.*', 'tb_submenus.*')
            ->get();

        // Organiza los resultados en un formato adecuado para tu vista aside.blade.php
        $menusAgrupados = [];
        foreach ($menusConSubmenus as $menu) {
            $menusAgrupados[$menu->idMenu]['nombreMenu'] = $menu->nombreMenu;
            if (!isset($menusAgrupados[$menu->idMenu]['submenus'])) {
                $menusAgrupados[$menu->idMenu]['submenus'] = [];
            }
            if (!empty((array)$menu)) {
                $menusAgrupados[$menu->idMenu]['submenus'][] = (array)$menu;
            }
        }

        return $menusAgrupados;
    }

}
