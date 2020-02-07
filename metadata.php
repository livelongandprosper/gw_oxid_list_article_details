<?php
/**
 * @abstract
 * @author 	Gregor Wendland <gregor@gewend.de>
 * @copyright Copyright (c) 2018-2019, Gregor Wendland
 * @package gw
 * @version 2019-08-14
 */

/**
 * Metadata version
 */
$sMetadataVersion = '2.0'; // see https://docs.oxid-esales.com/developer/en/6.0/modules/skeleton/metadataphp/version20.html

/**
 * Module information
 */
$aModule = array(
    'id'           => 'gw_oxid_list_article_details',
    'title'        => 'Artikel Details in Listen laden',
//     'thumbnail'    => 'out/admin/img/logo.jpg',
    'version'      => '1.0.3',
    'author'       => 'Gregor Wendland',
    'email'		   => 'kontakt@gewend.de',
    'url'		   => 'https://www.gewend.de',
    'description'  => array(
    	'de'		=> 'Ermöglicht das nachladen von Artikel-Details in Artikel-Listen (z.B. Kategorien, Suche) per Klick<ul>
							<li>Bildet die wesentlichen Funktionen der Artikel-Detailseite ab</li>
							<li>Standard-Artikel-Detailseiten stehen weiterhin zur Verfügung</li>
							<li>Unterstützung des digidesk Moduls Verfügbarkeitsbenachrichtigung (JavaScript muss nach dem Laden von Daten in der Liste abgefeuert werden, siehe gw_call_availablilty_reminder_js())</li>
							<li>Unterstützung für 1-, 2- und 4-spaltige Layouts</li>
							<li>Beim Ausklappen eines Artikels wird die URL des Artikels in die Browserzeile/-Historie übernommen</li>
						</ul>',
    ),
    'extend'       => array(
    ),
    'settings'		=> array(

    ),
	'events'		=> array(
    ),
    'files'			=> array(
    ),
	'blocks' => array(
		array(
			/*'theme' => 'flow',*/
			'template' => 'page/list/list.tpl',
			'block' => 'page_list_listbody',
			'file' => 'Application/views/blocks/gw_page_list_listbody.tpl'
		),
		array(
			/*'theme' => 'flow',*/
			'template' => 'page/search/search.tpl',
			'block' => 'search_results',
			'file' => 'Application/views/blocks/gw_page_list_listbody.tpl'
		),
		array(
			/*'theme' => 'flow',*/
			'template' => 'page/details/inc/productmain.tpl',
			'block' => 'details_productmain_tobasket',
			'file' => 'Application/views/blocks/gw_details_productmain_tobasket.tpl'
		),
	),
	'events'       => array(
	),
	'controllers'  => [
	],
	'templates' => [
	]
);
?>
