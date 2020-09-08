<?php
/**
 * Plugin Name: RR | Theme and Page Builder Additions for GTG
 * Plugin URI: 
 * Description: Additional components, etc for use in Beaver Builder
 * Version: 0.1
 * Author: Robert Rae
 * Author URI:
 * Copyright:
 * License: GNU General Public License v2.0
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace RRBB;
use RRBB\Classes\Init;

// Add in some constants as needed
define( 'RRBB_DIRECTORY_PATH', __DIR__ );
define( 'RRBB_DIRECTORY_ASSETS_URI', site_url().'/wp-content/plugins/rr-gtg-extensions/assets/' );
define( 'RRBB_MODULE_DIR', plugin_dir_path( __FILE__ ) );
define( 'RRBB_MODULE_URL', plugins_url( '/', __FILE__ ) );

// Include the autoloader so we can dynamically include classes
// require_once( 'autoload.php' );

// ^^ OR just include/require
require_once RRBB_MODULE_DIR.'/classes/class-init.php';
require_once RRBB_MODULE_DIR.'/classes/class-module-loader.php';

$init = new Init();