<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>
<%
    String am = request.getParameter("AM");
    String identityIdStr = request.getParameter("identity");
    String name = request.getParameter("name");
    String surname = request.getParameter("surname");
    String email = request.getParameter("email");
    String phoneStr = request.getParameter("phone");

    String city = request.getParameter("city");
    String address = request.getParameter("address");
    String prefecture = request.getParameter("prefecture");
    String postalStr = request.getParameter("postalCode");

    String[] storeNames = request.getParameterValues("storeName");
    String[] storePrices = request.getParameterValues("storePrice");
    

    Double price = (Double) session.getAttribute("totalPrice");
    session.setAttribute("price", price);

    if (storeNames != null) session.setAttribute("storeNames", storeNames);
    if (storePrices != null) session.setAttribute("storePrices", storePrices);

    int userId = 2;
    int declarationId = 1;

    if(city == null || city.trim().isEmpty() || 
       address == null || address.trim().isEmpty() || 
       prefecture == null || prefecture.trim().isEmpty() ||
       postalStr == null || postalStr.trim().isEmpty() ||
       am == null || am.trim().isEmpty() || 
       identityIdStr == null || identityIdStr.trim().isEmpty() ||
       name == null || name.trim().isEmpty() || 
       surname == null || surname.trim().isEmpty() || 
       email == null || email.trim().isEmpty() ||
       phoneStr == null || phoneStr.trim().isEmpty()) {
        
        request.setAttribute("errorMessage", "Some fields are missing");
        request.getRequestDispatcher("orderbooks.jsp").forward(request, response);
        return; 
    }

    int postalCode = 0;
    long identityId = 0L;
    long phone = 0L;

    try {
        postalCode = Integer.parseInt(postalStr);
    } catch(Exception e) { 
        postalCode = 0; 
    }

    try {
        identityId = Long.parseLong(identityIdStr); 
    } catch(Exception e) { 
        identityId = 0L; 
    }

    try {
        phone = Long.parseLong(phoneStr);
    } catch(Exception e) { 
        phone = 0L; 
    }

    try {

        String universityId = "aueb";

        Student student = new Student(am, identityId, name, surname, email, phone, universityId, userId);
        StudentDAO studentdao = new StudentDAO();
        studentdao.insertStudent(student);

        Location location = new Location(userId, city, address, prefecture, postalCode);
        LocationDAO locationdao = new LocationDAO();
        locationdao.insertLocation(location);
        
        // Όλα πήγαν καλά
        response.sendRedirect("payment.jsp");
    } catch (Exception e) {
        request.setAttribute("errorMessage", "Error while saving: " + e.getMessage());
        request.getRequestDispatcher("orderbooks.jsp").forward(request, response);
    }
%>
