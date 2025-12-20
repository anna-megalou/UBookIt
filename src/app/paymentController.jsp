<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*"%>

<%
String ship_method = request.getParameter("shipping");
String pay_method = request.getParameter("payment");

try {

    if (ship_method == null && pay_method == null) {
        throw new Exception("Shipping and Payment method missing");
    } 

    if (ship_method == null) {
        throw new Exception("Shipping method missing");
    }

    if (pay_method == null) {
        throw new Exception("Payment method missing");
    }

    if (!ship_method.equals("address") && !ship_method.equals("boxNow")) {
        throw new Exception("Invalid shipping method");
    }

    if (!pay_method.equals("cod") && !pay_method.equals("card")) {
        throw new Exception("Invalid payment method");
    }

    String fullCardNumber = request.getParameter("cardNumber");
    String card_holder = request.getParameter("cardName"); 
    String exp_date = request.getParameter("expDate");
    String cvv = request.getParameter("cvv");
    if (pay_method.equals("card")) {
        if (fullCardNumber == null || card_holder == null || exp_date == null || cvv == null) {
            throw new Exception("Card details missing");
        }
    }
    request.setAttribute("successMessage", "Payment completed successfully!");
    %>
        <jsp:forward page="payment.jsp" />
    <% 
    return;
} catch(Exception e) {
    request.setAttribute("errorMessage", "Could not save payment: " + e.getMessage());
    %>
        <jsp:forward page="payment.jsp" />
    <%
    return;
}
%>