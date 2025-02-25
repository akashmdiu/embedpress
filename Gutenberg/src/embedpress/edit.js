/**
 * Internal dependencies
 */
import EmbedControls from '../common/embed-controls';
import EmbedLoading from '../common/embed-loading';
import EmbedPlaceholder from '../common/embed-placeholder';
import EmbedWrap from '../common/embed-wrap';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
import {embedPressIcon} from '../common/icons';
const {TextControl, PanelBody} = wp.components;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;

export default function EmbedPress({attributes, className, setAttributes}){
	const {url, editingURL, fetching, cannotEmbed, interactive, embedHTML, height, width, pagesize} = attributes;
	const blockProps = useBlockProps ? useBlockProps() : [];
	const isYTChannel = url.match(/\/channel\/|\/c\/|\/user\/|(?:https?:\/\/)?(?:www\.)?(?:youtube.com\/)(\w+)[^?\/]*$/i);
	function switchBackToURLInput() {
		setAttributes( {editingURL: true});
	}
	function onLoad() {
		setAttributes( {fetching: false});
	}

	function embed(event) {
		if (event) event.preventDefault();

		if (url) {
			setAttributes({
				fetching: true
			});
			// send api request to get iframe url
			let fetchData = async (url) => {
				let _pagesize = isYTChannel ? `&pagesize=${pagesize}` : '';
				return await fetch(`${embedpressObj.site_url}/wp-json/embedpress/v1/oembed/embedpress?url=${url}&width=${width}&height=${height}${_pagesize}`).then(response => response.json());
			}
			fetchData(url).then(data => {
				setAttributes({
					fetching: false
				});
				if ((data.data && data.data.status === 404) || !data.embed){
					setAttributes({
						cannotEmbed: true,
						editingURL: true,
					})
				}else{
					setAttributes({
						embedHTML: data.embed,
						cannotEmbed: false,
						editingURL: false,
					});
				}
			});


		} else {
			setAttributes({
				cannotEmbed: true,
				fetching: false,
				editingURL: true
			})
		}
	}
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Customize Embedded Link")}>
						<p>{__("You can adjust the width and height of embedded content.")}</p>
						<TextControl
							label={__("Width")}
							value={ width }
							onChange={ ( width ) => setAttributes( { width } ) }
						/>
						<TextControl
							label={__("Height")}
							value={ height }
							onChange={ ( height ) => setAttributes( { height } ) }
						/>
						{
							isYTChannel &&
							<div>
								<TextControl
									label={__("Video Per Page")}
									value={ pagesize }
									onChange={ ( pagesize ) => setAttributes( { pagesize } ) }
								/>
								<p>Specify the number of videos you wish to show on each page.</p>
							</div>
						}
						{(embedHTML && !editingURL) && <button onClick={embed}>{__('Apply')}</button>}
					</PanelBody>
				</InspectorControls>
				{ ((!embedHTML || editingURL) && !fetching) && <div { ...blockProps }>
						<EmbedPlaceholder
						label={__('EmbedPress - Embed anything from 100+ sites')}
						onSubmit={embed}
						value={url}
						cannotEmbed={cannotEmbed}
						onChange={(event) => setAttributes({url: event.target.value})}
						icon={embedPressIcon}
						DocTitle={__('Learn more about EmbedPress')}
						docLink={'https://embedpress.com/docs/'}

						/>
					</div>}

				{ fetching ? <div className={className}><EmbedLoading/> </div> : null}

				{(embedHTML && !editingURL && !fetching) && <figure { ...blockProps } >
					<EmbedWrap style={{display: fetching ? 'none' : ''}} dangerouslySetInnerHTML={{
						__html: embedHTML
					}}></EmbedWrap>
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={ setAttributes({interactive: true}) }
					/>

					<EmbedControls
						showEditButton={embedHTML && !cannotEmbed}
						switchBackToURLInput={switchBackToURLInput}
					/>

				</figure>}
			</Fragment>

		);

}


