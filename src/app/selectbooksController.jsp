<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Timestamp" %>

<%
    request.setCharacterEncoding("UTF-8");
    // 1. Λήψη δεδομένων από τη σελίδα SelectBooks (Next.js)
    String totalPriceStr = request.getParameter("totalPrice");
    String[] selectedBookIds = request.getParameterValues("selectedBookIds");
    String[] storeNames = request.getParameterValues("storeName");
    String[] storePrices = request.getParameterValues("storePrice");

    // Έλεγχος αν υπάρχουν δεδομένα
    if (selectedBookIds == null || selectedBookIds.length == 0) {
        request.setAttribute("errorMessage", "Πρέπει να επιλέξετε τουλάχιστον ένα διαθέσιμο σύγγραμμα.");
        request.getRequestDispatcher("selectbooks.tsx").forward(request, response);
        return;
    }

    try {
        double totalPrice = Double.parseDouble(totalPriceStr);
        int userId = 2; // Dummy User ID (όπως στο παράδειγμά σου)
        Timestamp now = new Timestamp(System.currentTimeMillis());

        // 2. Δημιουργία λίστας OrderItems
        List<OrderItems> itemsList = new ArrayList<OrderItems>();
        for (String bId : selectedBookIds) {
            int bookId = Integer.parseInt(bId.trim()); // Τώρα θα δουλέψει γιατί το "1" χωράει σε int
            itemsList.add(new OrderItems(0, bookId));
        }

        // 3. Δημιουργία του Order και κλήση του DAO
        Order order = new Order(userId, now, itemsList, totalPrice);
        OrderDAO orderDAO = new OrderDAO();
        
        // Η μέθοδος insertOrder κάνει το transaction (orders & order_items)
        orderDAO.insertOrder(order);

        // 4. Αποθήκευση στο Session (αν χρειάζονται για την επόμενη σελίδα)
        session.setAttribute("currentOrderId", order.getOrderId());
        session.setAttribute("totalPrice", totalPrice);
        
        if (totalPriceStr != null) {
            session.setAttribute("totalPrice", Double.parseDouble(totalPriceStr));
        }
        if (storeNames != null) {
            session.setAttribute("storeNames", storeNames);
        }
        if (storePrices != null) {
            session.setAttribute("storePrices", storePrices);
        }

        // 5. Όλα πήγαν καλά -> Ανακατεύθυνση στην orderbooks.jsp
        response.sendRedirect("orderbooks.jsp");

    } catch (Exception e) {
        // Εκτυπώνει το σφάλμα στο Console του server (Eclipse/NetBeans)
        e.printStackTrace(); 
        
        // Παίρνουμε το μήνυμα του σφάλματος (π.χ. "Table 'orders' doesn't exist" ή "Foreign key violation")
        String fullError = e.toString(); 
        
        // Το κωδικοποιούμε για να μπορεί να μπει σε URL
        String encodedError = java.net.URLEncoder.encode(fullError, "UTF-8");
        
        // Σε γυρνάει πίσω με την παράμετρο 'error' στο URL
        response.sendRedirect("http://localhost:3003/select/books?error=" + encodedError);
        return;
    }
%>