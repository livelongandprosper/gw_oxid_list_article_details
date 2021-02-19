[{if !$oxcmp_shop->oxshops__oxproductive->value}]
    [{oxscript include=$oViewConf->getModuleUrl('gw_oxid_list_article_details','out/src/js/list_ajax_load_details.js')  priority=30}]
[{else}]
    [{assign var="jsFiletime" value=$oViewConf->getModulePath('gw_oxid_list_article_details','out/src/js/list_ajax_load_details.min.js')|filemtime}]
    [{oxscript include=$oViewConf->getModuleUrl('gw_oxid_list_article_details','out/src/js/list_ajax_load_details.min.js')|cat:'?'|cat:$jsFiletime  priority=30}]
[{/if}]

[{* variant selection / details scripts *}]
[{oxscript include="js/libs/photoswipe.min.js" priority=8}]
[{oxscript include="js/libs/photoswipe-ui-default.min.js" priority=8}]
[{oxscript include="js/pages/details.min.js" priority=10}]
[{oxscript include="js/widgets/oxajax.min.js" priority=10}]
[{oxscript include="js/widgets/oxarticlevariant.min.js" priority=10}]

[{assign var="cssFiletime" value=$oViewConf->getModulePath('gw_oxid_list_article_details','out/src/css/gw_oxid_list_article_details.css')|filemtime}]
<link rel="stylesheet" media="print" href="[{$oViewConf->getModuleUrl('gw_oxid_list_article_details','out/src/css/gw_oxid_list_article_details.css')|cat:'?'|cat:$cssFiletime}]" as="style" onload="this.media='screen'""><noscript><link rel="stylesheet" href="[{$oViewConf->getModuleUrl('gw_oxid_list_article_details','out/src/css/gw_oxid_list_article_details.css')|cat:'?'|cat:$cssFiletime}]"></noscript>

[{$smarty.block.parent}]
