class RemoveDefaultFromAds < ActiveRecord::Migration
  def change
    remove_column :ads, :default, :string
  end
end
