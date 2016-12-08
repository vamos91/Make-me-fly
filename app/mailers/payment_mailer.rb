class PaymentMailer < ApplicationMailer
  def payment_confirmation(order)
    @order = order
    mail(to: @order.ad_sku,
      subject: "Le passager a payé pour voler"
      )
  end
end
