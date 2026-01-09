<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.java_classes.*"%>

<%
String city = request.getParameter("city");
String prefecture = request.getParameter("prefecture");
String address = request.getParameter("address");
int postal_code = Integer.parseInt(request.getParameter("postalCode"));
Location location = new Location(0, city, address, prefecture, postal_code);
LocationDAO locationDAO = new LocationDAO();
locationDAO.insertLocation(location);
%>
    <jsp:forward page="orderbooks.jsp" />
<%
%>