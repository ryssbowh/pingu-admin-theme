<div class="media-folders card">
    <div class="card-header">
        Folders
        <a href="{{ $createFolderUrl }}" class="js-ajax-link-form js-create-folder float-right fa fa-plus mt-1"></a>
    </div>
    <div class="media-folders-wrapper card-body">
        <ul class="folder-root">
            <li><i class="fa @if($current==='') fa-folder-open-o @else fa-folder-o @endif"></i><a href="#" class="js-folder @if($current==='') selected @endif" data-id="">Root</a>
            @include('pages.entities.media._includes.tree')
            </li>
        </ul>
    </div>
</div>