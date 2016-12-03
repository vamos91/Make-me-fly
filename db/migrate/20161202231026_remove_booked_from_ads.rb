class RemoveBookedFromAds < ActiveRecord::Migration
  def change
    remove_column :ads, :booked, :boolean
  end
end
