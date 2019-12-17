@extends('layouts.card')

@section('title')
{{ $entity::friendlyName() }}'s revisions
@endsection

@section('content')
    <div class="entity-revisions list-group container">
        @if($revisions->isEmpty())
            <p>No revisions</p>
        @else
            <?php $first = true; ?>
            @foreach($revisions as $id => $revision)
                <div class="revision list-group-item container">
                    <div class="row">
                        <div class="col-3">
                            @if($first)
                                Current revision
                            @else
                                No {{ $id }}
                            @endif
                        </div>
                        <div class="col-6">
                            Created the {{ $revision->created() }}
                            @if($user = $revision->createdBy())
                                by <a href="{{ $user::uris()->make('edit', $user, adminPrefix()) }}">{{ $user->name }}</a>
                            @endif
                        </div>
                        <div class="col-3 text-right">
                            @can('restoreRevision', $entity)
                                <a href="{{ $entity::uris()->make('editRevision', [$entity, $id], adminPrefix()) }}" class="btn btn-primary">@if($first)Edit @else Restore @endif</a>
                            @endcan
                        </div>
                    </div>
                </div>
                <?php $first = false; ?>
            @endforeach
        @endif
    </div>
@endsection