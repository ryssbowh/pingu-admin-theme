@extends('layouts.app')

@section('title')
Edit Permissions
@endsection

@section('content')
	{{ FormFacade::open(['url' => $patchUri, 'method' => 'patch']) }}
    <table class="editPermissions table table-striped">
    	<thead class="thead-light">
			<tr><th>Permission</th>
				@foreach($roles as $role)
					<th>{{ $role->name }}</th>
				@endforeach()
			</tr>
		</thead>
		@foreach($permissions as $section => $permissionList)
			<tr><th>{{ $section }}</th>
				@foreach($roles as $role)
					<th></th>
				@endforeach()
			</tr>
			@foreach($permissionList as $permission)
				<tr>
					<td>{{ $permission->name }}</td>
					@foreach($roles as $role)
						<td>{{ FormFacade::checkbox('perms['.$role->id.']['.$permission->id.']', 1, $permission->roleHasPermission($role)) }}</td>
					@endforeach()
				</tr>
			@endforeach()
		@endforeach()
	</table>
	{{ FormFacade::submit('Save',['class' => 'float-right mt-2 '.theme_config('forms.submit-default-classes')]) }}
	{{ FormFacade::close() }}
@endsection