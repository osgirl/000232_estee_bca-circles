<?  echo '<?xml version="1.0" encoding="' . $encoding . '"?>' . "\n"; ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:admin="http://webns.net/mvcb/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:content="http://purl.org/rss/1.0/modules/content/">

<channel>
	<title><? echo $page_title; ?></title>
	<description><? echo $page_description; ?></description>
	<link><? echo $url; ?></link>
<? if($type == 'circles'):?>
<?php foreach($items as $item): ?>
	<item>
		<title><?echo $item->id ?></title>
		<description><?echo $item->users_name ?> - <?echo $item->goal ?></description>
		<link><? echo $url; ?>circle/<?echo $item->id ?></link>
		<pubDate><?echo gmdate(DATE_RSS, strtotime($item->date));?></pubDate>
</item>
<?php endforeach; ?><?else:?>
<?php foreach($items as $item): ?>
	<item>
		<title><?echo $item->id ?></title>
		<description><?echo $item->description ?></description>
		<link><? echo $url; ?>uploads/<?echo $item->filename ?></link>
		<pubDate><?echo gmdate(DATE_RSS, strtotime($item->date));?></pubDate>
	</item>
<?php endforeach; ?>
<?endif;?>
</channel>
</rss>  
