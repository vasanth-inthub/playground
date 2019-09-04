/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   response-raw-viewer.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../payload-parser-behavior/payload-parser-behavior.d.ts" />

declare namespace ApiElements {

  /**
   * An element to display the raw response data without syntax highlighting.
   *
   * ### Example
   *
   * ```html
   * <response-raw-viewer response-text="Some response"></response-raw-viewer>
   * <script>
   * const display = document.querySelector('response-raw-viewer');
   * display.responseText = someResponse;
   * < /script>
   * ```
   *
   * ## Content actions
   *
   * Custom actions can be defined by adding a child with `slot="content-action"`
   * attribute set. Eny element will be rendered in content action field.
   *
   * ### Example
   *
   * ```html
   * <response-raw-viewer>
   *  <paper-icon-button slot="content-action" title="Copy content to clipboard" icon="arc:content-copy"></paper-icon-button>
   * </response-raw-viewer>
   * ```
   *
   * See demo for more examples.
   *
   * ## Content text wrapping
   *
   * Set `wrap-text` property on the element to force the wiewer to wrap text.
   *
   * ## Changes in version 2
   *
   * - The element does not support custom search and does not include text search library
   *
   * ### Styling
   *
   * `<response-raw-viewer>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--response-raw-viewer` | Mixin applied to the element | `{}`
   * `--arc-font-code1` | Mixin applied to the code block (theme mixin) | `{}`
   * `--response-raw-viewer-button-active` | Background color of the `wrap` button | `#BDBDBD`
   * `--response-raw-viewer-action-bar` | Mixin applied to the action bar above the highlighted code | `{}`
   * `--no-info-message` | Mixin applied to the "nothing to display" message (theme variable) | `{}`
   * `--response-raw-viewer-code` | Mixin applied to the code block | `{}`
   */
  class ResponseRawViewer extends
    ArcBehaviors.PayloadParserBehavior(
    Object) {

    /**
     * The response text to display.
     */
    responseText: string|null|undefined;

    /**
     * Computed value, true if the responseText has text.
     */
    readonly hasResponse: boolean|null|undefined;

    /**
     * If set to true then the text in the panel will be wrapped.
     */
    wrapText: boolean|null|undefined;
    _responseChanged(response: any): void;

    /**
     * ARC stores workspace data with response object in a file.
     * It may happen that the data is a buffer when saving. This restores
     * the string if needed.
     *
     * @param response Usually string response but may be
     * ARC converted object.
     * @returns Safe to process string.
     */
    _responseValue(response: String|object|null): String|null;

    /**
     * Computes if the response is available and content is displayed.
     */
    _computeHasResponse(responseText: any): any;

    /**
     * Computes CSS class for the actions pane.
     *
     * @param hasResponse The `hasResponse` propety value of the
     * element.
     * @returns CSS class names for the panel depending on state of the
     * `hasResponse`property.
     */
    _computeActionsPanelClass(hasResponse: Boolean|null): String|null;
  }
}

interface HTMLElementTagNameMap {
  "response-raw-viewer": ApiElements.ResponseRawViewer;
}
