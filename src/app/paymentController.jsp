<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*"%>

<%
String ship_method = request.getParameter("shipping");
String pay_method = request.getParameter("payment");

try {
    if (ship_method == null || pay_method == null) {
        throw new Exception("Parameters missing");
    }

    if (!ship_method.equals("address") && !ship_method.equals("boxNow")) {
        throw new Exception("Invalid shipping method");
    }

    if (!pay_method.equals("cod") && !pay_method.equals("card")) {
        throw new Exception("Invalid payment method");
    }
    
    Integer userIdObj = (Integer) session.getAttribute("user_id");// Το δέχομαι με το συνδεθεί ένας χρήστης
    if (userIdObj == null) {
        throw new Exception("User not logged in");
    }
    int userId = userIdObj; // Το δέχομαι με το που γίνει συνδεθεί ένας χρήστης

    Integer declarationIdObj = (Integer) session.getAttribute("declaration_id"); // Το δέχομαι με το που γίνει η επιβεβαίωση δήλωσης των συγγραμμάτων
    if (declarationIdObj == null) {
        throw new Exception("No declaration selected");
    }
    int declarationId = declarationIdObj;

    String fullCardNumber = request.getParameter("cardNumber"); 
    String card_last4 = "";
    if (fullCardNumber != null && fullCardNumber.length() >= 4) {
    card_last4 = fullCardNumber.substring(fullCardNumber.length() - 4); 
    }

    String card_holder = request.getParameter("cardHolderName");
    
    double extra_fee;
    if (pay_method.equals("cod")) {
        extra_fee = 1.00;
    } else {
        extra_fee = 0.00;
    }

    double amount = (Double) session.getAttribute("amount"); // Το δέχομαι με το που επιλέξει ο χρήστης ποια συγγράμματα θέλει να του αποσταλούν
    if (amount == null) {
        throw new Exception("Amount not found in session");
    }

    double total_amount = amount + extra_fee;
    session.setAttribute("total_amount", total_amount);

    Payment payment = new Payment(userId, declarationId, ship_method, pay_method,
                                  card_last4, card_holder, extra_fee, total_amount);

    PaymentDAO paymentDAO = new PaymentDAO();
    paymentDAO.insertPayment(payment);
    
    response.sendRedirect("payment.jsp"); 
    return;
} catch(Exception e) {
    request.setAttribute("message", "Could not save payment: " + e.getMessage());
    response.sendRedirect("payment.jsp"); 
    return;
}
%>