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
        $default_language_abbr  = $config['default_language_abbr'];
        $default_country_abbr   = $config['default_country_abbr'];
        $country_uri_abbr       = $config['country_uri_abbr']; //Array
        $lang_uri_abbr          = $config['lang_uri_abbr']; //Array
        
         // adjust the uri string leading slash 
        $URI->uri_string        = preg_replace("|^\/?|", '/', $URI->uri_string);              
        $lang_abbr              = $URI->segment(1); //Language
        $country_abbr           = $URI->segment(2); //Country

         // check validity against config array 
        if (isset($country_uri_abbr[$country_abbr]) && isset($lang_uri_abbr[$lang_abbr])) {
           
          // reset uri segments and uri string 
          $URI->_reindex_segments(array_shift($URI->segments));
          $URI->uri_string = preg_replace("|^\/?$lang_abbr/?$country_abbr|", '', $URI->uri_string);

          // set config language values to match the user language 
          $config['country']       = $country_uri_abbr[$country_abbr];
          $config['language']      = $lang_uri_abbr[$lang_abbr];
          $config['country_abbr']  = $country_abbr;
          $config['language_abbr'] = $lang_abbr;

          $index_page .= empty($index_page) ? $lang_abbr : "/$lang_abbr";
          $index_page .= empty($index_page) ? $country_abbr : "/$country_abbr";

          $config['language_abbr'] = $lang_abbr;
          $config['country_abbr'] = $country_abbr;

          // reset the index_page value 
          $config['index_page'] = $index_page;

          // Set cookie
          $cookie = array(
                   'name'   => 'lang_country_setting',
                   'value'  => $index_page,
                   'expire' => $config['sess_expiration'],
                   'domain' => $config['cookie_domain'],
                   'path'   => $config['cookie_path'],
                   'prefix' => $config['cookie_prefix'],
               );
          $IN->set_cookie($cookie);
        } 
        else 
        { 
          // REDIRECT           
          // check cookie and set the uri identifier to the default value
          $cookie = $IN->cookie($config['cookie_prefix'].'lang_country_setting');

          if(!empty($cookie) && empty($lang_abbr) && empty($country_abbr)){
            $cookie = explode("/", $cookie);
          }
          else{
            $cookie = null;
          }

          //Language
          if (isset($lang_uri_abbr[$lang_abbr])){            
            $index_page .= empty($index_page) ? $lang_abbr : "/$lang_abbr";
          }          
          else if(isset($cookie[0])){
            $index_page .= empty($index_page) ? $cookie[0] : "/$cookie[0]";
          }
          else{
            $index_page .= empty($index_page) ? $default_language_abbr : "/$default_language_abbr";
          }

          //Country
          if(isset($cookie[1])){
            $index_page .= empty($index_page) ? $cookie[1] : "/$cookie[1]";
          }
          else{
            $index_page .= empty($index_page) ? $default_country_abbr : "/$default_country_abbr";
          }
        
          // remove invalid abbreviation 
          if (strlen($lang_abbr) == 2) {               
              $URI->uri_string = preg_replace("|^\/?$lang_abbr/?$country_abbr|", '', $URI->uri_string);
          }
          //Redirect
          header('Location: '.$config['base_url'].$index_page.$URI->uri_string);
          exit;
        }
    }
};
?>