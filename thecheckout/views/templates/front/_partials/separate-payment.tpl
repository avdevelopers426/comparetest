{**
* NOTICE OF LICENSE
*
* This source file is subject to the Software License Agreement
* that is bundled with this package in the file LICENSE.txt.
*
*  @author    Peter Sliacky (Zelarg)
*  @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*}
<style>
  /* BEGIN Custom CSS styles from config page */
  {$z_tc_config->custom_css nofilter}
  /* END Custom CSS styles from config page */
</style>
<script>
    /* BEGIN Custom JS code from config page */
    {$z_tc_config->custom_js nofilter}
    /* END Custom JS code from config page */

    var amazon_ongoing_session = ("{$amazon_ongoing_session|escape:'javascript':'UTF-8'}" == "1");
</script>
<div style="display: none;">
  {* Inner container will be taken out by JS in separate-payment.js *}
  <section class="checkout-step" id="separate-payment-order-review">

    <div class="customer-block-container">
      <div id="customer-block">
        {$customer.firstname|escape:'htmlall':'UTF-8'} {$customer.lastname|escape:'htmlall':'UTF-8'} - {$customer.email|escape:'htmlall':'UTF-8'}
      </div>
    </div>

    <div class="address-block-container">
      <div class="address-block" id="invoice_address">
        <span class="address-block-header">{l s='Your Invoice Address' d='Shop.Theme.Checkout'}</span>
        {$formatted_addresses.invoice nofilter}
      </div>
    </div>
    <div class="address-block-container">
      <div class="address-block" id="delivery_address">
        <span class="address-block-header">{l s='Your Delivery Address' d='Shop.Theme.Checkout'}</span>
        {$formatted_addresses.delivery nofilter}
      </div>
    </div>

    <div class="shipping-method-container">
      <div id="shipping-method">
        <span class="shipping-method-header">{l s='Shipping Method' d='Shop.Theme.Checkout'}</span>
        {if $shipping_logo}
          <img src="{$shipping_logo|escape:'javascript':'UTF-8'}" />
        {/if}
        {$shipping_method->name|escape:'htmlall':'UTF-8'} - {$shipping_method->delay[$language.id]|escape:'htmlall':'UTF-8'}
      </div>
      {if $delivery_message}
        <div id="delivery-message">
          <span class="delivery-message-header">{l s='Message' d='Shop.Forms.Labels'}</span>
          {$delivery_message|escape:'htmlall':'UTF-8'}
        </div>
      {/if}
    </div>

    <div id="edit-button-block">
      <button id="x-checkout-edit" data-href="{$urls.pages.order|escape:'javascript':'UTF-8'}" class="btn btn-primary">{l s='Edit' d='Shop.Theme.Actions'}</button>
    </div>
    <div class="layout-right html_box_4" style="display: none;">
        {$z_tc_config->html_box_4 nofilter}
    </div>
  </section>

</div>
