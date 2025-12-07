package app.java_classes;

import java.sql.*;

public class PaymentDAO {

    public boolean insertPayment(Payment payment) throws Exception {
        DB db = new DB();
        Connection con = db.getConnection();
        String query = "INSERT INTO payment (user_id, declaration_id, shipping_method, payment_method, card_last4, card_holder_name, extra_fee, total_amount, payment_date) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement pstm = con.prepareStatement(query);
            pstm.setInt(1, payment.getUserId());
            pstm.setInt(2, payment.getDeclarationId());
            pstm.setString(3, payment.getShippingMethod());
            pstm.setString(4, payment.getPaymentMethod());
            pstm.setString(5, payment.getCardLast4());
            pstm.setString(6, payment.getCardHolderName());
            pstm.setDouble(7, payment.getExtraFee());
            pstm.setDouble(8, payment.getTotalAmount());
            pstm.setTimestamp(9, payment.getPaymentDate()); 
             

            pstm.executeUpdate();
            pstm.close();
			db.close();

            return true;

        } catch (Exception e) {
            throw new Exception(e.getMessage());

        } finally {
			try {
				db.close();
			} catch (Exception e) {

			}
		}
    }
}
