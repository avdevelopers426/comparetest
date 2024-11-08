/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Software License Agreement
 * that is bundled with this package in the file LICENSE.txt.
 *
 *  @author    Peter Sliacky (Zelarg)
 *  @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/* tested with Stripe Payment Pro v4.6.0 - by NTS - on 12.03.2024, when embedded payment is enabled */
checkoutPaymentParser.stripejs = {

    // after_load_callback: function() {
    //     if (typeof initiateStripePayment !== 'undefined') {
    //         initiateStripePayment();
    //     }
    // },

    container: function (element) {
        payment.setPopupPaymentType(element);

        // Add CSS rule to hide payment form in payment methods list
        var cssEl = document.createElement('style'),sheet;
        document.head.appendChild(cssEl);
        cssEl.sheet.insertRule(`
            section#checkout-payment-step [data-payment-module=stripejs] > .additional-information {
              display: none!important;
            }
        `);
    },

    popup_onopen_callback: function () {
        if (typeof initiateStripePayment !== 'undefined') {

            // out of some reason stripe_allow_prbutton is always false on initial page load
            if ($('[data-module-name^=stripePRButton]').length && typeof stripe_allow_prbutton !== 'undefined') {
                stripe_allow_prbutton = true;
            }
            initiateStripePayment();
        }
    },

}