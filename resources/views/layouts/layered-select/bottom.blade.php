<?php $level++ ?>

<div class="list-item bottom" draggable="true" data-level="{{ $level }}" data-count="{{ $category->count }}" data-name="{{ $category->name }}">
    <a href="javascript:void(0)" class="list-item-text list-group-item">
        <span class="badge level level-{{ $level }}">{{ 'Lvl ' . $level }}</span>
        <span class="badge count">{{ $category->count }}</span>
        <span class="list-item-label">{{ $category->name }}</span>
    </a>
</div>
