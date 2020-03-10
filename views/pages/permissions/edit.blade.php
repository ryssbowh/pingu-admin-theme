@extends('layouts.card')

@section('title')
Edit Permissions
@endsection

@section('content')
	{{ FormFacade::open(['url' => $patchUri, 'method' => 'patch']) }}
	@foreach($permissions as $section => $permissionList)
		<table class="editPermissions table table-striped">
	    	<thead class="thead-light">
				<tr>
					<th class="col-5">{{ $section }}</th>
					@foreach($roles as $role)
						<th>{{ $role->name }}</th>
					@endforeach()
				</tr>
			</thead>
			@foreach($permissionList as $permission)
				<tr>
					<td>{{ ucfirst($permission->name) }}
						@if($permission->helper)
							<br/><small>{{ $permission->helper}}</small>
						@endif
					</td>
					@foreach($roles as $role)
						<td>{{ FormFacade::checkbox('perms['.$role->id.']['.$permission->id.']', 1, $permission->roleHasPermission($role), ['disabled' => !$canEdit]) }}</td>
					@endforeach()
				</tr>
			@endforeach()
		</table> 
	@endforeach()
    @if($canEdit)
	   {{ FormFacade::submit('Save',['class' => 'float-right mt-2 btn btn-primary']) }}
    @endif
	{{ FormFacade::close() }}
@endsection