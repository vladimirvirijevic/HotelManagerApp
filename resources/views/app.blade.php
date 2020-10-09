<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hotel Manager</title>

        <!-- Fonts -->
        <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,400&display=swap"
    rel="stylesheet">
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <script src="https://kit.fontawesome.com/e54ced1164.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        {{-- <script src="{{ asset('js/app.js') }}"></script> --}}
    </body>
</html>
