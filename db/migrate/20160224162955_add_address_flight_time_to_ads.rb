class AddAddressFlightTimeToAds < ActiveRecord::Migration
  def change
    add_column :ads, :address, :string
    add_column :ads, :flight_time, :integer
  end
end
