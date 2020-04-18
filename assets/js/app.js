import 'bootstrap';
import 'chosen-js';
import 'form-serializer';
import Helpers from './components/Helpers.js';
import Modal from './components/Modal.js';
import AdminTheme from './components/AdminTheme.js';
import ObjectMapping from './components/ObjectMapping.js';

import Info from './pages/Info.js';
import FieldLayout from './pages/FieldLayout.js';
import Menu from './pages/Menu.js';
import Taxonomy from './pages/Taxonomy.js';
import Media from './pages/Media.js';
import Page from './pages/Page.js';
import FieldDisplay from './pages/FieldDisplay.js';
import BundleFields from './pages/BundleFields.js';
import ViewModes from './pages/ViewModes.js';

$.ajaxSetup(
    {
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    }
);

$(() => {
    window.Helpers = new Helpers();
    window.Modal = new Modal();
    window.ObjectMapping = new ObjectMapping();
    window.AdminTheme = new AdminTheme();
	Info.init();
	FieldLayout.init();
	Menu.init();
	Taxonomy.init();
	Media.init();
    Page.init();
    FieldDisplay.init();
	BundleFields.init();
    ViewModes.init();
    $('.showOnLoad').addClass('loaded');
});