class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #validates :pilote, presence: true
  #validates :name, presence: true
  #



  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :ads, dependent: :destroy
  has_many :reviews, class_name:  "Review",
                                foreign_key: "reviewer_id",
                                dependent:   :destroy



  after_create :send_welcome_email

  mount_uploader :picture, PhotoUploader

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end

end
