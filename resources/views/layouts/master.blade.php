<html>
<head>
    <title>eyup - @yield('title')</title>

    <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
@yield('sidebar')

<div class="container">
    @yield('content')
</div>

<script src="{{ URL::asset('js/main.js') }}"></script>
</body>
</html>