<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
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
    {{-- <section class="bg-gray-100 dark:bg-gray-900 w-full min-h-screen flex items-center justify-center">
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
    </section> --}}
    <section class="min-h-screen flex items-stretch text-white ">
        <div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style="background-image: url({{ asset('img/fondoimg.jpg') }});">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div class="w-full px-24 z-10">
                <h1 class="text-5xl font-bold text-left tracking-wide">BRIALEMAGI S.A.C</h1>
                <p class="text-3xl my-4">Sistema Integral de gestión avicola.</p>
            </div>
            <div class="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                <p>Distribuido y Producido por <b>INDUSTRIAS BALINSA E.I.R.L.</b></p>
            </div>
        </div>
        <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-white dark:bg-[#161616]">
            <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url({{ asset('img/fondoimg.jpg') }});">
                <div class="absolute dark:bg-black bg-white opacity-60 inset-0 z-0"></div>
            </div>
            <div class="w-full py-6 z-20">
                <h1 class="my-6 text-4xl font-bold text-gray-900 dark:text-white">
                    Bienvenido
                </h1>
                <div class="mt-4 flex items-center justify-center gap-4">
                    <span class="border-b w-1/4"></span>
                    <p class="text-xs text-center text-gray-900 dark:text-gray-100 uppercase">Iniciar Sesión</p>
                    <span class="border-b w-1/4"></span>
                </div>
                <div class="mt-2 mb-4">
                    @if($errors->any())
                        @foreach($errors->all() as $error)
                            <p class="text-sm text-red-500">{{ $error }}</p>
                        @endforeach
                    @endif
                </div>
                <form action="/login" method="POST" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        @csrf
                    <div class="pb-2 pt-4">
                        {{-- <input type="text" name="username" id="username" placeholder="Email o Usuario" class="block w-full p-4 text-lg rounded-sm bg-black"> --}}
                        <div class="flex flex-col gap-2">
                            <div class="relative flex w-full">
                                <div
                                    class="inline-flex h-14 items-center px-4 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300">
                                    <i class='bx bxs-user-circle text-2xl'></i>
                                </div>
                                <div class="w-full relative">
                                    <div class="relative w-full h-14 text-lg">
                                        <input
                                            class="inputLogin peer w-full h-14 bg-white dark:bg-[#050505] text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500"
                                            placeholder=" " value="{{ old('username') }}" name="username" id="username" autocomplete="off" /><label
                                            class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-[0] peer-focus:leading-[0] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[0px] peer-placeholder-shown:text-sm text-[14px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Email o Usuario
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="pb-2 pt-4">
                        {{-- <input class="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" placeholder="Password"> --}}
                        <div class="flex flex-col gap-2">
                            <div class="relative flex w-full">
                                <div
                                    class="inline-flex h-14 items-center px-4 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300">
                                    <i class='bx bxs-lock text-2xl'></i>
                                </div>
                                <div class="w-full relative">
                                    <div class="relative w-full h-14 text-lg">
                                        <input
                                            class="inputLogin peer w-full h-14 bg-white dark:bg-[#050505] text-gray-800 dark:text-gray-300 font-sans font-medium outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded-l-none rounded-lg border-gray-400 focus:border-blue-500"
                                            placeholder=" " type="password" value="{{ old('password') }}" name="password" id="password" autocomplete="off" /><label
                                            class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-[0] peer-focus:leading-[0] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-[0px] peer-placeholder-shown:text-sm text-[14px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.8] peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500 text-gray-700 dark:text-gray-200">Contraseña
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="px-4 pb-2 pt-4">
                        <button class="uppercase block w-full p-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none">Ingresar</button>
                    </div>

                    <div class="p-4 text-gray-900 dark:text-gray-100 text-center right-0 left-0 flex justify-center mt-16 lg:hidden ">
                        <p>Distribuido y Producido por <b>INDUSTRIAS BALINSA E.I.R.L.</b></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</body>
</html>
