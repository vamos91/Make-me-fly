class AdMailer < ApplicationMailer
  def creation_confirmation(ad)
    @ad = ad
    mail(to: @ad.user.email,
    subject: "Votre vol à #{@ad.address} a été crée" )
  end
end
