
class PaymentsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized
  before_action :set_order

  def new

  end

  def create
    @amount = @order.amount_cents
    customer = Stripe::Customer.create( source: params[:stripeToken], email: params[:stripeEmail] )
    charge = Stripe::Charge.create( customer: customer.id, amount: @amount) # in cents description: "Payment for teddy [email protected]

  end

private

  def set_order
    @order = Order.where(status: 'pending').find(params[:order_id])
  end
end







