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

// Include the autoloader so we can dynamically include classes
require_once( 'autoload.php' );

// Add in some constants as needed
define( 'RRBB_DIRECTORY_PATH', __DIR__ );
define( 'RRBB_DIRECTORY_ASSETS_URI', site_url().'/wp-content/plugins/rr-gtg-extensions/assets/' );

$init = new Init();
