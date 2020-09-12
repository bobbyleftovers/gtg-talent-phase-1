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
<div class="rrbb-slider">
  <div class="slider__slides"><?php
      foreach($settings->testimonials as $slide){ ?>
        <div class="slider__slide">
          <span class="slide__body">"<?= $slide->testimonial_body ?>"</span>
          <span class="slide__name"><?= $slide->testimonial_name ?>,</span>
          <span class="slide__label"><?= $slide->testimonial_label ?></span>
        </div><?php
      } ?>
  </div>
</div>