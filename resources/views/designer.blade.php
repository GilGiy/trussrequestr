@extends('layout')

@section('content')
<script src="/js/TrussCalcs.js"></script>

<svg width="900" height="400" style="background-color: wheat; margin-left: auto; margin-right: auto;">
    <polyline id="truss-line" points="" stroke="black" fill="transparent" stroke-width="1"/>
</svg>

@endsection