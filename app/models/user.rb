class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #validates :pilote, presence: true
  #validates :name, presence: true
  #



  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :ads, dependent: :destroy

  after_create :send_welcome_email

  after_create :subscribe_to_newsletter

  mount_uploader :picture, PhotoUploader

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end

  def subscribe_to_newsletter
    SubscribeToNewsletterService.new(self).call
  end

end
