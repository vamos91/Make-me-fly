class AddTitreToAds < ActiveRecord::Migration
  def change
    add_column :ads, :titre, :string
  end
end
