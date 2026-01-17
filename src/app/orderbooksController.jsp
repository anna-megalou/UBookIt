<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Timestamp" %>
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

    // IDs propagated from Next.js (select/books) -> orderbooks.jsp -> here
    String userIdStr = request.getParameter("userId");
    String declarationIdStr = request.getParameter("declarationId");
    Integer userIdFromSession = (Integer) session.getAttribute("userId");
    Integer declarationIdFromSession = (Integer) session.getAttribute("declarationId");

    Integer effectiveUserId = userIdFromSession;
    if (effectiveUserId == null && userIdStr != null && !userIdStr.trim().isEmpty()) {
        try {
            effectiveUserId = Integer.parseInt(userIdStr.trim());
        } catch (Exception e) {
            // salvage digits (e.g. "id:123")
            try {
                String digits = userIdStr.replaceAll("[^0-9]", "");
                if (digits != null && !digits.isEmpty()) {
                    long parsed = Long.parseLong(digits);
                    if (parsed > 0 && parsed <= Integer.MAX_VALUE) effectiveUserId = (int) parsed;
                }
            } catch (Exception ex) {
                effectiveUserId = null;
            }
        }
    }

    Integer effectiveDeclarationId = declarationIdFromSession;
    if (effectiveDeclarationId == null && declarationIdStr != null && !declarationIdStr.trim().isEmpty()) {
        try {
            effectiveDeclarationId = Integer.parseInt(declarationIdStr.trim());
        } catch (Exception e) {
            // salvage digits
            try {
                String digits = declarationIdStr.replaceAll("[^0-9]", "");
                if (digits != null && !digits.isEmpty()) {
                    long parsed = Long.parseLong(digits);
                    if (parsed > 0 && parsed <= Integer.MAX_VALUE) effectiveDeclarationId = (int) parsed;
                }
            } catch (Exception ex) {
                effectiveDeclarationId = null;
            }
        }
    }

    if (effectiveUserId != null) session.setAttribute("userId", effectiveUserId);
    if (effectiveDeclarationId != null) session.setAttribute("declarationId", effectiveDeclarationId);

    String[] storeNames = request.getParameterValues("storeName");
    String[] storePrices = request.getParameterValues("storePrice");

    Double price = (Double) session.getAttribute("totalPrice");
    session.setAttribute("price", price);

    if (storeNames != null) session.setAttribute("storeNames", storeNames);
    if (storePrices != null) session.setAttribute("storePrices", storePrices);

    // We require userId for DB inserts; declarationId is needed later for payment, but may not exist yet.
    String missing = "";
    if (effectiveUserId == null) missing += " userId";
    if (effectiveDeclarationId == null) missing += " declarationId";

    if(effectiveUserId == null ||
       city == null || city.trim().isEmpty() || 
       address == null || address.trim().isEmpty() || 
       prefecture == null || prefecture.trim().isEmpty() ||
       postalStr == null || postalStr.trim().isEmpty() ||
       am == null || am.trim().isEmpty() || 
       identityIdStr == null || identityIdStr.trim().isEmpty() ||
       name == null || name.trim().isEmpty() || 
       surname == null || surname.trim().isEmpty() || 
       email == null || email.trim().isEmpty() ||
       phoneStr == null || phoneStr.trim().isEmpty()) {
        
        if (!missing.trim().isEmpty()) {
            request.setAttribute("errorMessage", "Some fields are missing:" + missing);
        } else {
            request.setAttribute("errorMessage", "Some fields are missing");
        }
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
        int  userId = effectiveUserId.intValue();

        Student student = new Student(am, identityId, name, surname, email, phone, universityId, userId);
        StudentDAO studentdao = new StudentDAO();
        studentdao.insertStudent(student);

        Location location = new Location(userId, city, address, prefecture, postalCode);
        LocationDAO locationdao = new LocationDAO();
        locationdao.insertLocation(location);

        // Ensure we have a "declarationId" for payment.
        // In this JSP flow we don't have a separate Declaration entity, so we map it to an Order ID.
        Integer currentOrderId = (Integer) session.getAttribute("currentOrderId");
        Integer declId = (Integer) session.getAttribute("declarationId");
        if (declId == null) declId = effectiveDeclarationId;

        if (declId == null || declId.intValue() <= 0) {
            if (currentOrderId == null || currentOrderId.intValue() <= 0) {
                Timestamp now = new Timestamp(System.currentTimeMillis());
                Double priceObj = (Double) session.getAttribute("price");
                double totalPrice = (priceObj != null) ? priceObj.doubleValue() : 0.0;
                List<OrderItems> itemsList = new ArrayList<OrderItems>(); // empty list (no book IDs available in this flow)
                Order order = new Order(userId, now, itemsList, totalPrice);
                OrderDAO orderDAO = new OrderDAO();
                orderDAO.insertOrder(order);

                currentOrderId = order.getOrderId();
                session.setAttribute("currentOrderId", currentOrderId);
            }

            if (currentOrderId != null && currentOrderId.intValue() > 0) {
                session.setAttribute("declarationId", currentOrderId.intValue());
                session.setAttribute("declarationIdRaw", String.valueOf(currentOrderId.intValue()));
            }
        } else {
            session.setAttribute("declarationId", declId.intValue());
            session.setAttribute("declarationIdRaw", String.valueOf(declId.intValue()));
        }
        
        // Όλα πήγαν καλά
        response.sendRedirect("payment.jsp");
    } catch (Exception e) {
        request.setAttribute("errorMessage", "Error while saving: " + e.getMessage());
        request.getRequestDispatcher("orderbooks.jsp").forward(request, response);
    }
%>
