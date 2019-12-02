@foreach($items as $item)
    <li class="nav-item {{ $item['class'] }} {{ $item['item']->isActive() ? 'active' : ''}}">
        {!! $item['link'] !!}
        @isset($item['children'])
            <ul class="list-group">
                @include('menus.includes.menutree', ['items' => $item['children']])
            </ul>
        @endisset
    </li>
@endforeach
