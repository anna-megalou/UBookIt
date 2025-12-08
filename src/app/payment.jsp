<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Checkout Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F0F9FF;
            margin: 0;
            padding: 0;
        }
        .container-header {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0rem;
            height: 25px;
        }
        .header-logo {
            font-size: 2.3rem;
            font-weight: bold;
            color: #04235C;
            margin-top: -10px;
        }
        header a {
            text-decoration: none;
            color: #04235C; 
            margin-right: 3rem;
            font-weight: bold;
            font-size: 1.1rem;
        }
        header a:last-child {
            margin-right: 0;
        }
        .profile-circle {
            width: 40px;           
            height: 40px;
            background-color: #04235C;  
            color: #F0F9FF;          
            font-weight: bold;
            margin-top: -7px;
            font-size: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;   
            cursor: default;       
            user-select: none;     
        }
        .container {
            background-color: white;
            border-radius: 2rem;
            max-width: 1400px;
            margin: 2rem auto;
            padding: 2rem;
        }
        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #04235C;
            margin-left: 2.5rem;
            margin-bottom: 2rem;
        }
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #04235C;
            margin-bottom: 1rem;
            margin-top: 0;
        }
        .card1 {
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            background-color: white;
            height: 100px;
            width: 850px;
            margin-left: 2.5rem;
            margin-top: 1rem;
        }
        .card2{
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            background-color: white;
            width: 850px;
            margin-left: 2.5rem;
        }
        .card3 {
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            background-color: white;
            height: 175px;
            width: 300px;
            margin-right: 2.5rem;
            margin-top: 1rem;
        }
        label {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 500;
            color: #04235C; 
        }
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 1rem; 
        }
        .payment-fields {
            margin-left: 2rem;
            margin-top: 1.5rem;
        }
        .field-row {
            display: flex;
            gap: 2rem;   
            margin-top: 1rem;
        }
        .field-inline {
            display: flex;
            align-items: center;
            gap: 0.5rem; 
        }
        .field-inline label {
            min-width: 120px;      
            text-align: right;     
        }
        .input-base {
            border: 1px solid #E0EDFA;
            border-radius: 2rem;
            padding: 0.6rem 1rem;
            color: #04235C;
            background-color: white;
            font-size: 1rem;
        }
        #cardNumber { width: 250px; }
        #expDate { width: 120px; }
        #cardName { width: 300px; }
        #cvv { width: 100px; }
        .cvv-field label {
            min-width: 50px; 
            text-align: right;
        }
        .cvv-field {
            gap: 0.5rem; 
        }
        input[type="radio"] {
            transform: scale(1.5);
        }
        .flex {
            display: flex;
        }
        .justify-between {
            justify-content: space-between;
        }
        .gap-4 {
            gap: 1rem;
        }
        .button-confirm {
            background-color: #0f1a40;
            color: white;
            border: none;
            border-radius: 1.5rem;
            padding: 0.5rem 0;
            height: 2.25rem;
            width: 175px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 1rem;
        }
        .button-wrapper {
            display: flex;
            justify-content: center; 
            margin-top: 1rem;        
        }
        .image-container img {
            max-width: 250px;
            height: 200px;
            border-radius: 0.5rem;
            margin-left: 5rem;
        }
    </style>
</head>
<body>
    <%@ include file="header.jsp" %>
    <div class="container">
        <% if(request.getAttribute("message") != null) { %>		
            <div class="alert alert-danger text-center" role="alert"><%=(String)request.getAttribute("message") %></div>
        <% } else { %>
            <div class="alert alert-success text-center" role="alert">Η παραγγελία σας ολοκληρώθηκε με επιτυχία!</div>
        <%
        } 
        %>

        <h1>Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου</h1>

        <form action="paymentController.jsp" method="post">

            <div class="flex gap-4">

                <!-- Left side -->
                <div style="flex: 3; display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Shipping method -->
                
                    <div class="card1">
                        <h2>Shipping method</h2>
                        <div class="radio-group">
                            <label><input type="radio" name="shipping" value="address"> Address</label>
                            <label><input type="radio" name="shipping" value="boxNow"> BOX NOW</label>
                        </div>
                    </div>

                    <!-- Payment method -->
                    <div id="payment-card" class="card2">
                        <h2>Payment method</h2>
                        <div class="radio-group">
                            <label><input type="radio" name="payment" value="cod"> Cash on delivery (+1,00€)</label>
                            <label><input type="radio" name="payment" value="card"> Card</label>
                        </div>
                        <div class="payment-fields">
                            <div class="field-row">
                                <div class="field-inline">
                                    <label for="cardNumber">Card number</label>
                                    <input type="text" id="cardNumber" class="input-base" placeholder="card number">
                                </div>
                                <div class="field-inline">
                                    <label for="expDate">Expiration Date</label>
                                    <input type="text" id="expDate" class="input-base" placeholder="exp. date">
                                </div>
                            </div>
                            <div class="field-row">
                                <div class="field-inline">
                                    <label for="cardName">Name on card</label>
                                    <input type="text" id="cardName" class="input-base" placeholder="name">
                                </div>
                                <div class="field-inline cvv-field">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" class="input-base" placeholder="CVV">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right side -->
                <div style="flex: 1; display: flex; flex-direction: column; gap: 0.1rem;">
                    <div class="card3">
                        <h2>Final amount</h2>
                        <div class="flex justify-between">
                            <span>Delivery</span>
                            <span id="delivery-fee">5,00€</span>
                        </div>
                        <div class="flex justify-between">
                            <span>+</span>
                            <span id="cash-fee">0,00€</span>
                        </div>
                        <hr>
                        <div class="flex justify-between" style="font-weight: bold;">
                            <span>Total</span>
                            <span id="total-amount">5,00€</span>
                        </div>
                        <div class="button-wrapper">
                            <button type="submit" class="button-confirm">Confirm</button>
                        </div>
                    </div>
                </form>

                <div class="image-container">
                    <img src="images/payment-method.png" alt="Money and card">
                </div>
            </div>
        </div>
    </div>
    <%@ include file="footer.jsp" %>
    <script>
    // --- Fields & card container ---
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardFields = document.querySelector('#payment-card .payment-fields');
    const cardContainer = document.getElementById('payment-card');

    cardFields.style.display = 'none';
    cardContainer.style.height = '100px';

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // εμφανιση/απόκρυψη πεδίων κάρτας
            if (radio.value === 'card' && radio.checked) {
                cardFields.style.display = 'block';
                cardContainer.style.height = '225px';
            } else {
                cardFields.style.display = 'none';
                cardContainer.style.height = '100px';
            }

            // ενημέρωση ποσού
            const deliveryFee = 5.00;
            const cashExtra = 1.00;
            const totalEl = document.getElementById('total-amount');
            const cashFeeEl = document.getElementById('cash-fee');

            if (radio.value === 'cod' && radio.checked) {
                cashFeeEl.textContent = cashExtra.toFixed(2) + '€';
                totalEl.textContent = (deliveryFee + cashExtra).toFixed(2) + '€';
            } else if (radio.value === 'card' && radio.checked) {
                cashFeeEl.textContent = '0,00€';
                totalEl.textContent = deliveryFee.toFixed(2) + '€';
            }
        });
    });

    // αρχική τιμή
    document.getElementById('cash-fee').textContent = '0,00€';
    document.getElementById('total-amount').textContent = '5,00€';
</script>
</body>
</html>