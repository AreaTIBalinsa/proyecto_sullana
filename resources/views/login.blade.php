<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
    <div id="preloader_sistema" class="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50 bg-gray-50 dark:bg-neutral-900 overflow-hidden">
        <div class="lds-ellipsis">
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
        </div>
    </div>
    <section class="bg-gray-100 dark:bg-gray-900 w-full min-h-screen flex items-center justify-center">
        <div class="max-w-[850px] w-full">
            <div class="flex rounded-lg drop-shadow-md overflow-hidden mx-auto max-w-sm lg:max-w-4xl bg-gray-100 dark:bg-gray-800">
                <div class="hidden lg:block lg:w-1/2 bg-cover"
                    style="background-image:url('{{ asset('img/logoLogin.svg') }}')">
                </div>
                <div class="w-full p-8 lg:w-1/2 ">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Hola</h2>
                    <p class="text-xl text-gray-600 text-center">¡Bienvenido!</p>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                        <p class="text-xs text-center text-gray-500 uppercase">Iniciar Sesión</p>
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div class="mt-2 mb-4">
                        @if($errors->any())
                            @foreach($errors->all() as $error)
                                <p class="text-sm text-red-500">{{ $error }}</p>
                            @endforeach
                        @endif
                    </div>
                    <form action="/login" method="POST">
                        @csrf
                        <div class="">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email o Usuario</label>
                            <input type="text" value="{{ old('username') }}" name="username" id="username" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" autocomplete="off">
                        </div>
                        <div class="mt-4">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <div class="w-full relative">
                                    <input type="password" value="{{ old('password') }}" name="password" id="password" placeholder="••••••••" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" autocomplete="off">
                                    <div class="flex items-center absolute top-0 right-2 bottom-0">
                                        <label class="" id="passwordMosl"><i class="fa-regular fa-eye-slash text-gray-900 dark:text-white cursor-pointer" id="passwordMos"></i></label>
                                        <label class="hidden" id="passwordOcul"><i class="fa-regular fa-eye text-gray-900 dark:text-white cursor-pointer" id="passwordOcu"></i></label>
                                    </div>
                                </div>
                        </div>
                        <div class="mt-8">
                        <button type="submit" class="bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>
