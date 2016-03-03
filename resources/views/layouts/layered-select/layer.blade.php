<?php $hash = uniqid(); $level++ ?>

<div class="list-item" draggable="true" data-level="{{ $level }}" data-count="{{ $category->count }}" data-name="{{ $category->name }}">

    <a href="javascript:void(0)" data-target="{{ '#' . $hash }}" class="list-item-text list-group-item" data-toggle="collapse">
        <i class="glyphicon chevron glyphicon-chevron-right"></i>
        <span class="badge level level-{{ $level }}">{{ 'Lvl ' . $level }}</span>
        <span class="badge count">{{ $category->count }}</span>
        <span class="list-item-label">{{ $category->name }}</span>
    </a>

    <div class="list-group collapse categories" id="{{ $hash }}">
        @foreach($category->categories as $category)
            @if(count($category->categories))
                @include('layouts.layered-select.layer', ['category' => $category, 'level' => $level])
            @else
                @include('layouts.layered-select.bottom', ['category' => $category, 'level' => $level])
            @endif
        @endforeach
    </div>

</div>
