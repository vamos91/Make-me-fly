class RemoveFalseFromAds < ActiveRecord::Migration
  def change
    remove_column :ads, :false, :string
  end
end
