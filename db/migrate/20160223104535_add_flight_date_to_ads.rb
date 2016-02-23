class AddFlightDateToAds < ActiveRecord::Migration
  def change
    add_column :ads, :description, :text
    add_column :ads, :prix, :integer
    add_column :ads, :flight_date, :date
    remove_column :ads, :start_date, :date
    remove_column :ads, :end_date, :date
  end
end
