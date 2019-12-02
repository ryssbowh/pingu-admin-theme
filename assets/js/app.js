import 'bootstrap';
import AdminModal from './components/AdminModal.js';
import AdminBlocks from './components/AdminInfo.js';
import AdminInfo from './components/AdminBlocks.js';
import AdminForms from './components/AdminForms.js';
import AdminLayout from './components/AdminLayout.js';
import AdminMenu from './components/AdminMenu.js';
import AdminTaxonomy from './components/AdminTaxonomy.js';
import AdminMedia from './components/AdminMedia.js';
import AdminPage from './components/AdminPage.js';
import AdminBundleFields from './components/AdminBundleFields.js';
import Admin from './components/Admin.js';

$(() => {
	Admin.init();
	AdminModal.init();
	AdminInfo.init();
	AdminForms.init();
	AdminBlocks.init();
	AdminLayout.init();
	AdminMenu.init();
	AdminTaxonomy.init();
	AdminMedia.init();
    AdminPage.init();
	AdminBundleFields.init();
});