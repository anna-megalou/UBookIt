<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>

<%
try {
    // =========================
    // 1. Έλεγχος βασικών πεδίων
    // =========================
    String ship_method = request.getParameter("shipping");
    String pay_method  = request.getParameter("payment");

    if (ship_method == null || pay_method == null) {
        throw new Exception("Shipping or payment method missing");
    }

    if (!ship_method.equals("address") && !ship_method.equals("boxNow")) {
        throw new Exception("Invalid shipping method");
    }

    if (!pay_method.equals("cod") && !pay_method.equals("card")) {
        throw new Exception("Invalid payment method");
    }

    // =========================
    // 2. Παίρνουμε δεδομένα από session
    // =========================
    Integer userIdObj = (Integer) session.getAttribute("userId");
    Double priceObj   = (Double) session.getAttribute("price");

    if (userIdObj == null || priceObj == null) {
        throw new Exception("Session data missing");
    }

    int userId = userIdObj;
    double totalAmount = priceObj;

    // Αν δεν έχεις declaration ακόμα
    int declarationId = 0;

    // =========================
    // 3. Υπολογισμός extra fee
    // =========================
    double extraFee = 0.0;
    if (pay_method.equals("cod")) {
        extraFee = 1.0;
        totalAmount += extraFee;
    }

    // =========================
    // 4. Στοιχεία κάρτας (αν υπάρχουν)
    // =========================
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

    // =========================
    // 5. Δημιουργία Payment object
    // =========================
    Payment payment;

    if (pay_method.equals("card")) {
        payment = new Payment(
            0,
            0,
            ship_method,
            pay_method,
            cardLast4,
            cardHolderName,
            extraFee,
            totalAmount
        );
    } else {
        payment = new Payment(
            0,
            0,
            ship_method,
            pay_method,
            extraFee,
            totalAmount
        );
    }

    // =========================
    // 6. Αποθήκευση στη βάση
    // =========================
    PaymentDAO paymentDAO = new PaymentDAO();
    paymentDAO.insertPayment(payment);

    // =========================
    // 7. Success
    // =========================
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
