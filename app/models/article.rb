class Article < ActiveRecord::Base

  #validates :title, presence: true
  validates :description, presence: true
  belongs_to :user
  has_many :posts, :dependent => :destroy
  def message_time_article
   #created_at.strftime("%d/%m/%y à %l:%M %p")
   created_at.strftime("%d %m")
 end


 mount_uploader :picture_article, PhotoUploader

end
