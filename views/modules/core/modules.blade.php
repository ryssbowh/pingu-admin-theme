@extends('layouts.card')

@section('title')
Modules
@endsection

@section('content')
	<div class="modules">
	    <table class="table">
	    	<thead>
			    <tr>
			      <th scope="col">Module</th>
			      <th scope="col">Description</th>
			      <th scope="col">Version</th>
			      <th scope="col">Active</th>
			    </tr>
			</thead>
		      @foreach($modules as $module)
				<tr>
					<th>{{ $module->getName() }}<br/><small>{{ $module->getComposerAttr('name') }}</small></th>
					<td>{{ $module->getDescription() }}</td>
					<td>{{ $module->getVersion() }}</td>
					<td>
						@if(!$module->get('core'))
							@if($module->enabled())
								<form action="/admin/modules/uninstall/{{ $module->getName() }}" method="post">
									{{ csrf_field() }}
									<input type="submit" class="btn btn-primary" value="Uninstall">
								</form>
							@else
								<form action="/admin/modules/install/{{ $module->getName() }}" method="post">
									{{ csrf_field() }}
									<input type="submit" class="btn btn-secondary" value="Install">
								</form>
							@endif
						@endif
					</td>
				</tr>
		      @endforeach
	    </table>
	</div>
@endsection