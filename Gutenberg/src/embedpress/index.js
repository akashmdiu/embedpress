/**
 * BLOCK: embedpress-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import edit from './edit';
import {embedPressIcon} from '../common/icons';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
if (embedpressObj && embedpressObj.active_blocks && embedpressObj.active_blocks.embedpress) {

	/**
	 * Register: aa Gutenberg Block.
	 *
	 * Registers a new block provided a unique name and an object defining its
	 * behavior. Once registered, the block is made editor as an option to any
	 * editor interface where blocks are implemented.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {?WPBlock}          The block, if it has been successfully
	 *                             registered; otherwise `undefined`.
	 */
	registerBlockType('embedpress/embedpress', {
		// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		title: __('EmbedPress'), // Block title.
		icon: embedPressIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
		category: 'embedpress', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
		keywords: [
			'embedpress',
			'embed',
			'google',
			'youtube',
			'docs',
		],
		supports: {
			align: ["right", "left", "center"],
			default: 'center',
			lightBlockWrapper: true
		},
		attributes: {
			url: {
				type: 'string',
				default: ''
			},
			embedHTML: {
				type: 'string',
				default: ''
			},
			height: {
				type: 'string',
				default: '450'
			},
			width: {
				type: 'string',
				default: '600'
			},
			editingURL: {
				type: 'boolean',
				default: false
			},
			fetching: {
				type: 'boolean',
				default: false
			},
			cannotEmbed: {
				type: 'boolean',
				default: false
			},
			interactive: {
				type: 'boolean',
				default: false
			},
			align: {
				type: 'string',
				default: 'center'
			},
			pagesize: {
				type: 'number',
				default: 6
			},
		},
		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 *
		 * The "edit" property must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		edit,

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into post_content.
		 *
		 * The "save" property must be specified and must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		save: () => null,
	});

}
