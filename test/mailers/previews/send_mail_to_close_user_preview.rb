# Preview all emails at http://localhost:3000/rails/mailers/send_mail_to_close_user
class SendMailToCloseUserPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/send_mail_to_close_user/send_creation_ad_to_users
  def send_creation_ad_to_users
    SendMailToCloseUser.send_creation_ad_to_users
  end

end
