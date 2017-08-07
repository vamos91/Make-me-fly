class ChangeBookingDefaultTo0 < ActiveRecord::Migration
  def change
    change_column :ads, :booked, :string, default: '0'
  end
end
