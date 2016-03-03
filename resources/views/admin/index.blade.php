@extends('layouts.master')

@section('title', 'Admin')

@section('content')
<p>
    Hiya {{ $user->name }}
</p>
<p>
    You're logged in ;~)
</p>
@endsection
