<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.util.stream.Collectors" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="com.fasterxml.jackson.databind.JsonNode" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="javax.servlet.http.HttpServletResponse" %>

<%
    // 1. **ΕΠΙΤΡΕΠΕΙ CORS ΓΙΑ ΟΠΟΙΑΔΗΠΟΤΕ ΜΕΘΟΔΟ**
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3003"); // Ή "*" για όλα
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Credentials", "true"); // Σημαντικό για sessions

    // 2. **ΧΕΙΡΙΣΜΟΣ PREFLIGHT (OPTIONS request)**
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
        response.setStatus(HttpServletResponse.SC_OK); // Status 200 OK
        return; // Τερματίζει αμέσως την εκτέλεση της JSP
    }
    
    // 3. **ΧΕΙΡΙΣΜΟΣ POST (Κύριο αίτημα)**
    if ("POST".equalsIgnoreCase(request.getMethod())) {
        try {
            // ... Ο υφιστάμενος κώδικας σας για την ανάγνωση JSON, Session, κλπ. ...
            String jsonPayload = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonPayload);
            
            double amount = rootNode.get("totalPrice").asDouble(); 
            session.setAttribute("amount", amount); 
            
            response.setContentType("application/json");
            response.getWriter().write("{\"status\": \"success\"}");
            
            return;
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}");
            return;
        }
    } else {
        // Αν κάποιος προσπαθήσει να επισκεφτεί τη σελίδα απευθείας με GET
        response.sendRedirect("errorPage.jsp?code=405"); 
        return;
    }
%>