package app.java_classes;

import java.sql.*;

public class OrderDAO {

    public void insertOrder(Order order) throws Exception {

        DB db = new DB();
        Connection con = null;

        String orderSql =
            "INSERT INTO orders (user_id, order_date, total_price) " +
            "VALUES (?, ?, ?)";

        String itemSql =
            "INSERT INTO order_items (order_id, book_id) " +
            "VALUES (?, ?)";

        try {
            con = db.getConnection();
            con.setAutoCommit(false); 

            PreparedStatement orderStmt =
                con.prepareStatement(orderSql, Statement.RETURN_GENERATED_KEYS);

            orderStmt.setInt(1, order.getUserId());
            orderStmt.setTimestamp(2, order.getOrderDate());
            orderStmt.setDouble(3, order.getTotalPrice());

            orderStmt.executeUpdate();

            ResultSet rs = orderStmt.getGeneratedKeys();
            if (rs.next()) {
                order.setOrderId(rs.getInt(1));
            } else {
                throw new Exception("Order ID was not generated");
            }

            rs.close();
            orderStmt.close();

            PreparedStatement itemStmt = con.prepareStatement(itemSql);

            for (OrderItems item : order.getItems()) {
                itemStmt.setInt(1, order.getOrderId());
                itemStmt.setInt(2, item.getBookId());
                itemStmt.addBatch();
            }

            itemStmt.executeBatch();
            itemStmt.close();

            con.commit();

            db.close();
        } catch (Exception e) {
            if (con != null) con.rollback(); 
            throw new Exception("Error inserting order with items: " + e.getMessage(), e);

        } finally {
            try {
                if (con != null) con.setAutoCommit(true);
                db.close();
            } catch (Exception e) {}
        }
    }
}
