class MessageMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.message_mailer.message.subject
  #
  def message(user)
    @user = user

    mail to: @user.email, subjet: "MakeMeFly : Vous avez recus un message de #{@user.name}"
  end
end
