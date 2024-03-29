class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #validates :hometown, presence: true
  #validates :name, presence: true

  acts_as_votable
  acts_as_voter
  geocoded_by :hometown
  after_validation :geocode, if: :hometown_changed?

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: [:facebook]

  has_many :ads, dependent: :destroy
  has_many :articles, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :aeronefs, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :contacts
  after_create :send_welcome_email


  acts_as_messageable

  def mailboxer_email(object)
    self.email
  end

  def self.find_for_facebook_oauth(auth)
    user_params = auth.to_h.slice(:provider, :uid)
    user_params.merge! auth.info.slice(:email, :first_name, :last_name)
    user_params[:facebook_picture_url] = auth.info.image
    user_params[:token] = auth.credentials.token
    user_params[:token_expiry] = Time.at(auth.credentials.expires_at)

    user = User.where(provider: auth.provider, uid: auth.uid).first
    user ||= User.where(email: auth.info.email).first # User did a regular sign up in the past.
    if user
      user.update(user_params)
    else
      user = User.new(user_params)
      user.password = Devise.friendly_token[8,20]  # Fake password for validation
      user.save
    end

    return user
  end

  #after_create :subscribe_to_newsletter

  mount_uploader :picture, PhotoUploader
  mount_uploader :brevet_pilote, PhotoUploader
  mount_uploader :assurance, PhotoUploader
  mount_uploader :licence_ulm, PhotoUploader
  mount_uploader :picture_ulm_user, PhotoUploader

 def message_time_user
   created_at.strftime("%d/%m/%Y")
 end


  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end

  def subscribe_to_newsletter
    SubscribeToNewsletterService.new(self).call
  end

end
