<?php
namespace RRBB\Classes;

class Init {
	public function __construct () {
    // die('init');
    $this->add_actions();
    $this->front_end_assets();
	}

  public function front_end_assets() {
    $vars = [
      'tmpl_dir' => get_template_directory(),
      'style_dir' => get_stylesheet_directory_uri()
    ];

    // Compiled css/js
    wp_enqueue_style('rr_gtg_css', RRBB_MODULE_URL.'assets/main.css');
    wp_enqueue_script('rr_gtg_js', RRBB_MODULE_URL.'assets/main.js', [], false, true);
    wp_localize_script( 'rr_gtg_js', 'theme_vars', $vars);
  }

	public function add_actions () {
		// add form submission action here
		// do_action( 'wpforms_process_complete', array $fields, array $entry, array $form_data, int $entry_id );
		add_action( 'wpforms_process_complete_40',  array($this, 'form_submission_cc_callback'), 10, 4 );
	}

	public function form_submission_cc_callback ($fields, $entry, $form_data, $entry_id) {
    // die(print_r($fields));
    foreach ($fields as $field){
      switch ($field['name']){
        case 'Name':
        break;
        case 'Email':
        break;
        case 'Phone':
        break;
      }
    }
  }
}