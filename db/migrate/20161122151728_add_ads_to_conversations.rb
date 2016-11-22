class AddAdsToConversations < ActiveRecord::Migration
  def change
    add_reference :conversations, :ad, index: true, foreign_key: true
  end
end
