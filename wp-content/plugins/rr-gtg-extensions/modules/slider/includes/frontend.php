<?php

/**
 * This file should be used to render each module instance.
 * You have access to two variables in this file: 
 * 
 * $module An instance of your module class.
 * $settings The module's settings.
 *
 * Example: 
 */

?>
<div class="testimonial-slider"><?php
    foreach($settings->testimonials as $testimonial){ ?>
        <div class="testimonial">
            <span class="testimonial__body">"<?= $testimonial->testimonial_body ?>"</span>
            <span class="testimonial__name"><?= $testimonial->testimonial_name ?>,</span>
            <span class="testimonial__label"><?= $testimonial->testimonial_label ?></span>
        </div><?php
    }?>
</div>