class ChangeColumnPriceToAds < ActiveRecord::Migration
  def change
    rename_column :ads, :prix, :price
  end
end
