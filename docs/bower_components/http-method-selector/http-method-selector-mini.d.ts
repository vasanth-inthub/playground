/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   http-method-selector-mini.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />
/// <reference path="../paper-dropdown-menu/paper-dropdown-menu.d.ts" />
/// <reference path="../paper-listbox/paper-listbox.d.ts" />
/// <reference path="../paper-item/paper-item.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../events-target-behavior/events-target-behavior.d.ts" />
/// <reference path="http-method-selector-mixin.d.ts" />

declare namespace UiElements {

  /**
   * A HTTP method selector in a dropdown list of predefined HTTP methods.
   *
   * ### Example
   *
   * ```html
   * <http-method-selector-mini></http-method-selector-mini>
   * ```
   *
   * ### Styling
   *
   * `<http-method-selector>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--http-method-selector-mini` | Mixin applied to the element | `{}`
   * `--http-method-selector-mini-dropdown-width` | Width of the dropdown field | `100px`
   * `--http-method-selector-mini-input-width` | Width of the custom input field | `100px`
   * `--http-method-selector-mini-dropdown` | Mixin applied to the dropdown field | `{}`
   * `--http-method-selector-mini-input` | Mixin applied to the custom input field | `{}`
   * `--http-method-selector-custom-close-button` | Mixin applied to the custom input close button | `{}`
   * `--from-row-action-icon-color` | Theme variable, color of the custom input close button | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
   * `--from-row-action-icon-color-hover` | Theme variable, color of the custom input close button when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
   */
  class HttpMethodSelectorMini extends
    ArcBehaviors.EventsTargetBehavior(
    ArcBehaviors.HttpMethodSelectorMixin(
    Polymer.Element)) {
  }
}

interface HTMLElementTagNameMap {
  "http-method-selector-mini": UiElements.HttpMethodSelectorMini;
}
