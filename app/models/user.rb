class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #validates :pilote, presence: true
  #validates :name, presence: true
  #

  geocoded_by :hometown
  after_validation :geocode, if: :hometown_changed?

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :ads, dependent: :destroy
  has_many :messages, dependent: :destroy

  after_create :send_welcome_email

  #after_create :subscribe_to_newsletter

  mount_uploader :picture, PhotoUploader

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
