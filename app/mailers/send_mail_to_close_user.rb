class SendMailToCloseUser < ApplicationMailer
  def send_creation_ad_to_users(user, ad)
    @ad = ad
    @user = user
    mail(to: user.email, subject: "#{@ad.user.name} propose un vol près de chez toi !")
  end
end
