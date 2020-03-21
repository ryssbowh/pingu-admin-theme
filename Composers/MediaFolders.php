<?php

namespace Pingu\Themes\Admin\Composers;

use Illuminate\View\View;
use Pingu\Taxonomy\Entities\Taxonomy;
use Pingu\Taxonomy\Entities\TaxonomyItem;

class MediaFolders
{
    /**
     * Define the variable that will be available for that view.
     * 
     * @param View $view
     */
    public function compose(View $view)
    {
        $taxonomy = Taxonomy::findByMachineName('media_folders');
        $view->with('folders', $taxonomy->getRootItems('name'));
        $view->with('current', request()->input('filters.field_folder'));
        $view->with('createFolderUrl', TaxonomyItem::uris()->make('create', $taxonomy, adminPrefix()));
        $view->getData()['filterForm']->removeElement('field_folder');
    }
}