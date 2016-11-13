class AdMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.ad_mailer.creation_confirmation.subject
  #
  def creation_confirmation(ad)
    @ad = ad
    mail(to: @ad.user.email,
    subject: "Vol #{@ad.description} created" )
  end
end
