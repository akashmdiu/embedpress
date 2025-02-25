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
import {PdfIcon} from '../common/icons';


const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks

if (embedpressObj && embedpressObj.active_blocks && embedpressObj.active_blocks['embedpress-pdf']) {
	registerBlockType('embedpress/embedpress-pdf', {
		// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		title: __('EmbedPress PDF'), // Block title.
		icon: PdfIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
		category: 'embedpress', // Block category — Group blocks together based on common traits E.g. common, formatting, layout Widgets, embed.
		keywords: [
			__('embedpress'),
			__('pdf'),
			__('doc'),
			__('document'),
		],
		supports: {
			align: ["left", "center", "right"],
			default: ''
		},
		attributes: {
			id: {
				type: "string"
			},
			href: {
				type: "string"
			},
			powered_by: {
				type: "boolean",
				default: true,
			},
			width: {
				type: 'number',
				default: '600',
			},
			height: {
				type: 'number',
				default: '600',
			},
			fileName: {
				type: "string",
			},
			mime: {
				type: "string",
			}
		},
		edit,
		save: function (props) {
			return null;
		},


	});
}
