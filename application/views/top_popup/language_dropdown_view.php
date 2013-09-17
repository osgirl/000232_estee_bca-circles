<span class="dropdown-toggle all_cap" data-toggle="dropdown">
    <span class="language_name" style="display:inline-block;vertical-align:center;"></span>    
    <span class='language_arrow'><img style="display:inline-block; width:10px" src='<?php echo base_url(); ?>img/icons/language-arrow.png'/> </span>
</span>
<ul id="language_menu" class="language_menu_dropdown dropdown-menu">
    <li>
        <a id="l_en" href= "<?=base_url()?>en/">English</a>
    </li> 
    <li>
         <a id="l_es" href= "<?=base_url()?>es/">Español</a>
    </li>
    <li>
         <a id="l_fr" href= "<?=base_url()?>fr/">Français</a>
    </li>
    <li>
        <a id="l_de" href= "<?=base_url()?>de/">Deutsch</a>
    </li>
    <li>
        <a id="l_cn" href= "<?=base_url()?>cn/">中文</a>
    </li>
    <li>
        <a id="l_el" href= "<?=base_url()?>el/">Ελληνικά</a>
    </li>
    <li>
        <a id="l_hu" href= "<?=base_url()?>hu/">Magyar</a>
    </li>    
    <li>
        <a id="l_he" href= "<?=base_url()?>he/">עברית</a>
    </li>
    <li>
        <a id="l_it" href= "<?=base_url()?>it/">Italiano</a>
    </li>
    <li>
        <a id="l_ko" href= "<?=base_url()?>ko/">한국어</a>
    </li>
    <li>
        <a id="l_pt" href= "<?=base_url()?>pt/">Português</a>
    </li>
    <li>
        <a id="l_ru" href= "<?=base_url()?>ru/">Русский</a>
    </li>
    <li>
        <a id="l_ar" href= "<?=base_url()?>ar/">العربية</a>
    </li>    
    <li>
        <a id="l_tr" href= "<?=base_url()?>tr/">Türkçe</a>
    </li>
    <li>
        <a id="l_vi" href= "<?=base_url()?>vi/">Tiếng Việt</a>
    </li>
</ul>
<script>

    $("#language_menu a").each(function(v.i){
        var route = $(v).attr('href') + selectedCountry + "/";
        $(v).attr("href", route);
    })

</script>