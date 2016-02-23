class User < ActiveRecord::Base

validates :name, presence: true
has_many :ads, dependent: :destroy

end
