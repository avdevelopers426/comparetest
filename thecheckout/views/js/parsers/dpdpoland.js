/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Software License Agreement
 * that is bundled with this package in the file LICENSE.txt.
 *
 *  @author    Peter Sliacky (Zelarg)
 *  @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

tc_confirmOrderValidations['dpdpoland'] = function() {
  if (
      /*$('#mondialrelay_widget').is(':visible')*/
      $('.delivery-option.dpdpoland input[type=radio]').is(':checked') &&
      'undefined' !== typeof dpdPolandPointId && dpdPolandPointId == 0
  ) {
    var shippingErrorMsg = $('#thecheckout-shipping .inner-wrapper > .error-msg');
    $('.shipping-validation-details').remove();
    shippingErrorMsg.append('<span class="shipping-validation-details"> (DPD Polska - punkt odbioru)</span>')
    shippingErrorMsg.show();
    scrollToElement(shippingErrorMsg);
    return false;
  } else {
    return true;
  }
}

checkoutShippingParser.dpdpoland = {
  after_load_callback: function(deliveryOptionIds) {
    /*
    nothing necessary here; just make an update to dpdpoland/views/templates/hook/pudo.tpl,
     placing code in <script> (starting with 'const iframe = document.createElement("iframe");') in condition:
     */
    // if ('undefined' === typeof iframe) { /* original code here */ }
  },
}
