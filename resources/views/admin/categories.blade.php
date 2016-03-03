@extends('admin.index')

@section('content')
    @parent

    <div class="base-category-list">
        <div class="row">
            <div class="col-xs-6">
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu sort">
                        <li data-sort="products-most"><a href="#">Most products</a></li>
                        <li data-sort="products-least"><a href="#">Least products</a></li>
                        <li role="separator" class="divider"></li>
                        <li data-sort="name-ascending"><a href="#">Name ascending</a></li>
                        <li data-sort="name-descending"><a href="#">Name descending</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="input-group">
                    <input type="text" class="form-control search" data-search="name" placeholder="Search for...">
                </div>
            </div>
        </div>

        <div class="just-padding">
            <div class="list-group list-group-root well categories">
                @foreach($categories as $category)
                    @include('layouts.layered-select.layer', ['category' => $category, 'level' => 0])
                @endforeach
            </div>
        </div>
    </div>

    <div class="category-list">
        <div class="just-padding">
            <div class="input-group">
                <input type="text" class="add-root-item" data-add="category" placeholder="Add category..">
            </div>
            <div class="list-group list-group-root well categories">
            </div>
        </div>
    </div>
@endsection
