class RenameAdsInOrders < ActiveRecord::Migration
  def change
    rename_column :orders, :ads_sku, :ad_sku
  end
end
