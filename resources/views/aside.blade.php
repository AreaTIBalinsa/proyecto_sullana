<!DOCTYPE html>
<html lang="es" class="dark">

<head>
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    <title>@yield('titulo')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href='{{ asset("css/alertify.css") }}' rel='stylesheet'>
    <link href='{{ asset("css/app.css") }}' rel='stylesheet'>
</head>

<body class="bg-white dark:bg-gray-800">
    <div id="preloader_sistema" class="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-[200] bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div class="lds-ellipsis">
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
        </div>
    </div>
    <section class="min-h-screen bg-gray-100 dark:bg-gray-800" x-data="{ sideBar: false }">
        <div class="hidden" id="usuarioRegistroCli" data-id="{{ auth()->user()->id }}"></div>
        <div class="hidden" id="tipoUsuario" data-id="{{ auth()->user()->tipoUsu }}"></div>
        <div class="border-r border-gray-300 dark:border-gray-700 fixed top-0 left-0 z-50 h-full overflow-hidden transition origin-left transform bg-white dark:bg-gray-900 w-60 md:translate-x-0 flex flex-col max-h-screen" :class="{ '-translate-x-full' : !sideBar, 'translate-x-0' : sideBar }" @click.away="sideBar = false"> 
            <a href="/home" class="flex items-center justify-center p-4"> 
                <img src="{{ asset('img/logoBalinsa.png') }}" alt="Logo Balinsa" class="h-12" />
            </a>
            <nav class="overflow-y-scroll h-full aside_scrollED overflow-x-hidden text-sm font-medium text-gray-500 border-t border-gray-300 dark:border-gray-700" aria-label="Main Navigation">
                @foreach ($menusAgrupados as $menu)
                @if (!empty($menu['nombreMenu']))
                    <h2 class="w-max min-w-max pl-4 text-gray-600 dark:text-white h-4 flex items-center text-xs font-semibold">{{ $menu['nombreMenu'] }}</h2>
                @endif
                <ul class="-ml-px space-y-4 font-medium tracking-wide border-1 border-slate-100 border-x-slate-700 py-8 px-1">
                    @foreach ($menu['submenus'] as $submenu)
                    <li>
                        <a href="{{ $submenu['hrefSubMenu'] }}">
                            <div class="flex items-center gap-4 px-4">
                                <i class="{{ $submenu['iconHtml'] }} h-6 w-6 text-gray-700 dark:text-gray-400 text-xl"></i>
                                <p class="text-gray-600 dark:text-gray-400 font-normal overflow-hidden whitespace-nowrap text-ellipsis">{{ $submenu['nombreSubMenu'] }}</p>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
                @endforeach
            </nav>
            <div>
                <div class="modo_oscuro w-full flex justify-between px-4 py-2 border-t border-gray-300 dark:border-gray-700">
                    <div class="info h-8 flex items-center w-36 text-gray-700 dark:text-gray-400 gap-4 overflow-hidden">
                        <i class='bx bx-moon h-6 w-6 text-2xl' ></i>
                        <span class="font-normal text-sm">Modo Oscuro</span>
                    </div>
                    <div id="swith_modo_oscuro" class="w-14 h-8 flex items-center justify-center cursor-pointer">
                        <div class="base_swith w-9 h-5 rounded-full bg-slate-700 relative flex items-center">
                            <div class="circulo_swith duration-300 w-4 h-4 rounded-full bg-gray-100 absolute left-0.5"></div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-10 w-full">
                    <a href="/logout" class="flex items-center gap-2 px-4 py-2 w-full h-full hover:bg-gray-200 dark:hover:bg-gray-800">
                        <i class='bx bx-door-open text-2xl text-gray-700 dark:text-gray-400'></i>
                        <span class="font-normal text-sm text-gray-600 dark:text-gray-400">Cerrar Sesión</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="ml-0 transition md:ml-60">
            <header class="z-20 flex items-center justify-between w-full px-4 h-20 border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 md:relative"> 
                <button class="block btn btn-light-secondary md:hidden" @click.stop="sideBar = true"> 
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="flex text-sm md:text-base flex-col justify-center md:flex-row">
                    <h3 class="text-gray-900 uppercase dark:text-gray-300 font-semibold md:ml-4" id="mensaje_bienvenida">Buenos dias</h3>
                    <span class="text-gray-900 dark:text-gray-300 font-semibold text-center">&nbsp;{{auth()->user()->nombresUsu}}</span>
                </div>
                <div class="flex items-center">
                        <a href="#" class="ml-4 avatar avatar-sm"> 
                            <img src="{{ asset(auth()->user()->rutaPerfilUsu) }}" alt="Perfil de Usuario"/>
                        </a> 
                    </div>
            </header>
            @yield('contenido')
            <footer class="ml-auto bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
                <div class="2xl:container mx-auto">
                    <div class="h-20 flex items-center justify-center"><h3 class="text-gray-900 dark:text-gray-300 text-center text-sm w-64 md:w-full">Todos los derechos reservados. Diseñado y desarrollado por <b>Industrias Balinsa.</b></h3></div>
                    <!-- <div class="h-20 flex items-center justify-center"><h3 class="text-gray-900 dark:text-gray-300 text-center text-sm w-64 md:w-full">Todos los derechos reservados. Diseñado y desarrollado por <b>Santos Vilchez Edinson P.</b></h3></div> -->
                </div>
            </footer>
        </div> <!-- Sidebar Backdrop -->
        <div class="fixed inset-0 z-40 w-screen h-screen bg-black bg-opacity-25 md:hidden" x-show.transition="sideBar" x-cloak></div>
    </section>

    <script src="{{ asset('js/alertify.js') }}"></script>
    <script src="{{ asset('js/DataTableED.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- All components in one -->
    <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/kutty.min.js"></script>
    <!-- Include AlpineJS first -->
    <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/alpinejs.min.js"></script>
    <!-- And then the single component -->
    <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/dropdown.min.js"></script>

    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>

    <?php
    $hrefSubMenus = [];

    foreach ($menusAgrupados as $menu) {
        foreach ($menu['submenus'] as $submenu) {
            $hrefSubMenus[] = $submenu['hrefSubMenu'];
        }
    }
    ?>
    <script>
        let hrefSubMenus = <?php echo json_encode($hrefSubMenus); ?>;
        let rutaActual = window.location.pathname;

        if (hrefSubMenus.indexOf(rutaActual) === -1) {
            window.location.href = '/home';
        }
    </script>
</body>

</html>