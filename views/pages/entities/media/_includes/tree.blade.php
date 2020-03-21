<ul class="tree">
    @foreach($folders as $folder)
        <li><i class="fa @if($current==$folder->id) fa-folder-open-o @else fa-folder-o @endif"></i><a href="#" class="js-folder @if($current == $folder->id) selected @endif" data-id="{{ $folder->id }}">{{ $folder->name }}</a>
        <?php $folders = $folder->children; ?>
        @if(!$folders->isEmpty())
            @include('pages.entities.media._includes.tree')
        @endif
        </li>
    @endforeach            
</ul>