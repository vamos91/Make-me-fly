class ChangeIntegerToMonetizeToAds < ActiveRecord::Migration
  def change
      remove_column :ads, :price, :integer
     change_table :ads do |t|
      t.monetize :price, currency: { present: false }
    end
  end
end
