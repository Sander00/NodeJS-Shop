window.addEventListener('load', function() {
    var stripe = Stripe('pk_test_83rRUU5vOiRjHTLZYyCapZpq');

    // Create an instance of Elements.
    var elements = stripe.elements();
    var style = {
        base: {
            padding: '10px 12px',
            color: '#32325d',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
        invalid: {
            color: '#fa755a',
        }
    };

    // Create an instance of the idealBank Element.
    var idealBank = elements.create('idealBank', {style: style});

    // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
    idealBank.mount('#ideal-bank-element');

    var errorMessage = document.getElementById('error-message');

    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        $('#checkoutSubmit').prop('disabled', true);

        var sourceData = {
            type: 'ideal',
            currency: 'eur',
            // This is a major flaw and should be fixed!!!!!!!!!!
            amount: $('#totalPrice').text() * 100,
            statement_descriptor: 'ORDER AT11990',
            owner: {
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                address: {
                    line1: document.querySelector('input[name="address"]').value
                }
            },
            // Specify the URL to which the customer should be redirected
            // after paying.
            redirect: {
                return_url: 'http://localhost:3000/charge',
            },
        };

        // Call `stripe.createSource` with the idealBank Element and additional options.
        stripe.createSource(idealBank, sourceData).then(function (result) {
            if (result.error) {
                // Inform the customer that there was an error.
                $('.error-message').prop('hidden', false).text(result.error.message);
                $('#checkoutSubmit').prop('disabled', false);
            } else {
                // Redirect the customer to the authorization URL.
                stripeSourceHandler(result.source);
            }
        });
    });

    function stripeSourceHandler(source) {
        // Redirect the customer to the authorization URL.
        document.location.href = source.redirect.url;
    }
});