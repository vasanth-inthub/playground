/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   raml-aware.html
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.

/// <reference path="../polymer/types/polymer-element.d.ts" />

declare namespace ApiElements {

  /**
   * Element that is aware of the AMF (RAML, OAS) content.
   *
   * The element contains the same RAML data as other elements whenever their
   * location in the document. The RAML data are encapsulated in `scope` attribute.
   * By default the `scope` is `default`. If you create two `<raml-aware>`s with
   * different scopes then changing one raml will not affect the other.
   *
   * Setting a RAML data on a `<raml-aware>` will notify other awares with the same
   * scopes about the change and update their RAML data so it can be transfered
   * between different parts of application on even different web components.
   *
   * ### Example
   *
   * ```html
   * <raml-aware raml="{{raml}}" scope="request"></raml-aware>
   * <raml-aware raml="{{importRaml}}" scope="import"></raml-aware>
   * ```
   *
   * ```javascript
   * const r1 = document.querySelector('raml-aware[scope="request"]');
   * const r2 = document.querySelector('raml-aware[scope="import"]');
   * r1.raml = {};
   * r2.raml = null;
   * assert(r1.raml !== r2.raml);
   * ```
   *
   * ## Limitations
   *
   * `RamlAware` has to be attached to DOM for it to work. This element uses
   * web components callback methods to initialize value. If the component is
   * never attached it will never initialize it's values.
   */
  class RamlAware extends Polymer.Element {

    /**
     * Scope for the RAML file.
     * Different awares may have different scope and keep different RAML objects.
     * It can be useful when one aware supports request panel and another
     * RAML import for example. In this case first one may have scope not set
     * (`default` scope) and second one `import` scope. Then both RAMLs are
     * encapsulated to the scope.
     */
    scope: string|null|undefined;

    /**
     * The RAML/AMF definition.
     */
    raml: object|null|undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Update RAML data for selected scope.
     */
    _scopeChanged(): void;

    /**
     * Notifies other awares about RAML change.
     */
    _ramlChanged(): void;
  }
}

interface HTMLElementTagNameMap {
  "raml-aware": ApiElements.RamlAware;
}
