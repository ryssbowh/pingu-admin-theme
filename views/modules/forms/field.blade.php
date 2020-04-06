<div class="{{ $wrapperClasses->toHtml() }} {{ isset($errors) and $errors->has($field->getName()) ? ' is-invalid' : '' }}" data-cardinality="{{ $field->option('cardinality') }}">
    @if($field->option('showLabel'))
        <?php $label = $field->option('label'); ?>
        <label class="{{ $labelClasses->toHtml() }}">{{ $label.($attributes->get('required') ? ' *' : '') }}
            @if($helper = $field->option('helper'))
                <div class="helper">{!! $helper !!}</div>
            @endif
        </label>
    @endif
    @yield('inner')
    @if($field->option('cardinality') != 1)
        <a href="#" class="js-remove-group-element d-none">Remove element</a>
    @endif
</div>