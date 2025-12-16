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
            padding: 2rem 3rem;
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
        }
        .field-row {
            display: flex;
            gap: 2rem;   
            margin-top: 1.5rem;
        }
        .field-inline {
            display: flex;
            align-items: center;
            gap: 0.1rem; 
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
        #AM { width: 200px; }
        #identity { width: 200px; }
        #name { width: 225px; }
        #surname { width: 225px; }
        #email { width: 250px; }
        #phone { width: 200px; }
        #city { width: 225px; }
        #prefecture { width: 225px; }
        #street { width: 275px; }
        #streetId { width: 175px; }
        input[type="text"],
        input[type="email"],
        input[type="tel"] {
            border: 1px solid #d3d3d3;
            border-radius: 50px;
            padding: 0.6rem 1rem;
            width: 100%;
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
    <%@ include file="header.jsp" %>
    <div class="container">

        <h1>Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου</h1>

        <div class="flex gap-4">

            <!-- LEFT SIDE FORM -->
            <div style="flex: 3; display: flex; flex-direction: column; gap: 1rem;">
                <!-- Payment method -->
                <div class="card1">
                    <h2>Personal Details</h2>
                    <div class="personal-fields">
                        <div class="field-row">
                            <div class="field-inline">
                                <label for="AM">AM</label>
                                <input type="text" id="AM" class="input-base" placeholder="academic id">
                            </div>
                            <div class="field-inline">
                                <label for="identity">Identity</label>
                                <input type="text" id="identity" class="input-base" placeholder="identity id">
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-inline">
                                <label for="name">Name</label>
                                <input type="text" id="name" class="input-base" placeholder="name">
                            </div>
                            <div class="field-inline">
                                <label for="surname">Surname</label>
                                <input type="text" id="surname" class="input-base" placeholder="surname">
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-inline">
                                <label for="email">Email</label>
                                <input type="text" id="email" class="input-base" placeholder="email">
                            </div>
                            <div class="field-inline">
                                <label for="phone">Phone</label>
                                <input type="text" id="phone" class="input-base" placeholder="phone">
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <!-- Location details -->
                <div class="card2">
                    <h2>Location details</h2>
                    <div class="personal-fields">
                        <div class="field-row">
                            <div class="field-inline">
                                <label for="city">City</label>
                                <input type="text" id="city" class="input-base" placeholder="city">
                            </div>
                            <div class="field-inline">
                                <label for="prefecture">Prefecture</label>
                                <input type="text" id="prefecture" class="input-base" placeholder="prefecture">
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-inline">
                                <label for="street">Street</label>
                                <input type="text" id="street" class="input-base" placeholder="street name">
                            </div>
                            <div class="field-inline">
                                <label for="streetId">Street Id</label>
                                <input type="text" id="streetId" class="input-base" placeholder="street id">
                            </div>
                        </div>
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
                    <% String pr = request.getParameter("totalPrice");
                    double price = 0;
                    if (pr != null && !pr.isEmpty()) {
                        try {
                            price = Double.parseDouble(pr);
                        } catch (NumberFormatException e) {
                            price = 0; // fallback
                        }
                    }
                    session.setAttribute("price", price);
                    String[] storeNames = request.getParameterValues("storeName");
                    String[] storePrices = request.getParameterValues("storePrice");

                    session.setAttribute("storeNames", storeNames);
                    session.setAttribute("storePrices", storePrices);
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
                                } catch (NumberFormatException e) {
                                    sp = 0;
                                }
                        %>
                                 <li class="store-row">
                                    <span class="store-name">• <%= storeNames[i] %></span>
                                    <span class="store-price"><%= euroFormat.format(sp) %> €</span>
                                </li>
                        <%
                            }
                        }
                        %>
                    </ul>

                    <button class="button" onclick="window.location.href='payment.jsp'">
                        Continue →
                    </button>
                </div>
            </div>
        </div>

    </div>

    <%@ include file="footer.jsp" %>

</body>
</html>
