class Article < ActiveRecord::Base

  validates :title, presence: true
  validates :description, presence: true
  belongs_to :user
  has_many :posts

  def message_time_article
   created_at.strftime("%d/%m/%y à %l:%M %p")
 end

end
