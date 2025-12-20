import Image from "next/image";

export default function CheckoutPage() {
return (
    <div className="container bg-white rounded-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-center lg:justify-start items-start px-16 pt-7 pb-15">
        <h1 className="text-4xl font-bold text-primary-dark">
          Συμπλήρωσε τα στοιχεία αποστολής για την παραγγελία σου
        </h1>
      </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-15 pb-10">  
            {/* Αριστερή πλευρά - Μέθοδοι αποστολής και πληρωμής */}  
            <div className="flex flex-col gap-8 flex-3">  
                {/* Shipping method */}  
                <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-8 w-full">  
                    <h2 className="text-2xl font-semibold text-primary-dark mb-6">Shipping method</h2>  
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-5">
                                    <input type="radio" name="shipping" value="address" className="w-5 h-5 accent-primary-dark"/>
                                    <span className="text-primary-dark font-medium text-lg whitespace-nowrap">Address</span>
                                </div>
                            </label>
                            <label className="flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <input type="radio" name="shipping" value="boxNow" className="w-5 h-5 accent-primary-dark"/>
                                    <span className="text-primary-dark font-medium text-lg whitespace-nowrap">BOX NOW</span>
                                </div>
                            </label>
                        </div>
                    </div>    
                </div>  

                {/* Payment method */}
                <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-8 w-full">
                    <h2 className="text-2xl font-semibold text-primary-dark mb-6">Payment method</h2>
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-5">
                                    <input type="radio" name="shipping" value="address" className="w-5 h-5 accent-primary-dark"/>
                                    <span className="text-primary-dark font-medium text-lg whitespace-nowrap">Cash on delivery (+1,00€)</span>
                                </div>
                            </label>
                            <label className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-5">
                                    <input type="radio" name="shipping" value="boxNow" className="w-5 h-5 accent-primary-dark"/>
                                    <span className="text-primary-dark font-medium text-lg whitespace-nowrap">Card</span>
                                </div>
                            </label>
                    

                                {/* Card details */}
                            <div className="flex flex-col gap-4 mt-2 ml-10">
                                <div className="flex flex-wrap gap-6 mb-4">
                                    <div className="flex items-center gap-2 flex-1 w-full">
                                        <label className="w-50 text-md font-semibold text-primary-dark">Card number</label>
                                        <input type="text" placeholder="card number" className="border border-gray-300 rounded-full px-4 py-2 w-full" />
                                    </div>
                                    <div className="flex items-center gap-2 flex-1 w-full">
                                        <label className="w-50 text-md font-semibold text-primary-dark">Expiration Date</label>
                                        <input type="text" placeholder="exp. date" className="border border-gray-300 rounded-full px-4 py-2 w-full" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 mb-4 w-full">
                                    <div className="flex items-center gap-2 flex-1 w-full">
                                        <label className="w-55 text-md font-semibold text-primary-dark">Name on card</label>
                                        <input type="text" placeholder="name" className="border border-gray-300 rounded-full px-4 py-2 w-full" />
                                    </div>
                                    <div className="flex items-center gap-2 flex-1 w-full">
                                        <label className="w-12 text-md font-semibold text-primary-dark">CVV</label>
                                        <input type="text" placeholder="CVV" className="border border-gray-300 rounded-full px-4 py-2 w-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>


            {/* Δεξιά πλευρά - Σύνοψη και εικόνα */}  
            <div className="flex-1 flex flex-col gap-8 items-stretch">  

                {/* Final amount card FIRST */}  
                <div className="border-3 border-secondary-border shadow-sm bg-white-light rounded-3xl p-8 w-full">  
                    <h2 className="text-2xl font-semibold text-primary-dark mb-6">Final amount</h2>  
                    <div className="flex justify-between mb-2">  
                        <span className="text-primary-dark font-medium text-lg">Delivery</span>  
                        <span className="text-primary-dark font-medium text-lg">5,00€</span>  
                    </div>  
                    <div className="flex justify-between mb-4">  
                        <span className="text-primary-dark font-medium text-lg">+</span>  
                        <span className="text-primary-dark font-medium text-lg">0,00€</span>  
                    </div>  
                    <hr className="border-gray-300 mb-4" />  
                    <div className="flex justify-between font-semibold text-lg">  
                        <span className="text-primary-dark font-medium text-lg">Total</span>  
                        <span className="text-primary-dark font-medium text-lg">5,00€</span>  
                    </div>  
                    <button className="mt-4 w-full bg-blue-900 text-white py-2 rounded-3xl font-semibold">
                        Confirm
                    </button>  
                </div>  

                {/* Image BELOW */}  
                <Image  
                    src="/assets/images/payment-method.png"  
                    alt="Money and card"  
                    width={300}  
                    height={200}  
                    className="object-contain rounded-lg"  
                />  
            </div>
        </div>  
    </div>


);
}
