@can('create', $blockModel)
    <div class="block-available col-3">
        @if($blocks)
            <div class="text-left" id="sections-accordion">
            <?php $index = 0; ?>
            @foreach($blocks as $section => $list)
                <?php $index++; ?>
                <div class="card js-section">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <button data-target="#list-{{$index}}" data-toggle="collapse" class="font-weight-bold btn btn-link">{{ $section }}</button>
                            <span class="badge badge-primary badge-pill">{{ sizeof($list) }}</span>
                        </h5>
                    </div>

                    <div id="list-{{$index}}" class="collapse {{ $index == 1 ? 'show' : '' }}" data-parent="#sections-accordion">
                        <ul class="card-body list-group">
                        @foreach($list as $block)
                            <li class="list-group-item text-left js-block" type="button" data-hasoptions="{!! $block->hasOptions() !!}" data-machinename="{{ $block->fullMachineName() }}">
                                <span class="name">{{ $block->name() }}</span>
                                <i class="fa fa-plus float-right mt-1"></i>
                            </li>
                        @endforeach
                        </ul>
                    </div>
                </div>
            @endforeach
            </div>
        @else
            <p>No blocks available</p>
        @endif
    </div>
@endcan