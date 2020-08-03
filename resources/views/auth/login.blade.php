@extends('layouts.app')
@section('title')
   {{ __('page-titles.login') }} | {{ config('app.name', 'Skote') }}
@endsection
@section('content')
<div>
    <div class="home-btn d-none d-sm-block">
      <a href="{{ route("home") }}" class="text-dark">
        <i class="fas fa-home h2"></i>
      </a>
    </div>
    <div class="account-pages my-5 pt-5">
      <div class="container">
        <login submit-url="{{ route('login') }}" auth-error="{{ $errors->first() }}">
            @csrf
        </login>
      </div>
    </div>
  </div>
@endsection
