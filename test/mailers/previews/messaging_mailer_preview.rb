# Preview all emails at http://localhost:3000/rails/mailers/messaging_mailer
class MessagingMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/messaging_mailer/messaging
  def messaging
    MessagingMailer.messaging
  end

end
