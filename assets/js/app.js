import 'bootstrap';
import AdminBlocks from './components/AdminBlocks.js';
import AdminForms from './components/AdminForms.js';
import AdminLayout from './components/AdminLayout.js';
import AdminMenu from './components/AdminMenu.js';
import AdminContentTypes from './components/AdminContentTypes.js';
import Admin from './components/Admin.js';

$(() => {
	Admin.init();
	AdminForms.init();
	AdminBlocks.init();
	AdminLayout.init();
	AdminMenu.init();
	AdminContentTypes.init();
});