class ChangeStringToDateTimeToDateVol < ActiveRecord::Migration[5.2]
  def change
    remove_column :contacts, :date_vol
  end
end
