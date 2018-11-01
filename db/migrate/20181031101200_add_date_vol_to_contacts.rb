class AddDateVolToContacts < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :date_vol, :date
  end
end
