<template>
    <div class="container">
      <Header4 title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" thirdRoute="Hub Operations"/>
        <h1>{{ $route.params.group }} - {{ $route.params.id }}</h1>
        <p style="margin-top: 10px; line-height: 34px;">
            Dinamic Routing Testing
        </p>
      </div>
    </div>
  </template>
