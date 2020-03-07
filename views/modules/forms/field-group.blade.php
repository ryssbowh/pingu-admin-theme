<div data-class="{{ class_basename($group->first()) }}" class="{{ $classes }}" data-cardinality="{{ $group->getCardinality() }}">
	@if($label = $group->option('label'))
		<label class="{{ $labelClasses }}">
            {{ $label }}
            @if($helper = $group->option('helper'))
                <div class="helper">{!! $helper !!}</div>
            @endif
		</label>
	@endif
    @foreach($fields as $index => $field)
        {!! $field !!}
    @endforeach
    @if($group->getCardinality() == -1 or $group->getCardinality() > 1)
        <a href="#" class="js-add-group-element d-none" data-cardinality="{{ $group->getCardinality() }}">Add element</a>
    @endif
</div>