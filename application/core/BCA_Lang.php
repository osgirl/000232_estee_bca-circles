<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/**
*
* Modified By Sean Oh Aug 23, 2013
* 
* Original code by
*Language Identifier
* 
* Adds a language identifier prefix to all site_url links
* 
* @copyright     Copyright (c) 2011 Wiredesignz
* @version         0.29
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
class BCA_Lang extends CI_Lang
{
    function __construct() {
        
        global $URI, $CFG, $IN;
        
        $config =& $CFG->config;
        
        $index_page             = $config['index_page'];
        $default_country_abbr   = $config['country_abbr'];
        $default_language_abbr  = $config['language_abbr'];
        $country_uri_abbr       = $config['country_uri_abbr'];
        $lang_uri_abbr          = $config['lang_uri_abbr'];
        
         // adjust the uri string leading slash 
        $URI->uri_string        = preg_replace("|^\/?|", '/', $URI->uri_string);
        
        
        $country_abbr           = $URI->segment(1); //Country
        $lang_abbr              = $URI->segment(2); //Language

         // check validity against config array 
        if (isset($country_uri_abbr[$country_abbr]) && isset($lang_uri_abbr[$lang_abbr])) {
           
          // reset uri segments and uri string 
          $URI->_reindex_segments(array_shift($URI->segments));
          $URI->uri_string = preg_replace("|^\/?$country_abbr|", '', $URI->uri_string);


          // set config language values to match the user language 
          $config['country']       = $country_uri_abbr[$country_abbr];
          $config['language']      = $lang_uri_abbr[$lang_abbr];
          $config['country_abbr']  = $country_abbr;
          $config['language_abbr'] = $lang_abbr;

          $index_page .= empty($index_page) ? $country_abbr : "/$country_abbr";
          $index_page .= empty($index_page) ? $lang_abbr : "/$lang_abbr";

          // reset the index_page value 
          $config['index_page'] = $index_page;


          // set the language_abbreviation cookie                
          // $IN->set_cookie('user_lang', $country_abbr, $config['sess_expiration']);

        } 

        else 
        {            
          // check and set the uri identifier to the default value     
          $index_page .= empty($index_page) ? $default_country_abbr : "/$default_country_abbr";
          $index_page .= empty($index_page) ? $default_language_abbr : "/$default_language_abbr";
        
          if (strlen($country_abbr) == 2) {
               // remove invalid abbreviation 
              $URI->uri_string = preg_replace("|^\/?$country_abbr/?$lang_abbr|", '', $URI->uri_string);
          }

          //Redirect
          header('Location: '.$config['base_url'].$index_page.$URI->uri_string);
          exit;

          // set the language_abbreviation cookie                 
          // $IN->set_cookie('user_lang', $default_country_abbr, $config['sess_expiration']);
        }
    }
}

/* translate helper */
function t($line) {
    global $LANG;
    return ($t = $LANG->line($line)) ? $t : $line;
}

?>