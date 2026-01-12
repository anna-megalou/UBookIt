<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.DecimalFormatSymbols" %>
<%
request.setCharacterEncoding("UTF-8");
%>
<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <title>Checkout Page</title>
    <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #F0F9FF;
            margin: 0;
            padding: 0;
            padding-top: 100px; /* Space for fixed header */
        }
        .container {
            background-color: white;
            border-radius: 2rem;
            max-width: 1400px;
            margin: 2rem auto;
            padding: 2rem 3rem;
        }
        .container-header {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0rem;
            height: 25px;
        }
        /* Breadcrumb Styles */
        .breadcrumbs ul {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            list-style: none;
            padding: 0;
            margin: 0;
            gap: 0.5rem;
        }
        .breadcrumbs li {
            display: flex;
            align-items: center;
        }
        .breadcrumbs a {
            color: #04235C;
            text-decoration: none;
            transition: color 0.2s;
        }
        .breadcrumbs a:hover {
            color: #304D79;
            text-decoration: underline;
        }
        .breadcrumbs-separator {
            display: flex;
            align-items: center;
            color: #99AAC1;
            margin: 0 0.25rem;
        }
        .breadcrumbs [aria-current="page"] {
            color: #04235C;
            font-weight: 500;
        }
        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #04235C;
            margin-bottom: 2rem;
        }
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #04235C;
            margin-bottom: 1.5rem;
            margin-top: 0;
        }
        .card1 {
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            background-color: white;
            height: 225px;
            width: 850px;
            margin-bottom: 2rem;
        }
        .card2{
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            height: 165px;
            background-color: white;
            width: 850px;
            margin-bottom: 2rem;
        }
        .card3 {
            border: 3px solid #E0EDFA;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            border-radius: 1.5rem;
            padding: 1.5rem;
            background-color: white;
            width: 350px;
            margin-top: 0rem;
            margin-left: 3rem;
            margin-right: 2rem;
        }
        label {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 500;
            color: #04235C;
        }
        .personal-fields {
            margin-left: 2rem;
            margin-top: 1.5rem;
            display: grid;
            grid-template-columns: auto 1fr auto 1fr;
            gap: 1rem 1.5rem;
            align-items: center;
        }
        .field-row {
            display: contents;
        }
        .field-inline {
            display: contents;
        }
        .field-inline label {
            text-align: right;
            font-weight: 500;
            color: #04235C;
        }
        .input-base {
            border: 1px solid #E0EDFA;
            border-radius: 2rem;
            padding: 0.6rem 1rem;
            color: #04235C;
            background-color: white;
            font-size: 1rem;
        }
        .personal-fields .input-base {
            width: 72%;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"] {
            border: 1px solid #d3d3d3;
            border-radius: 50px;
            padding: 0.6rem 1rem;
            width: 150px;
        }
        .row {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1rem;
        }
        .side-right img {
            width: 260px;
            height: auto;
        }
        .amount-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            font-size: 1.15rem;
            font-weight: bold;
        }
        .store-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .store-row {
            display: grid;
            grid-template-columns: 250px auto; 
            align-items: center;
            margin-bottom: 0.75rem;
        }
        .store-name {
            text-align: left; 
            overflow-wrap: break-word;
        }
        .store-price {
            text-align: right; 
        }
        .button {
            background-color: #04235C;
            color: white;
            padding: 0.6rem 2rem;
            border-radius: 50px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            margin-top: 1rem;
        }
        .gap-4 {
            gap: 1rem;
        }
        .flex {
            display: flex;
        }
        .justify-between {
            justify-content: space-between;
        }
        .image-container img {
            width: 400px;
            height: 300px;
            border-radius: 0.5rem;
            margin-left: 5rem;
            margin-bottom: 0rem;
        }
    </style>
</head>
<body>
   
    <div class="container">
        <%@ include file="header.jsp" %>
        <h1>Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου</h1>
        <% if (request.getAttribute("errorMessage") != null) { %>		
            <div class="alert alert-danger text-center" style="color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 10px; border: 1px solid #f5c6cb; margin-bottom: 20px; margin-left: 0rem; width: 275px; "><%=(String)request.getAttribute("errorMessage") %></div>
        <% 
        } 
        %>
        <form action="orderbooksController.jsp" method="post">
            <div class="flex gap-4">

                <!-- LEFT SIDE FORM -->
                <div style="flex: 3; display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Payment method -->
                    <div class="card1">
                        <h2>Personal Details</h2>
                        <div class="personal-fields">
                            <label for="AM">AM</label>
                            <input type="text" id="AM" name="AM" class="input-base" placeholder="academic id">
                            <label for="identity">Identity</label>
                            <input type="text" id="identity" name="identity" class="input-base" placeholder="identity id">
                            
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" class="input-base" placeholder="name">
                            <label for="surname">Surname</label>
                            <input type="text" id="surname" name="surname" class="input-base" placeholder="surname">

                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" class="input-base" placeholder="email">
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" name="phone" class="input-base" placeholder="phone">
                        </div>
                    </div>

                    <!-- Location details -->
                    <div class="card2">
                        <h2>Location details</h2>
                        <div class="personal-fields">
                            <label for="city">City</label>
                            <input type="text" id="city" name="city" class="input-base" placeholder="city">
                            <label for="prefecture">Prefecture</label>
                            <input type="text" id="prefecture" name="prefecture" class="input-base" placeholder="prefecture">

                            <label for="address">Address</label>
                            <input type="text" id="address" name="address" class="input-base" placeholder="address">
                            <label for="postalCode">Postal Code</label>
                            <input type="text" id="postalCode" name="postalCode" class="input-base" placeholder="postal code">
                        </div>
                    </div>
                </div>

                <!-- RIGHT SIDE -->
                <div class="side-right" style="flex: 1; text-align:center;">
                    <div class="image-container">
                        <img src="images/kid_with_card.png" alt="Kid with card">
                    </div>

                    <div class="card3">
    <h3 style="font-size: 1.2rem; font-weight: bold; color:#04235C;">Proceed your payment</h3>
    
    <% 
        // 1. Διαβάζουμε ΜΟΝΟ από το session
        Double priceObj = (Double) session.getAttribute("totalPrice");
        double price = (priceObj != null) ? priceObj : 0.0;

        String[] storeNames = (String[]) session.getAttribute("storeNames");
        String[] storePrices = (String[]) session.getAttribute("storePrices");

        // Format για το Ευρώ
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setDecimalSeparator(',');
        symbols.setGroupingSeparator('.');
        DecimalFormat euroFormat = new DecimalFormat("0.00", symbols);
    %>

    <div class="amount-row">
        <span>Amount</span>
        <span><%= euroFormat.format(price) %> €</span>
    </div>

    <ul class="store-list">
    <%
        if (storeNames != null && storePrices != null) {
            for (int i = 0; i < storeNames.length; i++) {
                double sp = 0;
                try {
                    sp = Double.parseDouble(storePrices[i]);
                } catch (Exception e) {
                    sp = 0;
                }
    %>
        <li class="store-row">
            <span class="store-name">• <%= storeNames[i] %></span>
            <span class="store-price"><%= euroFormat.format(sp) %> €</span>
        </li>
    <%
            }
        } else {
    %>
        <li class="store-row">Δεν βρέθηκαν στοιχεία παραγγελίας στο session.</li>
    <% } %>
    </ul>

    <button type="submit" class="button">
        Continue →
    </button>
</div>

                    </div>
                </div>
            </div>
        </form>
    </div>

    <%@ include file="footer.jsp" %>

</body>
</html>
