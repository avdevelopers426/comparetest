/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Software License Agreement
 * that is bundled with this package in the file LICENSE.txt.
 *
 *  @author    Peter Sliacky (Zelarg)
 *  @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

checkoutPaymentParser.mollie = {

    container: function (element) {
        payment.setPopupPaymentType(element);

        // Add CSS rule to hide payment form in payment methods list
        var cssEl = document.createElement('style'),sheet;
        document.head.appendChild(cssEl);
        cssEl.sheet.insertRule(`
            section#checkout-payment-step [data-payment-module=mollie] > .additional-information > .mollie-iframe-container {
              display: none!important;
            }
        `);
        cssEl.sheet.insertRule(`
            button.btn.btn-primary.center-block.disabled {
                pointer-events: all;
                opacity: 1;
            }
        `);
    },

    popup_onopen_callback: function () {
        if ($('.additional-information.mollie > .mollie-iframe-container').length) {
            var script = document.createElement('script');
            script.src = tcModuleBaseUrl+'/../mollie/views/js/front/mollie_iframe.js';
            document.head.appendChild(script);
        }
    },

    form: function (element) {
        var paymentOption = element.attr('id').match(/payment-option-\d+/)[0];

        var potentialFeeEl = element.find('[name=payment-fee-price]');
        if (potentialFeeEl.length == 1) {
            var fee = payment.parsePrice(potentialFeeEl.val());
            var container = element.parent('.tc-main-title').find('.payment-option');
            container.last().append('<div class="payment-option-fee hidden" id="' + paymentOption + '-fee">' + fee + '</div>');

            var potentialFeeLabelEl = element.find('[name=payment-fee-price-display]');
            if (potentialFeeLabelEl.length == 1) {
                container.find('label span.h6').append(' <span class="fee">(' + potentialFeeLabelEl.val() + ')</span>');
            }
        }
    },

}


