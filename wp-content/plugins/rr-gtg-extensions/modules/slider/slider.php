<?php
// namespace RRBB\Modules;

// use FLBuilderModule;
// use FLBuilder;

class RRTestimonialSlider extends FLBuilderModule {

	public function __construct() {
		// die('construct');
		parent::__construct(array(
			'name'            => 'Testimonial Slider' ,
			'description'     => 'A Module to add a slider of glowing reviews!',
			'group'           => 'Custom Modules',
			'category'        => 'Custom',
			'dir'             => RRBB_MODULE_DIR . '/modules/slider/',
			'url'             => RRBB_MODULE_URL . ' /modules/slider/',
		));

		// Already registered
		$this->add_css( 'jquery-bxslider' );
		$this->add_css( 'font-awesome' );
		$this->add_js( 'jquery-bxslider' );
	}

	public function update( $settings ) {
		return $settings;
	}
}


/**
 * Register the module and its form settings.
 */
FLBuilder::register_module('RRTestimonialSlider', array(
	'general'       => array( // Tab
			'title'         => 'General', // Tab title
			'sections'      => array( // Tab Sections
					'general'       => array( // Section
							'title'         => 'Testimonials', // Section Title
							'fields'        => array( // Section Fields
								'testimonials'     => array(
									'type'          => 'form',
									'multiple'			=> true,
									'label'         => 'Testimonials',
									'form'          => 'testimonial_form', // ID from registered form below
									'preview_text'  => 'testimonial_name' // Name of a field to use for the preview text
								),
							)
					)
			)
	)
));

FLBuilder::register_settings_form('testimonial_form', array(
	'title' => 'Testimonial',
	'tabs'  => array(
		'general'      => array( // Tab
			'title'         => __('General', 'fl-builder'), // Tab title
			'sections'      => array( // Tab Sections
				'general'       => array( // Section
					'title'         => '', // Section Title
					'fields'        => array( // Section Fields
						'testimonial_body' => array(
							'type'          => 'textarea',
							'label'         => 'Testimonial Body',
							'class'         => 'testimonial-body',
							'rows'          => '6'
						),
						'testimonial_name'     => array(
							'type'          => 'text',
							'label'         => 'Testimonial First/Last Name',
							'class'         => 'testimonial-name',
							'description'   => 'first/last'
						),
						'testimonial_label'     => array(
							'type'          => 'text',
							'label'         => 'Testimonial Label',
							'class'         => 'testimonial-label',
							'description'   => 'label'
						),
					)
				)
			)
		)
	)
));