@extends('layouts.app')

@section('main')
    <div class="media-list index-entities">
        <div class="row">
            <div class="col-12 col-sm-2">
                @include('pages.entities.media._includes.folderTree')
                <a href="{{ $createUrl }}" class="">Upload media</a>
            </div>
            <div class="col-12 col-sm-10 pl-0">
                <div class="filters mb-2">
                    {!! $filterForm !!}
                </div>
                <div class="entities-list container">
                    @if($entities->isEmpty())
                        <p>No {{ Str::plural($entity::friendlyName()) }} found</p>
                    @endif
                    <?php 
                    $i = 0;
                    $slice = $entities->slice($i, 6); 
                    ?>
                    @while(!$slice->isEmpty())
                        <div class="row mb-2">
                            @foreach($slice as $entity)
                                <div class="media-item col-lg-2 col-md-4 col-sm-6 px-1 text-center">
                                    <div class="image position-relative d-inline-block">
                                        {!! $entity->img('icon') !!}
                                        <div class="actions-wrapper position-absolute w-100 h-100">
                                            <div class="actions align-middle text-center w-100">
                                                <a href="{{ $entity->uris()->make('delete', $entity, adminPrefix()) }}" class="js-delete d-inline-block">Delete</a><br/>
                                                <a href="{{ $entity->uris()->make('edit', $entity, adminPrefix()) }}" class="js-edit d-inline-block">Edit</a><br/>
                                                <a href="#" class="js-delete d-inline-block">Change folder</a>
                                            </div>
                                        </div>
                                    </div>
                                    <a target="_blank" href="{{ $entity->url() }}">
                                        <p class="text-break">{{ $entity->name }}</p>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                        <?php 
                        $i += 6;
                        $slice = $entities->slice($i, 6); 
                        ?>
                    @endwhile
                </div>
                <div class="entity-pages text-center">
                    {{ $entities->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection