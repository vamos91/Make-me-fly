class RemoveBooleanFromAds < ActiveRecord::Migration
  def change
    remove_column :ads, :boolean, :string
  end
end
