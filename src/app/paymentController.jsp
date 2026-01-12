<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>

<%
try {
    
    String ship_method = request.getParameter("shipping");
    String pay_method  = request.getParameter("payment");

    boolean isShipInvalid = (ship_method == null || (!ship_method.equals("address") && !ship_method.equals("boxNow")));
    boolean isPayInvalid  = (pay_method == null || (!pay_method.equals("cod") && !pay_method.equals("card")));

    if (isShipInvalid && isPayInvalid) {
        throw new Exception("Shipping and payment method missing");
    } else if (isShipInvalid) {
        throw new Exception("Shipping method missing");
    } else if (isPayInvalid) {
        throw new Exception("Payment method missing");
    }

    Double priceObj   = (Double) session.getAttribute("price");

    double totalAmount = priceObj;

    // dummies
    int userId = 30;
    int declarationId = 1;

    double extraFee = 0.0;
    if (pay_method.equals("cod")) {
        extraFee = 1.0;
        totalAmount += extraFee;
    }

    String cardLast4 = null;
    String cardHolderName = null;

    if (pay_method.equals("card")) {
        String fullCardNumber = request.getParameter("cardNumber");
        cardHolderName = request.getParameter("cardName");
        String expDate = request.getParameter("expDate");
        String cvv = request.getParameter("cvv");

        if (fullCardNumber == null || cardHolderName == null ||
            expDate == null || cvv == null ||
            fullCardNumber.isEmpty() || cardHolderName.isEmpty()) {
            throw new Exception("Card details missing");
        }

        // Παίρνουμε ΜΟΝΟ τα τελευταία 4 ψηφία
        cardLast4 = fullCardNumber.substring(fullCardNumber.length() - 4);
    }

    Payment payment;

    if (pay_method.equals("card")) {
        payment = new Payment(
            userId,
            declarationId,
            ship_method,
            pay_method,
            cardLast4,
            cardHolderName,
            extraFee,
            totalAmount
        );
    } else {
        payment = new Payment(
            userId,
            declarationId,
            ship_method,
            pay_method,
            extraFee,
            totalAmount
        );
    }

    
    PaymentDAO paymentDAO = new PaymentDAO();
    paymentDAO.insertPayment(payment);

    request.setAttribute("successMessage", "Payment completed successfully!");
    %>
    <jsp:forward page="payment.jsp" />
    <%
    return;

} catch (Exception e) {
    request.setAttribute("errorMessage", "Could not save payment: " + e.getMessage());
    %>
    <jsp:forward page="payment.jsp" />
    <%
}
%>
