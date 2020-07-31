<?php
namespace RRBB\Classes;

class Init {
	public function __construct () {
		$this->add_actions();
	}

	public function add_styles () {
		wp_equeue_style('rr_bb_styles', '');
	}

	public function add_actions () {
		// add form submission action here
		// do_action( 'wpforms_process_complete', array $fields, array $entry, array $form_data, int $entry_id );
		add_action( 'wpforms_process_complete_40',  array($this, 'form_submission_cc_callback'), 10, 4 );
	}

	public function form_submission_cc_callback ($fields, $entry, $form_data, $entry_id) {}
}