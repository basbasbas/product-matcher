@foreach ($categories as $category)
    {{--Level 1..--}}

    @foreach ($category->categories as $category)
        {{--Level 2..--}}


        @foreach ($category->categories as $category)
            {{--Level 3..--}}



            @endfor

    @endfor


@endfor


<div class="col-sm-3 col-md-3">
    <div class="panel-group" id="accordion">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span class="glyphicon glyphicon-folder-close">
                    </span>Level 1</a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in">
                <ul class="list-group">
                    <li class="list-group-item"><span class="glyphicon glyphicon-pencil text-primary"></span><a href="http://fb.com/moinakbarali">Level 2</a>
                        <ul class="list-group">
                            <li class="list-group-item"><span class="glyphicon glyphicon-pencil text-primary"></span><a href="http://fb.com/moinakbarali">Level 3</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"><span class="glyphicon glyphicon-file">
                    </span>Level 1</a>
                </h4>
            </div>
            <div id="collapseFour" class="panel-collapse collapse">
                <div class="list-group">
                    <a href="#" class="list-group-item">
                        Level 2
                    </a>
                    <div class="list-group">
                        <a href="#" class="list-group-item">Level 3</a>
                    </div>
                    <a href="#" class="list-group-item">Level 2</a>
                </div>
            </div>
        </div>
    </div>
</div>
