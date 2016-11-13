class PaymentMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.payment_mailer.payment_confirmation.subject
  #

  def payment_confirmation(order)
    @order = order
    mail(to: @order.ad_sku,
      subject: "Le passager a payé pour voler"
      )
  end
end
