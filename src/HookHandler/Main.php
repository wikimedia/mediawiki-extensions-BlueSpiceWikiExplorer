<?php

namespace BlueSpice\WikiExplorer\HookHandler;

use BlueSpice\WikiExplorer\GlobalActionsTool;
use MWStake\MediaWiki\Component\CommonUserInterface\Hook\MWStakeCommonUIRegisterSkinSlotComponents;

class Main implements MWStakeCommonUIRegisterSkinSlotComponents {

	/**
	 * @inheritDoc
	 */
	public function onMWStakeCommonUIRegisterSkinSlotComponents( $registry ): void {
		$registry->register(
			'GlobalActionsTools',
			[
				'special-bluespice-wikiexplorer' => [
					'factory' => function () {
						return new GlobalActionsTool();
					}
				]
			]
		);
	}
}
