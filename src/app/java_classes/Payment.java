package app.java_classes;

import java.sql.Timestamp;

public class Payment {
    private int paymentId;
    private int userId;
    private int declarationId;
    private String shippingMethod;
    private String paymentMethod;
    private String cardLast4;
    private String cardHolderName;
    private double extraFee;
    private double totalAmount;
    private Timestamp paymentDate;

    public Payment(int paymentId, int userId, int declarationId, String shippingMethod, String paymentMethod,
                   String cardLast4, String cardHolderName, double extraFee, double totalAmount, Timestamp paymentDate) {
        this.paymentId = paymentId;
        this.userId = userId;
        this.declarationId = declarationId;
        this.shippingMethod = shippingMethod;
        this.paymentMethod = paymentMethod;
        this.cardLast4 = cardLast4;
        this.cardHolderName = cardHolderName;
        this.extraFee = extraFee;
        this.totalAmount = totalAmount;
        this.paymentDate = paymentDate;
    }

    public int getPaymentId() { 
        return paymentId; 
    }

    public void setPaymentId(int paymentId) { 
        this.paymentId = paymentId; 
    }

    public int getUserId() { 
        return userId; 
    }

    public void setUserId(int userId) { 
        this.userId = userId; 
    }

    public int getDeclarationId() { 
        return declarationId; 
    }

    public void setDeclarationId(int declarationId) { 
        this.declarationId = declarationId; 
    }

    public String getShippingMethod() { 
        return shippingMethod; 
    }

    public void setShippingMethod(String shippingMethod) { 
        this.shippingMethod = shippingMethod; 
    }

    public String getPaymentMethod() { 
        return paymentMethod; 
    }

    public void setPaymentMethod(String paymentMethod) { 
        this.paymentMethod = paymentMethod; 
    }

    public String getCardLast4() { 
        return cardLast4; 
    }

    public void setCardLast4(String cardLast4) { 
        this.cardLast4 = cardLast4; 
    }

    public String getCardHolderName() { 
        return cardHolderName; 
    }

    public void setCardHolderName(String cardHolderName) { 
        this.cardHolderName = cardHolderName; 
    }

    public double getExtraFee() { 
        return extraFee; 
    }

    public void setExtraFee(double extraFee) { 
        this.extraFee = extraFee; 
    }

    public double getTotalAmount() { 
        return totalAmount; 
    }

    public void setTotalAmount(double totalAmount) { 
        this.totalAmount = totalAmount; 
    }

    public Timestamp getPaymentDate() { 
        return paymentDate; 
    }

    public void setPaymentDate(Timestamp paymentDate) { 
        this.paymentDate = paymentDate; 
    }
}
