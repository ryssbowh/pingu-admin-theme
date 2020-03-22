@foreach($items as $item)
    <div class="nav-item list-group-item {{ $item['class'] }} @if($item['item']->isActive())active @endif">
        {!! $item['link'] !!}
        @if($item['hasChildren'])
            <i class="float-right fa fa-caret-down @if($item['item']->hasActiveChild() or $item['item']->isActive()) rotated @endif" data-toggle="collapse" data-target="#menugroup-{{ $item['item']->id }}"></i>
        @endif
    </div>
    @if($item['hasChildren'])
        <div class="list-group collapse @if($item['item']->hasActiveChild() or $item['item']->isActive()) show @endif" id="menugroup-{{ $item['item']->id }}">
            @include('menus.includes.menutree', ['items' => $item['children']])
        </div>
    @endif
@endforeach
