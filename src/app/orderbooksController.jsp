<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>
<%

    String city = request.getParameter("city");
    String address = request.getParameter("address");
    String prefecture = request.getParameter("prefecture");
    String postalStr = request.getParameter("postalCode");

    String totalPrice = request.getParameter("totalPrice");
    String[] storeNames = request.getParameterValues("storeName");
    String[] storePrices = request.getParameterValues("storePrice");

    if (totalPrice != null) session.setAttribute("price", Double.parseDouble(totalPrice));
    if (storeNames != null) session.setAttribute("storeNames", storeNames);
    if (storePrices != null) session.setAttribute("storePrices", storePrices);

    if(city == null || city.trim().isEmpty() || address == null || address.trim().isEmpty() || 
       prefecture == null || prefecture.trim().isEmpty() || postalStr == null || postalStr.trim().isEmpty()) {
        
        request.setAttribute("errorMessage", "You have to complete all the fields");
        request.getRequestDispatcher("orderbooks.jsp").forward(request, response);
        return; 
    }

    int postalCode = 0;
    try {
        postalCode = Integer.parseInt(postalStr);
    } catch(Exception e) {
        postalCode = 0;
    }

    try {
        Location location = new Location(30, city, address, prefecture, postalCode);
        LocationDAO locationdao = new LocationDAO();
        locationdao.insertLocation(location);
        
        // Όλα πήγαν καλά
        response.sendRedirect("payment.jsp");
    } catch (Exception e) {
        request.setAttribute("errorMessage", "Error while saving: " + e.getMessage());
        request.getRequestDispatcher("orderbooks.jsp").forward(request, response);
    }
%>
