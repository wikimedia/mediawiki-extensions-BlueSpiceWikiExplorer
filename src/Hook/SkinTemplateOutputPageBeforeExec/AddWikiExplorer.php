<?php

namespace BlueSpice\WikiExplorer\Hook\SkinTemplateOutputPageBeforeExec;

use BlueSpice\Hook\SkinTemplateOutputPageBeforeExec;
use BlueSpice\SkinData;

class AddWikiExplorer extends SkinTemplateOutputPageBeforeExec {

	protected function doProcess() {
		$specialWikiExplorer = \MediaWiki\MediaWikiServices::getInstance()
			->getSpecialPageFactory()
			->getPage( 'WikiExplorer' );
		$this->mergeSkinDataArray(
			SkinData::GLOBAL_ACTIONS,
			[
			'bs-special-wikiexplorer' => [
				'href' => $specialWikiExplorer->getPageTitle()->getFullURL(),
				'text' => $specialWikiExplorer->getDescription(),
				'title' => $specialWikiExplorer->getPageTitle(),
				'iconClass' => ' icon-world ',
				'position' => 30
			]
			]
		);

		return true;
	}

}
