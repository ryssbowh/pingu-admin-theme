<ul>
@foreach($infos as $name => $info)
    @if(is_array($info))
        <li class="title">{{ $name }}</li>
        @include('info::section', ['infos' => $info])
    @elseif($info !== '')
        <li>{{ ucfirst($name) }} : {{ $info }}</li>
    @endif
@endforeach
</ul>
<a href="#" class="js-view-more float-right">View more</a>