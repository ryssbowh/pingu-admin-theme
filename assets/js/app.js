import 'bootstrap';
import 'chosen-js';
import 'form-serializer';
import AdminModal from './components/AdminModal.js';
import AdminTheme from './components/AdminTheme.js';
import ObjectMapping from './components/ObjectMapping.js';

import AdminBlocks from './pages/AdminInfo.js';
import AdminInfo from './pages/AdminBlocks.js';
import AdminLayout from './pages/AdminLayout.js';
import AdminFormLayout from './pages/AdminFormLayout.js';
import AdminMenu from './pages/AdminMenu.js';
import AdminTaxonomy from './pages/AdminTaxonomy.js';
import AdminMedia from './pages/AdminMedia.js';
import AdminPage from './pages/AdminPage.js';
import AdminFieldDisplay from './pages/AdminFieldDisplay.js';
import AdminBundleFields from './pages/AdminBundleFields.js';
import AdminViewModes from './pages/AdminViewModes.js';

String.prototype.rtrim = function(s) { 
    return this.replace(new RegExp(s + "*$"),''); 
};

$(() => {
    window.Modal = new AdminModal();
    window.ObjectMapping = new ObjectMapping();
    window.AdminTheme = new AdminTheme();
	AdminInfo.init();
	AdminBlocks.init();
	AdminLayout.init();
    AdminFormLayout.init();
	AdminMenu.init();
	AdminTaxonomy.init();
	AdminMedia.init();
    AdminPage.init();
    AdminFieldDisplay.init();
	AdminBundleFields.init();
    AdminViewModes.init();
    $('.showOnLoad').addClass('loaded');
});