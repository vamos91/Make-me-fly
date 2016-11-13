# Preview all emails at http://localhost:3000/rails/mailers/ad_mailer
class AdMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/ad_mailer/creation_confirmation
  def creation_confirmation
    AdMailer.creation_confirmation
  end

end
