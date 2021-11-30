<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/main.js"></script>

    <title>Document</title>
    <header class=" w-auto bg-white h-16 border-b-1">
        <h1 class=" text-3xl pl-8 pt-3">Truss Requestr</h1>
    </header>
</head>
<body class="bg-gray-100">
    @yield('content')
</body>
</html>